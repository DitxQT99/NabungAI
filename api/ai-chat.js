// Ventx AI proxy — keeps the same upstream Faa endpoint used by TARGETKU.
module.exports = async function handler(req,res){
  if(req.method!=='POST')return res.status(405).json({status:false,message:'Method Not Allowed'});
  try{
    const body=typeof req.body==='string'?JSON.parse(req.body||'{}'):(req.body||{});
    const prompt=String(body.prompt||'').trim();
    const query=String(body.query||'').trim();
    if(!prompt||!query)return res.status(400).json({status:false,message:'prompt dan query wajib diisi'});
    if(prompt.length>16000||query.length>1500)return res.status(413).json({status:false,message:'Permintaan terlalu panjang'});
    const url=new URL('https://api-faa.my.id/faa/ai-promt');
    url.searchParams.set('prompt',prompt);url.searchParams.set('query',query);
    const upstream=await fetch(url.toString(),{method:'GET',headers:{Accept:'application/json'},cache:'no-store'});
    const text=await upstream.text();
    res.setHeader('Cache-Control','no-store,max-age=0');
    res.setHeader('Content-Type',upstream.headers.get('content-type')||'application/json; charset=utf-8');
    return res.status(upstream.status).send(text);
  }catch(e){console.error('ventx-ai:',e);return res.status(502).json({status:false,message:'AI upstream tidak dapat dihubungi'});}
}
