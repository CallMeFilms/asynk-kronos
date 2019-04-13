module.exports = {
  run: async (client, msg, args) => {
    if(!msg.channel.parent || !msg.channel.parent.name.includes("-meeting-room")) return;
    const guild = msg.channel.guild
    const cat = msg.channel.parent
    msg.mentions.members.forEach((member) => {
      cat.overwritePermissions(member.id, {'VIEW_CHANNEL':true, 'READ_MESSAGES': true, 'SEND_MESSAGES': true});
      msg.channel.send("Added member " + member.username + "#" + member.tag + " to this meeting room! (-mrr @" + member.username + " to remove!)")
    });
  }
}