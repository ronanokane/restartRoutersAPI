const restartVodafone= require('./restartVodafone');

( async ()=>await restartVodafone(process.argv[2],process.argv[3]) )()
