// Live-ish USD/IDR helper for the dashboard. Falls back gracefully in the browser if unavailable.
module.exports = async function handler(req,res){
  try{
    const upstream=await fetch('https://open.er-api.com/v6/latest/USD',{cache:'no-store'});
    const data=await upstream.json();
    const rate=Number(data?.rates?.IDR);
    if(!Number.isFinite(rate)||rate<=0)throw new Error('rate invalid');
    res.setHeader('Cache-Control','no-store,max-age=0');
    return res.status(200).json({ok:true,rate,date:data?.time_last_update_utc||new Date().toISOString().slice(0,10),source:'exchange-rate feed'});
  }catch(e){return res.status(200).json({ok:false,rate:17937,date:'1 Oktober 2026',source:'fallback'})}
}
