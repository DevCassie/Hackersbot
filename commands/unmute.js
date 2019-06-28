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
          SEND_MESSAGES: true,
          ADD_REACTIONS: true
        });
      });
  
  const embed = new Discord.RichEmbed()
  .setTitle(`**UNMUTED**`)
  .setDescription(`Unmute executed by ${message.author}`)
  .setColor("GREEN")
  .setFooter(`At: ${moment().format("dddd MMMM Do YYYY, h:mm A", Date.now())}`)
  .addField(`Message ID:`, `${message.id}`)
  .addField(`Unmuted User:`, `${user}\n**ID:** ${user.id}`);
  
  let channel = message.guild.channels.find(`name`, "appeals");
  channel.send(embed);

}

module.exports.help = {
  name: "unmute"
}