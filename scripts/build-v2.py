#!/usr/bin/env python3
"""Render crawlable V2 one-pagers. Python stdlib; no runtime framework."""
import html
import json
from pathlib import Path
from urllib.parse import urljoin

ROOT = Path(__file__).resolve().parents[1]
BASE = 'https://paymentrequired.com/'
DATA = json.loads((ROOT / 'v2/content.json').read_text())
MCP = 'https://wirex.nuri.com/mcp'
CHANNELS = ['Telegram', 'WhatsApp', 'iMessage', 'Signal', 'Email']
SERVICE_URLS = ['https://nadanada.me/', 'https://www.bitrefill.com/', 'https://lnvps.net/', 'https://nuri.com/api/x402']
PATHS = {
 'wallet':'M4 6h14a2 2 0 0 1 2 2v11H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h13v2 M20 11h-6v5h6 M16 13.5h.01',
 'card':'M3 5h18v14H3z M3 9h18 M6 15h4',
 'bank':'m3 8 9-5 9 5H3 M5 10v8 M10 10v8 M14 10v8 M19 10v8 M3 21h18',
 'sliders':'M5 3v7m0 4v7 M12 3v3m0 4v11 M19 3v11m0 4v3 M2 10h6 M9 6h6 M16 14h6',
 'ticket':'M3 5h18v5a2 2 0 0 0 0 4v5H3v-5a2 2 0 0 0 0-4V5 M15 5v3m0 2v4m0 2v3',
 'heart':'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z',
 'plane':'m22 2-7 20-4-9-9-4 20-7Z M22 2 11 13',
 'phone':'M7 2h10a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Z M10 5h4 M11 19h2',
 'postcard':'M2 5h20v14H2z M14 8h5v4h-5z M5 10h5m-5 4h5m4 1h5',
 'video':'M3 5h12v14H3z m12 5 7-4v12l-7-4',
 'arrow':'M4 12h16m-6-6 6 6-6 6',
 'check':'m5 12 4 4L19 6',
 'copy':'M8 8h13v13H8z M16 4V2H2v14h2',
 'close':'m6 6 12 12M6 18 18 6',
 'globe':'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0 M3 12h18 M12 3c5 6 5 12 0 18-5-6-5-12 0-18',
 'chat':'M21 11a8 8 0 0 1-8 8H5l-3 3V11a9 9 0 0 1 19 0Z M7 11h.01M12 11h.01M17 11h.01'
}
E = html.escape

def icon(name, cls='icon'):
    return f'<svg class="{cls}" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="{PATHS[name]}"/></svg>'

def locpath(lang):
    return 'v2/' if lang == 'en' else f'v2/{lang}/'

def anchor(lang):
    return urljoin(BASE, locpath(lang))

CLI = 'hermes mcp add payments --url https://wirex.nuri.com/mcp\nhermes mcp test payments'
API = '''curl https://wirex.nuri.com/mcp \\
  -H 'Content-Type: application/json' \\
  -H 'Accept: application/json, text/event-stream' \\
  --data '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-11-25","capabilities":{},"clientInfo":{"name":"my-agent","version":"1.0"}}}' '''.rstrip()

