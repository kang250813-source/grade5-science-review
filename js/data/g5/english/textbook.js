/* 译林版 · 义务教育教科书英语五年级下册（教材知识点） */

(function () {
  'use strict';

  if (typeof ENG_UNITS === 'undefined') return;

  for (let i = ENG_UNITS.length - 1; i >= 0; i--) {
    if (ENG_UNITS[i].id === 'eu7' || ENG_UNITS[i].id === 'eu8') ENG_UNITS.splice(i, 1);
  }

  ENGLISH_EXAM.subtitle = '译林五下教材 + 亮点给力 + 南京卷 · 互动复习课件';
  ENGLISH_EXAM.note = '已整合译林版五下 8 单元（Cinderella～Birthdays）与亮点给力大试卷、南京期末卷。建议：教材单元 → 综合复习 → 闪卡 → 测验 → 听力。';

  const ENG_TEXTBOOK_UNITS = [
    {
      id: 'etb1',
      title: '【教材】Unit 1 · Cinderella',
      emoji: '👸',
      topics: [
        {
          id: 'et1t1',
          title: 'Story time · 词汇',
          points: [
            'prince 王子；fairy 仙女；clothes 衣服',
            'put on 穿上；take off 脱下；try on 试穿',
            'before 在……以前；have to 不得不',
            'fit 合适；finally 最后',
            '故事：仙女帮助灰姑娘，12 点前必须回家，王子找鞋'
          ]
        },
        {
          id: 'et1t2',
          title: 'Grammar · Why / Because',
          points: [
            'Why are you so sad? — Because I can\'t go to the party.',
            'can\'t = cannot；don\'t = do not',
            '第三人称单数：come→comes, put→puts, try→tries, fit→fits',
            'Cinderella has to come back before 12 o\'clock.',
            'Learning tip：分角色表演英语短剧'
          ]
        }
      ]
    },
    {
      id: 'etb2',
      title: '【教材】Unit 2 · How do you come to school?',
      emoji: '🚌',
      topics: [
        {
          id: 'et2t1',
          title: '交通方式',
          points: [
            'by bus / by metro / by bike / by car / on foot',
            'take the bus / take the metro — 动词短语',
            'How do you come to school? — By bus.',
            'How do they get to the museum? — On foot.',
            'walk, ride a bike 作谓语'
          ]
        },
        {
          id: 'et2t2',
          title: 'Grammar · 询问交通',
          points: [
            'How do you come to ...? / How does he go to ...?',
            'live far from / near the school',
            'sometimes, usually, always 频率副词',
            'too many / too much 复习',
            'Learning tip：说说各种交通工具的特点'
          ]
        }
      ]
    },
    {
      id: 'etb3',
      title: '【教材】Unit 3 · Asking the way',
      emoji: '🗺️',
      topics: [
        {
          id: 'et3t1',
          title: '问路用语',
          points: [
            'How do I get to the cinema / hospital / zoo?',
            'Go along this street. Turn left / right at the traffic lights.',
            'It\'s on your left / right.',
            'get on the bus / get off the bus',
            'Is there a ... near here?'
          ]
        },
        {
          id: 'et3t2',
          title: 'Grammar · 方位与介词',
          points: [
            'at the traffic lights；on Wall Street',
            'next to, beside, in front of, behind',
            'walk straight on；You can\'t miss it.',
            'take Metro Line 1',
            'Learning tip：多积累问路与指路表达'
          ]
        }
      ]
    },
    {
      id: 'etb4',
      title: '【教材】Unit 4 · Seeing the doctor',
      emoji: '🏥',
      topics: [
        {
          id: 'et4t1',
          title: '看病与身体',
          points: [
            'What\'s wrong with you? / What\'s the matter?',
            'I have a fever / headache / toothache / cold / cough',
            'see the doctor；take medicine',
            'should 应该；shouldn\'t 不应该',
            'You should drink warm water. / You shouldn\'t eat too many sweets.'
          ]
        },
        {
          id: 'et4t2',
          title: 'Grammar · should / shouldn\'t',
          points: [
            'should + 动词原形',
            'shouldn\'t = should not',
            'too much cola / too many sweets',
            'feel well / don\'t feel well',
            'Learning tip：用 have/take 组成更多短语'
          ]
        }
      ]
    },
    {
      id: 'etb5',
      title: '【教材】Unit 5 · Helping our parents',
      emoji: '🏠',
      topics: [
        {
          id: 'et5t1',
          title: '家务劳动词汇',
          points: [
            'help our parents / help with housework',
            'wash clothes, sweep the floor, clean the room',
            'make the bed, cook dinner, water the flowers',
            'be busy with / be busy doing',
            'What are you doing? — I\'m washing clothes.'
          ]
        },
        {
          id: 'et5t2',
          title: 'Grammar · 现在进行时',
          points: [
            'am / is / are + doing',
            'run→running, swim→swimming, take→taking',
            'Are you cooking? — Yes, I am. / No, I\'m not.',
            'What is he doing? — He is sleeping.',
            'Learning tip：注意动词-ing 特殊变化'
          ]
        }
      ]
    },
    {
      id: 'etb6',
      title: '【教材】Unit 6 · In the kitchen',
      emoji: '🍳',
      topics: [
        {
          id: 'et6t1',
          title: '厨房与感官动词',
          points: [
            'There is some soup / bread / meat in the kitchen.',
            'smell nice / taste good / look delicious',
            'Don\'t touch! It\'s hot.',
            'make a salad / fry eggs / boil water',
            '现在进行时描述正在做饭'
          ]
        },
        {
          id: 'et6t2',
          title: 'Grammar · there be + 进行时',
          points: [
            'There is / are ...',
            'Is there any ...? — Yes, there is.',
            'How many eggs are there?',
            '感官动词 + 形容词：The soup smells nice.',
            'Learning tip：用英语游戏练单词句型'
          ]
        }
      ]
    },
    {
      id: 'etb7',
      title: '【教材】Unit 7 · Chinese festivals',
      emoji: '🏮',
      topics: [
        {
          id: 'et7t1',
          title: '节日词汇与活动',
          points: [
            'Spring Festival 春节；Dragon Boat Festival 端午',
            'Mid-Autumn Festival 中秋；Double Ninth Festival 重阳',
            'Lantern Festival 元宵；eat mooncakes / rice dumplings',
            'guess riddles on the lanterns',
            'What do you usually do at ...?'
          ]
        },
        {
          id: 'et7t2',
          title: 'Grammar · 节日对话',
          points: [
            'My favourite festival is ...',
            'It\'s in January / February / on the eighth of April',
            'We usually have a big dinner with my family.',
            'I can\'t wait.',
            'Learning tip：写提纲再介绍最喜欢的节日'
          ]
        }
      ]
    },
    {
      id: 'etb8',
      title: '【教材】Unit 8 · Birthdays',
      emoji: '🎂',
      topics: [
        {
          id: 'et8t1',
          title: '日期与序数词',
          points: [
            'When\'s your birthday? — It\'s on the eighth of April.',
            'first, second, third ... eighth, ninth, twelfth',
            'in + 月份；on + 具体日期',
            'Mother\'s Day — second Sunday of May',
            'write about your birthday 习作'
          ]
        },
        {
          id: 'et8t2',
          title: 'Grammar · 日期表达',
          points: [
            'the + 序数词 + of + 月份',
            'What do you do on your birthday?',
            'have a birthday party / eat a birthday cake',
            'start doing / start to do',
            'Project 2：My important days 重要日子'
          ]
        }
      ]
    }
  ];

  ENG_UNITS.forEach(u => {
    if (!u.title.startsWith('【')) u.title = '【综合·期末】' + u.title;
  });
  ENG_UNITS.unshift(...ENG_TEXTBOOK_UNITS);
  const ENG_TB_OFF = ENG_TEXTBOOK_UNITS.length;
  if (typeof ENG_FLASHCARDS !== 'undefined') {
    ENG_FLASHCARDS.forEach(c => { c.unit += ENG_TB_OFF; });
  }
  if (typeof ENG_QUIZ_QUESTIONS !== 'undefined') {
    ENG_QUIZ_QUESTIONS.forEach(q => { q.unit += ENG_TB_OFF; });
  }

  const TB_EX = {
    et1t2: [{ paper: '教材 U1', type: '语法', q: 'Cinderella has to go home before 12.', a: 'has to + 原形' }],
    et2t1: [{ paper: '教材 U2', type: '交通', q: 'by bus vs take a bus', a: 'by 作状语；take 作谓语' }],
    et3t1: [{ paper: '教材 U3', type: '问路', q: 'Turn left at the traffic lights', a: 'at' }],
    et4t2: [{ paper: '教材 U4', type: '建议', q: 'You shouldn\'t drink too much cola.', a: 'shouldn\'t' }],
    et7t1: [{ paper: '教材 U7', type: '节日', q: 'guess riddles', a: '猜灯谜' }],
    et8t1: [{ paper: '教材 U8', type: '日期', q: 'the eighth of April', a: '序数词+of+月份' }]
  };

  if (typeof ENG_TOPIC_EXAMPLES !== 'undefined') {
    Object.assign(ENG_TOPIC_EXAMPLES, TB_EX);
  }

  if (typeof ENG_FLASHCARDS !== 'undefined') {
    ENG_FLASHCARDS.push(
      { unit: 0, q: '【教材 U1】try on 代词语序？', a: 'try it on' },
      { unit: 1, q: '【教材 U2】步行英文？', a: 'on foot' },
      { unit: 2, q: '【教材 U3】在红绿灯处？', a: 'at the traffic lights' },
      { unit: 3, q: '【教材 U4】牙疼？', a: 'have a toothache' },
      { unit: 4, q: '【教材 U5】busy doing？', a: 'be busy cooking' },
      { unit: 6, q: '【教材 U7】元宵节活动？', a: 'guess riddles' },
      { unit: 7, q: '【教材 U8】母亲节？', a: 'second Sunday of May' }
    );
  }

  if (typeof ENG_QUIZ_QUESTIONS !== 'undefined') {
    ENG_QUIZ_QUESTIONS.push(
      { unit: 0, q: '【教材 U1】Why ___ you so sad?', options: ['are', 'do', 'is', 'does'], answer: 0, explain: 'Why are you...' },
      { unit: 1, q: '【教材 U2】I come to school ___ bus.', options: ['by', 'take', 'on', 'ride'], answer: 0, explain: 'by bus。' },
      { unit: 2, q: '【教材 U3】Get ___ the bus.', options: ['on', 'in', 'at', 'to'], answer: 0, explain: 'get on。' },
      { unit: 3, q: '【教材 U4】You ___ eat too many sweets.', options: ['shouldn\'t', 'should', 'can', 'do'], answer: 0, explain: 'shouldn\'t。' },
      { unit: 4, q: '【教材 U5】Mum is busy ___ dinner.', options: ['cooking', 'cook', 'cooks', 'to cook'], answer: 0, explain: 'busy doing。' },
      { unit: 6, q: '【教材 U7】Lantern Festival — guess ___', options: ['riddles', 'lanterns', 'cakes', 'games'], answer: 0, explain: '猜灯谜。' },
      { unit: 7, q: '【教材 U8】It\'s on the ___ of April.', options: ['eighth', 'eight', 'eights', 'eighteen'], answer: 0, explain: '序数词。' }
    );
  }
})();
