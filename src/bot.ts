import { Bot, webhookCallback } from "grammy";
import express from "express";

const bot = new Bot(process.env.TELEGRAM_TOKEN || "");

bot.command("start", (ctx) => ctx.reply(`Hello ${ctx.from?.first_name}`));

bot.api.setMyCommands([
  { command: "start", description: "Hello World!" },
]);

if (process.env.NODE_ENV === "production") {
  const app = express();
  app.use(express.json());
  app.use(webhookCallback(bot, "express"));

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Bot listening on port ${PORT}`);
  });
} else {
  bot.start();
}
