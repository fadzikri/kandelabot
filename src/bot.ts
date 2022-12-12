import { Bot, webhookCallback } from "grammy";
import express from "express";

const bot = new Bot(process.env.TELEGRAM_TOKEN || "");

bot.command("start", (ctx) => ctx.reply(`Hello ${ctx.from?.username}`));
bot.command("kernel", (ctx) => ctx.reply(`List kernel`));
bot.command("last_kernel", (ctx) => ctx.reply(`6.11`));

bot.api.setMyCommands([
  { command: "start", description: "Show start messages." },
  { command: "kernel", description: "Display list all of kernels." },
  { command: "last_kernel", description: "Last kernel published." },
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