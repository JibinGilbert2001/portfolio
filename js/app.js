import { init } from "./controller.js";

document.documentElement.classList.add("js");

try {
	init();
} catch (error) {
	document.documentElement.classList.remove("js");
	console.error("Portfolio interactions could not be initialized.", error);
}
