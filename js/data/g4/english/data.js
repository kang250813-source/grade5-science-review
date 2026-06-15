const G4_ENGLISH_EXAM = {
  title: '四年级下册英语（译林版）',
  subtitle: '教材 8 单元 + 2 Project · 互动复习课件',
  note: '已整合译林版四下 8 单元（Our school subjects～How are you?）与 Project 1/2。建议：教材单元 → 闪卡 → 测验 → 听力。'
};

const G4_ENG_UNITS = [];

const G4_ENG_TOPIC_EXAMPLES = {};
const G4_ENG_PAPER_PICKS = [];

const G4_ENG_FLASHCARDS = [
  { unit: 0, q: 'Unit 1 主题？', a: 'Our school subjects（课程）' },
  { unit: 1, q: 'Unit 2 主题？', a: 'After school（课后活动）' },
  { unit: 2, q: 'Unit 3 主题？', a: 'My day（一天作息）' },
  { unit: 3, q: 'Unit 4 主题？', a: 'Drawing in the park（公园景物）' },
  { unit: 4, q: 'What time is it? 答？', a: 'It\'s ... o\'clock.' },
  { unit: 5, q: 'Whose dress is this? 答？', a: 'It\'s ...\'s.' },
  { unit: 6, q: 'What\'s the matter? 答？', a: 'I have a ... / I\'m ...' },
  { unit: 7, q: 'How are you? 电话用语？', a: 'This is ... speaking.' }
];

const G4_ENG_QUIZ_QUESTIONS = [
  { unit: 0, q: 'I like ___ and Maths.', options: ['Chinese', 'Chineses', 'a Chinese', 'China'], answer: 0, explain: '科目名词。' },
  { unit: 1, q: 'Let\'s go ___ .', options: ['swimming', 'swim', 'swims', 'swam'], answer: 0, explain: 'go + V-ing。' },
  { unit: 2, q: 'I get up ___ seven.', options: ['at', 'in', 'on', 'to'], answer: 0, explain: 'at + 时刻。' },
  { unit: 3, q: 'Can you draw a ___ ?', options: ['tree', 'trees', 'treeing', 'treed'], answer: 0, explain: '可数单数。' },
  { unit: 4, q: 'In spring, it\'s ___.', options: ['warm', 'cold', 'hot', 'cool'], answer: 0, explain: '春天温暖。' },
  { unit: 5, q: 'Whose cap is this? It\'s ___.', options: ['Mike\'s', 'Mike', 'Mikes', 'Mikes\''], answer: 0, explain: '名词所有格。' },
  { unit: 6, q: 'I have a ___.', options: ['fever', 'fevered', 'fevers', 'fevering'], answer: 0, explain: 'have a fever 发烧。' },
  { unit: 7, q: '___ is that speaking?', options: ['Who', 'What', 'Where', 'When'], answer: 0, explain: '电话用语 Who is that?' }
];

const G4_ENG_VOCAB_A = [
  { id: 'g4a1', q: 'We have English, Chinese, Maths, Art, PE, Music and ___.', hint: 'Science', answer: 'Science', explain: '科学课 Science。' },
  { id: 'g4a2', q: 'Let\'s go and play ___.', hint: 'football / basketball', answer: 'football', explain: 'play + 球类。' },
  { id: 'g4a3', q: 'I have ___ every day.', hint: 'breakfast / lunch', answer: 'breakfast', explain: 'have breakfast 吃早餐。' },
  { id: 'g4a4', q: 'I can see a ___ in the park.', hint: 'flower / tree', answer: 'flower', explain: '公园景物。' },
  { id: 'g4a5', q: 'In summer, it\'s very ___.', hint: 'hot / cold', answer: 'hot', explain: '夏天热。' }
];

const G4_ENG_VOCAB_B = [
  { id: 'g4b1', q: 'What ___ do you like?', base: 'subject', answer: 'subjects', explain: 'What subjects...?' },
  { id: 'g4b2', q: 'I ___ (go) home at four.', base: 'go', answer: 'go', explain: '一般现在时。' },
  { id: 'g4b3', q: 'She ___ (have) lunch at twelve.', base: 'have', answer: 'has', explain: '第三人称单数 has。' },
  { id: 'g4b4', q: 'This dress is ___. (Su Hai)', base: 'Su Hai', answer: 'Su Hai\'s', explain: '所有格。' },
  { id: 'g4b5', q: 'I ___ (be) ill today.', base: 'be', answer: 'am', explain: 'I am ill.' }
];

