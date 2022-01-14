const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class links extends Command {

	constructor (client) {
		super(client, {
			name: "links",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			aliases: [],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "MENTION_EVERYONE" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000
		});
	}

	async run (message, args, data) {
      const embedRandom = new Discord.MessageEmbed()
        .setTitle(`Mes liens`)
        .setColor('#FF1000')
        .addField(`https://discord.gg/s53dpW43K8`)
        .addField((`https://discord.com/api/oauth2/authorize?client_id=836141771142463528&permissions=4093509110&scope=bot`))
        .setDescription(`Voilà 2 lien à propos de moi`);

      message.channel.send(embedRandom);
    }}


module.exports = links;