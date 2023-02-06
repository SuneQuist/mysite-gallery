
const container = document.querySelector('.model-content');

let lastIndex = 0;
let index = 0;
function indent(n) {
    const slides = Array.from(document.querySelectorAll('.model-content img'));
    lastIndex = index;
    index += n;

    slides[lastIndex].classList.remove("current");
    
    if (index >= slides.length) { index = 0; }
    if (index < 0) { index = slides.length - 1; }
    
    slides[index].classList.add("current");
    zoom(slides[index]);
}

function closed(n = null) {
    document.querySelector(".model").classList.toggle("hidden");

    if (n) {
        const content = document.querySelector(`.c${n}`);

        const modelContent = document.querySelector('.model-content');
        modelContent.innerHTML = '';
        modelContent.innerHTML = content.innerHTML;
    }

    indent(0);

}

window.addEventListener("resize", () => {
    const slides = Array.from(document.querySelectorAll('.model-content img'));
    for (let i = 0; i < slides.length; i++) { 
        slides[i].classList.remove("current");
        slides[i].style = "";
        container.style = "";
    }
    indent(0);
})

let scaled = false;
let scaleTo = 2;
function zoom(model) {
    const cb = container.getBoundingClientRect();
    const mb = model.getBoundingClientRect();
    let dw = cb.width * devicePixelRatio;
    let dh = cb.height * devicePixelRatio;

    model.ondblclick = (e) => {
        scaled = !scaled;
        container.style.setProperty("width", `${dw}px`);
        container.style.setProperty("height", `${dh}px`);
        model.style.setProperty("width", `${!scaled ? dw * scaleTo : dw}px`);
        model.style.setProperty("height", `${!scaled ? dh * scaleTo : dh}px`);
        
        model.style.setProperty("position", `${!scaled ? "absolute" : "relative"}`);
        model.style.top = (!scaled ? mb.left - e.pageX * (scaleTo/2) : 0) + "px";
        model.style.left = (!scaled ? mb.top - e.pageY * (scaleTo/2) : 0) + "px";
    }

    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    document.onmousedown = move;
    document.onmouseup = cancel;
    document.onclick = cancel;
    
    function cancel() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
    
    function move(e) {
        e.preventDefault();    

        pos3 = e.pageX;
        pos4 = e.pageY;

        document.onmousemove = drag;
    }

    function drag(e) {
        e.preventDefault();

        pos1 = pos3 - e.pageX;
        pos2 = pos4 - e.pageY;
        pos3 = e.pageX;
        pos4 = e.pageY;

        model.style.top = (model.offsetTop - pos2) + "px";
        model.style.left = (model.offsetLeft - pos1) + "px";
    }
}