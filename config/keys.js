//key.js - no need to commit this
if( process.env.NODE_ENV === 'production' ){
    module.exports = require('./prod');
}else{
    module.exports = require('./dev');
}

/*
//dev.js - no need to commit this
module.exports = {
    googleClientID : '572820114901-7h075qqe8i5d9mamogcad60oid5gna41.apps.googleusercontent.com',
    googleClientSecret : 'g45ePTQAlxan-rEXrW-DZlD9',
    mongoURI: 'mongodb+srv://dbUser:123dbUser123@reactmarketingcampaign.ga76a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    cookieKey: 'sdfsfsadawd'
}
*/