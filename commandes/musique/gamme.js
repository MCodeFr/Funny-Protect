const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class gamme extends Command {

	constructor (client) {
		super(client, {
			name: "gamme",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			aliases: ["question"],
			memberPermissions: ["SAVOIR_RIGOLER"],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "MENTION_EVERYONE" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000
		});
	}

	async run (message, args, data) {
		const embedRandom = new Discord.MessageEmbed()
        .setTitle(`${message.author.username} Voici la gamme de musique en do`)
        .setColor('#FF1000')
        .addField("DO, RÉ, MI, FA, SOL, LA, SI, DO")
        .addField("DO, SI, LA, SOL, FA, MI, RÉ, DO")
        .setDescription(`**On est cultivé ici !**`);

      message.channel.send(embedRandom);
    }}



module.exports = gamme;