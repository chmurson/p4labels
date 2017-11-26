const fs = require('fs');
const { JSDOM } = require('jsdom');

const files = fs.readdirSync('./');

const indexFileName = 'index.html';

const htmlAndCSSFiles = files.filter(file => /\.htm(l)?$/.test(file) && file !== indexFileName);

fs.writeFileSync(indexFileName, `
  <html>
    <body>
        ${htmlAndCSSFiles.map(file => `<a href="${file}">${getTitleFromFile(file)}</a>`).join('<br>')}
    </body>
  </html>
`);


function getTitleFromFile(file) {
  const content = fs.readFileSync(file);
  const { document } = new JSDOM(content).window;
  return document.querySelector('title').innerHTML;
}