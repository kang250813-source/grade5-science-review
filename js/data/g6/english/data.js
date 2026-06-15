const G6_ENGLISH_EXAM = {
  title: '六年级下册英语（译林版）',
  subtitle: '教材 8 单元 + 2 Project · 互动复习课件',
  note: '已整合译林版六下 8 单元（The lion and the mouse～Our dreams）与 Project 1/2。建议：教材单元 → 闪卡 → 测验 → 听力。听力用浏览器朗读（Chrome 效果最佳）。'
};

const G6_ENG_UNITS = [];

const G6_ENG_TOPIC_EXAMPLES = {};
const G6_ENG_PAPER_PICKS = [];

const G6_ENG_FLASHCARDS = [
  { unit: 0, q: 'Unit 1 寓言主题？', a: 'The lion and the mouse（狮子与老鼠）' },
  { unit: 1, q: 'Unit 2 主题？', a: 'Good habits（好习惯）' },
  { unit: 2, q: 'a little vs a few？', a: 'a little + 不可数；a few + 可数复数' },
  { unit: 3, q: '过马路先看？', a: 'zebra crossing 和 traffic lights' },
  { unit: 4, q: 'be going to 表？', a: '计划、打算要做的事' },
  { unit: 5, q: 'will 缩写 I\'ll = ?', a: 'I will' },
  { unit: 6, q: 'How long 问？', a: '停留多久 / 时间长度' },
  { unit: 7, q: 'want to be 表？', a: '将来想从事的职业' }
];

const G6_ENG_QUIZ_QUESTIONS = [
  { unit: 0, q: 'The lion ___ the mouse go.', options: ['let', 'lets', 'letted', 'letting'], answer: 0, explain: 'let 过去式仍为 let。' },
  { unit: 1, q: 'Wang Bing gets up ___ in the morning.', options: ['early', 'earlier', 'earliest', 'earli'], answer: 0, explain: 'early 作副词。' },
  { unit: 2, q: 'Mike drinks ___ water every day.', options: ['a little', 'a few', 'many', 'much eggs'], answer: 0, explain: 'water 不可数。' },
  { unit: 3, q: 'You ___ run on the road.', options: ['mustn\'t', 'must', 'can', 'should'], answer: 0, explain: '路上禁止跑。' },
  { unit: 4, q: 'Su Hai ___ going to buy some snacks.', options: ['is', 'are', 'am', 'be'], answer: 0, explain: 'Su Hai 第三人称单数 is。' },
  { unit: 5, q: 'I ___ ask my e-friend in Australia.', options: ['will', 'am', 'do', 'did'], answer: 0, explain: 'I\'ll = I will。' },
  { unit: 6, q: 'Where ___ you go for the holiday?', options: ['will', 'do', 'did', 'are'], answer: 0, explain: 'Will you go...?' },
  { unit: 7, q: 'Mike wants to be a ___.', options: ['dentist', 'dentists', 'teeth', 'tooth'], answer: 0, explain: 'dentist 牙医。' }
];

const G6_ENG_VOCAB_A = [
  { id: 'g6a1', q: 'The mouse said ___ , "Please don\'t eat me."', hint: 'quietly / quiet', answer: 'quietly', explain: '修饰动词用副词 quietly。' },
  { id: 'g6a2', q: 'Wang Bing never goes to bed ___.', hint: 'late / lately', answer: 'late', explain: 'go to bed late 晚睡。' },
  { id: 'g6a3', q: 'Yang Ling eats ___ rice every day.', hint: 'a little / a few', answer: 'a little', explain: 'rice 不可数。' },
  { id: 'g6a4', q: 'You must look for a ___ crossing.', hint: 'zebra / tiger', answer: 'zebra', explain: 'zebra crossing 斑马线。' },
  { id: 'g6a5', q: 'Liu Tao is ___ to bring some balloons.', hint: 'going / go', answer: 'going', explain: 'be going to 结构。' }
];

const G6_ENG_VOCAB_B = [
  { id: 'g6b1', q: 'The lion ___ (bite) the net, but that did not help.', base: 'bite', answer: 'bit', explain: 'bite 过去式 bit。' },
  { id: 'g6b2', q: 'Liu Tao ___ (do) his homework late at night.', base: 'do', answer: 'does', explain: '第三人称单数 does。' },
  { id: 'g6b3', q: 'We ___ (have) a party at Mike\'s house.', base: 'have', answer: 'are going to have', explain: 'be going to 表计划。' },
  { id: 'g6b4', q: 'I ___ (visit) Beijing this summer.', base: 'visit', answer: 'will visit', explain: 'will + 原形。' },
  { id: 'g6b5', q: 'She wants to ___ (be) a pianist.', base: 'be', answer: 'be', explain: 'want to be + 职业。' }
];

