const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class ball extends Command {

	constructor (client) {
		super(client, {
			name: "8ball",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			aliases: ["question"],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000
		});
	}

	async run (message, args, data) {
		const emojis = this.client.customEmojis;

        if (!args[0]) return message.channel.send(`${emojis.error} Veuillez **poser une question**\nMets juste un point '?' à la fin frère ça marche aussi`)
		if (!args.slice(0).join(" ").includes("?")) return message.channel.send(`${emojis.error} Le message ne contient pas de "?"`)
      const reponses = ["Non :x:", "J'ai envie de dormir :zzz:", "Balec :face_palm:", "Peut être... :thinking:", "Absolument :interrobang:", "Laisse moi à la fin :lock:", "T'as cru que j'allais te répondre ?:robot:", "Tranquille et toi ?:good:"]
      const question = args.slice(0).join(" ")
      const embedRandom = new Discord.MessageEmbed()
        .setTitle(`Réponse au 8ball de ${message.author.username}`)
        .setColor('#FF1000')
        .addField("Question :", question)
        .addField("Ma Réponse :", reponses[Math.floor(Math.random() * reponses.length)])
        .setDescription(`**Le jeu 8ball est un jeu consistant à poser une question et le bot y réponds**`);

      message.channel.send(embedRandom);
    }}


module.exports = ball;