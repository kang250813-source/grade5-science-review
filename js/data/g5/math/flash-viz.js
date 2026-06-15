/* 数学闪卡 · SVG 图形辅助说明 */

(function () {
  'use strict';

  const C = '#ea580c';
  const C2 = '#c2410c';
  const GRAY = '#64748b';
  const FILL = 'rgba(234,88,12,0.15)';

  function svg(w, h, body) {
    return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">${body}</svg>`;
  }

  const viz = {
    circle(d) {
      const r = d.r || 5;
      const cx = 90, cy = 80;
      return svg(180, 150,
        `<circle cx="${cx}" cy="${cy}" r="${r * 8}" fill="${FILL}" stroke="${C}" stroke-width="2"/>
         <line x1="${cx}" y1="${cy}" x2="${cx + r * 8}" y2="${cy}" stroke="${C2}" stroke-width="2" marker-end="url(#arr)"/>
         <text x="${cx + r * 4}" y="${cy - 6}" font-size="11" fill="${C2}" text-anchor="middle">r=${r}</text>
         <line x1="${cx - r * 8}" y1="${cy + r * 8 + 12}" x2="${cx + r * 8}" y2="${cy + r * 8 + 12}" stroke="${GRAY}" stroke-width="1.5"/>
         <text x="${cx}" y="${cy + r * 8 + 26}" font-size="11" fill="${GRAY}" text-anchor="middle">d=2r=${2 * r}</text>
         <text x="${cx}" y="14" font-size="10" fill="${GRAY}" text-anchor="middle">C=πd=2πr  ·  S=πr²</text>
         <defs><marker id="arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="${C2}"/></marker></defs>`
      );
    },

    'circle-area'(d) {
      const r = d.r || 5;
      const cx = 85, cy = 78;
      const rad = r * 7;
      return svg(180, 145,
        `<circle cx="${cx}" cy="${cy}" r="${rad}" fill="${FILL}" stroke="${C}" stroke-width="2"/>
         <line x1="${cx}" y1="${cy}" x2="${cx + rad}" y2="${cy}" stroke="${C2}" stroke-width="1.5"/>
         <text x="${cx + rad / 2}" y="${cy - 4}" font-size="10" fill="${C2}">r</text>
         <text x="90" y="130" font-size="11" fill="${C2}" text-anchor="middle">S = π × ${r}² = ${(3.14 * r * r).toFixed(1)}</text>`
      );
    },

    'square-in-circle'(d) {
      const r = d.r || 5;
      const cx = 90, cy = 85;
      const rad = r * 7;
      const side = rad * Math.SQRT2;
      const half = side / 2;
      return svg(180, 150,
        `<circle cx="${cx}" cy="${cy}" r="${rad}" fill="none" stroke="${C}" stroke-width="2"/>
         <rect x="${cx - half}" y="${cy - half}" width="${side}" height="${side}" fill="${FILL}" stroke="${C2}" stroke-width="1.5"/>
         <text x="90" y="138" font-size="10" fill="${GRAY}" text-anchor="middle">正方形对角线 = 圆的直径 d=2r</text>`
      );
    },

    'fraction-bar'(d) {
      const num = d.num || 3;
      const den = d.den || 8;
      const w = 160, h = 28, x = 10, y = 50;
      const seg = w / den;
      let rects = '';
      for (let i = 0; i < den; i++) {
        rects += `<rect x="${x + i * seg}" y="${y}" width="${seg - 1}" height="${h}" fill="${i < num ? C : '#e2e8f0'}" stroke="#fff" stroke-width="1"/>`;
      }
      return svg(180, 100,
        `${rects}
         <text x="90" y="30" font-size="13" fill="${C2}" text-anchor="middle">${num}/${den}</text>
         <text x="90" y="95" font-size="10" fill="${GRAY}" text-anchor="middle">涂色 ${num} 份，每份是 1/${den}</text>`
      );
    },

    'factor-tree'(d) {
      const n = d.n || 45;
      if (n === 45) {
        return svg(180, 120,
          `<text x="90" y="18" font-size="12" fill="${C2}" text-anchor="middle">45</text>
           <line x1="90" y1="22" x2="55" y2="48" stroke="${GRAY}"/><line x1="90" y1="22" x2="125" y2="48" stroke="${GRAY}"/>
           <text x="55" y="62" font-size="11" fill="${C}" text-anchor="middle">3</text>
           <text x="125" y="62" font-size="11" fill="${C}" text-anchor="middle">15</text>
           <line x1="125" y1="66" x2="105" y2="88" stroke="${GRAY}"/><line x1="125" y1="66" x2="145" y2="88" stroke="${GRAY}"/>
           <text x="105" y="102" font-size="11" fill="${C}" text-anchor="middle">3</text>
           <text x="145" y="102" font-size="11" fill="${C}" text-anchor="middle">5</text>
           <text x="90" y="118" font-size="10" fill="${GRAY}" text-anchor="middle">45 = 3 × 3 × 5</text>`
        );
      }
      if (n === 24) {
        return svg(180, 120,
          `<text x="90" y="18" font-size="12" fill="${C2}" text-anchor="middle">24</text>
           <line x1="90" y1="22" x2="55" y2="48" stroke="${GRAY}"/><line x1="90" y1="22" x2="125" y2="48" stroke="${GRAY}"/>
           <text x="55" y="62" font-size="11" fill="${C}" text-anchor="middle">2</text>
           <text x="125" y="62" font-size="11" fill="${C}" text-anchor="middle">12</text>
           <line x1="125" y1="66" x2="105" y2="88" stroke="${GRAY}"/><line x1="125" y1="66" x2="145" y2="88" stroke="${GRAY}"/>
           <text x="105" y="102" font-size="11" fill="${C}" text-anchor="middle">2</text>
           <text x="145" y="102" font-size="11" fill="${C}" text-anchor="middle">6</text>
           <text x="90" y="118" font-size="10" fill="${GRAY}" text-anchor="middle">24 = 2 × 2 × 2 × 3</text>`
        );
      }
      return viz['factor-tree']({ n: 45 });
    },

    equation(d) {
      const left = d.left || 'x + 50';
      const right = d.right || '150';
      const ans = d.answer || '100';
      return svg(200, 110,
        `<rect x="20" y="20" width="160" height="36" rx="6" fill="#fff7ed" stroke="${C}" stroke-width="1.5"/>
         <text x="100" y="44" font-size="14" fill="${C2}" text-anchor="middle" font-family="serif">${left} = ${right}</text>
         <text x="100" y="72" font-size="11" fill="${GRAY}" text-anchor="middle">↓ 两边同减 50</text>
         <text x="100" y="98" font-size="13" fill="${C}" text-anchor="middle" font-weight="bold">x = ${ans}</text>`
      );
    },

    'line-chart'(d) {
      const pts = d.points || [3, 5, 4, 8, 6];
      const labels = d.labels || pts.map((_, i) => (i + 1) + '日');
      const max = Math.max(...pts, 1);
      const ox = 25, oy = 95, pw = 130, ph = 70;
      const coords = pts.map((v, i) => {
        const x = ox + (i / (pts.length - 1 || 1)) * pw;
        const y = oy - (v / max) * ph;
        return `${x},${y}`;
      }).join(' ');
      let dots = pts.map((v, i) => {
        const x = ox + (i / (pts.length - 1 || 1)) * pw;
        const y = oy - (v / max) * ph;
        return `<circle cx="${x}" cy="${y}" r="3" fill="${C}"/>`;
      }).join('');
      let lbls = labels.map((lb, i) => {
        const x = ox + (i / (labels.length - 1 || 1)) * pw;
        return `<text x="${x}" y="108" font-size="8" fill="${GRAY}" text-anchor="middle">${lb}</text>`;
      }).join('');
      return svg(180, 115,
        `<line x1="${ox}" y1="${oy}" x2="${ox + pw}" y2="${oy}" stroke="${GRAY}" stroke-width="1"/>
         <line x1="${ox}" y1="${oy - ph}" x2="${ox}" y2="${oy}" stroke="${GRAY}" stroke-width="1"/>
         <polyline points="${coords}" fill="none" stroke="${C}" stroke-width="2"/>
         ${dots}${lbls}
         <text x="90" y="12" font-size="10" fill="${C2}" text-anchor="middle">折线看变化趋势</text>`
      );
    },

    'gcd-lcm'(d) {
      const a = d.a || 12;
      const b = d.b || 18;
      return svg(180, 100,
        `<text x="90" y="22" font-size="11" fill="${C2}" text-anchor="middle">${a} 和 ${b}</text>
         <rect x="15" y="32" width="70" height="28" rx="4" fill="#fff7ed" stroke="${C}" stroke-width="1"/>
         <text x="50" y="50" font-size="10" fill="${C}" text-anchor="middle">GCD=6</text>
         <rect x="95" y="32" width="70" height="28" rx="4" fill="#fff7ed" stroke="${C}" stroke-width="1"/>
         <text x="130" y="50" font-size="10" fill="${C}" text-anchor="middle">LCM=36</text>
         <text x="90" y="78" font-size="9" fill="${GRAY}" text-anchor="middle">12=2²×3  18=2×3²</text>
         <text x="90" y="92" font-size="9" fill="${GRAY}" text-anchor="middle">最大公因数取低次，最小公倍数取高次</text>`
      );
    },

    'factor-pairs'(d) {
      const n = d.n || 12;
      const pairs = [[1, 12], [2, 6], [3, 4]];
      let rows = pairs.map((p, i) =>
        `<text x="90" y="${38 + i * 22}" font-size="11" fill="${C2}" text-anchor="middle">${n} = ${p[0]} × ${p[1]}</text>`
      ).join('');
      return svg(180, 105,
        `<text x="90" y="18" font-size="10" fill="${GRAY}" text-anchor="middle">${n} 的因数对（成对找）</text>${rows}`
      );
    },

    'number-line'(d) {
      const num = d.num || 3;
      const den = d.den || 4;
      const x = 30 + (num / den) * 120;
      return svg(180, 60,
        `<line x1="20" y1="30" x2="160" y2="30" stroke="${GRAY}" stroke-width="2"/>
         <line x1="20" y1="25" x2="20" y2="35" stroke="${GRAY}"/><text x="20" y="48" font-size="9" fill="${GRAY}" text-anchor="middle">0</text>
         <line x1="160" y1="25" x2="160" y2="35" stroke="${GRAY}"/><text x="160" y="48" font-size="9" fill="${GRAY}" text-anchor="middle">1</text>
         <circle cx="${x}" cy="30" r="5" fill="${C}"/>
         <text x="${x}" y="18" font-size="11" fill="${C2}" text-anchor="middle">${num}/${den}</text>`
      );
    },

    balance(d) {
      return svg(180, 90,
        `<line x1="30" y1="55" x2="150" y2="55" stroke="${C2}" stroke-width="2"/>
         <polygon points="90,55 82,70 98,70" fill="${C2}"/>
         <rect x="35" y="38" width="40" height="14" rx="3" fill="${FILL}" stroke="${C}"/>
         <text x="55" y="48" font-size="9" fill="${C2}" text-anchor="middle">x+50</text>
         <rect x="105" y="38" width="40" height="14" rx="3" fill="${FILL}" stroke="${C}"/>
         <text x="125" y="48" font-size="9" fill="${C2}" text-anchor="middle">150</text>
         <text x="90" y="85" font-size="10" fill="${GRAY}" text-anchor="middle">等式两边同时加减，天平仍平衡</text>`
      );
    }
  };

  window.renderMathFlashViz = function (type, data) {
    const fn = viz[type];
    if (!fn) return '';
    return fn(data || {});
  };
})();
