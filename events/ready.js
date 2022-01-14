
module.exports = class {

	constructor (client) {
		this.client = client;
	}

	async run () {

		const client = this.client;


		client.logger.log(`Chargement de ${client.commands.size} commande(s).`, "log");
		client.logger.log(`${client.user.tag}, est prêt a servir ${client.users.cache.size} utilisateurs dans ${client.guilds.cache.size} serveurs.`, "ready");

        
		const status = require("../config.js").status,
			version = require("../package.json").version;
		let i = 0;
		setInterval(function(){
			const toDisplay = status[parseInt(i, 10)].name.replace("{serversCount}", client.guilds.cache.size).replace("{usersCount}", client.users.cache.size).replace("{version}", version);
			client.user.setActivity(toDisplay, {type: status[parseInt(i, 10)].type});
			if(status[parseInt(i+1, 10)]) i++;
			else i = 0;
		}, 20000);
		

		setTimeout(() => {
			console.log("\n\nJe suis pret !");
		}, 400);

	}
};