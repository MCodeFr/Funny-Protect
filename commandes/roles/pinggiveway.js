const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class pinggiveway extends Command {

	constructor (client) {
		super(client, {
			name: "pinggiveway",
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
        if (!member) return message.channel.send('Veuillez mentionner le membre à mettre "Ping GiveWay".')
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Vous ne pouvez pas mettre ce membre "Ping GiveWay"')
        if (!member.manageable) return message.channel.send('Le bot ne peut pas mettre ce membre "Ping GiveWay"')
        let muteRole = message.guild.roles.cache.find(role => role.name === 'Ping GiveWay')
        if (!muteRole) {
            muteRole = await message.guild.roles.create({
                data: {
                    name: 'Ping GiveWay',
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
        message.channel.send(`${member} a été mis "Ping GiveWay" !`)
    }}

module.exports = pinggiveway;