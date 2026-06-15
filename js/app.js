(function () {
  'use strict';

  const SUBJECT = 'science';

  function progressStore() {
    const g = GradeRegistry.getActiveGrade();
    return {
      load: () => GradeProgress.load(g, SUBJECT),
      save: data => GradeProgress.save(g, SUBJECT, data)
    };
  }

  let state = {
    completedTopics: [],
    knownFlashcards: [],
    currentView: 'home',
    flashIndex: 0,
    flashUnit: 'all',
    quizQuestions: [],
    quizIndex: 0,
    quizScore: 0,
    quizWrong: [],
    selectedQuizUnits: ['all'],
    chainIndex: 0,
    conceptQuestions: [],
    conceptIndex: 0,
    conceptScore: 0
  };

  function loadProgress() {
    try {
      const saved = progressStore().load();
      if (saved) {
        state.completedTopics = saved.completedTopics || [];
        state.knownFlashcards = saved.knownFlashcards || [];
      }
    } catch (_) { /* ignore */ }
  }

  function saveProgress() {
    progressStore().save({
      completedTopics: state.completedTopics,
      knownFlashcards: state.knownFlashcards
    });
    updateProgressUI();
  }

  function $(sel) { return document.querySelector(sel); }
  function $$(sel) { return document.querySelectorAll(sel); }

  function switchView(view) {
    state.currentView = view;
    $$('.view').forEach(v => v.classList.remove('active'));
    $$('.nav-btn').forEach(b => b.classList.remove('active'));
    const viewEl = $(`#view-${view}`);
    if (viewEl) viewEl.classList.add('active');
    $$(`.nav-btn[data-view="${view}"]`).forEach(b => b.classList.add('active'));
    if (view === 'eng-listening' && window.renderEngListening) window.renderEngListening();
    if (view !== 'eng-listening' && window.stopEngListening) window.stopEngListening();
    if (view === 'flashcard') renderFlashcard();
    if (view === 'math-flashcard' && window.refreshMathFlashcard) window.refreshMathFlashcard();
    if (view === 'eng-flashcard' && window.refreshEngFlashcard) window.refreshEngFlashcard();
    if (view === 'chi-flashcard' && window.refreshChiFlashcard) window.refreshChiFlashcard();
  }

  window.switchView = switchView;

  /* ── Subject switcher ── */
  let currentSubject = 'science';

  function switchSubject(subject) {
    currentSubject = subject;
    if (window.Shell) Shell.setCurrentSubject(subject);

    $$('.subject-btn').forEach(b => b.classList.toggle('active', b.dataset.subject === subject));

    $('#scienceNav').classList.toggle('hidden', subject !== 'science');
    $('#englishNav').classList.toggle('hidden', subject !== 'english');
    $('#mathNav').classList.toggle('hidden', subject !== 'math');
    $('#chineseNav').classList.toggle('hidden', subject !== 'chinese');
    $('#scienceProgress').classList.toggle('hidden', subject !== 'science');
    $('#englishProgress').classList.toggle('hidden', subject !== 'english');
    $('#mathProgress').classList.toggle('hidden', subject !== 'math');
    $('#chineseProgress').classList.toggle('hidden', subject !== 'chinese');

    if (window.Shell && document.body.classList.contains('study-mode')) {
      Shell.updateHeader(subject);
    }

    if (subject === 'science') {
      const v = state.currentView || 'home';
      switchView(v.startsWith('eng') || v.startsWith('math') || v.startsWith('chi') ? 'home' : v);
    } else if (subject === 'english') {
      switchView('eng-home');
    } else if (subject === 'math') {
      switchView('math-home');
    } else if (subject === 'chinese') {
      switchView('chi-home');
    }

    $$('.view').forEach(v => {
      if (v.id === 'view-portal-home') return;
      if (v.dataset.subject && v.dataset.subject !== subject) v.classList.remove('active');
    });
  }

  window.switchSubject = switchSubject;

  window.switchSubjectView = function (subject, view) {
    switchSubject(subject);
    switchView(view);
  };

  function initSubjectSwitcher() {
    $$('.subject-btn').forEach(btn => {
      btn.addEventListener('click', () => switchSubject(btn.dataset.subject));
    });
  }

  function updateProgressUI() {
    const totalTopics = getAllTopicIds().length;
    const completed = state.completedTopics.length;
    const pct = totalTopics ? Math.round((completed / totalTopics) * 100) : 0;
    $('#progressFill').style.width = pct + '%';
    $('#progressText').textContent = pct + '%';
  }

  /* ── Home ── */
  function renderHome() {
    const grid = $('#unitGrid');
    grid.innerHTML = UNITS.map((unit, i) => {
      const done = unit.topics.filter(t => state.completedTopics.includes(t.id)).length;
      const total = unit.topics.length;
      return `
        <div class="unit-card" data-unit="${i}">
          <div class="unit-num">${i + 1}</div>
          <h3>${unit.emoji} ${unit.title}</h3>
          <p>${total} 个知识点</p>
          <div class="unit-topics">${unit.topics.map(t => t.title).join(' · ')}</div>
          <div class="unit-progress">
            <span>已学 ${done}/${total}</span>
          </div>
        </div>`;
    }).join('');

    grid.querySelectorAll('.unit-card').forEach(card => {
      card.addEventListener('click', () => {
        const idx = +card.dataset.unit;
        switchView('learn');
        $('#learnUnitSelect').value = idx;
        renderTopics();
      });
    });

    const totalTopics = getAllTopicIds().length;
    const totalPoints = getTotalPoints();
    $('#statsRow').innerHTML = `
      <div class="stat-card"><div class="stat-num">4</div><div class="stat-label">单元</div></div>
      <div class="stat-card"><div class="stat-num">${totalTopics}</div><div class="stat-label">知识点</div></div>
      <div class="stat-card"><div class="stat-num">${totalPoints}</div><div class="stat-label">要点</div></div>
      <div class="stat-card"><div class="stat-num">${QUIZ_QUESTIONS.length}</div><div class="stat-label">测验题</div></div>`;
  }

  /* ── Learn ── */
  function initLearnSelect() {
    const sel = $('#learnUnitSelect');
    sel.innerHTML = '<option value="all">全部单元</option>' +
      UNITS.map((u, i) => `<option value="${i}">${u.title}</option>`).join('');
    sel.addEventListener('change', renderTopics);
    $('#learnSearch').addEventListener('input', renderTopics);
  }

  function renderTopics() {
    const unitVal = $('#learnUnitSelect').value;
    const search = $('#learnSearch').value.trim().toLowerCase();
    const list = $('#topicList');
    let html = '';

    UNITS.forEach((unit, ui) => {
      if (unitVal !== 'all' && +unitVal !== ui) return;
      unit.topics.forEach(topic => {
        const text = (topic.title + ' ' + topic.points.join(' ')).toLowerCase();
        if (search && !text.includes(search)) return;
        const done = state.completedTopics.includes(topic.id);
        html += `
          <div class="topic-card" data-id="${topic.id}">
            <div class="topic-header">
              <h3><span class="topic-badge">${unit.emoji} 单元${ui + 1}</span> ${topic.title}</h3>
              <span class="chevron">▼</span>
            </div>
            <div class="topic-body">
              <div class="topic-content">
                <ul class="point-list">
                  ${topic.points.map(p => `<li>${p}</li>`).join('')}
                </ul>
                <div class="topic-actions">
                  <button class="btn-done ${done ? 'completed' : ''}" data-id="${topic.id}">
                    ${done ? '✓ 已掌握' : '标记为已掌握'}
                  </button>
                </div>
              </div>
            </div>
          </div>`;
      });
    });

    list.innerHTML = html || '<p style="text-align:center;color:#5a6a7e;padding:2rem;">没有找到匹配的知识点</p>';

    list.querySelectorAll('.topic-header').forEach(h => {
      h.addEventListener('click', () => h.parentElement.classList.toggle('open'));
    });

    list.querySelectorAll('.btn-done').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const id = btn.dataset.id;
        const idx = state.completedTopics.indexOf(id);
        if (idx >= 0) state.completedTopics.splice(idx, 1);
        else state.completedTopics.push(id);
        saveProgress();
        renderTopics();
        renderHome();
      });
    });
  }

  /* ── Flashcards ── */
  let flashSelectBound = false;

  function initFlashSelect() {
    const sel = $('#flashUnitSelect');
    sel.innerHTML = '<option value="all">全部单元</option>' +
      UNITS.map((u, i) => `<option value="${i}">第${i + 1}单元</option>`).join('');
    state.flashUnit = 'all';
    state.flashIndex = 0;
    sel.value = 'all';
    if (!flashSelectBound) {
      flashSelectBound = true;
      sel.addEventListener('change', () => {
        state.flashUnit = sel.value;
        state.flashIndex = 0;
        renderFlashcard();
      });
    }
  }

  function getFilteredFlashcards() {
    if (state.flashUnit === 'all') return FLASHCARDS;
    return FLASHCARDS.filter(c => c.unit === +state.flashUnit);
  }

  function renderFlashcard() {
    const cards = getFilteredFlashcards();
    const fc = $('#flashcard');
    if (!cards.length) {
      fc.classList.remove('flipped');
      $('#flashTag').textContent = '暂无闪卡';
      $('#flashQuestion').textContent = '该单元暂无闪卡，请切换单元';
      $('#flashAnswer').textContent = '—';
      $('#flashCounter').textContent = '0 / 0';
      return;
    }
    if (state.flashIndex >= cards.length) state.flashIndex = 0;
    const card = cards[state.flashIndex];
    fc.classList.remove('flipped');

    const unitTitle = UNITS[card.unit] ? UNITS[card.unit].title : `第${card.unit + 1}单元`;
    $('#flashTag').textContent = unitTitle;
    $('#flashQuestion').textContent = card.q;
    $('#flashAnswer').textContent = card.a;
    $('#flashCounter').textContent = `${state.flashIndex + 1} / ${cards.length}`;
  }

  function setupFlashControls() {
    $('#flashcard').addEventListener('click', () => {
      $('#flashcard').classList.toggle('flipped');
    });

    $('#flashPrev').addEventListener('click', () => {
      const cards = getFilteredFlashcards();
      state.flashIndex = (state.flashIndex - 1 + cards.length) % cards.length;
      renderFlashcard();
    });

    $('#flashNext').addEventListener('click', () => {
      const cards = getFilteredFlashcards();
      state.flashIndex = (state.flashIndex + 1) % cards.length;
      renderFlashcard();
    });

    $('#flashKnow').addEventListener('click', () => {
      const cards = getFilteredFlashcards();
      const key = cards[state.flashIndex].q;
      if (!state.knownFlashcards.includes(key)) {
        state.knownFlashcards.push(key);
        saveProgress();
      }
      state.flashIndex = (state.flashIndex + 1) % cards.length;
      renderFlashcard();
    });
  }

  /* ── Quiz ── */
  function initQuizSetup() {
    const opts = $('#quizOptions');
    opts.innerHTML = `
      <button class="quiz-opt selected" data-unit="all">全部单元</button>
      ${UNITS.map((u, i) => `<button class="quiz-opt" data-unit="${i}">${u.emoji} 第${i + 1}单元</button>`).join('')}`;

    opts.querySelectorAll('.quiz-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.dataset.unit;
        if (val === 'all') {
          opts.querySelectorAll('.quiz-opt').forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
          state.selectedQuizUnits = ['all'];
        } else {
          opts.querySelector('[data-unit="all"]').classList.remove('selected');
          btn.classList.toggle('selected');
          const selected = [...opts.querySelectorAll('.quiz-opt.selected')].map(b => b.dataset.unit);
          state.selectedQuizUnits = selected.length ? selected : ['all'];
          if (!selected.length) opts.querySelector('[data-unit="all"]').classList.add('selected');
        }
      });
    });

    $('#startQuiz').addEventListener('click', startQuiz);
    $('#quizNext').addEventListener('click', nextQuizQuestion);
    $('#retryQuiz').addEventListener('click', () => {
      showQuizSection('setup');
    });
    $('#reviewWrong').addEventListener('click', () => {
      if (state.quizWrong.length) {
        state.quizQuestions = [...state.quizWrong];
        state.quizIndex = 0;
        state.quizScore = 0;
        state.quizWrong = [];
        showQuizSection('active');
        renderQuizQuestion();
      } else {
        showQuizSection('setup');
      }
    });
  }

  function getQuizPool() {
    if (state.selectedQuizUnits.includes('all')) return [...QUIZ_QUESTIONS];
    return QUIZ_QUESTIONS.filter(q => state.selectedQuizUnits.includes(String(q.unit)));
  }

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function startQuiz() {
    const pool = getQuizPool();
    state.quizQuestions = shuffle(pool).slice(0, Math.min(10, pool.length));
    state.quizIndex = 0;
    state.quizScore = 0;
    state.quizWrong = [];
    showQuizSection('active');
    renderQuizQuestion();
  }

  function showQuizSection(section) {
    $('#quizSetup').classList.toggle('hidden', section !== 'setup');
    $('#quizActive').classList.toggle('hidden', section !== 'active');
    $('#quizResult').classList.toggle('hidden', section !== 'result');
  }

  function renderQuizQuestion() {
    const q = state.quizQuestions[state.quizIndex];
    $('#quizProgress').textContent = `第 ${state.quizIndex + 1} / ${state.quizQuestions.length} 题`;
    $('#quizScore').textContent = `得分：${state.quizScore}`;
    $('#quizQuestion').textContent = q.q;
    $('#quizFeedback').classList.add('hidden');
    $('#quizNext').classList.add('hidden');

    const choices = $('#quizChoices');
    choices.innerHTML = q.options.map((opt, i) =>
      `<button class="quiz-choice" data-idx="${i}">${String.fromCharCode(65 + i)}. ${opt}</button>`
    ).join('');

    choices.querySelectorAll('.quiz-choice').forEach(btn => {
      btn.addEventListener('click', () => answerQuiz(+btn.dataset.idx));
    });
  }

  function answerQuiz(selected) {
    const q = state.quizQuestions[state.quizIndex];
    const correct = q.answer;
    const buttons = $$('#quizChoices .quiz-choice');

    buttons.forEach((btn, i) => {
      btn.disabled = true;
      if (i === correct) btn.classList.add('correct');
      else if (i === selected) btn.classList.add('wrong');
    });

    const fb = $('#quizFeedback');
    fb.classList.remove('hidden', 'correct-fb', 'wrong-fb');

    if (selected === correct) {
      state.quizScore++;
      fb.classList.add('correct-fb');
      fb.textContent = '✓ 回答正确！' + (q.explain ? ' ' + q.explain : '');
    } else {
      state.quizWrong.push(q);
      fb.classList.add('wrong-fb');
      fb.textContent = '✗ 正确答案是 ' + String.fromCharCode(65 + correct) + '。' + q.explain;
    }

    $('#quizScore').textContent = `得分：${state.quizScore}`;
    $('#quizNext').classList.remove('hidden');
    $('#quizNext').textContent = state.quizIndex + 1 >= state.quizQuestions.length ? '查看结果' : '下一题';
  }

  function nextQuizQuestion() {
    state.quizIndex++;
    if (state.quizIndex >= state.quizQuestions.length) {
      showQuizResult();
    } else {
      renderQuizQuestion();
    }
  }

  function showQuizResult() {
    showQuizSection('result');
    const total = state.quizQuestions.length;
    const score = state.quizScore;
    const pct = Math.round((score / total) * 100);

    $('#resultScore').textContent = `${score} / ${total}`;
    if (pct >= 90) {
      $('#resultEmoji').textContent = '🏆';
      $('#resultTitle').textContent = '太棒了！';
      $('#resultMessage').textContent = '你已经很好地掌握了这些知识，继续保持！';
    } else if (pct >= 70) {
      $('#resultEmoji').textContent = '🎉';
      $('#resultTitle').textContent = '不错哦！';
      $('#resultMessage').textContent = '大部分知识点已经掌握，再看看错题就更完美了。';
    } else if (pct >= 50) {
      $('#resultEmoji').textContent = '💪';
      $('#resultTitle').textContent = '继续加油！';
      $('#resultMessage').textContent = '还有一些知识点需要复习，建议先用闪卡记忆一遍。';
    } else {
      $('#resultEmoji').textContent = '📚';
      $('#resultTitle').textContent = '别灰心！';
      $('#resultMessage').textContent = '建议回到「知识点」模块仔细阅读，再用闪卡反复记忆。';
    }
  }

  /* ── Play: 下拉排序（通用） ── */
  function renderPickRows(containerId, options, labels) {
    const el = $(containerId);
    el.innerHTML = labels.map((label, i) => `
      <div class="pick-row" data-index="${i}">
        <span class="pick-label">${label}</span>
        <select class="pick-select" aria-label="${label}">
          <option value="">— 请选择 —</option>
          ${options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
        </select>
      </div>
    `).join('');

    el.querySelectorAll('.pick-select').forEach(sel => {
      sel.addEventListener('change', () => clearPickFeedback(containerId));
    });
  }

  function clearPickFeedback(containerId) {
    const fbId = containerId === '#timelineRows' ? '#timelineFeedback' : '#chainFeedback';
    const fb = $(fbId);
    if (fb) { fb.textContent = ''; fb.className = 'play-feedback'; }
    $(containerId).querySelectorAll('.pick-row').forEach(r => r.classList.remove('correct', 'wrong'));
    $(containerId).querySelectorAll('.pick-select').forEach(s => s.classList.remove('correct', 'wrong'));
  }

  function resetPickRows(containerId, feedbackId) {
    $(containerId).querySelectorAll('.pick-select').forEach(s => { s.value = ''; });
    const fb = $(feedbackId);
    if (fb) { fb.textContent = ''; fb.className = 'play-feedback'; }
    $(containerId).querySelectorAll('.pick-row').forEach(r => r.classList.remove('correct', 'wrong'));
    $(containerId).querySelectorAll('.pick-select').forEach(s => s.classList.remove('correct', 'wrong'));
  }

  function getPickValues(containerId) {
    return [...$(containerId).querySelectorAll('.pick-select')].map(s => s.value);
  }

  function checkPickRows(containerId, correctOrder, feedbackId) {
    const rows = $(containerId).querySelectorAll('.pick-row');
    const values = getPickValues(containerId);
    const fb = $(feedbackId);

    if (values.some(v => !v)) {
      fb.className = 'play-feedback error';
      fb.textContent = '还有没选完的行，请每一行都选一个答案。';
      return false;
    }

    const dup = values.length !== new Set(values).size;
    if (dup) {
      fb.className = 'play-feedback error';
      fb.textContent = '有重复的选项！每一行应该选不同的答案。';
      return false;
    }

    let allCorrect = true;
    rows.forEach((row, i) => {
      const sel = row.querySelector('.pick-select');
      const ok = values[i] === correctOrder[i];
      row.classList.toggle('correct', ok);
      row.classList.toggle('wrong', !ok);
      sel.classList.toggle('correct', ok);
      sel.classList.toggle('wrong', !ok);
      if (!ok) allCorrect = false;
    });

    if (allCorrect) {
      fb.className = 'play-feedback success';
      fb.textContent = '🎉 完全正确！太棒了！';
    } else {
      fb.className = 'play-feedback error';
      fb.textContent = '还有些不对，绿色是对的，红色需要改。也可以点「看正确答案」对照学习。';
    }
    return allCorrect;
  }

  function showPickAnswer(containerId, correctOrder, feedbackId) {
    const rows = $(containerId).querySelectorAll('.pick-row');
    rows.forEach((row, i) => {
      const sel = row.querySelector('.pick-select');
      sel.value = correctOrder[i];
      row.classList.add('correct');
      sel.classList.add('correct');
      row.classList.remove('wrong');
      sel.classList.remove('wrong');
    });
    const fb = $(feedbackId);
    fb.className = 'play-feedback info';
    fb.textContent = '📖 正确答案：' + correctOrder.join(' → ');
  }

  /* ── Play: Timeline ── */
  function initTimeline() {
    const labels = ['第1（最早）', '第2', '第3', '第4', '第5', '第6（最新）'];
    renderPickRows('#timelineRows', SHIP_TIMELINE, labels);
    $('#checkTimeline').addEventListener('click', () => checkPickRows('#timelineRows', SHIP_TIMELINE, '#timelineFeedback'));
    $('#resetTimeline').addEventListener('click', () => resetPickRows('#timelineRows', '#timelineFeedback'));
    $('#showTimelineAnswer').addEventListener('click', () => showPickAnswer('#timelineRows', SHIP_TIMELINE, '#timelineFeedback'));
  }

  /* ── Play: Food Chain ── */
  function initFoodChain() {
    state.chainIndex = 0;
    renderFoodChain();
    $('#checkChain').addEventListener('click', () => {
      const chain = FOOD_CHAINS[state.chainIndex];
      checkPickRows('#chainRows', chain.items, '#chainFeedback');
    });
    $('#nextChain').addEventListener('click', () => {
      state.chainIndex = (state.chainIndex + 1) % FOOD_CHAINS.length;
      renderFoodChain();
    });
    $('#showChainAnswer').addEventListener('click', () => {
      const chain = FOOD_CHAINS[state.chainIndex];
      showPickAnswer('#chainRows', chain.items, '#chainFeedback');
    });
  }

  function renderFoodChain() {
    const chain = FOOD_CHAINS[state.chainIndex];
    $('#chainScenario').innerHTML = `📋 <strong>${chain.name}</strong>：从生产者到顶级消费者，每一行选一种生物`;
    const labels = ['🌱 生产者', '🐛 初级消费者', '🐸 次级消费者', '🦅 顶级消费者'];
    renderPickRows('#chainRows', chain.items, labels.slice(0, chain.items.length));
    resetPickRows('#chainRows', '#chainFeedback');
  }

  /* ── Play: 概念闯关（选择题） ── */
  function buildConceptQuestions() {
    return MATCH_PAIRS.map(p => {
      const wrong = shuffle(MATCH_PAIRS.filter(x => x.term !== p.term).map(x => x.def)).slice(0, 3);
      const options = shuffle([p.def, ...wrong]);
      return {
        term: p.term,
        q: `「${p.term}」的意思是？`,
        options,
        answer: options.indexOf(p.def),
        explain: p.def
      };
    });
  }

  function initConceptQuiz() {
    $('#resetConcept').addEventListener('click', startConceptQuiz);
    $('#conceptNext').addEventListener('click', nextConceptQuestion);
    startConceptQuiz();
  }

  function startConceptQuiz() {
    state.conceptQuestions = shuffle(buildConceptQuestions());
    state.conceptIndex = 0;
    state.conceptScore = 0;
    $('#conceptNext').classList.add('hidden');
    renderConceptQuestion();
  }

  function renderConceptQuestion() {
    const total = state.conceptQuestions.length;
    const q = state.conceptQuestions[state.conceptIndex];
    $('#conceptProgress').textContent = `${state.conceptIndex + 1} / ${total}`;
    $('#conceptQuestion').textContent = q.q;
    $('#conceptFeedback').textContent = '';
    $('#conceptFeedback').className = 'play-feedback';
    $('#conceptNext').classList.add('hidden');

    const opts = $('#conceptOptions');
    opts.innerHTML = q.options.map((opt, i) =>
      `<button type="button" class="mini-opt" data-idx="${i}">${String.fromCharCode(65 + i)}. ${opt}</button>`
    ).join('');

    opts.querySelectorAll('.mini-opt').forEach(btn => {
      btn.addEventListener('click', () => answerConcept(+btn.dataset.idx));
    });
  }

  function answerConcept(selected) {
    const q = state.conceptQuestions[state.conceptIndex];
    const buttons = $$('#conceptOptions .mini-opt');

    buttons.forEach((btn, i) => {
      btn.disabled = true;
      if (i === q.answer) btn.classList.add('correct');
      else if (i === selected) btn.classList.add('wrong');
    });

    const fb = $('#conceptFeedback');
    if (selected === q.answer) {
      state.conceptScore++;
      fb.className = 'play-feedback success';
      fb.textContent = '✓ 回答正确！';
    } else {
      fb.className = 'play-feedback error';
      fb.textContent = `✗ 正确答案是：${q.explain}`;
    }

    const isLast = state.conceptIndex + 1 >= state.conceptQuestions.length;
    $('#conceptNext').classList.remove('hidden');
    $('#conceptNext').textContent = isLast ? '查看成绩' : '下一题 →';
  }

  function nextConceptQuestion() {
    state.conceptIndex++;
    if (state.conceptIndex >= state.conceptQuestions.length) {
      showConceptResult();
    } else {
      renderConceptQuestion();
    }
  }

  function showConceptResult() {
    const total = state.conceptQuestions.length;
    const score = state.conceptScore;
    $('#conceptProgress').textContent = '完成';
    $('#conceptQuestion').textContent = '闯关结束！';
    $('#conceptOptions').innerHTML = '';
    const pct = Math.round((score / total) * 100);
    let msg = `得分：${score} / ${total}`;
    if (pct >= 90) msg += ' 🏆 概念掌握得非常棒！';
    else if (pct >= 70) msg += ' 🎉 不错，再看看错题就更好了！';
    else msg += ' 💪 建议回到「知识点」和「闪卡」再复习一下。';
    $('#conceptFeedback').className = 'play-feedback ' + (pct >= 70 ? 'success' : 'info');
    $('#conceptFeedback').textContent = msg;
    $('#conceptNext').classList.add('hidden');
  }

  /* ── 卷面精选分页（语文 / 数学 / 英语共用） ── */
  const pickPagerState = {};

  function renderPaperPicks(opts) {
    const { listId, pagerId, picks, pageSize = 10, key } = opts;
    if (!picks || !picks.length) return;

    const listEl = $(listId);
    const pagerEl = pagerId ? $(pagerId) : null;
    if (!listEl) return;

    const stateKey = key || listId;
    if (!pickPagerState[stateKey]) pickPagerState[stateKey] = { page: 0 };
    const st = pickPagerState[stateKey];

    const total = picks.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    if (st.page >= totalPages) st.page = totalPages - 1;
    if (st.page < 0) st.page = 0;

    const start = st.page * pageSize;
    const slice = picks.slice(start, start + pageSize);

    listEl.innerHTML = slice.map((item, i) => {
      const idx = start + i;
      return `
      <div class="read-item pick-item" data-id="${item.id}">
        <span class="paper-tag">${item.paper}</span>
        <p>${idx + 1}. ${item.q}</p>
        <div class="read-opts">
          ${item.options.map((o, j) =>
            `<button type="button" class="read-opt pick-opt" data-i="${idx}" data-j="${j}">${String.fromCharCode(65 + j)}. ${o}</button>`
          ).join('')}
        </div>
        <div class="read-result hidden"></div>
      </div>`;
    }).join('');

    listEl.querySelectorAll('.pick-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        const qi = +btn.dataset.i;
        const sel = +btn.dataset.j;
        const q = picks[qi];
        const item = btn.closest('.pick-item');
        item.querySelectorAll('.pick-opt').forEach((b, j) => {
          b.disabled = true;
          b.classList.toggle('correct', j === q.answer);
          b.classList.toggle('wrong', j === sel && sel !== q.answer);
        });
        const r = item.querySelector('.read-result');
        r.classList.remove('hidden');
        r.className = 'read-result ' + (sel === q.answer ? 'success' : 'error');
        r.textContent = (sel === q.answer ? '✓ ' : '✗ ') + q.explain;
      });
    });

    if (!pagerEl) return;

    const from = start + 1;
    const to = Math.min(start + pageSize, total);
    pagerEl.innerHTML = `
      <div class="pick-pager">
        <button type="button" class="btn btn-secondary pick-page-btn" data-dir="prev"${st.page === 0 ? ' disabled' : ''}>← 上一页</button>
        <span class="pick-page-info">第 ${st.page + 1} / ${totalPages} 页 · ${from}–${to} / ${total} 题</span>
        <button type="button" class="btn btn-secondary pick-page-btn" data-dir="next"${st.page >= totalPages - 1 ? ' disabled' : ''}>下一页 →</button>
      </div>`;

    pagerEl.querySelectorAll('.pick-page-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.disabled) return;
        if (btn.dataset.dir === 'prev') st.page--;
        else st.page++;
        renderPaperPicks(opts);
        pagerEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    });
  }

  window.renderPaperPicks = renderPaperPicks;

  /* ── Play tabs ── */
  function initPlayTabs() {
    $$('.play-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        $$('.play-tab').forEach(t => t.classList.remove('active'));
        $$('.play-panel').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        $(`#play-${tab.dataset.play}`).classList.add('active');
      });
    });
  }

  /* ── Nav ── */
  function initNav() {
    $$('.nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const sub = btn.dataset.subject;
        if (sub && sub !== currentSubject) switchSubject(sub);
        switchView(btn.dataset.view);
      });
    });
  }

  function initScience() {
    loadProgress();
    if (!window._scienceUiReady) {
      initSubjectSwitcher();
      initNav();
      setupFlashControls();
      initQuizSetup();
      initTimeline();
      initFoodChain();
      initConceptQuiz();
      initPlayTabs();
      window._scienceUiReady = true;
    }
    initLearnSelect();
    initFlashSelect();
    renderHome();
    renderTopics();
    renderFlashcard();
    updateProgressUI();
  }

  window.initScience = initScience;
  window.refreshScienceFlashcard = renderFlashcard;

})();
