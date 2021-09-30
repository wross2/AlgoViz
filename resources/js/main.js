"use strict";

import { sortHTML } from './modules/html.js';

const main = document.getElementById('main');

sortHTML();

document.getElementById("algoviz").addEventListener("click", sortHTML);