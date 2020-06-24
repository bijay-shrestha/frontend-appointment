const config = require('config')

module.exports = function(name){
    const getConfig = config.get(name)
   if(getConfig){
       console.log("getConfig",getConfig);
     return getConfig

   } 
   throw new Error("Environmental Variable"+name+" Missing. Please Provide It in default.json for development or production.json for production..");
}