// ==================== CURSOR ====================
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});

function animateCursor() {
  rx += (mx - rx) * 0.15;
  ry += (my - ry) * 0.15;
  cursorRing.style.left = rx + 'px';
  cursorRing.style.top = ry + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.addEventListener('mousedown', () => {
  cursor.style.width = '20px'; cursor.style.height = '20px';
});
document.addEventListener('mouseup', () => {
  cursor.style.width = '12px'; cursor.style.height = '12px';
});

// Hover effects
document.querySelectorAll('a,button,input,[data-group],.tab-btn,.poll-btn').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '24px'; cursor.style.height = '24px';
    cursorRing.style.width = '50px'; cursorRing.style.height = '50px';
    cursorRing.style.borderColor = 'rgba(0,255,157,0.6)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '12px'; cursor.style.height = '12px';
    cursorRing.style.width = '36px'; cursorRing.style.height = '36px';
    cursorRing.style.borderColor = 'rgba(0,255,157,0.4)';
  });
});

// ==================== PARTICLES ====================
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let scrollY = 0;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + 10;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = -(Math.random() * 0.8 + 0.3);
    this.life = 1;
    this.decay = Math.random() * 0.003 + 0.001;
    this.size = Math.random() * 3 + 1;
    this.color = Math.random() > 0.7 ? '#00ff9d' : `hsl(${Math.random()*30+100},100%,70%)`;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life -= this.decay;
    this.vx += (Math.random() - 0.5) * 0.02;
    if (this.life <= 0 || this.y < -10) this.reset();
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.life * 0.4;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 6;
    ctx.fill();
    ctx.restore();
  }
}

for (let i = 0; i < 80; i++) {
  const p = new Particle();
  p.y = Math.random() * canvas.height;
  particles.push(p);
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const scrollProgress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  const targetCount = Math.floor(80 + scrollProgress * 200);
  while (particles.length < targetCount) particles.push(new Particle());
  while (particles.length > targetCount + 20) particles.pop();
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ==================== PROGRESS BAR ====================
window.addEventListener('scroll', () => {
  const progress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  document.getElementById('progress-bar').style.width = (progress * 100) + '%';
});

// ==================== SCROLL REVEAL ====================
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('in-view');
  });
}, { threshold: 0.1 });
revealEls.forEach(el => revealObserver.observe(el));

// ==================== CARBON 101 ANIMATIONS ====================
(function initCarbon101() {
  const c101Observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;

      if (el.classList.contains('c101-def-line') ||
          el.classList.contains('c101-transition') ||
          el.classList.contains('c101-footnote') ||
          el.classList.contains('c101-bridge') ||
          el.classList.contains('c101-ton-orb')) {
        el.classList.add('in-view');
      }

      if (el.classList.contains('c101-equiv-item')) {
        const delay = parseInt(el.dataset.delay || 0);
        setTimeout(() => {
          el.classList.add('in-view');
          const counter = el.querySelector('[data-count]');
          if (counter) {
            const target = parseInt(counter.dataset.count);
            const duration = 1200;
            const start = performance.now();
            function tick(now) {
              const t = Math.min((now - start) / duration, 1);
              const ease = 1 - Math.pow(1 - t, 3);
              counter.textContent = Math.round(target * ease).toLocaleString();
              if (t < 1) requestAnimationFrame(tick);
              else counter.textContent = target.toLocaleString();
            }
            requestAnimationFrame(tick);
          }
        }, delay);
      }
    });
  }, { threshold: 0.25 });

  document.querySelectorAll(
    '.c101-def-line, .c101-transition, .c101-ton-orb, .c101-equiv-item, .c101-footnote, .c101-bridge'
  ).forEach(el => c101Observer.observe(el));
})();

