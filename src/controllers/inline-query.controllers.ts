class InlineQueryControllersHanlder {
  private bot: any;

  constructor(bot: any) {
    this.bot = bot;
  }

  pingHandler(msg: any): void {
    const chatId = msg.chat.id;
    this.bot.sendMessage(chatId, "pong");
  }

  inlineQueryHandler(msg) {
    // this.bot.answerInlineQuery(
    //   id,
    //   [
        
    //   ],
    //   { switch_pm_text: "SHORT LINK ", switch_pm_parameter: "x" }
    // );
  }
}

export default InlineQueryControllersHanlder;
