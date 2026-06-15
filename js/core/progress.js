/* 按年级隔离 localStorage 进度 */

(function () {
  'use strict';

  const LEGACY_KEYS = {
    science: 'science-review-progress',
    english: 'english-review-progress',
    math: 'math-review-progress',
    chinese: 'chinese-review-progress'
  };

  function progressKey(grade, subject) {
    return `g${grade}-${subject}-review-progress`;
  }

  function migrateLegacy(grade, subject) {
    const legacy = LEGACY_KEYS[subject];
    const next = progressKey(grade, subject);
    if (!legacy || localStorage.getItem(next)) return;
    const old = localStorage.getItem(legacy);
    if (old) localStorage.setItem(next, old);
  }

  function load(grade, subject) {
    migrateLegacy(grade, subject);
    try {
      return JSON.parse(localStorage.getItem(progressKey(grade, subject))) || {};
    } catch (_) {
      return {};
    }
  }

  function save(grade, subject, data) {
    localStorage.setItem(progressKey(grade, subject), JSON.stringify(data));
  }

  window.GradeProgress = { progressKey, load, save, migrateLegacy };
})();
