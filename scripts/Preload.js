export default class Preload {
	constructor() {
		document.addEventListener("DOMContentLoaded", () => {
			document.body.classList.remove("preload");
		});
	}
}
