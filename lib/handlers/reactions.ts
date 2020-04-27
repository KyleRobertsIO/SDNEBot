import * as Discord from 'discord.js'

import * as db from '../../database'
import { bot } from '../../bot'
import { help } from '../funcs'
import { helpPage, setHelpPage, roles } from '../globVars'

export async function handleReactionAdd(rct: Discord.MessageReaction, usr: Discord.User | Discord.PartialUser) {

    if (rct.message.partial) await rct.message.fetch()

    var user = await usr.fetch()

    // Disallow actions for Bot
    if (user.bot)
        return

    // Disallow Reacting for Muted Users
    db.getUser(user.id, (userData: Object) => {
        if (userData['muted'] === true)
            rct.users.remove(user)
    })

    let assignId = await db.getConfig('assign').catch(err => console.error(err))

    let years = ['📗', '📘', '📙', '🧾']
    let campus = ['1️⃣', '2️⃣']

    if (rct.message.channel.type === 'text')
        var member: Discord.GuildMember = rct.message.guild.member(user)

    let eName: string = rct.emoji.name
    let users: Discord.Collection<string, Discord.User> = await rct.users.fetch()

    if (eName === '❓' && rct.users.cache.array().includes(bot.user)) {

        rct.remove()
        setHelpPage(help(member, 0, rct.message.channel))

    } else if (eName === '➡️' && rct.message.author === bot.user) {

        rct.users.remove(user)
        setHelpPage(help(member, helpPage + 1, undefined, rct.message))

    } else if (eName === '⬅️' && rct.message.author === bot.user) {

        rct.users.remove(user)
        setHelpPage(help(member, helpPage - 1, undefined, rct.message))

    } else if (eName === '🗑️' && users.array().includes(bot.user)) {

        rct.message.delete()

    } else if (years.includes(eName) && rct.message.id === assignId) {

        rct.message.reactions.cache.forEach(async function (r) {
            let usersR = await r.users.fetch()
            if (r.emoji.name != eName && usersR.array().includes(user) && !campus.includes(r.emoji.name))
                r.users.remove(user)
        })

        if (member.roles.cache.array().includes(roles['👻']))
            var newUser = true

        member.roles.remove([roles['📗'], roles['📘'], roles['📙'], roles['🧾'], roles['👻']], 'Removed Conflicting Years').then(async () => {
            member.roles.add(roles[eName], `Added ${roles[eName].name}`).catch(err => console.error(err))

            if (newUser) {
                let id = await db.getConfig('generalChannel')
                let channel = <Discord.TextChannel | Discord.DMChannel | Discord.NewsChannel>bot.guilds.cache.first().channels.cache.get(id)
                channel.send(`**Welcome <@${member.user.id}> !**`)
            }
        }).catch(err => console.error(err))

    } else if (campus.includes(eName) && rct.message.id === assignId) {

        rct.message.reactions.cache.forEach(async function (r) {
            let users = await r.users.fetch()
            if (r.emoji.name != eName && users.array().includes(user) && !years.includes(r.emoji.name))
                r.users.remove(user)
        })

        member.roles.remove([roles['1️⃣'], roles['2️⃣']], 'Removed Conflicting Campuses').then(() => {
            member.roles.add(roles[eName], `Added ${roles[eName].name}`).catch(err => console.error(err))
        }).catch(err => console.error(err))

    } else if (eName === '👎') {
        // Do Nothing
    } else if (eName === '📌') {
        let nick = (rct.message.member.nickname ? rct.message.member.nickname : rct.message.author.username)
        user.send(`**${nick} sent:** ${rct.message.content}`, (rct.message.embeds || rct.message.attachments.array())).then(dm => dm.react('🗑️'))
    } else {

        let author: Discord.User = rct.message.author

        if (author.bot || author === user)
            return

        db.updateUser(author.id, author.username, undefined, undefined, undefined, 1, true)

    }
}