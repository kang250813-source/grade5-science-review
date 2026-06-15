/* 六年级 · 注册 SubjectPack */

(function () {
  'use strict';

  if (typeof GradeRegistry === 'undefined') return;

  function pack(grade, subject, meta, units, flashcards, quiz, extras) {
    return { grade, subject, meta, units, flashcards, quiz, extras: extras || {} };
  }

  GradeRegistry.registerPack(6, {
    science: pack(6, 'science', null, G6_UNITS, G6_FLASHCARDS, G6_QUIZ_QUESTIONS, {
      shipTimeline: G6_SHIP_TIMELINE,
      foodChains: G6_FOOD_CHAINS,
      matchPairs: G6_MATCH_PAIRS
    }),
    english: pack(6, 'english', G6_ENGLISH_EXAM, G6_ENG_UNITS, G6_ENG_FLASHCARDS, G6_ENG_QUIZ_QUESTIONS, {
      vocabA: G6_ENG_VOCAB_A,
      vocabB: G6_ENG_VOCAB_B,
      vocabC: G6_ENG_VOCAB_C,
      dialogue: G6_ENG_DIALOGUE,
      readingMyopia: G6_ENG_READING_MYOPIA,
      readingTea: G6_ENG_READING_TEA,
      writing: G6_ENG_WRITING,
      listening: G6_ENG_LISTENING
    }),
    math: pack(6, 'math', G6_MATH_EXAM, G6_MATH_UNITS, G6_MATH_FLASHCARDS, G6_MATH_QUIZ_QUESTIONS, {}),
    chinese: pack(6, 'chinese', G6_CHN_EXAM, G6_CHN_UNITS, G6_CHN_FLASHCARDS, G6_CHN_QUIZ_QUESTIONS, {
      fill: G6_CHN_FILL,
      judge: G6_CHN_JUDGE,
      word: G6_CHN_WORD,
      topicExamples: G6_CHN_TOPIC_EXAMPLES,
      paperPicks: G6_CHN_PAPER_PICKS
    })
  });
})();