for lang, d in DATA.items():
    target = ROOT / locpath(lang)
    target.mkdir(parents=True, exist_ok=True)
    langs = ''.join(f'<option value="{k}"{(" selected" if k==lang else "")}>{E(v["language"])}</option>' for k,v in DATA.items())
    hreflang = '\n'.join(f'<link rel="alternate" hreflang="{k}" href="{anchor(k)}">' for k in DATA)
    nav = ''.join(f'<a href="#{ident}">{E(label)}</a>' for ident,label in zip(['everyday','control','integrate'],d['nav']))
    channels = ''.join(f'<button class="channel" type="button" data-channel="{c}" aria-haspopup="dialog"><span aria-hidden="true" class="channel-symbol channel-{c.lower()}">{"↗" if c=="Telegram" else "@" if c=="Email" else "●"}</span>{c}</button>' for c in CHANNELS)
    proofline = ''.join(f'<span>{icon("check")}{E(x)}</span>' for x in d['proofline'])
    features = ''.join(f'<article class="feature">{icon(f["icon"])}<h3>{E(f["title"])}</h3><p>{E(f["text"])}</p></article>' for f in d['features'])
    examples = ''.join(f'''<article class="example example-{i}"><div class="example-top">{icon(x['icon'])}<span>{E(x['category'])}</span></div><h3>{E(x['title'])}</h3><p>{E(x['prompt'])}</p><button type="button" class="text-button" data-prompt="{E(x['prompt'],quote=True)}">{E(d['example_cta'])}{icon('arrow')}</button></article>''' for i,x in enumerate(d['examples']))
    services = ''.join(f'<a href="{url}" target="_blank" rel="noopener noreferrer"><span>{E(x[0])}</span><p>{E(x[1])}</p>{icon("arrow")}</a>' for x,url in zip(d['services'],SERVICE_URLS))
    faq = ''.join(f'<details><summary>{E(q)}<span aria-hidden="true">+</span></summary><p>{E(a)}</p></details>' for q,a in d['faqs'])
    schema = {
      '@context':'https://schema.org', '@graph':[
        {'@type':'WebPage','@id':anchor(lang)+'#webpage','url':anchor(lang),'name':d['title'],'description':d['description'],'inLanguage':lang,
         'isPartOf':{'@id':BASE+'#website'},'about':{'@id':BASE+'#application'}},
        {'@type':'WebSite','@id':BASE+'#website','url':BASE,'name':'PaymentRequired','inLanguage':list(DATA)},
        {'@type':'SoftwareApplication','@id':BASE+'#application','name':'PaymentRequired','url':BASE,'applicationCategory':'FinanceApplication','operatingSystem':'Web, MCP-compatible agents','description':d['description'],
         'featureList':[f['title'] for f in d['features']],'softwareVersion':'V2 preview'}
      ]}
    # No fabricated bank licence, reviews, postal address, pricing or OAuth issuer.
    boot = {'lang':lang, 'strings':{k:d[k] for k in ['ready','connecting','working','live','failed','retry','approval','channel_title','channel_body','copy','copied','copy_failed','prompt','cli_label','api_label','prompt_label','greeting','preview_label']}, 'cli':CLI,'api':API, 'languages':{k:locpath(k) for k in DATA}}
    schema_json = json.dumps(schema, ensure_ascii=False).replace('<', '\\u003c')
    boot_json = json.dumps(boot, ensure_ascii=False).replace('<', '\\u003c')
    page = f'''<!doctype html>
<html lang="{lang}">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="color-scheme" content="light"><meta name="theme-color" content="#fafcf9">
<title>{E(d['title'])}</title><meta name="description" content="{E(d['description'],quote=True)}">
<link rel="canonical" href="{anchor(lang)}">{hreflang}
<link rel="alternate" hreflang="x-default" href="{anchor('en')}">
<link rel="alternate" type="text/markdown" href="{anchor(lang)}index.md" title="Markdown">
<link rel="ai-catalog" href="/.well-known/ai-catalog.json">
<meta property="og:type" content="website"><meta property="og:site_name" content="PaymentRequired V2">
<meta property="og:title" content="{E(d['title'],quote=True)}"><meta property="og:description" content="{E(d['description'],quote=True)}"><meta property="og:url" content="{anchor(lang)}">
<meta property="og:image" content="{BASE}v2/assets/everyday-agent.webp"><meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/v2/assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/v2/site.css">
<script type="application/ld+json">{schema_json}</script>
<script id="page-data" type="application/json">{boot_json}</script>
<script type="module" src="/v2/app.mjs"></script>
</head>
<body>
<a class="skip" href="#main">{E(d['skip'])}</a>
<header class="site-header"><div class="container header-inner"><a class="home-symbol" href="{anchor(lang)}" aria-label="{E(d['preview_label'],quote=True)}: {E(d['title'],quote=True)}">{icon('wallet')}<span>{E(d['preview_label'])}</span></a><nav aria-label="Navigation">{nav}</nav><label class="language">{icon('globe')}<span class="sr-only">{E(d['language_label'])}</span><select id="language" aria-label="{E(d['language_label'],quote=True)}">{langs}</select></label></div></header>
<main id="main">
<section class="hero container" aria-labelledby="hero-heading">
<p class="eyebrow"><span class="green-dot" aria-hidden="true"></span>{E(d['eyebrow'])}</p>
<h1 id="hero-heading">{E(d['headline'][0])}<br><span>{E(d['headline'][1])}</span></h1>
<p class="hero-intro">{E(d['intro'])}</p><p class="hero-description">{E(d['subintro'])}</p>
<div class="hero-actions"><a class="button primary" href="#chat" data-open-chat>{E(d['start'])}{icon('arrow')}</a><a class="button secondary" href="#integrate">{E(d['bring'])}</a></div>
<div class="entry-panel">
  <div class="hero-art"><img src="/v2/assets/everyday-agent.webp" srcset="/v2/assets/everyday-agent-480.webp 480w, /v2/assets/everyday-agent.webp 968w" sizes="(max-width: 720px) 1px, (max-width: 1050px) 35vw, 470px" width="968" height="645" alt="{E(d['art_alt'],quote=True)}" fetchpriority="high" decoding="async"><div class="instrument-tags" aria-hidden="true"><span>{icon('wallet')}Wallet</span><span>{icon('card')}Visa</span><span>{icon('bank')}IBAN / ACH</span></div></div>
  <section class="chat" id="chat" aria-labelledby="chat-heading"><div class="chat-heading"><div><h2 id="chat-heading">{E(d['chat_name'])}</h2><p id="chat-status" role="status">{E(d['ready'])}</p></div>{icon('chat')}</div>
  <div class="messages" id="messages" role="log" aria-live="polite" aria-label="Chat"><div class="message assistant">{E(d['greeting'])}</div></div>
  <div class="starter-row">{''.join(f'<button type="button" data-starter="{i}">{E(x)}</button>' for i,x in enumerate(d['starters']))}</div>
  <form id="composer" class="composer"><label for="message" class="sr-only">{E(d['placeholder'])}</label><textarea id="message" rows="1" maxlength="3000" placeholder="{E(d['placeholder'],quote=True)}" required></textarea><button id="send" type="submit" aria-label="{E(d['send'],quote=True)}">{icon('arrow')}</button></form>
  <p class="chat-notice">{E(d['chat_notice'])}</p>
  </section>
</div>
<div class="channel-block"><p>{E(d['channel_label'])}</p><div class="channels">{channels}</div><p class="channel-note">{E(d['channels_note'])}</p></div>
<div class="proofline">{proofline}</div>
</section>
<section id="control" class="section container"><div class="section-heading"><p class="eyebrow">{E(d['control_eyebrow'])}</p><h2>{E(d['control_title'])}</h2><p>{E(d['control_intro'])}</p></div><div class="feature-grid">{features}</div></section>
<section id="everyday" class="section everyday"><div class="container"><div class="section-heading"><p class="eyebrow">{E(d['examples_eyebrow'])}</p><h2>{E(d['examples_title'])}</h2><p>{E(d['examples_intro'])}</p></div><div class="example-grid">{examples}</div>
<details class="catalogue"><summary>{E(d['services_title'])}<span aria-hidden="true">+</span></summary><p>{E(d['services_intro'])}</p><div class="service-grid">{services}</div></details></div></section>
<section id="integrate" class="section container integration"><div class="section-heading"><p class="eyebrow">{E(d['dev_eyebrow'])}</p><h2>{E(d['dev_title'])}</h2><p>{E(d['dev_intro'])}</p></div>
<div class="setup-panel"><div class="setup-heading"><span class="step" aria-hidden="true">1</span><label for="agent-select">{E(d['dev_step'])}</label><select id="agent-select" aria-label="{E(d['choose_agent'],quote=True)}"><option>Hermes Agent</option><option>OpenClaw</option><option>Claude</option><option>{E(d['other_agent'])}</option></select></div>
<div class="setup-content"><div class="endpoint"><span class="green-dot" aria-hidden="true"></span><code>{MCP}</code><button type="button" data-copy="endpoint" aria-label="{E(d['copy'],quote=True)} MCP URL">{icon('copy')}</button></div>
<div class="tabs" role="tablist" aria-label="Integration"><button role="tab" id="tab-prompt" aria-controls="panel-prompt" aria-selected="true" data-tab="prompt">{E(d['tab_prompt'])}</button><button role="tab" id="tab-cli" aria-controls="panel-cli" aria-selected="false" tabindex="-1" data-tab="cli">{E(d['tab_cli'])}</button><button role="tab" id="tab-api" aria-controls="panel-api" aria-selected="false" tabindex="-1" data-tab="api">{E(d['tab_api'])}</button></div>
<div id="panel-prompt" role="tabpanel" aria-labelledby="tab-prompt"><div class="code-label"><span>{E(d['prompt_label'])}</span><button class="copy-button" type="button" data-copy="prompt">{E(d['copy'])}{icon('copy')}</button></div><pre id="setup-prompt" tabindex="0">{E(d['prompt'])}</pre></div>
<div id="panel-cli" role="tabpanel" aria-labelledby="tab-cli" hidden><div class="code-label"><span>{E(d['cli_label'])}</span><button class="copy-button" type="button" data-copy="cli">{E(d['copy'])}{icon('copy')}</button></div><pre tabindex="0">{E(CLI)}</pre></div>
<div id="panel-api" role="tabpanel" aria-labelledby="tab-api" hidden><div class="code-label"><span>{E(d['api_label'])}</span><button class="copy-button" type="button" data-copy="api">{E(d['copy'])}{icon('copy')}</button></div><pre tabindex="0">{E(API)}</pre></div>
<p class="integration-note">{E(d['dev_note'])}</p><div class="dev-links"><a href="/v2/integration.md">{E(d['dev_links'][0])}{icon('arrow')}</a><a href="https://wirex.nuri.com/mcp/docs" target="_blank" rel="noopener noreferrer">{E(d['dev_links'][1])}{icon('arrow')}</a><a href="{anchor(lang)}index.md">{E(d['dev_links'][2])}{icon('arrow')}</a></div></div></div>
</section>
<section class="section container faq" id="questions"><h2>{E(d['faq_title'])}</h2><div>{faq}</div></section>
<section class="final-cta container"><h2>{E(d['final_title'])}</h2><p>{E(d['final_text'])}</p><a href="#chat" data-open-chat class="button primary">{E(d['start'])}{icon('arrow')}</a></section>
<noscript><p class="container noscript">{E(d['noscript'])}</p></noscript>
</main>
<footer class="container"><span>{E(d['footer'])}</span><a href="/v2/capabilities.json">{E(d['status_link'])}</a><a href="{anchor(lang)}index.md">Markdown</a></footer>
<dialog id="channel-dialog" aria-labelledby="channel-title"><button class="dialog-close" type="button" id="close-dialog" aria-label="{E(d['close'],quote=True)}">{icon('close')}</button><h2 id="channel-title">{E(d['channel_title'].replace('{channel}','Telegram'))}</h2><p>{E(d['channel_body'])}</p><button type="button" class="button primary" id="channel-web">{E(d['channel_web'])}{icon('arrow')}</button><a class="dialog-agent" href="#integrate">{E(d['bring'])}</a></dialog>
<div class="toast" id="toast" role="status" aria-live="polite"></div>
</body></html>'''
    (target / 'index.html').write_text(page)
    md = f'# {d["title"]}\n\n> {d["description"]}\n\n{d["intro"]} {d["subintro"]}\n\n'
    md += f'## {d["control_title"]}\n\n' + '\n\n'.join(f'### {f["title"]}\n\n{f["text"]}' for f in d['features'])
    md += f'\n\n## {d["examples_title"]}\n\n{d["examples_intro"]}\n\n' + '\n\n'.join(f'### {x["title"]}\n\n{x["prompt"]}' for x in d['examples'])
    md += f'\n\n## {d["dev_title"]}\n\n{d["dev_intro"]}\n\n{d["prompt"]}\n\n```sh\n{CLI}\n```\n\n'
    md += f'## {d["faq_title"]}\n\n' + '\n\n'.join(f'### {q}\n\n{answer}' for q,answer in d['faqs'])
    md += f'\n\n## Links\n\n- [MCP integration]({BASE}v2/integration.md)\n- [Capabilities]({BASE}v2/capabilities.json)\n- [Live MCP]({MCP})\n- [Web page]({anchor(lang)})\n'
    (target / 'index.md').write_text(md)
