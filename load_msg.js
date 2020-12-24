/// <reference path="node_modules/@types/jquery/index.d.ts" />

try {
    if (location.hash) {
        const u = new URLSearchParams(location.hash.slice(1));
        fetch("https://discord.com/api/users/@me", {
            headers: {
                authorization: `${u.get('token_type')} ${u.get('access_token')}`
            }
        })
            .then(res => res.json())
            .then((c) => {
                const { id, username, avatar, discriminator, premium_type } = c;

                if (id) {
                    $("#popup-content-nobtn").html(
                        `<p><strong>${username}#${discriminator} - ${premium_type == 0 ? "Sans Discord Nitro" : premium_type == 1 ? "Avec Discord Nitro Classic" : "Avec Discord Nitro"}</strong><br><br>Est-ce que c'est vous ?<br><br><img src="https://media3.giphy.com/media/xT0xeuOy2Fcl9vDGiA/giphy.gif?cid=ecf05e47dn5xsfec9rskwti3mtr4v03kjb1db7ks9nzysjlw&rid=giphy.gif" width="200"><br><a href="?confirm=true&token=${u.get('access_token')}" class="link" style="color: green;">OUI, c'est moi !</a><a href="?confirm=false" class="link" style="color: red;">Non, c'est qui ?</a></p>`
                    );
                } else {
                    $("#popup-content-nobtn").html(
                        `<p>Une erreur est survenue, impossible de récupérer votre profile, vous devez vous reconnecter pour recréer une connection avec Discord. Ceci peut être dû à une révocation de l'autorisation de JulManBOT pour récupérer vos informations. Vous n'avez rien à craindre, les seuls trucs que je peut récupérer c'est l'ID, votre tag (nom d'utilisateur et discrimateur), votre avatar et votre niveau d'abonnement sur Discord (pas les informations de payment). Cliquer sur le lien ci-dessous pour vous connecter.<br><br><a href="https://julmanbot.github.io/login?client_id=774580210481627147&target=https://julmanbot.github.io" class="link">Se reconnecter</a></p>`
                    )
                }
                $("span#popup").fadeIn('fast');

                // alert(`${username}#${discriminator} - ID : ${id} - Nitro : ${premium_type}`);
            })
    }
} catch { }

$(window).on("load", function () {
    customElements.define("wait-js", Wait, { extends: "div" });

    if (window.location.search) {
        const query = new URLSearchParams(window.location.search);
        const popup = $("span#popup");

        if (
            query.has("invitation") && query.get("invitation") == "true" &&
            !query.has("force")
        ) {
            document.title = "JulManBOT : Invitation"
            popup.fadeIn("fast");
        } else if (
            query.has("invitation") && query.get("invitation") == "true" &&
            query.has("force") && query.get("force") == "true"
        ) {
            document.write("Chargement...");
            const a = document.body.appendChild(document.createElement("a"));
            a.href = "https://discord.com/api/oauth2/authorize?client_id=774580210481627147&permissions=8&redirect_uri=https%3A%2F%2Fjulmanbot.github.io%2Fthanks&response_type=token&scope=identify%20bot";
            a.click();
        } else if (
            query.has('confirm') &&
            query.has('token')
        ) {
            if (query.get('confirm') == "true") {
                window.document.cookie = `token=${query.get('token')}`;
            }
        } else if (
            query.has('logout')
        ) {
            if (query.get('logout') == "true") {
                $("#popup-content-nobtn").html(`<p>Voulez-vous vraiment faire ceci ? Cette action ne peut être annulé sauf si vous reconnecter via le boutton "Mon compte"<br><br><button onclick="document.cookie='token=';location.reload();">Je confirme, je me déconnecte</button></p>`);
                $('span#popup').fadeIn('fast');

            }
        }

        $("div.popupCloseButton").on("click", function () {
            $("span#popup").fadeOut("fast", "", function () {
                location.search = "";
            });
        });
    }
});

function reload_links() {
    $("a[target=\"popup\"").on("click", function (event) {
        event.preventDefault();
        const w = window.open('https://julmanbot.github.io/?invitation=true&force=true', 'Patientez...', 'width=600,height=800');
        w.document.writeln("<p style=\"color: white; font-size: 30px; font-style=Verdana, Geneva, Tahoma, sans-serif;\">Redirection automatique dans 2 secondes...</p><button onclick=\"window.close()\">Annuler</button><br><a href=\"https://julmanbot.github.io/?invitation=true&force=true\" style=\"color: white; font-size: 30px; display: none;\">Clique ici si le site ne charge pas</a>");
        w.document.body.style.background = "rgb(48, 48, 48)";
        w.document.title = "Redirection..."
        setTimeout(function () {
            w.document.querySelector("p").textContent = "Redirection automatique dans 1 seconde...";
            setTimeout(function () {
                w.document.querySelector("p").textContent = "Redirection automatique dans 0 seconde...";
                w.document.querySelector("a").click();
                w.document.querySelector("a").style.display = "";
            }, 1000);
        }, 1000);
    })

    $("a[target=\"popup1\"").on("click", function (event) {
        event.preventDefault();
        const w = window.open('https://github.com/julmanbot/julmanbot.github.io/issues/new/choose', 'Patientez...', 'width=1200,height=800');
        w.document.writeln("<p style=\"color: white; font-size: 30px; font-style=Verdana, Geneva, Tahoma, sans-serif;\">Redirection automatique dans 2 secondes...</p><button onclick=\"window.close()\">Annuler</button><br><a href=\"https://github.com/julmanbot/julmanbot.github.io/issues/new/choose\" style=\"color: white; font-size: 30px; display: none;\">Clique ici si le site ne charge pas</a>");
        w.document.body.style.background = "rgb(48, 48, 48)";
        w.document.title = "Redirection..."
        setTimeout(function () {
            w.document.querySelector("p").textContent = "Redirection automatique dans 1 seconde...";
            setTimeout(function () {
                w.document.querySelector("p").textContent = "Redirection automatique dans 0 seconde...";
                w.document.querySelector("a").click();
                w.document.querySelector("a").style.display = "";
            }, 1000);
        }, 1000);
    })
}