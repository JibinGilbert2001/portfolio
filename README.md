# Jibin Gilbert Portfolio

A responsive UI/UX design portfolio for Jibin Gilbert. The project is a framework-free static website using semantic HTML, one external stylesheet, and native JavaScript ES modules arranged with a lightweight MVC pattern.

## Current Experience

### Home

- Large editorial-style introduction for Jibin Gilbert.
- UI/UX designer role and short design statement.
- Primary call to action linking to the selected work section.
- Profile photo stage with decorative rings and floating labels.
- Suit/profile image transition based on the profile's position during scrolling.

### About

- Short design philosophy statement.
- Description of the design process: research, wireframing, prototyping, and visual design.
- Three statistics: months of experience, design projects, and passion for design.

### Selected Work

Four project cards are currently included:

1. Coffee Shop Mobile App, a UI/UX design project for web.
2. SeniorPay, a mobile UI/UX design project.
3. Real-Time Fisherman Tracking & Fisheries, a mobile UI/UX design project.
4. EduTrack, a school and college bus tracking system website concept.

Each project card includes a title, category, and an automatic image carousel. The carousel advances every three seconds, moves from right to left, loops infinitely, and keeps each screenshot fully visible inside the project box.

The current carousel folders are:

- `images/t1/` for the Coffee Shop / Tea Shop project.
- `images/s1/` for SeniorPay.
- `images/f1/` for Fisherman Tracking.
- `images/e1/` for EduTrack.

The project cards retain responsive sizing, hover elevation, and desktop pointer tilt.

### Services

The services section presents six offerings:

- UI/UX Design
- Mobile App Design
- Web Design
- Wireframing
- Prototyping
- Design Systems

### Contact

A large contact prompt ends the page with a `mailto:` call-to-action button. The email address is currently a placeholder: `your@email.com`.

## Interactive Features

- Fixed custom cursor on fine-pointer devices.
- Cursor expands when hovering links, projects, services, and statistics.
- Floating emoji companion that follows the active page section.
- Emoji position changes between home, about, projects, services, and contact.
- Section-specific emoji expressions: happy, curious, excited, cool, love, and celebrate.
- Emoji eyes follow the pointer with smooth limited movement.
- Natural periodic blinking, except during the celebrate expression.
- Subtle floating motion and animated shadow beneath the emoji.
- Magnetic movement for the main action buttons on desktop.
- Perspective tilt effect for project cards on desktop.
- Automatic horizontal project image carousels with a three-second interval.
- Infinite carousel looping using a cloned first slide for a smooth return to the beginning.
- Intersection Observer scroll reveal for elements using the `reveal` class.
- Fallback reveal behavior for browsers without Intersection Observer support.
- Profile image state changes when the profile moves away from the viewport center.
- Smooth anchor scrolling through the navigation and hero action link.

## Responsive and Accessibility Behavior

- Desktop navigation is replaced by a simpler layout below the desktop breakpoint.
- Hero content changes from a two-column layout to a single-column layout on smaller screens.
- Projects, services, and statistics collapse into one-column layouts on mobile.
- Profile stage, labels, emoji, typography, and spacing reduce for narrow screens.
- Custom cursor is hidden on coarse-pointer devices such as touchscreens.
- Magnetic and project tilt effects are disabled for coarse pointers and reduced-motion users.
- CSS animations and transitions are disabled when the user prefers reduced motion.
- Project images use lazy loading.
- Anchor links and image alternative text are retained in the HTML template.

## Project Structure

```text
my/
├── index.html
├── README.md
├── css/
│   └── styles.css
├── js/
│   ├── app.js
│   ├── controller.js
│   ├── model.js
│   └── view.js
└── images/
	├── ji.png
	├── j.png
	├── t.jpg
	├── s.jpg
	├── f.jpg
	├── 4.png
	├── t.jfif
	└── additional project image assets
```

## MVC Responsibilities

### Model: `js/model.js`

The model contains the section list, emoji positions, emoji expressions, and mutable runtime state. It provides small functions for updating pointer coordinates, the active section, and the emoji target position.

### View: `js/view.js`

The view owns references to the page's interactive DOM elements and exposes rendering helpers. It is responsible for class changes, CSS transforms, cursor state, emoji state, profile state, project transforms, and reveal visibility.

### Controller: `js/controller.js`

The controller coordinates the application. It finds the active section, calculates animation values, registers pointer/scroll/resize handlers, runs emoji and eye animation loops, schedules blinking, configures hover effects, and initializes scroll reveal behavior.

### Application Entry: `js/app.js`

The entry module imports `init()` from the controller and starts the page after the browser loads the module.

## Assets

All image assets are stored in `images/`. The currently displayed assets are:

- `images/ji.png`: active profile image.
- `images/t1/`: Coffee Shop / Tea Shop carousel screenshots.
- `images/s1/`: SeniorPay carousel screenshots.
- `images/f1/`: Fisherman tracking carousel screenshots.
- `images/e1/`: EduTrack carousel screenshots.

The folder also retains the alternate profile image `j.png`, `t.jfif`, and additional project image assets for future use.

## Run Locally

This project has no build step or dependency installation requirement. Because the JavaScript uses ES modules, serve the project through a local HTTP server instead of opening `index.html` directly with a `file://` URL.

From the project root, run:

```powershell
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

Stop the server with `Ctrl+C`.

## Editing Guide

- Change page text, section markup, navigation, or image `alt` text in `index.html`.
- Change visual design, responsive breakpoints, animation timing, and layout rules in `css/styles.css`.
- Change section-aware emoji positions or expressions in `js/model.js`.
- Add new DOM rendering behavior to `js/view.js`.
- Add event handling and interaction calculations to `js/controller.js`.
- Keep `js/app.js` limited to application startup.
- Use relative paths when adding new stylesheets, modules, or images.

## Verification Checklist

After making changes:

- Serve the project locally and check the browser console for module errors.
- Confirm all image paths load without 404 responses.
- Test navigation and the hero call to action.
- Test cursor, emoji, blinking, profile, magnetic, tilt, and reveal interactions.
- Resize the page across desktop and mobile widths.
- Test with reduced motion enabled.
- Test on a touch or coarse-pointer device when changing pointer interactions.
