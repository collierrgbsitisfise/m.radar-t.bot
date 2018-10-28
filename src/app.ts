import * as TelegramBot from "node-telegram-bot-api";
import TelegramService from "./services/tg.service";
import TextControllersHanlder from "./controllers/text.controllers";
import CacheService from "./services/cache.service";

//get Token
const tService = new TelegramService();
const CS = new CacheService();

tService.setTelegramTokenFromEnv();

const token = tService.getTelegramToken();
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

const textControllers = new TextControllersHanlder(bot);

bot.onText(/\/ping/, msg => textControllers.pingHandler(msg));

bot.on("location", async msg => {
  const { latitude, longitude } = msg.location;
  const chatId = msg.chat.id;
  await CS.setValue(chatId, { latitude, longitude });
  bot.sendMessage(chatId, "Выбирете действие", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Сообщить о потруле",
            callback_data: JSON.stringify({
              add: true,
              km: null
            })
          }
        ],
        [
          {
            text: "Показать инфо о потралу в радиусе 20км",
            callback_data: JSON.stringify({
              add: false,
              km: 20
            })
          }
        ],
        [
          {
            text: "Показать инфо о потралу в радиусе 40км",
            callback_data: JSON.stringify({
              add: false,
              km: 40
            })
          }
        ],
        [
          {
            text: "Показать инфо о потралу в радиусе 60км",
            callback_data: JSON.stringify({
              add: false,
              km: 60
            })
          }
        ],
        [
          {
            text: "Показать инфо о потралу в радиусе 80км",
            callback_data: JSON.stringify({
              add: false,
              km: 80
            })
          }
        ]
      ]
    }
  });
});

bot.on("callback_query", async callbackQuery => {
  const { from } = callbackQuery;
  let data = JSON.parse(callbackQuery.data);
  console.log(data);
  let fromCache = await CS.getValue(from.id);
  if (fromCache.error) {
    bot.sendMessage(from.id, "Действие следует выбирать в течении 60 мин");
    return;
  }
  if (data.add) {
  }
  const userLocationData = JSON.parse(fromCache.data.data);
  console.log(userLocationData);
  bot.sendMessage(from.id, "Sa buded");
});
