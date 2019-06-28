const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const moment = require("moment")

module.exports.run = async (client, message, args) => {
  message.delete();
  
if(!message.guild.me.voiceChannel) return errors.noVCMe(message, "I'm not in the voice channel that the author is in.");

const vcInfo = new Discord.RichEmbed()
  .setTitle("Voice Channel Info")
  .addField("Name", message.guild.me.voiceChannel.name)
  .addField("ID", message.guild.me.voiceChannel.id)
  .addField("User Slots", message.guild.me.voiceChannel.userLimit)
  .addField("Channel Created At", moment().format("dddd, MMMM Do YYYY, h:mm A", message.guild.me.voiceChannel.createdAt))
  .setColor(0xFFFFFF)
  .setFooter(`Requested by ${message.member.displayName}`)
  .setTimestamp();
  
message.channel.send(vcInfo).then(m => m.delete(5000)).catch(e => console.log(e.stack)).then(message.member.voiceChannel.leave())
  
}

module.exports.help = {
  name: "vinfo"
}