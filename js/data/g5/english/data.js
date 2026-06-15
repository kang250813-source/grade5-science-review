const ENGLISH_EXAM = {
  title: '2025-2026 学年五年级英语下册（译林版 / 南京卷）',
  subtitle: '南京期末模拟 + 亮点给力大试卷 · 互动复习课件',
  note: '已整合译林版五下 8 单元与亮点给力、南京期末卷。建议：知识点 → 闪卡 → 测验 → 听力 → 趣味互动。听力用浏览器朗读（Chrome 效果最佳）。'
};

/* ── 知识点单元（与科学结构一致） ── */
const ENG_UNITS = [
  {
    id: 'eu1',
    title: '第一单元 · 名词、代词与数量词',
    emoji: '📝',
    topics: [
      {
        id: 'e1t1',
        title: '可数与不可数名词',
        points: [
          '不可数名词：food, bread, cola, water — 用 it，不用 them',
          '可数名词复数：grapes, cars, students — 用 they / them',
          'Here is + 不可数/单数；Here are + 复数',
          '例：Here is some bread for you.（bread 不可数，用 is）'
        ]
      },
      {
        id: 'e1t2',
        title: 'too much 与 too many',
        points: [
          'too much + 不可数名词：too much cola（太多可乐）',
          'too many + 可数名词复数：too many apples',
          'so many 同样修饰可数名词复数',
          'It\'s bad for him. — for 后面用宾格 him，不用 he'
        ]
      },
      {
        id: 'e1t3',
        title: '人称代词宾格',
        points: [
          'Let us (us) show you... — Let 后接宾格',
          '主格 I/we/he/she/they → 宾格 me/us/him/her/them',
          'for / to / with 等介词后也常用宾格'
        ]
      }
    ]
  },
  {
    id: 'eu2',
    title: '第二单元 · 时态',
    emoji: '⏰',
    topics: [
      {
        id: 'e2t1',
        title: '一般现在时',
        points: [
          '表示习惯、经常做的事：every day, often, usually',
          '第三人称单数加 -s：He swims. / She looks pretty.',
          '例：Mr Green swims every day.',
          '感官动词：look / smell / sound + 形容词（The flower looks pretty.）'
        ]
      },
      {
        id: 'e2t2',
        title: '现在进行时',
        points: [
          'be + doing：is/are + 动词-ing',
          'now, Look! 等词提示正在发生',
          '例：Look! He is swimming now.',
          'The students are having a Music lesson.'
        ]
      },
      {
        id: 'e2t3',
        title: '两种时态对比',
        points: [
          'every day → 一般现在时 swims',
          'now / Look! → 现在进行时 is swimming',
          '同一主语可同时出现两种时态描述习惯和当前动作'
        ]
      }
    ]
  },
  {
    id: 'eu3',
    title: '第三单元 · 介词与固定搭配',
    emoji: '🧭',
    topics: [
      {
        id: 'e3t1',
        title: '时间介词',
        points: [
          '具体时刻用 at：at 7:00, at noon',
          'every morning / every day 前不加介词',
          '月份/季节用 in：in February, in spring',
          '具体日期用 on：on the eighth of April'
        ]
      },
      {
        id: 'e3t2',
        title: '地点与方位',
        points: [
          'at the traffic lights — 在红绿灯处',
          'on your left / on your right — 在你左/右边',
          'turn right at... — 在……处右转'
        ]
      },
      {
        id: 'e3t3',
        title: '交通方式',
        points: [
          'by + 交通工具（不加冠词）：by car, by bus, by bike, by metro',
          'on foot — 步行（不用 by foot）',
          'ride a bike — 骑自行车（动词短语，可作谓语）',
          '例：I ride a bike there. / He goes by car.'
        ]
      }
    ]
  },
  {
    id: 'eu4',
    title: '第四单元 · 疑问句与交际',
    emoji: '💬',
    topics: [
      {
        id: 'e4t1',
        title: 'Why 与 Because',
        points: [
          'Why are you so sad? — 问原因',
          'Because I can\'t find my book. — 答原因',
          'Why 提问，Because 回答，时态要一致'
        ]
      },
      {
        id: 'e4t2',
        title: '节日与日期',
        points: [
          'When\'s Mother\'s Day? — 母亲节在五月第二个星期日',
          'Father\'s Day — 六月第三个星期日',
          'Lantern Festival — 元宵节，农历正月十五',
          'the + 序数词 + of + 月份：the eighth of April'
        ]
      },
      {
        id: 'e4t3',
        title: '节日对话常用句',
        points: [
          'What\'s your favorite festival?',
          'What do you usually do at...?',
          'We usually have a big dinner with my family.',
          'We also guess riddles on the lanterns.（猜灯谜）'
        ]
      }
    ]
  },
  {
    id: 'eu5',
    title: '第五单元 · 词汇与短语',
    emoji: '📚',
    topics: [
      {
        id: 'e5t1',
        title: '日常活动短语',
        points: [
          'make the bed — 铺床',
          'pick grapes / pick some fruit — 摘葡萄/水果',
          'ride a bike — 骑自行车',
          'do the shopping — 购物',
          'see films — 看电影'
        ]
      },
      {
        id: 'e5t2',
        title: '身体与健康',
        points: [
          'have a fever — 发烧',
          'have a toothache — 牙疼',
          'have a headache — 头疼',
          'feel well — 感觉身体好',
          'Don\'t feel well — 感觉不舒服'
        ]
      },
      {
        id: 'e5t3',
        title: '词形变化',
        points: [
          'drive → driver（司机）',
          'eight → eighth（第八，序数词）',
          'try → trying（现在分词）',
          'The Browns are... — 布朗一家（复数）'
        ]
      }
    ]
  },
  {
    id: 'eu6',
    title: '第六单元 · 阅读与写作',
    emoji: '📖',
    topics: [
      {
        id: 'e6t1',
        title: '阅读：近视（Myopia）',
        points: [
          '近视原因：长时间用电脑手机、户外活动少、遗传',
          '中国儿童近视率 2023 年约 53.6%',
          '预防：每天户外活动至少 two hours',
          '20/20/20 规则：每 20 分钟看 20 英尺外 20 秒',
          'get enough sleep — 充足睡眠'
        ]
      },
      {
        id: 'e6t2',
        title: '阅读：中国茶文化',
        points: [
          '六大茶类：white, yellow, green, oolong, black, dark tea',
          '《茶经》The Classic of Tea — 著名茶书',
          '广东福建 — gong fu tea（功夫茶）',
          '北京 — flowering tea（花茶）',
          '拉萨 — buttered tea（酥油茶），为健康而喝',
          '给客人倒茶不要倒太满 — 太烫不好拿'
        ]
      },
      {
        id: 'e6t3',
        title: '写作句型',
        points: [
          '基本句型：Sb goes to + 地点 + to + 动词 + by + 交通方式',
          '例：John goes to the cinema to see films on foot.',
          '例：His father goes to the library to read books by car.',
          '写作不少于 5 句话，注意主语人称和动词形式'
        ]
      }
    ]
  }
];

