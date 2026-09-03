export const sections = ["home", "about", "projects", "services", "contact"];

export const emojiPositions = {
    home: { x: 0.82, y: 0.20 },
    about: { x: 0.13, y: 0.22 },
    projects: { x: 0.82, y: 0.18 },
    services: { x: 0.12, y: 0.30 },
    contact: { x: 0.50, y: 0.14 }
};

export const expressions = {
    home: "happy",
    about: "curious",
    projects: "excited",
    services: "cool",
    contact: "celebrate"
};

export const state = {
    currentSection: "home",
    mouseX: window.innerWidth / 2,
    mouseY: window.innerHeight / 2,
    smoothMouseX: window.innerWidth / 2,
    smoothMouseY: window.innerHeight / 2,
    emojiX: window.innerWidth * emojiPositions.home.x,
    emojiY: window.innerHeight * emojiPositions.home.y,
    targetEmojiX: window.innerWidth * emojiPositions.home.x,
    targetEmojiY: window.innerHeight * emojiPositions.home.y
};

export function setMousePosition(x, y) {
    state.mouseX = x;
    state.mouseY = y;
}

export function setSection(section) {
    state.currentSection = section;
}

export function updateEmojiTarget(width, height) {
    const position = emojiPositions[state.currentSection] || emojiPositions.home;
    state.targetEmojiX = width * position.x;
    state.targetEmojiY = height * position.y;
}
