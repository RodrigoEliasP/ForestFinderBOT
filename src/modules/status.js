const Discord = require('discord.js');
const fs = require('fs');

module.exports = {status: function returnStatus(monster,name,desc,link,image){
    const exampleEmbed = new Discord.MessageEmbed()
    if(!fs.existsSync(`./src/images/${image}.gif`)){
        exampleEmbed
        .setColor('#0099ff')
        .setTitle(name)
        .setURL(link)
        .setDescription(desc)
        .addFields(
            { name: 'Nível', value: monster.Level, inline: true },
            { name: 'HP', value: (monster.HP != 0)?monster.HP:'sem informações', inline: true },
            { name: '\u200B', value: '\u200B' },
            { name: 'XP', value: (monster.XP != 0)?monster.XP:'sem informações', inline: true },
            { name: 'Gold', value: (monster.Gold != 0)?monster.Gold:'sem informações', inline: true },
            { name: '\u200B', value: '\u200B' },
            { name: 'Velocidade de ataque', value: monster["Attack speed"], inline: true },
            { name: 'Dano', value: (monster.Damage != 0)?monster.Damage:'sem informações', inline: true },
            { name: '\u200B', value: '\u200B' },
            { name: 'Velocidade de rensacimento', value: monster["Respawn time"], inline: true },
            { name: 'Achado em', value: monster.Found, inline: true },
        )
        .setTimestamp()
        .setFooter(`informação do ${name}`);
        return exampleEmbed
    }else{
        exampleEmbed
        .setColor('#0099ff')
        .attachFiles([`./src/images/${image}.gif`])
        .setThumbnail(`attachment://${image}.gif`)
        .setTitle(name)
        .setURL(link)
        .setDescription(desc)
        .addFields(
            { name: 'Nível', value: monster.Level, inline: true },
            { name: 'HP', value: (monster.HP != 0)?monster.HP:'sem informações', inline: true },
            { name: '\u200B', value: '\u200B' },
            { name: 'XP', value: (monster.XP != 0)?monster.XP:'sem informações', inline: true },
            { name: 'Gold', value: (monster.Gold != 0)?monster.Gold:'sem informações', inline: true },
            { name: '\u200B', value: '\u200B' },
            { name: 'Velocidade de ataque', value: monster["Attack speed"], inline: true },
            { name: 'Dano', value: (monster.Damage != 0)?monster.Damage:'sem informações', inline: true },
            { name: '\u200B', value: '\u200B' },
            { name: 'Velocidade de rensacimento', value: monster["Respawn time"], inline: true },
            { name: 'Achado em', value: monster.Found, inline: true },
        )
        .setTimestamp()
        .setFooter(`informação do ${name}`);
        return exampleEmbed
    }
}}