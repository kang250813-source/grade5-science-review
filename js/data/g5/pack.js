/* 五年级 · 注册统一 SubjectPack（加载顺序最后执行） */

(function () {
  'use strict';

  if (typeof GradeRegistry === 'undefined') return;

  function pack(grade, subject, meta, units, flashcards, quiz, extras) {
    return { grade, subject, meta, units, flashcards, quiz, extras: extras || {} };
  }

  GradeRegistry.registerPack(5, {
    science: pack(5, 'science', null, UNITS, FLASHCARDS, QUIZ_QUESTIONS, {
      shipTimeline: typeof SHIP_TIMELINE !== 'undefined' ? SHIP_TIMELINE : [],
      foodChains: typeof FOOD_CHAINS !== 'undefined' ? FOOD_CHAINS : [],
      matchPairs: typeof MATCH_PAIRS !== 'undefined' ? MATCH_PAIRS : []
    }),

    english: pack(5, 'english', ENGLISH_EXAM, ENG_UNITS, ENG_FLASHCARDS, ENG_QUIZ_QUESTIONS, {
      vocabA: ENG_VOCAB_A,
      vocabB: ENG_VOCAB_B,
      vocabC: ENG_VOCAB_C,
      dialogue: ENG_DIALOGUE,
      readingMyopia: ENG_READING_MYOPIA,
      readingTea: ENG_READING_TEA,
      writing: ENG_WRITING,
      sources: typeof ENG_SOURCES !== 'undefined' ? ENG_SOURCES : [],
      examSections: typeof ENG_EXAM_SECTIONS !== 'undefined' ? ENG_EXAM_SECTIONS : [],
      commonMistakes: typeof ENG_COMMON_MISTAKES !== 'undefined' ? ENG_COMMON_MISTAKES : [],
      topicExamples: typeof ENG_TOPIC_EXAMPLES !== 'undefined' ? ENG_TOPIC_EXAMPLES : {},
      paperPicks: typeof ENG_PAPER_PICKS !== 'undefined' ? ENG_PAPER_PICKS : [],
      readingMetro: typeof ENG_READING_METRO !== 'undefined' ? ENG_READING_METRO : null,
      readingTransport: typeof ENG_READING_TRANSPORT !== 'undefined' ? ENG_READING_TRANSPORT : null,
      listening: typeof ENG_LISTENING !== 'undefined' ? ENG_LISTENING : []
    }),

    math: pack(5, 'math', MATH_EXAM, MATH_UNITS, MATH_FLASHCARDS, MATH_QUIZ_QUESTIONS, {
      topicExamples: typeof MATH_TOPIC_EXAMPLES !== 'undefined' ? MATH_TOPIC_EXAMPLES : {},
      paperPicks: typeof MATH_PAPER_PICKS !== 'undefined' ? MATH_PAPER_PICKS : [],
      renderMathFlashViz: typeof renderMathFlashViz !== 'undefined' ? renderMathFlashViz : null
    }),

    chinese: pack(5, 'chinese', CHN_EXAM, CHN_UNITS, CHN_FLASHCARDS, CHN_QUIZ_QUESTIONS, {
      fill: CHN_FILL,
      judge: CHN_JUDGE,
      word: CHN_WORD,
      topicExamples: typeof CHN_TOPIC_EXAMPLES !== 'undefined' ? CHN_TOPIC_EXAMPLES : {},
      paperPicks: typeof CHN_PAPER_PICKS !== 'undefined' ? CHN_PAPER_PICKS : []
    })
  });
})();
