const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class pingsondage extends Command {

	constructor (client) {
		super(client, {
			name: "pingsondage",
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
        if (!member) return message.channel.send('Veuillez mentionner le membre à mettre "Ping Sondage".')
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Vous ne pouvez pas mettre ce membre "Ping Sondage"')
        if (!member.manageable) return message.channel.send('Le bot ne peut pas mettre ce membre "Ping Sondage"')
        let muteRole = message.guild.roles.cache.find(role => role.name === 'Ping Sondage')
        if (!muteRole) {
            muteRole = await message.guild.roles.create({
                data: {
                    name: 'Ping Sondage',
                    permissions: 0
                }
            })
            message.guild.channels.cache.forEach(channel => channel.createOverwrite(muteRole, {
                SEND_MESSAGES: true,
                CONNECT: true,
                ADD_REACTIONS: true
            }))
        } 
        await member.roles.add(muteRole)
        message.channel.send(`${member} a été mis "Ping Sondage" !`)
    }}

module.exports = pingsondage;