class TextControllersHanlder {
  private bot: any;

  constructor(bot: any) {
    this.bot = bot;
  }

  async pingHandler(msg: any): Promise<any> {
    const chatId = msg.chat.id;
    await this.bot.sendMessage(chatId, "Действуй", {
      text: "send location",
      reply_markup: {
        keyboard: [
          [
            {
              text: "Send Location",
              request_location: true
            }
          ],
          [
            {
              text: "Отправить местоположение",
              request_location: true
            }
          ],
          [
            {
              text: "Trimiteți locația",
              request_location: true
            }
          ]
        ]
      }
    });
  }
}

export default TextControllersHanlder;
