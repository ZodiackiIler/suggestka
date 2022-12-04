const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: "setchannel",
    category: "Suggestions",
    description: "Установите канал для событий.",
    aliases: ["sc"],
    usage: "setchannel <event> <channel>",
    userPermissions: ["ADMINISTRATOR"],
    run: async(client, message, args) => {
        if(args[0] === "suggestions") {
            let channel = message.mentions.channels.first()
            if(!channel) {
                const noChannel = new MessageEmbed()
                .setDescription(`Пожалуйста, укажите канал`)
                .setColor(client.colors.red)
                .setFooter(message.author.username, message.author.displayAvatarURL())

                return message.channel.send({
                    embeds: [noChannel]
                })
            }

            db.set(`suggestionChannel_${message.guild.id}`, channel.id)

            const success = new MessageEmbed()
            .setDescription(`Установите канал предложения в ${channel}`)
            .setColor(client.colors.green)
            .setFooter(message.author.username, message.author.displayAvatarURL())

            return message.channel.send({
                embeds: [success]
            })
        } else {
            const noArgs = new MessageEmbed()
            .setDescription(`Пожалуйста, укажите действительное событие\n\nДействительные События: \`suggestions\``)
            .setColor(client.colors.red)
            .setFooter(`© TenebraeDev`, client.user.displayAvatarURL())

            return message.channel.send({
                embeds: [noArgs]
            })
        }
    }
}
