/// <reference path="node_modules/@types/jquery/index.d.ts" />

$(window).on("load", function () {
    const waiter = $("div.patch-note");
    const request = new XMLHttpRequest();

    request.open('GET', "https://julmanbot.github.io/patch_notes.json");
    request.send();
    request.onerror = function () {
        waiter.html("<strong>Une erreur est survenue lors de la récupération du patch note ! 😱</strong>")
    }
    request.onload = function () {
        /**
         * @type {{title: string, content: string}[]}
         */
        const patch_notes = JSON.parse(request.response);
        if (request.status != 200) {
            waiter.html(`<p>Une erreur est survenue lors de la récupération du patch note ! 😱 (Code ${request.status})</p>`)
        } else {
            const patch = patch_notes[0];
            waiter.html(`<div class=\"pn\"><h3>${patch.title}</h3>${patch.content}</div>`)
        }
    }
})