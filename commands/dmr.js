module.exports = {
  run: async (client, msg, args) => {
    if(!msg.channel.parent || !msg.channel.parent.name.includes("-meeting-room")) return;
    const guild = msg.channel.guild
    const cat = msg.channel.parent
    const children = cat.children
    children.forEach((child) => {
      child.delete();
    });
    cat.delete()
  }
}