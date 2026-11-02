<script lang="ts">
	import { onMount } from 'svelte';
	import { systemSettings } from '$lib/stores/glassSettings';
	import { playSound } from '$lib/utils/soundEngine';
	import { playMonitorBootAnimation } from '$lib/animations/monitorBootChoreography';
	import ProjectDetailModal from './ProjectDetailModal.svelte';

	let { projects = [
		{
			id: 'ipl-win-predictor',
			title: 'IPL Match Win Predictor',
			year: '2025',
			category: 'Machine Learning',
			tech: 'Python • scikit-learn • Flask • pandas',
			tags: ['Python', 'scikit-learn', 'Flask', 'pandas', 'Machine Learning'],
			thumbnailUrl: '/bg-projects.jpg',
			description: 'Machine learning web application predicting second-innings IPL win probabilities based on live match dynamics.',
			longDescription: 'Interactive ML web application trained on extensive historical ball-by-ball IPL match data. The pipeline models second-innings match situations (target, current score, wickets in hand, overs remaining, and required run rate) to calculate real-time win probabilities for chasing teams.',
			liveUrl: 'https://github.com/p8kaushal/ipl-win-predictor',
			githubUrl: 'https://github.com/p8kaushal/ipl-win-predictor',
			highlights: [
				'Trained classification models achieving high accuracy on ball-by-ball match dataset',
				'Dynamic feature engineering for target, run rates, wickets, and venue statistics',
				'Interactive Flask web interface with responsive scenario simulation controls'
			]
		},
		{
			id: 'facetrack-cv',
			title: 'FaceTrack — Face & Gesture Control',
			year: '2025',
			category: 'Computer Vision',
			tech: 'Python • OpenCV • MediaPipe • dlib',
			tags: ['OpenCV', 'MediaPipe', 'Python', 'Biometrics', 'Computer Vision'],
			thumbnailUrl: '/bg-experience.jpg',
			description: 'Real-time computer vision system for biometric facial recognition and touchless gesture-based device interaction.',
			longDescription: 'High-performance computer vision suite integrating 68-point facial landmark detection and 128-dimensional dlib face embeddings for instant biometric authentication, combined with 21-point MediaPipe hand landmark tracking for contactless gesture control of desktop media and system actions.',
			liveUrl: 'https://github.com/p8kaushal/facemark-gesture-control',
			githubUrl: 'https://github.com/p8kaushal/facemark-gesture-control',
			highlights: [
				'68-point facial landmark and dlib embedding biometric verification',
				'21-point hand skeleton tracking with MediaPipe for touchless gesture controls',
				'Smooth 30+ FPS real-time processing loop optimized on standard webcams'
			]
		},
		{
			id: 'resonant-ai',
			title: 'ResonantAI — Audio Emotion Analyzer',
			year: '2025 – 2026',
			category: 'Audio Intelligence',
			tech: 'Python • Librosa • FastAPI • scikit-learn',
			tags: ['Audio Processing', 'FastAPI', 'Librosa', 'Speech Emotion', 'AI'],
			thumbnailUrl: '/bg-office-center.jpg',
			description: 'Multimodal audio intelligence pipeline analyzing vocal tone, pitch, and acoustic features for real-time emotion classification.',
			longDescription: 'Intelligent audio signal processing system that extracts Mel-Frequency Cepstral Coefficients (MFCCs), chroma, and spectral contrast features from raw voice waveforms to classify emotional affect (Happy, Calm, Anxious, Frustrated, Neutral) with an edge-ready FastAPI streaming inference server.',
			liveUrl: 'https://github.com/p8kaushal/resonant-ai',
			githubUrl: 'https://github.com/p8kaushal/resonant-ai',
			highlights: [
				'Acoustic feature extraction of MFCCs, spectral roll-off, and pitch contours',
				'Multi-class classifier predicting discrete emotional states from voice',
				'FastAPI REST endpoints for low-latency streaming audio inference'
			]
		},
		{
			id: 'digital-metrology',
			title: 'Digital Metrology & Defect Inspector',
			year: '2025',
			category: 'Computer Vision / QC',
			tech: 'Python • OpenCV • scikit-image • NumPy',
			tags: ['OpenCV', 'Quality Inspection', 'scikit-image', 'Metrology', 'Python'],
			thumbnailUrl: '/bg-desk-papers.jpg',
			description: 'Automated optical inspection and measurement system leveraging computer vision for sub-millimeter component quality control.',
			longDescription: 'Industrial computer vision pipeline for automated dimensional metrology and defect detection. Uses Canny edge detection, contour approximation, and perspective homography calibration to measure component geometries down to sub-millimeter tolerances and flag surface anomalies.',
			liveUrl: 'https://github.com/p8kaushal/digital-metrology-inspector',
			githubUrl: 'https://github.com/p8kaushal/digital-metrology-inspector',
			highlights: [
				'Contour analysis and homography calibration for sub-millimeter geometric measurement',
				'Automated detection of surface defects, cracks, and machining burrs',
				'Visual pass/fail diagnostic analytics dashboard with tolerance bands'
			]
		},
		{
			id: 'skill-swap',
			title: 'Skill Swap — Knowledge Exchange',
			year: '2025',
			category: 'Full-Stack Web',
			tech: 'TypeScript • Node.js • PostgreSQL • SvelteKit',
			tags: ['SvelteKit', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind'],
			thumbnailUrl: '/bg-projects.jpg',
			description: 'Full-stack web application enabling students and professionals to exchange technical skills through a credit-based matching system.',
			longDescription: 'Community platform connecting learners and mentors for peer-to-peer technical knowledge transfer. Features normalized PostgreSQL schemas, session-based JWT authentication, peer scheduling calendar, review scoring, and a gamified skill badge economy.',
			liveUrl: 'https://github.com/p8kaushal/skill-swap-platform',
			githubUrl: 'https://github.com/p8kaushal/skill-swap-platform',
			highlights: [
				'Relational data modeling in PostgreSQL with indexed search and session auth',
				'Peer-to-peer request matchmaking and mutual credit transaction ledger',
				'Responsive SvelteKit and Tailwind CSS UI with interactive profile showcases'
			]
		},
		{
			id: 'hardhit-3d-cricket',
			title: 'HardHit 3D Cricket',
			year: '2025',
			category: 'Game Dev / Spatial',
			tech: 'WebGL • Babylon.js / Three.js • Canvas API',
			tags: ['WebGL', 'Babylon.js', 'Three.js', 'Game Development', 'Physics'],
			thumbnailUrl: '/bg-office-center.jpg',
			description: 'Immersive browser-based 3D cricket simulation featuring physics-driven batting mechanics and dynamic field positioning.',
			longDescription: 'Interactive 3D sports simulation running directly in the browser via WebGL. Incorporates dynamic ball trajectory mechanics (spin, seam bounce, friction), gesture-based shot timing and loft controls, dynamic fielding AI, and realistic stadium audio.',
			liveUrl: 'https://github.com/p8kaushal/hardhit-3d-cricket',
			githubUrl: 'https://github.com/p8kaushal/hardhit-3d-cricket',
			highlights: [
				'Custom ball trajectory physics engine simulating swing, seam, and pitch degradation',
				'Responsive gesture-driven batting controls translating swipe vectors into shot angles',
				'Optimized 60 FPS 3D rendering pipeline running directly in web browsers'
			]
		}
	] }: { projects?: any[] } = $props();

	let selectedProject = $state<any | null>(null);

	onMount(() => {
		playMonitorBootAnimation();
	});
</script>

<div 
  id="projects-monitor-root"
  class="absolute top-[12%] left-1/2 -translate-x-1/2 w-[76vw] max-w-[1140px] h-[60vh] max-h-[640px] rounded-[24px] bg-slate-950/90 border border-white/20 shadow-[0_32px_90px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden pointer-events-auto z-20 transition-opacity duration-300 opacity-100"
  style="background-color: rgba(255, 255, 255, {$systemSettings.opacity}); backdrop-filter: blur({$systemSettings.blur}px); -webkit-backdrop-filter: blur({$systemSettings.blur}px);"
>
  <!-- macOS Traffic Dots Header Bar -->
  <div class="w-full h-11 bg-slate-950/90 border-b border-white/10 px-5 flex items-center justify-between select-none shrink-0 z-30">
    <div class="flex items-center gap-2">
      <span class="w-3 h-3 rounded-full bg-rose-500/90 shadow-[0_0_8px_rgba(244,63,94,0.6)]"></span>
      <span class="w-3 h-3 rounded-full bg-amber-500/90 shadow-[0_0_8px_rgba(245,158,11,0.6)]"></span>
      <span class="w-3 h-3 rounded-full bg-emerald-500/90 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span>
    </div>
    <div class="flex items-center gap-2">
      <span class="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">DisplayPort 1.4 • 144Hz</span>
      <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
    </div>
  </div>

  <!-- Scrollable Projects Body Grid -->
  <div 
    id="projects-scroll-container"
    class="flex-1 w-full overflow-y-auto overflow-x-hidden p-6 md:p-8 scroll-smooth pointer-events-auto z-20"
    style="scrollbar-width: thin; scrollbar-color: rgba(0,0,0,0.2) transparent;"
  >
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
      {#each projects as project}
        <!-- High-Contrast Readable Card Item -->
        <button
          type="button"
          onmouseenter={() => playSound('click')}
          onclick={() => { playSound('click'); selectedProject = project; }}
          class="project-card pointer-events-auto p-5 rounded-2xl bg-white/85 border border-white/90 shadow-[0_12px_32px_rgba(0,0,0,0.12)] hover:shadow-2xl hover:border-sky-500/60 transition-all duration-300 hover:scale-[1.015] cursor-pointer group flex flex-col justify-between text-slate-950 text-left"
        >
          <div>
            <!-- Media Thumbnail Preview -->
            <div class="relative aspect-video w-full rounded-xl overflow-hidden mb-3.5 bg-slate-950 border border-slate-200">
              <img 
                src={project?.thumbnailUrl || '/images/projects/placeholder.jpg'} 
                alt={project?.title || 'Project'}
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span class="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-slate-950/90 border border-white/20 text-[10px] font-mono font-bold text-sky-400 backdrop-blur-md">
                {project?.year ?? '2026'}
              </span>
            </div>

            <!-- Black Readable Typography -->
            <h3 class="text-base font-black text-slate-950 group-hover:text-sky-600 transition-colors flex items-center justify-between">
              {project?.title ?? 'Untitled Project'}
              <span class="text-xs text-slate-500 group-hover:text-sky-600 transition-colors">↗</span>
            </h3>
            <p class="text-xs text-slate-800 mt-1.5 font-semibold leading-relaxed line-clamp-2">
              {project?.description ?? ''}
            </p>
          </div>

          <div class="mt-4 pt-3 border-t border-slate-200/80 flex flex-wrap gap-1.5">
            {#each (project?.tags ?? []) as tag}
              <span class="text-[10px] font-mono font-bold px-2.5 py-0.5 bg-slate-900 text-white rounded-md">{tag}</span>
            {/each}
          </div>
        </button>
      {/each}
    </div>
  </div>

  {#if selectedProject}
    <ProjectDetailModal project={selectedProject} onClose={() => (selectedProject = null)} />
  {/if}
</div>
