/* 年级数据注册表 · 统一读写 SubjectPack */

(function () {
  'use strict';

  const packs = {};
  let activeGrade = GRADE_SCHEMA.defaultGrade;

  const GLOBAL_BINDINGS = {
    science: {
      units: 'UNITS',
      flashcards: 'FLASHCARDS',
      quiz: 'QUIZ_QUESTIONS',
      extras: {
        shipTimeline: 'SHIP_TIMELINE',
        foodChains: 'FOOD_CHAINS',
        matchPairs: 'MATCH_PAIRS'
      }
    },
    english: {
      meta: 'ENGLISH_EXAM',
      units: 'ENG_UNITS',
      flashcards: 'ENG_FLASHCARDS',
      quiz: 'ENG_QUIZ_QUESTIONS',
      extras: {
        vocabA: 'ENG_VOCAB_A',
        vocabB: 'ENG_VOCAB_B',
        vocabC: 'ENG_VOCAB_C',
        dialogue: 'ENG_DIALOGUE',
        readingMyopia: 'ENG_READING_MYOPIA',
        readingTea: 'ENG_READING_TEA',
        writing: 'ENG_WRITING',
        sources: 'ENG_SOURCES',
        examSections: 'ENG_EXAM_SECTIONS',
        commonMistakes: 'ENG_COMMON_MISTAKES',
        topicExamples: 'ENG_TOPIC_EXAMPLES',
        paperPicks: 'ENG_PAPER_PICKS',
        readingMetro: 'ENG_READING_METRO',
        readingTransport: 'ENG_READING_TRANSPORT',
        listening: 'ENG_LISTENING'
      }
    },
    math: {
      meta: 'MATH_EXAM',
      units: 'MATH_UNITS',
      flashcards: 'MATH_FLASHCARDS',
      quiz: 'MATH_QUIZ_QUESTIONS',
      extras: {
        topicExamples: 'MATH_TOPIC_EXAMPLES',
        paperPicks: 'MATH_PAPER_PICKS',
        renderMathFlashViz: 'renderMathFlashViz'
      }
    },
    chinese: {
      meta: 'CHN_EXAM',
      units: 'CHN_UNITS',
      flashcards: 'CHN_FLASHCARDS',
      quiz: 'CHN_QUIZ_QUESTIONS',
      extras: {
        fill: 'CHN_FILL',
        judge: 'CHN_JUDGE',
        word: 'CHN_WORD',
        topicExamples: 'CHN_TOPIC_EXAMPLES',
        paperPicks: 'CHN_PAPER_PICKS'
      }
    }
  };

  function isGradeAvailable(grade) {
    return !!(GRADE_SCHEMA.gradeMeta[grade] && GRADE_SCHEMA.gradeMeta[grade].available);
  }

  function isSubjectReady(grade, subject) {
    const gm = GRADE_SCHEMA.gradeMeta[grade];
    if (!gm || !gm.available) return false;
    const ready = gm.subjectsReady;
    if (!ready || !ready.length) return true;
    return ready.includes(subject);
  }

  function cloneData(data) {
    if (!data) return data;
    return JSON.parse(JSON.stringify(data));
  }

  function registerPack(grade, subjects) {
    const snap = {};
    Object.entries(subjects).forEach(([subject, data]) => {
      snap[subject] = {
        grade: data.grade,
        subject: data.subject,
        meta: data.meta ? { ...data.meta } : null,
        units: cloneData(data.units || []),
        flashcards: cloneData(data.flashcards || []),
        quiz: cloneData(data.quiz || []),
        extras: cloneData(data.extras || {})
      };
    });
    packs[grade] = { loaded: true, subjects: snap };
  }

  function getPack(grade) {
    return packs[grade] || null;
  }

  function getSubject(grade, subject) {
    const pack = getPack(grade);
    return pack && pack.subjects ? pack.subjects[subject] : null;
  }

  function getActiveGrade() {
    return activeGrade;
  }

  function setActiveGrade(grade) {
    activeGrade = grade;
  }

  function replaceGlobalArray(name, arr) {
    if (!Array.isArray(arr)) return;
    const fn = new Function('data', `
      try {
        if (typeof ${name} !== 'undefined' && Array.isArray(${name})) {
          ${name}.length = 0;
          for (let i = 0; i < data.length; i++) ${name}.push(data[i]);
          return true;
        }
      } catch (e) {}
      return false;
    `);
    if (!fn(arr)) window[name] = arr.slice();
  }

  function replaceGlobalObject(name, obj) {
    if (!obj || typeof obj !== 'object') return;
    const fn = new Function('data', `
      try {
        if (typeof ${name} !== 'undefined' && ${name} && typeof ${name} === 'object') {
          Object.keys(${name}).forEach(function (k) { delete ${name}[k]; });
          Object.assign(${name}, data);
          return true;
        }
      } catch (e) {}
      return false;
    `);
    if (!fn(obj)) window[name] = Object.assign({}, obj);
  }

  function bindSubjectGlobals(subject, data) {
    if (!data) return;
    const map = GLOBAL_BINDINGS[subject];
    if (!map) return;

    if (map.meta && data.meta) replaceGlobalObject(map.meta, data.meta);
    if (map.units && data.units) replaceGlobalArray(map.units, data.units);
    if (map.flashcards && data.flashcards) replaceGlobalArray(map.flashcards, data.flashcards);
    if (map.quiz && data.quiz) replaceGlobalArray(map.quiz, data.quiz);

    if (map.extras && data.extras) {
      Object.entries(map.extras).forEach(([key, globalName]) => {
        if (data.extras[key] === undefined) return;
        const val = data.extras[key];
        if (Array.isArray(val)) replaceGlobalArray(globalName, val);
        else if (val && typeof val === 'object') replaceGlobalObject(globalName, val);
        else window[globalName] = val;
      });
    }
  }

  function bindAllGlobals(grade) {
    const pack = getPack(grade);
    if (!pack) return;
    GRADE_SCHEMA.subjects.forEach(subject => {
      bindSubjectGlobals(subject, pack.subjects[subject]);
    });
  }

  window.GradeRegistry = {
    registerPack,
    getPack,
    getSubject,
    getActiveGrade,
    setActiveGrade,
    isGradeAvailable,
    isSubjectReady,
    bindAllGlobals,
    bindSubjectGlobals
  };
})();
