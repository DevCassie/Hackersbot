const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (client, message, args) => {
  message.delete();
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "MANAGE_MESSAGES");
  const user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2]);
  if(!amount) return errors.noAmount(message, "No amount given.");
  if(!amount && !user) return message.channel.send('You must specify a user and amount, or just an amount of messages to purge!');
  
  message.channel.fetchMessages({
    limit: amount,
  }).then((messages) => {
    if(user) {
      const filterby = user ? user.id : client.user.id;
      messages = messages.filter(m => m.author.id === filterby).array().slice(0, amount);
    }
    message.channel.bulkDelete(messages).catch(e => console.log(e.stack));
  });
}

module.exports.help = {
  name: "purge"
}