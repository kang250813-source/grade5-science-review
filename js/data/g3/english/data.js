const G3_ENGLISH_EXAM = {
  title: '三年级下册英语（译林版）',
  subtitle: '教材 8 单元 + 2 Project · 互动复习课件',
  note: '已整合译林版三下 8 单元（In class～We\'re twins!）与 Project 1/2。建议：教材单元 → 闪卡 → 测验 → 听力。'
};

const G3_ENG_UNITS = [];

const G3_ENG_TOPIC_EXAMPLES = {};
const G3_ENG_PAPER_PICKS = [];

const G3_ENG_FLASHCARDS = [
  { unit: 0, q: 'Unit 1 主题？', a: 'In class（课堂用语）' },
  { unit: 1, q: 'Unit 2 主题？', a: 'In the library（图书馆规则）' },
  { unit: 2, q: 'Is this your pencil? 答？', a: 'Yes, it is. / No, it isn\'t.' },
  { unit: 3, q: 'Where\'s the bird? 答？', a: 'It\'s in/on/under/behind...' },
  { unit: 4, q: 'How old are you? 答？', a: 'I\'m ...' },
  { unit: 5, q: 'What time is it? 答？', a: 'It\'s ... o\'clock.' },
  { unit: 6, q: 'Unit 7 主题？', a: 'On the farm（农场动物）' },
  { unit: 7, q: 'We\'re twins! 意思？', a: '我们是双胞胎！' }
];

const G3_ENG_QUIZ_QUESTIONS = [
  { unit: 0, q: 'Stand up 意思？', options: ['起立', '坐下', '开门', '关窗'], answer: 0, explain: '课堂用语。' },
  { unit: 1, q: 'Don\'t talk 意思？', options: ['不要说话', '不要跑', '不要吃', '不要睡'], answer: 0, explain: '图书馆规则。' },
  { unit: 2, q: 'Is this ___ ruler?', options: ['your', 'you', 'yours', 'you\'re'], answer: 0, explain: 'your + 名词。' },
  { unit: 3, q: 'The bird is ___ the tree.', options: ['in', 'at', 'of', 'to'], answer: 0, explain: 'in the tree 在树上。' },
  { unit: 4, q: 'How old are you? I\'m ___.', options: ['nine', 'nine o\'clock', 'nine years', 'ninths'], answer: 0, explain: 'I\'m nine.' },
  { unit: 5, q: 'It\'s twelve ___.', options: ['o\'clock', 'clock', 'a clock', 'clocks'], answer: 0, explain: '整点 o\'clock。' },
  { unit: 6, q: 'A ___ says "moo".', options: ['cow', 'pig', 'duck', 'cat'], answer: 0, explain: 'cow 奶牛。' },
  { unit: 7, q: 'We ___ twins.', options: ['are', 'is', 'am', 'be'], answer: 0, explain: 'We are twins.' }
];

const G3_ENG_VOCAB_A = [
  { id: 'g3a1', q: 'Please open the ___.', hint: 'door / window', answer: 'door', explain: 'open the door 开门。' },
  { id: 'g3a2', q: 'Don\'t ___ in the library.', hint: 'talk / run', answer: 'talk', explain: '不要说话。' },
  { id: 'g3a3', q: 'Is this your ___?', hint: 'pencil / pen', answer: 'pencil', explain: 'Is this your pencil?' },
  { id: 'g3a4', q: 'The bird is ___ the desk.', hint: 'on / in / under', answer: 'on', explain: 'on the desk 在桌上。' },
  { id: 'g3a5', q: 'I\'m ___ years old.', hint: 'nine / nice', answer: 'nine', explain: '年龄表达。' }
];

