const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class Ban extends Command {

	constructor (client) {
		super(client, {
			name: "ban",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: [],
			memberPermissions: [ "BAN_MEMBERS" ],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "BAN_MEMBERS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 10000
		})
	}

	async run (message, args, data) {

        const emojis = this.client.customEmojis;
        
		const user = await this.client.resolveUser(args[0]);
		if(!user){
			return message.channel.send(`${emojis.error} Vous n'avez pas mentionné l'utilisateur a bannir.`);
		}
        

		if(user.id === message.author.id){
			return message.channel.send(`${emojis.error} Vous ne pouvez pas vous bannir.`);
		}

		// If the user is already banned
		const banned = await message.guild.fetchBans();
		if(banned.some((m) => m.user.id === user.id)){
			return message.channel.send(`${emojis.error} Cet utilisateur est déja banni.`)
		}
        
		// Gets the ban reason
		let reason = args.slice(1).join(" ");
		if(!reason){
			reason = "Aucune raison n'a été envoyée"
		}

		const member = await message.guild.members.fetch(user.id).catch(() => {});
		if(member){
			const memberPosition = member.roles.highest.position;
			const moderationPosition = message.member.roles.highest.position;
			if(message.member.ownerID !== message.author.id && !(moderationPosition > memberPosition)){
				return message.channel.send(`${emojis.error} Vous ne pouvez pas bannir un membre plus haut que votre rôle.`);
			}
			if(!member.bannable) {
				return message.channel.send(`${emojis.error} Ce membre ne peut pas être banni.`);
			}
		}
        
		await user.send(`Vous avez été banni de ${message.guild.name} par ${message.author.tag} pour la raison: \`${reason}\``).catch(() => {});

		
		message.guild.members.ban(user, { reason } ).then(() => {


			message.channel.send(`${emojis.success} ${user.tag} a bien été banni pour la raison: \`${reason}\``);

		}).catch((err) => {
			console.log(err);
			return message.channel.send(`${emojis.error} Je n'ai pas la permission de bannir cette personne.`);
		});

	}

}

module.exports = Ban;

