/** Editable portfolio data shared by the world and the quick-access interface. */
export const portfolio = {
  name: 'Parth Kaushal',
  title: 'Full-Stack Developer & AI/ML Enthusiast',
  location: 'Pune, Maharashtra, India',
  availability: 'Open to hackathons, collaborations and software development opportunities',
  resumeUrl: '/resume.pdf',
  about: [
    'I’m a Computer Science and Engineering undergraduate at Vishwakarma Institute of Technology, Pune, with a passion for building things that solve problems or create memorable experiences.',
    'My interests span full-stack development, artificial intelligence, machine learning, game development and emerging Web3 technologies. I enjoy experimenting across domains, learning new tools and taking projects from early ideas to functional prototypes.',
    '9.07 CGPA · Building and exploring since 2025 · Pune, India'
  ],
  // Snapshot of the public repositories pinned on Parth’s GitHub profile.
  projects: [
    { title: 'Digital Metrology Inspector', meta: 'Computer Vision · Compliance', description: 'Automated compliance verification for packaged commodities, using reference coin calibration, OCR and real-world font-size measurement.', details: 'Python · PaddleOCR · Computer Vision', githubUrl: 'https://github.com/p8kaushal/digital-metrology-inspector' },
    { title: 'Face Attendance', meta: 'Computer Vision · Full-Stack', description: 'A real-time face recognition and geofenced attendance management system.', details: 'SvelteKit 5 · MediaPipe · ONNX ArcFace · PostgreSQL', githubUrl: 'https://github.com/p8kaushal/face-attendance' },
    { title: 'Nation-State', meta: 'Strategy Game · Simulation', description: 'A turn-based executive political and macroeconomic strategy simulation game.', details: 'TypeScript · Vite · Supabase', githubUrl: 'https://github.com/p8kaushal/Nation-State' },
    { title: 'Python Scraper', meta: 'Finance · Browser Automation', description: 'A financial web scraper and browser automation toolkit for extracting stock market metrics.', details: 'Python · Playwright · BeautifulSoup', githubUrl: 'https://github.com/p8kaushal/python_scraper' },
    { title: 'Python YouTube Pipeline', meta: 'Automation · AI', description: 'A YouTube pipeline for scraping, audio downloading, transcription, summarization and persistence.', details: 'Python · yt-dlp · Whisper · Ollama · Prisma', githubUrl: 'https://github.com/p8kaushal/python_yt' },
    { title: 'ResonantAI', meta: 'AI · Assistive Communication', description: 'An edge-native real-time speech restoration and assistive communication engine for motor-speech impairments.', details: 'Python · Speech Restoration · AI/ML', githubUrl: 'https://github.com/p8kaushal/ResonantAI' }
  ],
  skills: [
    { title: 'Frontend', details: 'JavaScript, TypeScript, HTML, CSS, web interfaces, Electron' },
    { title: 'Spatial & rendering', details: 'WebGL, Babylon.js, Unity, Unreal Engine, Phaser, interactive 3D experiences' },
    { title: 'Backend & cloud', details: 'Node.js, Express.js, FastAPI, Flask, PostgreSQL, Supabase, WebSockets, Vercel' },
    { title: 'AI & computer vision', details: 'Python, scikit-learn, pandas, OpenCV, PaddleOCR, face-api.js, machine learning, data processing' },
    { title: 'Media & tooling', details: 'Git, GitHub, Electron, game development tools, software prototyping' },
    { title: 'Additional technologies', details: 'C, C++, C#, ESP32, RISC-V, embedded systems' },
    { title: 'Currently exploring', details: 'Web3, blockchain applications, smart contracts, decentralized applications' }
  ],
  experience: [
    { title: 'Avionics Subdivision Engineer', period: '2026 – Present', organization: 'Drone Research & Development SIG, VIT Pune', meta: '2026 – Present · Drone Research & Development SIG, VIT Pune', description: 'Contributing to embedded systems research and hardware-software integration, including low-level programming and microcontrollers.' },
    { title: 'B.Tech — Computer Science & Engineering', period: 'September 2025 – June 2029 (expected)', organization: 'Vishwakarma Institute of Technology, Pune', meta: 'September 2025 – June 2029 (expected) · Vishwakarma Institute of Technology, Pune', description: 'Specialization in IoT, Cybersecurity and Blockchain Technology. CGPA: 9.07/10.0.' }
  ],
  achievements: [
    { title: '1st Place — Stock Market Simulation', meta: '2026 · Chapters by IIT Bombay, Pune Chapter', description: 'First place in a competitive stock market simulation event.' },
    { title: '3rd Place — Case Competition', meta: '2026 · Chapters by IIT Bombay, Pune Chapter', description: 'Third place in a competition focused on structured problem-solving, analytical reasoning and strategy.' },
    { title: 'Smart India Hackathon 2026 — Internal Selection', meta: '2026 · Second internal round', description: 'Advanced to the second internal selection round with a computer-vision-based Digital Metrology Inspector project.' }
  ],
  contact: [
    { title: 'Email', label: 'parth.kaushal.007@gmail.com', href: 'mailto:parth.kaushal.007@gmail.com' },
    { title: 'GitHub', label: 'github.com/p8kaushal', href: 'https://github.com/p8kaushal' },
    { title: 'LinkedIn', label: 'Parth Kaushal', href: 'https://www.linkedin.com/in/parth-kaushal-0b3518386' },
    { title: 'X', label: '@_ParthKaushal', href: 'https://x.com/_ParthKaushal' },
    { title: 'Website', label: 'parthkaushal.in', href: 'https://parthkaushal.in' },
    { title: 'Telegram', label: '@parthkaushal', href: 'https://t.me/parthkaushal' },
    { title: 'Discord', label: 'parthkaushal_' }
  ]
};
