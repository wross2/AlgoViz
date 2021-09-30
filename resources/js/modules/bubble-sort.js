import { Blocks } from './sorting.js';

async function bubbleSort(delay = 100) {
    const sortBlocks = new Blocks();
    const baseColor = "#29A0B1";
    const selectedBlockColor = "#E2808A";
    const finishedColor = "#2E765E";

    if (delay && typeof delay !== "number") {
        alert("sort: First argument must be a typeof Number");
        return;
    }
    let blocks = document.querySelectorAll(".block");
    for (let i = 0; i < blocks.length - 1; i += 1) {
        for (let j = 0; j < blocks.length - i - 1; j += 1) {
            blocks[j].style.backgroundColor = selectedBlockColor;
            blocks[j + 1].style.backgroundColor = selectedBlockColor;
    
            await new Promise(resolve =>
            setTimeout(() => {
                resolve();
            }, delay)
            );
  
            const value1 = Number(blocks[j].childNodes[0].innerHTML);
            const value2 = Number(blocks[j + 1].childNodes[0].innerHTML);
  
            if (value1 > value2) {
                await sortBlocks.swap(blocks[j], blocks[j + 1]);
                blocks = document.querySelectorAll(".block");
            }

            blocks[j].style.backgroundColor = baseColor;
            blocks[j + 1].style.backgroundColor = baseColor;
        }
  
        blocks[blocks.length - i - 1].style.backgroundColor = finishedColor;
    }
    blocks[0].style.backgroundColor = finishedColor;
}

export { bubbleSort }