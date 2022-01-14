const Command = require("../../base/Command.js"),
    Discord = require("discord.js");

class randomchiffre extends Command {

    constructor (client) {
        super(client, {
            name: "randomchiffre",
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "randomnumber" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 5000
        });
    }

    async run (message, args, data) {
        function randomInt([min, max]) {
            if (min > max) {
              [min, max] = [max, min];
            }
            return Math.floor(Math.random() * (max - min + 1) + min);
          }

        const emojis = this.client.customEmojis;
        
  const embedMin = new Discord.MessageEmbed()
    .setTitle(`🎲 Nombre aléatoire 🎲`)
    .setColor('#FF0000')
    .setDescription(`Quel est le plus nombre minimum ?`);

  await message.channel.send(embedMin);
  

  const filter = (response) =>
    response.author.id === message.author.id && !isNaN(response.content.trim());

  const collector = message.channel.createMessageCollector(filter, {
    
    time: 60000, // ms
    
    max: 2,
  });

  
  const limits = [];

  collector.on('collect', async (response) => {
    const num = parseInt(response.content.trim(), 10);
    if(limits > num) {
    return message.channel.send(`${emojis.error} Votre chiffre **${num}** est plus petit que **${limits}**`)
    }
    limits.push(num);

    
    if (limits.length === 1) {
      const embedMax = new Discord.MessageEmbed()
        .setTitle(`🎲 Nombre aléatoire 🎲`)
        .setColor('#FF0000')
        .addField('Minimum', limits[0])
        .setDescription(`Quel est le nombre maximum ?`);

      
      message.channel.send(embedMax);
    }
  });


  collector.on('end', (collected, reason) => {
    if (reason === 'time') {
        message.channel.send(`${emojis.error} La commande a expirée.`)
    }

    if (limits.length === 2) {
      // get a random number
      const embedRandom = new Discord.MessageEmbed()
        .setTitle(`🎲 Nombre aléatoire 🎲`)
        .setColor('#FF0000')
        .addField('Minimum', limits[0], true)
        .addField('Maximum', limits[1], true)
        .setDescription(`Votre nombre est: ${randomInt(limits)}`);

      message.channel.send(embedRandom);
    }
})
    }
}

module.exports = randomchiffre;