const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const moment = require("moment");

module.exports.run = async (client, message, args) => {
  message.delete();
    let comment = args.join(" ");
    if(!comment) return errors.noComments(message, "Please specify a comment/reason.");

    let ideaEmbed = new Discord.RichEmbed()
    .setTitle("**SUGGESTION**")
    .setColor("GREEN")
    .setAuthor(`${message.author.username}`)
    .setFooter(`Thanks for the suggestion ${message.author.username}`)
    .setTimestamp()
    .addField("Idea", comment, true);

    let channel = message.guild.channels.find(`name`, "suggestions");
    if(!channel) return errors.noChannel(message, "Could not find the channel.")
  
  const send = await channel.send(ideaEmbed)
    await send.react("🇾");
    await send.react("🇳");
};

module.exports.help = {
  name: "suggest"
}