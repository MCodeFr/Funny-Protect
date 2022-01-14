const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class remoteannonce extends Command {

	constructor (client) {
		super(client, {
			name: "remoteannonce",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: [],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "MANAGE_ROLE"],
			nsfw: false,
			ownerOnly: false,
			cooldown: 1000
		})
	}

	async run (message, args, data) {
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Veuillez mentionner le membre à ne plus mettre "Ping Annonce".')
        if (member.id === message.guild.ownerID) return message.channel.send('Vous ne pouvez mettre "Ping Annonce" le propriétaire du serveur.')
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Vous ne pouvez pas retirer le rôle "Ping Annonce" à cette personne')
        if (!member.manageable) return message.channel.send('Le bot ne peut pas mettre "Ping Annonce" ce membre.')
        const muteRole = message.guild.roles.cache.find(role => role.name === 'Ping Annonce')
        if (!muteRole) return message.channel.send('Il n\'y a pas de rôle Ping Annonce.')
        await member.roles.remove(muteRole)
        message.channel.send(`${member} n'est plus "Ping Annonce" !`)
    }}

module.exports = remoteannonce;