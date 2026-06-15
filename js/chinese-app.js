(function () {
  'use strict';

  const STORAGE_KEY = 'chinese-review-progress';

  let chiState = {
    completedTopics: [],
    knownFlashcards: [],
    flashIndex: 0,
    flashUnit: 'all',
    quizQuestions: [],
    quizIndex: 0,
    quizScore: 0,
    quizWrong: [],
    selectedQuizUnits: ['all']
  };

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return [...(root || document).querySelectorAll(sel)]; }

  function norm(s) {
    return (s || '').trim().toLowerCase().replace(/\s+/g, '').replace(/×/g, '*');
  }

  function matchChiAnswer(val, item) {
    const v = norm(val);
    if (item.accept) return item.accept.some(a => norm(a) === v);
    if (item.multi) {
      const parts = item.answer.split(',');
      const inputs = val.split(/[,，/]/).map(norm);
      return parts.every((p, i) => norm(p) === (inputs[i] || norm(val)));
    }
    return norm(val) === norm(item.answer);
  }

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function loadChiProgress() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (saved) {
        chiState.completedTopics = saved.completedTopics || [];
        chiState.knownFlashcards = saved.knownFlashcards || [];
      }
    } catch (_) { /* ignore */ }
  }

  function saveChiProgress() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      completedTopics: chiState.completedTopics,
      knownFlashcards: chiState.knownFlashcards
    }));
    updateChiProgressUI();
  }

  function updateChiProgressUI() {
    const total = getChnAllTopicIds().length;
    const done = chiState.completedTopics.length;
    const pct = total ? Math.round((done / total) * 100) : 0;
    const fill = $('#chiProgressFill');
    const text = $('#chiProgressText');
    if (fill) fill.style.width = pct + '%';
    if (text) text.textContent = pct + '%';
  }

  function renderBlankInputs(text) {
    let html = text;
    const n = (text.match(/______/g) || []).length || 1;
    for (let i = 0; i < n; i++) {
      html = html.replace('______', `<input type="text" class="vocab-input chi-input" data-part="${i}" autocomplete="off">`);
    }
    return html;
  }

  /* ── 首页 ── */
  function renderChiHome() {
    $('#chiHeroTitle').textContent = '欢迎来复习语文！';
    $('#chiExamTitle').textContent = CHN_EXAM.title;
    $('#chiExamNote').textContent = CHN_EXAM.note;

    $('#chiUnitGrid').innerHTML = CHN_UNITS.map((unit, i) => {
      const done = unit.topics.filter(t => chiState.completedTopics.includes(t.id)).length;
      const total = unit.topics.length;
      return `
        <div class="unit-card chi-card" data-unit="${i}">
          <div class="unit-num">${i + 1}</div>
          <h3>${unit.emoji} ${unit.title}</h3>
          <p>${total} 个知识点</p>
          <div class="unit-topics">${unit.topics.map(t => t.title).join(' · ')}</div>
          <div class="unit-progress"><span>已学 ${done}/${total}</span></div>
        </div>`;
    }).join('');

    $$('#chiUnitGrid .chi-card').forEach(card => {
      card.addEventListener('click', () => {
        if (window.switchSubjectView) {
          window.switchSubjectView('chinese', 'chi-learn');
          $('#chiLearnUnitSelect').value = card.dataset.unit;
          renderChiTopics();
        }
      });
    });

    $('#chiStatsRow').innerHTML = `
      <div class="stat-card"><div class="stat-num">${CHN_UNITS.length}</div><div class="stat-label">单元</div></div>
      <div class="stat-card"><div class="stat-num">${getChnAllTopicIds().length}</div><div class="stat-label">知识点</div></div>
      <div class="stat-card"><div class="stat-num">${getChnTotalPoints()}</div><div class="stat-label">要点</div></div>
      <div class="stat-card"><div class="stat-num">${typeof CHN_SOURCES !== 'undefined' ? CHN_SOURCES.length : 12}</div><div class="stat-label">参考试卷</div></div>`;

    if (typeof CHN_EXAM_SECTIONS !== 'undefined') {
      $('#chiExamSections').innerHTML = `
        <h3 class="section-title">📋 期末卷题型结构</h3>
        <div class="exam-sections-row">
          ${CHN_EXAM_SECTIONS.map(s => `
            <div class="exam-section-card">
              <span class="exam-section-icon">${s.icon}</span>
              <strong>${s.title}</strong>
              <p>${s.desc}</p>
            </div>`).join('')}
        </div>`;
    }

    if (typeof CHN_SOURCES !== 'undefined') {
      $('#chiSourcesGrid').innerHTML = CHN_SOURCES.map(s =>
        `<span class="paper-chip" title="${s.name}">${s.region} · ${s.name.replace(/^\d{4}-\d{4}\s*/, '').slice(0, 18)}</span>`
      ).join('');
    }
  }

  /* ── 知识点 ── */
  function initChiLearnSelect() {
    const sel = $('#chiLearnUnitSelect');
    sel.innerHTML = '<option value="all">全部单元</option>' +
      CHN_UNITS.map((u, i) => `<option value="${i}">${u.title}</option>`).join('');
    sel.addEventListener('change', renderChiTopics);
    $('#chiLearnSearch').addEventListener('input', renderChiTopics);
  }

  function renderChiTopics() {
    const unitVal = $('#chiLearnUnitSelect').value;
    const search = $('#chiLearnSearch').value.trim().toLowerCase();
    const list = $('#chiTopicList');
    let html = '';

    CHN_UNITS.forEach((unit, ui) => {
      if (unitVal !== 'all' && +unitVal !== ui) return;
      unit.topics.forEach(topic => {
        const text = (topic.title + ' ' + topic.points.join(' ')).toLowerCase();
        if (search && !text.includes(search)) return;
        const done = chiState.completedTopics.includes(topic.id);
        const examples = typeof getChnExamples === 'function' ? getChnExamples(topic.id) : [];
        html += `
          <div class="topic-card" data-id="${topic.id}">
            <div class="topic-header">
              <h3><span class="topic-badge chi-badge">${unit.emoji} 单元${ui + 1}</span> ${topic.title}</h3>
              <span class="chevron">▼</span>
            </div>
            <div class="topic-body">
              <div class="topic-content">
                <ul class="point-list chi-points">
                  ${topic.points.map(p => `<li>${p}</li>`).join('')}
                </ul>
                ${examples.length ? `
                <div class="topic-examples">
                  <h4 class="examples-title">📄 卷面例题（21 份试卷）</h4>
                  ${examples.map(ex => `
                    <div class="example-item">
                      <span class="paper-tag">${ex.paper} · ${ex.type}</span>
                      <p class="example-q">${ex.q}</p>
                      <p class="example-a">→ ${ex.a}</p>
                    </div>`).join('')}
                </div>` : ''}
                <div class="topic-actions">
                  <button type="button" class="btn-done ${done ? 'completed' : ''}" data-id="${topic.id}">
                    ${done ? '✓ 已掌握' : '标记为已掌握'}
                  </button>
                </div>
              </div>
            </div>
          </div>`;
      });
    });

    list.innerHTML = html || '<p class="empty-hint">没有找到匹配的知识点</p>';

    list.querySelectorAll('.topic-header').forEach(h => {
      h.addEventListener('click', () => h.parentElement.classList.toggle('open'));
    });
    list.querySelectorAll('.btn-done').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const id = btn.dataset.id;
        const idx = chiState.completedTopics.indexOf(id);
        if (idx >= 0) chiState.completedTopics.splice(idx, 1);
        else chiState.completedTopics.push(id);
        saveChiProgress();
        renderChiTopics();
        renderChiHome();
      });
    });
  }

  /* ── 闪卡 ── */
  function initChiFlashSelect() {
    const sel = $('#chiFlashUnitSelect');
    sel.innerHTML = '<option value="all">全部单元</option>' +
      CHN_UNITS.map((u, i) => `<option value="${i}">第${i + 1}单元</option>`).join('');
    sel.addEventListener('change', () => {
      chiState.flashUnit = sel.value;
      chiState.flashIndex = 0;
      renderChiFlashcard();
    });
  }

  function getFilteredChiFlash() {
    if (chiState.flashUnit === 'all') return CHN_FLASHCARDS;
    return CHN_FLASHCARDS.filter(c => c.unit === +chiState.flashUnit);
  }

  function renderChiFlashcard() {
    const cards = getFilteredChiFlash();
    if (!cards.length) return;
    if (chiState.flashIndex >= cards.length) chiState.flashIndex = 0;
    const card = cards[chiState.flashIndex];
    $('#chiFlashcard').classList.remove('flipped');
    $('#chiFlashTag').textContent = CHN_UNITS[card.unit].title;
    $('#chiFlashQuestion').textContent = card.q;
    $('#chiFlashAnswer').textContent = card.a;
    $('#chiFlashCounter').textContent = `${chiState.flashIndex + 1} / ${cards.length}`;
  }

  function setupChiFlashControls() {
    $('#chiFlashcard').addEventListener('click', () => {
      $('#chiFlashcard').classList.toggle('flipped');
    });
    $('#chiFlashPrev').addEventListener('click', () => {
      const cards = getFilteredChiFlash();
      chiState.flashIndex = (chiState.flashIndex - 1 + cards.length) % cards.length;
      renderChiFlashcard();
    });
    $('#chiFlashNext').addEventListener('click', () => {
      const cards = getFilteredChiFlash();
      chiState.flashIndex = (chiState.flashIndex + 1) % cards.length;
      renderChiFlashcard();
    });
    $('#chiFlashKnow').addEventListener('click', () => {
      const cards = getFilteredChiFlash();
      const key = cards[chiState.flashIndex].q;
      if (!chiState.knownFlashcards.includes(key)) {
        chiState.knownFlashcards.push(key);
        saveChiProgress();
      }
      chiState.flashIndex = (chiState.flashIndex + 1) % cards.length;
      renderChiFlashcard();
    });
  }

  /* ── 测验 ── */
  function initChiQuizSetup() {
    const opts = $('#chiQuizOptions');
    opts.innerHTML = `
      <button type="button" class="quiz-opt selected" data-unit="all">全部单元</button>
      ${CHN_UNITS.map((u, i) => `<button type="button" class="quiz-opt" data-unit="${i}">${u.emoji} 第${i + 1}单元</button>`).join('')}`;

    opts.querySelectorAll('.quiz-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.dataset.unit;
        if (val === 'all') {
          opts.querySelectorAll('.quiz-opt').forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
          chiState.selectedQuizUnits = ['all'];
        } else {
          opts.querySelector('[data-unit="all"]').classList.remove('selected');
          btn.classList.toggle('selected');
          const selected = [...opts.querySelectorAll('.quiz-opt.selected')].map(b => b.dataset.unit);
          chiState.selectedQuizUnits = selected.length ? selected : ['all'];
          if (!selected.length) opts.querySelector('[data-unit="all"]').classList.add('selected');
        }
      });
    });

    $('#startChiQuiz').addEventListener('click', startChiQuiz);
    $('#chiQuizNext').addEventListener('click', nextChiQuiz);
    $('#retryChiQuiz').addEventListener('click', () => showChiQuizSection('setup'));
    $('#reviewChiWrong').addEventListener('click', () => {
      if (chiState.quizWrong.length) {
        chiState.quizQuestions = [...chiState.quizWrong];
        chiState.quizIndex = 0;
        chiState.quizScore = 0;
        chiState.quizWrong = [];
        showChiQuizSection('active');
        renderChiQuizQ();
      } else showChiQuizSection('setup');
    });
  }

  function getChiQuizPool() {
    if (chiState.selectedQuizUnits.includes('all')) return [...CHN_QUIZ_QUESTIONS];
    return CHN_QUIZ_QUESTIONS.filter(q => chiState.selectedQuizUnits.includes(String(q.unit)));
  }

  function startChiQuiz() {
    const pool = getChiQuizPool();
    chiState.quizQuestions = shuffle(pool).slice(0, Math.min(15, pool.length));
    chiState.quizIndex = 0;
    chiState.quizScore = 0;
    chiState.quizWrong = [];
    showChiQuizSection('active');
    renderChiQuizQ();
  }

  function showChiQuizSection(section) {
    $('#chiQuizSetup').classList.toggle('hidden', section !== 'setup');
    $('#chiQuizActive').classList.toggle('hidden', section !== 'active');
    $('#chiQuizResult').classList.toggle('hidden', section !== 'result');
  }

  function renderChiQuizQ() {
    const q = chiState.quizQuestions[chiState.quizIndex];
    $('#chiQuizProgress').textContent = `第 ${chiState.quizIndex + 1} / ${chiState.quizQuestions.length} 题`;
    $('#chiQuizScore').textContent = `得分：${chiState.quizScore}`;
    $('#chiQuizQuestion').textContent = q.q;
    $('#chiQuizFeedback').classList.add('hidden');
    $('#chiQuizNext').classList.add('hidden');

    $('#chiQuizChoices').innerHTML = q.options.map((opt, i) =>
      `<button type="button" class="quiz-choice" data-idx="${i}">${String.fromCharCode(65 + i)}. ${opt}</button>`
    ).join('');

    $$('#chiQuizChoices .quiz-choice').forEach(btn => {
      btn.addEventListener('click', () => answerChiQuiz(+btn.dataset.idx));
    });
  }

  function answerChiQuiz(selected) {
    const q = chiState.quizQuestions[chiState.quizIndex];
    $$('#chiQuizChoices .quiz-choice').forEach((btn, i) => {
      btn.disabled = true;
      if (i === q.answer) btn.classList.add('correct');
      else if (i === selected) btn.classList.add('wrong');
    });
    const fb = $('#chiQuizFeedback');
    fb.classList.remove('hidden', 'correct-fb', 'wrong-fb');
    if (selected === q.answer) {
      chiState.quizScore++;
      fb.classList.add('correct-fb');
      fb.textContent = '✓ 正确！' + q.explain;
    } else {
      chiState.quizWrong.push(q);
      fb.classList.add('wrong-fb');
      fb.textContent = '✗ ' + String.fromCharCode(65 + q.answer) + '. ' + q.explain;
    }
    $('#chiQuizScore').textContent = `得分：${chiState.quizScore}`;
    $('#chiQuizNext').classList.remove('hidden');
    $('#chiQuizNext').textContent = chiState.quizIndex + 1 >= chiState.quizQuestions.length ? '查看结果' : '下一题';
  }

  function nextChiQuiz() {
    chiState.quizIndex++;
    if (chiState.quizIndex >= chiState.quizQuestions.length) showChiQuizResult();
    else renderChiQuizQ();
  }

  function showChiQuizResult() {
    showChiQuizSection('result');
    const s = chiState.quizScore, t = chiState.quizQuestions.length;
    const pct = Math.round((s / t) * 100);
    $('#chiResultScore').textContent = `${s} / ${t}`;
    $('#chiResultEmoji').textContent = pct >= 90 ? '🏆' : pct >= 70 ? '🎉' : '💪';
    $('#chiResultTitle').textContent = pct >= 90 ? '太棒了！' : pct >= 70 ? '不错哦！' : '继续加油！';
    $('#chiResultMessage').textContent = pct >= 70
      ? '语文知识点掌握得不错，可以用「趣味互动」再练几道典型题。'
      : '建议回到「知识点」复习，再用闪卡和填空闯关巩固。';
  }

  /* ── 趣味互动 ── */
  function initChiPlayTabs() {
    $$('#view-chi-play > .play-tabs .play-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        $$('#view-chi-play > .play-tabs .play-tab').forEach(t => t.classList.remove('active'));
        $$('#view-chi-play > .play-panel').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        $(`#chi-play-${tab.dataset.play}`).classList.add('active');
      });
    });
  }

  function checkFillRow(row, item) {
    const inputs = $$('.chi-input', row);
    if (item.multi) {
      const parts = item.answer.split(',');
      return parts.every((p, i) => norm(inputs[i]?.value) === norm(p));
    }
    return matchChiAnswer(inputs[0]?.value || '', item);
  }

  function renderChiPlayFill() {
    $('#chiPlayFill').innerHTML = `
      <div class="vocab-group">
        <h4>概念填空（期末卷常见）</h4>
        ${CHN_FILL.map((item, i) => `
          <div class="vocab-item" data-id="${item.id}">
            <span class="vocab-num chi-num">${i + 1}</span>
            <div class="vocab-body">
              <p class="vocab-q">${renderBlankInputs(item.q)}</p>
              <div class="vocab-result hidden"></div>
            </div>
          </div>`).join('')}
        <button type="button" class="btn btn-primary" id="checkChiFill">✓ 检查填空</button>
        <div class="play-feedback" id="chiFillFeedback"></div>
      </div>`;

    $('#checkChiFill').onclick = () => {
      let ok = 0;
      CHN_FILL.forEach(item => {
        const row = $(`#chiPlayFill [data-id="${item.id}"]`);
        const pass = checkFillRow(row, item);
        row.classList.toggle('vocab-correct', pass);
        row.classList.toggle('vocab-wrong', !pass);
        const r = row.querySelector('.vocab-result');
        r.classList.remove('hidden');
        r.textContent = pass ? '✓' : `✗ ${item.answer.replace(/,/g, ' / ')}`;
        if (pass) ok++;
      });
      const fb = $('#chiFillFeedback');
      fb.className = 'play-feedback ' + (ok === CHN_FILL.length ? 'success' : 'error');
      fb.textContent = ok === CHN_FILL.length ? '🎉 全部正确！' : `得分 ${ok}/${CHN_FILL.length}`;
    };
  }

  function renderChiPlayJudge() {
    $('#chiPlayJudge').innerHTML = CHN_JUDGE.map((item, i) => `
      <div class="read-item judge-item" data-id="${item.id}">
        <p>${i + 1}. ${item.q}</p>
        <div class="tf-btns">
          <button type="button" class="tf-btn judge-btn" data-v="true">✓ 正确</button>
          <button type="button" class="tf-btn judge-btn" data-v="false">✗ 错误</button>
        </div>
        <div class="read-result hidden"></div>
      </div>`).join('');

    $$('#chiPlayJudge .judge-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.judge-item');
        const id = item.dataset.id;
        const q = CHN_JUDGE.find(x => x.id === id);
        const sel = btn.dataset.v === 'true';
        item.querySelectorAll('.judge-btn').forEach(b => {
          b.disabled = true;
          b.classList.toggle('correct', (b.dataset.v === 'true') === q.answer);
          b.classList.toggle('wrong', (b.dataset.v === 'true') === sel && sel !== q.answer);
        });
        const r = item.querySelector('.read-result');
        r.classList.remove('hidden');
        r.className = 'read-result ' + (sel === q.answer ? 'success' : 'error');
        r.textContent = (sel === q.answer ? '✓' : '✗') + ' ' + q.explain;
      });
    });
  }

  function renderChiPlayPoetry() {
    const items = CHN_FILL.filter(f => f.poetry);
    $('#chiPlayPoetry').innerHTML = `
      <div class="vocab-group">
        <h4>诗词名句默写</h4>
        ${items.map((item, i) => `
          <div class="vocab-item calc-item" data-id="${item.id}">
            <span class="vocab-num chi-num">${i + 1}</span>
            <div class="vocab-body">
              <p class="vocab-q">${item.q}</p>
              <input type="text" class="read-input chi-poetry-input" placeholder="填答案">
              <div class="vocab-result hidden"></div>
            </div>
          </div>`).join('')}
        <button type="button" class="btn btn-primary" id="checkChiPoetry">✓ 检查默写</button>
        <div class="play-feedback" id="chiPoetryFeedback"></div>
      </div>`;

    $('#checkChiPoetry').onclick = () => {
      let ok = 0;
      items.forEach(item => {
        const row = $(`#chiPlayPoetry [data-id="${item.id}"]`);
        const val = row.querySelector('.chi-poetry-input').value;
        const pass = matchChiAnswer(val, item);
        row.classList.toggle('vocab-correct', pass);
        row.classList.toggle('vocab-wrong', !pass);
        const r = row.querySelector('.vocab-result');
        r.classList.remove('hidden');
        r.textContent = pass ? '✓' : `✗ ${item.answer}（${item.explain}）`;
        if (pass) ok++;
      });
      const fb = $('#chiPoetryFeedback');
      fb.className = 'play-feedback ' + (ok === items.length ? 'success' : 'error');
      fb.textContent = ok === items.length ? '🎉 全部正确！' : `得分 ${ok}/${items.length}`;
    };
  }

  function renderChiPlayWord() {
    const cats = [
      { key: '习作', icon: '✍️', label: '教材习作（8 单元）' },
      { key: '阅读', icon: '📖', label: '课内阅读（按单元）' },
      { key: '方法', icon: '🎯', label: '阅读答题方法' },
      { key: '综合', icon: '📋', label: '综合性学习' }
    ];
    let html = '';
    cats.forEach(c => {
      const items = CHN_WORD.filter(w => (w.cat || '方法') === c.key);
      if (!items.length) return;
      html += `<div class="word-section"><h3 class="word-section-title">${c.icon} ${c.label} <span class="word-count">${items.length} 篇</span></h3>`;
      html += items.map(w => `
        <div class="play-card word-card">
          <h4 class="play-card-title">${w.title}${w.unit ? ` <span class="unit-tag">第${w.unit}单元</span>` : ''}</h4>
          ${w.paper ? `<span class="paper-tag">${w.paper}</span>` : ''}
          <p class="play-card-desc">${w.prompt}</p>
          <ol class="word-steps">
            ${w.steps.map(s => `<li>${s}</li>`).join('')}
          </ol>
        </div>`).join('');
      html += '</div>';
    });
    $('#chiPlayWord').innerHTML = html;
  }

  function renderChiPlayPick() {
    if (typeof CHN_PAPER_PICKS === 'undefined' || !window.renderPaperPicks) return;
    window.renderPaperPicks({
      listId: '#chiPlayPick',
      pagerId: '#chiPlayPickPager',
      picks: CHN_PAPER_PICKS,
      pageSize: 10,
      key: 'chi-pick'
    });
  }

  function initChinese() {
    loadChiProgress();
    renderChiHome();
    initChiLearnSelect();
    renderChiTopics();
    initChiFlashSelect();
    setupChiFlashControls();
    renderChiFlashcard();
    initChiQuizSetup();
    initChiPlayTabs();
    renderChiPlayFill();
    renderChiPlayJudge();
    renderChiPlayPoetry();
    renderChiPlayWord();
    renderChiPlayPick();
    updateChiProgressUI();
  }

  window.initChinese = initChinese;
})();
