// Render pratinjau PNG + PDF siap cetak (96×61 mm, bleed 3 mm).  Pakai: node scripts/render.js
const {chromium} = require('playwright');
const path = require('path');
const dir = path.resolve(__dirname, '..'), url = 'file://' + dir + '/kartu-nama.html';
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({viewport:{width:900,height:800}, deviceScaleFactor:2});
  await p.goto(url); await p.evaluate(() => window.siap);
  await p.screenshot({path: dir + '/preview.png', fullPage: true});
  for (const k of ['fauzan','resya']) for (const v of ['intl','china']) {
    await p.goto(url + '?cetak=' + k + '-' + v); await p.evaluate(() => window.siap);
    await p.pdf({path: `${dir}/cetak/kartu-${k}-${v}.pdf`, preferCSSPageSize:true, printBackground:true, pageRanges:'1-2'});
  }
  await b.close();
})();
