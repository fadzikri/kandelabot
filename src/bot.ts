import { Bot, webhookCallback } from "grammy";
import express from "express";
import Utils from "./utils";

const bot = new Bot(process.env.TELEGRAM_TOKEN || "");

bot.command("start", async (ctx: any) => {
  const dataUser: DataUser = {
    id: ctx.from?.id,
    firstName: ctx.from?.first_name,
    lastName: ctx.from?.last_name
  }
  const myChannel: string = `<a href="https://t.me/kandelaa">Kandela Linux Version</a>`;

  const name: object = Utils.userTelegram(dataUser);

  await ctx.reply(`Hello ${name}, I am a bot post for ${myChannel}. `+
  `I don't have any instructions/commands to do somethings except `+
  `only for post new kernel version to that channel.`,
  { parse_mode: "HTML", disable_web_page_preview: true });
});

bot.command("last_kernel", async (ctx: any) => {
  if (ctx.from?.id !== Number(process.env.ID_OWNER)) {
    return ctx.reply("Sorry, you have found my owner secret command, but you are not have authorization to that action.")
  }

  const dataBatch: any = await Utils.getAllKernelVersion();
  const version: string  = dataBatch[dataBatch.length-1].version;
  let summary: string = dataBatch[dataBatch.length-1].summary;

  if (!summary) summary = `<i>No summary</i>`;

  const text: string = `Kernel Version : ${version}\nSummary : ${summary}`;

  await bot.api.sendMessage(Number(process.env.ID_CHANNEL), text, { parse_mode: "HTML" })
});

bot.api.setMyCommands([
  { command: "start", description: "Show welcome message." },
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
