const discord = require("discord.js");

module.exports = {
  run: async (client, args) => {
    client.user.setActivity('AsynkDevelopment Product', {type: ''})
    .catch(console.error);
    const yengo = client.guilds.get("447841675084300288");
    const tos = yengo.channels.find(chan => chan.name === "tos");
    const pp = yengo.channels.find(chan => chan.name === "pp");
    const mr = yengo.channels.find(chan => chan.name === "member-registration");
    const memberRole = yengo.roles.get("448342752565002251");
    tos.fetchMessages().then(async (messages) => {
      messages = messages.array();
      if(messages.length > 0) {
        for(var i in messages) {
          if(i == messages.length - 1) {
            messages[i].edit(client.config.tos);
            continue;
          }
          await messages[i].delete();
        }
        return;
      }
      tos.send(client.config.tos);
    });
    pp.fetchMessages().then(async (messages) => {
      messages = messages.array();
      if(messages.length > 0) {
        for(var i in messages) {
          if(i == messages.length - 1) {
            messages[i].edit(client.config.pp);
            continue;
          }
          await messages[i].delete();
        }
        return;
      }
      pp.send(client.config.pp);
    });
    mr.fetchMessages().then(async (messages) => {
      messages = messages.array();
      if(messages.length > 0) {
        for(var i in messages) {
          if(i == messages.length - 1) {
            messages[i].edit(client.config.pp).then((msg) => {
              var collector = new discord.ReactionCollector(msg, (reaction, user) => reaction.emoji.toString() === "✅" && !user.bot);
              collector.on("collect", (reaction) => {
                const user = reaction.users.array()[reaction.users.array().length - 1];
                const member = yengo.members.get(user.id);
                reaction.remove();
                member.addRole(memberRole);
              });
            });
            continue;
          }
          await messages[i].delete();
        }
        return;
      }
      mr.send(client.config.agree).then((msg) => {
        msg.react("✅").then((reaction) => {
          var collector = new discord.ReactionCollector(msg, (reaction, user) => reaction.emoji.toString() === "✅" && !user.bot);
          collector.on("collect", (reaction) => {
            const user = reaction.users.array()[reaction.users.array().length - 1];
            const member = yengo.members.get(user.id);
            reaction.remove();
            member.addRole(memberRole);
          });
        });
      });
    });
  }
}