const ENG_FLASHCARDS = [
  { unit: 0, q: '不可数名词 food / bread 用什么代词？', a: '用 it，不用 them' },
  { unit: 0, q: 'too much 和 too many 区别？', a: 'too much + 不可数；too many + 可数复数' },
  { unit: 0, q: 'for 后面用 he 还是 him？', a: 'for him（介词后用宾格）' },
  { unit: 1, q: 'every day 用什么时态？', a: '一般现在时，第三人称加 -s' },
  { unit: 1, q: 'Look! He ___ now. 填什么时态？', a: '现在进行时 is swimming' },
  { unit: 1, q: 'look / smell / sound 后面接什么？', a: '接形容词，如 looks pretty, smells nice' },
  { unit: 2, q: '7:00 前面用什么介词？', a: 'at 7:00' },
  { unit: 2, q: 'every morning 前面要加介词吗？', a: '不要，直接 every morning' },
  { unit: 2, q: '步行怎么说？', a: 'on foot（不用 by foot）' },
  { unit: 2, q: 'by car 和 ride a bike 区别？', a: 'by car 是方式状语；ride a bike 是动词短语' },
  { unit: 3, q: '问原因用什么词？', a: 'Why...? 回答 Because...' },
  { unit: 3, q: 'Mother\'s Day 什么时候？', a: '五月第二个星期日 the second Sunday of May' },
  { unit: 3, q: '元宵节英文？', a: 'Lantern Festival，农历正月十五' },
  { unit: 4, q: 'make the bed 什么意思？', a: '铺床' },
  { unit: 4, q: 'have a fever 什么意思？', a: '发烧' },
  { unit: 4, q: 'drive 的名词形式（司机）？', a: 'driver' },
  { unit: 5, q: '预防近视每天户外活动多久？', a: 'at least two hours' },
  { unit: 5, q: '中国六大茶类包括 black tea 吗？', a: '包括，还有 green, white, yellow, oolong, dark' },
  { unit: 5, q: '写作基本句型？', a: 'Sb goes to + 地点 + to + 动词 + by/on...' },
  { unit: 3, q: 'guess riddles 什么意思？', a: '猜灯谜' }
];

