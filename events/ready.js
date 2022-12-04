const chalk = require('chalk');
const ms = require('ms');

module.exports = async(client) => {
    setTimeout(async function() {
        console.log(chalk.white(`[${chalk.blueBright("Suggestka")}]${chalk.white(" - ")}${chalk.blue("Подключение...")}`));
    }, ms("0.2s"));
    setTimeout(async function() {
        console.log(chalk.white(`[${chalk.blueBright("suggestka")}]${chalk.white(" - ")}${chalk.blue(`Подключенный к ${client.user.tag}`)}`))
        console.log(" ")
    }, ms("1s"));
    console.log(" ")

    await client.user.setPresence({ activities: [{ name: "В разработке || Версия 1.0.2" }] });
}
