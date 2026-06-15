/* 译林版 · 义务教育教科书英语六年级下册（教材知识点） */

(function () {
  'use strict';

  if (typeof G6_ENG_UNITS === 'undefined') return;

  G6_ENGLISH_EXAM.subtitle = '译林六下教材 · 互动复习课件';
  G6_ENGLISH_EXAM.note = '已整合译林版六下 8 单元 + Project 1/2。建议：教材单元 → 闪卡 → 测验 → 听力。';

  const ENG_TEXTBOOK_UNITS = [
    {
      id: 'g6etb1',
      title: '【教材】Unit 1 · The lion and the mouse',
      emoji: '🦁',
      topics: [
        {
          id: 'g6et1t1',
          title: 'Story time · 词汇与故事',
          points: [
            'large 大的；strong 强壮的；sharp 锋利的',
            'quietly 安静地；loudly 大声地；sadly 悲伤地；happily 快乐地',
            'wake up 醒来；let … go 放了……',
            'net 网；bite 咬（过去式 bit）；from then on 从那时起',
            '寓言：老鼠救狮子，大小都能互相帮助'
          ]
        },
        {
          id: 'g6et1t2',
          title: 'Grammar · 副词与不规则动词',
          points: [
            '形容词 + ly → 副词：happy→happily, quiet→quietly, loud→loudly, sad→sadly',
            'The lion laughed loudly. / The mouse said quietly.',
            '不规则过去式：wake→woke, bite→bit, let→let',
            'There was a lion in the forest.（一般过去时）',
            'Sound time：Wh-questions 语调；Culture：animal fables'
          ]
        }
      ]
    },
    {
      id: 'g6etb2',
      title: '【教材】Unit 2 · Good habits',
      emoji: '⏰',
      topics: [
        {
          id: 'g6et2t1',
          title: 'Story time · 好习惯与坏习惯',
          points: [
            'good habits：get up early, go to bed early, brush teeth',
            'put things in order 整理物品；finish homework before dinner',
            'listen to teachers；keep room clean and tidy；help parents',
            'bad habits：do homework late, go to bed late, feel sleepy',
            'messy 凌乱的 vs tidy 整洁的'
          ]
        },
        {
          id: 'g6et2t2',
          title: 'Grammar · 副词与频率',
          points: [
            'walk fast / do well / get up early / go to bed late',
            '频率副词：always, usually, often, sometimes, never',
            'He never goes to bed late. / She sometimes feels sleepy.',
            '第三人称单数：gets up, goes to school, goes to bed',
            'Sound time：or 发音（horse, short, sport）'
          ]
        }
      ]
    },
    {
      id: 'g6etb3',
      title: '【教材】Unit 3 · A healthy diet',
      emoji: '🥗',
      topics: [
        {
          id: 'g6et3t1',
          title: 'Story time · 健康饮食',
          points: [
            'Mike：sweets, cakes, ice cream；little water；a lot of rice',
            'Yang Ling：noodles for breakfast；meat and vegetables；little rice',
            'a lot of + 可数/不可数；some + 两者皆可',
            'a few + 可数复数（eggs）；a little + 不可数（water, rice）',
            '不可数名词不加 s：bread, milk, juice, rice, meat, water'
          ]
        },
        {
          id: 'g6et3t2',
          title: 'Grammar · 数量词',
          points: [
            'I eat a lot of noodles. / He has some bread.',
            'She eats a few eggs. / He drinks a little water.',
            '第三人称单数：eats, has, drinks',
            '加 es 的特殊词：mango→mangoes, potato→potatoes, tomato→tomatoes',
            'Culture：中西方早餐差异（porridge vs cereal）'
          ]
        }
      ]
    },
    {
      id: 'g6etb4',
      title: '【教材】Unit 4 · Road safety',
      emoji: '🚦',
      topics: [
        {
          id: 'g6et4t1',
          title: 'Story time · 行人安全',
          points: [
            'zebra crossing 斑马线；traffic lights 交通信号灯',
            'green man 绿灯行人信号；red man 红灯禁止通行',
            'pavement 人行道；look left, right, left again',
            'must not run or play football on the road',
            'Follow the rules and stay safe!'
          ]
        },
        {
          id: 'g6et4t2',
          title: 'Grammar · must / must not / can',
          points: [
            'You must look for a zebra crossing.',
            'You mustn\'t = must not：You must not run on the road.',
            'You can cross with other people. / You can\'t cross here.',
            'How can you cross safely? / What must you not do?',
            'Culture：UK 靠左行驶 vs 中国（除港澳）靠右'
          ]
        }
      ]
    },
    {
      id: 'g6etb5',
      title: '【教材】Project 1 · Being a good student',
      emoji: '⭐',
      topics: [
        {
          id: 'g6etp1t1',
          title: '综合 · 好学生品质',
          points: [
            '复习 Unit 1–4：习惯、饮食、交通安全',
            'A good student should go to school early.',
            'A good student must wait for the green man.',
            'A good student mustn\'t run on the road.',
            '分组讨论并制作 poster 展示'
          ]
        },
        {
          id: 'g6etp1t2',
          title: 'Amy & John 习惯对比',
          points: [
            'Amy：gets up early, helps classmates, waits for green man',
            'Amy 坏习惯：eats too many sweets',
            'John：says good morning, waits for green man',
            'John 坏习惯：late for school, runs on road, too much meat',
            '区分 good habits 与 bad habits'
          ]
        }
      ]
    },
    {
      id: 'g6etb6',
      title: '【教材】Unit 5 · A party',
      emoji: '🎈',
      topics: [
        {
          id: 'g6et5t1',
          title: 'Story time · 儿童节派对',
          points: [
            'Children\'s Day party at Mike\'s house',
            'Su Hai → snacks and drinks；Wang Bing → fruit',
            'Yang Ling → toys；Liu Tao → balloons（扮小丑）',
            'balloons, snacks, drinks, fruit, toys',
            'Let\'s have some fun first!'
          ]
        },
        {
          id: 'g6et5t2',
          title: 'Grammar · be going to',
          points: [
            'I am / You are / We are going to …',
            'He is / She is going to …',
            'What are you going to bring? / Are you going to …?',
            'Yes, we are. / No, he isn\'t.',
            'Culture：Western party 带礼物、可稍晚到'
          ]
        }
      ]
    },
    {
      id: 'g6etb7',
      title: '【教材】Unit 6 · An interesting country',
      emoji: '🇦🇺',
      topics: [
        {
          id: 'g6et6t1',
          title: 'Story time · 澳大利亚',
          points: [
            'learn about Australia；find out about this country',
            'kangaroo 袋鼠；koala 考拉；Australian football',
            'Sydney 悉尼；Melbourne 墨尔本；warm and sunny',
            'I\'ll ask my e-friend. / read on the Internet. / go to the library.',
            'People welcome visitors.'
          ]
        },
        {
          id: 'g6et6t2',
          title: 'Grammar · will 一般将来时',
          points: [
            'I\'ll = I will；you\'ll, we\'ll, they\'ll, he\'ll, she\'ll',
            'I\'ll send an email. / We\'ll learn about Australia next week.',
            '常与 tomorrow, next week, next month, next year 连用',
            'Will you cook fish for me? — Just wait and see.',
            'Culture：Great Wall, Stonehenge, Yellowstone, Great Barrier Reef'
          ]
        }
      ]
    },
    {
      id: 'g6etb8',
      title: '【教材】Unit 7 · Summer holiday plans',
      emoji: '✈️',
      topics: [
        {
          id: 'g6et7t1',
          title: 'Story time · 暑假计划',
          points: [
            'Mike → London, stay for a month, go back',
            'Yang Ling → Beijing, visit aunt and uncle, by train',
            'Su Hai → Hong Kong, Disneyland, Ocean Park',
            'Liu Tao → Taipei, take photos after holiday',
            'London, Beijing, Hong Kong, Taipei'
          ]
        },
        {
          id: 'g6et7t2',
          title: 'Grammar · will 疑问句',
          points: [
            'Will you go to Beijing by plane? — No, I won\'t.',
            'Where will you go? / When will you go? / How long will you stay?',
            'What will you do there? / won\'t = will not',
            'I\'ll stay there for a month. / We\'ll go in July.',
            'Culture：Uluru, Buckingham Palace, Grand Canyon, Niagara Falls'
          ]
        }
      ]
    },
    {
      id: 'g6etb9',
      title: '【教材】Unit 8 · Our dreams',
      emoji: '💫',
      topics: [
        {
          id: 'g6et8t1',
          title: 'Story time · 梦想',
          points: [
            'Mike → dentist 牙医；Wang Bing → astronaut 宇航员',
            'Liu Tao → football player；Su Hai → dancer 舞蹈家',
            'Nancy → writer；Yang Ling → pianist 钢琴家',
            'What do you want to be in the future?',
            'I want to see your dreams come true.'
          ]
        },
        {
          id: 'g6et8t2',
          title: 'Grammar · want to be / want to',
          points: [
            'I want to be a/an …（职业）',
            'I want to fly to the Moon. / play in the World Cup',
            'I want to write stories for children.',
            '复习职业：cook, farmer, nurse, teacher, policeman, doctor, driver',
            'Do a survey：What do you want to be?'
          ]
        }
      ]
    },
    {
      id: 'g6etb10',
      title: '【教材】Project 2 · A travel book',
      emoji: '📖',
      topics: [
        {
          id: 'g6etp2t1',
          title: '综合 · 制作旅行手册',
          points: [
            '复习 Unit 6–7：国家、城市、will 将来时',
            'About ___: Weather, cities, interesting places',
            'Today, I\'ll tell you about the UK …',
            'You\'ll find Big Ben, the London Eye, Tower Bridge.',
            'Bobby & Sam 环游世界计划（Cartoon 衔接）'
          ]
        },
        {
          id: 'g6etp2t2',
          title: '语音与复习要点',
          points: [
            'Sound time 字母组合：or, ou, ow, air, oy',
            'Stress 句子重读；Intonation 语调',
            'Ticking time 自评：各单元 I can …',
            'Word lists 词汇表复习',
            '小升初衔接：时态、情态动词、数量词综合'
          ]
        }
      ]
    }
  ];

  G6_ENG_UNITS.unshift(...ENG_TEXTBOOK_UNITS);

  const TB_EX = {
    g6et1t2: [{ paper: '教材 U1', type: '语法', q: 'The lion laughed ___ (loud).', a: 'loudly' }],
    g6et2t2: [{ paper: '教材 U2', type: '语法', q: 'He ___ goes to bed late.', a: 'never' }],
    g6et3t2: [{ paper: '教材 U3', type: '数量', q: 'a few + ?', a: '可数名词复数' }],
    g6et4t2: [{ paper: '教材 U4', type: '情态', q: 'must not = ?', a: 'mustn\'t' }],
    g6et5t2: [{ paper: '教材 U5', type: '时态', q: 'Su Hai is going to buy …', a: 'be going to 表计划' }],
    g6et6t2: [{ paper: '教材 U6', type: '时态', q: 'I\'ll send …', a: 'will 将来时' }],
    g6et7t2: [{ paper: '教材 U7', type: '疑问', q: 'How long will you stay?', a: '问停留时长' }],
    g6et8t2: [{ paper: '教材 U8', type: '梦想', q: 'want to be a …', a: '职业' }]
  };

  if (typeof G6_ENG_TOPIC_EXAMPLES !== 'undefined') {
    Object.assign(G6_ENG_TOPIC_EXAMPLES, TB_EX);
  }

  if (typeof G6_ENG_FLASHCARDS !== 'undefined') {
    G6_ENG_FLASHCARDS.push(
      { unit: 0, q: '【U1】wake 过去式？', a: 'woke' },
      { unit: 0, q: '【U1】excited 副词？', a: 'excitedly' },
      { unit: 1, q: '【U2】put things in order？', a: '整理物品' },
      { unit: 2, q: '【U3】a lot of rice？', a: 'rice 不可数，用 a lot of' },
      { unit: 3, q: '【U4】wait for the green man？', a: '等绿灯行人信号' },
      { unit: 4, q: '【P1】good student mustn\'t？', a: 'run on the road' },
      { unit: 5, q: '【U5】Children\'s Day party at？', a: 'Mike\'s house' },
      { unit: 6, q: '【U6】Australian animals？', a: 'kangaroos and koalas' },
      { unit: 7, q: '【U7】Su Hai will go to？', a: 'Hong Kong (Disneyland, Ocean Park)' },
      { unit: 8, q: '【U8】Nancy wants to be a？', a: 'writer' },
      { unit: 9, q: '【P2】I\'ll tell you about the UK', a: 'Project 2 旅行手册' }
    );
  }

  if (typeof G6_ENG_QUIZ_QUESTIONS !== 'undefined') {
    G6_ENG_QUIZ_QUESTIONS.push(
      { unit: 0, q: '【U1】"Please don\'t eat me," said the mouse ___.', options: ['quietly', 'quiet', 'quietness', 'quieter'], answer: 0, explain: '副词修饰 said。' },
      { unit: 1, q: '【U2】Wang Bing ___ finishes homework before dinner.', options: ['usually', 'usual', 'use', 'using'], answer: 0, explain: '频率副词 usually。' },
      { unit: 2, q: '【U3】She has ___ eggs every week.', options: ['a few', 'a little', 'little', 'much'], answer: 0, explain: 'eggs 可数复数。' },
      { unit: 3, q: '【U4】You ___ play football on the road.', options: ['must not', 'must', 'can', 'should'], answer: 0, explain: 'must not 禁止。' },
      { unit: 5, q: '【U5】What ___ Liu Tao going to do?', options: ['is', 'are', 'am', 'be'], answer: 0, explain: 'Liu Tao → is。' },
      { unit: 6, q: '【U6】We ___ learn about Australia next week.', options: ['will', 'are', 'do', 'did'], answer: 0, explain: 'We\'ll = We will。' },
      { unit: 7, q: '【U7】I\'ll stay in London for a ___.', options: ['month', 'monthly', 'months old', 'monthed'], answer: 0, explain: 'for a month。' },
      { unit: 8, q: '【U8】Wang Bing wants to ___ an astronaut.', options: ['be', 'is', 'are', 'being'], answer: 0, explain: 'want to be。' }
    );
  }
})();
