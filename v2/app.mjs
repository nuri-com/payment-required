const page = JSON.parse(document.getElementById('page-data').textContent);
const t = page.strings;
const MCP_URL = 'https://wirex.nuri.com/mcp';
const messageInput = document.getElementById('message');
const messages = document.getElementById('messages');
const sendButton = document.getElementById('send');
const status = document.getElementById('chat-status');
const toast = document.getElementById('toast');
let toastTimer;

function announce(text) {
  clearTimeout(toastTimer);
  toast.textContent = text;
  toast.classList.add('visible');
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 4000);
}

// Readable static locales, with an explicit, persistent language choice.
// Do not redirect crawlers or replace SSR content on first load.
document.getElementById('language').addEventListener('change', (event) => {
  try { localStorage.setItem('paymentrequired-v2-language', event.target.value); } catch {}
  const route = page.languages[event.target.value];
  if (route) location.assign('/' + route + location.hash);
});

function focusChat() {
  document.getElementById('chat').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
  messageInput.focus({ preventScroll: true });
}
for (const link of document.querySelectorAll('[data-open-chat]')) {
  link.addEventListener('click', (event) => { event.preventDefault(); focusChat(); });
}

// No fake bot URLs. Until a verified public channel exists, disclose availability.
const channelDialog = document.getElementById('channel-dialog');
for (const button of document.querySelectorAll('[data-channel]')) {
  button.addEventListener('click', () => {
    document.getElementById('channel-title').textContent = t.channel_title.replace('{channel}', button.dataset.channel);
    channelDialog.showModal();
  });
}
document.getElementById('close-dialog').addEventListener('click', () => channelDialog.close());
document.getElementById('channel-web').addEventListener('click', () => { channelDialog.close(); focusChat(); });
channelDialog.querySelector('.dialog-agent').addEventListener('click', () => channelDialog.close());
channelDialog.addEventListener('click', event => {
  if (event.target !== channelDialog) return;
  const r = channelDialog.getBoundingClientRect();
  if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) channelDialog.close();
});

const promptNode = document.getElementById('setup-prompt');
const selectedAgent = document.getElementById('agent-select');
function updatePrompt() {
  promptNode.textContent = selectedAgent.value + '\n\n' + t.prompt;
}
selectedAgent.addEventListener('change', updatePrompt);
updatePrompt();
for (const button of document.querySelectorAll('[data-copy]')) {
  button.addEventListener('click', async () => {
    const value = { endpoint: MCP_URL, prompt: promptNode.textContent, cli: page.cli, api: page.api }[button.dataset.copy];
    try {
      await navigator.clipboard.writeText(value);
      announce(t.copied);
    } catch {
      announce(t.copy_failed);
      const node = button.dataset.copy === 'prompt' ? promptNode : button.closest('[role=tabpanel]')?.querySelector('pre');
      if (node) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(node);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  });
}
const tabs = [...document.querySelectorAll('[role=tab]')];
function chooseTab(chosen, focus = false) {
  for (const tab of tabs) {
    const on = tab === chosen;
    tab.setAttribute('aria-selected', String(on));
    tab.tabIndex = on ? 0 : -1;
    document.getElementById(tab.getAttribute('aria-controls')).hidden = !on;
  }
  if (focus) chosen.focus();
}
for (const tab of tabs) {
  tab.addEventListener('click', () => chooseTab(tab));
  tab.addEventListener('keydown', event => {
    let target;
    const i = tabs.indexOf(tab);
    if (event.key === 'ArrowRight') target = tabs[(i + 1) % tabs.length];
    if (event.key === 'ArrowLeft') target = tabs[(i + tabs.length - 1) % tabs.length];
    if (event.key === 'Home') target = tabs[0];
    if (event.key === 'End') target = tabs[tabs.length - 1];
    if (target) { event.preventDefault(); chooseTab(target, true); }
  });
}

// Text nodes only: model replies and tool-returned links never become executable HTML.
function renderMessage(text, role = 'assistant') {
  const node = document.createElement('div');
  node.className = 'message ' + role;
  const linkPattern = /\[([^\]\n]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s<>]+)/gi;
  let offset = 0;
  for (const match of text.matchAll(linkPattern)) {
    node.append(document.createTextNode(text.slice(offset, match.index)));
    let url;
    try { url = new URL(match[2] || match[3]); } catch {}
    if (url && ['https:', 'http:'].includes(url.protocol) && !url.username && !url.password) {
      const link = document.createElement('a');
      link.href = url.href;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.referrerPolicy = 'no-referrer';
      const approval = url.origin === 'https://wirex.nuri.com' && (url.pathname === '/mcp/s' || url.pathname.startsWith('/mcp/bridge'));
      link.textContent = match[1] || (approval ? t.approval : url.href);
      if (approval) link.addEventListener('click', () => { approvalOpened = true; });
      node.append(link);
    } else node.append(document.createTextNode(match[0]));
    offset = match.index + match[0].length;
  }
  node.append(document.createTextNode(text.slice(offset)));
  messages.append(node);
  messages.scrollTop = messages.scrollHeight;
}

