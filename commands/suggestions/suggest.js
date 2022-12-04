const { MessageEmbed } = require("discord.js");
const db = require('quick.db');

module.exports = {
    name: "suggest",
    category: "Suggestions",
    description: "Предложи что-нибудь.",
    aliases: [" "],
    usage: "suggest <suggestion>",
    run: async(client, message, args, util) => {
        const channel = await db.fetch(`suggestionChannel_${message.guild.id}`)
        if(channel === null) {
            const noChannel = new MessageEmbed()
            .setDescription(`Сначала вы должны установить канал предложения: \`&&setchannel\``)
            .setColor(client.colors.red)
            .setFooter(message.author.username, message.author.displayAvatarURL())

            return message.channel.send({
                embeds: [noChannel]
            })
        }
        if(!args.length) {
            const noArgs = new MessageEmbed()
            .setDescription(`Пожалуйста, предоставьте предложение`)
            .setColor(client.colors.red)
            .setFooter(message.author.username, message.author.displayAvatarURL())

            return message.channel.send({
                embeds: [noArgs]
            })
        }

        try {
            const suggested = new MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setDescription(args.join(" "))
            .setColor(client.colors.orange)
            .setTimestamp()
            .addField("Статус: ожидание", "-")
            client.channels.cache.get(channel).send({
                embeds: [suggested]
            })
            .then(async(m) => {
                await m.react("🔼")
                await m.react("🔽")
            })
            .then(async() => {
                const success = new MessageEmbed()
                .setDescription(`Ваше предложение было отправлено в <#${channel}>`)
                .setColor(client.colors.green)
                .setFooter(message.author.username, message.author.displayAvatarURL())

                await message.channel.send({
                    embeds: [success]
                })
            })
            .catch(async() => {
                const noPerms = new MessageEmbed()
                .setDescription(`__Я__ не имею разрешения отправлять сообщения в канале предложений`)
                .setColor(client.colors.red)
                .setFooter(`© TenebraeDev`, client.user.displayAvatarURL())
    
                return message.channel.send({
                    embeds: [noPerms]
                })
            })
        } catch {
            return util.errorEmbed(client, message, "Произошла ошибка, пожалуйста, попробуйте еще раз", client.colors.red)
        }

        
    }
}