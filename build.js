const fs = require('fs');

const appJs = fs.readFileSync('app.js', 'utf8');
let html = fs.readFileSync('index.html', 'utf8');

// Script 7은 <script type="text/babel"> ... </script>
const babelScriptStart = html.indexOf('<script type="text/babel">');
const babelScriptEnd = html.indexOf('</script>', babelScriptStart);

if (babelScriptStart === -1 || babelScriptEnd === -1) {
  console.error('Could not find babel script tag in index.html');
  process.exit(1);
}

const newHtml = html.slice(0, babelScriptStart) + 
  '<script type="text/babel">\n' + 
  appJs + 
  '\n</script>' + 
  html.slice(babelScriptEnd + '</script>'.length);

fs.writeFileSync('index.html', newHtml, 'utf8');
console.log('Successfully bundled app.js into index.html! New length:', newHtml.length);
