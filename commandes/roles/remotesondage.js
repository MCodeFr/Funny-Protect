const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class remotesondage extends Command {

	constructor (client) {
		super(client, {
			name: "remotesondage",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: [],
			memberPermissions: ["MANAGE_ROLE"],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "MANAGE_ROLE"],
			nsfw: false,
			ownerOnly: false,
			cooldown: 1000
		})
	}

	async run (message, args, data) {
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Veuillez mentionner le membre à ne plus mettre "Ping Sondage".')
        if (member.id === message.guild.ownerID) return message.channel.send('Vous ne pouvez mettre "Ping Sondage" le propriétaire du serveur.')
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Vous ne pouvez pas retirer le rôle "Ping Sondage" à cette personne')
        if (!member.manageable) return message.channel.send('Le bot ne peut pas mettre "Ping Sondage" ce membre.')
        const muteRole = message.guild.roles.cache.find(role => role.name === 'Ping Sondage')
        if (!muteRole) return message.channel.send('Il n\'y a pas de rôle Ping Sondage.')
        await member.roles.remove(muteRole)
        message.channel.send(`${member} n'est plus "Ping Sondage" !`)
    }}

module.exports = remotesondage;