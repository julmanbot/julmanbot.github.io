/// <reference path="header.d.ts" />

$(window).on('load', function () {
    let f = {};
    f[document.cookie.split('=')[0]] = document.cookie.split('=')[1];

    if (f['token']) {
        fetch("https://discord.com/api/users/@me", {
            headers: {
                'authorization': `Bearer ${f['token']}`
            }
        }).then((res) => res.json())
            .then((json) => {
                let { id, username, avatar, discriminator, premium_type } = json;
                if (id) {
                    $('ul.login-dropdown').children().first().html(`<img src="https://cdn.discordapp.com/avatars/${id}/${avatar}.png" width="24"></img>`);
                    $('ul.login-dropdown').children().get(1).innerHTML = `${username}#${discriminator} - ${premium_type == 0 ? "Sans Discord Nitro 🛒" : premium_type == 2 ? "Avec Discord Nitro ✨" : "Avec Discord Nitro Classique 🎈"}`;
                    $('ul.login-dropdown').children().get(1).classList.replace('css', 'no-css');
                    $('ul.login-dropdown').children().get(2).innerHTML = `<a href="https://julmanbot.github.io/?logout=true" style="color: red;">Se déconnecter</a>`;
                }
            })

    }

    adl('click', function (e) {
        $('ul.login-dropdown').fadeToggle('fast')
    }, document.querySelector('button.login-btn'));
});