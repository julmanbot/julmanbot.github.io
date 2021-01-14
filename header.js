/// <reference path="header.d.ts" />

const permissions = {
    CREATE_INSTANT_INVITE: 1,
    KICK_MEMBERS: 2,
    BAN_MEMBERS: 4,
    ADMINISTRATOR: 8,
    MANAGE_CHANNELS: 16,
    MANAGE_GUILD: 32,
    ADD_REACTIONS: 64,
    VIEW_AUDIT_LOG: 128,
    PRIORITY_SPEAKER: 256,
    VIEW_CHANNEL: 1024,
    READ_MESSAGES: 1024,
    SEND_MESSAGES: 2048,
    SEND_TTS_MESSAGES: 4096,
    MANAGE_MESSAGES: 8192,
    EMBED_LINKS: 16384,
    ATTACH_FILES: 32768,
    READ_MESSAGE_HISTORY: 65536,
    MENTION_EVERYONE: 131072,
    EXTERNAL_EMOJIS: 262144,
    USE_EXTERNAL_EMOJIS: 262144,
    CONNECT: 1048576,
    SPEAK: 2097152,
    MUTE_MEMBERS: 4194304,
    DEAFEN_MEMBERS: 8388608,
    MOVE_MEMBERS: 16777216,
    USE_VAD: 33554432,
    CHANGE_NICKNAME: 67108864,
    MANAGE_NICKNAMES: 134217728,
    MANAGE_ROLES: 268435456,
    MANAGE_ROLES_OR_PERMISSIONS: 268435456,
    MANAGE_WEBHOOKS: 536870912,
    MANAGE_EMOJIS: 1073741824
};
const convertReadable = function (permName, readable = true, debug = false) {
    if (!readable) return permName;
    if (debug) console.log(permName);
    let names = {
        CREATE_INSTANT_INVITE: "Créer une invitation instantanée",
        KICK_MEMBERS: "Exclure des membres",
        BAN_MEMBERS: "Bannir des membres",
        ADMINISTRATOR: "Administrateur",
        MANAGE_CHANNELS: "Gérer les salons",
        MANAGE_GUILD: "Gérer le serveur",
        ADD_REACTIONS: "Ajouter des réactions",
        VIEW_AUDIT_LOG: "Voir le journal d'audit",
        PRIORITY_SPEAKER: "Parler en priorité",
        VIEW_CHANNEL: "Voir le salon",
        READ_MESSAGES: "Lire les messages",
        SEND_MESSAGES: "Envoyer des messages",
        SEND_TTS_MESSAGES: "Envoyer des messages TTS",
        MANAGE_MESSAGES: "Gérer les messages",
        EMBED_LINKS: "Ajouter des liens intégrés",
        ATTACH_FILES: "Attacher des fichiers",
        READ_MESSAGE_HISTORY: "Voir l'historique des messages",
        MENTION_EVERYONE: "Metionner tous le monde",
        EXTERNAL_EMOJIS: "Voir des émojis externes",
        USE_EXTERNAL_EMOJIS: "Utiliser des émojis externes",
        CONNECT: "Se connecter",
        SPEAK: "Parler",
        MUTE_MEMBERS: "Réduire au silence des membres",
        DEAFEN_MEMBERS: "Mettre en sourdine des membres",
        MOVE_MEMBERS: "Déplacer des membres",
        USE_VAD: "Utiliser l'activité vocale",
        CHANGE_NICKNAME: "Changer de pseudonyme",
        MANAGE_NICKNAMES: "Gérer les pseudonymes des membres",
        MANAGE_ROLES: "Gérer les rôles",
        MANAGE_ROLES_OR_PERMISSIONS: "Gérer les rôles",
        MANAGE_WEBHOOKS: "Gérer les Webhooks",
        MANAGE_EMOJIS: "Gérer les émojis du serveur"
    };

    if (!names[permName]) throw new RangeError("Invalid permission given!");
    return names[permName];
};

const convertPerms = function (permNumber, readableNames = false, debug = false) {
    //if readableNames is set to true, use the names at Discord instead of the names of PermissionResolvables at discord.js.
    if (isNaN(Number(permNumber))) throw new TypeError(`Expected permissions number, and received ${typeof permNumber} instead.`);
    permNumber = Number(permNumber);
    let evaluatedPerms = {};
    for (let perm in permissions) {
        let hasPerm = Boolean(permNumber & permissions[perm]);
        evaluatedPerms[convertReadable(perm, readableNames, debug)] = hasPerm;
    }
    return evaluatedPerms;
};

