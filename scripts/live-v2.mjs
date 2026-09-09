// Live sandbox discovery + conversational answer. No wallet/account creation or payments.
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
const moduleName=process.env.PLAYWRIGHT_MODULE||'playwright';
const {chromium}=await import(moduleName.startsWith('/')?pathToFileURL(moduleName).href:moduleName);
const base=process.argv[2]||'http://127.0.0.1:8948/v2/';
const out=process.argv[3]||'/tmp/paymentrequired-v2-live';
await mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||chromium.executablePath()});
const result={target:base,at:new Date().toISOString(),network:[]};
try{
 const page=await browser.newPage();
 page.on('response',async res=>{
   if(res.url()!=='https://wirex.nuri.com/mcp'&&res.url()!=='https://wirex.nuri.com/chat/api/llm')return;
   const sent=res.request().postDataJSON();
   const row={endpoint:new URL(res.url()).pathname,http:res.status(),method:sent?.method||'llm',model:sent?.model};
   if(sent?.method==='tools/list'){
     const body=await res.json();
     row.tools=(body.result?.tools||[]).map(t=>t.name);
   }
   result.network.push(row);
 });
 await page.goto(base,{waitUntil:'networkidle'});
 const before=await page.locator('.message.assistant').count();
 const begin=Date.now();
 await page.fill('#message','Before we start: what is available here? Explain the sandbox and account setup requirements in two short sentences. Do not connect, create an account, call payment tools, or spend money.');
 await page.locator('#send').click();
 await page.waitForFunction(n=>document.querySelectorAll('.message.assistant').length>n,before,{timeout:125000});
 await page.waitForFunction(()=>!document.querySelector('#send').disabled,null,{timeout:125000});
 result.elapsed_ms=Date.now()-begin;
 result.reply=(await page.locator('.message.assistant').allTextContents()).slice(before).join('\n');
 result.errors=await page.locator('.message.error').allTextContents();
 assert.deepEqual(result.errors,[]);
 assert.ok(result.network.some(n=>n.method==='initialize'&&n.http===200));
 assert.ok(result.network.some(n=>n.method==='tools/list'&&n.http===200&&n.tools.length>=9));
 assert.ok(result.network.some(n=>n.method==='llm'&&n.http===200));
 assert.ok(result.reply.length>10);
 assert.match(result.reply,/sandbox|test|testing|demo/i);
 await page.screenshot({path:`${out}/conversation.png`,fullPage:false});
 result.status='pass';
} catch(error){
 result.status='fail';result.error=error.message;throw error;
} finally{
 await browser.close();
 await writeFile(`${out}/result.json`,JSON.stringify(result,null,2));
 console.log(JSON.stringify(result,null,2));
}
