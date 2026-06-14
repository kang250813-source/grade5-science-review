(function () {
  'use strict';

  const STORAGE_KEY = 'science-review-progress';

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
    matchSelected: null,
    matchPairs: []
  };

  function loadProgress() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (saved) {
        state.completedTopics = saved.completedTopics || [];
        state.knownFlashcards = saved.knownFlashcards || [];
      }
    } catch (_) { /* ignore */ }
  }

  function saveProgress() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      completedTopics: state.completedTopics,
      knownFlashcards: state.knownFlashcards
    }));
    updateProgressUI();
  }

  function $(sel) { return document.querySelector(sel); }
  function $$(sel) { return document.querySelectorAll(sel); }

  function switchView(view) {
    state.currentView = view;
    $$('.view').forEach(v => v.classList.remove('active'));
    $$('.nav-btn').forEach(b => b.classList.remove('active'));
    $(`#view-${view}`).classList.add('active');
    $(`.nav-btn[data-view="${view}"]`).classList.add('active');
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
  function initFlashSelect() {
    const sel = $('#flashUnitSelect');
    sel.innerHTML = '<option value="all">全部单元</option>' +
      UNITS.map((u, i) => `<option value="${i}">第${i + 1}单元</option>`).join('');
    sel.addEventListener('change', () => {
      state.flashUnit = sel.value;
      state.flashIndex = 0;
      renderFlashcard();
    });
  }

  function getFilteredFlashcards() {
    if (state.flashUnit === 'all') return FLASHCARDS;
    return FLASHCARDS.filter(c => c.unit === +state.flashUnit);
  }

  function renderFlashcard() {
    const cards = getFilteredFlashcards();
    if (!cards.length) return;
    if (state.flashIndex >= cards.length) state.flashIndex = 0;
    const card = cards[state.flashIndex];
    const fc = $('#flashcard');
    fc.classList.remove('flipped');

    $('#flashTag').textContent = UNITS[card.unit].title;
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

  /* ── Play: Timeline ── */
  function initTimeline() {
    resetTimeline();
    $('#checkTimeline').addEventListener('click', checkTimeline);
    $('#resetTimeline').addEventListener('click', resetTimeline);
  }

  function resetTimeline() {
    const shuffled = shuffle(SHIP_TIMELINE);
    const slots = $('#timelineSlots');
    const pool = $('#timelinePool');
    $('#timelineFeedback').textContent = '';
    $('#timelineFeedback').className = 'play-feedback';

    slots.innerHTML = SHIP_TIMELINE.map((_, i) =>
      `<span class="slot-num">${i + 1}</span>`
    ).join('');

    pool.innerHTML = shuffled.map((name, i) =>
      `<div class="drag-item" draggable="true" data-name="${name}" data-idx="${i}">${name}</div>`
    ).join('');

    setupDragDrop(slots, pool);
  }

  function checkTimeline() {
    const slots = $('#timelineSlots');
    const items = [...slots.querySelectorAll('.drag-item')];
    let allCorrect = items.length === SHIP_TIMELINE.length;
    items.forEach((item, i) => {
      const correct = item.dataset.name === SHIP_TIMELINE[i];
      item.classList.toggle('correct-item', correct);
      item.classList.toggle('wrong-item', !correct);
      if (!correct) allCorrect = false;
    });
    const fb = $('#timelineFeedback');
    if (allCorrect) {
      fb.className = 'play-feedback success';
      fb.textContent = '🎉 完全正确！你记住了船的发展顺序。';
    } else {
      fb.className = 'play-feedback error';
      fb.textContent = '还有些位置不对，绿色是正确的，红色需要调整。点击「重置」再试一次。';
    }
  }

  /* ── Play: Food Chain ── */
  function initFoodChain() {
    state.chainIndex = 0;
    renderFoodChain();
    $('#checkChain').addEventListener('click', checkFoodChain);
    $('#nextChain').addEventListener('click', () => {
      state.chainIndex = (state.chainIndex + 1) % FOOD_CHAINS.length;
      renderFoodChain();
    });
  }

  function renderFoodChain() {
    const chain = FOOD_CHAINS[state.chainIndex];
    $('#chainScenario').textContent = `📋 ${chain.name}`;
    const shuffled = shuffle(chain.items);
    const slots = $('#chainSlots');
    const pool = $('#chainPool');
    $('#chainFeedback').textContent = '';
    $('#chainFeedback').className = 'play-feedback';

    slots.innerHTML = chain.items.map((_, i) => {
      const labels = ['生产者', '初级消费者', '次级消费者', '顶级消费者'];
      return `<span class="slot-num" title="${labels[i] || ''}">${i + 1}</span>`;
    }).join('');

    pool.innerHTML = shuffled.map(name =>
      `<div class="drag-item" draggable="true" data-name="${name}">${name}</div>`
    ).join('');

    setupDragDrop(slots, pool);
  }

  function checkFoodChain() {
    const chain = FOOD_CHAINS[state.chainIndex];
    const slots = $('#chainSlots');
    const items = [...slots.querySelectorAll('.drag-item')];
    let allCorrect = items.length === chain.items.length;
    items.forEach((item, i) => {
      const correct = item.dataset.name === chain.items[i];
      item.classList.toggle('correct-item', correct);
      item.classList.toggle('wrong-item', !correct);
      if (!correct) allCorrect = false;
    });
    const fb = $('#chainFeedback');
    if (allCorrect) {
      fb.className = 'play-feedback success';
      fb.textContent = '🎉 正确！' + chain.items.join(' → ');
    } else {
      fb.className = 'play-feedback error';
      fb.textContent = '顺序还不对，提示：从生产者（植物）开始，到顶级消费者结束。';
    }
  }

  /* ── Play: Match ── */
  function initMatch() {
    resetMatch();
    $('#resetMatch').addEventListener('click', resetMatch);
  }

  function resetMatch() {
    state.matchSelected = null;
    state.matchPairs = shuffle(MATCH_PAIRS);
    const terms = $('#matchTerms');
    const defs = $('#matchDefs');
    $('#matchFeedback').textContent = '';
    $('#matchFeedback').className = 'play-feedback';

    const shuffledDefs = shuffle(state.matchPairs.map(p => p.def));
    terms.innerHTML = state.matchPairs.map((p, i) =>
      `<div class="match-item" data-side="term" data-idx="${i}">${p.term}</div>`
    ).join('');
    defs.innerHTML = shuffledDefs.map((d, i) =>
      `<div class="match-item" data-side="def" data-def="${d}">${d}</div>`
    ).join('');

    $$('.match-item').forEach(item => {
      item.addEventListener('click', () => handleMatchClick(item));
    });
  }

  function handleMatchClick(item) {
    if (item.classList.contains('matched')) return;

    if (!state.matchSelected) {
      state.matchSelected = item;
      item.classList.add('selected');
      return;
    }

    if (state.matchSelected === item) {
      item.classList.remove('selected');
      state.matchSelected = null;
      return;
    }

    if (state.matchSelected.dataset.side === item.dataset.side) {
      state.matchSelected.classList.remove('selected');
      state.matchSelected = item;
      item.classList.add('selected');
      return;
    }

    const termEl = state.matchSelected.dataset.side === 'term' ? state.matchSelected : item;
    const defEl = state.matchSelected.dataset.side === 'def' ? state.matchSelected : item;
    const pair = state.matchPairs[+termEl.dataset.idx];
    const correct = pair.def === defEl.dataset.def;

    if (correct) {
      termEl.classList.remove('selected');
      termEl.classList.add('matched');
      defEl.classList.add('matched');
      state.matchSelected = null;

      const remaining = $$('.match-item:not(.matched)').length;
      if (remaining === 0) {
        $('#matchFeedback').className = 'play-feedback success';
        $('#matchFeedback').textContent = '🎉 全部配对正确！概念掌握得很棒！';
      }
    } else {
      termEl.classList.add('wrong-flash');
      defEl.classList.add('wrong-flash');
      setTimeout(() => {
        termEl.classList.remove('wrong-flash', 'selected');
        defEl.classList.remove('wrong-flash', 'selected');
      }, 500);
      state.matchSelected = null;
    }
  }

  /* ── Drag & Drop ── */
  function setupDragDrop(slotsContainer, poolContainer) {
    let dragged = null;

    function onDragStart(e) {
      dragged = e.target;
      e.dataTransfer.effectAllowed = 'move';
      setTimeout(() => dragged.style.opacity = '0.5', 0);
    }

    function onDragEnd() {
      if (dragged) dragged.style.opacity = '1';
      dragged = null;
    }

    function onDragOver(e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
    }

    function onDropSlot(e) {
      e.preventDefault();
      if (!dragged) return;
      const target = e.target.closest('.timeline-slots, .chain-slots') ? e.target : null;
      if (target && (target.classList.contains('drag-item') || target.classList.contains('slot-num') || target === slotsContainer)) {
        slotsContainer.appendChild(dragged);
        dragged.classList.add('placed');
      }
    }

    function onDropPool(e) {
      e.preventDefault();
      if (!dragged) return;
      poolContainer.appendChild(dragged);
      dragged.classList.remove('placed');
    }

    [poolContainer, slotsContainer].forEach(container => {
      container.addEventListener('dragover', onDragOver);
    });

    slotsContainer.addEventListener('drop', onDropSlot);
    poolContainer.addEventListener('drop', onDropPool);

    poolContainer.querySelectorAll('.drag-item').forEach(item => {
      item.addEventListener('dragstart', onDragStart);
      item.addEventListener('dragend', onDragEnd);
    });

    slotsContainer.addEventListener('dragstart', onDragStart);
    slotsContainer.addEventListener('dragend', onDragEnd);
  }

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
      btn.addEventListener('click', () => switchView(btn.dataset.view));
    });
  }

  /* ── Init ── */
  function init() {
    loadProgress();
    initNav();
    initLearnSelect();
    initFlashSelect();
    setupFlashControls();
    initQuizSetup();
    initTimeline();
    initFoodChain();
    initMatch();
    initPlayTabs();
    renderHome();
    renderTopics();
    renderFlashcard();
    updateProgressUI();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
