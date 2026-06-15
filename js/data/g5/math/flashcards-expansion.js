/* 数学闪卡扩充 · 教材 + 期末 + 图形辅助 */

(function () {
  'use strict';

  if (typeof MATH_FLASHCARDS === 'undefined') return;

  MATH_FLASHCARDS.push(
    /* ── 教材单元 0-7 ── */
    { unit: 0, q: '【教材 U1】等式与方程区别？', a: '方程是含有未知数的等式；等式不一定是方程', viz: 'balance' },
    { unit: 0, q: '【教材 U1】x + 50 = 150，x = ?', a: 'x = 100', viz: 'equation', vizData: { left: 'x + 50', right: '150', answer: '100' } },
    { unit: 0, q: '【教材 U1】2x = 200，x = ?', a: 'x = 100', viz: 'equation', vizData: { left: '2x', right: '200', answer: '100' } },
    { unit: 0, q: '【教材 U1】等式性质？', a: '两边同加、同减、同乘、同除（除数≠0），等式仍成立', viz: 'balance' },
    { unit: 1, q: '【教材 U2】折线统计图特点？', a: '既能看数量多少，更能看变化趋势（升/降/平）', viz: 'line-chart', vizData: { points: [2, 4, 3, 7, 5], labels: ['一', '二', '三', '四', '五'] } },
    { unit: 1, q: '【教材 U2】记录体温变化用什么图？', a: '折线统计图', viz: 'line-chart' },
    { unit: 1, q: '【教材 U2】折线与条形图区别？', a: '折线看变化趋势；条形图侧重比较数量多少' },
    { unit: 2, q: '【教材 U3】2 的倍数特征？', a: '个位是 0、2、4、6、8' },
    { unit: 2, q: '【教材 U3】3 的倍数怎么判断？', a: '各位数字之和能被 3 整除' },
    { unit: 2, q: '【教材 U3】45 分解质因数？', a: '45 = 3 × 3 × 5', viz: 'factor-tree', vizData: { n: 45 } },
    { unit: 2, q: '【教材 U3】12 的因数有哪些？', a: '1, 2, 3, 4, 6, 12（共 6 个）', viz: 'factor-pairs', vizData: { n: 12 } },
    { unit: 2, q: '【教材 U3】最小质数？', a: '2（也是唯一偶质数）' },
    { unit: 3, q: '【教材 U4】7/8 的分数单位？', a: '1/8，表示 7 个 1/8', viz: 'fraction-bar', vizData: { num: 7, den: 8 } },
    { unit: 3, q: '【教材 U4】分数基本性质？', a: '分子分母同乘或同除以相同非 0 数，分数大小不变' },
    { unit: 3, q: '【教材 U4】3/4 在数轴上位置？', a: '0 与 1 之间，距 1 还有 1/4', viz: 'number-line', vizData: { num: 3, den: 4 } },
    { unit: 3, q: '【教材 U4】最简分数？', a: '分子分母只有公因数 1（互质）' },
    { unit: 4, q: '【教材 U5】异分母分数加减第一步？', a: '通分，化为同分母再计算' },
    { unit: 4, q: '【教材 U5】1/2 + 1/3 = ?', a: '5/6（通分：3/6 + 2/6）' },
    { unit: 4, q: '【教材 U5】1 - 1/4 - 1/5 = ?', a: '11/20', viz: 'fraction-bar', vizData: { num: 11, den: 20 } },
    { unit: 5, q: '【教材 U6】r=5cm，S ≈ ?（π=3.14）', a: '78.5 cm²', viz: 'circle-area', vizData: { r: 5 } },
    { unit: 5, q: '【教材 U6】d=10cm，C ≈ ?（π=3.14）', a: '31.4 cm', viz: 'circle', vizData: { r: 5 } },
    { unit: 5, q: '【教材 U6】圆内最大正方形？', a: '正方形对角线 = 圆的直径', viz: 'square-in-circle', vizData: { r: 5 } },
    { unit: 5, q: '【教材 U6】π 与圆大小有关吗？', a: '无关，π 是固定比值' },
    { unit: 6, q: '【教材 U7】列举策略要点？', a: '有序、不重复、不遗漏' },
    { unit: 6, q: '【教材 U7】3 人互寄贺卡几张？', a: '6 张（3×2，有序列举）' },
    { unit: 7, q: '【教材 U8】圆环面积怎么求？', a: '大圆面积 − 小圆面积 = π(R²−r²)' },

    /* ── 期末单元 8-15 ── */
    { unit: 8, q: '【期末 U1】1 是什么数？', a: '既不是质数也不是合数', viz: 'factor-pairs', vizData: { n: 1 } },
    { unit: 8, q: '【期末 U1】28 是完美数吗？', a: '是，因数 1+2+4+7+14=28' },
    { unit: 8, q: '【期末 U1】LCM(12, 18) = ?', a: '36', viz: 'gcd-lcm', vizData: { a: 12, b: 18 } },
    { unit: 8, q: '【期末 U1】GCD(12, 18) = ?', a: '6', viz: 'gcd-lcm', vizData: { a: 12, b: 18 } },
    { unit: 9, q: '【期末 U2】6÷15 化成小数？', a: '0.4', viz: 'fraction-bar', vizData: { num: 6, den: 15 } },
    { unit: 9, q: '【期末 U2】3/7 能化有限小数吗？', a: '不能（分母含 7 以外的质因数）' },
    { unit: 9, q: '【期末 U2】45 秒 = ? 分', a: '3/4 分', viz: 'number-line', vizData: { num: 3, den: 4 } },
    { unit: 10, q: '【期末 U3】a - b - c 可改写？', a: 'a - (b + c)（减法性质）' },
    { unit: 10, q: '【期末 U3】剪去 1/4 与剪去 1/4 米？', a: '前者是比例（无单位），后者是具体长度' },
    { unit: 11, q: '【期末 U4】C = πd 还是 2πr？', a: '都对，d = 2r', viz: 'circle', vizData: { r: 4 } },
    { unit: 11, q: '【期末 U4】C=25.12，r = ?（π=3.14）', a: '4 cm', viz: 'circle', vizData: { r: 4 } },
    { unit: 12, q: '【期末 U5】5x - x = 320，x = ?', a: '80', viz: 'equation', vizData: { left: '5x - x', right: '320', answer: '80' } },
    { unit: 12, q: '【期末 U5】x ÷ 15 = 12，x = ?', a: '180', viz: 'equation', vizData: { left: 'x ÷ 15', right: '12', answer: '180' } },
    { unit: 12, q: '【期末 U5】2a + 3 表示？', a: '比 a 的 2 倍多 3' },
    { unit: 13, q: '【期末 U6】平均数公式？', a: '平均数 = 总数 ÷ 份数', viz: 'line-chart' },
    { unit: 13, q: '【期末 U6】复式折线图作用？', a: '在同一图中对比两组数据的变化', viz: 'line-chart', vizData: { points: [3, 6, 4, 9, 7] } },
    { unit: 14, q: '【期末 U7】25 面旗隔 5m，全长？', a: '120 m（间隔数 = 25−1 = 24）' },
    { unit: 14, q: '【期末 U7】平均速度公式？', a: '平均速度 = 总路程 ÷ 总时间' },
    { unit: 15, q: '【期末 U8】等式两边能同除以 0 吗？', a: '不能，0 不能做除数' },
    { unit: 15, q: '【期末 U8】24 分解质因数？', a: '24 = 2 × 2 × 2 × 3', viz: 'factor-tree', vizData: { n: 24 } }
  );
})();
