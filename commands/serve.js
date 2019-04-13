module.exports = {
  run: async (client, msg, args) => {
    const channel = msg.channel;
    var listen = client.config.listen;
    if(listen){
      channel.send({
        "embed": {
        "description": "Stopped listening for content update stream!",
        "color": 9047823,
        "footer": {
        "text": "Kronos | v0.1"
        }
        }
      });
      listen = false;
    } else {
      channel.send({
        "embed": {
        "description": "Listening for content update stream...",
        "color": 9047823,
        "footer": {
        "text": "Kronos | v0.1"
        }
        }
      });
      listen = true;
    }
    client.config.listen = listen;
  }
}