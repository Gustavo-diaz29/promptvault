// Prompt data types and mock data

export interface Prompt {
  id: string;
  title: string;
  description: string;
  category: PromptCategory;
  price: number;
  isFree: boolean;
  isPremium: boolean;
  rating: number;
  reviewCount: number;
  downloads: number;
  author: Author;
  tags: string[];
  previewText: string;
  fullPrompt?: string;
  aiModel: AIModel;
  createdAt: string;
  featured: boolean;
  imageUrl?: string;
}

export interface Author {
  id: string;
  name: string;
  avatar: string;
  verified: boolean;
}

export type PromptCategory = 
  | 'copywriting'
  | 'image-generation'  
  | 'coding'
  | 'marketing'
  | 'business'
  | 'creative-writing'
  | 'education'
  | 'productivity';

export type AIModel = 
  | 'chatgpt'
  | 'midjourney'
  | 'stable-diffusion'
  | 'claude'
  | 'dalle'
  | 'gemini';

export const CATEGORY_INFO: Record<PromptCategory, { label: string; emoji: string; color: string }> = {
  'copywriting': { label: 'Copywriting', emoji: '✍️', color: '#7c3aed' },
  'image-generation': { label: 'Image Generation', emoji: '🎨', color: '#06b6d4' },
  'coding': { label: 'Coding', emoji: '💻', color: '#10b981' },
  'marketing': { label: 'Marketing', emoji: '📈', color: '#f59e0b' },
  'business': { label: 'Business', emoji: '💼', color: '#ef4444' },
  'creative-writing': { label: 'Creative Writing', emoji: '📝', color: '#ec4899' },
  'education': { label: 'Education', emoji: '🎓', color: '#8b5cf6' },
  'productivity': { label: 'Productivity', emoji: '⚡', color: '#14b8a6' },
};

export const AI_MODEL_INFO: Record<AIModel, { label: string; color: string }> = {
  'chatgpt': { label: 'ChatGPT', color: '#10a37f' },
  'midjourney': { label: 'Midjourney', color: '#5865f2' },
  'stable-diffusion': { label: 'Stable Diffusion', color: '#a855f7' },
  'claude': { label: 'Claude', color: '#d97706' },
  'dalle': { label: 'DALL·E', color: '#ef4444' },
  'gemini': { label: 'Gemini', color: '#4285f4' },
};

const generateAvatar = (name: string) => 
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=7c3aed&color=fff&size=40&bold=true`;

export const MOCK_PROMPTS: Prompt[] = [
  {
    id: 'p1',
    title: 'Multi-Perspective Persona Engine',
    description: 'Forces ChatGPT to analyze any problem from 5 different expert perspectives simultaneously (e.g., Steve Jobs, Warren Buffett, a hacker, a skeptic, and a therapist) before synthesizing a final, bulletproof solution.',
    category: 'business',
    price: 9.99,
    isFree: false,
    isPremium: true,
    rating: 4.9,
    reviewCount: 342,
    downloads: 5420,
    author: { id: 'a1', name: 'Sarah Chen', avatar: generateAvatar('Sarah Chen'), verified: true },
    tags: ['strategy', 'analysis', 'personas', 'problem-solving'],
    previewText: 'Act as a "Master Synthesizer" AI. I will provide you with a [PROBLEM]. You must first select 5 highly distinct, world-class expert personas relevant...',
    fullPrompt: `Act as a "Master Synthesizer" AI. I will provide you with a [PROBLEM].
