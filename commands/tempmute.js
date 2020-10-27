

const ms = require('ms');

module.exports.run = async (bot, message, args) => {
    
        if(message.member.hasPermission('MANAGE_MESSAGES')) return;
        
            const member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
            if(!member) return message.reply('Please Provide a Member to TempMute.')

            let mainrole = message.guild.roles.cache.find(role => role.name === "Members");
            let role = message.guild.roles.cache.find(role => role.name === "MutedRole");

            if (!role) return message.reply("Couldn't find the 'muted' role.")

            let time = args[1];
            if (!time) {
                return message.reply("You didnt specify a time!");
            }

            member.roles.remove(mainrole.id)
            member.roles.add(role.id);

            message.channel.send(`@${member.user.tag} has now been muted for ${ms(ms(time))}`)

            setTimeout( function () {
                member.roles.add(mainrole.id)
                member.roles.remove(role.id);
                message.channel.send(`@${member.user.tag} has been unmuted.`)
            }, ms(time));
   }

module.exports.config = {
    name: "tempmute",
    description: "",
    usage: "-tempmute",
    accessableby: "Admin",
    aliases: ['']
}