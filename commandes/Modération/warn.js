const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class warn extends Command {

	constructor (client) {
		super(client, {
			name: "warn",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: [],
			memberPermissions: [ "MANAGE_MESSAGES" ],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "MANAGES_MESSAGES"],
			nsfw: false,
			ownerOnly: false,
			cooldown: 10000
		})
	}

	async run (message, args, data) {
        const emojis = this.client.customEmojis;
        
		const user = await this.client.resolveUser(args[0]);
		if(!user){
			return message.channel.send(`${emojis.error} Vous n'avez pas mentionné l'utilisateur a warn.`);
		}
        

		if(user.id === message.author.id){
			return message.channel.send(`${emojis.error} Vous ne pouvez pas vous warn.`);
		}
        
		// Gets the warn reason
		let reason = args.slice(1).join(" ");
		if(!reason){
			reason = "Aucune raison n'a été envoyée"
		}

		const member = await message.guild.members.fetch(user.id).catch(() => {});
		if(member){
			const memberPosition = member.roles.highest.position;
			const moderationPosition = message.member.roles.highest.position;
			if(message.member.ownerID !== message.author.id && !(moderationPosition > memberPosition)){
				return message.channel.send(`${emojis.error} Vous ne pouvez pas warn un membre plus haut que votre rôle.`);
			}
			if(!member.bannable) {
				return message.channel.send(`${emojis.error} Ce membre ne peut pas être warn.`);
			}
		}
        
		await user.send(`Vous avez été warn de ${message.guild.name} par ${message.author.tag} pour la raison: \`${reason}\``).catch(() => {});


			message.channel.send(`${emojis.success} ${user.tag} a bien été warn pour la raison: \`${reason}\``);

			console.log(err);
			return message.channel.send(`${emojis.error} Je n'ai pas la permission de  cette personne.`);

	}

}
        

module.exports = warn;