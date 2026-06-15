/* 年级 × 科目 · 统一配置 schema */

(function () {
  'use strict';

  /**
   * SubjectPack 统一数据格式（由 pack.js 注册）：
   * {
   *   grade, subject,
   *   meta: { title, subtitle, note },
   *   units: [{ id, title, emoji, topics: [{ id, title, points[] }] }],
   *   flashcards: [{ unit, q, a, viz?, vizData? }],
   *   quiz: [{ unit, q, options, answer, explain }],
   *   extras: { ...subjectSpecific }
   * }
   */

  window.APP_BRAND = {
    name: '小学复习课件',
    title: '小学互动复习',
    tagline: '一至六年级 · 语数英科 · 互动课件',
    footer: '一至六年级 · 语数英科 · 互动复习课件'
  };

  window.GRADE_SCHEMA = {
    grades: [1, 2, 3, 4, 5, 6],
    defaultGrade: 5,
    subjects: ['science', 'english', 'math', 'chinese'],
    subjectLabels: {
      science: { icon: '🔬', label: '科学' },
      english: { icon: '📘', label: '英语' },
      math: { icon: '📐', label: '数学' },
      chinese: { icon: '📖', label: '语文' }
    },
    gradeMeta: {
      1: {
        label: '一年级',
        semester: '下册',
        available: true,
        hint: '语数科 · 一年级全科完成（无英语教材）',
        subjectsReady: ['chinese', 'math', 'science'],
        versions: {
          chinese: '统编版',
          math: '苏教版',
          science: '苏教版'
        }
      },
      2: {
        label: '二年级',
        semester: '下册',
        available: true,
        hint: '语数科 · 二年级全科完成（无英语教材）',
        subjectsReady: ['chinese', 'math', 'science'],
        versions: {
          chinese: '统编版',
          math: '苏教版',
          science: '苏教版'
        }
      },
      3: {
        label: '三年级',
        semester: '下册',
        available: true,
        hint: '语数英科 · 三年级全科完成',
        subjectsReady: ['chinese', 'math', 'english', 'science'],
        versions: {
          chinese: '统编版',
          math: '苏教版',
          english: '译林版',
          science: '苏教版'
        }
      },
      4: {
        label: '四年级',
        semester: '下册',
        available: true,
        hint: '语数英科 · 四年级全科完成',
        subjectsReady: ['chinese', 'math', 'english', 'science'],
        versions: {
          chinese: '统编版',
          math: '苏教版',
          english: '译林版',
          science: '苏教版'
        }
      },
      5: {
        label: '五年级',
        semester: '下册',
        available: true,
        hint: '语数英科学 · 教材 + 期末卷 · 全功能可用',
        versions: {
          science: '教科版',
          english: '译林版',
          math: '苏教版',
          chinese: '统编版'
        }
      },
      6: {
        label: '六年级',
        semester: '下册',
        available: true,
        hint: '语数英科 · 教材互动复习 · 全功能可用',
        subjectsReady: ['chinese', 'math', 'english', 'science'],
        versions: {
          chinese: '统编版',
          math: '苏教版',
          english: '译林版',
          science: '苏教版'
        }
      }
    }
  };

  window.GRADE_MANIFEST = {
    1: {
      scripts: [
        'js/data/g1/chinese/data.js',
        'js/data/g1/chinese/textbook.js',
        'js/data/g1/chinese/flashcards-expansion.js',
        'js/data/g1/math/data.js',
        'js/data/g1/math/textbook.js',
        'js/data/g1/math/flashcards-expansion.js',
        'js/data/g1/science/data.js',
        'js/data/g1/science/textbook.js',
        'js/data/g1/science/flashcards-expansion.js',
        'js/data/g1/pack.js'
      ]
    },
    2: {
      scripts: [
        'js/data/g2/chinese/data.js',
        'js/data/g2/chinese/textbook.js',
        'js/data/g2/chinese/flashcards-expansion.js',
        'js/data/g2/math/data.js',
        'js/data/g2/math/textbook.js',
        'js/data/g2/math/flashcards-expansion.js',
        'js/data/g2/science/data.js',
        'js/data/g2/science/textbook.js',
        'js/data/g2/science/flashcards-expansion.js',
        'js/data/g2/pack.js'
      ]
    },
    3: {
      scripts: [
        'js/data/g3/chinese/data.js',
        'js/data/g3/chinese/textbook.js',
        'js/data/g3/chinese/flashcards-expansion.js',
        'js/data/g3/math/data.js',
        'js/data/g3/math/textbook.js',
        'js/data/g3/math/flashcards-expansion.js',
        'js/data/g3/english/data.js',
        'js/data/g3/english/textbook.js',
        'js/data/g3/english/flashcards-expansion.js',
        'js/data/g3/english/listening.js',
        'js/data/g3/science/data.js',
        'js/data/g3/science/textbook.js',
        'js/data/g3/science/flashcards-expansion.js',
        'js/data/g3/pack.js'
      ]
    },
    4: {
      scripts: [
        'js/data/g4/chinese/data.js',
        'js/data/g4/chinese/textbook.js',
        'js/data/g4/chinese/flashcards-expansion.js',
        'js/data/g4/math/data.js',
        'js/data/g4/math/textbook.js',
        'js/data/g4/math/flashcards-expansion.js',
        'js/data/g4/english/data.js',
        'js/data/g4/english/textbook.js',
        'js/data/g4/english/flashcards-expansion.js',
        'js/data/g4/english/listening.js',
        'js/data/g4/science/data.js',
        'js/data/g4/science/textbook.js',
        'js/data/g4/science/flashcards-expansion.js',
        'js/data/g4/pack.js'
      ]
    },
    5: {
      scripts: [
        'js/data/g5/science/data.js',
        'js/data/g5/english/data.js',
        'js/data/g5/english/papers.js',
        'js/data/g5/english/points-expansion.js',
        'js/data/g5/english/textbook.js',
        'js/data/g5/english/textbook-expansion.js',
        'js/data/g5/english/flashcards-expansion.js',
        'js/data/g5/english/listening.js',
        'js/data/g5/math/data.js',
        'js/data/g5/math/papers.js',
        'js/data/g5/math/points-expansion.js',
        'js/data/g5/math/textbook.js',
        'js/data/g5/math/flash-viz.js',
        'js/data/g5/math/flashcards-expansion.js',
        'js/data/g5/chinese/data.js',
        'js/data/g5/chinese/papers.js',
        'js/data/g5/chinese/points-expansion.js',
        'js/data/g5/chinese/textbook.js',
        'js/data/g5/chinese/flashcards-expansion.js',
        'js/data/g5/pack.js'
      ]
    },
    6: {
      scripts: [
        'js/data/g6/science/data.js',
        'js/data/g6/chinese/data.js',
        'js/data/g6/chinese/textbook.js',
        'js/data/g6/chinese/flashcards-expansion.js',
        'js/data/g6/math/data.js',
        'js/data/g6/math/textbook.js',
        'js/data/g6/math/flashcards-expansion.js',
        'js/data/g6/english/data.js',
        'js/data/g6/english/textbook.js',
        'js/data/g6/english/flashcards-expansion.js',
        'js/data/g6/english/listening.js',
        'js/data/g6/pack.js'
      ]
    }
  };
})();