// ==================== MONEY TABS ====================
const moneyData = {
  renewable: {
    cards: [
      { name: 'Wind Farms',     value: '$4.8B',  sub: 'Annual revenue from credit sales',      status: 'verified',   statusLabel: 'Verified', type: 'green',  bar: 85, barColor: 'var(--neon)'  },
      { name: 'Solar Projects', value: '$3.2B',  sub: 'Credits from avoided emissions',        status: 'verified',   statusLabel: 'Verified', type: 'green',  bar: 70, barColor: 'var(--neon)'  },
      { name: 'Hydropower',     value: '$1.9B',  sub: 'Additionality sometimes questioned',   status: 'questioned', statusLabel: 'Debated',   type: 'yellow', bar: 45, barColor: 'var(--amber)' },
      { name: 'Grid Efficiency',value: '$890M',  sub: 'Measurement methodology disputed',     status: 'questioned', statusLabel: 'Debated',   type: 'yellow', bar: 30, barColor: 'var(--amber)' }
    ],
    note: '"Renewable projects form the backbone of credible offsets — but additionality remains a challenge. Would the project have happened anyway?"'
  },
  forest: {
    cards: [
      { name: 'Amazon REDD+',        value: '$2.1B', sub: 'Avoided deforestation credits',    status: 'warning',    statusLabel: 'Overestimated', type: 'red',    bar: 20, barColor: 'var(--red)'   },
      { name: 'Congo Basin',         value: '$1.4B', sub: 'Forest preservation claims',       status: 'questioned', statusLabel: 'Under review',  type: 'yellow', bar: 40, barColor: 'var(--amber)' },
      { name: 'Boreal Reforestation',value: '$760M', sub: 'New planting, verifiable',         status: 'verified',   statusLabel: 'Verified',      type: 'green',  bar: 75, barColor: 'var(--neon)'  },
      { name: 'Mangrove Restoration',value: '$420M', sub: 'High co-benefit, credible',        status: 'verified',   statusLabel: 'Verified',      type: 'green',  bar: 80, barColor: 'var(--neon)'  }
    ],
    note: '"A 2023 Guardian investigation found that 90%+ of Verra-certified rainforest credits were "phantom credits" — representing no real carbon reduction."'
  },
  corporate: {
    cards: [
      { name: 'Shell PLC',    value: '120M tons',  sub: 'Credits purchased 2022–23',        status: 'questioned', statusLabel: 'Offsetting emissions', type: 'yellow', bar: 60, barColor: 'var(--amber)' },
      { name: 'Delta Airlines',value: '30M tons',  sub: 'Claimed carbon neutral 2020',      status: 'warning',    statusLabel: 'Greenwashing claims',  type: 'red',    bar: 25, barColor: 'var(--red)'   },
      { name: 'Microsoft',    value: '$1B fund',   sub: 'Carbon negative by 2030 target',   status: 'verified',   statusLabel: 'Verified',             type: 'green',  bar: 70, barColor: 'var(--neon)'  },
      { name: 'Apple',        value: '100% neutral',sub: 'Supply chain + offsets combined', status: 'verified',   statusLabel: 'Verified',             type: 'green',  bar: 68, barColor: 'var(--neon)'  }
    ],
    note: '"Corporate net-zero pledges are only as good as their methodology. Third-party verification is inconsistent across the industry."'
  },
  traders: {
    cards: [
      { name: 'ICE Futures',      value: '$127B', sub: 'EU ETS contract volume 2023',          status: 'verified',   statusLabel: 'Exchange traded',      type: 'green',  bar: 90, barColor: 'var(--neon)'  },
      { name: 'Voluntary OTC',    value: '$2B',   sub: 'Bilateral deals, less transparent',    status: 'questioned', statusLabel: 'Low oversight',        type: 'yellow', bar: 35, barColor: 'var(--amber)' },
      { name: 'Carbon Desks',     value: '40%',   sub: 'Bank profit margin on credit trades',  status: 'warning',    statusLabel: 'High spread',          type: 'red',    bar: 40, barColor: 'var(--red)'   },
      { name: 'Retail Offset Cos',value: '$500M', sub: 'Consumer-facing offset sales',         status: 'questioned', statusLabel: 'Quality varies widely', type: 'yellow', bar: 30, barColor: 'var(--amber)' }
    ],
    note: '"The voluntary carbon market grew 15x between 2020 and 2023. Traders profit regardless of whether the offsets are genuine."'
  }
};

function renderMoneyTab(tab) {
  const data = moneyData[tab];
  const grid = document.getElementById('money-grid');
  grid.innerHTML = '';
  data.cards.forEach(card => {
    const el = document.createElement('div');
    el.className = `data-card ${card.type}`;
    el.style.animation = 'fadeIn 0.4s ease forwards';
    el.innerHTML = `
      <div class="card-name">${card.name}</div>
      <div class="card-value ${card.type === 'green' ? 'pos' : card.type === 'yellow' ? 'warn' : 'neg'}">${card.value}</div>
      <div class="card-sub">${card.sub}</div>
      <div class="status-badge ${card.status === 'verified' ? 'verified' : card.status === 'questioned' ? 'questioned' : 'warning'}">
        ${card.statusLabel}
      </div>
      <div class="bar-horiz"><div class="bar-horiz-fill" style="width:0%;background:${card.barColor};" data-target="${card.bar}"></div></div>
    `;
    grid.appendChild(el);
    setTimeout(() => {
      el.querySelectorAll('.bar-horiz-fill').forEach(b => { b.style.width = b.dataset.target + '%'; });
    }, 100);
  });
  document.getElementById('tooltip-note').textContent = data.note;
}

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderMoneyTab(btn.dataset.tab);
  });
});
renderMoneyTab('renewable');

// ==================== INDIVIDUAL MODE ====================
const selections = { car: 2.4, energy: 2.1, flights: 0, diet: 2.0 };
const labels = { car: 'Petrol', energy: 'Coal Grid', flights: 'None', diet: 'Omnivore' };