$(window).on('load', function () {
    let f = {};
    f[document.cookie.split('=')[0]] = document.cookie.split('=')[1];

    if (f['token']) {
        fetch("https://discord.com/api/users/@me", {
            headers: {
                'Authorization': `Bearer ${f['token']}`
            }
        }).then(function (res) {
                return res.json();
            })
            .then(function (json) {
                    let { id, username, avatar, discriminator, premium_type, locale } = json;
                    if (id) {
                        $('ul.login-dropdown').children().first().html(`<img src="https://cdn.discordapp.com/avatars/${id}/${avatar}.png" width="24"></img>`);
                        $('ul.login-dropdown').children().get(1).innerHTML = `${username}#${discriminator} - ${premium_type == 0 ? "Sans Discord Nitro 🛒" : premium_type == 2 ? "Avec Discord Nitro ✨" : "Avec Discord Nitro Classique 🎈"} - Langue : ${locale}`;
                        $('ul.login-dropdown').children().get(1).classList.replace('css', 'no-css');
                        $('ul.login-dropdown').children().get(2).innerHTML = `<a href="https://julmanbot.github.io/?logout=true" style="color: red;">Se déconnecter</a>`;
                        $('ul.login-dropdown').children().get(2).classList.replace('no-css', 'css');
                        $('ul.login-dropdown').children().get(3).innerHTML = `<div class="content"><div class="wait-animated" style="width:50px;height:50px;background:black;"></div></div><style>@keyframes wait-anim{from{top:0;left:0;}25%{top:0;left:50px;}50%{top:50px;left:50px;}75%{top:50px;left:0;}to{top:0;left:0;}}div.wait-animated{position:relative;animation:wait-anim infinite .7s;}div.content{width:100px;height:100px;}</style><p>Chargement des serveurs...</p>`;
                        fetch("https://discord.com/api/users/@me/guilds", {
                            headers: {
                                'Authorization': `Bearer ${f['token']}`
                            }
                        }).then(async function (res) {
                            /**
                             * @type {{id:string,name:number|string,icon:string,owner:true|false,permissions:number,features:["INVITE_SPLASH"?,"VIP_REGIONS"?,"VANITY_URL"?,"VERIFIED"?,"PARTNERED"?,"COMMUNITY"?,"COMMERCE"?,"NEWS"?,"DISCOVERABLE"?,"FEATURABLE"?,"ANIMATED_ICON"?,"BANNER"?,"WELCOME_SCREEN_ENABLED"?],permissions_new:number|string}[]}
                             */
                            let j = await res.json();

                            if (res.ok) {
                                $('ul.login-dropdown').children().get(3).innerHTML = ``;

                                j.forEach(function (server) {
                                    fetch(`https://cdn.discordapp.com/icons/${server.id}/${server.icon}.${server.features.includes("ANIMATED_ICON") ? "gif" : "png"}`).then((res) => {
                                        let url;
                                        if (res.ok) {
                                            url = `https://cdn.discordapp.com/icons/${server.id}/${server.icon}.${server.features.includes("ANIMATED_ICON") ? "gif" : "png"}`;
                                        } else {
                                            url = `https://cdn.discordapp.com/icons/${server.id}/${server.icon}.png`;
                                        }
                                        $('ul.login-dropdown').children().get(3).innerHTML += `<span arial-title="${server.name}" class="tooltip" arial-part="${server.features.includes('PARTNERED')}"><img src="${url}" width="48" style="border-radius: 100%; margin:5px" class="tooltip"></span>`;
                                    });
                                });
                            } else {
                                $('ul.login-dropdown').children().get(3).innerHTML = `<strong>Impossible de charger vos serveurs ! <img src="https://cdn.discordapp.com/emojis/765674085786714163.gif" style="width:1.375em;vertical-align:bottom;"></strong>`;
                            }
                        });
                    }
                });
    }

    adl('click', function (e) {
        $('ul.login-dropdown').fadeToggle('fast')
    }, document.querySelector('button.login-btn'));

    let style = document.createElement('style');

    style.textContent = `.tooltip[arial-part="false"]::before {
    content: attr(arial-title);
    opacity: 0;
    transition: .2s opacity;
    position: absolute;
    white-space: nowrap;
    margin-top: 60px;
    margin-right: 20%;
    color: white;
    padding: 5px;
    background-color: black;
    border-radius: 5px;
}

.tooltip[arial-part="true"]::before {
    content: attr(arial-title) " (Discord Partner)";
    opacity: 0;
    transition: .2s opacity;
    position: absolute;
    white-space: nowrap;
    margin-top: 60px;
    color: white;
    padding: 5px;
    background-color: #7289da;
    border-radius: 5px;
}

.tooltip:hover::before{
    opacity: 1;
}`;

    document.head.appendChild(style);

    !function(){["%c      _         _  __  __                ____    ___  _____ \n     | | _   _ | ||  \\/  |  __ _  _ __  | __ )  / _ \\|_   _|\n  _  | || | | || || |\\/| | / _` || '_ \\ |  _ \\ | | | | | |  \n | |_| || |_| || || |  | || (_| || | | || |_) || |_| | | |  \n  \\___/  \\__,_||_||_|  |_| \\__,_||_| |_||____/  \\___/  |_|  \n\nJulManBOT \n\n\n%cEuh... Tu sais ce que tu fait ? Si oui, rejoint nous ! 😁"].forEach((v) => console.log(v, "color:#32c5f2;font-size:1.2rem;","color:#000;font-size:1.2rem;font-familly:\"Whitney\""))}();
});