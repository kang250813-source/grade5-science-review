/* 四年级 · 注册 SubjectPack */

(function () {
  'use strict';

  if (typeof GradeRegistry === 'undefined') return;

  function pack(grade, subject, meta, units, flashcards, quiz, extras) {
    return { grade, subject, meta, units, flashcards, quiz, extras: extras || {} };
  }

  GradeRegistry.registerPack(4, {
    chinese: pack(4, 'chinese', G4_CHN_EXAM, G4_CHN_UNITS, G4_CHN_FLASHCARDS, G4_CHN_QUIZ_QUESTIONS, {
      fill: G4_CHN_FILL,
      judge: G4_CHN_JUDGE,
      word: G4_CHN_WORD,
      topicExamples: G4_CHN_TOPIC_EXAMPLES,
      paperPicks: G4_CHN_PAPER_PICKS
    }),
    english: pack(4, 'english', G4_ENGLISH_EXAM, G4_ENG_UNITS, G4_ENG_FLASHCARDS, G4_ENG_QUIZ_QUESTIONS, {
      vocabA: G4_ENG_VOCAB_A,
      vocabB: G4_ENG_VOCAB_B,
      vocabC: G4_ENG_VOCAB_C,
      dialogue: G4_ENG_DIALOGUE,
      readingMyopia: G4_ENG_READING_MYOPIA,
      readingTea: G4_ENG_READING_TEA,
      writing: G4_ENG_WRITING,
      listening: G4_ENG_LISTENING
    }),
    math: pack(4, 'math', G4_MATH_EXAM, G4_MATH_UNITS, G4_MATH_FLASHCARDS, G4_MATH_QUIZ_QUESTIONS, {}),
    science: pack(4, 'science', G4_SCI_EXAM, G4_SCI_UNITS, G4_SCI_FLASHCARDS, G4_SCI_QUIZ_QUESTIONS, {
      shipTimeline: G4_SCI_SHIP_TIMELINE,
      foodChains: G4_SCI_FOOD_CHAINS,
      matchPairs: G4_SCI_MATCH_PAIRS
    })
  });
})();
