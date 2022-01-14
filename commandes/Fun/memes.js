Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class memes extends Command {

	constructor (client) {
		super(client, {
			name: "memes",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			aliases: ["rigolo"],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "MENTION_EVERYONE" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000
		});
	}

	async run (message, args, data) {
        const reponses = ["https://images3.memedroid.com/images/UPLOADED239/5b8ef2e2edd80.jpeg"]
        const embedRandom = new Discord.MessageEmbed()()
        .setTitle(`Réponse au 'memes' de ${message.author.username}`)
        .setColor('#FF1000')
        .addField("coucou")
        .addField("Ma Réponse :", reponses[Math.floor(Math.random() * reponses.length)])
        .setDescription(`**Le jeu memes est un jeu consistant à afficher un meme par le biais d'un bot.**`);

      message.channel.send(embedRandom);
    }}

module.exports = memes;