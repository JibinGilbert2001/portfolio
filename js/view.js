const elements = {
	cursor: document.getElementById("cursor"),
	emojiTraveller: document.getElementById("emojiTraveller"),
	emojiFace: document.getElementById("emojiFace"),
	emojiEyeLeft: document.getElementById("emojiEyeLeft"),
	emojiEyeRight: document.getElementById("emojiEyeRight"),
	profileWrap: document.getElementById("profileWrap")
};

export function getElements() {
	return elements;
}

export function setCursorPosition(x, y) {
	if (!elements.cursor) return;
	elements.cursor.style.left = `${x}px`;
	elements.cursor.style.top = `${y}px`;
}

export function setCursorActive(active) {
	elements.cursor?.classList.toggle("active", active);
}

export function setEmojiExpression(expression) {
	elements.emojiFace?.classList.remove("happy", "curious", "excited", "cool", "love", "celebrate");
	elements.emojiFace?.classList.add(expression);
}

export function setEmojiTransform(x, y) {
	if (elements.emojiTraveller) {
		const halfSize = elements.emojiTraveller.offsetWidth / 2;
		elements.emojiTraveller.style.transform = `translate3d(${x - halfSize}px, ${y - halfSize}px, 0)`;
	}
}

export function setEyeTransform(eye, x, y) {
	if (eye) eye.style.transform = `translate(${x}px, ${y}px)`;
}

export function setBlinking(blinking) {
	elements.emojiFace?.classList.toggle("blink", blinking);
}

export function setProfileSuitVisible(visible) {
	elements.profileWrap?.classList.toggle("show-suit", visible);
}

export function setMagneticTransform(element, x, y) {
	element.style.transform = `translate(${x}px, ${y}px)`;
}

export function resetTransform(element) {
	element.style.transform = "";
}

export function setProjectTransform(element, rotateX, rotateY) {
	element.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
}

export function reveal(element) {
	element.classList.add("visible");
}

export function cloneFirstCarouselSlide(track) {
	const firstSlide = track.querySelector("img");
	if (!firstSlide) return false;
	track.appendChild(firstSlide.cloneNode(true));
	return true;
}

export function setCarouselPosition(track, index, animate = true) {
	track.style.transition = animate ? "transform .8s ease-in-out" : "none";
	track.style.transform = `translateX(-${index * 100}%)`;
}
