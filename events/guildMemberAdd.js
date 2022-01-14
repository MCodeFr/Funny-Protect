module.exports = class {

	constructor (client) {
		this.client = client;
	}

	async run (member) {
        member.guild.fetch().then(async (guild, data, message) => {

        const guildData = await this.client.findOrCreateGuild({ id: guild.id });
        member.guild.data = guildData;


        message.author.send(`Bienvenue  toi, ${member} sur ${guild.name} !`).catch(() => {});
        })
        }
    }
