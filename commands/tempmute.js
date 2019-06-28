const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const ms = require("ms");
const moment = require("moment");

module.exports.run = async (client, message, args) => {
  message.delete();
  
  if(!message.member.hasPermission("MANAGE_MEMBERS")) return errors.noPerms(message, "MANAGE_MEMBERS");
  
  let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!user) return errors.cantfindUser(message, "Could not find the user.");

      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(user, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
  
  let mutetime = args[1];
  if(!mutetime) return errors.noAmount(message, "Specify the mute time.");
  
  const embed = new Discord.RichEmbed()
  .setTitle(`**MUTED**`)
  .setDescription(`Message ID: ${message.id}`)
  .setColor("ORANGE")
  .setFooter(`At: ${moment().format("dddd MMMM Do YYYY, h:mm A", Date.now())}`)
  .addField(`Muted by:`, `The staff team of ${message.guild.name}.`)
  .addField(`Muted User:`, `${user}\n**ID:** ${user.id}`)
  .addField(`Mute Time:`, mutetime)
  
  let channel = message.guild.channels.find(`name`, "punishments");
  channel.send(embed);
  
  setTimeout(function(){
    message.guild.channels.forEach(async (channel, id) => {
      await channel.overwritePermissions(user, {
      SEND_MESSAGES: true,
      ADD_REACTIONS: true
    })
    })
    message.channel.send(`The user ${user} has been unmuted.`).then(m => m.delete(5000));
}, ms(mutetime));
}

module.exports.help = {
  name: "tempmute"
}