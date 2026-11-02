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
    {
      title: '1st Place — Stock Market Simulation', badge: '1ST PLACE',
      meta: 'Chapters by IIT Bombay — Pune Chapter',
      description: 'Secured 1st place in a competitive stock market simulation organized by Chapters by IIT Bombay, Pune Chapter.',
      context: 'The competition challenged participants to make investment decisions in a simulated market environment, applying analytical reasoning, risk assessment, and strategic decision-making.',
      contributionLabel: 'My Contribution', contribution: 'Participated in the simulation, evaluating market scenarios and making trading decisions as part of the competition.',
      outcomeLabel: 'Result', outcome: '1st Place', repositoryNote: 'Not applicable — competition-based event.'
    },
    {
      title: '3rd Place — Case Competition', badge: '3RD PLACE',
      meta: 'Chapters by IIT Bombay — Pune Chapter · 8 August 2026',
      description: 'Secured 3rd place in a case competition organized by Chapters by IIT Bombay, Pune Chapter.',
      context: 'The competition focused on analyzing a problem, evaluating possible approaches, and developing a structured solution under competitive conditions.',
      contributionLabel: 'My Contribution', contribution: 'Worked on analyzing the case, identifying key challenges, and developing a reasoned approach to the problem.',
      outcomeLabel: 'Result', outcome: '3rd Place', repositoryNote: 'Not applicable — case-based competition.'
    },
    {
      title: 'Smart India Hackathon 2026', badge: 'INTERNAL SELECTION',
      meta: 'Institutional Selection · September 2026',
      description: 'Advanced to the second internal selection round of Smart India Hackathon 2026 with Digital Metrology Inspector, a computer vision-based system designed to automate the inspection of product packaging for legal metrology compliance.',
      role: 'Lead Computer Vision & Pipeline Engineer', contributions: [
        'Developed an image preprocessing pipeline using OpenCV, CLAHE, and bilateral filtering to improve text extraction from packaging images.',
        'Integrated PaddleOCR for text detection and bounding-box extraction.',
        'Worked on geometric font-dimension estimation using image calibration techniques.',
        'Built rule-based validation logic to check mandatory package declarations against legal metrology requirements.'
      ],
      outcomeLabel: 'Outcome', outcome: 'Reached the second internal selection round of SIH 2026.',
      repositoryUrl: 'https://github.com/p8kaushal/digital-metrology-inspector'
    }
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
