"use strict";

class Blocks {

    constructor(){
        this.container = document.querySelector(".data-container");
    }

    generateBlocks(num = 20) {
        const max = 100;
        const min = 20;
        this.container.innerHTML = '<div id="chart-title"></div >';
        let chartWidth = window.getComputedStyle(this.container).width;
        let margin = 10;
        chartWidth = Number(chartWidth.slice(0, chartWidth.length-2)) - margin*2;
        
        if (num && typeof num !== "number") {
            console.error("First argument must be a typeof Number");
            return;
        }
        if (chartWidth && typeof chartWidth !== "number"){
            console.error("chartWidth must be specified in px in CSS and converted to number in JS.");
        }
        
        //Size values are in px
        const blockGap = 2;
        let blockWidth = Math.floor(chartWidth / num - blockGap);

        for (let i = 0; i < num; i += 1) {
            const blockValue = Math.floor(Math.random() * (max - min + 1) + min);    
            const block = document.createElement("div");
            block.classList.add("block");
            block.style.height = `${blockValue * 3}px`;
            block.style.width = `${blockWidth}px`;
            block.style.transform = `translateX(${i * (blockWidth + blockGap)}px)`;
    
            const blockLabel = document.createElement("label");
            blockLabel.classList.add("block__id");
            blockLabel.innerHTML = blockValue;
            blockLabel.style.fontSize = `${(60-num)/2}px`;
    
            block.appendChild(blockLabel);
            this.container.appendChild(block);
        }
    }

    swap(block1, block2) {
        return new Promise(resolve => {
            const style1 = window.getComputedStyle(block1);
            const style2 = window.getComputedStyle(block2);
        
            const transform1 = style1.getPropertyValue("transform");
            const transform2 = style2.getPropertyValue("transform");
        
            block1.style.transform = transform2;
            block2.style.transform = transform1;
      
            // Wait for the transition to end
            window.requestAnimationFrame(function() {
                setTimeout(() => {
                    try{
                        let temp = document.createElement("div");
                        block1.parentNode.insertBefore(temp, block1);
                        block2.parentNode.insertBefore(block1, block2);
                        temp.parentNode.insertBefore(block2, temp);
                        temp.parentNode.removeChild(temp);
                        resolve();
                    }
                    catch (err){
                        const message = "Slider was changed by user before " +
                                        "sorting was completed. Sorting halted. " +
                                        "Everything should be working as expected."
                        console.log(err + " -> " + message);
                    }
                }, 250);
            });
        });
    }

    sort(algo){
        algo();
    }
}


export { Blocks };