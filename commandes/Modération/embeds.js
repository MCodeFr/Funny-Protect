const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class embeds extends Command {

	constructor (client) {
		super(client, {
			name: "embeds",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: [],
			memberPermissions: [ "MANAGE_GUILD" ],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS"],
			nsfw: false,
			ownerOnly: false,
			cooldown: 2000
		})
	}

	async run (message, args, data) {
        if (!args[0]) return message.channel.send('Veuillez indiquer du texte à envoyer.')
        message.delete()
        const embedRandom = new Discord.MessageEmbed()
        .setTitle(`${message}`)
        .setColor('RANDOM')
      message.channel.send(embedRandom);
    }}

module.exports = embeds;