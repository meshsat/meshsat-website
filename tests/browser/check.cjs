// Built-artifact browser checks. Requests are fulfilled from disk, without a server.
const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
process.chdir(path.resolve(__dirname, '../..'));
const roots = {
  'meshsat.net': path.resolve(process.argv[2] || 'site/public'),
  'docs.meshsat.net': path.resolve(process.argv[3] || 'docs/.vitepress/dist'),
};
const out = path.resolve(process.argv[4] || '/tmp/meshsat-browser-checks');
fs.mkdirSync(out, { recursive: true });
const axe = fs.readFileSync(require.resolve('axe-core/axe.min.js'));
const csp = Object.fromEntries(['site','docs'].map(kind => [kind, fs.readFileSync(`nginx-${kind}.conf`,'utf8').match(/default "(default-src[^\n]+)";/)[1]]));
const mime = { '.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.json':'application/json', '.svg':'image/svg+xml', '.png':'image/png', '.webp':'image/webp', '.jpg':'image/jpeg', '.woff2':'font/woff2' };
const results = [], failures = [];
let browser;
async function context(options = {}) {
  const ctx = await browser.newContext({ viewport:{width:390,height:844}, reducedMotion:'reduce', ...options });
  await ctx.route('**/*', async route => {
    const url = new URL(route.request().url());
    if (url.pathname === '/__axe.js') return route.fulfill({contentType:'text/javascript',body:axe});
    const root = roots[url.hostname];
    if (!root) {
      if (url.hostname === 'api.github.com') return route.fulfill({json:{stargazers_count:100}});
      if (url.hostname === 'analytics.cubeos.app') return route.fulfill({contentType:url.pathname.endsWith('.js')?'text/javascript':'application/json',body:url.pathname.endsWith('.js')?'':'{"visitors":42}'});
      return route.fulfill({contentType:'text/html',body:'<!doctype html><html><head><title>External fixture</title></head><body></body></html>'});
    }
    const rel = decodeURIComponent(url.pathname).replace(/^\/+/, '');
    let file = [path.join(root,rel),path.join(root,rel,'index.html'),path.join(root,rel+'.html')].find(f => fs.existsSync(f) && fs.statSync(f).isFile());
    const status = file ? 200 : 404;
    file ||= path.join(root,'404.html');
    const headers = { 'content-security-policy': csp[url.hostname==='meshsat.net'?'site':'docs'] };
    await route.fulfill({status,headers,contentType:mime[path.extname(file)] || 'application/octet-stream',body:fs.readFileSync(file)});
  });
  return ctx;
}
async function settle(page) {
  await page.evaluate(async () => { await document.fonts.ready; window.scrollTo({top:0,behavior:'instant'}); });
  await page.waitForFunction(() => window.scrollY === 0);
  await page.waitForTimeout(80);
}
async function capture(page, filename) {
  await page.evaluate(async () => {
    for (let y=0; y<document.documentElement.scrollHeight; y+=innerHeight) {
      window.scrollTo({top:y,behavior:'instant'});
      await new Promise(resolve=>setTimeout(resolve,35));
    }
    await Promise.all([...document.images].filter(i=>i.getAttribute('src')).map(i=>i.decode().catch(()=>{})));
  });
  await settle(page);
  assert.deepEqual(await page.evaluate(()=>[...document.images].filter(i=>i.getAttribute('src')&&i.complete&&!i.naturalWidth).map(i=>i.src)),[]);
  await page.screenshot({path:path.join(out,filename),fullPage:true});
}
async function dialogAxe(page) {
  await page.addScriptTag({url:new URL('/__axe.js',page.url()).href});
  assert.deepEqual(await page.evaluate(async()=>(await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}})).violations.map(v=>v.id)),[]);
}
async function audit(page, name, runAxe=true) {
  await settle(page);
  const data = await page.evaluate(() => ({
    width:innerWidth,
    scrollWidth:document.documentElement.scrollWidth,
    cta:document.querySelector('.hero-paths a')?.getBoundingClientRect().toJSON(),
    h1:document.querySelectorAll('h1').length,
    broken:[...document.images].filter(i=>i.getAttribute("src") && i.complete && !i.naturalWidth).map(i=>i.src),
    cssBytes:performance.getEntriesByType('resource').filter(r=>r.name.includes('.css')).reduce((n,r)=>n+r.decodedBodySize,0),
    totalBytes:performance.getEntriesByType('resource').reduce((n,r)=>n+r.decodedBodySize,0),
  }));
  assert(data.scrollWidth <= data.width+1, `${name}: horizontal overflow ${data.scrollWidth}`);
  assert.equal(data.h1,1,`${name}: one h1`);
  assert.deepEqual(data.broken,[],`${name}: broken images`);
  if (data.cta && data.width===390) assert(data.cta.bottom < 844,`${name}: setup below fold (${data.cta.bottom})`);
  if (runAxe) {
    await page.addScriptTag({url:new URL('/__axe.js',page.url()).href});
    const violations = await page.evaluate(async () => (await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}})).violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})));
    assert.deepEqual(violations,[],`${name}: accessibility`);
  }
  results.push({name,...data});
}
async function check(name, fn) {
  if (process.env.CHECK_FILTER && !new RegExp(process.env.CHECK_FILTER).test(name)) return;
  try { await fn(); console.log(`PASS ${name}`); }
  catch(e) { failures.push({name,error:e.stack}); console.error(`FAIL ${name}: ${e.message}`); }
}
(async()=>{
 browser=await chromium.launch({headless:true});
 for(const lang of ['','nl/','de/','fr/','el/']) for(const theme of ['dark','light']) {
  const ctx=await context();
  await ctx.addInitScript(theme=>{localStorage.setItem('meshsat-theme',theme);localStorage.setItem('vitepress-theme-appearance',theme);},theme);
  const page=await ctx.newPage();
  for(const width of [320,390,768,1440]) {
   await page.setViewportSize({width,height:844});
   for(const route of ['', 'integrators/']) await check(`${lang||'en/'}${route||'home'} ${theme} ${width}`,async()=>{
    await page.goto(`https://meshsat.net/${lang}${route}`);
    await audit(page,`${lang}${route}-${theme}-${width}`,width===390 || width===1440);
    if(!lang && [390,1440].includes(width)) await capture(page,`${route?'integrators':'home'}-${theme}-${width}.png`);
   });
  }
  await ctx.close();
 }
 for(const theme of ['dark','light']) for(const width of [390,1440]) {
  const ctx=await context({viewport:{width,height:844}});
  await ctx.addInitScript(theme=>{localStorage.setItem('meshsat-theme',theme);localStorage.setItem('vitepress-theme-appearance',theme);},theme);
  const page=await ctx.newPage();
  for(const route of ['https://meshsat.net/install/','https://meshsat.net/security/','https://meshsat.net/privacy/','https://meshsat.net/how-we-build/','https://meshsat.net/changelog/','https://docs.meshsat.net/','https://docs.meshsat.net/start.html','https://docs.meshsat.net/guide/quick-start.html','https://docs.meshsat.net/transports/iridium-imt.html']) await check(`${route} ${theme} ${width}`,async()=>{
    await page.goto(route);await audit(page,`${route}-${theme}-${width}`);
    if(route.includes('how-we-build')) await capture(page,`build-${theme}-${width}.png`);
  });
  await ctx.close();
 }
 await check('navigation, language, copy, dialogs and consent',async()=>{
  const ctx=await context({permissions:['clipboard-read','clipboard-write'],reducedMotion:'no-preference'});
  const page=await ctx.newPage(); const youtube=[];const errors=[];
  page.on('request',r=>{if(r.url().includes('youtube'))youtube.push(r.url());});
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto('https://meshsat.net/');await settle(page);
  assert.equal(await page.locator('.hero-slide').count(),1);
  const theme=await page.locator('html').getAttribute('data-theme');await page.locator('.theme-toggle').click();assert.notEqual(await page.locator('html').getAttribute('data-theme'),theme);await page.locator('.theme-toggle').click();
  const lang=page.locator('.lang-btn');
  await lang.hover(); assert.equal(await lang.getAttribute('aria-expanded'),'true');
  const option=await page.locator('.lang-menu a').first().boundingBox();await page.mouse.move(option.x+option.width/2,option.y+option.height/2,{steps:10});assert(await page.locator('.lang-menu').isVisible());
  await lang.focus(); await page.keyboard.press('Escape');
  assert.equal(await lang.getAttribute('aria-expanded'),'false');
  assert.equal(await page.locator('.lang-menu').isVisible(),false);
  await page.keyboard.press('Enter'); assert.equal(await lang.getAttribute('aria-expanded'),'true');
  await page.keyboard.press('ArrowDown'); assert(await page.locator('.lang-menu a').first().evaluate(e=>e===document.activeElement));
  await page.keyboard.press('Escape');
  await page.locator('.menu-toggle').click();assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'true');
  await page.locator('.nav-links a[href="/#setup"]').click();
  assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'false');
  assert.equal(await page.evaluate(()=>document.activeElement.id),'setup');
  await page.locator('.copy-btn').first().click();
  assert.equal(await page.evaluate(()=>navigator.clipboard.readText()),'curl -fsSL https://get.meshsat.net | sudo bash');
  const shot=page.locator('.shot-open').first();await shot.click();
  assert(await page.locator('#shot-dialog').isVisible());await dialogAxe(page);await page.keyboard.press('Tab');assert(await page.evaluate(()=>!!document.activeElement.closest('#shot-dialog')));await page.keyboard.press('ArrowRight');await page.keyboard.press('Escape');
  assert(await shot.evaluate(e=>e===document.activeElement));
  assert.deepEqual(youtube,[]);
  await page.locator('.video-play').first().click();assert.equal(await page.locator('#video-dialog iframe').count(),1);
  await dialogAxe(page);await page.keyboard.press('Escape');await page.waitForFunction(()=>!document.querySelector('#video-dialog iframe'));assert.equal(await page.locator('#video-dialog iframe').count(),0);
  assert.deepEqual(errors,[]);
  await page.goto('https://meshsat.net/privacy/');await page.locator('.lang-btn').click();
  assert((await page.locator('.lang-menu a[lang="nl"]').textContent()).includes('homepage'));
  await ctx.close();
 });
 await check('integrator pairing, keyboard viewer and mobile matrix',async()=>{
  const ctx=await context();const page=await ctx.newPage();await page.goto('https://meshsat.net/integrators/');
  await page.selectOption('#ig-radio-one','L');assert.equal(await page.locator('#ig-radio-two').inputValue(),'');
  await page.selectOption('#ig-radio-two','T');assert.equal(await page.locator('#ig-model').textContent(),'MSC-3TL');
  assert((await page.locator('#ig-contact').getAttribute('href')).includes('MSC-3TL'));
  assert(await page.locator('#ig-radio-two option[value="L"]').isDisabled());
  assert.equal(await page.locator('.ig-capabilities tr').last().evaluate(e=>getComputedStyle(e).display),'block');
  await page.locator('.shot-open').first().click();assert(await page.locator('#shot-dialog').isVisible());await page.keyboard.press('Escape');
  await ctx.close();
 });
 await check('no JavaScript mobile navigation',async()=>{
  const ctx=await context({javaScriptEnabled:false});const page=await ctx.newPage();await page.goto('https://meshsat.net/');
  assert(await page.locator('.nav-links a').first().isVisible());assert.equal(await page.locator('.menu-toggle').isVisible(),false);
  await page.locator('.lang-btn').focus();assert(await page.locator('.lang-menu').isVisible());
  await ctx.close();
 });
 await check('forced colors and reduced motion',async()=>{
  const ctx=await context({forcedColors:'active',reducedMotion:'reduce'});const page=await ctx.newPage();await page.goto('https://meshsat.net/');
  await audit(page,'forced-colors',false);
  assert.equal(await page.locator('.hero-slide').evaluate(e=>getComputedStyle(e).transitionDuration),'0s');
  await ctx.close();
 });
 await browser.close();
 fs.writeFileSync(path.join(out,'results.json'),JSON.stringify({results,failures},null,2));
 console.log(`${results.length} layouts; ${failures.length} failures`);
 process.exitCode=failures.length?1:0;
})().catch(async e=>{console.error(e);await browser?.close();process.exitCode=1;});
