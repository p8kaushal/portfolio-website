# Keynote Interactive Portfolio 🎬✨

An ultra-high-performance, cinematic personal portfolio designed in the aesthetic of an **Apple Keynote / Product Launch Event**.

Instead of heavy WebGL/Three.js rendering overhead, this portfolio delivers a fluid spatial experience through a layered 2.5D composition: high-resolution office studio backdrops, transparent presenter video/cutouts, interactive physical workstation objects (TV, Laptop Monitor, Desk Sheets, Smartphone), and choreographed GSAP camera transitions.

---

## 🌟 Key Features

- **Apple Keynote Cinematic Presentation**: Smooth spatial camera choreography, dynamic depth-of-field blur, and fluid dolly pans between stages.
- **Fortnite-Style Glassmorphism Navbar**: Floating top navigation bar with responsive pill selection, tactile SFX feedback, and section leaping.
- **Physical Interaction Stations**:
  - 🖥️ **Experience (Studio TV Wall)**: Wall-mounted CRT/LED studio display with boot bloom and interactive timeline nodes.
  - 💻 **Projects (Demo Station)**: Laptop & monitor workspace showcasing featured projects with modal detail deep-dives.
  - 📄 **Skills & Resume (Document Station)**: Clean clipboard sheets with real-time typography inspection and direct resume PDF download.
  - 🏆 **Achievements (Wall Gallery)**: Framed gallery wall with an interactive certificate selector and high-res modal viewer.
  - 📱 **Contact (Smartphone Dock)**: Slide-up smartphone interface with interactive app tiles (GitHub, LinkedIn, Email, X).
- **Responsive Mobile Tablet UI**: Automatically switches to an Apple-inspired handheld glass tablet interface on screens under `768px`, ensuring clean readability and zero thermal throttling.
- **Spatial Audio & Interactive Settings**: Embedded sound engine providing tactile click feedback, paired with a glass blur and opacity customization panel.

---

## 🛠️ Tech Stack

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | [SvelteKit 2](https://kit.svelte.dev/) | Fullstack meta-framework for static generation and routing |
| **Component Core** | [Svelte 5](https://svelte.dev/) | Reactive UI built using modern Svelte Runes (`$state`, `$derived`, `$props`) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Strict static typing across components, animations, and stores |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Next-gen utility-first CSS engine via `@tailwindcss/vite` |
| **Animation Engine** | [GSAP 3](https://greensock.com/gsap/) | Professional camera panning, speed ramping, and timeline orchestration |
| **Icons** | [Lucide Svelte](https://lucide.dev/) | Crisp, modern UI icons |
| **Bundler** | [Vite 8](https://vitejs.dev/) | Lightning-fast HMR and production bundling |
| **Auditing & QA** | [Playwright](https://playwright.dev/) | Automated visual regression testing and transition audits |
| **Audio** | HTML5 / Web Audio API | Low-latency spatial audio and mechanical tactile SFX |

---

## 📁 Architecture & Layering

Every keynote scene is built on a high-speed 4-layer composition:

```
┌────────────────────────────────────────────────────────┐
│ Layer 4: Interactive HTML/Tailwind Overlays            │  <-- Live Text, Buttons, Timeline Nodes, Modals
├────────────────────────────────────────────────────────┤
│ Layer 3: Object Cutouts (TV, Laptop, Paper, Phone)     │  <-- CSS 3D Transforms, CRT glow, Lid transitions
├────────────────────────────────────────────────────────┤
│ Layer 2: Transparent Presenter Video / Cutout          │  <-- Green-screen WebM / Parallax Cutouts
├────────────────────────────────────────────────────────┤
│ Layer 1: High-Res Office Background Image              │  <-- Apple Studio Backdrop & Depth-of-Field
└────────────────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: `v18.0.0` or higher (Node `v20+` recommended)
- **Package Manager**: `npm`, `pnpm`, or `yarn`

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/p8kaushal/portfolio-website.git
   cd portfolio-website
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to [http://localhost:5173](http://localhost:5173) to explore the keynote experience.

---

## 📜 Available Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Launch local development server with hot module replacement |
| `npm run build` | Build optimized production bundle |
| `npm run preview` | Preview production build locally |
| `npm run check` | Run `svelte-check` against TypeScript definitions |

---

## 📄 License

This project is open-source and licensed under the [MIT License](LICENSE) &copy; 2026 Parth Kaushal.
