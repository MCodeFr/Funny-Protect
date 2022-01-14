const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class FindFun extends Command {

	constructor (client) {
		super(client, {
			name: "findfun",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			aliases: ["ObjetFind"],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "MENTION_EVERYONE" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000
		});
	}

	async run (message, args, data) {
        const wallpapers = [
            `**Oh ! Tu as trouvé un ordinateur !** 💻`,
            `**Oh ! Tu as trouvé un verre !** 🍻`,
            `**Oh ! Tu as trouvé une clé à molette !** 🛠`,
            `**Oh ! Tu as trouvé une voiture !** 🚘`,
           ];
           const response = wallpapers[Math.floor(Math.random() * wallpapers.length)];
           message.reply(response);
		};

	}
module.exports = FindFun;