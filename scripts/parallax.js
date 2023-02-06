const parallax = document.querySelector('#parallax');
const afterParallax = document.querySelector('#content-after-parallax');

let safeMargin = 100;
let airToFallon = 15;

window.addEventListener("DOMContentLoaded", () => {

    window.addEventListener("resize", setBounds);

    function setBounds() {
        afterParallax.style.setProperty("top", `${parallax.getBoundingClientRect().height + safeMargin}px`);
        
        window.addEventListener("scroll", (e) => {
            const videoBounds = (window.scrollY + window.innerHeight) - parallax.getBoundingClientRect().height - (safeMargin/2);

            if ((window.scrollY + window.innerHeight) < document.body.offsetHeight + afterParallax.getBoundingClientRect().bottom - (safeMargin + airToFallon)) {
                if (0 < videoBounds) {
                    afterParallax.style.setProperty("transform", `translateY(-${videoBounds}px)`);
                }
            }
        }, false);
    }

    setBounds();
}, false);