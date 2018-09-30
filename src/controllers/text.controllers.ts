class TextControllersHanlder {
    private bot: any;

    constructor(bot: any) {
        this.bot = bot;    
    }

    pingHandler(msg:any): void {
        const chatId = msg.chat.id; 
        this.bot.sendMessage(chatId, 'pong');
    }
}

export default TextControllersHanlder;