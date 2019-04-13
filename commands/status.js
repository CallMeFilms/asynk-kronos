const request = require('request');
const body = require("body-parser");

module.exports = {
  run: async (client, msg, args) => {
    if(!msg.channel.name.includes("status")) return;
    if(!client.config.devices[args[0] + ""]){
      msg.channel.send("That device doesn't exist!");
      return;
    }
    request('http://75.129.224.201:30300/api/alwaysonline/' + client.config.devices[args[0]], (error, response, body) => {
      if(body){
        body = JSON.parse(body);
        msg.channel.send("Device status: " + body.status)
      } else {
        msg.channel.send("Device status: OFFLINE")
      }
    });
  }  
}