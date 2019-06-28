const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const moment = require("moment")

module.exports.run = async (client, message, args) => {
  message.delete();
  let bannedmember = await client.fetchUser(args[0]);
  let reason = args.join(" ").slice(22);
  
  if(!message.member.hasPermission("BAN_MEMBERS")) return errors.noPerms(message, "BAN_MEMBERS");
  if(!bannedmember) return errors.cantfindUser(message, "Could not find the user.");
  if(!reason) reason = "Appeals have been made.";
  
  let unbanembed = new Discord.RichEmbed()
  .setTitle(`**UNBAN**`)
  .setColor("GREEN")
  .setDescription(`Message ID: ${message.id}`)
  .setFooter(`At: ${moment().format("dddd, MMMM Do YYYY, h:mm A", Date.now)}`)
  .addField("Unbanned User:", `${bannedmember} with ID: ${bannedmember.id}`)
  .addField("Unbanned By:", `${message.author}`)
  .addField("Reason:", reason);
  
  let channel = message.guild.channels.find(`name`, "appeals");
  channel.send(unbanembed);
  
  try {
    message.guild.unban(bannedmember, {reason: reason});
    bannedmember.send(`You have been unbanned from ${message.guild.name}.`);
    console.log(`${bannedmember.tag} has been unbanned from ${message.guild.name}.`);
  } catch (e) {
    console.log(e.message);
  }
}

module.exports.help = {
  name: "unban"
}