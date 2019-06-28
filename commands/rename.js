const Discord = require("discord.js");
const moment = require("moment");
const errors = require("../utils/errors.js");

module.exports.run = async (client, message, args) => {

message.delete();
  
let name = args.join(" ");

client.user.setUsername(name)
  
const embed = new Discord.RichEmbed()
  .setColor("GREEN")
  .setDescription(`**Re-name Successfully.**\n\n**►** Name: ${name}\n**►** By: ${message.author.tag}`)
  .setFooter(`At: ${moment().format("dddd, MMMM Do YYYY, h:mm A", Date.now)}`);
  
message.channel.send(embed).then(m => m.delete(5000));
  

}

module.exports.help = {
  name: "rename"
}