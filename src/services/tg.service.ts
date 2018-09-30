class TelegramService {
    private tgToken: string;

    getTelegramToken(): string {
        return this.tgToken;
    }
    
    setTelegramTokenFromEnv(): void {
        this.tgToken = process.env.TG_TOKEN; 
    }

    setTelegramTokenForce(token: string): void {
        this.tgToken = token;
    }
}

export default TelegramService;