const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const moment = require("moment");
const ms = require("ms");

module.exports.run = async (client, message, args) => {
  message.delete();
  let humans = message.guild.members.filter(m => !m.user.bot).size;
  let bots = message.guild.members.filter(m => m.user.bot).size;
  let icon = message.guild.iconURL;
  const sinfoembed = new Discord.RichEmbed()
  .setTitle(`Server info from ${message.guild.name}`)
  .setColor("GREEN")
  .setFooter(`At: ${moment().format("dddd, MMMM Do YYYY, h:mm A", Date.now())}`)
  .setThumbnail(icon)
  .addField(`Server owner:`, `**Mention** ${message.guild.owner}\n**ID** ${message.guild.ownerID}`, true)
  .addField(`Server Region:`, message.guild.region.toUpperCase())
  .addField(`Server Created at:`, `${moment.utc(message.guild.createdAt).format("MMM Do YY")} (${ms(Date.now()- message.guild.createdAt, {long: true})})`)
  .addField(`Membercount:`, `**Total** ${message.guild.memberCount}\n**Humans** ${humans}\n**Bots** ${bots}`, true)
  .addField(`Status:`, `**Online** ${message.guild.members.filter(m => m.presence.status === "online").size}\n**Idle** ${message.guild.members.filter(m => m.presence.status === "idle").size}\n**Do not disturb** ${message.guild.members.filter(m => m.presence.status === "dnd").size}\n**Offline** ${message.guild.members.filter(m => m.presence.status === "offline").size}`, true);
  
  message.channel.send(sinfoembed).then(m => m.delete(5000));
}

module.exports.help = {
  name: "sinfo"
}