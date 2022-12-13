import { Bot, webhookCallback } from "grammy";
import express from "express";

const bot = new Bot(process.env.TELEGRAM_TOKEN || "");

bot.command("start", (ctx) => ctx.reply(`Hello ${ctx.from?.first_name}`));
bot.command("776bd4ec6f8e9c3e99c20b7336b7db14", (ctx) => ctx.reply(`Initial Post in API`));
bot.command("8ea11f02aed17f9a4da448bd02516fc5", (ctx) => ctx.reply(`Last Post in API`));

bot.api.setMyCommands([
  { command: "start", description: "Show" },
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
