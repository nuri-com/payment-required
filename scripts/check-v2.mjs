// PLAYWRIGHT_MODULE=/absolute/path/to/playwright/index.mjs node scripts/check-v2.mjs URL OUT
// Optional: AXE_SOURCE=/path/to/axe.min.js for WCAG checks. No backend mocks, no purchases.
import assert from 'node:assert/strict';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
const moduleName=process.env.PLAYWRIGHT_MODULE || 'playwright';
const {chromium,devices}=await import(moduleName.startsWith('/')?pathToFileURL(moduleName).href:moduleName);
const url=process.argv[2]||'http://127.0.0.1:8948/v2/';
const out=process.argv[3]||'/tmp/paymentrequired-v2-proof';
await mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH || chromium.executablePath()});
const results=[];
try {
  for (const [name,options] of [
    ['desktop',{viewport:{width:1440,height:1100},deviceScaleFactor:1}],
    ['4k',{viewport:{width:3840,height:2160},deviceScaleFactor:1}],
    ['mobile',{...devices['iPhone 13'],viewport:{width:390,height:844}}],
    ['mobile-small',{...devices['iPhone SE']}]
  ]) {
    const context=await browser.newContext({...options,colorScheme:'light',reducedMotion:'reduce'});
    const page=await context.newPage();
    const errors=[];
    const initialRequests=[];
    page.on('request',request=>initialRequests.push(request.url()));
    page.on('pageerror',error=>errors.push(error.message));
    await page.goto(url,{waitUntil:'networkidle'});
    assert.ok(!initialRequests.some(u=>new URL(u).pathname.endsWith('/chat-client.mjs')),'chat module is deferred until a real chat action');
    assert.ok(!initialRequests.some(u=>new URL(u).hostname==='wirex.nuri.com'),'no unsolicited MCP session or model request on load');
    await page.screenshot({path:`${out}/${name}.png`,fullPage:true});
    const metrics=await page.evaluate(()=>{
      const visible=[...document.querySelectorAll('body *')].filter(e=>{
        const r=e.getBoundingClientRect();const s=getComputedStyle(e);
        return r.width&&r.height&&s.visibility!=='hidden'&&s.display!=='none'&&e.childNodes.length&&[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim());
      });
      return {width:innerWidth,scrollWidth:document.documentElement.scrollWidth,minFont:Math.min(...visible.map(e=>parseFloat(getComputedStyle(e).fontSize))),images:[...document.images].map(i=>({src:i.getAttribute('src'),ok:i.complete&&i.naturalWidth>0})),title:document.title,language:document.documentElement.lang};
    });
    assert.equal(metrics.scrollWidth,metrics.width,`${name}: horizontal overflow`);
    assert.ok(metrics.minFont>=17,`${name}: min text size ${metrics.minFont}`);
    assert.ok(metrics.images.every(i=>i.ok),`${name}: image loading`);
    assert.deepEqual(errors,[],`${name}: console exceptions`);
    await page.locator('[data-channel="Telegram"]').click();
    await assert.doesNotReject(()=>page.locator('#channel-dialog[open]').waitFor());
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('#channel-dialog[open]').count(),0);
    await page.locator('[data-tab="cli"]').click();
    assert.ok(await page.locator('#panel-cli').isVisible());
    await page.keyboard.press('ArrowRight');
    assert.ok(await page.locator('#panel-api').isVisible());
    await page.locator('[data-tab="prompt"]').click();
    await page.selectOption('#agent-select','OpenClaw');
    assert.match(await page.locator('#setup-prompt').textContent(),/^OpenClaw\n/);
    await context.grantPermissions(['clipboard-read','clipboard-write'],{origin:new URL(url).origin});
    await page.locator('[data-copy="prompt"]').click();
    const copied = await page.evaluate(()=>navigator.clipboard.readText());
    assert.equal(copied,await page.locator('#setup-prompt').textContent(),'clipboard contains complete prompt');
    await page.locator('[data-copy="endpoint"]').click();
    assert.equal(await page.evaluate(()=>navigator.clipboard.readText()),'https://wirex.nuri.com/mcp');
    await page.locator('[data-prompt]').first().click();
    assert.match(await page.locator('#message').inputValue(),/cinema|Kino|cinéma|cine|sinema/i);
    // Selecting an example must not send a request or invent fulfillment.
    assert.equal(await page.locator('.message.user').count(),0);
    if(process.env.AXE_SOURCE){
      await page.addScriptTag({path:process.env.AXE_SOURCE});
      const axe=await page.evaluate(async()=>await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}}));
      await writeFile(`${out}/${name}-axe.json`,JSON.stringify(axe,null,2));
      assert.deepEqual(axe.violations.map(v=>({id:v.id,nodes:v.nodes.length})),[],`${name}: accessibility`);
    }
    results.push({viewport:name,...metrics,errors,interactionChecks:'pass'});
    await context.close();
  }
  for(const locale of ['de','es','fr','sw']){
    const page=await browser.newPage({viewport:{width:390,height:844}});
    await page.goto(new URL(`${locale}/`,url).href,{waitUntil:'networkidle'});
    assert.equal(await page.getAttribute('html','lang'),locale);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth),390,`${locale} overflow`);
    await page.screenshot({path:`${out}/locale-${locale}.png`,fullPage:true});
    results.push({locale,status:'pass'});
    await page.close();
  }
  const nojs=await browser.newContext({javaScriptEnabled:false});
  const plain=await nojs.newPage();
  await plain.goto(url,{waitUntil:'load'});
  assert.equal(await plain.locator('h1').count(),1);
  assert.equal(await plain.locator('[data-prompt]').count(),6);
  assert.match(await plain.locator('#setup-prompt').textContent(),/https:\/\/wirex.nuri.com\/mcp/);
  results.push({javascript:false,readability:'pass'});
  await nojs.close();
} finally {
  await browser.close();
  await writeFile(`${out}/browser-results.json`,JSON.stringify({url,at:new Date().toISOString(),results},null,2));
}
console.log(JSON.stringify(results,null,2));
