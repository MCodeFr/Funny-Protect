const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class partenariat extends Command {

	constructor (client) {
		super(client, {
			name: "partenariat",
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
			var newrole = server.roles.find("Partenariat", name);
			message.author.addrole(newrole);
		
			/* The above 3 lines all work perfectly */
		
		
			bot.createChannel(server,name);
		}
    }}

module.exports = partenariat;