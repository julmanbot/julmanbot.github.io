/*
    connection.js for JulManBOT

    lang = undefined (function: enUs)

    Login from Discord for JulManBOT
*/

!function(w){w.DiscordBot=class{constructor(client_id){this.client_id=client_id;}requestLogin(who,target){who.loginToBot(target,this);}};w.DiscordClient=class{constructor(){};loginToBot(target,bot){const a=document.body.appendChild(document.createElement('a'));a.href=`https://discord.com/api/oauth2/authorize?client_id=${bot.client_id}&redirect_uri=${target}&response_type=token&scope=identify%20guilds`;adl("click",function(){},a);a.click();};};w.login=function(bot,who,target){bot.requestLogin(who,target);}}(window);