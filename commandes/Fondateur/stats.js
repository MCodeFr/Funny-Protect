const { version } = require("moment");
const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class stats extends Command {

	constructor (client) {
		super(client, {
			name: "stats",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			aliases: [],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: true,
			cooldown: 3000
		});
	}

	async run (message, args, data) {
        const embedRandom = new Discord.MessageEmbed()
        .setTitle(`Info sur moi`)
        .setColor('#FF1000')
        .addField("Full Username:", user.tag , true)
        .addField("ID:", user.id, true)
        .addField("Created at:", user.createdAt, true)
        .addField("Status:", user.presence.status , true)
        .addField("Game:", user.presence.game ? user.presence.game : 'none' , true)
        .addField("Roles", member.roles.map(r => `${r}`).join(' | '), true)
        .setDescription(`Voici une liste d'informations`);

      message.channel.send(embedRandom);
    }}





module.exports = stats;