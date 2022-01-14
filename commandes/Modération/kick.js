const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class kick extends Command {

	constructor (client) {
		super(client, {
			name: "kick",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: [],
			memberPermissions: [ "KICK_MEMBERS" ],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "KICK_MEMBERS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000
		});
	}
    async run (message, args, data) {

        const emojis = this.client.customEmojis;
        
		const user = await this.client.resolveUser(args[0]);
		if(!user){
			return message.channel.send(`${emojis.error} Vous n'avez pas mentionné l'utilisateur a kick.`);
		}
        

		if(user.id === message.author.id){
			return message.channel.send(`${emojis.error} Vous ne pouvez pas vous kick.`);
		}

		// If the user is already banned
		const kick = await message.guild.fetchBans();
		if(kick.some((m) => m.user.id === user.id)){
			return message.channel.send(`${emojis.error} Cet utilisateur est déja kicker.`)
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
				return message.channel.send(`${emojis.error} Vous ne pouvez pas kicker un membre plus haut que votre rôle.`);
			}
			if(!member.kick) {
				return message.channel.send(`${emojis.error} Ce membre ne peut pas être kicker.`);
			}
		}
        
		await user.send(`Vous avez été kicker de ${message.guild.name} par ${message.author.tag} pour la raison: \`${reason}\``).catch(() => {});

		
		message.guild.members.kick(user, { reason } ).then(() => {


			message.channel.send(`${emojis.success} ${user.tag} a bien été kicker pour la raison: \`${reason}\``);

		}).catch((err) => {
			console.log(err);
			return message.channel.send(`${emojis.error} Je n'ai pas la permission de kicker cette personne.`);
		});

	}

}

module.exports = kick;
