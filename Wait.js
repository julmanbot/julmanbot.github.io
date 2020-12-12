class Wait extends HTMLDivElement {
    constructor() {
        super();

        const div = document.createElement("div");
        const anim_content = this.appendChild(document.createElement("div"));
        const link = this.appendChild(document.createElement("style"));

        div.classList.add("wait-animated");
        div.style.width = this.attributes.getNamedItem("width") ? this.attributes.getNamedItem("width").value + "px" : "100px";
        div.style.height = this.attributes.getNamedItem("width") ? this.attributes.getNamedItem("width").value + "px" : "100px";
        div.style.background = this.attributes.getNamedItem("background") ? this.attributes.getNamedItem("background").value : "black"

        anim_content.style.width = this.attributes.getNamedItem("width") ? (Number(this.attributes.getNamedItem("width")) * 2).value + "px" : "200px";
        anim_content.style.height = this.attributes.getNamedItem("width") ? (Number(this.attributes.getNamedItem("width")) * 2).value + "px" : "200px";
        anim_content.appendChild(div);
        anim_content.classList.add("content");

        link.innerText = `
@keyframes wait-anim { 
    from { 
        top: 0; 
        left: 0; 
    }

    25% { 
        top: 0; 
        left: ${this.attributes.getNamedItem("width") ? this.attributes.getNamedItem("width").value + "px" : "100px"}; 
    }
    
    50% { 
        top: ${this.attributes.getNamedItem("width") ? this.attributes.getNamedItem("width").value + "px" : "100px"}; 
        left: ${this.attributes.getNamedItem("width") ? this.attributes.getNamedItem("width").value + "px" : "100px"}; 
    }
    
    75% { 
        top: ${this.attributes.getNamedItem("width") ? this.attributes.getNamedItem("width").value + "px" : "100px"}; 
        left: 0; 
    } 
    
    to { 
        top: 0; 
        left: 0; 
    } 
} 

wait-js div.wait-animated { 
    position: relative;
    animation: wait-anim infinite .7s; 
}


wait-js div.content {
    width: ${this.attributes.getNamedItem("width") ? (Number(this.attributes.getNamedItem("width").value) * 2) + "px" : "200px"};
    height: ${this.attributes.getNamedItem("width") ? (Number(this.attributes.getNamedItem("width").value) * 2) + "px" : "200px"};
}`
    }
}