(function () {
  'use strict';

  const SUBJECT = 'english';

  function progressStore() {
    const g = GradeRegistry.getActiveGrade();
    return {
      load: () => GradeProgress.load(g, SUBJECT),
      save: data => GradeProgress.save(g, SUBJECT, data)
    };
  }

  let engState = {
    completedTopics: [],
    knownFlashcards: [],
    flashIndex: 0,
    flashUnit: 'all',
    quizQuestions: [],
    quizIndex: 0,
    quizScore: 0,
    quizWrong: [],
    selectedQuizUnits: ['all'],
    listenIndex: 0,
    listenPlaying: false
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
      const saved = progressStore().load();
      if (saved) {
        engState.completedTopics = saved.completedTopics || [];
        engState.knownFlashcards = saved.knownFlashcards || [];
      }
    } catch (_) { /* ignore */ }
  }

  function saveEngProgress() {
    progressStore().save({
      completedTopics: engState.completedTopics,
      knownFlashcards: engState.knownFlashcards
    });
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
      <div class="stat-card"><div class="stat-num">${typeof ENG_SOURCES !== 'undefined' ? ENG_SOURCES.length : 1}</div><div class="stat-label">参考试卷</div></div>`;

    if (typeof ENG_EXAM_SECTIONS !== 'undefined') {
      $('#engExamSections').innerHTML = `
        <h3 class="section-title eng-section-title">📋 试卷题型结构</h3>
        <div class="exam-sections-row">
          ${ENG_EXAM_SECTIONS.map(s => `
            <div class="exam-section-card eng-exam-card">
              <span class="exam-section-icon">${s.icon}</span>
              <strong>${s.title}</strong>
              <p>${s.desc}</p>
            </div>`).join('')}
        </div>`;
    }

    if (typeof ENG_SOURCES !== 'undefined') {
      $('#engSourcesGrid').innerHTML = ENG_SOURCES.map(s =>
        `<span class="paper-chip eng-paper-chip" title="${s.name}">${s.region} · ${s.name.slice(0, 20)}</span>`
      ).join('');
    }

    if (typeof ENG_COMMON_MISTAKES !== 'undefined') {
      $('#engMistakesBlock').innerHTML = `
        <h3 class="section-title eng-section-title">⚠️ 单元易错点（亮点给力汇总）</h3>
        <div class="eng-mistakes-grid">
          ${ENG_COMMON_MISTAKES.map(m => `
            <div class="eng-mistake-card">
              <strong>Unit ${m.unit} · ${m.topic}</strong>
              <p>${m.tip}</p>
            </div>`).join('')}
        </div>`;
    }
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
        const examples = typeof getEngExamples === 'function' ? getEngExamples(topic.id) : [];
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
                ${examples.length ? `
                <div class="topic-examples">
                  <h4 class="examples-title">📄 卷面例题（亮点给力 + 南京卷）</h4>
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
    engState.quizQuestions = shuffle(pool).slice(0, Math.min(15, pool.length));
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
        $$('#read-play-myopia, #read-play-tea, #read-play-metro, #read-play-transport').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        $(`#read-play-${tab.dataset.read}`).classList.add('active');
      });
    });
  }

  function renderReadingBlock(containerId, data, prefix) {
    if (!data || !Array.isArray(data.questions)) return;
    $(`${containerId.replace('Q', 'Passage')}`).textContent = data.passage;
    $(containerId).innerHTML = data.questions.map((q, i) => {
      if (q.type === 'fill') {
        return `<div class="read-item"><p>${i + 1}. ${q.q}</p>
          <input type="text" class="read-input" id="${prefix}Fill${i}">
          <div class="read-result hidden" id="${prefix}FillResult${i}"></div></div>`;
      }
      if (typeof q.answer === 'boolean') {
        return `<div class="read-item"><p>${i + 1}. ${q.q}</p>
          <div class="tf-btns">
            <button type="button" class="tf-btn" data-i="${i}" data-v="true">T</button>
            <button type="button" class="tf-btn" data-i="${i}" data-v="false">F</button>
          </div><div class="read-result hidden"></div></div>`;
      }
      if (q.options && q.options[0] && (q.options[0].startsWith('True') || q.options[0].startsWith('False'))) {
        return `<div class="read-item"><p>${i + 1}. ${q.q}</p>
          <div class="tf-btns">
            <button type="button" class="tf-btn" data-i="${i}" data-v="true">T</button>
            <button type="button" class="tf-btn" data-i="${i}" data-v="false">F</button>
          </div><div class="read-result hidden"></div></div>`;
      }
      if (!Array.isArray(q.options)) return '';
      return `<div class="read-item"><p>${i + 1}. ${q.q}</p>
        <div class="read-opts">${q.options.map((o, j) =>
          `<button type="button" class="read-opt" data-i="${i}" data-j="${j}">${String.fromCharCode(65 + j)}. ${o}</button>`
        ).join('')}</div><div class="read-result hidden"></div></div>`;
    }).join('');

    $$(`${containerId} .read-opt`).forEach(btn => {
      btn.addEventListener('click', () => {
        const qi = +btn.dataset.i, sel = +btn.dataset.j;
        const q = data.questions[qi];
        const item = btn.closest('.read-item');
        item.querySelectorAll('.read-opt').forEach((b, j) => {
          b.disabled = true;
          b.classList.toggle('correct', j === q.answer);
          b.classList.toggle('wrong', j === sel && sel !== q.answer);
        });
        const r = item.querySelector('.read-result');
        r.className = 'read-result ' + (sel === q.answer ? 'success' : 'error');
        r.textContent = q.explain || (sel === q.answer ? '✓' : '✗');
      });
    });

    $$(`${containerId} .tf-btn`).forEach(btn => {
      btn.addEventListener('click', () => {
        const qi = +btn.dataset.i;
        const sel = btn.dataset.v === 'true';
        const q = data.questions[qi];
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

    data.questions.forEach((q, i) => {
      if (q.type !== 'fill') return;
      const input = $(`#${prefix}Fill${i}`);
      const result = $(`#${prefix}FillResult${i}`);
      if (!input || !result) return;
      input.addEventListener('change', () => {
        const val = norm(input.value);
        const ok = (q.accept || [q.answer]).some(a => norm(a) === val);
        result.className = 'read-result ' + (ok ? 'success' : 'error');
        result.classList.remove('hidden');
        result.textContent = ok ? '✓' : `✗ ${q.answer}`;
      });
    });
  }

  function renderEngPlayPick() {
    if (typeof ENG_PAPER_PICKS === 'undefined' || !window.renderPaperPicks) return;
    window.renderPaperPicks({
      listId: '#engPlayPick',
      pagerId: '#engPlayPickPager',
      picks: ENG_PAPER_PICKS,
      pageSize: 10,
      key: 'eng-pick'
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
    renderReadingBlock('#engPlayMyopiaQ', ENG_READING_MYOPIA, 'myopia');
    if (typeof ENG_READING_METRO !== 'undefined') {
      renderReadingBlock('#engPlayMetroQ', ENG_READING_METRO, 'metro');
    }
    if (typeof ENG_READING_TRANSPORT !== 'undefined') {
      renderReadingBlock('#engPlayTransportQ', ENG_READING_TRANSPORT, 'transport');
    }

    $('#engPlayTeaPassage').textContent = ENG_READING_TEA.passage;
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

  /* ── 听力练习 ── */
  function stopEngListening() {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    engState.listenPlaying = false;
    const status = $('#engListenStatus');
    if (status) status.textContent = '';
    const playBtn = $('#engListenPlay');
    if (playBtn) playBtn.disabled = false;
  }

  function getEngListenVoice() {
    if (!window.speechSynthesis) return null;
    const voices = speechSynthesis.getVoices();
    return voices.find(v => /en-US|en-GB|English/i.test(v.lang + v.name)) || voices[0] || null;
  }

  function playEngListeningLines(lines, onDone) {
    if (!window.speechSynthesis) {
      alert('当前浏览器不支持语音朗读，请使用 Chrome 或 Edge。');
      onDone?.();
      return;
    }
    stopEngListening();
    engState.listenPlaying = true;
    $('#engListenPlay').disabled = true;
    $('#engListenStatus').textContent = '正在播放…';

    let i = 0;
    const voice = getEngListenVoice();

    function speakNext() {
      if (i >= lines.length) {
        engState.listenPlaying = false;
        $('#engListenPlay').disabled = false;
        $('#engListenStatus').textContent = '播放完毕，请答题';
        onDone?.();
        return;
      }
      const line = lines[i++];
      const u = new SpeechSynthesisUtterance(line.text);
      u.lang = 'en-US';
      u.rate = 0.88;
      if (voice) u.voice = voice;
      u.onend = () => setTimeout(speakNext, line.speaker ? 700 : 500);
      u.onerror = () => setTimeout(speakNext, 300);
      speechSynthesis.speak(u);
    }

    if (speechSynthesis.getVoices().length === 0) {
      speechSynthesis.onvoiceschanged = () => {
        speechSynthesis.onvoiceschanged = null;
        speakNext();
      };
    } else {
      speakNext();
    }
  }

  function renderEngListening() {
    if (typeof ENG_LISTENING === 'undefined' || !ENG_LISTENING.length) return;
    const item = ENG_LISTENING[engState.listenIndex];
    $('#engListenTitle').textContent = item.title;
    $('#engListenTag').textContent = item.tag;
    $('#engListenCounter').textContent = `${engState.listenIndex + 1} / ${ENG_LISTENING.length}`;
    $('#engListenSelect').value = String(engState.listenIndex);

    $('#engListenScript').innerHTML = item.lines.map(line =>
      line.speaker
        ? `<p><strong>${line.speaker}:</strong> ${line.text}</p>`
        : `<p>${line.text}</p>`
    ).join('');

    $('#engListenQuestions').innerHTML = `
      <h3 class="play-card-title">根据听力选择正确答案</h3>
      ${item.questions.map((q, qi) => `
        <div class="listen-item" data-qi="${qi}">
          <p class="listen-q">${qi + 1}. ${q.q}</p>
          <div class="listen-opts">
            ${q.options.map((o, j) =>
              `<button type="button" class="listen-opt" data-qi="${qi}" data-j="${j}">${String.fromCharCode(65 + j)}. ${o}</button>`
            ).join('')}
          </div>
          <div class="listen-result hidden"></div>
        </div>`).join('')}`;

    $$('#engListenQuestions .listen-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        const qi = +btn.dataset.qi;
        const sel = +btn.dataset.j;
        const q = item.questions[qi];
        const box = btn.closest('.listen-item');
        box.querySelectorAll('.listen-opt').forEach((b, j) => {
          b.disabled = true;
          b.classList.toggle('correct', j === q.answer);
          b.classList.toggle('wrong', j === sel && sel !== q.answer);
        });
        const r = box.querySelector('.listen-result');
        r.classList.remove('hidden');
        r.className = 'listen-result ' + (sel === q.answer ? 'success' : 'error');
        r.textContent = sel === q.answer ? '✓ ' + q.explain : '✗ 正确答案：' + String.fromCharCode(65 + q.answer) + '. ' + q.explain;
      });
    });

    stopEngListening();
  }

  function initEngListening() {
    if (typeof ENG_LISTENING === 'undefined') return;
    const sel = $('#engListenSelect');
    sel.innerHTML = ENG_LISTENING.map((item, i) =>
      `<option value="${i}">${item.title}</option>`).join('');
    sel.addEventListener('change', () => {
      engState.listenIndex = +sel.value;
      renderEngListening();
    });
    $('#engListenPlay').addEventListener('click', () => {
      const item = ENG_LISTENING[engState.listenIndex];
      playEngListeningLines(item.lines);
    });
    $('#engListenReplay').addEventListener('click', () => {
      const item = ENG_LISTENING[engState.listenIndex];
      playEngListeningLines(item.lines);
    });
    $('#engListenPrev').addEventListener('click', () => {
      engState.listenIndex = (engState.listenIndex - 1 + ENG_LISTENING.length) % ENG_LISTENING.length;
      renderEngListening();
    });
    $('#engListenNext').addEventListener('click', () => {
      engState.listenIndex = (engState.listenIndex + 1) % ENG_LISTENING.length;
      renderEngListening();
    });
    renderEngListening();
  }

  window.renderEngListening = renderEngListening;
  window.stopEngListening = stopEngListening;

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
    renderEngPlayPick();
    initEngListening();
    updateEngProgressUI();
  }

  window.initEnglish = initEnglish;
})();
