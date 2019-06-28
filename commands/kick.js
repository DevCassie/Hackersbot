const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const moment = require("moment")

module.exports.run = async (client, message, args) => {
  message.delete();
  let kmember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  let reason = args.join(" ").slice(22);
  
  if(!message.member.hasPermission("KICK_MEMBERS")) return errors.noPerms(message, "KICK_MEMBERS");
  if(kmember.hasPermission("ADMINISTRATOR")) return errors.equalPerms(message, "ADMINISTRATOR");
  if(!kmember) return errors.cantfindUser(message, "Could not find user. ");
  if(!reason) reason = "Unacceptable behavior.";
  
  let kickembed = new Discord.RichEmbed()
  .setTitle(`**KICK**`)
  .setColor("ORANGE")
  .setFooter(`At: ${moment().format("dddd, MMMM Do YYYY, h:mm A", Date.now)}`)
  .addField("Kicked User:", `${kmember} with ID: ${kmember.id}`)
  .addField("Kicked By:", `${message.author}`)
  .addField("Reason:", reason);
  
  let channel = message.guild.channels.find(`name`, "punishments");
  if(!channel) return errors.noChannel();
  
  kmember.send(reason);
  message.guild.member(kmember).kick(reason);
  channel.send(kickembed);
  
}

module.exports.help = {
  name: "kick"
}