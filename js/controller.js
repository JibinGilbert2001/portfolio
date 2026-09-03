import {
    sections,
    expressions,
    state,
    setMousePosition,
    setSection,
    updateEmojiTarget
} from "./model.js";
import {
    getElements,
    setCursorPosition,
    setCursorActive,
    setEmojiExpression,
    setEmojiTransform,
    setEyeTransform,
    setBlinking,
    setProfileSuitVisible,
    setMagneticTransform,
    resetTransform,
    setProjectTransform,
    reveal,
    cloneFirstCarouselSlide,
    setCarouselPosition
} from "./view.js";

const elements = getElements();
const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function findActiveSection() {
    const viewportPoint = window.scrollY + window.innerHeight * 0.35;
    let active = "home";
    let closest = Infinity;

    sections.forEach((id) => {
        const section = document.getElementById(id);
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const sectionCenter = window.scrollY + rect.top + rect.height / 2;
        const distance = Math.abs(sectionCenter - viewportPoint);
        if (distance < closest) {
            closest = distance;
            active = id;
        }
    });

    return active;
}

function updateActiveSection() {
    const section = findActiveSection();
    if (section === state.currentSection) return;
    setSection(section);
    updateEmojiTarget(window.innerWidth, window.innerHeight);
    setEmojiExpression(expressions[section]);
}

function updateProfile() {
    if (!elements.profileWrap) return;
    const rect = elements.profileWrap.getBoundingClientRect();
    const distance = rect.top + rect.height / 2 - window.innerHeight / 2;
    setProfileSuitVisible(Math.abs(distance) > window.innerHeight * 0.18);
}

function animateEmoji() {
    state.emojiX += (state.targetEmojiX - state.emojiX) * 0.055;
    state.emojiY += (state.targetEmojiY - state.emojiY) * 0.055;
    state.smoothMouseX += (state.mouseX - state.smoothMouseX) * 0.08;
    state.smoothMouseY += (state.mouseY - state.smoothMouseY) * 0.08;

    const motionFactor = prefersReducedMotion ? 0 : 1;
    const mouseOffsetX = (state.smoothMouseX - window.innerWidth / 2) * 0.035 * motionFactor;
    const mouseOffsetY = (state.smoothMouseY - window.innerHeight / 2) * 0.025 * motionFactor;
    const time = performance.now() * 0.001;
    const floatingX = Math.sin(time * 1.1) * 7 * motionFactor;
    const floatingY = Math.sin(time * 1.5) * 6 * motionFactor;

    setEmojiTransform(
        state.emojiX + mouseOffsetX + floatingX,
        state.emojiY + mouseOffsetY + floatingY
    );
    requestAnimationFrame(animateEmoji);
}

function moveEye(eye, maxMovement) {
    if (!eye || !elements.emojiFace) return;
    const faceRect = elements.emojiFace.getBoundingClientRect();
    const dx = state.smoothMouseX - (faceRect.left + faceRect.width / 2);
    const dy = state.smoothMouseY - (faceRect.top + faceRect.height / 2);
    const distance = Math.sqrt(dx * dx + dy * dy) || 1;
    const scale = Math.min(1, maxMovement / distance);
    setEyeTransform(eye, dx * scale, dy * scale);
}

function animateEyes() {
    moveEye(elements.emojiEyeLeft, 8);
    moveEye(elements.emojiEyeRight, 8);
    requestAnimationFrame(animateEyes);
}

function blink() {
    if (elements.emojiFace?.classList.contains("celebrate")) return;
    setBlinking(true);
    window.setTimeout(() => setBlinking(false), 130);
}

function scheduleBlink() {
    window.setTimeout(() => {
        blink();
        scheduleBlink();
    }, 2500 + Math.random() * 3500);
}

function setupCursor() {
    if (!elements.cursor || isCoarsePointer) {
        elements.cursor?.style.setProperty("display", "none");
        return;
    }

    document.addEventListener("mousemove", (event) => {
        setMousePosition(event.clientX, event.clientY);
        setCursorPosition(event.clientX, event.clientY);
    });

    document.querySelectorAll("a, .project, .service, .stat, .review").forEach((element) => {
        element.addEventListener("mouseenter", () => setCursorActive(true));
        element.addEventListener("mouseleave", () => setCursorActive(false));
    });
}

function setupMagneticButtons() {
    if (isCoarsePointer || prefersReducedMotion) return;
    document.querySelectorAll(".magnetic").forEach((button) => {
        button.addEventListener("mousemove", (event) => {
            const rect = button.getBoundingClientRect();
            setMagneticTransform(button, (event.clientX - rect.left - rect.width / 2) * 0.15, (event.clientY - rect.top - rect.height / 2) * 0.15);
        });
        button.addEventListener("mouseleave", () => resetTransform(button));
    });
}

function setupProjectTilt() {
    if (isCoarsePointer || prefersReducedMotion) return;
    document.querySelectorAll(".project").forEach((project) => {
        project.addEventListener("mousemove", (event) => {
            const rect = project.getBoundingClientRect();
            setProjectTransform(project, -((event.clientY - rect.top - rect.height / 2) / 30), (event.clientX - rect.left - rect.width / 2) / 30);
        });
        project.addEventListener("mouseleave", () => resetTransform(project));
    });
}

function setupReveal() {
    const revealElements = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
        revealElements.forEach(reveal);
        return;
    }
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                reveal(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });
    revealElements.forEach((element) => observer.observe(element));
    window.setTimeout(() => revealElements.forEach(reveal), 2500);
}

function setupCarousels() {
    document.querySelectorAll("[data-carousel]").forEach((carousel) => {
        const track = carousel.querySelector(".carousel-track");
        if (!track || !cloneFirstCarouselSlide(track)) return;

        const slideCount = track.children.length - 1;
        let currentSlide = 0;
        const interval = Number(carousel.dataset.interval) || 3000;
        setCarouselPosition(track, currentSlide, false);

        window.setInterval(() => {
            currentSlide += 1;
            setCarouselPosition(track, currentSlide, !prefersReducedMotion);

            if (currentSlide === slideCount) {
                window.setTimeout(() => {
                    currentSlide = 0;
                    setCarouselPosition(track, currentSlide, false);
                }, prefersReducedMotion ? 0 : 800);
            }
        }, interval);
    });
}

export function init() {
    updateEmojiTarget(window.innerWidth, window.innerHeight);
    setEmojiExpression(expressions[state.currentSection]);
    setupCursor();
    setupMagneticButtons();
    setupProjectTilt();
    setupReveal();
    setupCarousels();
    animateEmoji();
    if (!prefersReducedMotion) {
        animateEyes();
        scheduleBlink();
    }

    window.addEventListener("scroll", () => {
        updateActiveSection();
        updateProfile();
    }, { passive: true });
    window.addEventListener("resize", () => {
        updateEmojiTarget(window.innerWidth, window.innerHeight);
        updateProfile();
    });
    window.setTimeout(() => {
        updateActiveSection();
        updateProfile();
    }, 100);
}
