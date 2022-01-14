const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class serveur extends Command {

	constructor (client) {
		super(client, {
			name: "serveur",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: [],
			memberPermissions: ["MANAGE_GUILD"],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS"],
			nsfw: false,
			ownerOnly: false,
			cooldown: 10000
		})
	}

	async run (message, args, data) {
            message.reply("Tien le serveur du créateur\nhttps://discord.gg/s53dpW43K8")
            console.log("commande serveur créateur réussi !!!")
            message.delete();
        }
    }

module.exports = serveur;