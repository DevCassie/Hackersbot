const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const moment = require("moment")

module.exports.run = async (client, message, args) => {
  message.delete();
  let bmember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  let reason = args.join(" ").slice(22);
  
  if(!message.member.hasPermission("MANAGE_MEMBERS")) return errors.noPerms(message, "MANAGE_MEMBERS");
  if(bmember.hasPermission("ADMINISTRATOR")) return errors.equalPerms(message, "ADMINISTRATOR");
  if(!bmember) return errors.cantfindUser(message, "Could not find user.");
  if(!reason) reason = "Unacceptable behavior.";
  
  let banembed = new Discord.RichEmbed()
  .setTitle(`**BAN**`)
  .setColor("RED")
  .setDescription(`Message ID: ${message.id}`)
  .setFooter(`At: ${moment().format("dddd, MMMM Do YYYY, h:mm A", Date.now)}`)
  .addField("Banned User:", `${bmember} with ID: ${bmember.id}`)
  .addField("Banned By:", `${message.author}`)
  .addField("Reason:", reason);
  
  let channel = message.guild.channels.find(`name`, "punishments");
  if(!channel) return errors.cantfindChannel(message, "Could not find the channel.")
  
  bmember.send(`You have been banned due to the following reason: ${reason}.`);
  message.guild.member(bmember).ban(reason);
  channel.send(banembed);
  
  
}

module.exports.help = {
  name: "ban"
}