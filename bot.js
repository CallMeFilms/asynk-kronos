const { Client } = require('discord.js');
const Discord = require("discord.js");
const client = new Client({ disableEveryone: true});
const fs = require('fs');
const config = require("./config.json");
const express = require("express");
const app = express();
const bodyParser = require('body-parser');

app.use(express.json());
console.log("Logging into discord...");
client.config = config;

app.post("/feed", (req, res) => {
  if(client.config.listen) {
    client.guilds.array().forEach((guild) => {
      let newsFeed = guild.channels.find(chan => chan.name === "news-feed");
      if(newsFeed) {
        newsFeed.sendMessage({
          "embed":{
            "title":req.body.title,
            "description":req.body.body,
            "color":9047823,
            "footer":{
              "text":"Kronos | v0.1"
            }
          }
        });
      }
    });
    res.send("Message Recieved And Added");
  }
});

client.login(process.env.TOKEN).then((token) => {
  console.log("Logged in with token " + process.env.TOKEN)
});

fs.readdir('./events', (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const eventFunction = require(`./events/${file}`);
    const eventName = file.split('.')[0];
    client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});

const listener = app.listen(process.env.PORT || 3000, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});