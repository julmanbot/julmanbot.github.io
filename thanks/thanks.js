/// <reference path="../node_modules/@types/jquery/index.d.ts" />

$(window).on('load', () => {
    const frag = new URLSearchParams(location.hash.slice(1));
    let info;
    if (frag.has("error")) {
        $("body")
            .css('background', 'grey')
            .css('color', 'white')
            .css("font-family", "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif")
            .css('text-align', 'center')

        return $("body").html(`<p>L'ajout du bot à été annulé !</p>
<a href="https://julmanbot.github.io/?invitation&force" style="color: white">Réessayer</a>
<br>
<button onclick="window.close();">Fermer la fenêtre</button>`)
    }
    if (frag.has("access_token")) {
        const accessToken = frag.get("access_token");
        const tokenType = frag.get("token_type");

        fetch('https://discord.com/api/users/@me', {
            headers: {
                authorization: `${tokenType} ${accessToken}`
            }
        })
            .then(res => res.json())
            .then(async response => {
                const { username, discriminator, id, avatar } = response;
                info = `${username}#${discriminator}`;

                $("body")
                    .css('background', 'grey')
                    .css('color', 'white')
                    .css("font-family", "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif")
                    .css('text-align', 'center')

                $("body").html(`<p>Merci ${info} d'avoir ajouté JulManBOT sur votre serveur !</p>
<info>
    <style>* { max-width: 100% }</style>
    <div class="icons">  
        <img src="https://cdn.discordapp.com/avatars/615944185190547456/f242536f387e4004d334d95cdd0c76c5.png?size=80" alt="JulManBOT#4332" class="img-round">
        <div class="ellipseGroup-3yOSIs">
            <div class="ellipse-34ZPbW"></div>
            <div class="ellipse-34ZPbW"></div>
            <div class="ellipse-34ZPbW"></div>
        </div>
        <img src="https://cdn.discordapp.com/avatars/${id}/${avatar}.png?size=80" alt="${info}" class="img-round">
    </div>
    <canvas style="margin: 5px; border-radius: 10px; box-shadow: 0 0 5px black;"></canvas>
    <br />
    <strong>Visible avec le bot avec cette commande : <code>JM!beauti</code></strong>
    <br />
    <br />
</info>
<br>
<button onclick="window.close();">Fermer la fenêtre</button>`);
                const i = $("img");
                i.each((i, e) => {
                    e.onerror = () => {
                        e.style.color = "black";
                    }
                    e.alt = "L'image demandé n'a pas été trouvé !";
                    e.style.width = "80px";
                    e.style.height = "80px";
                });

                /* Génération de l'image de remerciment */
                const canvas = document.querySelector("canvas");
                const ctx = canvas.getContext('2d');

                canvas.width = 700;
                canvas.height = 300;

                var img1 = new Image(), img2 = new Image();
                img1.onload = function () {
                    ctx.drawImage(img1, 0, 0);
                    img2.src = `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`;
                    img2.onload = function () {
                        ctx.drawImage(img2, (canvas.width - 140) * 0.5, 30, 140, 140);

                        ctx.rect((canvas.width - 140) * 0.5, 30, 140, 140);
                        ctx.strokeStyle = 'white';
                        ctx.fillStyle = 'rgba(0,0,0,0)';
                        ctx.lineWidth = '20px';
                        ctx.stroke();
                        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
                        ctx.font = '40px Cambria Math';
                        ctx.textAlign = 'center';
                        ctx.fillText(info, (canvas.width) / 2, 250);

                        ctx.quality = 'nearest';
                    }
                }
                img1.src = `https://cdn-arts.konbini.com/images/files/2019/05/nasa-feat-.jpg`;
                /* Fin */
            })
            .catch(console.error);

    } else {
        $("body").html(`<p>L'ajout du bot à été annulé !</p>
<a href="https://julmanbot.github.io/?invitation&force">Réessayer</a>
<br>
<button onclick="window.close();">Fermer la fenêtre</button>`)
    }
})