const ENG_QUIZ_QUESTIONS = [
  { unit: 0, q: "This food is bad. We can't eat ______.", options: ['them', 'it', 'us'], answer: 1, explain: 'food 不可数，用 it。' },
  { unit: 0, q: '—Here ______ some bread for you.', options: ['is', 'are', 'have'], answer: 0, explain: 'bread 不可数，用 is。' },
  { unit: 0, q: "Mike shouldn't drink ______ cola.", options: ['too many', 'too much', 'so many'], answer: 1, explain: 'cola 不可数用 too much。' },
  { unit: 1, q: '—This flower ______ pretty.', options: ['look', 'looks', 'is looking'], answer: 1, explain: '第三人称单数 looks。' },
  { unit: 1, q: 'Mr Green ______ every day. Look! He ______ now.', options: ['swims; is swimming', 'swims; swimming', 'swim; is swimming'], answer: 0, explain: 'every day 一般现在时；now 现在进行时。' },
  { unit: 2, q: 'My father goes to work ______ 7:00 ______ every morning.', options: ['in; in', 'in; on', 'at; /'], answer: 2, explain: 'at 7:00；every morning 不加介词。' },
  { unit: 2, q: 'Turn right ______ the traffic lights.', options: ['in', 'at', 'on'], answer: 1, explain: 'at the traffic lights。' },
  { unit: 2, q: 'John goes to the park by ______.', options: ['car', 'a car', 'cars'], answer: 0, explain: 'by car 固定搭配，不加冠词。' },
  { unit: 3, q: "—______ you so sad? —Because I can't find my book.", options: ['What are', 'Why are', 'Why do'], answer: 1, explain: 'Because 回答，用 Why are。' },
  { unit: 3, q: "—When's ______? —It's on the second Sunday of May.", options: ["Labour Day", "Father's Day", "Mother's Day"], answer: 2, explain: '五月第二个星期日是母亲节。' },
  { unit: 4, q: "Tim has a ______. He can't eat anything.", options: ['headache', 'toothache', 'fever'], answer: 1, explain: '不能吃东西，牙疼 toothache。' },
  { unit: 4, q: "It's on the ______ of April.", options: ['eight', 'eighth', 'eights'], answer: 1, explain: '日期用序数词 eighth。' },
  { unit: 5, q: 'Who may also have myopia if a girl has myopia?', options: ['Her parent.', 'Her teacher.', 'Her friend.'], answer: 0, explain: '遗传，父母可能近视。' },
  { unit: 5, q: 'Children should play outside for at least ______ every day.', options: ['one hour', 'two hours', 'three hours'], answer: 1, explain: '至少 two hours。' },
  { unit: 5, q: 'Black tea is one of the six main kinds of tea.', options: ['True 正确', 'False 错误'], answer: 0, explain: '六大茶类包括 black tea。' },
  { unit: 5, q: 'People in Guangdong love ______.', options: ['flowering tea', 'gong fu tea', 'buttered tea'], answer: 1, explain: '广东福建喜欢功夫茶。' },
  { unit: 1, q: "Liu Tao doesn't ______ well today.", options: ['feel', 'sound', 'smell'], answer: 0, explain: 'feel well 身体好。' },
  { unit: 4, q: 'Let ______ show you around.', options: ['we', 'us', 'our'], answer: 1, explain: 'Let 后接宾格 us。' },
  { unit: 4, q: 'She wants to ______ some grapes.', options: ['catch', 'pick', 'take'], answer: 1, explain: 'pick 摘。' },
  { unit: 2, q: 'I sometimes ______ there to buy books.', options: ['by bike', 'ride a bike', 'riding a bike'], answer: 1, explain: '缺谓语动词，用 ride a bike。' }
];

