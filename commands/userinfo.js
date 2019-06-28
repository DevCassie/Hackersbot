const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const moment = require("moment");
const ms = require("ms");

module.exports.run = async (client, message, args) => {
  message.delete();
  const status = {
    online: "Online",
    idle: "Idle",
    dnd: "Do not Disturb",
    offline: "Offline"
  }

  let member = message.guild.member(message.mentions.users.first()) || message.member;
  var game = "Not active";
  
  if(!member.presence.game ){
    game = "No game is played."
  }else {
    game = member.presence.game.name
  }
  let icon = member.user.displayAvatarURL;
  const uinfoembed = new Discord.RichEmbed()
  .setTitle(`User info from ${member.user.username}`)
  .setColor("GREEN")
  .setFooter(`At: ${moment().format("dddd, MMMM Do YYYY, h:mm A", Date.now())}`)
  .setThumbnail(icon)
  .addField(`User information:`, `**Username** ${member.user.username}\n**ID** ${member.user.id}\n**Tag** ${member.user.tag}`)
  .addField(`Created at:`, `${moment(member.user.createdAt).format("dddd, MMMM Do YYYY, h:mm A", Date.now())}`)
  .addField(`Joined at:`, `${moment(member.user.joinedAt).format("dddd, MMMM Do YYYY, h:mm A" , Date.now())}`)
  .addField(`Status:`, `**Status**${status[member.user.presence.status]}\n**Game** ${game}`)
  
  message.channel.send(uinfoembed).then(m => m.delete(5000));
}

module.exports.help = {
  name: "uinfo"
}