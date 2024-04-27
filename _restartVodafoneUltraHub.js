const restartRouter =require('./vodafoneUltraHub');

(async ()=> await restartRouter(process.argv[2],process.argv[3]))()
