/* 应用壳 · 年级切换 + 初始化编排 */

(function () {
  'use strict';

  let currentSubject = 'science';
  let bootstrapped = false;

  function $(sel) { return document.querySelector(sel); }
  function $$(sel) { return document.querySelectorAll(sel); }

  function gradeMeta(grade) {
    return GRADE_SCHEMA.gradeMeta[grade] || { label: grade + '年级', available: false };
  }

  function subjectVersion(grade, subject) {
    const gm = gradeMeta(grade);
    return (gm.versions && gm.versions[subject]) || '';
  }

  function updateBrand() {
    const b = APP_BRAND;
    $('#logoIcon').textContent = '📚';
    $('#siteTitle').textContent = b.title;
    $('#siteSubtitle').textContent = b.tagline;
    document.title = b.name;
    const ctx = $('#headerContext');
    if (ctx) ctx.textContent = '';
    const foot = $('#footerText');
    if (foot) foot.textContent = b.footer;
  }

  function updateHeader(subject) {
    const b = APP_BRAND;
    const g = GradeRegistry.getActiveGrade();
    const gm = gradeMeta(g);
    const sub = GRADE_SCHEMA.subjectLabels[subject] || { icon: '📚', label: '' };
    const ver = subjectVersion(g, subject);
    $('#logoIcon').textContent = sub.icon;
    $('#siteTitle').textContent = `${gm.label}${sub.label}`;
    $('#siteSubtitle').textContent = ver ? `${ver} · ${gm.semester || '下册'}` : (gm.semester || '下册');
    document.title = `${gm.label}${sub.label} · ${b.name}`;
    const ctx = $('#headerContext');
    if (ctx) ctx.textContent = `${gm.label} · ${sub.label}`;
  }

  function refreshSubjectApps() {
    const inits = [
      ['science', window.initScience],
      ['english', window.initEnglish],
      ['math', window.initMath],
      ['chinese', window.initChinese]
    ];
    inits.forEach(([name, fn]) => {
      if (!fn) return;
      try { fn(); } catch (err) { console.error(`init ${name} failed:`, err); }
    });
  }

  function applyGradeTheme(grade) {
    GRADE_SCHEMA.grades.forEach(g => document.body.classList.remove('portal-grade-' + g));
    document.body.classList.add('portal-grade-' + grade);
    document.body.dataset.grade = String(grade);
  }

  async function activateGrade(grade) {
    GradeRegistry.setActiveGrade(grade);
    applyGradeTheme(grade);
    currentSubject = 'science';

    if (!GradeRegistry.isGradeAvailable(grade)) {
      if (window.Portal) {
        Portal.render();
        Portal.showPortal();
      }
      return;
    }

    if (window.Portal) Portal.setLoading(true);
    try {
      await GradeLoader.loadGrade(grade);
      GradeRegistry.bindAllGlobals(grade);
      refreshSubjectApps();

      if (window.Portal) {
        Portal.render();
        if (document.body.classList.contains('study-mode') && window.switchSubject) {
          window.switchSubject(currentSubject);
        } else {
          Portal.showPortal();
        }
      } else if (window.switchSubject) {
        window.switchSubject(currentSubject);
      }
    } catch (err) {
      console.error('activateGrade failed:', err);
      if (window.Portal) Portal.render();
    } finally {
      if (window.Portal) Portal.setLoading(false);
    }
  }

  async function bootstrap() {
    if (bootstrapped) return;
    bootstrapped = true;
    if (window.Portal) Portal.init();
    updateBrand();
    GradeRegistry.setActiveGrade(GRADE_SCHEMA.defaultGrade);
    await activateGrade(GRADE_SCHEMA.defaultGrade);
  }

  window.Shell = {
    bootstrap,
    activateGrade,
    getActiveGrade: () => GradeRegistry.getActiveGrade(),
    getCurrentSubject: () => currentSubject,
    setCurrentSubject: s => { currentSubject = s; },
    updateBrand,
    updateHeader,
    gradeMeta,
    subjectVersion
  };
})();