let client = null;
let starting = null;
let busy = false;
let approvalOpened = false;
let lastApprovalCheck = 0;
const languageName = document.querySelector('#language option:checked').textContent;
const persona = `You are the personal money agent in the paymentrequired.com V2 preview. Reply in ${languageName} unless the visitor chooses another language. Be concise, clear and kind, normally 2 sentences. Read and follow the MCP's live instructions and current tool schemas. Use the returned environment and capability facts, not claims from old marketing pages. This preview is connected to the Wirex sandbox, not proof of real payments. No integration API key is needed for discovery; wallet authorization and identity verification are different steps. Never claim a bank/card balance is impossible to freeze or guarantee an instant account. Native payment tools are not a browser, flight booking, Tanzania mobile-money payout, cinema or avatar generation service; explain missing integration honestly. For available user-authorized tasks, use the appropriate live tools. If the user wants to start, use connect_wallet exactly as its schema instructs, present the exact returned approval link with a short translated label, keep request/session data private, ask only for missing information and preserve idempotency keys. Do not start unsolicited polling loops or new connections. Never claim approval, payment or fulfillment succeeded without its corresponding tool result. Do not ask for seed phrases, private keys, card numbers or passwords in chat. When asked for a creative avatar, require the user's own media/consent and a connected provider; don't pretend you generated it.`;

async function connect() {
  if (client) return client;
  if (starting) return starting;
  status.textContent = t.connecting;
  const { McpChat } = await import('../chat-client.mjs');
  const candidate = new McpChat({
    persona,
    onMessage(text, role) { if (role === 'assistant' && text.trim()) renderMessage(text); },
    onStatus(text) { status.textContent = text ? t.working : t.live; }
  });
  starting = candidate.start().then(() => {
    client = candidate;
    status.textContent = t.live;
    return client;
  }).catch(error => {
    candidate.controller.abort();
    throw error;
  }).finally(() => { starting = null; });
  return starting;
}

async function ask(text, { internal = false } = {}) {
  if (busy || !text.trim()) return;
  busy = true;
  sendButton.disabled = true;
  if (!internal) renderMessage(text, 'user');
  try {
    const c = await connect();
    await c.send(text, { silent: true });
    if (!internal) messageInput.value = '';
    status.textContent = t.live;
  } catch (error) {
    // Keep draft + history. Never blindly replay payment tool calls after transport failure.
    status.textContent = t.failed;
    const detail = error?.status ? ` HTTP ${error.status}.` : '';
    renderMessage(t.failed + detail, 'error');
  } finally {
    busy = false;
    sendButton.disabled = false;
  }
}
document.getElementById('composer').addEventListener('submit', event => {
  event.preventDefault();
  void ask(messageInput.value.trim());
});
messageInput.addEventListener('keydown', event => {
  if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) {
    event.preventDefault();
    document.getElementById('composer').requestSubmit();
  }
});
for (const button of document.querySelectorAll('[data-starter]')) {
  button.addEventListener('click', () => {
    messageInput.value = button.textContent;
    void ask(messageInput.value);
  });
}
for (const button of document.querySelectorAll('[data-prompt]')) {
  button.addEventListener('click', () => {
    // Filling a task never sends it or places an order. The user presses Send.
    messageInput.value = button.dataset.prompt;
    focusChat();
  });
}
function checkAfterApproval() {
  if (!approvalOpened || document.hidden || busy || !client || Date.now() - lastApprovalCheck < 5000) return;
  approvalOpened = false;
  lastApprovalCheck = Date.now();
  // Returning to this page is NOT approval. Ask for one status check against the existing request.
  void ask('The user returned from the secure approval tab. Check the existing request status once using the request/session already in this conversation. Do not create another request or repeat a payment. Only report what the tool actually confirms; if still pending, say so briefly.', { internal: true });
}
window.addEventListener('focus', checkAfterApproval);
document.addEventListener('visibilitychange', checkAfterApproval);

// Native WebMCP enhancement only. No shim, signing, checkout or auth is exposed here.
if (navigator.modelContext?.registerTool) {
  const tools = [
    {
      name: 'get_payment_setup',
      description: 'Read the public MCP URL and setup instructions. No account access or spending.',
      inputSchema: { type: 'object', properties: {}, additionalProperties: false },
      annotations: { readOnlyHint: true },
      execute: async () => ({ content: [{ type: 'text', text: JSON.stringify({ mcp_url: MCP_URL, integration_api_key_required: false, prompt: t.prompt, documentation: 'https://paymentrequired.com/v2/integration.md' }) }] })
    },
    {
      name: 'get_payment_capabilities',
      description: 'Read the dated public tool snapshot and sandbox limitations. Not live account or payment data.',
      inputSchema: { type: 'object', properties: {}, additionalProperties: false },
      annotations: { readOnlyHint: true },
      execute: async () => {
        const response = await fetch('/v2/capabilities.json', { cache: 'no-cache' });
        if (!response.ok) throw new Error('Capability snapshot unavailable');
        return { content: [{ type: 'text', text: JSON.stringify(await response.json()) }] };
      }
    }
  ];
  for (const tool of tools) navigator.modelContext.registerTool(tool);
}
