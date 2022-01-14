const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class say extends Command {

	constructor (client) {
		super(client, {
			name: "say",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: [],
			memberPermissions: [ "MANAGE_GUILD" ],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS"],
			nsfw: false,
			ownerOnly: false,
			cooldown: 10000
		})
	}

	async run (message, args, data) {
        if (!args[0]) return message.channel.send('Veuillez indiquer du texte à envoyer.')
        message.delete()
        message.channel.send(`${message}`)
    }}

module.exports = say;