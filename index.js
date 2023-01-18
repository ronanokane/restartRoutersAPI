const { exec } = require("child_process")
const express = require('express');
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
});

app.get('/restartRouters', (req, res)=>{
    exec(`{ node restartRouter.js '192.168.0.2' "${router1pass}" && echo 'vodafone router restarted' || echo 'failed to restart vodafone router'; } && { node restartSuperhub3.js '192.168.0.1' "${router2pass}" 2>/dev/null && echo 'superhub3 restarted' || echo 'failed to restart superhub3'}`, (err, stdo, stderr)=>{
        console.log(stdo)
    });     
});

const port=process.argv[2]
const [,,,router1pass, router2pass]=process.argv
app.listen(port,()=>console.log('listening on port' + port))
