class UserIcon extends HTMLDivElement {
    constructor() {
        super();

        console.log("Called");

        let id = this.hasAttribute('id') ? this.getAttribute('id') : '';
        let avatar = this.hasAttribute('avatar') ? this.getAttribute('avatar') : '';

        let url = `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`;

        let instance = this;
        let img = this.appendChild(document.createElement('img'));
        let i = new Image();
        i.src = url;
        i.onload = function () {
            const width = i.width;

            img.src = url;
            
            img.width = 16;
            img.style.transition = '.5s all';

            let parent = instance.parentElement;
            parent.style.transition = '.5s all';
            parent.onmouseenter = function () {
                img.width = width / 5;
                parent.style.fontSize = `${width / 5}px`;
            }
            parent.onmouseleave = function () {
                img.width = 16;
                parent.style.fontSize = `16px`;
            }
        }
    }
}

$(window).on('load', function () {
    customElements.define('user-icon', UserIcon, { extends: 'div' });
});