import { Bot, webhookCallback } from "grammy";
import express from "express";
import Utils from "./utils";
import { execSync } from "child_process";

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

bot.command("776bd4ec6f8e9c3e99c20b7336b7db14", async (ctx) => {
  const dataBatch = await Utils.getAllCurrentVersion();

  let time = 0;

  dataBatch.forEach(async (dataKernel: DataKernel) => {
    let summary = dataKernel.summary;
    if (!dataKernel.summary) summary = `<i>No summary</i>`;
    const text = `Kernel Version : ${dataKernel.version}\nSummary : ${summary}`;
    
    setTimeout(() => { 
      ctx.api.sendMessage(Number(process.env.ID_CHANNEL), text, { parse_mode: "HTML" })
    }, time)

    time += 5000;
  })
});

bot.command("8ea11f02aed17f9a4da448bd02516fc5", (ctx) => {
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
