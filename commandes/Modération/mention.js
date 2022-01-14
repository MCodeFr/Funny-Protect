const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class mention extends Command {

	constructor (client) {
		super(client, {
			name: "mention",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: ["poke"],
			memberPermissions: ["MANAGES_GUILD"],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "MENTION_EVERYONE"],
			nsfw: false,
			ownerOnly: false,
			cooldown: 10000
		})
	}

	async run (message, args, data) {
		message.delete()
        let userToMention = message.mentions.users.first();
        message.channel.send("Mention: "+userToMention.toString());
    }}

module.exports = mention;