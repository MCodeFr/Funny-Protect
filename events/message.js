const cmdCooldown = {};


module.exports = class {
	constructor (client) {
		this.client = client;
	}

	async run (message) {

		const data = {};

        const emojis = this.client.customEmojis;

		
		if(message.author.bot){
			return;
		}

		
		if(message.guild && !message.member){
			await message.guild.members.fetch(message.author.id);
		}

		const client = this.client;
		data.config = client.config;

		if(message.guild){
			// données du serveur
			const guild = await client.findOrCreateGuild({ id: message.guild.id });
			message.guild.data = data.guild = guild;
		}

        const prefix = client.functions.getPrefix(message, data);

		if(message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))){
			if(message.guild){
				return message.reply(`Salut ${message.author.username} mon préfix est **${prefix}**`)
			}
		}

		if(message.guild){
			// données du membre
			const memberData = await client.findOrCreateMember({ id: message.author.id, guildID: message.guild.id });
			data.memberData = memberData;
		}

		if(!prefix){
			return;
		}

        const argsprefix = message.content.slice(0, prefix.length)
		const args = message.content.slice((typeof prefix === "string" ? prefix.length : 0)).trim().split(/ +/g);
		const command = args.shift().toLowerCase();
		const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));

        if(argsprefix !== prefix) return;
         
        if(!cmd && message.guild) return;
        else if (!cmd && !message.guild) {
			return message.author.send(`${message.author.username} vous êtes actuellement en message direct, vous pouvez donc éxécuter certaines commandes.`);
		}


		if(cmd.conf.guildOnly && !message.guild){
			return message.author.send(`${emojis.error} Cette commande ne marche seulement sur un serveur`);
		}

		if(message.guild){
			let neededPermissions = [];
			if(!cmd.conf.botPermissions.includes("EMBED_LINKS")){
				cmd.conf.botPermissions.push("EMBED_LINKS");
			}
			cmd.conf.botPermissions.forEach((perm) => {
				if(!message.channel.permissionsFor(message.guild.me).has(perm)){
					neededPermissions.push(perm);
				}
			});
			if(neededPermissions.length > 0){
				return message.channel.send(`${emojis.error} J'ai besoin des permissions suivantes pour éxécuter cette commande: ${neededPermissions.map((p) => `\`${p}\``).join(", ")}`)
			}
			neededPermissions = [];
			cmd.conf.memberPermissions.forEach((perm) => {
				if(!message.channel.permissionsFor(message.member).has(perm)){
					neededPermissions.push(perm);
				}
			});
			if(neededPermissions.length > 0){
				return message.channel.send(`${emojis.error} Vous avez besoin des permissions suivantes pour éxécuter cette commande: ${neededPermissions.map((p) => `\`${p}\``).join(", ")}`)
			}
			if(!message.channel.permissionsFor(message.member).has("MENTION_EVERYONE") && (message.content.includes("@everyone") || message.content.includes("@here"))){
				return message.channel.send(`${emojis.error} Vous n'avez pas la permission de mentionner **everyone** et **here**.`);
			}
			if(!message.channel.nsfw && cmd.conf.nsfw){
				return message.channel.send(`${emojis.error} Cette commande ne marche seulement que dans un salon NSFW.`);
			}
		}

		if(!cmd.conf.enabled){
			return message.channel.send(`${emojis.error} Cette commande a été désactivée.`);
		}

		if(cmd.conf.ownerOnly && message.author.id !== client.config.owner.id){
			return message.channel.send(`${emojis.error} Seul mon créateur peut éxécuter cette commande.`);
		}

		let uCooldown = cmdCooldown[message.author.id];
		if(!uCooldown){
			cmdCooldown[message.author.id] = {};
			uCooldown = cmdCooldown[message.author.id];
		}
		const time = uCooldown[cmd.help.name] || 0;
		if(time && (time > Date.now())){
			return message.channel.send(`Veuillez patentier **${Math.ceil((time-Date.now())/1000)}s**`);
		}
		cmdCooldown[message.author.id][cmd.help.name] = Date.now() + cmd.conf.cooldown;

        if(!message.guild) {
            client.logger.log(`MP | ${message.author.username} (${message.author.id}) a éxécuté la commande ${cmd.help.name}`, "cmd");
        }else{
            client.logger.log(`${message.guild.name} | ${message.author.username} (${message.author.id}) a éxécuté la commande ${cmd.help.name}`, "cmd");
        }
		
        try {
			cmd.run(message, args, data);
		} catch(e){
			console.error(e);
			return message.channel.send("Erreure détectée !")
		}
	}
};