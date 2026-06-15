/* 一年级 · 注册 SubjectPack */

(function () {
  'use strict';

  if (typeof GradeRegistry === 'undefined') return;

  function pack(grade, subject, meta, units, flashcards, quiz, extras) {
    return { grade, subject, meta, units, flashcards, quiz, extras: extras || {} };
  }

  GradeRegistry.registerPack(1, {
    science: pack(1, 'science', G1_SCI_EXAM, G1_SCI_UNITS, G1_SCI_FLASHCARDS, G1_SCI_QUIZ_QUESTIONS, {
      shipTimeline: G1_SCI_SHIP_TIMELINE,
      foodChains: G1_SCI_FOOD_CHAINS,
      matchPairs: G1_SCI_MATCH_PAIRS
    }),
    english: pack(1, 'english', { title: '一年级无英语课', subtitle: '—', note: '一年级下册无英语教材。' }, [], [], [], {}),
    math: pack(1, 'math', G1_MATH_EXAM, G1_MATH_UNITS, G1_MATH_FLASHCARDS, G1_MATH_QUIZ_QUESTIONS, {}),
    chinese: pack(1, 'chinese', G1_CHN_EXAM, G1_CHN_UNITS, G1_CHN_FLASHCARDS, G1_CHN_QUIZ_QUESTIONS, {
      fill: G1_CHN_FILL,
      judge: G1_CHN_JUDGE,
      word: G1_CHN_WORD,
      topicExamples: G1_CHN_TOPIC_EXAMPLES,
      paperPicks: G1_CHN_PAPER_PICKS
    })
  });
})();
