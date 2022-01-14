const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class Help extends Command {
	constructor (client) {
		super(client, {
			name: "help",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			aliases: [ "aide", "h", "commands" ],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 5000
		});
	}

	async run (message, args, data) {
		console.log("MDR");

		if(!args[0]) {

			const categories = [];
			const commands = this.client.commands;
	
			commands.forEach((command) => {
				if(!categories.includes(command.help.category)){
					if(command.help.category === "Fondateur" && message.author.id !== this.client.config.owner.id){
						return;
					}
					categories.push(command.help.category);
				}
			});
	
			const emojis = this.client.customEmojis;
	
			const embed = new Discord.MessageEmbed()
				.setDescription(`**Sécurisez votre serveur tout en vous amusant**\n⚡ Pour obtenir de l'aide sur une commande spécifique tapez **${this.client.config.prefix}help <commande>** !`)
				.setColor('#FF0000')
				.setFooter(`Funny Bot | Crée par Eragon941 | Version du bot : V1.0.0`);
			categories.sort().forEach((cat) => {
				const tCommands = commands.filter((cmd) => cmd.help.category === cat);
				embed.addField(emojis.categories[cat.toLowerCase()]+" "+cat+" :", tCommands.map((cmd) => "`"+cmd.help.name+"`").join(", "));
			});
			
			embed.addField("\u200B",`**[Inviter](${await this.client.generateInvite({permissions: ["ADMINISTRATOR"]})}) - [Serveur](${this.client.config.support.serverlink})**`)
			embed.setAuthor(`${this.client.user.username}`, this.client.user.displayAvatarURL({ size: 512, dynamic: true, format: "png" }))
			return message.reply(embed);
	
			}

		// if a command is provided
		if(args[0]){
            
			// if the command doesn't exist, error message
			const cmd = this.client.commands.get(args[0]) || this.client.commands.get(this.client.aliases.get(args[0]));
			if(!cmd){
				return message.channel.send(`${emojis.error} La commande \`${args[0]}\` n'a pas été trouvée.`);
			}

			// Creates the help embed
			const groupEmbed = new Discord.MessageEmbed()
				.setAuthor(`${this.client.config.prefix}${cmd.help.name}`)
				.addField(
					`Catégorie`,
					cmd.help.category
				)
				.addField(`Cooldown`, cmd.conf.cooldown)
				.addField(
					`Aliases`,
					cmd.help.aliases.length > 0
						? cmd.help.aliases.map(a => "`" + a + "`").join(", ")
						: `Aucun aliases`
				)
				.addField(
					`Permissions`,
					cmd.conf.memberPermissions.length > 0
						? cmd.conf.memberPermissions.map((p) => "`"+p+"`").join(", ")
						: "Aucune permissions n'est requise pour éxécuter cette commande."
				)
				.setColor('#FF0000')
				.setFooter('Funny Bot | Crée par Eragon941');

			// and send the embed in the current channel
			return message.channel.send(groupEmbed);
		}

    }

}

module.exports = Help;