document.querySelectorAll('.toggle-opt').forEach(btn => {
  btn.addEventListener('click', () => {
    const group = btn.dataset.group;
    document.querySelectorAll(`[data-group="${group}"]`).forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selections[group] = parseFloat(btn.dataset.val);
    labels[group] = btn.dataset.label;
    updateEmissions();
  });
});

function updateEmissions() {
  const total = Object.values(selections).reduce((a, b) => a + b, 0).toFixed(1);
  const numEl = document.getElementById('emission-number');
  numEl.textContent = total;
  const color = total < 3 ? 'var(--neon)' : total < 8 ? 'var(--amber)' : 'var(--red)';
  numEl.style.color = color;
  const barPct = Math.min((total / 20) * 100, 100);
  const bar = document.getElementById('emission-bar');
  bar.style.width = barPct + '%';
  bar.style.background = color;
  const bd = document.getElementById('breakdown');
  bd.innerHTML = Object.entries(selections).map(([k, v]) =>
    `<div style="display:flex;justify-content:space-between;font-family:'Space Mono',monospace;font-size:9px;margin-bottom:4px;">
      <span style="color:var(--text-dim)">${k.toUpperCase()}</span>
      <span style="color:var(--text)">${v}t</span>
    </div>`
  ).join('');
  const cost = (total * 15).toFixed(0);
  document.getElementById('offset-cost').textContent = '$' + cost;
  document.getElementById('honesty-note').classList.remove('visible');
}

function buyOffset() {
  document.getElementById('honesty-note').classList.add('visible');
  const numEl = document.getElementById('emission-number');
  numEl.style.textDecoration = 'line-through';
  numEl.style.color = 'var(--text-dim)';
  setTimeout(() => {
    numEl.style.textDecoration = 'none';
    numEl.style.color = 'var(--neon)';
  }, 2000);
}
updateEmissions();

// ==================== REALITY TOGGLE ====================
function toggleOffsets(el) {
  const reveal = document.getElementById('true-emission-reveal');
  if (el.checked) {
    reveal.classList.add('visible');
    document.getElementById('forest-absorbed').textContent = 'Unverified';
    document.getElementById('forest-absorbed').style.color = 'var(--amber)';
  } else {
    reveal.classList.remove('visible');
    document.getElementById('forest-absorbed').textContent = '−2.4 Gt';
    document.getElementById('forest-absorbed').style.color = 'var(--neon)';
  }
}

// ==================== POLL — SARCASTIC RESPONSES ====================
const pollResponses = {
  yes: [
    {
      icon: '', color: 'var(--neon)', borderColor: 'rgba(0,255,157,0.25)',
      headline: 'Bold of you.',
      lines: [
        "Global emissions hit a new record in 2024 — 37.4 Gt — the same year the carbon market crossed $1 trillion in traded value. Correlation? Maybe. Cause? Definitely not.",
        "In 2024, Shell quietly retired its 'carbon neutral' fuel programme after its own offsets were found to be largely fictional. But sure — the market is working great."
      ]
    },
    {
      icon: '', color: 'var(--neon)', borderColor: 'rgba(0,255,157,0.25)',
      headline: 'Optimism appreciated.',
      lines: [
        "The EU ETS has genuinely cut European power sector emissions by 65% since 2005. That part works. The other 97% of global emissions? Still rising.",
        "To be fair, a price signal *does* change behaviour — if it's high enough. At $15/ton, it's cheaper to keep polluting than to actually stop."
      ]
    }
  ],
  no: [
    {
      icon: '', color: 'var(--red)', borderColor: 'rgba(239,68,68,0.25)',
      headline: "You've been paying attention.",
      lines: [
        "2024 was the first full calendar year where global average temperature exceeded 1.5°C above pre-industrial levels — the threshold the Paris Agreement was built to avoid. The credits didn't notice.",
        "A 2024 Oxford study found the voluntary carbon market has a 'fundamental credibility crisis' — with over 80% of audited projects failing basic additionality tests. The auditors were paid by the projects they audited."
      ]
    },
    {
      icon: '', color: 'var(--red)', borderColor: 'rgba(239,68,68,0.25)',
      headline: 'Correct. Mostly.',
      lines: [
        "Delta Airlines claimed carbon neutrality in 2020 using offsets. In 2024, a Dutch court ruled it misleading advertising. The CO₂ they 'offset'? Still very much in the atmosphere.",
        "The voluntary carbon market *shrank* 14% in 2024 as corporate buyers paused purchases amid greenwashing lawsuits. When even the buyers stop believing, that tells you something."
      ]
    }
  ],
  depends: [
    {
      icon: '', color: 'var(--amber)', borderColor: 'rgba(245,158,11,0.25)',
      headline: 'Diplomatically correct. Dangerously comfortable.',
      lines: [
        "'It depends' is what every consultant says before billing $500/hour to explain why nothing needs to change urgently. The atmosphere doesn't do nuance — CO₂ molecules don't wait for methodology reviews.",
        "Compliance markets with hard caps and genuine enforcement (EU ETS, California) show real reductions. The voluntary market, where corporations self-select offsets with zero regulatory oversight? That's a different story."
      ]
    },
    {
      icon: '', color: 'var(--amber)', borderColor: 'rgba(245,158,11,0.25)',
      headline: 'The intellectually honest answer.',
      lines: [
        "Here's what 'it depends' actually means: depends on whether the cap is real, the monitoring is independent, the penalties are painful, and the offsets are verified by someone who doesn't get paid if they approve them.",
        "Right now, globally, fewer than 23% of emissions are covered by any carbon price at all. Of those, most are priced too low to change behaviour. So technically yes — the *concept* works. The *implementation* is doing its best impression of not working."
      ]
    }
  ]
};

