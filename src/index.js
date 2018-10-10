"use strict";
import stylesheet from "./style.css";
import App from "./app.js";
window.addEventListener("load", () => {
    let app = new App();
    app.start();
});
