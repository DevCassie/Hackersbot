const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  message.delete();
  message.channel.send("Pong!");
};

module.exports.help = {
  name: "ping",
  category: "fun",
  description: "Sends a pong respond back with the latency of the bot",
  usage: "!ping"
};