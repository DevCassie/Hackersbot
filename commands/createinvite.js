const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (client, message, args) => {
  message.delete();
  
  const Options = {
    temporary: false,
    maxAge: 0,
    maxUses: 0,
    unique: true
  };
  
  let invite = message.channel.createInvite(Options).then(function(Invite){
    message.author.send({embed: {
      title: `**INVITE**`,
      description: `Here is the invite:\nhttps://discord.gg/` + Invite.code
    }})
    });
  
}

module.exports.help = {
  name: "invite"
}