/* ── 趣味互动：词汇填空题 ── */
const ENG_VOCAB_A = [
  { id: 'a1', q: 'Autumn comes ______ summer.', hint: 'before / after', answer: 'after', explain: '秋天在夏天之后。' },
  { id: 'a2', q: "It's 7 o'clock. The Browns ______ having breakfast.", hint: 'is / are', answer: 'are', explain: 'The Browns 复数，用 are。' },
  { id: 'a3', q: 'She wants to ______ some grapes to make juice.', hint: 'catch / pick', answer: 'pick', explain: 'pick 表示摘、采。' },
  { id: 'a4', q: 'Tom is five. He often helps his parents ______.', hint: 'make the bed / drive the car', answer: 'make the bed', explain: '五岁孩子帮忙铺床。' },
  { id: 'a5', q: 'I sometimes ______ there to buy books.', hint: 'ride a bike / by bike', answer: 'ride a bike', explain: '句中缺谓语动词。' }
];

const ENG_VOCAB_B = [
  { id: 'b1', q: "It's three in the afternoon. The students ______ a Music lesson.", base: 'have', answer: 'are having', explain: '现在进行时。' },
  { id: 'b2', q: 'Let ______ show you around our school.', base: 'we', answer: 'us', explain: 'Let 后接宾格 us。' },
  { id: 'b3', q: 'My father is a taxi ______. He often ______ me to school.', base: 'drive', answer: 'driver,drives', explain: 'driver；often + drives。', multi: true },
  { id: 'b4', q: 'The girl ______ on the dress. It ______ fit.', base: 'try / not', answer: "is trying,doesn't", explain: 'is trying；doesn\'t fit。', multi: true },
  { id: 'b5', q: "It's on the ______ of April.", base: 'eight', answer: 'eighth', explain: '序数词 eighth。' }
];

const ENG_VOCAB_C = [
  { id: 'c1', q: "My friend's birthday is in F______.", answer: 'ebruary', full: 'February', explain: '二月 February。' },
  { id: 'c2', q: "It's nine o'clock. Let's s______ our English class.", answer: 'tart', full: 'start', explain: 'start 开始。' },
  { id: 'c3', q: 'We should wash our hands b______ dinner.', answer: 'efore', full: 'before', explain: 'before dinner 饭前。' },
  { id: 'c4', q: "Tim has a t______ . He can't eat anything.", answer: 'oothache', full: 'toothache', explain: 'toothache 牙疼。' },
  { id: 'c5', q: "I can't get the a______ quickly.", answer: 'nswer', full: 'answer', explain: 'answer 答案。' }
];

