import * as TelegramBot from "node-telegram-bot-api";
import TelegramService from "./services/tg.service";
import TextControllersHanlder from "./controllers/text.controllers";
import CacheService from "./services/cache.service";
import RadarService from "./services/radar.service";

//get Token
const tService = new TelegramService();
const CS = new CacheService();
const RS = new RadarService();

tService.setTelegramTokenFromEnv();

const token = tService.getTelegramToken();
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

const textControllers = new TextControllersHanlder(bot);

bot.onText(/\/ping/, msg => textControllers.pingHandler(msg));

bot.onText(/\/start/, async msg => {
  const chatId = msg.chat.id;
  await bot.sendMessage(
    chatId,
    `Вас приветствует 👋 👋 👋  бот @mRadarMoldovaBot.Вы можете отправить свое место положения 🚩🚩🚩 📢📢📢:\n
      1)Сообщать о потруле 🗣🗣🗣 🚓🚓🚓 \n 
      2)Узнать о потруле в интересуемом от Вас радиусе 👀👀 \n`
  );
  await textControllers.pingHandler(msg);
});

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
            text: "Показать информацию в радиусе 10км",
            callback_data: JSON.stringify({
              add: false,
              km: 2
            })
          }
        ],
        [
          {
            text: "Показать информацию в радиусе 20км",
            callback_data: JSON.stringify({
              add: false,
              km: 5
            })
          }
        ],
        [
          {
            text: "Показать информацию в радиусе 40км",
            callback_data: JSON.stringify({
              add: false,
              km: 10
            })
          }
        ],
        [
          {
            text: "Показать информацию в радиусе 60км",
            callback_data: JSON.stringify({
              add: false,
              km: 30
            })
          }
        ],
        [
          {
            text: "Показать информацию в радиусе 80км",
            callback_data: JSON.stringify({
              add: false,
              km: 50
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
  let fromCache = await CS.getValue(from.id);
  const userLocationData = JSON.parse(fromCache.data.data);

  if (fromCache.error) {
    bot.sendMessage(from.id, "Действие следует выбирать в течении 60 мин");
    return;
  }
  if (data.add) {
    await RS.createRadarPoint(
      userLocationData.latitude,
      userLocationData.longitude
    );
    bot.sendMessage(from.id, "ответ сохранен");
    return;
  }

  const linkG = await RS.getRadarPoint(
    userLocationData.latitude,
    userLocationData.longitude,
    data.km
  );
  bot.sendPhoto(from.id, linkG);
});
