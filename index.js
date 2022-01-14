

const	util = require("util"),
	fs = require("fs"),
	readdir = util.promisify(fs.readdir);
	const {  Intents } = require('discord.js');
	const GUILDS = require('discord.js')

const config = require("./config");

// Load Atlanta class
console.log("MDR")
const Funny = require("./base/Funny"),
	client = new Funny({ intents: [
		GUILDS,
		GUILD_MESSAGE_REACTIONS,
		GUILD_MESSAGES,
		GUILD_INVITES,
		GUILD_VOICE_STATES,
		GUILD_MEMBERS,
		GUILD_PRESENCES
] })

const init = async () => {

	// Search for all commands
	const directories = await readdir("./commandes/");
	client.logger.log(`Chargement de ${directories.length} catégories.`, "log");
	directories.forEach(async (dir) => {
		const commands = await readdir("./commandes/"+dir+"/");
		commands.filter((cmd) => cmd.split(".").pop() === "js").forEach((cmd) => {
			const response = client.loadCommand("./commandes/"+dir, cmd);
			if(response){
				client.logger.log(response, "error");
			}
		});
	});
		

	// Then we load events, which will include our message and ready event.
	const evtFiles = await readdir("./events/");
	client.logger.log(`Chargement de ${evtFiles.length} events.`, "log");
	evtFiles.forEach((file) => {
		const eventName = file.split(".")[0];
		client.logger.log(`Chargement event: ${eventName} ✔️`);
		const event = new (require(`./events/${file}`))(client);
		client.on(eventName, (...args) => event.run(...args));
		delete require.cache[require.resolve(`./events/${file}`)];
	});
    
	client.login(client.config.token); // Log in to the discord api
	
init();

// if there are errors, log them
client.on("disconnect", () => client.logger.log("Bot is disconnecting...", "warn"))
	.on("reconnecting", () => client.logger.log("Bot reconnecting...", "log"))
	.on("error", (e) => client.logger.log(e, "error"))
	.on("warn", (info) => client.logger.log(info, "warn"));

// if there is an unhandledRejection, log them
process.on("unhandledRejection", (err) => {
	console.error(err);
});
}
////////////////////////////////////////////////////////////////////////////////
