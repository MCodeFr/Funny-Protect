const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class rules extends Command {

	constructor (client) {
		super(client, {
			name: "rules",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: [],
			memberPermissions: [ "MANAGE_CHANNEL" ],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS"],
			nsfw: false,
			ownerOnly: false,
			cooldown: 10000
		})
	}

	async run (message, args, data) {
        function makeChannel(message){
			var server = message.guild;
			var name = message.author.username;
		
			server.createRole(data);
			var newrole = server.roles.find("Règlement", name);
			message.author.addrole(newrole);
		
			/* The above 3 lines all work perfectly */
		
		
			bot.createChannel(server,name);
		}
    }}

module.exports = rules;