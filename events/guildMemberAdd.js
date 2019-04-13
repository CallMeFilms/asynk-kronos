module.exports = {
  run: async (client, member) => {
    member.timeout = setTimeout(() => {
      if(member.roles.array().length === 0) {
        member.kick().then(() => {
          console.log(member.tag + " has timed out and has been kicked...");
        });
      }
    }, 60000);
  }
};