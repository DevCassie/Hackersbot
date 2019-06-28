const Discord = require("discord.js");
const withReasons = true;
const errors = require("../utils/errors.js");

module.exports.run = async (client, message, args) => {
  message.delete();
  let bans = await message.guild.fetchBans([withReasons])
  .catch(error => {
    return console.log(error);
  });
  
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "MANAGE_MESSAGES");
  
   /* const NoPerm = new Discord.RichEmbed()
    .setTitle("An error has occured")
    .setDescription(`⛔ you don't have the required permission to use this command, **${message.member.displayName}**`)
    .setColor("bc0000")
    .setFooter(`Issued by ${message.author.tag}`)
    .setTimestamp(); 
  
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(NoPerm); */
  
  bans.array();
  
  let possiblebans = [];
  bans.forEach(function(ban) {
    possiblebans.push(`${ban.user.tag} | ${ban.user.id} | ${ban.reason}`);
  })
  
  const banembed = new Discord.RichEmbed()
  .setTitle(`**BANS**`)
  .setColor("RED")
  .addField("Info", `\`\`\`${possiblebans.join('\n')}\`\`\``)
  .setTimestamp();
  
  let bansize = await message.guild.fetchBans()
  .then(ban => {
    banembed.setDescription(`${message.guild.name} **|** **__${ban.size}__** banned users.`)
  });
  
  message.channel.send(banembed).then(m => m.delete(5000));
}

module.exports.help = {
  name: "bans"
}