const ENG_DIALOGUE = {
  title: 'Nancy 谈论最喜欢的节日',
  blanks: [
    { id: 1, answer: 'D', explain: "It's the Lantern Festival." },
    { id: 2, answer: 'E', explain: '农历正月十五。' },
    { id: 3, answer: 'A', explain: 'What do you usually do...?' },
    { id: 4, answer: 'C', explain: 'guess riddles on the lanterns.' },
    { id: 5, answer: 'F', explain: "I can't wait." }
  ],
  options: [
    { id: 'A', text: 'What do you usually do at the Lantern Festival?' },
    { id: 'B', text: 'I feel bad.' },
    { id: 'C', text: 'We also guess riddles on the lanterns.' },
    { id: 'D', text: "It's the Lantern Festival." },
    { id: 'E', text: "It's on the 15th day of the first lunar month." },
    { id: 'F', text: "I can't wait." }
  ],
  lines: [
    { speaker: 'A', text: "What's your favorite festival, Nancy?" },
    { speaker: 'B', blank: 1 },
    { speaker: 'A', text: 'When is the Lantern Festival?' },
    { speaker: 'B', blank: 2 },
    { speaker: 'A', blank: 3 },
    { speaker: 'B', text: 'I usually have a big dinner with my family.', blank: 4 },
    { speaker: 'A', text: 'Sounds great!' },
    { speaker: 'B', text: 'I hope you can come and join us next year.' },
    { speaker: 'A', blank: 5 }
  ]
};

const ENG_READING_MYOPIA = {
  title: 'Myopia in Children（近视）',
  passage: `How do children get myopia?
• Spending 7+ hours a week on computers or smartphones.
• Fewer outdoor activities.
• Genetics: Parents who have myopia may have a myopic kid.

How many children have myopia?
• 53.6% of children in China had myopia in 2023.

What should children do?
• At least two hours of outdoor activities every day.
• Follow the "20/20/20 Rule".
• Get enough sleep.`,
  questions: [
    { q: 'Who may also have myopia if a girl has myopia?', options: ['Her parent.', 'Her teacher.', 'Her friend.'], answer: 0, explain: '遗传。' },
    { q: 'Children should play outside for at least ______ every day.', type: 'fill', answer: 'two hours', accept: ['two hours', '2 hours'] },
    { q: 'Which is RIGHT?', options: ['Outdoor activities cause myopia.', 'Children should get enough sleep.', 'Only talk about causes.'], answer: 1, explain: 'get enough sleep。' }
  ]
};

const ENG_READING_TEA = {
  title: 'Chinese Tea Culture',
  passage: `Tea is popular in China. Chinese tea has a long history. There is a great book called The Classic of Tea.

Six main kinds: white, yellow, green, oolong, black and dark tea.

Guangdong & Fujian — gong fu tea. Beijing — flowering tea. Lhasa — buttered tea (to be healthy).

Don't make the cup too full when making tea for friends.`,
  questions: [
    { q: 'Black tea is one of the six main kinds.', answer: true },
    { q: 'People in Guangdong like flowering tea.', answer: false },
    { q: 'Lhasa people drink buttered tea to be healthy.', answer: true },
    { q: "Don't make the cup too full for friends.", answer: true },
    { q: 'The Classic of Tea is a great book.', answer: true }
  ]
};

const ENG_WRITING = {
  prompt: '写一写你和家人去哪里、做什么、怎样去。不少于 5 句话。',
  template: '______ goes to the ______ to ______ by/on ______.',
  examples: [
    { sentence: 'John goes to the cinema to see films on foot.' },
    { sentence: "John's father goes to the library to read books by car." },
    { sentence: "John's mother goes to the supermarket to do the shopping by bike." }
  ]
};

function getEngAllTopicIds() {
  return ENG_UNITS.flatMap(u => u.topics.map(t => t.id));
}

function getEngTopicById(id) {
  for (let ui = 0; ui < ENG_UNITS.length; ui++) {
    const topic = ENG_UNITS[ui].topics.find(t => t.id === id);
    if (topic) return { unit: ENG_UNITS[ui], unitIndex: ui, topic };
  }
  return null;
}

function getEngTotalPoints() {
  return ENG_UNITS.reduce((s, u) => s + u.topics.reduce((a, t) => a + t.points.length, 0), 0);
}
