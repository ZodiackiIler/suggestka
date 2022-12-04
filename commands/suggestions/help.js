const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: "help",
    category: "Suggestions",
    description: "Помощь.",
    aliases: ["hp"],
    usage: "help",
    userPermissions: ["SEND_MESSAGES"],
    run: async(client, message, args) => {
        if(!args.length) {
            const help = new MessageEmbed()
            .setDescription(`**Помощь**`)
            .setColor(client.colors.green)
            .setTimestamp()
            .addField("*Категория пользователей*", "suggest - Предложить идею \n *Пример*: &&suggest Добавить оформление\n**Категория модераторов**\naccept - Одобрить идею\n*Пример*: &&accept <message_ID>\ndeny - Отказать идеи\n*Пример*: &&deny <message_ID>\nmanagesuggestion - Редактировать идею\n*Пример*: &&managesuggestion <messageID>\n**Категория создателя**\nsetchannel - Установить канал с идеями\n*Пример*: &&setchannel suggestions <channel_ID>")
            .setFooter(`© TenebraeDev`, message.author.displayAvatarURL())

            return message.channel.send({
                embeds: [help]
            })
        }
    }
}
