import * as TelegramBot from 'node-telegram-bot-api';
import TelegramService from './services/tg.service';
import TextControllersHanlder from './controllers/text.controllers';

//get Token
const tService = new TelegramService();
tService.setTelegramTokenFromEnv();

const token = '693717774:AAGoC75gIkhfVyDibUgbi3A2CyJOS_twmJc';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

const textControllers = new TextControllersHanlder(bot);

bot.onText(/\/ping/, (msg) => textControllers.pingHandler(msg));