let hasVoted = false;

function vote(choice, btn) {
  const variants = pollResponses[choice];
  const r = variants[Math.floor(Math.random() * variants.length)];
  document.querySelectorAll('.poll-btn').forEach(b => {
    b.classList.remove('voted');
    b.style.opacity = '0.45';
  });
  btn.classList.add('voted');
  btn.style.opacity = '1';
  const box = document.getElementById('poll-response');
  box.innerHTML = `
    <div style="
      background: rgba(255,255,255,0.03);
      border: 1px solid ${r.borderColor};
      border-radius: 14px;
      padding: 28px 32px;
      animation: pollReveal 0.5s cubic-bezier(0.16,1,0.3,1) forwards;
      opacity: 0;
      transform: translateY(16px);
    ">
      <div style="display:flex;align-items:center;gap:14px;margin-bottom:18px;">
        <div style="font-family:'Syne',sans-serif;font-size:20px;font-weight:700;color:${r.color};">${r.headline}</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:14px;">
        ${r.lines.map((line, i) => `
          <div style="display:flex;gap:14px;align-items:flex-start;">
            <div style="
              min-width:22px;height:22px;
              background: ${r.borderColor};
              border: 1px solid ${r.color};
              border-radius:50%;
              display:flex;align-items:center;justify-content:center;
              font-family:'Space Mono',monospace;
              font-size:9px;
              color:${r.color};
              margin-top:2px;
              flex-shrink:0;
            ">${i + 1}</div>
            <p style="font-size:14px;color:rgba(255,255,255,0.75);line-height:1.7;margin:0;">${line}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  box.style.display = 'block';
  requestAnimationFrame(() => {
    const card = box.querySelector('div');
    if (card) {
      card.style.animation = 'none';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
      card.style.transition = 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.16,1,0.3,1)';
    }
  });
}

