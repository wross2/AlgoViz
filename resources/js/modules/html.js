"use strict";

import { Blocks } from './sorting.js';
import {bubbleSort} from './bubble-sort.js';

function sortHTML() {
    const defaultSliderNum = 20;
    main.innerHTML =  `
        <section class="data-container"></section>
        <div class="main-body">
            <form>
                <select id="sorting-select">
                    <option value="bubble">Bubble Sort</option>
                    <option value="merge">Merge Sort</option>
                    <option value="quick">QuickSort</option>
                </select>
                
                <input type="range" min="10" max="50" step="1" value="${defaultSliderNum}" id="sorting-slider">
                <span id="slider-output">${defaultSliderNum}</span>
                <button type="button" id="sorting-submit">Start</button>
            </form>
            <p> </p>
        </div>
    `;
    const myBlocks = new Blocks();
    myBlocks.generateBlocks();

    document.getElementById("sorting-submit").addEventListener("click", () => myBlocks.sort(bubbleSort));
    document.getElementById("sorting-slider").addEventListener("change", () => {
        const slider = document.getElementById("sorting-slider");
        const sliderOutput = document.getElementById("slider-output");
        myBlocks.generateBlocks(Number(slider.value));
        sliderOutput.innerHTML = slider.value;
    });
}


export { sortHTML };