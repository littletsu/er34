const util = require('util');
const chalk = require('chalk');

module.exports = class Logger {
    constructor() {

    }

    date() {
        const date = new Date();
        return `[${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}]`
    }

    inspect(msg) {
        return typeof msg == "object" ? util.inspect(msg) : msg
    }

    debug(msg) {
        console.log(chalk.gray(`[debug] ${this.date()}: ${this.inspect(msg)}`))
    }

    info(msg) {
        console.log(chalk.cyan(`[info] ${this.date()}: ${this.inspect(msg)}`))
    }

    error(msg) {
        console.log(chalk.redBright(`[error] ${this.date()}: ${this.inspect(msg)}`))
    }

    warn(msg) {
        console.log(chalk.yellowBright(`[warn] ${this.date()}: ${this.inspect(msg)}`))
    }
}