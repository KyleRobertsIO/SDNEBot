const Discord = require('discord.js');
const bot = new Discord.Client();

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
  bot.user.setActivity("!plsHelp");
});

bot.on('message', msg => {
  if (msg.content.startsWith("!year ")) {
    let txt = msg.content.split(" ");
    let year = txt[1];
    let usr = msg.member;
    if (year === "1") {
      usr.addRole("619581998574469120"); // 1st Year
      usr.removeRole("619582112936362020"); // 2nd Year
      usr.removeRole("619582159899852802") // 3rd Year
      usr.removeRole("619582173522952233") //Alumni
      msg.reply('you are now in the role associated with your year!');
    } else if (year === "2") {
      usr.removeRole("619581998574469120"); // 1st Year
      usr.addRole("619582112936362020"); // 2nd Year
      usr.removeRole("619582159899852802") // 3rd Year
      usr.removeRole("619582173522952233") //Alumni
      msg.reply('you are now in the role associated with your year!');
    } else if (year === "3") {
      usr.removeRole("619581998574469120"); // 1st Year
      usr.removeRole("619582112936362020"); // 2nd Year
      usr.addRole("619582159899852802") // 3rd Year
      usr.removeRole("619582173522952233") //Alumni
      msg.reply('you are now in the role associated with your year!');
    } else if (year === "4") {
      usr.removeRole("619581998574469120"); // 1st Year
      usr.removeRole("619582112936362020"); // 2nd Year
      usr.removeRole("619582159899852802") // 3rd Year
      usr.addRole("619582173522952233") //Alumni
      msg.reply('you are now in the role associated with your year!');
    } else {
      msg.reply("that's not a valid year, try between 1-4!");
    }
  } else if (msg.content === "!plsHelp") {
    msg.delete();
    msg.channel.send({
      embed: {
        color: 4886754,
        author: {
          name: bot.user.username,
          icon_url: bot.user.avatarURL
        },
        title: "Help Menu",
        description: "See what Sydney can do for you",
        fields: [{
          name: "Assign Year Roles",
          value: "```!year <year>\nUse \"4\" if you are Alumni```"
        },
        {
          name: "View Help Menu",
          value: "```!plsHelp```"
        },
        {
          name: "Get Rules",
          value: "```!rules```"
        },
        {
          name: "???",
          value: "```!killMe```"
        }
        ],
        timestamp: new Date(),
        footer: {
          icon_url: bot.user.avatarURL,
          text: "Sydney"
        }
      }
    });
  } else if (msg.content === "!rules") {
    const embeds = [
      {
        title: "Rule 1 - Keep it friendly and respectful. ",
        description: "We're all mature here, please do not be disrespectful towards any users (no hateful nicknames!). Harassment or encouragement of harassment of any kind is not tolerated, including sexual harassment.",
        color: 13632027
      },
      {
        title: "Rule 2 - Keep chats safe for work",
        description: "Please do not post any NSFW pictures or links in any of the channels, a lot of us use Discord on our phone or on our computers when in class so keep that in mind.",
        color: 2818297
      },
      {
        title: "Rule 3 - No spamming or trolling",
        description: "Spamming is **not** allowed on this server. No excessive trolling is allowed on this server, do **not** deliberately make others uncomfortable or deliberately derail a conversation. \n Do not post any malicious links.",
        color: 1571072
      },
      {
        title: "Rule 4 - Use the appropriate channels",
        description: "We have multiple channels, so please make sure your discussion aligns with the channel you are in.",
        color: 12390624
      },
      {
        title: "Rule 5 - Enforcing Academic Integrity",
        description: "Please do not ask for any help on assignments you have for your classes. Academic integrity is taken very seriously at Sheridan and as students in the SDNE program, we all must follow these rules.",
        color: 16776969
      },
      {
        title: "Information",
        description: "To access all channels, you must assign which year you are in from 1-4 in the SDNE program. 4 represents Alumni. \n```!year <your year>``` in the #assign-year channel. \n \nEach year gets their own category where members  of that year can add channels for whatever they would like to discuss.",
        color: 10197915
      }
    ]

    if (msg.channel.id == "619585833636200449") {
      msg.delete();
      embeds.forEach(function (i) {
        msg.channel.send({ embed: i });
      });
    }
    else {
      msg.reply("check your DMs!");
      embeds.forEach(function (i) {
        msg.author.send({ embed: i });
      });
    }
  } else if (msg.content === "!killMe") {
    const sad = bot.emojis.get("620608686934720522");
    msg.channel.send("<@" + msg.author.id + "> has died, they will be missed... " + sad);
  }
});

bot.login('NjE5NTkwOTQ5MzAzMDkxMjEx.XXKdeQ.bLymm-XWu37fp5GYFZq5HUjugUE');