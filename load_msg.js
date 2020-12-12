/// <reference path="node_modules/@types/jquery/index.d.ts" />

$(window).on("load", function () {    
    customElements.define("wait-js", Wait, { extends: "div" });

    if (window.location.search) {
        const query = new URLSearchParams();
        const popup = $("span#popup");
        const popup_content = $("div#popup-content");

        if (query.has("invitation") && query.get("invitation") == "true") {
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