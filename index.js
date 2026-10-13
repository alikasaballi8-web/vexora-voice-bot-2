const { Client, GatewayIntentBits } = require("discord.js");
const { joinVoiceChannel, VoiceConnectionStatus, entersState } = require("@discordjs/voice");

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once("ready", async () => {
  console.log("VEXORA is online");

  try {
    const guild = await client.guilds.fetch(process.env.GUILD_ID);
    const channel = await guild.channels.fetch("1559668500887371839");

    if (!channel || !channel.isVoiceBased()) {
      throw new Error("Invalid voice channel");
    }

    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: guild.id,
      adapterCreator: guild.voiceAdapterCreator,
      selfDeaf: true,
    });

    connection.on("error", console.error);
    await entersState(connection, VoiceConnectionStatus.Ready, 30000);
    console.log("VEXORA connected to voice channel");
  } catch (error) {
    console.error("Voice connection failed:", error);
  }
});

client.login(process.env.DISCORD_TOKEN);
