const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const moment = require("moment")

module.exports.run = async (client, message, args) => {

if(args[0] == null) {
  
const NoArgs = new Discord.RichEmbed()
  .setTitle("Help Page: Main")
  .addField("Punishments", "!help punish", true)
  .addField("Administration", "!help admin", true)
  .addField("Management", "!help manage", true)
  .addField("Fun/No Category", "!help fun", true)
  .setColor("GREEN")
  .setFooter("Bot created by Remuting#0523 & Cassie#8330")
  .setTimestamp()

message.channel.send(NoArgs)
  
}
  
if(args[0] == "punish") {

const Punishment = new Discord.RichEmbed()
  .setTitle("Help Page: Punishments")
  .setDescription("The reasons are optional.")
  .addField("Warn", "!warn [userMention] [Reason]")
  .addField("Temp Mute", "!tempmute [userMention] [Time] [Reason(optional)]") 
  .addField("Mute", "!mute [userMention]")
  .addField("Unmute", "!unmute [userMention]")
  .addField("Kick", "!kick [userMention] [Reason]")
  .setColor("RED")
  .setFooter("Thank you for using our bot.")

message.channel.send(Punishment)

}
  
  if(args[0] == "admin") {
    
const Administration = new Discord.RichEmbed()
    .setTitle("Help Page: Administration")
    .setDescription("The reasons are optional.")
    .addField("Ban", "!ban [userMention] [Reason]")
    .addField("Unban", "!unban [userMention] [Reason]")
    .setColor("RED")
    .setFooter("Thank you for using our bot.")

message.channel.send(Administration)

}
  
if(args[0] == "manage") {
  
const Management = new Discord.RichEmbed()
  .setTitle("Help Page: Management")
  .setDescription("The reasons are optional.")
  .addField("Lock Chat", "!lockchat")
  .addField("Add Role To User", "!addrole [userMention] [Role]")
  .addField("Remove Role From User", "!delrole [userMention] [Role]")
  .addField("Nickname", "!nick [userMention] [New Nickname]")
  .addField("Announcement", "!announce [Text]")
  .setColor("GREEN")
  .setFooter("Thank you for using our bot.")

message.channel.send(Management)

}
  
if(args[0] == "fun") {
  
const NoCategory = new Discord.RichEmbed()
  .setTitle("Help Page: Fun/No Category")
  .setDescription("The reasons are optional.")
  .addField("Avatar", "!avatar [userMention] `or` !avatar")
  .addField("Ping", "!ping")
  .addField("Create An Invite", "!invite")
  .addField("Server Info", "!sinfo")
  .addField("User Info", "!uinfo [userMention] `or` !uinfo")
  .addField("Bot Info", "!binfo")
  .addField("Summon", "!summon")
  .addField("Voice Channel Info", "!vinfo")
  .addField("Suggest", "!suggest [Suggestion]")
  .addField("Report", "!report [userMention] [Reason]")
  .setColor("GREEN")
  .setFooter("Thank you for using our bot.")

message.channel.send(NoCategory);

}
  
}

module.exports.help = {
  name: "help"
}