const pollStyle = document.createElement('style');
pollStyle.textContent = `
  @keyframes pollReveal {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(pollStyle);

document.addEventListener('click', function (e) {
  const box = document.getElementById('poll-response');
  const btns = document.querySelector('.poll-btns');
  if (box && box.style.display !== 'none' && !box.contains(e.target) && !btns.contains(e.target)) {
    const card = box.querySelector('div');
    if (card) { card.style.opacity = '0'; card.style.transform = 'translateY(10px)'; }
    setTimeout(() => {
      box.style.display = 'none';
      document.querySelectorAll('.poll-btn').forEach(b => {
        b.classList.remove('voted');
        b.style.opacity = '1';
      });
    }, 300);
  }
});

// ==================== STAR BACKGROUND ====================
(function createStars() {
  const canvas2 = document.createElement('canvas');
  canvas2.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;';
  document.body.prepend(canvas2);
  const c = canvas2.getContext('2d');
  canvas2.width = window.innerWidth;
  canvas2.height = window.innerHeight;
  for (let i = 0; i < 200; i++) {
    c.beginPath();
    c.arc(Math.random() * canvas2.width, Math.random() * canvas2.height, Math.random() * 1.5, 0, Math.PI * 2);
    c.fillStyle = `rgba(255,255,255,${Math.random() * 0.4 + 0.05})`;
    c.fill();
  }
})();

// ==================== EARTH GLOW BACKDROP ====================
(function drawEarthGlow() {
  const canvas3 = document.createElement('canvas');
  canvas3.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:0;pointer-events:none;opacity:0.15;';
  canvas3.width = 800; canvas3.height = 800;
  document.body.prepend(canvas3);
  const c = canvas3.getContext('2d');
  const grad = c.createRadialGradient(400, 400, 50, 400, 400, 380);
  grad.addColorStop(0, '#003d20');
  grad.addColorStop(0.4, '#001a0d');
  grad.addColorStop(0.7, '#001a3d');
  grad.addColorStop(1, 'transparent');
  c.beginPath();
  c.arc(400, 400, 380, 0, Math.PI * 2);
  c.fillStyle = grad;
  c.fill();
  c.strokeStyle = 'rgba(0,255,157,0.3)';
  c.lineWidth = 0.5;
  for (let i = 0; i < 10; i++) {
    const y = 400 - 380 + i * 76;
    const halfW = Math.sqrt(380 * 380 - (y - 400) * (y - 400)) || 0;
    c.beginPath();
    c.ellipse(400, y, halfW, 20, 0, 0, Math.PI * 2);
    c.stroke();
  }
  for (let i = 0; i < 12; i++) {
    c.beginPath();
    c.moveTo(400, 20);
    c.bezierCurveTo(400 + 200 * Math.sin(i * 30 * Math.PI / 180), 200, 400 + 200 * Math.sin(i * 30 * Math.PI / 180), 600, 400, 780);
    c.stroke();
  }
})();

console.log('%cCarbon\u00b7Currency \u2014 made with purpose.', 'font-family:monospace;color:#00ff9d;font-size:14px;');


// =============================================================================
// DATA MODULE
// =============================================================================
// All chart data is loaded via fetch() from two JSON files:
//
//   cleaned_co2.json              — OWID / Global Carbon Project
//                                   6 countries, 1995–latest year
//                                   Fields: country, year, co2, co2_per_capita
//
//   carbon_pricing_cleaned.json   — World Bank Carbon Pricing Dashboard
//                                   131 instruments (ETS + carbon taxes)
//                                   Fields: instrument_name, type, status,
//                                           jurisdiction_covered, nan_4 (numeric price USD),
//                                           share_of_jurisdiction_emissions_covered, etc.
//
// Charts render only after both fetches resolve.
// =============================================================================

// COUNTRY_META is static — colours and canvas IDs do not come from JSON
const COUNTRY_META = {
  'China':          { color: '#ef4444', flag: 'CN', canvasId: 'ctr-china',   badgeId: 'badge-china'   },
  'India':          { color: '#f59e0b', flag: 'IN', canvasId: 'ctr-india',   badgeId: 'badge-india'   },
  'United States':  { color: '#38bdf8', flag: 'US', canvasId: 'ctr-usa',     badgeId: 'badge-usa'     },
  'Germany':        { color: '#00ff9d', flag: 'DE', canvasId: 'ctr-germany', badgeId: 'badge-germany' },
  'France':         { color: '#a78bfa', flag: 'FR', canvasId: 'ctr-france',  badgeId: 'badge-france'  },
  'United Kingdom': { color: '#34d399', flag: 'GB', canvasId: 'ctr-uk',      badgeId: 'badge-uk'      }
};

// Preferred display order for the Since-2005 cards
const CARD_ORDER = ['Germany', 'France', 'United Kingdom', 'United States', 'China', 'India'];

// ─── Fetch both JSON files in parallel ───────────────────────────────────────
Promise.all([
  fetch('../data/cleaned_co2.json').then(res => {
    if (!res.ok) throw new Error(`cleaned_co2.json: HTTP ${res.status}`);
    return res.json();
  }),
  fetch('../data/carbon_pricing_cleaned.json').then(res => {
    if (!res.ok) throw new Error(`carbon_pricing_cleaned.json: HTTP ${res.status}`);
    return res.json();
  })
])
  .then(([co2Raw, pricingRaw]) => {
    // Build the two data modules, then boot the app
    const DATA         = buildCO2Module(co2Raw);
    const pricingStats = buildPricingStats(pricingRaw);
    initApp(DATA, pricingStats);
  })
  .catch(err => {
    // Fetch will fail when opening index.html directly as a local file (file://).
    // Deploy to Vercel or run `npx serve .` locally.
    console.error('[Carbon\u00b7Currency] Data load failed:', err.message);
    console.warn('Tip: fetch() requires an HTTP server. Run `npx serve .` or deploy to Vercel.');
  });


// ─── CO2 data module — built from cleaned_co2.json ────────────────────────────
function buildCO2Module(raw) {

  const countries = Object.keys(COUNTRY_META);

  // Index: country → { year → row }
  const byCountry = {};
  countries.forEach(c => { byCountry[c] = {}; });
  raw.forEach(d => {
    if (byCountry[d.country]) byCountry[d.country][d.year] = d;
  });

  // Sorted unique year list derived from the data — no hardcoding
  const allYears   = [...new Set(raw.map(d => d.year))].sort((a, b) => a - b);
  const latestYear = Math.max(...allYears);
  const idx2005    = allYears.indexOf(2005);

  // ── PCT_SINCE_2005 computed from data, not hardcoded ─────────────────────
  // Each country: % change from its 2005 value to the latest year in the dataset.
  const PCT_SINCE_2005 = {};
  countries.forEach(c => {
    const v2005 = byCountry[c][2005]      && byCountry[c][2005].co2;
    const vLast = byCountry[c][latestYear] && byCountry[c][latestYear].co2;
    PCT_SINCE_2005[c] = (v2005 && vLast)
      ? +((vLast - v2005) / v2005 * 100).toFixed(2)
      : 0;
  });

  // ── Series helper ─────────────────────────────────────────────────────────
  // Returns an array aligned to allYears; null where a country has no data
  function series(country) {
    return allYears.map(y =>
      byCountry[country][y] ? +byCountry[country][y].co2.toFixed(1) : null
    );
  }

  // ── 2005 annotation plugin (Chart.js afterDraw) ───────────────────────────
  function annotation2005Plugin(labelText, dimPre) {
    return {
      id: 'marker2005_' + Math.random().toString(36).slice(2),
      afterDraw(chart) {
        const { ctx, chartArea, scales } = chart;
        if (!chartArea || !scales.x) return;
        const { top, bottom, left } = chartArea;
        const xPos = scales.x.getPixelForValue('2005');
        if (!xPos || isNaN(xPos)) return;

        if (dimPre) {
          ctx.save();
          ctx.fillStyle = 'rgba(5,10,14,0.55)';
          ctx.fillRect(left, top, xPos - left, bottom - top);
          ctx.restore();
        }

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(xPos, top);
        ctx.lineTo(xPos, bottom);
        ctx.strokeStyle = 'rgba(245,158,11,0.75)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 3]);
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.font = "600 9px 'Space Mono', monospace";
        ctx.fillStyle = '#f59e0b';
        ctx.textAlign = 'left';
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 6;
        ctx.fillText(labelText, xPos + 5, top + 14);
        ctx.restore();
      }
    };
  }

  // ── Country mini-chart ────────────────────────────────────────────────────
  function buildCountryChart(country, dimPre) {
    const meta   = COUNTRY_META[country];
    const cvs    = document.getElementById(meta.canvasId);
    if (!cvs) return;
    if (cvs._chartInst) cvs._chartInst.destroy();

    const col      = meta.color;
    const chartCtx = cvs.getContext('2d');
    const gradient = chartCtx.createLinearGradient(0, 0, 0, 160);
    gradient.addColorStop(0, col + '33');
    gradient.addColorStop(1, col + '00');

    cvs._chartInst = new Chart(chartCtx, {
      type: 'line',
      plugins: [annotation2005Plugin('2005', dimPre)],
      data: {
        labels: allYears.map(String),
        datasets: [{
          data: series(country),
          borderColor: col,
          backgroundColor: gradient,
          borderWidth: 1.8,
          fill: true,
          tension: 0.35,
          pointRadius: 0,
          pointHoverRadius: 3,
          segment: dimPre
            ? { borderColor: c2d => c2d.p0DataIndex < idx2005 ? 'rgba(255,255,255,0.15)' : col }
            : undefined
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false, animation: { duration: 600 },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(10,18,24,0.95)',
            borderColor: 'rgba(255,255,255,0.1)', borderWidth: 1,
            callbacks: { label: c => ` ${c.parsed.y.toFixed(0)} Mt CO\u2082` }
          }
        },
        scales: {
          x: {
            grid:  { color: 'rgba(255,255,255,0.03)' },
            ticks: { maxTicksLimit: 5, font: { size: 8 }, color: 'rgba(255,255,255,0.3)' },
            title: { display: true, text: 'Year', color: 'rgba(255,255,255,0.2)', font: { size: 8 } }
          },
          y: {
            grid:  { color: 'rgba(255,255,255,0.04)' },
            ticks: { font: { size: 8 }, color: 'rgba(255,255,255,0.3)', callback: v => v >= 1000 ? (v / 1000).toFixed(0) + 'k' : v },
            title: { display: true, text: 'Mt CO\u2082', color: 'rgba(255,255,255,0.2)', font: { size: 8 } }
          }
        }
      }
    });
  }

  // ── Main trajectories chart ───────────────────────────────────────────────
  function buildTrajectoriesChart(dimPre) {
    const cvs = document.getElementById('chart-trajectories-main');
    if (!cvs) return;
    if (cvs._chartInst) cvs._chartInst.destroy();

    const datasets = countries.map(c => {
      const meta = COUNTRY_META[c];
      return {
        label:        c === 'United Kingdom' ? 'UK' : c === 'United States' ? 'USA' : c,
        data:         series(c),
        borderColor:  meta.color,
        borderWidth:  2,
        fill:         false,
        tension:      0.3,
        pointRadius:  0,
        pointHoverRadius: 4,
        segment: dimPre ? {
          borderColor: c2d => c2d.p0DataIndex < idx2005 ? 'rgba(255,255,255,0.12)' : meta.color,
          borderWidth: c2d => c2d.p0DataIndex < idx2005 ? 1 : 2
        } : undefined
      };
    });

    cvs._chartInst = new Chart(cvs.getContext('2d'), {
      type: 'line',
      plugins: [annotation2005Plugin('EU ETS Introduced', false)],
      data: { labels: allYears.map(String), datasets },
      options: {
        responsive: true, maintainAspectRatio: false,
        animation: { duration: 700 },
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { position: 'top', labels: { boxWidth: 10, padding: 14, font: { size: 10 } } },
          tooltip: {
            backgroundColor: 'rgba(10,18,24,0.95)',
            borderColor: 'rgba(255,255,255,0.1)', borderWidth: 1,
            callbacks: { label: c => ` ${c.dataset.label}: ${c.parsed.y.toFixed(0)} Mt` }
          }
        },
        scales: {
          x: {
            grid:  { color: 'rgba(255,255,255,0.04)' },
            ticks: { maxTicksLimit: 8, color: 'rgba(255,255,255,0.4)' },
            title: { display: true, text: 'Year', color: 'rgba(255,255,255,0.25)', font: { size: 9 } }
          },
          y: {
            grid:  { color: 'rgba(255,255,255,0.04)' },
            ticks: { color: 'rgba(255,255,255,0.4)', callback: v => v >= 1000 ? (v / 1000).toFixed(0) + 'k' : v },
            title: { display: true, text: 'Mt CO\u2082', color: 'rgba(255,255,255,0.3)', font: { size: 9 } }
          }
        }
      }
    });
  }

  function renderAllCountryCharts(dimPre) {
    countries.forEach(c => buildCountryChart(c, dimPre));
  }

  // ── Since-2005 cards — all values computed from JSON data ─────────────────
  function buildSinceCards() {
    const grid = document.getElementById('since-cards-grid');
    if (!grid || grid.dataset.built) return;
    grid.dataset.built = '1';

    CARD_ORDER.forEach((country, idx) => {
      const pct    = PCT_SINCE_2005[country];
      const v2005  = byCountry[country][2005]      ? byCountry[country][2005].co2      : null;
      const vLast  = byCountry[country][latestYear] ? byCountry[country][latestYear].co2 : null;
      const flag   = COUNTRY_META[country] ? COUNTRY_META[country].flag : country.slice(0, 2).toUpperCase();
      const isInc  = pct > 0;
      const sign   = isInc ? '+' : '';
      // Scale the fill bar: India at ~167% maps to 100%, others proportionally
      const barPct = Math.min(Math.abs(pct) / 170 * 100, 100);
      // "2005 → latest" string computed from actual data values
      const absStr = (v2005 && vLast)
        ? `${v2005.toFixed(2)} \u2192 ${vLast.toFixed(3)} Mt`
        : '\u2014';

      const card = document.createElement('div');
      card.className = `since-card ${isInc ? 'increase' : 'decrease'}`;
      card.style.transitionDelay = (idx * 0.1) + 's';
      card.innerHTML = `
        <div class="since-card-bg"></div>
        <div class="since-flag">${flag}</div>
        <div class="since-country">${country}</div>
        <div class="since-pct" data-target="${pct}" data-sign="${sign}">0%</div>
        <div class="since-direction">${isInc ? '\u2191 Emissions increased' : '\u2193 Emissions decreased'}</div>
        <div class="since-bar-track">
          <div class="since-bar-fill" data-target="${barPct.toFixed(2)}"></div>
        </div>
        <div class="since-abs">2005 baseline \u2192 ${latestYear}: ${absStr}</div>
      `;
      grid.appendChild(card);
    });
  }

  // ── Animate counters once cards are in view ───────────────────────────────
  function animateSinceCards() {
    document.querySelectorAll('.since-pct[data-target]').forEach(el => {
      if (el.dataset.animated) return;
      el.dataset.animated = '1';
      const target   = parseFloat(el.dataset.target);
      const sign     = el.dataset.sign;
      const duration = 1600;
      const start    = performance.now();
      function step(now) {
        const t    = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        el.textContent = sign + Math.abs(target * ease).toFixed(1) + '%';
        if (t < 1) requestAnimationFrame(step);
        else el.textContent = sign + Math.abs(target).toFixed(2) + '%';
      }
      requestAnimationFrame(step);
    });
    document.querySelectorAll('.since-bar-fill[data-target]').forEach(el => {
      if (el.dataset.animated) return;
      el.dataset.animated = '1';
      requestAnimationFrame(() => { el.style.width = el.dataset.target + '%'; });
    });
  }

  return {
    raw, latestYear, allYears, countries, byCountry,
    PCT_SINCE_2005, idx2005,
    series, buildTrajectoriesChart,
    renderAllCountryCharts, buildSinceCards, animateSinceCards
  };
}


// ─── Carbon pricing module — built from carbon_pricing_cleaned.json ───────────
function buildPricingStats(raw) {

  // Only implemented instruments
  const implemented = raw.filter(r => r.status === 'Implemented');

  // Instruments with a valid numeric USD price (stored in nan_4 field)
  const withPrice = implemented.filter(r => typeof r.nan_4 === 'number' && r.nan_4 > 0);

  // Highest-priced implemented instrument
  const topPriced = withPrice.reduce(
    (best, r) => (r.nan_4 > (best ? best.nan_4 : 0) ? r : best),
    null
  );

  // EU ETS specifically (used for the EU price stat row)
  const euETS = withPrice.find(r =>
    r.jurisdiction_covered === 'EU27+' || r.instrument_name === 'EU ETS'
  );

  // Parse "X% of global emissions" from the share text field
  function parseGlobalShare(text) {
    if (!text) return 0;
    const m = text.match(/([\d.]+)%\s+of\s+global/i);
    return m ? parseFloat(m[1]) : 0;
  }

  // Sum global coverage — deduplicate by jurisdiction to avoid double-counting
  // sub-national instruments that overlap with a national one
  const seen = new Set();
  let totalGlobalPct = 0;
  implemented.forEach(r => {
    if (!seen.has(r.jurisdiction_covered)) {
      seen.add(r.jurisdiction_covered);
      totalGlobalPct += parseGlobalShare(r.share_of_jurisdiction_emissions_covered);
    }
  });
  totalGlobalPct = Math.min(totalGlobalPct, 100); // cap at 100

  // Count instruments at or above the IPCC $130/t threshold
  const ipccMet = withPrice.filter(r => r.nan_4 >= 130).length;

  return {
    implemented,       // all implemented instruments
    withPrice,         // subset with numeric USD price
    topPriced,         // highest-priced instrument
    euETS,             // EU ETS row
    totalGlobalPct,    // ~% of global emissions covered
    ipccMet            // number meeting IPCC $130/t threshold
  };
}


// ─── App init — runs after both fetches resolve ───────────────────────────────
function initApp(DATA, pricingStats) {

  // Update all "latest year" text placeholders
  document.querySelectorAll('.latest-yr').forEach(el => el.textContent = DATA.latestYear);

  // Build since-2005 country cards from computed data
  DATA.buildSinceCards();

  // Populate Section 06 pricing stat rows from carbon_pricing_cleaned.json
  populatePricingStats(pricingStats);

  // ── IntersectionObserver: Sections 05 + 06 ──────────────────────────────
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;

      // Section 05: build trajectory chart on first scroll-into-view
      const trajCanvas = document.getElementById('chart-trajectories-main');
      if (trajCanvas && !trajCanvas._chartInst) {
        DATA.buildTrajectoriesChart(false);
      }

      DATA.animateSinceCards();
      document.querySelectorAll('.signal-fact').forEach(f => f.classList.add('in-view'));
    });
  }, { threshold: 0.1 });

  ['since-2005', 'market-signal'].forEach(id => {
    const el = document.getElementById(id);
    if (el) sectionObserver.observe(el);
  });

  // ── Expose toggles globally so inline onclick= attributes work ────────────

  // Compare mode: dims pre-2005 on all country mini-charts
  window.toggleCompareMode = function (on) {
    document.querySelectorAll('.compare-pct-badge').forEach(b => b.classList.toggle('visible', on));
    DATA.renderAllCountryCharts(on);
  };

  // Section impact toggle: dims pre-2005 on main trajectory chart
  window.toggleSectionImpact = function (on) {
    DATA.buildTrajectoriesChart(on);
  };
}


// ─── Populate Section 06 stat rows from carbon pricing data ──────────────────
// Finds the four stat rows inside .signal-conclusion by their label text and
// updates only the right-hand value span. Layout and styling are untouched.
function populatePricingStats(stats) {

  // Pre-compute display strings
  const euPrice       = stats.euETS
    ? `\u20ac${Math.round(stats.euETS.nan_4)}/t`   // e.g. "€61/t"
    : '\u2014';

  const globalCov     = `~${Math.round(stats.totalGlobalPct)}%`;
  const ipccDisplay   = stats.ipccMet === 0 ? '0%' : `${stats.ipccMet}`;

  // Map a substring of the label text → the value to inject
  const updates = [
    { match: 'EU CARBON PRICE',          value: euPrice     },
    { match: 'GLOBAL EMISSIONS COVERED', value: globalCov   },
    { match: 'SHARE OF JURISDICTIONS',   value: ipccDisplay }
    // 'PRICE NEEDED' row is intentionally left as-is (IPCC projection, not in dataset)
  ];

  // Target the stat rows — they are flex rows with justify-content:space-between
  const rows = document.querySelectorAll('.signal-conclusion [style*="justify-content:space-between"]');
  rows.forEach(row => {
    const labelEl = row.querySelector('span:first-child');
    const valueEl = row.querySelector('span:last-child');
    if (!labelEl || !valueEl) return;

    const labelText = labelEl.textContent.trim().toUpperCase();
    updates.forEach(({ match, value }) => {
      if (labelText.includes(match)) valueEl.textContent = value;
    });
  });
}


// ==================== COMPARE MODE TOGGLE ====================
// Stub — overwritten by initApp() after data loads.
// Prevents "not defined" errors if the toggle is clicked before fetch completes.
if (typeof window.toggleCompareMode === 'undefined') {
  window.toggleCompareMode = function () {};
}

// ==================== SECTION IMPACT TOGGLE ====================
if (typeof window.toggleSectionImpact === 'undefined') {
  window.toggleSectionImpact = function () {};
}
