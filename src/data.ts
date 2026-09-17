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
    category: 'Web & 3D Spatial',
    description: 'Real-time analytics platform with 3D data visualization, eBPF low-latency mesh, and runtime debugging.',
    bgGradient: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
    client: 'Nebula Cloud Systems',
    year: '2024',
    metrics: '0.8ms Latency, Full-Mesh Nodes',
    fullDetails: 'Engineered a high-throughput WebGL telemetry cockpit that turns complex cloud infrastructure telemetry into intuitive, interactive 3D spatial node networks and real-time GPU heatmaps.',
    tags: ['WebGL', 'Three.js', 'eBPF Mesh', 'Active Debugger', 'WebSockets'],
    features: [
      'Full-mesh 7-node bidirectional telemetry interconnect',
      'eBPF Zero-RTT low latency protocol (<1.2ms P99)',
      'Active runtime debugger with live streaming trace logs',
      'Diagnostic roundtrip ping simulation with 0.00% packet loss'
    ]
  },
  {
    id: 'aurora-commerce',
    title: 'Aurora Commerce',
    category: 'Web & 3D Spatial',
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
    category: 'Web & 3D Spatial',
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
    category: 'Web & 3D Spatial',
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
  {
    id: 'construction-blueprint',
    title: 'Megnitoo Construction BIM',
    category: 'Construction & Spatial',
    description: 'Interactive 3D Architectural CAD & BIM blueprint engine with floor slicing and seismic load simulation.',
    bgGradient: 'linear-gradient(135deg, #0284c7 0%, #0ea5e9 100%)',
    client: 'Megnitoo Infrastructure / MrWorldWide',
    year: '2024',
    metrics: '142,500 sq ft, Zone 4 Seismic',
    fullDetails: 'Comprehensive architectural CAD and structural engineering tool delivering in-browser 3D building exploration, orthographic floor-by-floor slicing, material toggling, and interactive caliper measurement.',
    tags: ['Three.js', 'BIM Modeling', 'CAD Wireframe', 'Seismic Stress', 'Structural Engineering'],
    features: [
      'Interactive 6-tier floor-by-floor architectural cross-sectioning',
      'Live PBR material toggle (High-tensile steel, concrete, structural glazing)',
      'Simulated Zone 4 seismic stress deflection test',
      'Real-time measurement caliper tool with elevation metrics'
    ]
  },
  {
    id: 'iqra-ai',
    title: 'iQRA AI Enterprise Agent',
    category: 'Enterprise Intelligence',
    description: 'Enterprise-grade RAG-powered chatbot acting as central intelligence gateway for JW Corporation Pakistan.',
    bgGradient: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)',
    client: 'JW Corporation Pakistan',
    year: '2024',
    metrics: '38ms TTFT, 99.1% Grounded',
    fullDetails: 'Autonomous enterprise conversational cockpit grounded on multi-tenant vector records across 7 business verticals, FBR statutory regulatory orders (SROs), and real-time trade databases.',
    tags: ['RAG Pipeline', 'BGE-M3', 'Milvus Vector DB', 'Multi-Agent', 'FBR SROs'],
    features: [
      'Transparent multi-step agent reasoning trace logs',
      'FBR customs SRO and tariff schedule grounding',
      'Enterprise source document citations and confidence telemetry',
      'Multi-tenant data isolation with dual-LLM guardrails'
    ]
  },
  {
    id: 'zalmi-fit',
    title: 'Zalmi Fit Sports & Health',
    category: 'Sports & Biometrics',
    description: 'Comprehensive health, performance, and fitness tracking app for Peshawar Zalmi with 3D player biometrics.',
    bgGradient: 'linear-gradient(135deg, #ca8a04 0%, #eab308 100%)',
    client: 'Peshawar Zalmi (PSL)',
    year: '2024',
    metrics: '142.4 km/h release load, 15k Step Challenge',
    fullDetails: 'High-octane sports performance dashboard featuring an interactive 3D biometric player hologram with clickable injury/fatigue inspection zones, live training simulators, and Babar Azam fitness benchmarks.',
    tags: ['Three.js Hologram', 'Sports Biometrics', 'Peshawar Zalmi', 'Fan Health', 'Fitness Telemetry'],
    features: [
      'Interactive 3D holographic cricket athlete rig with joint stress mapping',
      'Rotator cuff and patellar tendon fatigue diagnostic inspection',
      'Live fan challenge simulator with step count, heart rate, and caloric burn',
      'PSL athlete benchmark leaderboard comparison'
    ]
  },
  {
    id: 'jw-executive',
    title: 'JW Executive Chairman Console',
    category: 'Corporate Governance',
    description: 'Secure real-time analytics and BI dashboard tailored for the Chairman and C-Suite of JW Corporation.',
    bgGradient: 'linear-gradient(135deg, #b45309 0%, #f59e0b 100%)',
    client: 'JW Corporation Pakistan',
    year: '2024',
    metrics: 'PKR 145.7B ($524M USD) Consolidated',
    fullDetails: 'Executive governance platform consolidating JW Corporation Pakistan’s 7 business verticals (Automobile, Real Estate, Technology, Textile, Logistics, Packaging, Retail) with biometric Chairman vault clearance.',
    tags: ['C-Level BI', '7 Verticals', 'Chairman Vault', 'Audit Trail', 'Corporate Governance'],
    features: [
      'Consolidated multi-vertical operating telemetry across all 7 subsidiaries',
      'Chairman Confidential View with simulated biometric passcode authorization',
      'Live EBITDA margin, revenue growth, and capital expenditure monitoring',
      'Immutable cryptographic executive governance audit stream'
    ]
  },
  {
    id: 'pak-trade-intelligence',
    title: 'Pakistan Trade Intelligence',
    category: 'Macroeconomics & Trade',
    description: 'Macroeconomic analysis tool tracking national exports, customs tariffs, SRO exemptions, and market trends.',
    bgGradient: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
    client: 'Pakistan Business Council / LCCI',
    year: '2024',
    metrics: '$30.8B Export Telemetry, FBR WeBOC',
    fullDetails: 'Macroeconomic trade intelligence system analyzing Pakistan Bureau of Statistics (PBS) data, commodity export flows, live HS-Code customs tariffs, and foreign exchange peg sensitivity.',
    tags: ['PBS Datasets', 'HS-Code Tariffs', 'FBR Customs', 'Macroeconomics', 'Exchange Rate Sim'],
    features: [
      'Top export sectors breakdown (Textiles, IT, Rice, Surgical, Sports)',
      'Live Pakistan Customs tariff and landed duty calculator',
      'SRO exemption tracking (SRO 656 EV concessions & clean energy)',
      'Dynamic USD/PKR interbank exchange rate valuation simulator'
    ]
  },
  {
    id: 'sme-graphql-gateway',
    title: 'SME GraphQL Gateway',
    category: 'API & Infrastructure',
    description: 'Robust GraphQL API layer serving trade data, logistics, and intelligence to Pakistani SMEs and LCCI members.',
    bgGradient: 'linear-gradient(135deg, #be185d 0%, #ec4899 100%)',
    client: 'LCCI & Chamber Network',
    year: '2024',
    metrics: '18ms Query Latency, Depth Limit: 6',
    fullDetails: 'Developer playground and high-performance GraphQL API gateway providing Pakistani SMEs with secured, rate-limited access to tariff schedules, market trends, and Chamber of Commerce quotas.',
    tags: ['GraphQL', 'Apollo Server', 'Rate Limiting', 'PostgreSQL RLS', 'Armor Security'],
    features: [
      'Interactive in-browser GraphQL query execution sandbox',
      'Real-time JSON response payload with microsecond latency metrics',
      'Strict query depth limitation (max depth 6) to eliminate DoS attacks',
      'Chamber membership quota authentication and rate limiting indicators'
    ]
  }
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
    title: 'AI & Enterprise Systems',
    description: 'Autonomous agents, enterprise RAG pipelines, and macro-intelligence architectures.',
    gradient: 'linear-gradient(135deg, hsl(150, 60%, 18%), hsl(170, 70%, 28%))',
    accentColor: '#10b981',
    deliverables: ['Enterprise RAG Systems', 'Multi-Agent Routing', 'GraphQL Gateways', 'BIM & 3D CAD Engines']
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: 'Megnitoo transformed our digital presence. The 3D experience and construction BIM CAD platform they built was nothing short of breathtaking.',
    author: 'Sarah Chen',
    role: 'CEO',
    company: 'TechVision Inc.',
    avatarBg: '#8b5cf6'
  },
  {
    quote: 'The iQRA AI engine and Chairman executive dashboard consolidated our 7 business verticals flawlessly with sub-second response times.',
    author: 'Tariq Mehmood',
    role: 'Managing Director',
    company: 'JW Corporation',
    avatarBg: '#06b6d4'
  },
  {
    quote: 'Zalmi Fit gave our athletes and fans a world-class biometric telemetry platform. Megnitoo delivers true craftsmanship.',
    author: 'Javed Afridi',
    role: 'Chairman',
    company: 'Peshawar Zalmi',
    avatarBg: '#f59e0b'
  },
];
