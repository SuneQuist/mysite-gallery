const items = Array.from(document.querySelectorAll('.capcl-item'));

let addPadding = 50;
let rootCssPadding = '--pad';

for (let i = 0; i < items.length; i++) {
    const computed = getComputedStyle(document.documentElement);
    const globalFontSize = Number(computed.getPropertyValue('font-size').replace("px", ""));
    const [ptb, plr] = computed.getPropertyValue(rootCssPadding).split("rem", 2);
    
    let itemsFirstChild = items[i].querySelector('.capcli-hovered');

    itemsFirstChild.addEventListener("mouseover", function() {

        itemsFirstChild.style.setProperty('padding', `${(Number(ptb) * globalFontSize) + addPadding}px ${(Number(plr) * globalFontSize)}px`);
        itemsFirstChild.style.setProperty('margin', `-${addPadding}px 0`);

        let sliced1 = items.slice(0, items.indexOf(items[i]));
            for (let j = 0; j < sliced1.length; j++) {
                sliced1[j].querySelector('.capcli-hovered').style.setProperty('padding', `${(Number(ptb) * globalFontSize)}px ${(Number(plr) * globalFontSize)}px`);
                sliced1[j].querySelector('.capcli-hovered').style.setProperty('transform', `translate(0, -${addPadding}px)`);
            }

        let sliced2 = items.slice(items.indexOf(items[i])).slice(1);
            for (let j = 0; j < sliced2.length; j++) {
                sliced2[j].querySelector('.capcli-hovered').style.setProperty('padding', `${(Number(ptb) * globalFontSize)}px ${(Number(plr) * globalFontSize)}px`);
                sliced2[j].querySelector('.capcli-hovered').style.setProperty('transform', `translate(0, ${addPadding}px)`);
            }

        itemsFirstChild.addEventListener("mouseleave", function() {
            itemsFirstChild.style.setProperty('padding', `${(Number(ptb) * globalFontSize)}px ${(Number(plr) * globalFontSize)}px`);
            itemsFirstChild.style.setProperty('margin', `0px`);

            for (let j = 0; j < items.length; j++) {
                items[j].querySelector('.capcli-hovered').style.setProperty('transform', `translate(0px, 0px)`);
            }
        });
    });

}