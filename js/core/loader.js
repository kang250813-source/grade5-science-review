/* 按年级动态加载 data 脚本 */

(function () {
  'use strict';

  const loaded = new Set();

  const ASSET_VERSION = '20260615b';

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[data-grade-src="${src}"]`);
      if (existing) {
        resolve();
        return;
      }
      const root = (typeof APP_BASE === 'string' ? APP_BASE : '/');
      const url = (src.startsWith('http') || src.startsWith('/'))
        ? src
        : root.replace(/\/?$/, '/') + src.replace(/^\//, '');
      const s = document.createElement('script');
      s.src = url + (url.includes('?') ? '&' : '?') + 'v=' + ASSET_VERSION;
      s.async = false;
      s.dataset.gradeSrc = src;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error('Failed to load ' + src));
      document.body.appendChild(s);
    });
  }

  async function loadGrade(grade) {
    if (loaded.has(grade)) return GradeRegistry.getPack(grade);
    const manifest = GRADE_MANIFEST[grade];
    if (!manifest || !manifest.scripts) {
      throw new Error('No manifest for grade ' + grade);
    }
    for (const src of manifest.scripts) {
      await loadScript(src);
    }
    loaded.add(grade);
    return GradeRegistry.getPack(grade);
  }

  window.GradeLoader = { loadGrade, isLoaded: g => loaded.has(g) };
})();
