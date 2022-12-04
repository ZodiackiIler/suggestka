const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: "accept",
    category: "Suggestions",
    description: "Примите предложение.",
    aliases: [" "],
    usage: "accept <messageID> [reason]",
    userPermissions: ["MANAGE_CHANNELS"],
    run: async(client, message, args, util) => {
        const channel = db.fetch(`suggestionChannel_${message.guild.id}`)
        if(channel === null) {
            const noChannel = new MessageEmbed()
            .setDescription(`Сначала вы должны установить канал предложения: \`&&setchannel\``)
            .setColor(client.colors.red)
            .setFooter(message.author.username, message.author.displayAvatarURL())

            return message.channel.send({
                embeds: [noChannel]
            })
        }
        if(!args[0]) {
            const noArgs = new MessageEmbed()
            .setDescription("Пожалуйста, предоставьте message ID")
            .setColor(client.colors.red)
            .setFooter(message.author.username, message.author.displayAvatarURL())

            return message.channel.send({
                embeds: [noArgs]
            })
        }

        try {
            const suggestedEmbed = await message.guild.channels.cache.get(channel).messages.fetch(args[0])
    
            const data = suggestedEmbed.embeds[0]
    
            const accepted = new MessageEmbed()
            .setAuthor(data.author.name, data.author.iconURL)
            .setDescription(data.description)
            .setColor(client.colors.green)
            .addField("Статус: одобрено", `${args.slice(1).join(" ") || "-"}`)
    
            await suggestedEmbed.edit({
                embeds: [accepted]
            })
            .then(async() => {
                await suggestedEmbed.reactions.removeAll();
            })
            .then(async() => {
                const success = new MessageEmbed()
                .setDescription(`Предложение с помощью ID \`${args[0]}\` было одобрено`)
                .setColor(client.colors.green)
                .setFooter(message.author.username, message.author.displayAvatarURL())

                await message.channel.send({
                    embeds: [success]
                })
            })
        } catch {
            return util.errorEmbed(client, message, "Пожалуйста, предоставьте действительный message ID", client.colors.red)
        }
    }
}