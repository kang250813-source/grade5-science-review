(function () {
  'use strict';

  const STORAGE_KEY = 'math-review-progress';

  let mathState = {
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

  function matchAnswer(val, item) {
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

  function loadMathProgress() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (saved) {
        mathState.completedTopics = saved.completedTopics || [];
        mathState.knownFlashcards = saved.knownFlashcards || [];
      }
    } catch (_) { /* ignore */ }
  }

  function saveMathProgress() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      completedTopics: mathState.completedTopics,
      knownFlashcards: mathState.knownFlashcards
    }));
    updateMathProgressUI();
  }

  function updateMathProgressUI() {
    const total = getMathAllTopicIds().length;
    const done = mathState.completedTopics.length;
    const pct = total ? Math.round((done / total) * 100) : 0;
    const fill = $('#mathProgressFill');
    const text = $('#mathProgressText');
    if (fill) fill.style.width = pct + '%';
    if (text) text.textContent = pct + '%';
  }

  function renderBlankInputs(text) {
    let html = text;
    const n = (text.match(/______/g) || []).length || 1;
    for (let i = 0; i < n; i++) {
      html = html.replace('______', `<input type="text" class="vocab-input math-input" data-part="${i}" autocomplete="off">`);
    }
    return html;
  }

  /* ── 首页 ── */
  function renderMathHome() {
    $('#mathHeroTitle').textContent = '欢迎来复习数学！';
    $('#mathExamTitle').textContent = MATH_EXAM.title;
    $('#mathExamNote').textContent = MATH_EXAM.note;

    $('#mathUnitGrid').innerHTML = MATH_UNITS.map((unit, i) => {
      const done = unit.topics.filter(t => mathState.completedTopics.includes(t.id)).length;
      const total = unit.topics.length;
      return `
        <div class="unit-card math-card" data-unit="${i}">
          <div class="unit-num">${i + 1}</div>
          <h3>${unit.emoji} ${unit.title}</h3>
          <p>${total} 个知识点</p>
          <div class="unit-topics">${unit.topics.map(t => t.title).join(' · ')}</div>
          <div class="unit-progress"><span>已学 ${done}/${total}</span></div>
        </div>`;
    }).join('');

    $$('#mathUnitGrid .math-card').forEach(card => {
      card.addEventListener('click', () => {
        if (window.switchSubjectView) {
          window.switchSubjectView('math', 'math-learn');
          $('#mathLearnUnitSelect').value = card.dataset.unit;
          renderMathTopics();
        }
      });
    });

    $('#mathStatsRow').innerHTML = `
      <div class="stat-card"><div class="stat-num">${MATH_UNITS.length}</div><div class="stat-label">单元</div></div>
      <div class="stat-card"><div class="stat-num">${getMathAllTopicIds().length}</div><div class="stat-label">知识点</div></div>
      <div class="stat-card"><div class="stat-num">${getMathTotalPoints()}</div><div class="stat-label">要点</div></div>
      <div class="stat-card"><div class="stat-num">${typeof MATH_SOURCES !== 'undefined' ? MATH_SOURCES.length : 12}</div><div class="stat-label">参考试卷</div></div>`;

    if (typeof MATH_EXAM_SECTIONS !== 'undefined') {
      $('#mathExamSections').innerHTML = `
        <h3 class="section-title">📋 期末卷题型结构</h3>
        <div class="exam-sections-row">
          ${MATH_EXAM_SECTIONS.map(s => `
            <div class="exam-section-card">
              <span class="exam-section-icon">${s.icon}</span>
              <strong>${s.title}</strong>
              <p>${s.desc}</p>
            </div>`).join('')}
        </div>`;
    }

    if (typeof MATH_SOURCES !== 'undefined') {
      $('#mathSourcesGrid').innerHTML = MATH_SOURCES.map(s =>
        `<span class="paper-chip" title="${s.name}">${s.region} · ${s.name.replace(/^\d{4}-\d{4}\s*/, '').slice(0, 18)}</span>`
      ).join('');
    }
  }

  /* ── 知识点 ── */
  function initMathLearnSelect() {
    const sel = $('#mathLearnUnitSelect');
    sel.innerHTML = '<option value="all">全部单元</option>' +
      MATH_UNITS.map((u, i) => `<option value="${i}">${u.title}</option>`).join('');
    sel.addEventListener('change', renderMathTopics);
    $('#mathLearnSearch').addEventListener('input', renderMathTopics);
  }

  function renderMathTopics() {
    const unitVal = $('#mathLearnUnitSelect').value;
    const search = $('#mathLearnSearch').value.trim().toLowerCase();
    const list = $('#mathTopicList');
    let html = '';

    MATH_UNITS.forEach((unit, ui) => {
      if (unitVal !== 'all' && +unitVal !== ui) return;
      unit.topics.forEach(topic => {
        const text = (topic.title + ' ' + topic.points.join(' ')).toLowerCase();
        if (search && !text.includes(search)) return;
        const done = mathState.completedTopics.includes(topic.id);
        const examples = typeof getMathExamples === 'function' ? getMathExamples(topic.id) : [];
        html += `
          <div class="topic-card" data-id="${topic.id}">
            <div class="topic-header">
              <h3><span class="topic-badge math-badge">${unit.emoji} 单元${ui + 1}</span> ${topic.title}</h3>
              <span class="chevron">▼</span>
            </div>
            <div class="topic-body">
              <div class="topic-content">
                <ul class="point-list math-points">
                  ${topic.points.map(p => `<li>${p}</li>`).join('')}
                </ul>
                ${examples.length ? `
                <div class="topic-examples">
                  <h4 class="examples-title">📄 卷面例题（12 份试卷）</h4>
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
        const idx = mathState.completedTopics.indexOf(id);
        if (idx >= 0) mathState.completedTopics.splice(idx, 1);
        else mathState.completedTopics.push(id);
        saveMathProgress();
        renderMathTopics();
        renderMathHome();
      });
    });
  }

  /* ── 闪卡 ── */
  function initMathFlashSelect() {
    const sel = $('#mathFlashUnitSelect');
    sel.innerHTML = '<option value="all">全部单元</option>' +
      MATH_UNITS.map((u, i) => `<option value="${i}">第${i + 1}单元</option>`).join('');
    sel.addEventListener('change', () => {
      mathState.flashUnit = sel.value;
      mathState.flashIndex = 0;
      renderMathFlashcard();
    });
  }

  function getFilteredMathFlash() {
    if (mathState.flashUnit === 'all') return MATH_FLASHCARDS;
    return MATH_FLASHCARDS.filter(c => c.unit === +mathState.flashUnit);
  }

  function escapeHtml(s) {
    return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function renderMathFlashcard() {
    const cards = getFilteredMathFlash();
    if (!cards.length) return;
    if (mathState.flashIndex >= cards.length) mathState.flashIndex = 0;
    const card = cards[mathState.flashIndex];
    const cardEl = $('#mathFlashcard');
    cardEl.classList.remove('flipped');
    $('#mathFlashTag').textContent = MATH_UNITS[card.unit].title;
    $('#mathFlashQuestion').textContent = card.q + (card.viz ? ' 📊' : '');
    const ansEl = $('#mathFlashAnswer');
    if (card.viz && typeof renderMathFlashViz === 'function') {
      ansEl.innerHTML = `<p class="flash-answer-text">${escapeHtml(card.a)}</p><div class="flash-viz">${renderMathFlashViz(card.viz, card.vizData)}</div>`;
      cardEl.classList.add('flashcard-has-viz');
    } else {
      ansEl.innerHTML = `<p class="flash-answer-text">${escapeHtml(card.a)}</p>`;
      cardEl.classList.remove('flashcard-has-viz');
    }
    $('#mathFlashCounter').textContent = `${mathState.flashIndex + 1} / ${cards.length}`;
  }

  function setupMathFlashControls() {
    $('#mathFlashcard').addEventListener('click', () => {
      $('#mathFlashcard').classList.toggle('flipped');
    });
    $('#mathFlashPrev').addEventListener('click', () => {
      const cards = getFilteredMathFlash();
      mathState.flashIndex = (mathState.flashIndex - 1 + cards.length) % cards.length;
      renderMathFlashcard();
    });
    $('#mathFlashNext').addEventListener('click', () => {
      const cards = getFilteredMathFlash();
      mathState.flashIndex = (mathState.flashIndex + 1) % cards.length;
      renderMathFlashcard();
    });
    $('#mathFlashKnow').addEventListener('click', () => {
      const cards = getFilteredMathFlash();
      const key = cards[mathState.flashIndex].q;
      if (!mathState.knownFlashcards.includes(key)) {
        mathState.knownFlashcards.push(key);
        saveMathProgress();
      }
      mathState.flashIndex = (mathState.flashIndex + 1) % cards.length;
      renderMathFlashcard();
    });
  }

  /* ── 测验 ── */
  function initMathQuizSetup() {
    const opts = $('#mathQuizOptions');
    opts.innerHTML = `
      <button type="button" class="quiz-opt selected" data-unit="all">全部单元</button>
      ${MATH_UNITS.map((u, i) => `<button type="button" class="quiz-opt" data-unit="${i}">${u.emoji} 第${i + 1}单元</button>`).join('')}`;

    opts.querySelectorAll('.quiz-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.dataset.unit;
        if (val === 'all') {
          opts.querySelectorAll('.quiz-opt').forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
          mathState.selectedQuizUnits = ['all'];
        } else {
          opts.querySelector('[data-unit="all"]').classList.remove('selected');
          btn.classList.toggle('selected');
          const selected = [...opts.querySelectorAll('.quiz-opt.selected')].map(b => b.dataset.unit);
          mathState.selectedQuizUnits = selected.length ? selected : ['all'];
          if (!selected.length) opts.querySelector('[data-unit="all"]').classList.add('selected');
        }
      });
    });

    $('#startMathQuiz').addEventListener('click', startMathQuiz);
    $('#mathQuizNext').addEventListener('click', nextMathQuiz);
    $('#retryMathQuiz').addEventListener('click', () => showMathQuizSection('setup'));
    $('#reviewMathWrong').addEventListener('click', () => {
      if (mathState.quizWrong.length) {
        mathState.quizQuestions = [...mathState.quizWrong];
        mathState.quizIndex = 0;
        mathState.quizScore = 0;
        mathState.quizWrong = [];
        showMathQuizSection('active');
        renderMathQuizQ();
      } else showMathQuizSection('setup');
    });
  }

  function getMathQuizPool() {
    if (mathState.selectedQuizUnits.includes('all')) return [...MATH_QUIZ_QUESTIONS];
    return MATH_QUIZ_QUESTIONS.filter(q => mathState.selectedQuizUnits.includes(String(q.unit)));
  }

  function startMathQuiz() {
    const pool = getMathQuizPool();
    mathState.quizQuestions = shuffle(pool).slice(0, Math.min(15, pool.length));
    mathState.quizIndex = 0;
    mathState.quizScore = 0;
    mathState.quizWrong = [];
    showMathQuizSection('active');
    renderMathQuizQ();
  }

  function showMathQuizSection(section) {
    $('#mathQuizSetup').classList.toggle('hidden', section !== 'setup');
    $('#mathQuizActive').classList.toggle('hidden', section !== 'active');
    $('#mathQuizResult').classList.toggle('hidden', section !== 'result');
  }

  function renderMathQuizQ() {
    const q = mathState.quizQuestions[mathState.quizIndex];
    $('#mathQuizProgress').textContent = `第 ${mathState.quizIndex + 1} / ${mathState.quizQuestions.length} 题`;
    $('#mathQuizScore').textContent = `得分：${mathState.quizScore}`;
    $('#mathQuizQuestion').textContent = q.q;
    $('#mathQuizFeedback').classList.add('hidden');
    $('#mathQuizNext').classList.add('hidden');

    $('#mathQuizChoices').innerHTML = q.options.map((opt, i) =>
      `<button type="button" class="quiz-choice" data-idx="${i}">${String.fromCharCode(65 + i)}. ${opt}</button>`
    ).join('');

    $$('#mathQuizChoices .quiz-choice').forEach(btn => {
      btn.addEventListener('click', () => answerMathQuiz(+btn.dataset.idx));
    });
  }

  function answerMathQuiz(selected) {
    const q = mathState.quizQuestions[mathState.quizIndex];
    $$('#mathQuizChoices .quiz-choice').forEach((btn, i) => {
      btn.disabled = true;
      if (i === q.answer) btn.classList.add('correct');
      else if (i === selected) btn.classList.add('wrong');
    });
    const fb = $('#mathQuizFeedback');
    fb.classList.remove('hidden', 'correct-fb', 'wrong-fb');
    if (selected === q.answer) {
      mathState.quizScore++;
      fb.classList.add('correct-fb');
      fb.textContent = '✓ 正确！' + q.explain;
    } else {
      mathState.quizWrong.push(q);
      fb.classList.add('wrong-fb');
      fb.textContent = '✗ ' + String.fromCharCode(65 + q.answer) + '. ' + q.explain;
    }
    $('#mathQuizScore').textContent = `得分：${mathState.quizScore}`;
    $('#mathQuizNext').classList.remove('hidden');
    $('#mathQuizNext').textContent = mathState.quizIndex + 1 >= mathState.quizQuestions.length ? '查看结果' : '下一题';
  }

  function nextMathQuiz() {
    mathState.quizIndex++;
    if (mathState.quizIndex >= mathState.quizQuestions.length) showMathQuizResult();
    else renderMathQuizQ();
  }

  function showMathQuizResult() {
    showMathQuizSection('result');
    const s = mathState.quizScore, t = mathState.quizQuestions.length;
    const pct = Math.round((s / t) * 100);
    $('#mathResultScore').textContent = `${s} / ${t}`;
    $('#mathResultEmoji').textContent = pct >= 90 ? '🏆' : pct >= 70 ? '🎉' : '💪';
    $('#mathResultTitle').textContent = pct >= 90 ? '太棒了！' : pct >= 70 ? '不错哦！' : '继续加油！';
    $('#mathResultMessage').textContent = pct >= 70
      ? '数学知识点掌握得不错，可以用「趣味互动」再练几道典型题。'
      : '建议回到「知识点」复习，再用闪卡和填空闯关巩固。';
  }

  /* ── 趣味互动 ── */
  function initMathPlayTabs() {
    $$('#view-math-play > .play-tabs .play-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        $$('#view-math-play > .play-tabs .play-tab').forEach(t => t.classList.remove('active'));
        $$('#view-math-play > .play-panel').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        $(`#math-play-${tab.dataset.play}`).classList.add('active');
      });
    });
  }

  function checkFillRow(row, item) {
    const inputs = $$('.math-input', row);
    if (item.multi) {
      const parts = item.answer.split(',');
      return parts.every((p, i) => norm(inputs[i]?.value) === norm(p));
    }
    return matchAnswer(inputs[0]?.value || '', item);
  }

  function renderMathPlayFill() {
    $('#mathPlayFill').innerHTML = `
      <div class="vocab-group">
        <h4>概念填空（期末卷常见）</h4>
        ${MATH_FILL.map((item, i) => `
          <div class="vocab-item" data-id="${item.id}">
            <span class="vocab-num math-num">${i + 1}</span>
            <div class="vocab-body">
              <p class="vocab-q">${renderBlankInputs(item.q)}</p>
              <div class="vocab-result hidden"></div>
            </div>
          </div>`).join('')}
        <button type="button" class="btn btn-primary" id="checkMathFill">✓ 检查填空</button>
        <div class="play-feedback" id="mathFillFeedback"></div>
      </div>`;

    $('#checkMathFill').onclick = () => {
      let ok = 0;
      MATH_FILL.forEach(item => {
        const row = $(`#mathPlayFill [data-id="${item.id}"]`);
        const pass = checkFillRow(row, item);
        row.classList.toggle('vocab-correct', pass);
        row.classList.toggle('vocab-wrong', !pass);
        const r = row.querySelector('.vocab-result');
        r.classList.remove('hidden');
        r.textContent = pass ? '✓' : `✗ ${item.answer.replace(/,/g, ' / ')}`;
        if (pass) ok++;
      });
      const fb = $('#mathFillFeedback');
      fb.className = 'play-feedback ' + (ok === MATH_FILL.length ? 'success' : 'error');
      fb.textContent = ok === MATH_FILL.length ? '🎉 全部正确！' : `得分 ${ok}/${MATH_FILL.length}`;
    };
  }

  function renderMathPlayJudge() {
    $('#mathPlayJudge').innerHTML = MATH_JUDGE.map((item, i) => `
      <div class="read-item judge-item" data-id="${item.id}">
        <p>${i + 1}. ${item.q}</p>
        <div class="tf-btns">
          <button type="button" class="tf-btn judge-btn" data-v="true">✓ 正确</button>
          <button type="button" class="tf-btn judge-btn" data-v="false">✗ 错误</button>
        </div>
        <div class="read-result hidden"></div>
      </div>`).join('');

    $$('#mathPlayJudge .judge-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.judge-item');
        const id = item.dataset.id;
        const q = MATH_JUDGE.find(x => x.id === id);
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

  function renderMathPlayCalc() {
    const all = [...MATH_CALC, ...MATH_EQUATIONS.map(e => ({ ...e, eq: true }))];
    $('#mathPlayCalc').innerHTML = `
      <div class="vocab-group">
        <h4>计算与解方程</h4>
        ${all.map((item, i) => `
          <div class="vocab-item calc-item" data-id="${item.id}">
            <span class="vocab-num math-num">${i + 1}</span>
            <div class="vocab-body">
              <p class="vocab-q">${item.eq ? '解方程：' : ''}${item.q}</p>
              <input type="text" class="read-input math-calc-input" placeholder="填答案">
              <div class="vocab-result hidden"></div>
            </div>
          </div>`).join('')}
        <button type="button" class="btn btn-primary" id="checkMathCalc">✓ 检查计算</button>
        <div class="play-feedback" id="mathCalcFeedback"></div>
      </div>`;

    $('#checkMathCalc').onclick = () => {
      let ok = 0;
      all.forEach(item => {
        const row = $(`#mathPlayCalc [data-id="${item.id}"]`);
        const val = row.querySelector('.math-calc-input').value;
        const pass = matchAnswer(val, item);
        row.classList.toggle('vocab-correct', pass);
        row.classList.toggle('vocab-wrong', !pass);
        const r = row.querySelector('.vocab-result');
        r.classList.remove('hidden');
        r.textContent = pass ? '✓' : `✗ ${item.answer}（${item.explain}）`;
        if (pass) ok++;
      });
      const fb = $('#mathCalcFeedback');
      fb.className = 'play-feedback ' + (ok === all.length ? 'success' : 'error');
      fb.textContent = ok === all.length ? '🎉 全部正确！' : `得分 ${ok}/${all.length}`;
    };
  }

  function renderMathPlayWord() {
    const cats = [
      { key: '应用题', icon: '📝', label: '应用题思路（按单元）' },
      { key: '方法', icon: '🎯', label: '解题方法与技巧' }
    ];
    let html = '';
    cats.forEach(c => {
      const items = MATH_WORD.filter(w => (w.cat || '应用题') === c.key);
      if (!items.length) return;
      html += `<div class="word-section"><h3 class="word-section-title math-section-title">${c.icon} ${c.label} <span class="word-count">${items.length} 题</span></h3>`;
      html += items.map(w => `
        <div class="play-card word-card">
          <h4 class="play-card-title">${w.title}${w.unit ? ` <span class="unit-tag math-unit-tag">第${w.unit}单元</span>` : ''}</h4>
          ${w.paper ? `<span class="paper-tag">${w.paper}</span>` : ''}
          <p class="play-card-desc">${w.prompt}</p>
          <ol class="word-steps">
            ${w.steps.map(s => `<li>${s}</li>`).join('')}
          </ol>
        </div>`).join('');
      html += '</div>';
    });
    $('#mathPlayWord').innerHTML = html;
  }

  function renderMathPlayPick() {
    if (typeof MATH_PAPER_PICKS === 'undefined' || !window.renderPaperPicks) return;
    window.renderPaperPicks({
      listId: '#mathPlayPick',
      pagerId: '#mathPlayPickPager',
      picks: MATH_PAPER_PICKS,
      pageSize: 10,
      key: 'math-pick'
    });
  }

  function initMath() {
    loadMathProgress();
    renderMathHome();
    initMathLearnSelect();
    renderMathTopics();
    initMathFlashSelect();
    setupMathFlashControls();
    renderMathFlashcard();
    initMathQuizSetup();
    initMathPlayTabs();
    renderMathPlayFill();
    renderMathPlayJudge();
    renderMathPlayCalc();
    renderMathPlayWord();
    renderMathPlayPick();
    updateMathProgressUI();
  }

  window.initMath = initMath;
})();
