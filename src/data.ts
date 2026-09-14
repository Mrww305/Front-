import { Project, ServiceItem, Testimonial, StatItem } from './types';

export const STATS: StatItem[] = [
  { number: '150+', label: 'Projects Delivered' },
  { number: '50+', label: 'Happy Clients' },
  { number: '12', label: 'Awards Won' },
  { number: '8+', label: 'Years Experience' },
];

export const PROJECTS: Project[] = [
  {
    id: 'nebula-dashboard',
    title: 'Nebula Dashboard',
    category: 'Web Application',
    description: 'Real-time analytics platform with 3D data visualization and interactive topology graphs.',
    bgGradient: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
    client: 'Nebula Cloud Systems',
    year: '2024',
    metrics: '99.99% Uptime, 3.2M Events/sec',
    fullDetails: 'Engineered a high-throughput WebGL telemetry cockpit that turns complex cloud infrastructure telemetry into intuitive, interactive 3D spatial node networks and real-time GPU heatmaps.',
    tags: ['WebGL', 'Three.js', 'React', 'WebSockets', 'Shaders'],
    features: [
      'GPU-accelerated vector field rendering',
      'Sub-millisecond real-time event pipeline',
      'Spatial clustering of distributed clusters',
      'Accessible keyboard controls & high-contrast mode'
    ]
  },
  {
    id: 'aurora-commerce',
    title: 'Aurora Commerce',
    category: 'E-Commerce',
    description: 'Immersive shopping experience with AR product preview and spatial audio checkout.',
    bgGradient: 'linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)',
    client: 'Aurora Luxury Goods',
    year: '2024',
    metrics: '+44% Conversion Rate, -28% Returns',
    fullDetails: 'Developed an interactive digital flagship boutique where customers manipulate photorealistic 3D luxury products in real-time, test virtual materials under custom lighting conditions, and launch seamless WebXR augmented reality try-ons.',
    tags: ['WebXR', 'AR Quick Look', 'PBR Materials', 'Tailwind', 'Motion'],
    features: [
      'Photorealistic PBR glTF model inspection',
      'Instant WebXR / QuickLook AR integration',
      'Interactive material switcher (titanium, ceramic, matte)',
      'Sub-second first-contentful paint with lazy geometry streaming'
    ]
  },
  {
    id: 'prism-studio',
    title: 'Prism Studio',
    category: 'Creative Tool',
    description: 'AI-powered design suite with real-time multiplayer canvas and generative shaders.',
    bgGradient: 'linear-gradient(135deg, #db2777 0%, #ec4899 100%)',
    client: 'Prism Creative Labs',
    year: '2023',
    metrics: '120k Monthly Active Creators',
    fullDetails: 'A browser-first spatial canvas for motion designers and generative artists. Provides node-based GLSL fragment shader builders and instant team co-editing with zero latency.',
    tags: ['GLSL', 'WebGPU', 'Real-time Collaboration', 'Generative Art'],
    features: [
      'Visual node graph for GLSL fragment pipelines',
      'Multi-cursor multiplayer sync over WebRTC',
      'Non-destructive procedural layer stacking',
      'Instant export to 4K WebM, MP4, and Lottie'
    ]
  },
  {
    id: 'vertex-engine',
    title: 'Vertex Engine',
    category: 'Game Development',
    description: 'Lightweight WebGL game engine tailored for micro-games and interactive narrative campaigns.',
    bgGradient: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
    client: 'Vertex Interactive',
    year: '2023',
    metrics: '60 FPS on low-end mobile devices',
    fullDetails: 'Built a custom zero-dependency WebGL runtime tailored for branded browser activations. Supports rigid body physics, particle emitters, and spatialized Web Audio within a tiny 48KB bundle.',
    tags: ['WebGL 2.0', 'Web Audio API', 'Physics Engine', 'TypeScript'],
    features: [
      'Ultra-compact 48KB runtime payload',
      'Deterministic rigid-body collisions',
      'Positional binaural 3D soundscapes',
      'Zero-jank 60/120 FPS rendering pipeline'
    ]
  },
];

export const SERVICES: ServiceItem[] = [
  {
    num: '01',
    title: 'Brand Identity',
    description: 'Crafting memorable visual stories that resonate with discerning audiences and command attention.',
    gradient: 'linear-gradient(135deg, hsl(260, 60%, 18%), hsl(280, 70%, 28%))',
    accentColor: '#8b5cf6',
    deliverables: ['Design Systems', '3D Brand Assets', 'Motion Guidelines', 'Typography Strategy']
  },
  {
    num: '02',
    title: 'Web Development',
    description: 'High-performance applications built for scale, ultra-fast load times, and rock-solid architecture.',
    gradient: 'linear-gradient(135deg, hsl(190, 60%, 18%), hsl(210, 70%, 28%))',
    accentColor: '#06b6d4',
    deliverables: ['Full-stack Web Apps', 'Headless Platforms', 'API Architectures', 'Performance Audits']
  },
  {
    num: '03',
    title: 'Motion Design',
    description: 'Bringing interfaces to life with fluid animation, micro-interactions, and scroll choreography.',
    gradient: 'linear-gradient(135deg, hsl(330, 60%, 18%), hsl(350, 70%, 28%))',
    accentColor: '#ec4899',
    deliverables: ['Scroll Choreography', 'Micro-interactions', 'Lottie & Canvas', 'Interactive Rive']
  },
  {
    num: '04',
    title: '3D & WebGL',
    description: 'Immersive digital experiences directly in the browser with silky smooth 60fps frame rates.',
    gradient: 'linear-gradient(135deg, hsl(40, 60%, 18%), hsl(50, 70%, 28%))',
    accentColor: '#f59e0b',
    deliverables: ['Custom Three.js Scenes', 'Custom GLSL Shaders', 'WebXR / AR', 'Configurators']
  },
  {
    num: '05',
    title: 'AI Integration',
    description: 'Smart, adaptive solutions and intelligent interfaces designed for cutting-edge modern products.',
    gradient: 'linear-gradient(135deg, hsl(150, 60%, 18%), hsl(170, 70%, 28%))',
    accentColor: '#10b981',
    deliverables: ['Generative Pipelines', 'Intelligent Agents', 'Semantic Search', 'Adaptive UX']
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: 'Megnitoo transformed our digital presence. The 3D experience they created for our product launch was nothing short of breathtaking.',
    author: 'Sarah Chen',
    role: 'CEO',
    company: 'TechVision Inc.',
    avatarBg: '#8b5cf6'
  },
  {
    quote: 'Their attention to accessibility and performance is unmatched. Our Lighthouse scores went from 60 to 98 after their redesign.',
    author: 'Marcus Johnson',
    role: 'CTO',
    company: 'DataFlow',
    avatarBg: '#06b6d4'
  },
  {
    quote: 'Working with Megnitoo felt like having an extension of our own team. They truly understood our vision and exceeded every expectation.',
    author: 'Elena Rodriguez',
    role: 'Creative Director',
    company: 'Bloom Studio',
    avatarBg: '#ec4899'
  },
];
