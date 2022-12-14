import { Bot, webhookCallback } from "grammy";
import express from "express";
import Utils from "./utils";

const bot = new Bot(process.env.TELEGRAM_TOKEN || "");

bot.command("start", (ctx) => {
  const dataUser: DataUser = { 
    id: ctx.from?.id,
    firstName: ctx.from?.first_name, 
    lastName: ctx.from?.last_name
  }
  const myChannel = `<a href="https://t.me/kandelaa">Kandela Linux Version</a>`;

  const name = Utils.userTelegram(dataUser);

  ctx.reply(`Hello ${name}, I am a bot post for ${myChannel}.`+
  `I don't have any instructions/commands to do somethings except `+
  `only for post new kernel version to that channel.`,
  { parse_mode: "HTML", disable_web_page_preview: true });
});

bot.command("hi", (ctx) => {
  ctx.reply(`Last Post in API`)
});

bot.api.setMyCommands([
  { command: "start", description: "Show welcome message" },
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
