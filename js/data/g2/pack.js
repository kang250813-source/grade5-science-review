/* 二年级 · 注册 SubjectPack */

(function () {
  'use strict';

  if (typeof GradeRegistry === 'undefined') return;

  function pack(grade, subject, meta, units, flashcards, quiz, extras) {
    return { grade, subject, meta, units, flashcards, quiz, extras: extras || {} };
  }

  GradeRegistry.registerPack(2, {
    chinese: pack(2, 'chinese', G2_CHN_EXAM, G2_CHN_UNITS, G2_CHN_FLASHCARDS, G2_CHN_QUIZ_QUESTIONS, {
      fill: G2_CHN_FILL,
      judge: G2_CHN_JUDGE,
      word: G2_CHN_WORD,
      topicExamples: G2_CHN_TOPIC_EXAMPLES,
      paperPicks: G2_CHN_PAPER_PICKS
    }),
    english: pack(2, 'english', { title: '二年级无英语课', subtitle: '—', note: '二年级下册无英语教材。' }, [], [], [], {}),
    math: pack(2, 'math', G2_MATH_EXAM, G2_MATH_UNITS, G2_MATH_FLASHCARDS, G2_MATH_QUIZ_QUESTIONS, {}),
    science: pack(2, 'science', G2_SCI_EXAM, G2_SCI_UNITS, G2_SCI_FLASHCARDS, G2_SCI_QUIZ_QUESTIONS, {
      shipTimeline: G2_SCI_SHIP_TIMELINE,
      foodChains: G2_SCI_FOOD_CHAINS,
      matchPairs: G2_SCI_MATCH_PAIRS
    })
  });
})();
