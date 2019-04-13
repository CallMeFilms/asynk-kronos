module.exports = {
  run: async (client, msg, args) => {
    if(!msg.channel.parent || !msg.channel.parent.name.includes("-meeting-room")) return;
    const guild = msg.channel.guild
    const cat = msg.channel.parent
    msg.mentions.members.forEach((member) => {
      cat.overwritePermissions(member.id, {'VIEW_CHANNEL':false, 'READ_MESSAGES': false, 'SEND_MESSAGES': false});
      msg.channel.send("Removed member " + member.username + "#" + member.tag + " to this meeting room! (-mra @" + member.username + " to add!)")
    });
  }
}