# Project Specification Document: Keynote-Inspired Interactive Portfolio

---

## 1. Executive Summary & Concept Overview

The objective of this project is to build a high-performance, interactive, and accessible personal portfolio website designed in the style of an **Apple Keynote / Product Launch Event**.

Rather than relying on resource-intensive real-time 3D web rendering engines (like WebGL or Three.js), the website achieves a cinematic spatial experience using a high-resolution 2D layered composition. It combines an **Apple-inspired office backdrop**, **high-definition transparency-keyed video clips of the developer (Presenter)**, **cutout object layers (TV, Laptop, Paper, Smartphone)**, and **smooth GSAP camera choreography**.

The interface features a **Fortnite-inspired top navigation bar** for rapid tab switching. Switching between sections triggers continuous spatial pans, motion blurs, and object animations (e.g., laptop lid opening, TV screen powering on, phone sliding up).

---

## 2. Core User Experience & Section Breakdown

### 2.1 Splash Screen & Keynote Opener

* **Opening View:** High-contrast typography displaying the developer's name over a soft, blurred studio backdrop.
* **Transition:** A subtle blur-fade and inward camera track into the main stage.

### 2.2 Home Section (The Presenter Stage)

* **Visual Setup:** Centered view inside a modern, bright office studio featuring light-toned concrete, natural wood accents, and floor-to-ceiling glass.
* **Presenter:** Transparent WebM video loop of the developer standing in a natural pose with subtle motion (breathing, posture shifts).
* **Navigation:** Fortnite-style glassmorphism navbar fixed at the top for instant section jumps.

### 2.3 About Me Section

* **Camera Movement:** Smooth dolly shot inward and to the right.
* **Layout:** Presenter shifts to frame-left in an alternate posture; bio details, quick highlights, and key links slide in on frame-right.

### 2.4 Experience Section (The TV Studio Wall)

* **Camera Movement:** Camera pans to a wall-mounted studio screen.
* **Effect:** The screen plays a subtle TV power-on effect (brief light pulse and glass reflection).
* **Interactive Content:** An interactive node graph displaying educational and work timelines. Clicking any node expands a detail card.

### 2.5 Projects Section (The Demo Station)

* **Camera Movement:** Camera tilts down toward a desk station.
* **Effect:** A high-resolution laptop PNG cutout plays a 3D lid-flip opening animation.
* **Interactive Content:** A clean grid of project cards embedded inside the laptop screen area featuring thumbnails, short descriptions, tech tags, and live/GitHub links.

### 2.6 Skills & Resume Section (The Document Station)

* **Camera Movement:** Lateral camera slide over to a clean document station on the desk.
* **Skills:** Displayed as a clean paper/clipboard layout with live HTML typography.
* **Resume:** Displayed as a formatted document sheet with an anchored **Download PDF** action button.

### 2.7 Achievements & Awards Section (The Wall Gallery)

* **Camera Movement:** Pan to an illuminated gallery wall featuring framed certificates.
* **Interaction:** Cycling through certificates uses a GTA V weapon selector visual style (high-contrast highlight box with metallic click audio feedback).

### 2.8 Contact Section (The Smartphone Presenter)

* **Camera Movement:** The office background applies a soft depth-of-field blur filter.
* **Effect:** A matte black smartphone PNG performs a GTA V slide-up animation from the bottom-center of the screen.
* **Interactive Content:** The phone screen renders interactive app tiles (GitHub, LinkedIn, Email, X) that redirect on click.

---

## 3. Layering Architecture (The "Stack")

Every section scene is constructed using a 4-layer composition:

```
┌────────────────────────────────────────────────────────┐
│ Layer 4: Interactive HTML/Tailwind Overlays            │  <-- Live Text, Buttons, Timeline Nodes, Modals
├────────────────────────────────────────────────────────┤
│ Layer 3: Object PNG Cutouts (TV, Laptop, Paper, Phone) │  <-- CSS 3D Transforms (Lid flip, Phone slide)
├────────────────────────────────────────────────────────┤
│ Layer 2: Transparent Presenter Video / Cutout          │  <-- Green-screen WebM / Parallax Cutout
├────────────────────────────────────────────────────────┤
│ Layer 1: High-Res Office Background Image              │  <-- Light Apple-style Office Studio Backdrop
└────────────────────────────────────────────────────────┘

```

---

## 4. Responsive & Mobile Strategy ($<768\text{px}$)

To maintain high readability and smooth performance on mobile devices:

* **Handheld Glass Tablet Mode:** Instead of zooming into desktop laptop or TV cutouts (which ruins mobile text sizing), the Apple-style background stays softly blurred.
* **Interface:** All section details render inside a high-tech **Handheld Glass Tablet UI** anchored in the center of the mobile viewport.
* **Performance:** Video decoding falls back to high-res WebP photo cutouts with micro-parallax to preserve battery life and prevent thermal throttling.

---

## 5. Technical Requirements & Free Tech Stack

| Domain | Technology / Resource | Usage | Cost |
| --- | --- | --- | --- |
| **Framework** | **SvelteKit** or **Next.js** | Static generation, routing, and fast component rendering | Free |
| **Styling** | **Tailwind CSS** | Fortnite top bar, glassmorphism cards, responsive layouts | Free |
| **Animation Engine** | **GSAP (GreenSock) + ScrollTrigger** | Camera pans, motion-blur transitions, and object triggers | Free |
| **Wireframing** | **Google Stitch (`stitch.withgoogle.com`)** | Generating initial HTML/Tailwind layouts via AI prompts | Free |
| **Design & Prototype** | **Figma** | Layout tuning, color systems, and Smart Animate prototyping | Free |
| **Video Keying** | **CapCut / Unscreen / FFmpeg** | Removing green-screen backgrounds and encoding WebM | Free |
| **Cutout Assets** | **CleanPNG / PNGwing / Unsplash** | Sourcing high-res PNGs (TV, Laptop, Phone, Folder) | Free |
| **Hosting** | **Vercel** or **GitHub Pages** | Global CDN deployment with sub-second response times | Free |

---

## 6. Implementation Roadmap

### Phase 1: Prototyping & Layout Drafting

1. Generate base layout components in **Google Stitch**.
2. Refine spacing, typography, and glassmorphism elements in **Figma**.
3. Create Figma Smart Animate transitions to model the camera pans between tabs.

### Phase 2: Frontend Infrastructure Setup

1. Initialize the SvelteKit / Next.js project with Tailwind CSS.
2. Build the sticky **Fortnite-inspired top navigation bar** with active indicator states and a persistent mute toggle button.
3. Assemble the 4-layer composition container.

### Phase 3: GSAP Camera Choreography & Object Effects

1. Program GSAP timelines for camera panning and motion-blur effects across sections.
2. Code the laptop lid-opening CSS transform (`rotateX`).
3. Code the TV screen power-on effect and timeline node expansions.
4. Program the smartphone slide-up animation (`translateY`).

### Phase 4: Asset Preparation & Audio Integration

1. Record standing presenter poses; remove background and export light-weight WebM video loops.
2. Integrate minimal, high-value UI sound effects (haptic clicks for phone app tiles, TV power-on chime, audio mute toggle).

### Phase 5: Mobile Optimization & Deployment

1. Implement the **Handheld Glass Tablet** layout for viewports under $768\text{px}$.
2. Run asset compression (`tinypng`, `ffmpeg` WebM optimization).
3. Deploy to **Vercel** or **GitHub Pages**.