You must follow these steps exactly:
1. Select 5 highly distinct, world-class expert personas relevant to solving [PROBLEM] (e.g., if it's a tech startup issue, select Elon Musk, a behavioral psychologist, a cynical auditor, a Gen-Z trendsetter, and Sun Tzu).
2. For each persona, write a 2-paragraph analysis of [PROBLEM] from their unique worldview, biases, and expertise.
3. Facilitate a "Virtual Debate" where the 5 personas critique each other's approaches. (Output this as a dialogue script).
4. As the Master Synthesizer, review the debate and extract the most robust, cross-disciplinary solution.
5. Present the final solution as an actionable, step-by-step 30-60-90 day plan.

[PROBLEM] = {Insert your complex problem, business idea, or decision here}`,
    aiModel: 'chatgpt',
    createdAt: '2026-02-15',
    featured: true,
  },
  {
    id: 'p2',
    title: 'Photorealistic Cinematic Masterpiece',
    description: 'The ultimate Midjourney v6 prompt structure for photorealistic, cinematic photography. Controls camera angle, lens mm, lighting setup, film stock, and color grading perfectly.',
    category: 'image-generation',
    price: 4.99,
    isFree: false,
    isPremium: false,
    rating: 4.8,
    reviewCount: 856,
    downloads: 12300,
    author: { id: 'a2', name: 'Alex Rivera', avatar: generateAvatar('Alex Rivera'), verified: true },
    tags: ['midjourney-v6', 'cinematic', 'photography', '8k'],
    previewText: 'Medium shot, capturing [SUBJECT] in [ENVIRONMENT]. Camera: Arri Alexa 65, 50mm lens at f/1.8. Lighting: High-contrast chiaroscuro...',
    fullPrompt: `Medium-wide shot, capturing [SUBJECT/ACTION] in [ENVIRONMENT]. 
Shot on Arri Alexa 65, Panavision Super 70 lens, 35mm at f/1.8. 
Lighting: High-contrast chiaroscuro, cinematic rim lighting from [COLOR 1] neon sign, soft key light from [COLOR 2] source. 
Atmosphere: Volumetric fog, dust motes, anamorphic lens flares. 
Color grading: Teal and orange Hollywood blockbuster grade, Kodak Vision3 500T 5219 film stock look, subtle film grain. 
Vibe: Moody, intense, cyberpunk-noir.
--ar 16:9 --style raw --v 6.0 --stylize 250`,
    aiModel: 'midjourney',
    createdAt: '2026-01-28',
    featured: true,
  },
  {
    id: 'p3',
    title: 'Senior Developer Code Reviewer',
    description: 'Turns Claude 3.5 Sonnet into a ruthless but constructive Senior Staff Engineer. It will review your code for security, performance (Big O), SOLID principles, and accessibility.',
    category: 'coding',
    price: 0,
    isFree: true,
    isPremium: false,
    rating: 4.7,
    reviewCount: 1204,
    downloads: 23400,
    author: { id: 'a3', name: 'Dev Master', avatar: generateAvatar('Dev Master'), verified: true },
    tags: ['code-review', 'refactoring', 'clean-code', 'senior-dev'],
    previewText: 'Act as a Senior Staff Engineer with 15 years of experience at a FAANG company. Review the following [LANGUAGE] code with extreme rigor...',
    fullPrompt: `Act as a Senior Staff Engineer with 15 years of experience at a FAANG company. 
Review the following [LANGUAGE] code with extreme rigor. 
Structure your response as follows:
1. 🐛 **Bugs & Edge Cases**: Identify logical errors or unhandled edge cases.
2. 🔒 **Security**: Point out vulnerabilities (XSS, SQLi, injection, etc).
3. ⚡ **Performance**: Analyze Time & Space complexity (Big-O). Suggest optimizations.
4. 🏗️ **Architecture & Clean Code**: Critique based on SOLID principles, DRY, and naming conventions.
5. ✨ **Refactored Code**: Provide the master-level rewrite of the code with detailed inline comments explaining the *why* behind your changes.

Here is the code:
\`\`\`[LANGUAGE]
{Paste your code here}
\`\`\``,
    aiModel: 'claude',
    createdAt: '2026-03-01',
    featured: true,
  },
  {
    id: 'p4',
    title: 'The Neuromarketing Sales Letter',
    description: 'Generates a high-converting sales letter using 7 psychological triggers (FOMO, reciprocity, authority, etc.) mapped to a classic PAS (Problem-Agitate-Solution) framework.',
    category: 'copywriting',
    price: 12.49,
    isFree: false,
    isPremium: true,
    rating: 4.9,
    reviewCount: 678,
    downloads: 8900,
    author: { id: 'a4', name: 'Marketing Pro', avatar: generateAvatar('Marketing Pro'), verified: true },
    tags: ['sales', 'conversion', 'psychology', 'copywriting'],
    previewText: 'You are a world-class direct response copywriter trained by Gary Halbert and Dan Kennedy. Write a long-form sales letter for [PRODUCT] targeting [AUDIENCE]...',
    fullPrompt: `You are a world-class direct response copywriter trained by Gary Halbert and Dan Kennedy. 
Write a long-form sales page for [PRODUCT] targeting [DEFAULT_AUDIENCE].

You must strictly follow this psychological framework:
1. **The Hook (Curiosity + Benefit)**: A headline that makes them stop scrolling.
2. **Problem (Pain Context)**: Describe their current terrible situation vividly so they feel understood.
3. **Agitation (Twisting the Knife)**: Expand on how this problem is destroying their future/time/money.
4. **The Epiphany (New Mechanism)**: Introduce our unique approach that makes it not their fault.
5. **Solution (The Product)**: Introduce [PRODUCT].
6. **Authority & Proof**: Why they should trust us (Inject logic).
7. **The Offer & Value Stack**: Make the price feel like a steal.
8. **Risk Reversal**: Ironclad guarantee.
9. **Urgency/Scarcity**: A real reason to buy right now.
10. **Call to Action**: Direct, clear, commanding.

Product Name: {Insert Here}
Target Audience: {Insert Here}
Main Benefit: {Insert Here}`,
    aiModel: 'chatgpt',
    createdAt: '2026-02-20',
    featured: false,
  },
  {
    id: 'p5',
    title: 'Stable Diffusion XL Master Concept Art',
    description: 'A deeply technical SDXL prompt format utilizing specific weightings, negative prompts, and lighting keywords to generate Triple-A video game concept art.',
    category: 'image-generation',
    price: 2.99,
    isFree: false,
    isPremium: false,
    rating: 4.8,
    reviewCount: 445,
    downloads: 7800,
    author: { id: 'a5', name: 'Artisan AI', avatar: generateAvatar('Artisan AI'), verified: true },
    tags: ['sdxl', 'concept-art', 'gaming', 'characters'],
    previewText: 'masterpiece, best quality, ultra-detailed, (concept art:1.2), character design of [CHARACTER], [CLOTHING], [WEAPON/PROP]...',
    fullPrompt: `**Positive Prompt:**
masterpiece, best quality, ultra-detailed, highly detailed background, (concept art:1.2), character design sheet of [CHARACTER_DESCRIPTION], wearing [CLOTHING/ARMOR], holding [WEAPON/PROP].
Lighting: (rim lighting:1.1), (volumetric lighting:1.0), dramatic shadows, key light source from above.
Style: Greg Rutkowski, ArtStation trending, digital painting, distinct brushstrokes, fantasy RPG aesthetic, vibrant accents against dark muted tones.

**Negative Prompt:**
(worst quality, low quality:1.4), (monochrome:1.1), signature, watermark, username, ugly, bad anatomy, bad proportion, missing limbs, fused fingers, extra digits, simple background, flat colors, casual clothing.

**Parameters (Guidance):**
Steps: 30-40, Sampler: DPM++ 2M Karras, CFG scale: 7`.trim(),
    aiModel: 'stable-diffusion',
    createdAt: '2026-03-05',
    featured: true,
  },
  {
    id: 'p6',
    title: 'Full-Stack React App Architect',
    description: 'Instructs the AI to act as a Software Architect and generate an entire React/Node project structure, including folder tree, package.json dependencies, and core boilerplate files in one pass.',
    category: 'coding',
    price: 7.99,
    isFree: false,
    isPremium: true,
    rating: 4.9,
    reviewCount: 234,
    downloads: 3200,
    author: { id: 'a3', name: 'Dev Master', avatar: generateAvatar('Dev Master'), verified: true },
    tags: ['react', 'architecture', 'boilerplate', 'fullstack'],
    previewText: 'Act as an elite Enterprise Software Architect. I want to build a [APP_TYPE]. Give me the complete folder structure, the package.json, and...',
    fullPrompt: `Act as an elite Enterprise Software Architect. I want to build a [APP_TYPE] using [TECH_STACK] (e.g., Next.js, Tailwind, Prisma, PostgreSQL).

Please provide the exact blueprint to kickstart this project:
1. **Folder Structure**: Output a visual ASCII tree of the ideal, scalable folder structure.
2. **Dependencies**: Write out the exact \`npm install\` or \`yarn add\` commands for all core libraries, distinguishing between regular and dev dependencies.
3. **Core Configurations**: Generate the raw code for the 3 most critical configuration files (e.g., \`tsconfig.json\`, \`tailwind.config.js\`, \`database.ts\`).
4. **App Entry Point**: Generate the boilerplate for the main App/Layout file establishing providers and routing.
5. **Data Model**: Provide the initial Prisma schema or SQL table definitions for the core feature.

App Type: {Describe what the app does}
Tech Stack: {List your preferred tools}`,
    aiModel: 'claude',
    createdAt: '2026-02-10',
    featured: false,
  }
];

export const PRICING_PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    period: '',
    description: 'Access free prompts and explore the marketplace',
    features: [
      'Browse all prompts',
      'Download free prompts',
      'Basic search & filters',
      'Community access',
    ],
    limitations: [
      'Limited to free prompts',
      'Contains ads',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 9.99,
    period: '/month',
    description: 'Unlock premium prompts and advanced features',
    features: [
      'All free features',
      '50 premium downloads/month',
      'Priority support',
      'Early access to new prompts',
      'Ad-free experience',
      'Prompt customization tools',
    ],
    limitations: [],
    cta: 'Start Pro Trial',
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 29.99,
    period: '/month',
    description: 'For teams and businesses needing unlimited access',
    features: [
      'All Pro features',
      'Unlimited downloads',
      'Team collaboration',
      'API access',
      'Custom prompt creation',
      'Dedicated account manager',
      'White-label options',
    ],
    limitations: [],
    cta: 'Contact Sales',
    popular: false,
  },
];
