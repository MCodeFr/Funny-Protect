const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class pub extends Command {

	constructor (client) {
		super(client, {
			name: "pub",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			aliases: [],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS"],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000
		});
	}

	async run (message, args, data) {
        const wallpapers = [
            `**Bonjour, je suis olivier de chez Carglass. Un impact sur votre pare-brise ? Venez vite chez CarGlass ! En plus en ce moment les essuies-glasses bosh sont offerts ! N'oubliez pas Carglass.fr !**\nMoi-"Ouais bah olivier tu vas te calmer ok ? Ton service est pourri et les essuies glasses te tiennent 3 jours et ils craquent du coup tu ré-entends ça et.... tu reviens chez eux !"`,
            '**Zalando – Hurlez de plaisir.**\nMoi-"Et criez devant les prix !"',
            '**Twix – La pause Twix, c’est sacré**\nMoi-"On a un dieu qui se nomme Twix.. NAN donc faut pas rendre un culte je sais pas quoi pour un goûter frr"',
            '**Red Bull – La boisson qui donne des aiiiles.**\nMoi-"Frr tu as déjà vu un gars voler après avoir bu du red bull ? Moi nan donc lâche nous mdr"',
            '**Fleury Michon – Elle est pas belle la vie ?**\nMoi-"Bah ça dépend des jours quand tu viens de te manger un 0 en maths non elle est pas belle la vie même avec ça"',
            '**Danette – Tout le monde se lève pour Danette !**\nMoi-"Bah nan hein moi je sais pas vous mais je mange mon dessert assis sur ma chaise à la limite je me lève pour la chercher mais pour la manger je reste assis quoi"',
            '**Crédit Mutuel – La banque à qui parler**\nMoi-"Bah nan hein nan car si tu parles à un bâtiment il faut commencer à consulter hein"',
			'**Yves Rocher – Se réinventer chaque jour..**\nMoi-"Bah nan nan clairement pas parce que pour ce réinventer chaque jour faut être *On fire*"',
           ];
           const response = wallpapers[Math.floor(Math.random() * wallpapers.length)];
           message.reply(response);
		};

	}
module.exports = pub;