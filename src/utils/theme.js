import chalk from 'chalk';

export const orange = chalk.hex('#FFA500');
export const orangeBold = chalk.hex('#FFA500').bold;
export const blackBgOrange = chalk.bgHex('#FFA500').black.bold;
export const orangeBgBlack = chalk.bgBlack.hex('#FFA500');

export const theme = {
  info: (msg) => console.log(orange(msg)),
  success: (msg) => console.log(orangeBold(`✓ ${msg}`)),
  error: (msg) => console.log(chalk.red.bold(`✗ ${msg}`)),
  header: (msg) => {
    console.log('\n' + blackBgOrange(` HUGGIT `) + ' ' + orangeBold(msg) + '\n');
  },
  step: (msg) => console.log(orange(`➤ ${msg}`)),
  highlight: (msg) => orangeBold(msg),
};
