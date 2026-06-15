/* 应用总门户 · 年级 + 科目入口 */

(function () {
  'use strict';

  const SUBJECTS = [
    { id: 'chinese', color: '#059669', desc: '统编教材 · 期末卷 · 闪卡测验' },
    { id: 'math', color: '#ea580c', desc: '苏教教材 · 图形闪卡 · 期末卷' },
    { id: 'english', color: '#7c3aed', desc: '译林教材 · 听力 · 亮点给力卷' },
    { id: 'science', color: '#2563eb', desc: '教科版 · 闪卡 · 趣味互动' }
  ];

  const HOME_VIEWS = {
    science: 'home',
    english: 'eng-home',
    math: 'math-home',
    chinese: 'chi-home'
  };

  function $(sel) { return document.querySelector(sel); }

  function gradeMeta(g) {
    return Shell.gradeMeta(g);
  }

  function subjectStats(subject) {
    const g = GradeRegistry.getActiveGrade();
    const data = GradeRegistry.getSubject(g, subject);
    if (!data) return { topics: 0, points: 0, flash: 0 };
    const topics = (data.units || []).reduce((s, u) => s + u.topics.length, 0);
    const points = (data.units || []).reduce((s, u) =>
      s + u.topics.reduce((t, top) => t + top.points.length, 0), 0);
    const flash = (data.flashcards || []).length;
    return { topics, points, flash };
  }

  function renderGradePills() {
    const bar = $('#portalGradePills');
    if (!bar) return;
    const active = GradeRegistry.getActiveGrade();
    bar.innerHTML = GRADE_SCHEMA.grades.map(g => {
      const gm = gradeMeta(g);
      const cls = ['portal-grade-pill'];
      if (g === active) cls.push('active');
      if (!gm.available) cls.push('soon');
      return `<button type="button" class="${cls.join(' ')}" data-grade="${g}">
        <span class="portal-grade-num">${g}</span>
        <span class="portal-grade-label">${gm.label.replace('年级', '')}</span>
        ${gm.available ? '<span class="portal-grade-tag open">已开放</span>' : '<span class="portal-grade-tag">筹备</span>'}
      </button>`;
    }).join('');

    bar.querySelectorAll('.portal-grade-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        const g = +btn.dataset.grade;
        if (g === GradeRegistry.getActiveGrade()) return;
        Shell.activateGrade(g);
      });
    });
  }

  function renderSubjects() {
    const grid = $('#portalSubjects');
    const unavailable = $('#portalUnavailable');
    const heroBadge = $('#portalGradeBadge');
    if (!grid) return;

    const g = GradeRegistry.getActiveGrade();
    const gm = gradeMeta(g);
    if (heroBadge) heroBadge.textContent = gm.label + (gm.semester || '');

    if (!GradeRegistry.isGradeAvailable(g)) {
      grid.classList.add('hidden');
      if (unavailable) {
        unavailable.classList.remove('hidden');
        $('#portalUnavailableTitle').textContent = `${gm.label} · 内容筹备中`;
        $('#portalUnavailableHint').textContent = gm.hint || '该年级内容正在整理，请先选择已开放的年级。';
      }
      return;
    }

    grid.classList.remove('hidden');
    if (unavailable) unavailable.classList.add('hidden');

    grid.innerHTML = SUBJECTS.map(s => {
      const meta = GRADE_SCHEMA.subjectLabels[s.id];
      const ver = Shell.subjectVersion(g, s.id);
      const st = subjectStats(s.id);
      const ready = GradeRegistry.isSubjectReady(g, s.id);
      const cls = ['portal-subject-card'];
      if (!ready) cls.push('soon');
      return `
        <button type="button" class="${cls.join(' ')}" data-subject="${s.id}" data-ready="${ready ? '1' : '0'}" style="--card-accent:${s.color}" ${ready ? '' : 'disabled'}>
          <span class="portal-subject-icon">${meta.icon}</span>
          <h3>${meta.label}</h3>
          <p class="portal-subject-ver">${ver || '教材 + 期末复习'}</p>
          <p class="portal-subject-desc">${ready ? s.desc : '教材已下载，知识点正在整理中…'}</p>
          <div class="portal-subject-stats">
            <span>${(GradeRegistry.getSubject(g, s.id)?.units || []).length} 单元</span>
            <span>${st.points} 要点</span>
            <span>${st.flash} 闪卡</span>
          </div>
          <span class="portal-subject-go">${ready ? '进入复习 →' : '筹备中'}</span>
        </button>`;
    }).join('');

    grid.querySelectorAll('.portal-subject-card[data-ready="1"]').forEach(card => {
      card.addEventListener('click', () => Portal.enterSubject(card.dataset.subject));
    });
  }

  function setLoading(on) {
    const grid = $('#portalSubjects');
    if (grid) grid.classList.toggle('portal-loading', !!on);
  }

  function render() {
    renderGradePills();
    renderSubjects();
  }

  function showPortal() {
    $$('.view').forEach(v => v.classList.remove('active'));
    const portal = $('#view-portal-home');
    if (portal) portal.classList.add('active');
    $('#headerStudy')?.classList.add('hidden');
    $('#portalBackBtn')?.classList.add('hidden');
    document.body.classList.remove('study-mode');
    Shell.updateBrand();
    render();
  }

  function enterSubject(subject) {
    Shell.setCurrentSubject(subject);
    document.body.classList.add('study-mode');
    $('#headerStudy')?.classList.remove('hidden');
    $('#portalBackBtn')?.classList.remove('hidden');
    $$('.view').forEach(v => v.classList.remove('active'));
    if (window.switchSubject) window.switchSubject(subject);
    Shell.updateHeader(subject);
  }

  function $$(sel) { return document.querySelectorAll(sel); }

  function init() {
    $('#portalBackBtn')?.addEventListener('click', showPortal);
    document.querySelector('.logo')?.addEventListener('click', () => {
      if (document.body.classList.contains('study-mode')) showPortal();
    });
  }

  window.Portal = { render, showPortal, enterSubject, init, setLoading };
})();