const G6_ENG_VOCAB_C = [
  { id: 'g6c1', q: 'The lion was very l___ and strong.', answer: 'arge', full: 'large', explain: 'large 大的。' },
  { id: 'g6c2', q: 'The mouse has s___ teeth.', answer: 'harp', full: 'sharp', explain: 'sharp 锋利的。' },
  { id: 'g6c3', q: 'Follow the rules and stay s___ on the road.', answer: 'afe', full: 'safe', explain: 'stay safe 保持安全。' },
  { id: 'g6c4', q: 'You will find k___ in Australia.', answer: 'angaroos', full: 'kangaroos', explain: 'kangaroo 袋鼠。' },
  { id: 'g6c5', q: 'Wang Bing wants to be an a___.', answer: 'stronaut', full: 'astronaut', explain: 'astronaut 宇航员。' }
];

const G6_ENG_DIALOGUE = {
  title: '谈论儿童节派对计划',
  blanks: [
    { id: 1, answer: 'C', explain: 'When are we going to have the party?' },
    { id: 2, answer: 'A', explain: 'We\'re going to have the party on Children\'s Day.' },
    { id: 3, answer: 'E', explain: 'What are you going to bring?' },
    { id: 4, answer: 'B', explain: 'I\'m going to bring some snacks and drinks.' },
    { id: 5, answer: 'D', explain: 'Let\'s have some fun first!' }
  ],
  options: [
    { id: 'A', text: "We're going to have the party on Children's Day." },
    { id: 'B', text: "I'm going to bring some snacks and drinks." },
    { id: 'C', text: 'When are we going to have the party?' },
    { id: 'D', text: "Let's have some fun first!" },
    { id: 'E', text: 'What are you going to bring to the party?' }
  ],
  lines: [
    { speaker: 'Mike', blank: 1 },
    { speaker: 'Su Hai', blank: 2 },
    { speaker: 'Mike', text: "Great! Where are we going to have it?" },
    { speaker: 'Su Hai', text: "At your house." },
    { speaker: 'Yang Ling', blank: 3 },
    { speaker: 'Wang Bing', blank: 4 },
    { speaker: 'Liu Tao', text: "I'm going to bring some balloons!" },
    { speaker: 'Mike', blank: 5 }
  ]
};

const G6_ENG_READING_MYOPIA = {
  title: 'Road Safety（行人安全）',
  passage: `How can you cross a busy road safely?
First, look for a zebra crossing. Then look at the traffic lights and wait for the green man.
If there is no zebra crossing, wait on the pavement. Look left, then right, then left again.
You must not run or play football on the road. Follow the rules and stay safe!`,
  questions: [
    { q: 'What must you wait for at traffic lights?', options: ['The green man.', 'The red man.', 'Any light.'], answer: 0, explain: 'Wait for the green man.' },
    { q: 'You can run quickly on the road.', answer: false },
    { q: 'Before crossing, you should look left, right, then left again.', answer: true },
    { q: 'A zebra crossing helps you cross safely.', answer: true }
  ]
};

const G6_ENG_READING_TEA = {
  title: 'Australia — An Interesting Country',
  passage: `Australia is an interesting country. You will find kangaroos and koalas there.
Australian football games are very exciting. Sydney is a beautiful city. Many people visit it every year.
People in Australia welcome visitors. The weather is warm and sunny. You will love this country!`,
  questions: [
    { q: 'You can find kangaroos in Australia.', answer: true },
    { q: 'Sydney is in the UK.', answer: false },
    { q: 'Australian football is exciting.', answer: true },
    { q: 'The passage says people welcome visitors.', answer: true },
    { q: 'Koalas are mentioned in the text.', answer: true }
  ]
};

const G6_ENG_WRITING = {
  prompt: '写一写你的暑假计划：去哪里、怎样去、待多久、做什么。不少于 5 句。',
  template: 'This summer, I will go to ______ by ______. I will stay there for ______. I will ______.',
  examples: [
    { sentence: 'This summer, I will go to Beijing by train.' },
    { sentence: 'I will stay there for two weeks.' },
    { sentence: 'I will visit my aunt and uncle and take some photos.' },
    { sentence: 'I will have a wonderful summer holiday!' }
  ]
};

const G6_ENG_LISTENING = [];
