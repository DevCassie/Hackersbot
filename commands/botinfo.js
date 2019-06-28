const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const moment = require("moment");
const ms = require("ms");

module.exports.run = async (client, message, args) => {
  message.delete();
  let botembed = new Discord.RichEmbed()
  .setTitle("Bot Info")
  .setDescription(`This bot was created for the first Hackersweek contest of Discord.`)
  .setFooter(`Thanks for using our bot.`)
  .setColor("GREEN")
  .addField(`- Bot creators: \n`, `> Cassie#8330\n> 372995308814073856\n\n> Remuting#0523\n> 270631734196961282`)
  .addField(`- Bot info: \n`, `> ${client.user.tag}\n> 592796841528000522`)
  .addField(`- Created on: `, `> ${moment.utc(client.user.createdAt).format("dddd, MMMM Do YYYY")} (${ms(Date.now()- client.user.createdAt, {long: true})})`)
  
  message.channel.send(botembed).then(m => m.delete(5000));
}

module.exports.help = {
  name: "binfo"
}