const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class membre extends Command {

	constructor (client) {
		super(client, {
			name: "membre",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: [],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS","MANAGE_ROLE"],
			nsfw: false,
			ownerOnly: false,
			cooldown: 1000
		})
	}

	async run (message, args, data) {
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Veuillez mentionner le membre à mettre "membre".')
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Vous ne pouvez pas mettre ce membre "membre"')
        if (!member.manageable) return message.channel.send('Le bot ne peut pas mettre ce membre "membre"')
        let muteRole = message.guild.roles.cache.find(role => role.name === 'Membre')
        if (!muteRole) {
            muteRole = await message.guild.roles.create({
                data: {
                    name: 'Membre',
                    permissions: 2
                }
            })
            message.guild.channels.cache.forEach(channel => channel.createOverwrite(muteRole, {
                SEND_MESSAGES: true,
                CONNECT: true,
                ADD_REACTIONS: true
            }))
        } 
        await member.roles.add(muteRole)
        message.channel.send(`${member} a été mis "membre" !`)
    }}

module.exports = membre;