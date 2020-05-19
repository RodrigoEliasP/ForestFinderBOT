const Discord = require('discord.js');
let Config = require('./json/config.json');
const status = require('./modules/status');
const Monsters = require('./json/Monsters.json');
const fs = require('fs');

const client = new Discord.Client();


client.login(Config.token);

client.on('ready', ()=>{
    console.log(`Bot foi iniciado, com ${client.users.cache.size} usuários, em ${client.channels.cache.size} canais, em ${client.guilds.cache.size} servidores`);
    client.user.setActivity(`Eu estou em ${client.guilds.cache.size} servidores`);
});

client.on('guildCreate', guild => {
    console.log(`O bot entrou no servidor: ${guild.name} (id: ${guild.id}). População: ${guild.memberCount} membros!`);
    client.user.setActivity(`estou online em ${client.guilds.cache.size} servidores!`);
});

client.on('guildDelete', guild => {
    console.log(`O bot foi removido do servidor: ${guild.name} (id: ${guild.id}). População: ${guild.memberCount} membros!`);
    client.user.setActivity(`estou online em ${client.guilds.cache.size} servidores!`);
});

client.on('message', async msg =>{
    if(msg.author.bot) return;
    if(msg.channel.type === "dm") return;

    const args = msg.content.slice(Config.prefix.length).trim().split(/ +/g);
    const prefix = msg.content.slice(0,Config.prefix.length).trim();
    const comando = args.shift().toLowerCase();

    
    if(prefix === Config.prefix){
        //comando ping
        switch(comando){
            case "ping":
                const m = await msg.channel.send("Ping");
                m.edit(`pong! A latência é ${m.createdTimestamp - msg.createdTimestamp}ms`);
            break;
            //comando wiki
            case "wiki":
                const wikiItem = msg.content.slice(comando.length + Config.prefix.length).trim();
                let wikiErro = true;
                Monsters.forEach(element => {
                    if(element.Name === wikiItem){
                        wikiErro = false;
                        msg.channel.send(element.Wiki);
                    }
                });
                if(wikiErro){
                    msg.channel.send(`${wikiItem} não foi encontrado`);
                }
            break;
            //comando status
            case "status":
                const statusItem = msg.content.slice(comando.length + Config.prefix.length).trim();
                let statusErro = true;
                Monsters.forEach(element => {
                    if(element.Name === statusItem){
                        statusErro = false;
                        let imageName = `${element.Name.replace(" ","")}`;
                        const messageEmbed = status.status(element.Status,element.Name,element.Description,element.Wiki,imageName);
                        msg.channel.send(messageEmbed);
                    }
                });
                if(statusErro){
                    msg.channel.send(`${statusItem} não foi encontrado`);
                }
            break;
            //comando prefix
            case "prefix":
                const prefixItem = msg.content.slice(comando.length + Config.prefix.length).trim();
                if(prefixItem === Config.prefix){
                    msg.channel.send(`O prefixo do bot já é ${prefixItem}`);
                }else{
                    Config.prefix = prefixItem;
                    fs.writeFile("./src/json/config.json",JSON.stringify(Config), err=>{
                        if(err !== null){
                        console.log(err);
                        }else{
                            msg.channel.send(`O prefixo do bot foi alterado com sucesso para ${prefixItem}`);
                        }
                    });
                }
            break;
            case "link": 
                msg.channel.send(`Me adicione no seu servidor ${Config.addLink}`);
            break;
        }
    }
});

