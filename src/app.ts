import * as TelegramBot from 'node-telegram-bot-api';
import TelegramService from './services/tg.service';
import TextControllersHanlder from './controllers/text.controllers';

//get Token
const tService = new TelegramService();
tService.setTelegramTokenFromEnv();

const token = tService.getTelegramToken();

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

const textControllers = new TextControllersHanlder(bot);

bot.onText(/\/ping/, (msg) => textControllers.pingHandler(msg));

bot.on('location', (msg) => {
    console.log(msg.location.latitude);
    console.log(msg.location.longitude);
    console.log(msg.chat.id);
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Выбирете действие", {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: "Сообщить о потруле",
                    url: "example.com",
                }],
                [{
                    text: "Показать инфо о потралу в радиусе 10км",
                    url: "example.com",
                }],
                [{
                    text: "Показать инфо о потралу в радиусе 20км",
                    url: "example.com",
                }],
                [{
                    text: "Показать инфо о потралу в радиусе 30км",
                    url: "example.com",
                }],
                [{
                    text: "Показать инфо о потралу в радиусе 50км",
                    url: "example.com",
                }]
            ],
        },
    });
});