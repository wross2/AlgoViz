"use strict";

class Blocks {

    constructor(){
        this.container = document.querySelector(".data-container");
    }

    generateBlocks(num = 20) {
        const max = 100;
        const min = 20;
        this.container.innerHTML = '';
        if (num && typeof num !== "number") {
            alert("First argument must be a typeof Number");
            return;
        }
        for (let i = 0; i < num; i += 1) {
            const value = Math.floor(Math.random() * (max - min + 1) + min);
    
            const block = document.createElement("div");
            block.classList.add("block");
            block.style.height = `${value * 3}px`;
            block.style.transform = `translateX(${i * 30}px)`;
    
            const blockLabel = document.createElement("label");
            blockLabel.classList.add("block__id");
            blockLabel.innerHTML = value;
    
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
                        console.log(err + "\n\n" + message);
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