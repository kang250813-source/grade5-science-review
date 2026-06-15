/* 三年级 · 注册 SubjectPack */

(function () {
  'use strict';

  if (typeof GradeRegistry === 'undefined') return;

  function pack(grade, subject, meta, units, flashcards, quiz, extras) {
    return { grade, subject, meta, units, flashcards, quiz, extras: extras || {} };
  }

  GradeRegistry.registerPack(3, {
    chinese: pack(3, 'chinese', G3_CHN_EXAM, G3_CHN_UNITS, G3_CHN_FLASHCARDS, G3_CHN_QUIZ_QUESTIONS, {
      fill: G3_CHN_FILL,
      judge: G3_CHN_JUDGE,
      word: G3_CHN_WORD,
      topicExamples: G3_CHN_TOPIC_EXAMPLES,
      paperPicks: G3_CHN_PAPER_PICKS
    }),
    english: pack(3, 'english', G3_ENGLISH_EXAM, G3_ENG_UNITS, G3_ENG_FLASHCARDS, G3_ENG_QUIZ_QUESTIONS, {
      vocabA: G3_ENG_VOCAB_A,
      vocabB: G3_ENG_VOCAB_B,
      vocabC: G3_ENG_VOCAB_C,
      dialogue: G3_ENG_DIALOGUE,
      readingMyopia: G3_ENG_READING_MYOPIA,
      readingTea: G3_ENG_READING_TEA,
      writing: G3_ENG_WRITING,
      listening: G3_ENG_LISTENING
    }),
    math: pack(3, 'math', G3_MATH_EXAM, G3_MATH_UNITS, G3_MATH_FLASHCARDS, G3_MATH_QUIZ_QUESTIONS, {}),
    science: pack(3, 'science', G3_SCI_EXAM, G3_SCI_UNITS, G3_SCI_FLASHCARDS, G3_SCI_QUIZ_QUESTIONS, {
      shipTimeline: G3_SCI_SHIP_TIMELINE,
      foodChains: G3_SCI_FOOD_CHAINS,
      matchPairs: G3_SCI_MATCH_PAIRS
    })
  });
})();