# Search engines receive one crawlable page per locale; no client-only translations.
import xml.etree.ElementTree as ET
ET.register_namespace('', 'http://www.sitemaps.org/schemas/sitemap/0.9')
ET.register_namespace('xhtml', 'http://www.w3.org/1999/xhtml')
ns = '{http://www.sitemaps.org/schemas/sitemap/0.9}'
xh = '{http://www.w3.org/1999/xhtml}'
sitemap = ET.Element(ns+'urlset')
ET.SubElement(ET.SubElement(sitemap,ns+'url'),ns+'loc').text = BASE
for lang in DATA:
    entry = ET.SubElement(sitemap, ns+'url')
    ET.SubElement(entry, ns+'loc').text = anchor(lang)
    for alternate in DATA:
        ET.SubElement(entry,xh+'link',{'rel':'alternate','hreflang':alternate,'href':anchor(alternate)})
    ET.SubElement(entry,xh+'link',{'rel':'alternate','hreflang':'x-default','href':anchor('en')})
ET.indent(sitemap)
ET.ElementTree(sitemap).write(ROOT/'sitemap.xml',encoding='utf-8',xml_declaration=True)
if (ROOT/'v2/integration.md').exists():
    (ROOT/'llms-full.txt').write_text((ROOT/'v2/index.md').read_text()+'\n\n'+(ROOT/'v2/integration.md').read_text())
print(f'Rendered {len(DATA)} HTML + Markdown locales; {len(DATA["en"]["examples"])} examples per locale.')