const G4_ENG_VOCAB_C = [
  { id: 'g4c1', q: 'We have a new t___.', answer: 'imetable', full: 'timetable', explain: '课程表。' },
  { id: 'g4c2', q: 'Let\'s go s___.', answer: 'wimming', full: 'swimming', explain: '去游泳。' },
  { id: 'g4c3', q: 'I get up at s___ o\'clock.', answer: 'even', full: 'seven', explain: '七点起床。' },
  { id: 'g4c4', q: 'In w___ it\'s cold.', answer: 'inter', full: 'winter', explain: '冬天。' },
  { id: 'g4c5', q: 'I have a h___.', answer: 'eadache', full: 'headache', explain: '头疼。' }
];

const G4_ENG_DIALOGUE = {
  title: '谈论课程表',
  blanks: [
    { id: 1, answer: 'B', explain: 'What subjects do you like?' },
    { id: 2, answer: 'A', explain: 'I like Chinese and Maths.' },
    { id: 3, answer: 'D', explain: 'What about you, Yang Ling?' },
    { id: 4, answer: 'C', explain: 'I like Art and Music.' },
    { id: 5, answer: 'E', explain: 'Oh! It\'s time for PE.' }
  ],
  options: [
    { id: 'A', text: 'I like Chinese and Maths.' },
    { id: 'B', text: 'What subjects do you like?' },
    { id: 'C', text: 'I like Art and Music.' },
    { id: 'D', text: 'What about you, Yang Ling?' },
    { id: 'E', text: 'Oh! It\'s time for PE.' }
  ],
  lines: [
    { speaker: 'Mike', blank: 1 },
    { speaker: 'Wang Bing', blank: 2 },
    { speaker: 'Mike', blank: 3 },
    { speaker: 'Yang Ling', blank: 4 },
    { speaker: 'Tim', text: 'Me too!' },
    { speaker: 'Miss Li', blank: 5 }
  ]
};

const G4_ENG_READING_MYOPIA = {
  title: 'My Day',
  passage: `I get up at seven in the morning. I have breakfast at seven twenty.
I go to school at seven forty. I have four lessons in the morning.
I have lunch at school. I go home at four in the afternoon.
In the evening, I do my homework and read books. I go to bed at nine.`,
  questions: [
    { q: 'When does the boy get up?', options: ['At seven.', 'At eight.', 'At six.'], answer: 0, explain: 'I get up at seven.' },
    { q: 'He has lunch at home.', answer: false },
    { q: 'He goes home at four in the afternoon.', answer: true },
    { q: 'He goes to bed at nine.', answer: true }
  ]
};

const G4_ENG_READING_TEA = {
  title: 'Seasons',
  passage: `In spring, it is warm. We can fly kites and go boating.
In summer, it is hot. We can go swimming and eat ice creams.
In autumn, it is cool. We can pick apples and go climbing.
In winter, it is cold. We can make snowmen and go skating.`,
  questions: [
    { q: 'In spring, it is warm.', answer: true },
    { q: 'We can go swimming in winter.', answer: false },
    { q: 'In autumn, we can pick apples.', answer: true },
    { q: 'In summer, it is hot.', answer: true }
  ]
};

const G4_ENG_WRITING = {
  prompt: '写一写你的一天：几点起床、上学、吃午饭、回家、睡觉。不少于 5 句。',
  template: 'I get up at ______. I go to school at ______. I have lunch at ______. I go home at ______. I go to bed at ______.',
  examples: [
    { sentence: 'I get up at seven.' },
    { sentence: 'I go to school at seven forty.' },
    { sentence: 'I have lunch at twelve at school.' },
    { sentence: 'I go home at four in the afternoon.' },
    { sentence: 'I go to bed at nine.' }
  ]
};

const G4_ENG_LISTENING = [];
