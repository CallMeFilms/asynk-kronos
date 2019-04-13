module.exports = {
  run: async (client, msg, args) => {
    if(!msg.member.hasPermission("MANAGE_CHANNELS")) return;
    const guild = msg.channel.guild
    if(msg.channel.parent.name.includes("-meeting-room")){ 
      msg.delete()
      msg.channel.send("You can't create a meeting room inside a meeting room!")
      return;
    }
    if(guild.channels.find(chan => chan.name.includes(msg.author.username + "-meeting-room"))){
      msg.delete();
      msg.channel.send("You can't create a meeting room because you already have one!")
      return;
    }
    var category = await guild.createChannel(msg.author.username + "-meeting-room", "category").then((category) => {
        category.overwritePermissions(msg.author.id, {'MANAGE_CHANNEL':true})
        category.overwritePermissions(msg.channel.guild.id, {'VIEW_CHANNEL':false})
      return category;
    });
  }  
}