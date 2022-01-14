module.exports = {

	getPrefix(message, data){
		if(message.channel.type !== "dm"){
			const prefixes = [
				`<@!${message.client.user.id}> `,
				`<@${message.client.user.id}> `,
				message.client.user.username.toLowerCase(),
				data.guild.prefix
			];
			let prefix = null;
			prefixes.forEach((p) => {
				if(message.content.startsWith(p) || message.content.toLowerCase().startsWith(p)){
					prefix = p;
				}
			});
			return prefix;
		} else {
			return true;
		}
	}
};