const express = require('express');
const restartVodafone= require('./restartVodafone')
const restartSuperhub3 =require('./restartSuperhub3')
const app = express();

const htmlBody=`<html>
<body>
<script>
async function restartRouter(){
    const button = document.getElementById('restartButton')
    try{
        alert('Attempting to restart both routers...please wait')        
        button.disabled=true        
        await fetch('restartRouters')
    }
    catch(err){}
    finally{
        button.disabled=false
    }
}
</script>
<button id="restartButton" type="button" onclick="restartRouter()">Restart routers</button> 
</body>
</html>
`
app.get('/', (req, res)=>{
    res.send(htmlBody)
})

app.get('/restartRouters', async (req, res)=>{
    await restartVodafone(vodafoneIp,vodafonePass)
    await restartSuperhub3(superHub3Ip,superHub3Pass)
})

app.get('/restartVodafone', async (req, res)=>{
    await restartVodafone(vodafoneIp,vodafonePass)
})

app.get('/restartSuperhub3', async (req, res)=>{
    await restartSuperhub3(superHub3Ip,superHub3Pass)
})

// node index.js <port> <router1ip> <router2ip>
const vodafonePass=process.env.vodafonePass
const superHub3Pass=process.env.superHub3Pass
const port=process.argv[2]
const [,,,vodafoneIp, superHub3Ip]=process.argv

app.listen(port,()=>console.log('listening on port ' + port))
