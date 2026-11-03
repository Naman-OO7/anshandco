const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '..', 'dist');
const mainIndexPath = path.join(distDir, 'index.html');

if (!fs.existsSync(mainIndexPath)) {
  console.log('[postbuild-seo] dist/index.html not found, skipping.');
  process.exit(0);
}

const mainHtml = fs.readFileSync(mainIndexPath, 'utf8');

// Extract compiled Vite stylesheet, modulepreload, and entry module script tags from dist/index.html
const assetTags = [];
const stylesheetRegex = /<link\s+[^>]*rel=["']stylesheet["'][^>]*>/gi;
const modulePreloadRegex = /<link\s+[^>]*rel=["']modulepreload["'][^>]*>/gi;
const scriptRegex = /<script\s+[^>]*type=["']module["'][^>]*src=["']\/assets\/[^"']+["'][^>]*><\/script>/gi;

const stylesheets = mainHtml.match(stylesheetRegex) || [];
const preloads = mainHtml.match(modulePreloadRegex) || [];
const scripts = mainHtml.match(scriptRegex) || [];

assetTags.push(...stylesheets, ...preloads, ...scripts);
const injectedAssets = assetTags.join('\n    ');

const crawlGraphMatch = mainHtml.match(/<nav id="seo-crawl-graph"[\s\S]*?<\/nav>/i);
const crawlGraphHtml = crawlGraphMatch ? crawlGraphMatch[0] : '';

const staticRoutes = [
  'what-we-are',
  'who-we-are',
  'what-we-provide',
  'who-trust-us',
  'services/ai-automation',
  'services/web-engineering',
  'services/brand-custodianship',
  'services/seo-growth',
  'digital-marketing-agency-dehradun',
  'web-development-agency-dehradun',
  'ai-automation-agency-dehradun',
  'watch/brand-showreel',
  'watch/studio-showcase-reel',
  'watch/ai-workflow-automation',
  'watch/our-reveal',
  'watch/liquid-chrome-3d',
  'watch/organic-seo-growth',
  'watch/viral-reels-strategy'
];

const standaloneStaticRoutes = [
  'about',
  'contact',
  'terms',
  'privacy',
  'news'
];

let updatedCount = 0;
for (const route of staticRoutes) {
  const routeFile = path.join(distDir, route, 'index.html');
  if (fs.existsSync(routeFile) && injectedAssets) {
    let html = fs.readFileSync(routeFile, 'utf8');
    if (crawlGraphHtml && !html.includes('id="seo-crawl-graph"')) {
      html = html.replace('</div>\n    <noscript>', `</div>\n    ${crawlGraphHtml}\n    <noscript>`);
    }
    if (html.includes('<script type="module" src="/src/main.tsx"></script>')) {
      html = html.replace(
        '<script type="module" src="/src/main.tsx"></script>',
        injectedAssets
      );
      fs.writeFileSync(routeFile, html, 'utf8');
      updatedCount++;
    }
  }
}

for (const route of standaloneStaticRoutes) {
  const routeFile = path.join(distDir, route, 'index.html');
  if (fs.existsSync(routeFile) && crawlGraphHtml) {
    let html = fs.readFileSync(routeFile, 'utf8');
    if (!html.includes('id="seo-crawl-graph"')) {
      if (!html.includes('.sr-only')) {
        html = html.replace('</style>', '  .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border-width: 0; }\n    </style>');
      }
      html = html.replace('</body>', `  ${crawlGraphHtml}\n  </body>`);
      fs.writeFileSync(routeFile, html, 'utf8');
    }
  }
}

console.log(`[postbuild-seo] Injected production Vite assets and persistent internal/external link graph into ${updatedCount} pre-rendered SEO route(s).`);
