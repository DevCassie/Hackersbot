const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const moment = require("moment")

module.exports.run = async (client, message, args) => {
  message.delete();
  

let channel = message.guild.channels.find(`name`, "announcements")
  
const embed = new Discord.RichEmbed()
  .setTitle(`Announcement`)
  .setDescription(args.join(" "))
  .setColor("RED")
  .setFooter(`Announced By: ${message.author.tag} | At: ${moment().format("dddd, MMMM Do YYYY, h:mm A", Date.now)}`)

channel.send(embed)

}

module.exports.help = {
  name: "announce"
}