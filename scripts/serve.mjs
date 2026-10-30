import http from 'node:http';
import {stat} from 'node:fs/promises';
import {createReadStream} from 'node:fs';
import path from 'node:path';
const root=path.resolve('dist');
const prefix='/oppia-project-showcase/';
const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.mp4':'video/mp4','.txt':'text/plain'};
http.createServer(async(req,res)=>{try{
 let name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
 if(name.startsWith(prefix))name=name.slice(prefix.length);
 let file=path.resolve(root,name.replace(/^\/+/,''));
 if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
 if((await stat(file)).isDirectory())file=path.join(file,'index.html');
 const {size}=await stat(file);
 const headers={'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store','Accept-Ranges':'bytes'};
 let start=0,end=size-1,status=200;
 if(req.headers.range){
  const match=/^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
  if(!match||(!match[1]&&!match[2])){res.writeHead(416,{'Content-Range':`bytes */${size}`});res.end();return;}
  start=match[1]?Number(match[1]):Math.max(0,size-Number(match[2]));
  end=match[1]&&match[2]?Math.min(Number(match[2]),size-1):size-1;
  if(start>=size||end<start){res.writeHead(416,{'Content-Range':`bytes */${size}`});res.end();return;}
  status=206;headers['Content-Range']=`bytes ${start}-${end}/${size}`;
 }
 headers['Content-Length']=end-start+1;res.writeHead(status,headers);
 if(req.method==='HEAD'){res.end();return;}
 const stream=createReadStream(file,{start,end});res.on('close',()=>stream.destroy());stream.pipe(res);
 }catch{res.writeHead(404);res.end('Not found');}
}).listen(4174,'127.0.0.1',()=>console.log(`Local: http://127.0.0.1:4174${prefix}`));
