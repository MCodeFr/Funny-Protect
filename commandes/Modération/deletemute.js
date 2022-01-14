const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class deletemute extends Command {

	constructor (client) {
		super(client, {
			name: "deletemute",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			aliases: [],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "MENTION_EVERYONE" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000
		});
	}

	async run (message, args, data) {
		const emojis = this.client.customEmojis;
		message.guild.roles.cache.find(role => role.name === 'Muted').delete();

		const embedRandom = new Discord.MessageEmbed()
        .setTitle(`${emojis.success} Rôle mute supprimmé avec succès`)
        .setColor('RANDOM')
        .addField("Le rôle se recréeras lorsque vous exécuterez la commande 'mute'")
        .setDescription(`***Funny Protect* Sécurisez votre serveur tout en vous amusant**`);

      message.channel.send(embedRandom);
	    }}


module.exports = deletemute;