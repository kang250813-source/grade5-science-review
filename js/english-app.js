(function () {
  'use strict';

  const STORAGE_KEY = 'english-review-progress';

  let engState = {
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
    return (s || '').trim().toLowerCase().replace(/['']/g, "'");
  }

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function loadEngProgress() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (saved) {
        engState.completedTopics = saved.completedTopics || [];
        engState.knownFlashcards = saved.knownFlashcards || [];
      }
    } catch (_) { /* ignore */ }
  }

  function saveEngProgress() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      completedTopics: engState.completedTopics,
      knownFlashcards: engState.knownFlashcards
    }));
    updateEngProgressUI();
  }

  function updateEngProgressUI() {
    const total = getEngAllTopicIds().length;
    const done = engState.completedTopics.length;
    const pct = total ? Math.round((done / total) * 100) : 0;
    const fill = $('#engProgressFill');
    const text = $('#engProgressText');
    if (fill) fill.style.width = pct + '%';
    if (text) text.textContent = pct + '%';
  }

  /* ── 首页 ── */
  function renderEngHome() {
    $('#engHeroTitle').textContent = '欢迎来复习英语！';
    $('#engExamTitle').textContent = ENGLISH_EXAM.title;
    $('#engExamNote').textContent = ENGLISH_EXAM.note;

    $('#engUnitGrid').innerHTML = ENG_UNITS.map((unit, i) => {
      const done = unit.topics.filter(t => engState.completedTopics.includes(t.id)).length;
      const total = unit.topics.length;
      return `
        <div class="unit-card eng-card" data-unit="${i}">
          <div class="unit-num">${i + 1}</div>
          <h3>${unit.emoji} ${unit.title}</h3>
          <p>${total} 个知识点</p>
          <div class="unit-topics">${unit.topics.map(t => t.title).join(' · ')}</div>
          <div class="unit-progress"><span>已学 ${done}/${total}</span></div>
        </div>`;
    }).join('');

    $$('#engUnitGrid .eng-card').forEach(card => {
      card.addEventListener('click', () => {
        if (window.switchSubjectView) {
          window.switchSubjectView('english', 'eng-learn');
          $('#engLearnUnitSelect').value = card.dataset.unit;
          renderEngTopics();
        }
      });
    });

    $('#engStatsRow').innerHTML = `
      <div class="stat-card"><div class="stat-num">${ENG_UNITS.length}</div><div class="stat-label">单元</div></div>
      <div class="stat-card"><div class="stat-num">${getEngAllTopicIds().length}</div><div class="stat-label">知识点</div></div>
      <div class="stat-card"><div class="stat-num">${getEngTotalPoints()}</div><div class="stat-label">要点</div></div>
      <div class="stat-card"><div class="stat-num">${ENG_QUIZ_QUESTIONS.length}</div><div class="stat-label">测验题</div></div>`;
  }

  /* ── 知识点 ── */
  function initEngLearnSelect() {
    const sel = $('#engLearnUnitSelect');
    sel.innerHTML = '<option value="all">全部单元</option>' +
      ENG_UNITS.map((u, i) => `<option value="${i}">${u.title}</option>`).join('');
    sel.addEventListener('change', renderEngTopics);
    $('#engLearnSearch').addEventListener('input', renderEngTopics);
  }

  function renderEngTopics() {
    const unitVal = $('#engLearnUnitSelect').value;
    const search = $('#engLearnSearch').value.trim().toLowerCase();
    const list = $('#engTopicList');
    let html = '';

    ENG_UNITS.forEach((unit, ui) => {
      if (unitVal !== 'all' && +unitVal !== ui) return;
      unit.topics.forEach(topic => {
        const text = (topic.title + ' ' + topic.points.join(' ')).toLowerCase();
        if (search && !text.includes(search)) return;
        const done = engState.completedTopics.includes(topic.id);
        html += `
          <div class="topic-card" data-id="${topic.id}">
            <div class="topic-header">
              <h3><span class="topic-badge eng-badge">${unit.emoji} 单元${ui + 1}</span> ${topic.title}</h3>
              <span class="chevron">▼</span>
            </div>
            <div class="topic-body">
              <div class="topic-content">
                <ul class="point-list eng-points">
                  ${topic.points.map(p => `<li>${p}</li>`).join('')}
                </ul>
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
        const idx = engState.completedTopics.indexOf(id);
        if (idx >= 0) engState.completedTopics.splice(idx, 1);
        else engState.completedTopics.push(id);
        saveEngProgress();
        renderEngTopics();
        renderEngHome();
      });
    });
  }

  /* ── 闪卡 ── */
  function initEngFlashSelect() {
    const sel = $('#engFlashUnitSelect');
    sel.innerHTML = '<option value="all">全部单元</option>' +
      ENG_UNITS.map((u, i) => `<option value="${i}">第${i + 1}单元</option>`).join('');
    sel.addEventListener('change', () => {
      engState.flashUnit = sel.value;
      engState.flashIndex = 0;
      renderEngFlashcard();
    });
  }

  function getFilteredEngFlash() {
    if (engState.flashUnit === 'all') return ENG_FLASHCARDS;
    return ENG_FLASHCARDS.filter(c => c.unit === +engState.flashUnit);
  }

  function renderEngFlashcard() {
    const cards = getFilteredEngFlash();
    if (!cards.length) return;
    if (engState.flashIndex >= cards.length) engState.flashIndex = 0;
    const card = cards[engState.flashIndex];
    $('#engFlashcard').classList.remove('flipped');
    $('#engFlashTag').textContent = ENG_UNITS[card.unit].title;
    $('#engFlashQuestion').textContent = card.q;
    $('#engFlashAnswer').textContent = card.a;
    $('#engFlashCounter').textContent = `${engState.flashIndex + 1} / ${cards.length}`;
  }

  function setupEngFlashControls() {
    $('#engFlashcard').addEventListener('click', () => {
      $('#engFlashcard').classList.toggle('flipped');
    });
    $('#engFlashPrev').addEventListener('click', () => {
      const cards = getFilteredEngFlash();
      engState.flashIndex = (engState.flashIndex - 1 + cards.length) % cards.length;
      renderEngFlashcard();
    });
    $('#engFlashNext').addEventListener('click', () => {
      const cards = getFilteredEngFlash();
      engState.flashIndex = (engState.flashIndex + 1) % cards.length;
      renderEngFlashcard();
    });
    $('#engFlashKnow').addEventListener('click', () => {
      const cards = getFilteredEngFlash();
      const key = cards[engState.flashIndex].q;
      if (!engState.knownFlashcards.includes(key)) {
        engState.knownFlashcards.push(key);
        saveEngProgress();
      }
      engState.flashIndex = (engState.flashIndex + 1) % cards.length;
      renderEngFlashcard();
    });
  }

  /* ── 测验 ── */
  function initEngQuizSetup() {
    const opts = $('#engQuizOptions');
    opts.innerHTML = `
      <button type="button" class="quiz-opt selected" data-unit="all">全部单元</button>
      ${ENG_UNITS.map((u, i) => `<button type="button" class="quiz-opt" data-unit="${i}">${u.emoji} 第${i + 1}单元</button>`).join('')}`;

    opts.querySelectorAll('.quiz-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.dataset.unit;
        if (val === 'all') {
          opts.querySelectorAll('.quiz-opt').forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
          engState.selectedQuizUnits = ['all'];
        } else {
          opts.querySelector('[data-unit="all"]').classList.remove('selected');
          btn.classList.toggle('selected');
          const selected = [...opts.querySelectorAll('.quiz-opt.selected')].map(b => b.dataset.unit);
          engState.selectedQuizUnits = selected.length ? selected : ['all'];
          if (!selected.length) opts.querySelector('[data-unit="all"]').classList.add('selected');
        }
      });
    });

    $('#startEngQuiz').addEventListener('click', startEngQuiz);
    $('#engQuizNext').addEventListener('click', nextEngQuiz);
    $('#retryEngQuiz').addEventListener('click', () => showEngQuizSection('setup'));
    $('#reviewEngWrong').addEventListener('click', () => {
      if (engState.quizWrong.length) {
        engState.quizQuestions = [...engState.quizWrong];
        engState.quizIndex = 0;
        engState.quizScore = 0;
        engState.quizWrong = [];
        showEngQuizSection('active');
        renderEngQuizQ();
      } else showEngQuizSection('setup');
    });
  }

  function getEngQuizPool() {
    if (engState.selectedQuizUnits.includes('all')) return [...ENG_QUIZ_QUESTIONS];
    return ENG_QUIZ_QUESTIONS.filter(q => engState.selectedQuizUnits.includes(String(q.unit)));
  }

  function startEngQuiz() {
    const pool = getEngQuizPool();
    engState.quizQuestions = shuffle(pool).slice(0, Math.min(10, pool.length));
    engState.quizIndex = 0;
    engState.quizScore = 0;
    engState.quizWrong = [];
    showEngQuizSection('active');
    renderEngQuizQ();
  }

  function showEngQuizSection(section) {
    $('#engQuizSetup').classList.toggle('hidden', section !== 'setup');
    $('#engQuizActive').classList.toggle('hidden', section !== 'active');
    $('#engQuizResult').classList.toggle('hidden', section !== 'result');
  }

  function renderEngQuizQ() {
    const q = engState.quizQuestions[engState.quizIndex];
    $('#engQuizProgress').textContent = `第 ${engState.quizIndex + 1} / ${engState.quizQuestions.length} 题`;
    $('#engQuizScore').textContent = `得分：${engState.quizScore}`;
    $('#engQuizQuestion').textContent = q.q;
    $('#engQuizFeedback').classList.add('hidden');
    $('#engQuizNext').classList.add('hidden');

    $('#engQuizChoices').innerHTML = q.options.map((opt, i) =>
      `<button type="button" class="quiz-choice" data-idx="${i}">${String.fromCharCode(65 + i)}. ${opt}</button>`
    ).join('');

    $$('#engQuizChoices .quiz-choice').forEach(btn => {
      btn.addEventListener('click', () => answerEngQuiz(+btn.dataset.idx));
    });
  }

  function answerEngQuiz(selected) {
    const q = engState.quizQuestions[engState.quizIndex];
    $$('#engQuizChoices .quiz-choice').forEach((btn, i) => {
      btn.disabled = true;
      if (i === q.answer) btn.classList.add('correct');
      else if (i === selected) btn.classList.add('wrong');
    });
    const fb = $('#engQuizFeedback');
    fb.classList.remove('hidden', 'correct-fb', 'wrong-fb');
    if (selected === q.answer) {
      engState.quizScore++;
      fb.classList.add('correct-fb');
      fb.textContent = '✓ 正确！' + q.explain;
    } else {
      engState.quizWrong.push(q);
      fb.classList.add('wrong-fb');
      fb.textContent = '✗ ' + String.fromCharCode(65 + q.answer) + '. ' + q.explain;
    }
    $('#engQuizScore').textContent = `得分：${engState.quizScore}`;
    $('#engQuizNext').classList.remove('hidden');
    $('#engQuizNext').textContent = engState.quizIndex + 1 >= engState.quizQuestions.length ? '查看结果' : '下一题';
  }

  function nextEngQuiz() {
    engState.quizIndex++;
    if (engState.quizIndex >= engState.quizQuestions.length) showEngQuizResult();
    else renderEngQuizQ();
  }

  function showEngQuizResult() {
    showEngQuizSection('result');
    const s = engState.quizScore, t = engState.quizQuestions.length;
    const pct = Math.round((s / t) * 100);
    $('#engResultScore').textContent = `${s} / ${t}`;
    $('#engResultEmoji').textContent = pct >= 90 ? '🏆' : pct >= 70 ? '🎉' : '💪';
    $('#engResultTitle').textContent = pct >= 90 ? '太棒了！' : pct >= 70 ? '不错哦！' : '继续加油！';
    $('#engResultMessage').textContent = pct >= 70
      ? '英语知识点掌握得不错，可以用闪卡再巩固一下。'
      : '建议回到「知识点」仔细阅读，再用闪卡记忆。';
  }

  /* ── 趣味互动 ── */
  function initEngPlayTabs() {
    $$('#view-eng-play .play-tabs:first-child .play-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        $$('#view-eng-play > .play-tabs:first-child .play-tab').forEach(t => t.classList.remove('active'));
        $$('#view-eng-play > .play-panel').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        $(`#eng-play-${tab.dataset.play}`).classList.add('active');
      });
    });

    $$('#eng-play-reading .read-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        $$('#eng-play-reading .read-tab').forEach(t => t.classList.remove('active'));
        $$('#read-play-myopia, #read-play-tea').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        $(`#read-play-${tab.dataset.read}`).classList.add('active');
      });
    });
  }

  function renderBlankInputs(text, count) {
    let html = text;
    for (let i = 0; i < (count || 1); i++) {
      html = html.replace('______', `<input type="text" class="vocab-input" data-part="${i}" autocomplete="off">`);
    }
    return html;
  }

  function checkVocabRow(row, item) {
    const inputs = $$('.vocab-input', row);
    if (item.multi) {
      const parts = item.answer.split(',').map(norm);
      return parts.every((p, i) => norm(inputs[i]?.value) === p);
    }
    const val = inputs[0]?.value || '';
    if (item.full) return norm(val) === norm(item.full) || norm(val) === norm(item.answer);
    return norm(val) === norm(item.answer);
  }

  function renderEngPlayVocab() {
    const groups = [
      { id: 'a', title: '选词填空', items: ENG_VOCAB_A },
      { id: 'b', title: '词形填空', items: ENG_VOCAB_B },
      { id: 'c', title: '首字母填空', items: ENG_VOCAB_C }
    ];
    $('#engPlayVocab').innerHTML = groups.map(g => `
      <div class="vocab-group">
        <h4>${g.title}</h4>
        ${g.items.map((item, i) => {
          const blanks = (item.q.match(/______/g) || []).length || 1;
          return `<div class="vocab-item" data-gid="${g.id}" data-id="${item.id}">
            <span class="vocab-num">${i + 1}</span>
            <div class="vocab-body">
              <p class="vocab-q">${renderBlankInputs(item.q, blanks)}</p>
              ${item.hint ? `<span class="vocab-hint">${item.hint}</span>` : ''}
              ${item.base ? `<span class="vocab-hint">所给词：${item.base}</span>` : ''}
              <div class="vocab-result hidden"></div>
            </div>
          </div>`;
        }).join('')}
        <button type="button" class="btn btn-primary vocab-check-btn" data-gid="${g.id}">检查${g.title}</button>
      </div>`).join('');

    $$('#engPlayVocab .vocab-check-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const gid = btn.dataset.gid;
        const items = gid === 'a' ? ENG_VOCAB_A : gid === 'b' ? ENG_VOCAB_B : ENG_VOCAB_C;
        let ok = 0;
        items.forEach(item => {
          const row = $(`#engPlayVocab [data-gid="${gid}"][data-id="${item.id}"]`);
          const pass = checkVocabRow(row, item);
          row.classList.toggle('vocab-correct', pass);
          row.classList.toggle('vocab-wrong', !pass);
          const r = row.querySelector('.vocab-result');
          r.classList.remove('hidden');
          r.textContent = pass ? '✓' : `✗ ${item.full || item.answer.replace(',', '/')}`;
          if (pass) ok++;
        });
        btn.nextElementSibling?.remove();
        const fb = document.createElement('p');
        fb.className = 'play-feedback ' + (ok === items.length ? 'success' : 'error');
        fb.textContent = `${ok}/${items.length}`;
        btn.after(fb);
      });
    });
  }

  function renderEngDialogue() {
    const d = ENG_DIALOGUE;
    $('#engDialogueLines').innerHTML = d.lines.map(line => {
      if (line.blank) {
        const extra = line.text ? `<span>${line.text}</span> ` : '';
        return `<div class="dialogue-line"><strong>${line.speaker}:</strong> ${extra}
          <select class="dialogue-select" data-blank="${line.blank}">
            <option value="">—选择—</option>
            ${d.options.map(o => `<option value="${o.id}">${o.id}. ${o.text}</option>`).join('')}
          </select></div>`;
      }
      return `<div class="dialogue-line"><strong>${line.speaker}:</strong> ${line.text}</div>`;
    }).join('');

    $('#checkEngDialogue').onclick = () => {
      let ok = 0;
      d.blanks.forEach(b => {
        const sel = $(`.dialogue-select[data-blank="${b.id}"]`);
        const pass = sel.value === b.answer;
        sel.classList.toggle('correct', pass);
        sel.classList.toggle('wrong', !pass);
        if (pass) ok++;
      });
      const fb = $('#engDialogueFeedback');
      fb.className = 'play-feedback ' + (ok === d.blanks.length ? 'success' : 'error');
      fb.textContent = ok === d.blanks.length ? '🎉 全部正确！' : `得分 ${ok}/${d.blanks.length}`;
    };
  }

  function renderEngPlayReading() {
    $('#engPlayMyopiaPassage').textContent = ENG_READING_MYOPIA.passage;
    $('#engPlayTeaPassage').textContent = ENG_READING_TEA.passage;

    $('#engPlayMyopiaQ').innerHTML = ENG_READING_MYOPIA.questions.map((q, i) => {
      if (q.type === 'fill') {
        return `<div class="read-item"><p>${i + 1}. ${q.q}</p>
          <input type="text" class="read-input" id="myopiaFill">
          <div class="read-result hidden" id="myopiaFillResult"></div></div>`;
      }
      return `<div class="read-item"><p>${i + 1}. ${q.q}</p>
        <div class="read-opts">${q.options.map((o, j) =>
          `<button type="button" class="read-opt" data-i="${i}" data-j="${j}">${String.fromCharCode(65 + j)}. ${o}</button>`
        ).join('')}</div><div class="read-result hidden"></div></div>`;
    }).join('');

    $$('#engPlayMyopiaQ .read-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        const qi = +btn.dataset.i, sel = +btn.dataset.j;
        const q = ENG_READING_MYOPIA.questions[qi];
        const item = btn.closest('.read-item');
        item.querySelectorAll('.read-opt').forEach((b, j) => {
          b.disabled = true;
          b.classList.toggle('correct', j === q.answer);
          b.classList.toggle('wrong', +b.dataset.j === sel && sel !== q.answer);
        });
        const r = item.querySelector('.read-result');
        r.className = 'read-result ' + (sel === q.answer ? 'success' : 'error');
        r.textContent = q.explain || (sel === q.answer ? '✓' : '✗');
      });
    });

    $('#checkMyopiaFillBtn').onclick = () => {
      const q = ENG_READING_MYOPIA.questions.find(x => x.type === 'fill');
      const val = norm($('#myopiaFill').value);
      const ok = q.accept.some(a => norm(a) === val);
      const r = $('#myopiaFillResult');
      r.className = 'read-result ' + (ok ? 'success' : 'error');
      r.textContent = ok ? '✓ two hours' : '✗ two hours';
    };

    $('#engPlayTeaQ').innerHTML = ENG_READING_TEA.questions.map((q, i) => `
      <div class="read-item"><p>${i + 1}. ${q.q}</p>
        <div class="tf-btns">
          <button type="button" class="tf-btn" data-i="${i}" data-v="true">T</button>
          <button type="button" class="tf-btn" data-i="${i}" data-v="false">F</button>
        </div><div class="read-result hidden"></div></div>`).join('');

    $$('#engPlayTeaQ .tf-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const qi = +btn.dataset.i;
        const sel = btn.dataset.v === 'true';
        const q = ENG_READING_TEA.questions[qi];
        const item = btn.closest('.read-item');
        item.querySelectorAll('.tf-btn').forEach(b => {
          b.disabled = true;
          b.classList.toggle('correct', (b.dataset.v === 'true') === q.answer);
        });
        const r = item.querySelector('.read-result');
        r.className = 'read-result ' + (sel === q.answer ? 'success' : 'error');
        r.textContent = sel === q.answer ? '✓' : '✗';
      });
    });
  }

  function renderEngPlayWriting() {
    $('#engPlayWritingPrompt').textContent = ENG_WRITING.prompt;
    $('#engPlayWritingTemplate').textContent = ENG_WRITING.template;
    $('#engPlayWritingExamples').innerHTML = ENG_WRITING.examples.map(e =>
      `<div class="writing-example"><p>${e.sentence}</p></div>`).join('');
  }

  function initEnglish() {
    loadEngProgress();
    renderEngHome();
    initEngLearnSelect();
    renderEngTopics();
    initEngFlashSelect();
    setupEngFlashControls();
    renderEngFlashcard();
    initEngQuizSetup();
    initEngPlayTabs();
    renderEngPlayVocab();
    renderEngDialogue();
    renderEngPlayReading();
    renderEngPlayWriting();
    updateEngProgressUI();
  }

  window.initEnglish = initEnglish;
})();
