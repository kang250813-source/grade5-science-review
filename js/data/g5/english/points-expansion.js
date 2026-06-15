/* 知识点扩充 — 加载于 *-data.js 之后 */
(function () {
  'use strict';

  const EXTRA = {
  "e1t1": [
    "some bread / some water — some 可修饰不可数",
    "many books / much time — many/much 区别",
    "a glass of water / two glasses of water — 量词+of",
    "people 本身是复数，不说 peoples（表民族除外）",
    "chicken 作“鸡肉”不可数；作“小鸡”可数"
  ],
  "e1t2": [
    "much too + 形容词：much too hot 太热",
    "too many people / too much noise",
    "enough + 名词；形容词 + enough",
    "a lot of = lots of 可数不可数均可",
    "so much cola 强调数量多"
  ],
  "e1t3": [
    "show us around — us 宾格",
    "between you and me — 介词后用 me",
    "I like her. She likes me. — 主格宾格对应",
    "名词性物主代词：mine, yours, his, hers",
    "形容词性物主代词 + 名词：my book"
  ],
  "e2t1": [
    "always, usually, often, sometimes, never 频率副词",
    "第三人称单数：go→goes, watch→watches, study→studies",
    "否定：doesn't + 动词原形",
    "疑问：Does he...? Yes, he does.",
    "The sun rises in the east. — 客观真理用一般现在时"
  ],
  "e2t2": [
    "Look!/Listen!/Now/It's 7 o'clock. — 进行时标志",
    "run→running, swim→swimming（双写）",
    "write→writing（去 e）",
    "lie→lying, die→dying",
    "What are you doing? — 现在进行时的特殊疑问句"
  ],
  "e2t3": [
    "He usually walks but he is walking now.",
    "always + 一般现在时；now + 进行时",
    "有些动词很少进行时：know, like, want",
    "see films 一般现在时表习惯",
    "Look! The students are having a Music lesson."
  ],
  "e3t1": [
    "on Monday / on weekends — 星期用 on",
    "in the morning / in the afternoon",
    "at night / at the weekend（英式）",
    "from...to... 从……到……",
    "before dinner / after school — 不用介词 at"
  ],
  "e3t2": [
    "next to / beside — 在……旁边",
    "in front of / behind — 前后",
    "How do I get to...? — 问路",
    "Walk along... Turn left/right at...",
    "on Wall Street / on the street — 街道用 on"
  ],
  "e3t3": [
    "take the metro / by metro — 两种表达",
    "take a taxi / by taxi",
    "on foot = walk",
    "by ship / by plane / by train",
    "How do you come to school? — By bus."
  ],
  "e4t1": [
    "Why...? Because... 成对出现",
    "Why not...? = Why don't you...? 建议",
    "What's wrong? / What's the matter?",
    "Because 不能单独回答 Why not",
    "时态一致：Why were you late? — Because I missed the bus."
  ],
  "e4t2": [
    "Spring Festival — 春节；Dragon Boat Festival — 端午",
    "Mid-Autumn Festival — 中秋；Double Ninth Festival — 重阳",
    "the + 序数词：the first, the second, the eighth",
    "in + 月份；on + 具体日期",
    "When's your birthday? — It's on the eighth of April."
  ],
  "e4t3": [
    "What do you usually do at the Lantern Festival?",
    "We eat yuanxiao and guess riddles.",
    "I can't wait. — 迫不及待",
    "My favourite festival is...",
    "We have a big dinner with my family."
  ],
  "e5t1": [
    "wash clothes / sweep the floor / clean the room",
    "help our parents / help with housework",
    "cook dinner / water the flowers",
    "at weekends / on Sundays — 频率",
    "What do you do at home? — I make the bed."
  ],
  "e5t2": [
    "see the doctor — 看医生",
    "should / shouldn't 给建议：You should rest.",
    "have a cold / have a cough",
    "What's wrong with you? — I have a fever.",
    "Don't eat too many sweets. — 健康建议"
  ],
  "e5t3": [
    "foot → feet；tooth → teeth；child → children",
    "drive → driver；teach → teacher",
    "try → tried / trying",
    "eighth, ninth, twelfth — 序数词特殊拼写",
    "The Browns = the Brown family — 复数表一家"
  ],
  "e6t1": [
    "spend too much time on screens — 屏幕时间",
    "play outside — 户外活动",
    "20/20/20 rule — 护眼规则",
    "genetics — 遗传也可能导致近视",
    "enough sleep — 充足睡眠很重要"
  ],
  "e6t2": [
    "green tea / black tea / oolong tea",
    "Gong fu tea — 功夫茶（广东福建）",
    "flowering tea — 花茶（北京）",
    "buttered tea — 酥油茶（拉萨）",
    "Don't fill the cup too full — 倒茶礼仪"
  ],
  "e6t3": [
    "First,... Second,... Finally,... — 写作连接词",
    "My father goes to work by metro every day.",
    "We should... / We shouldn't... — 建议句",
    "不少于 5 句：Who, Where, What, How",
    "注意第三人称单数动词加 -s"
  ]
};

  const EXTRA2 = {
    e1t1: [
      'fish 作鱼肉不可数；作鱼可数 a fish, two fish',
      'fruit 通常不可数；fruits 表“各种水果”',
      'news, information 不可数，不说 a news',
      'Is there any ...? / Are there any ...?',
      'some 用于肯定；any 用于疑问和否定'
    ],
    e1t2: [
      'a little + 不可数；a few + 可数复数',
      'many + 可数；much + 不可数（疑问/否定）',
      'How much ...? 问不可数；How many ...? 问可数',
      'plenty of = a lot of',
      'no = not any / not a：There is no water.'
    ],
    e1t3: [
      'Let\'s = Let us；Let\'s go. 提建议',
      'help me / help him / help them — 宾格',
      'Whose book is this? — It\'s mine.',
      'This is my book. That book is hers.',
      'ours, theirs, its（无所有格\'s 形式）'
    ],
    e2t1: [
      'Do you ...? / Does he ...? 一般疑问句',
      'What time do you get up? — At six.',
      'How often do you ...? — Once a week.',
      'play the piano / play football（球类无 the）',
      'on weekends / at the weekend 表经常'
    ],
    e2t2: [
      'be + not + doing：isn\'t / aren\'t + doing',
      'What is he doing? — He is reading.',
      'listen to music / wait for the bus',
      'have → having；live → living',
      '进行时表将来：We are leaving tomorrow.'
    ],
    e2t3: [
      'always 放 be 后、实义动词前',
      'He is always late.（表抱怨，常进行时）',
      'see / hear 进行时：I am seeing a doctor.',
      'When + 一般现在时，主句一般现在时',
      'Every Sunday he plays football.'
    ],
    e3t1: [
      'at the age of ... 在……岁时',
      'in 2025 / in the 21st century',
      'on Monday morning / on a rainy day',
      'for + 时间段：for two hours',
      'since + 时间点（进阶了解）'
    ],
    e3t2: [
      'between A and B 在 A 和 B 之间',
      'on the left / on the right',
      'over there 在那边',
      'near here / far from here',
      'Where is the ...? — It\'s ...'
    ],
    e3t3: [
      'by + doing：by taking the metro',
      'on the way to school 在上学的路上',
      'arrive in + 大地点；arrive at + 小地点',
      'get to = arrive in/at',
      'It takes ... minutes to get there.'
    ],
    e4t1: [
      'How come...? 口语“怎么会……”',
      'What for? = Why? 为什么',
      'Because of + 名词：Because of the rain',
      'That\'s why ... 那就是……的原因',
      'So ... 因此（结果）'
    ],
    e4t2: [
      'New Year\'s Day 元旦',
      'National Day 国庆节',
      'Christmas 圣诞节',
      'on + 星期 + morning：on Sunday morning',
      'What date is it today? — It\'s ...'
    ],
    e4t3: [
      'We watch dragon boat races.',
      'People climb mountains on the Double Ninth Festival.',
      'I like the Spring Festival best.',
      'Families get together at festivals.',
      'Happy ...! 节日祝福语'
    ],
    e5t1: [
      'do the dishes / do housework',
      'tidy the desk / tidy up the room',
      'feed the dog / walk the dog',
      'What do you do on Sundays?',
      'help sb (to) do sth'
    ],
    e5t2: [
      'stay in bed 卧床休息',
      'take a rest / have a rest',
      'feel ill / feel sick',
      'go to the hospital / go to hospital（英式）',
      'Don\'t worry. You\'ll be better soon.'
    ],
    e5t3: [
      'man → men；woman → women',
      'mouse → mice；goose → geese',
      'study → studies；city → cities',
      'happy → happily（副词）',
      'quick → quickly；slow → slowly'
    ],
    e6t1: [
      'too much screen time is bad for eyes',
      'read in good light 在光线充足处阅读',
      'keep books 30 cm away from eyes',
      'outdoor activities help prevent myopia',
      'parents with myopia — children may have it too'
    ],
    e6t2: [
      'white tea 白茶；dark tea 黑茶',
      'Longjing tea 龙井；Pu\'er tea 普洱',
      'Would you like some tea? — Yes, please.',
      'a cup of tea / two cups of tea',
      'Tea culture in China vs the UK'
    ],
    e6t3: [
      'Topic sentence 主题句 + supporting details',
      'Use and / but / because 连接句子',
      'My name is ... I am ... years old.',
      'I like ... because it is ...',
      'Check spelling and punctuation 检查拼写标点'
    ]
  };

  ENG_UNITS.forEach(u => {
    u.topics.forEach(t => {
      if (EXTRA[t.id]) t.points.push(...EXTRA[t.id]);
      if (EXTRA2[t.id]) t.points.push(...EXTRA2[t.id]);
    });
  });

})();