const G3_ENG_VOCAB_B = [
  { id: 'g3b1', q: 'Please ___ (close) the window.', base: 'close', answer: 'close', explain: '祈使句用原形。' },
  { id: 'g3b2', q: 'This is ___ (I) book.', base: 'I', answer: 'my', explain: '形容词性物主代词。' },
  { id: 'g3b3', q: 'Where ___ (be) the bird?', base: 'be', answer: 'is', explain: 'the bird 单数 is。' },
  { id: 'g3b4', q: 'What time ___ (be) it?', base: 'be', answer: 'is', explain: 'What time is it?' },
  { id: 'g3b5', q: 'They ___ (be) pigs.', base: 'be', answer: 'are', explain: '复数 are。' }
];

const G3_ENG_VOCAB_C = [
  { id: 'g3c1', q: 'Stand u___.', answer: 'p', full: 'up', explain: 'Stand up 起立。' },
  { id: 'g3c2', q: 'Shh. Don\'t t___.', answer: 'alk', full: 'talk', explain: 'Don\'t talk.' },
  { id: 'g3c3', q: 'Is this your r___?', answer: 'uler', full: 'ruler', explain: '直尺。' },
  { id: 'g3c4', q: 'It\'s a c___. (farm)', answer: 'ow', full: 'cow', explain: '奶牛。' },
  { id: 'g3c5', q: 'We\'re t___.', answer: 'wins', full: 'twins', explain: '双胞胎。' }
];

const G3_ENG_DIALOGUE = {
  title: '课堂对话',
  blanks: [
    { id: 1, answer: 'A', explain: 'Stand up.' },
    { id: 2, answer: 'C', explain: 'Good morning, class.' },
    { id: 3, answer: 'B', explain: 'Good morning, Mr Green.' },
    { id: 4, answer: 'E', explain: 'Sit down, please.' },
    { id: 5, answer: 'D', explain: 'Yes, Mr Green.' }
  ],
  options: [
    { id: 'A', text: 'Stand up.' },
    { id: 'B', text: 'Good morning, Mr Green.' },
    { id: 'C', text: 'Good morning, class.' },
    { id: 'D', text: 'Yes, Mr Green.' },
    { id: 'E', text: 'Sit down, please.' }
  ],
  lines: [
    { speaker: 'Mr Green', blank: 1 },
    { speaker: 'Mr Green', blank: 2 },
    { speaker: 'Class', blank: 3 },
    { speaker: 'Mr Green', blank: 4 },
    { speaker: 'Liu Tao', text: 'Please open the door.' },
    { speaker: 'Mr Green', text: 'Liu Tao, please open the door.' },
    { speaker: 'Liu Tao', blank: 5 }
  ]
};

const G3_ENG_READING_MYOPIA = {
  title: 'In the library',
  passage: `Hello, I'm in the library. Shh! Don't talk.
Don't run. Don't eat or drink.
You can read books here. You can write here.
I like the library. It is quiet and nice.`,
  questions: [
    { q: 'Can you talk in the library?', options: ['No.', 'Yes.', 'Sometimes.'], answer: 0, explain: 'Don\'t talk.' },
    { q: 'You can read books in the library.', answer: true },
    { q: 'You can run in the library.', answer: false },
    { q: 'The library is quiet.', answer: true }
  ]
};

const G3_ENG_READING_TEA = {
  title: 'On the farm',
  passage: `This is a farm. I can see a cow, a pig, a duck and a chicken.
The cow is big. It says "moo".
The pig is fat. It says "oink".
The duck can swim. The chicken is small.
I like the farm!`,
  questions: [
    { q: 'The cow says "moo".', answer: true },
    { q: 'The pig is thin.', answer: false },
    { q: 'The duck can swim.', answer: true },
    { q: 'There is a cat on the farm.', answer: false }
  ]
};

const G3_ENG_WRITING = {
  prompt: '写一写你的一天：几点起床、上学、吃午饭、回家、睡觉。不少于 4 句。',
  template: 'I get up at ______. I go to school at ______. I have lunch at ______. I go to bed at ______.',
  examples: [
    { sentence: 'I get up at seven.' },
    { sentence: 'I go to school at seven thirty.' },
    { sentence: 'I have lunch at twelve.' },
    { sentence: 'I go to bed at nine.' }
  ]
};

const G3_ENG_LISTENING = [];
