const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const Discord = require("discord.js");
const client = new Discord.Client();
const botconfig = require("./config/botconfig.json");
const fs = require("fs");
const moment = require("moment");
client.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
  if (err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if (jsfile.length <= 0) {
    console.log("Couldn't find commands.");
    return;
  }
  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} is succesfully loaded.`);
    client.commands.set(props.help.name, props);
  });
});

client.on("ready", async => {
  console.log(`The bot ${client.user.tag} is up and running!`);
  client.user.setStatus("online");
  client.user.setActivity(`Moderating ${client.guilds.size} server(s)!`, {
    type: "PLAYING"
  });
});

client.on("guildCreate", async guild => {
  client.guilds.map(g => g.owner.user.tag | guild.name | guild.invite);
  let owner = guild.owner;

  let ownerembed = new Discord.RichEmbed()
    .setTitle(`**Thank you**`)
    .setDescription(`Thank you for using our bot.`)
    .setColor("GREEN")
    .addField(
      `Channels needed:\n`,
      `>bot-logs\n>punishments\n>appeals\n>suggestions\n>reports`
    );

  owner.send(ownerembed);
});

client.on("guildBanAdd", async (guild, user) => {
  let logs = guild.channels.find(`name`, "bot-logs");
  let embed = new Discord.RichEmbed()
    .setTitle(`**Guild ban add**`)
    .setDescription(
      `The user: ${user.member} has been banned from ${guild.name}.`
    )
    .setColor("RED")
    .setFooter(
      `At: ${moment().format("dddd, MMMM Do YYYY, h:mm A", Date.now())}`
    );

  logs.send(embed);
});

client.on("guildBanRemove", async (guild, user) => {
  let logs = guild.channels.find(`name`, "bot-logs");
  let embed = new Discord.RichEmbed()
    .setTitle(`**Guild ban Remove**`)
    .setDescription(
      `The user: ${user.id} has been unbanned from ${guild.name}.`
    )
    .setColor("GREEN")
    .setFooter(
      `At: ${moment().format("dddd, MMMM Do YYYY, h:mm A", Date.now)}`
    );

  logs.send(embed);
});

client.on("roleCreate", async role => {
  let guild = role.guild;
  let logs = role.guild.channels.find(`name`, "bot-logs");
  let embed = new Discord.RichEmbed()
    .setTitle(`**ROLE**`)
    .setDescription(`The role: ${role.name} has been created.`)
    .setFooter(`At: ${moment().format("dddd, MMMM Do YYYY, h:mm A", Date.now)}`)
    .setColor("GREEN");

  logs.send(embed);
});

client.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  if (message.content.indexOf(botconfig.prefix) !== 0) return;

  //Defining the args and all
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].toLowerCase();
  let args = messageArray.slice(1);

  //Trying the command handler to run.
  let prefix = botconfig.prefix;

  try {
    let commandfile = client.commands.get(cmd.slice(prefix.length));
    if (commandfile) commandfile.run(client, message, args);
  } catch (e) {
    console.log(e.message);
  } finally {
    console.log(`${message.author.tag} has run the command ${cmd}`);
  }
});

client.on("message", async message => {
  //antiswear
  if (
    botconfig.swearwords.some(word =>
      message.content.toLowerCase().includes(word)
    )
  ) {
    message.delete();
    message.channel.send(`You aren't allowed to use any swearwords!`);
  }
});

client.login(botconfig.token);
