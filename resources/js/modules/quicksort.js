import { Blocks } from './sorting.js';

var sortBlocks = new Blocks();
var baseColor = "#29A0B1";
var selectedBlockColor = "#E2808A";
var finishedColor = "#2E765E";
var pivotColor = '#C55FFC';
var defaultDelay = 200;

async function partition(low, high, delay=defaultDelay){
    let blocks = document.querySelectorAll(".block");
    let pivot = Number(blocks[high].childNodes[0].innerHTML);
    blocks[high].style.backgroundColor = pivotColor;

    let i = (low - 1);
    for (let j = low; j < high; j++){
        blocks[i+1].style.backgroundColor = selectedBlockColor;
        blocks[j].style.backgroundColor = selectedBlockColor;

        await new Promise(resolve =>
            setTimeout(() => {
                resolve();
            }, delay)
        );

        const jValue = Number(blocks[j].childNodes[0].innerHTML);
        if (jValue <= pivot){
            i += 1;
            if(i !== j) await sortBlocks.swap(blocks[i], blocks[j]);
            
            blocks = document.querySelectorAll(".block");
            blocks[i].style.backgroundColor = baseColor;
        }
        blocks[j].style.backgroundColor = baseColor;
    }

    blocks[high].style.backgroundColor = selectedBlockColor;
    await new Promise(resolve =>
        setTimeout(() => {
            resolve();
        }, delay)
    );
    await sortBlocks.swap(blocks[high], blocks[i+1]);
    blocks[high].style.backgroundColor = baseColor;
    blocks[i+1].style.backgroundColor = finishedColor;

    return i + 1;
}


async function quickSort(delay=defaultDelay) {
    if (delay && typeof delay !== "number") {
        alert("sort: First argument must be a typeof Number");
        return;
    }

    let blocks = document.querySelectorAll(".block");
    const lastIndex = blocks.length-1;
    let low = 0;
    let high = blocks.length-1;
    let arrStack = [blocks.length];

    while (low < lastIndex){
        blocks = document.querySelectorAll(".block");
        if((high-low) > 1){
            high = await partition(low, high, delay);
            arrStack.push(high);
            high-=1;
        } else if ((high-low) === 1){
            const lowVal = Number(blocks[low].childNodes[0].innerHTML);
            const highVal = Number(blocks[high].childNodes[0].innerHTML);
            blocks[high].style.backgroundColor = selectedBlockColor;
            blocks[low].style.backgroundColor = selectedBlockColor;

            await new Promise(resolve =>
                setTimeout(() => {
                    resolve();
                }, delay)
            );

            if(highVal < lowVal){
                await sortBlocks.swap(blocks[high], blocks[low]);
            }
            blocks[high].style.backgroundColor = finishedColor;
            low = arrStack.pop()+1;
            high = arrStack[arrStack.length-1]-1;
            if (low) {
                const blockArr = Array.from(blocks);
                blockArr.slice(0, low-1).forEach((block) => block.style.backgroundColor = finishedColor);
            }
        } else {
            low = arrStack.pop()+1;
            high = arrStack[arrStack.length-1]-1;
            if (low) {
                const blockArr = Array.from(blocks);
                blockArr.slice(0, low-1).forEach((block) => block.style.backgroundColor = finishedColor);
            }
        }
        await new Promise(resolve =>
            setTimeout(() => {
                resolve();
            }, delay)
        );
    }
 
    blocks.forEach((block) => block.style.backgroundColor = finishedColor);
}

export { quickSort };