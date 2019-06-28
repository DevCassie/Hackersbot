const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const moment = require("moment");

module.exports.run = async (client, message, args) => {
  message.delete();
  let user = message.mentions.users.first() || message.author;
  let avatarembed = new Discord.RichEmbed()
  .setTitle(`Avatar of ${user.username}!`)
  .setImage(user.displayAvatarURL)
  .setColor("BLUE")
  .setFooter(`At: ${moment().format("dddd, MMMM Do YYYY, h:mm A", Date.now())}`);
  
  message.channel.send(avatarembed).then(m => m.delete(5000));
}

module.exports.help = {
  name: "avatar"
}