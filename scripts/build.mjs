import {cp,mkdir,readFile,writeFile} from 'node:fs/promises';
await mkdir('dist',{recursive:true});
for(const file of ['index.html','styles.css','app.js'])await cp(`src/${file}`,`dist/${file}`);
await cp('assets','dist/assets',{recursive:true});
await writeFile('dist/.nojekyll','');
await writeFile('dist/robots.txt','User-agent: *\nAllow: /\n');
console.log(`Built Oppia showcase (${(await readFile('dist/index.html')).length} bytes HTML). No runtime dependencies.`);
