const canvas = document.createElement('canvas');
canvas.id = "canvas";
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas)

const bounds = canvas.getBoundingClientRect();
canvas.width = bounds.width * devicePixelRatio;
canvas.height = bounds.height * devicePixelRatio;

const row = Math.floor(Math.random() * 35) + 10;
const col = Math.floor(Math.random() * 15) + 5;

const colors = ["rgba(43, 15, 255, 1)", "rgba(233, 187, 255, 1)", "rgba(255, 31, 0, 0.7)", "rgba(220, 247, 162, 1)"];

function runAnimation(n) {
    let timeout = row * col;
    let randomColor = Math.round(Math.random() * colors.length);

    for (let i =0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            let newsTime = setTimeout(() => {
                ctx.save()
                    const w = bounds.width / col;
                    const h = bounds.height / row;
                    ctx.translate(w * j, h * i);
    
                    let gradient = ctx.createLinearGradient(0, 0, w, h);
                    gradient.addColorStop(0, "rgba(250, 250, 250, 1)");
                    gradient.addColorStop(1, colors[randomColor]);
    
                    const deg = Math.ceil(Math.random() * 4);
                    ctx.rotate((deg === 4 ? 0 : deg === 3 ? 270 : deg === 2 ? 180 : 90) * Math.PI/ 180);
    
    
                    ctx.fillStyle = gradient;
                    ctx.fillRect(0, 0, w, h);
                ctx.restore()
                timeout--;
                if (n === 1) {
                    if (timeout < row*col/2) {
                        ctx.clearRect(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * canvas.width/4, Math.random() * canvas.height/4)
                    }
                    if (timeout < row*col/7) { ctx.clearRect(0, 0, canvas.width, canvas.height); clearTimeout(newsTime); }
                }
            }, 500 * (j/(Math.random()*20)) * (i/(Math.random()*20)));
        }
    }

}

const data = ctx.getImageData(0, 0, canvas.width, canvas.height);

let clicked = 0;
window.addEventListener("DOMContentLoaded", () => {
    const links = Array.from(document.querySelectorAll(".toOtherPage"));

    const getOldUrl = sessionStorage.getItem("url");

    if (getOldUrl ) { sessionStorage.removeItem("url"); runAnimation(1); }

    for (let i = 0; i < links.length; i++) {
        
        links[i].addEventListener("click", function(event) {
            event.preventDefault();

            if (getOldUrl?.clicked <= 0 || clicked <= 0) {
                    const link = links[i].href;
        
                    runAnimation(0);
                    clicked++;
                    sessionStorage.setItem("url", JSON.stringify({links: link, clicked: clicked}))
                    setTimeout(() => { window.location.href = link; }, 1000);
                }
            }, false);
    }
})