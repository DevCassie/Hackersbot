const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const moment = require("moment");

module.exports.run = async (client, message, args) => {
  message.delete();
  let member = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  let reason = args.join(" ").slice(22);
  if(!reason) reason = "Unacceptable behavior.";
  
  let reportsembed = new Discord.RichEmbed()
  .setTitle(`**Report**`)
  .setDescription(`Message ID: ${message.id}`)
  .setFooter(`At: ${moment().format("dddd, MMMM Do YYYY, h:mm A", Date.now())}`)
  .setColor("ORANGE")
  .addField(`Reported by:`, `**Username** ${message.author.username}\n**ID** ${message.author.id}`)
  .addField(`Reported user:`, `**Username** ${member.user.username}\n**ID** ${member.id}`)
  .addField(`Reason:`, `${reason}`);
  
  const channel = message.guild.channels.find(`name`, "reports");
  channel.send(reportsembed);
  
}

module.exports.help = {
  name: "report"
}