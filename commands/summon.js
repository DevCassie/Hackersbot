const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const moment = require("moment")

module.exports.run = async (client, message, args) => {
  message.delete();

// const voiceChannel = message.member.voiceChannel;
  
// if(message.guild.me.voiceChannel !== message.author.voiceChannel){
//   voiceChannel.join()
// }
let voiceConnection = message.member.voiceChannel.join()
  
if(message.guild.me.voiceChannel) {
  return errors.AlrdyVC(message, "I'm already in the author's voice channel.");
}else{
voiceConnection
}
  
}

module.exports.help = {
  name: "summon"
}