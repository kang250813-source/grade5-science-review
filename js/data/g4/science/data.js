const G4_SCI_EXAM = {
  title: '苏教版四年级下册科学',
  subtitle: '教材 5 单元 · 互动复习课件',
  note: '已整合苏教四下 5 单元（冷热、地球月球太阳、昆虫、繁殖、生物与环境）。建议：教材单元 → 闪卡 → 测验。'
};

const G4_SCI_UNITS = [];

const G4_SCI_FLASHCARDS = [
  { unit: 0, q: '温度计测量什么？', a: '物体的冷热程度（温度）' },
  { unit: 1, q: '地球自转产生？', a: '昼夜交替' },
  { unit: 2, q: '昆虫有几对足？', a: '3 对（6 条腿）' },
  { unit: 3, q: '植物繁殖方式？', a: '种子、根、茎、叶' },
  { unit: 4, q: '生物与非生物区别？', a: '生物能生长、繁殖、对环境有反应' }
];

const G4_SCI_QUIZ_QUESTIONS = [
  { unit: 0, q: '水受热体积会（  ）。', options: ['膨胀', '缩小', '不变', '消失'], answer: 0, explain: '热胀冷缩。' },
  { unit: 1, q: '月球是地球的（  ）。', options: ['卫星', '行星', '恒星', '彗星'], answer: 0, explain: '月球绕地球转。' },
  { unit: 2, q: '蚕是完全变态昆虫，经历（  ）阶段。', options: ['卵幼虫蛹成虫', '卵成虫', '幼虫成虫', '蛹成虫'], answer: 0, explain: '四阶段变态。' },
  { unit: 3, q: '红薯用（  ）繁殖。', options: ['块根/茎', '种子', '花', '果实'], answer: 0, explain: '营养繁殖。' },
  { unit: 4, q: '动物庇护所提供（  ）。', options: ['食物、水、安全', '只有阳光', '只有空气', '无作用'], answer: 0, explain: '生存必需条件。' }
];

const G4_SCI_SHIP_TIMELINE = [
  '提出问题（像科学家那样）',
  '观察与记录',
  '实验验证',
  '分析数据',
  '得出结论并交流'
];

const G4_SCI_FOOD_CHAINS = [
  { name: '草地食物链', items: ['草', '蚱蜢', '青蛙', '蛇'] },
  { name: '池塘食物链', items: ['浮游植物', '小鱼', '大鱼'] }
];

const G4_SCI_MATCH_PAIRS = [
  { term: '热胀冷缩', def: '物体受热膨胀、遇冷收缩' },
  { term: '自转', def: '地球绕自身轴旋转，产生昼夜' },
  { term: '完全变态', def: '卵→幼虫→蛹→成虫' },
  { term: '营养繁殖', def: '用根、茎、叶等营养器官繁殖' },
  { term: '庇护所', def: '动物躲避天敌、繁殖的场所' }
];
