const G3_SCI_EXAM = {
  title: '苏教版三年级下册科学',
  subtitle: '教材 5 单元 · 互动复习课件',
  note: '已整合苏教三下 5 单元（植物一生、植物与环境、声音、材料、天气）。建议：教材单元 → 闪卡 → 测验。'
};

const G3_SCI_UNITS = [];

const G3_SCI_FLASHCARDS = [
  { unit: 0, q: '种子发芽需要什么？', a: '水、适宜温度、空气' },
  { unit: 1, q: '沙漠植物特点？', a: '茎储水、根扎深、叶小' },
  { unit: 2, q: '声音怎么产生？', a: '物体振动' },
  { unit: 3, q: '纸是人造还是天然？', a: '人造材料' },
  { unit: 4, q: '测量气温用什么？', a: '气温计' }
];

const G3_SCI_QUIZ_QUESTIONS = [
  { unit: 0, q: '植物结果后留下（  ）。', options: ['种子', '石头', '水', '空气'], answer: 0, explain: '传播后代。' },
  { unit: 1, q: '荷花是（  ）植物。', options: ['水生', '沙漠', '岩石', '高山'], answer: 0, explain: '生长在水里。' },
  { unit: 2, q: '声音在真空中（  ）。', options: ['不能传播', '很大', '不变', '更快'], answer: 0, explain: '需要介质。' },
  { unit: 3, q: '下列天然材料是（  ）。', options: ['棉花', '塑料', '玻璃', '人造革'], answer: 0, explain: '来自自然。' },
  { unit: 4, q: '风向指（  ）。', options: ['风吹来的方向', '风吹去的方向', '温度', '湿度'], answer: 0, explain: '风吹来的方向。' }
];

const G3_SCI_SHIP_TIMELINE = [
  '提出问题',
  '观察与记录',
  '对比实验',
  '分析数据',
  '得出结论'
];

const G3_SCI_FOOD_CHAINS = [
  { name: '简单链', items: ['草', '兔', '狼'] },
  { name: '池塘链', items: ['浮游植物', '小鱼', '大鱼'] }
];

const G3_SCI_MATCH_PAIRS = [
  { term: '萌发', def: '种子发芽' },
  { term: '振动', def: '声音产生的原因' },
  { term: '天然材料', def: '直接来自自然界，如木材、棉花' },
  { term: '人造材料', def: '人工加工制造，如塑料、纸' },
  { term: '气温计', def: '测量空气温度的仪器' }
];
