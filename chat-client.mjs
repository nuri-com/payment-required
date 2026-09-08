// Real MCP chat client for paymentrequired.com.
// Talks to https://wirex.nuri.com/mcp (MCP) and /chat/api/llm (OpenRouter proxy). Same protocol as wirex.nuri.com/chat.
const MAX_TOOL_ROUNDS = 8;
export const ORIGIN = "https://wirex.nuri.com";
export const MODEL = "deepseek/deepseek-v4-flash-0731";

// True when the last tool result is a state the user must act on out-of-band (approval, KYC) or that is still in flight.
export function isDone(data) {
  const text = JSON.stringify(data ?? "").toLowerCase();
  return /"status"\s*:\s*"(connected|verified|approved|ready|active|completed|created)"|"connected"\s*:\s*true|"account_exists"\s*:\s*(true|false)/.test(text);
}
export function isPending(data) {
  const text = JSON.stringify(data ?? "").toLowerCase();
  if (/"(status|state|verification|next_action)"\s*:\s*"(pending|awaiting|waiting|processing|in_progress|check|poll|retry)/.test(text)) return true;
  if (/approval_url|kyc_url|verification_url|retry_after_seconds/.test(text) && !/"connected"\s*:\s*true|"status"\s*:\s*"(verified|approved|ready|active|completed)"/.test(text)) return true;
  return false;
}

export class McpChat {
  constructor({ onMessage, onStatus, onTools, onTool, onError, persona = "" }) {
    this.onMessage = onMessage; this.onStatus = onStatus; this.onTools = onTools; this.onTool = onTool; this.onError = onError;
    this.persona = persona;
    this.controller = new AbortController();
    this.messages = []; this.busy = false; this.id = 0; this.tools = [];
  }
  async json(url, init = {}) {
    const r = await fetch(url, { ...init, cache: "no-store", credentials: "omit", signal: this.controller.signal });
    if (!r.ok) {
      let body; try { body = await r.json(); } catch {}
      const d = typeof body?.error?.message === "string" ? body.error.message : typeof body?.error === "string" ? body.error : "The service is temporarily unavailable.";
      const e = new Error(`${d} (HTTP ${r.status})`); e.status = r.status; e.retryAfter = Number(r.headers.get("retry-after")) || 0;
      throw e;
    }
    return r.status === 202 ? null : r.json();
  }
  async rpc(method, params = {}, notification = false) {
    const body = await this.json(`${ORIGIN}/mcp`, {
      method: "POST",
      headers: { "content-type": "application/json", accept: "application/json, text/event-stream", ...(this.protocol ? { "MCP-Protocol-Version": this.protocol } : {}) },
      body: JSON.stringify({ jsonrpc: "2.0", ...(notification ? {} : { id: ++this.id }), method, params }),
    });
    if (notification) return;
    if (body.error || !body.result) throw new Error("The MCP could not complete that request.");
    return body.result;
  }
  async start() {
    const init = await this.rpc("initialize", { protocolVersion: "2025-11-25", capabilities: {}, clientInfo: { name: "paymentrequired-web", version: "1.0.0" } });
    this.protocol = init.protocolVersion;
    await this.rpc("notifications/initialized", {}, true);
    this.messages.push({ role: "system", content: (init.instructions || "") + (this.persona ? "\n\n" + this.persona : "") });
    const list = await this.rpc("tools/list");
    this.tools = (list.tools || []).map(t => ({ type: "function", function: { name: t.name, description: t.description, parameters: t.inputSchema, strict: false } }));
    this.onTools?.(list.tools || []);
  }
  display(text, role = "assistant") {
    const parts = role === "assistant" ? text.split(/\r?\n/).map(l => l.trim()).filter(Boolean) : [text];
    for (const p of parts) this.onMessage(p, role);
  }
  say(text, role = "assistant") { this.messages.push({ role, content: text }); this.display(text, role); }
  async send(text, { silent = false } = {}) {
    if (this.busy) throw new Error("Please wait for the reply.");
    this.busy = true;
    this.messages.push({ role: "user", content: text });
    if (!silent) this.display(text, "user");
    try { await this.respond(); } finally { this.busy = false; }
  }
  async respond() {
    try {
      for (let round = 0; round < MAX_TOOL_ROUNDS; round++) {
        this.onStatus("thinking…");
        let res, attempt = 0;
        for (;;) {
          try {
            res = await this.json(`${ORIGIN}/chat/api/llm`, {
              method: "POST", headers: { "content-type": "application/json" },
              body: JSON.stringify({ model: MODEL, messages: this.messages, tools: this.tools }),
            });
            break;
          } catch (e) {
            if (!(e.status === 429 || e.status >= 500) || attempt >= 4) throw e;
            const wait = Math.max(e.retryAfter * 1000, 1500 * 2 ** attempt);
            this.onStatus(`busy, retrying in ${Math.round(wait / 1000)}s…`);
            await new Promise((r) => setTimeout(r, wait));
            attempt++;
          }
        }
        const m = res.choices?.[0]?.message;
        if (!m || m.role !== "assistant") throw new Error("The model did not return a valid response.");
        const calls = m.tool_calls;
        if (!calls?.length) {
          const c = m.content === null ? "" : String(m.content ?? "");
          if (c.trim()) this.say(c);
          else if (this.messages.at(-1)?.role !== "tool") this.messages.push({ role: "assistant", content: "" });
          return;
        }
        this.messages.push(m);
        if (typeof m.content === "string" && m.content.trim()) this.display(m.content);
        this.onStatus("working…");
        for (const call of calls) {
          const result = await this.rpc("tools/call", { name: call.function.name, arguments: JSON.parse(call.function.arguments || "{}") });
          const data = result.structuredContent ?? result.content;
          this.lastTool = { name: call.function.name, data };
          this.onTool?.(call.function.name, data);
          this.messages.push({ role: "tool", tool_call_id: call.id, content: JSON.stringify({ ...(result.structuredContent ? { structuredContent: result.structuredContent } : { content: result.content }), isError: result.isError === true }) });
        }
      }
      throw new Error("The tool-call limit was reached.");
    } catch (e) { this.onError?.(e); throw e; }
    finally { this.onStatus(""); }
  }
}
