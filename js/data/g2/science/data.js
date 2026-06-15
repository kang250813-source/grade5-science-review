const G2_SCI_EXAM = {
  title: '苏教版二年级下册科学',
  subtitle: '教材 4 单元 · 互动复习课件',
  note: '已整合苏教二下 4 单元（材料、磁铁、土壤与生命、工具箱）。建议：教材单元 → 闪卡 → 测验。'
};

const G2_SCI_UNITS = [];

const G2_SCI_FLASHCARDS = [
  { unit: 0, q: '常见材料有哪些？', a: '木材、金属、塑料、橡胶、布料、玻璃等' },
  { unit: 1, q: '磁铁能吸什么？', a: '铁、镍、钴等，不能吸铜、铝' },
  { unit: 2, q: '小葱生长需要什么？', a: '水、阳光、空气、适宜温度' },
  { unit: 3, q: '常用工具有？', a: '锤子、螺丝刀、扳手、剪刀等' }
];

const G2_SCI_QUIZ_QUESTIONS = [
  { unit: 0, q: '铅笔芯主要材料是（  ）。', options: ['石墨', '橡胶', '尼龙', '布料'], answer: 0, explain: '铅笔芯含石墨。' },
  { unit: 1, q: '磁铁两极相吸时是（  ）。', options: ['N 和 S', 'N 和 N', 'S 和 S', '任意'], answer: 0, explain: '异极相吸。' },
  { unit: 2, q: '土壤中有（  ）。', options: ['小动物', '只有石头', '没有空气', '不能种植物'], answer: 0, explain: '土壤中有蚯蚓等小动物。' },
  { unit: 3, q: '拧螺丝用（  ）。', options: ['螺丝刀', '锤子', '剪刀', '直尺'], answer: 0, explain: '螺丝刀拧螺丝。' }
];

const G2_SCI_SHIP_TIMELINE = [
  '古代：水浮法、碗唇旋定法用磁针指方向',
  '沈括《梦溪笔谈》记载四种指南针方法',
  '现代：指南针用于导航',
  '科技发展历程：材料与工具不断更新'
];

const G2_SCI_FOOD_CHAINS = [
  { name: '土壤食物链', items: ['落叶', '蚯蚓', '鸟'] },
  { name: '植物链', items: ['阳光', '小葱', '人'] }
];

const G2_SCI_MATCH_PAIRS = [
  { term: '石墨', def: '铅笔芯的主要材料' },
  { term: '纳米材料', def: '具有特殊性能的新材料（如防水纸杯）' },
  { term: '磁力', def: '磁铁吸引铁等物质的本领' },
  { term: '南极 S', def: '磁铁两极之一，与 N 极异极相吸' },
  { term: '指南针', def: '利用磁铁指示南北的仪器' },
  { term: '土壤', def: '植物生长、小动物栖息的场所' }
];
