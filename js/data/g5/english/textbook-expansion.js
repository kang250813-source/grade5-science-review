/* 译林五下教材知识点扩充 — 加载于 english-textbook.js 之后 */

(function () {
  'use strict';

  if (typeof ENG_UNITS === 'undefined') return;

  const EXTRA = {
    et1t1: [
      'midnight 午夜；everywhere 到处',
      'leave behind 留下（鞋）',
      'Why can\'t you go to the party? — Because I don\'t have nice clothes.',
      'The shoe fits her. — fit 这里作动词“合适”',
      'try on 代词放中间：try them on / try it on'
    ],
    et1t2: [
      'Why can\'t Cinderella go to the party?',
      'Because her sisters don\'t let her.',
      'Why does she have to come back before 12?',
      'Because the magic ends at midnight.',
      'Why is the prince looking for the girl? — Because the shoe fits her.'
    ],
    et2t1: [
      'Miss Li lives near school. — near 反义词 far',
      'Su Yang comes to school by bus.',
      'How does Mike get to the park? — He goes there by bike.',
      'by + 交通工具（无冠词）；take a/the + 交通工具',
      'How do they get to Hong Kong? — By plane.'
    ],
    et2t2: [
      'How does your father go to work?',
      'He usually goes to work by car.',
      'Does your mother go to work by bus? — Yes, she does.',
      'live in the UK / live in London',
      'How about you? — 你呢？（承接问句）'
    ],
    et3t1: [
      'Excuse me, how do I get to the cinema?',
      'Go along this street. Turn left at the second crossing.',
      'It\'s on your right. You can\'t miss it.',
      'Is there a hospital near here? — Yes, there is.',
      'take Metro Line 2 to Park Station'
    ],
    et3t2: [
      'Walk straight on. / Go straight ahead.',
      'Turn left / right at the traffic lights.',
      'get on / get off the bus at the third stop',
      'The cinema is next to the library.',
      'How do I get to ...? = How can I get to ...?'
    ],
    et4t1: [
      'I have a high fever. — high fever 高烧',
      'You should take some medicine and drink warm water.',
      'You shouldn\'t go to school today.',
      'brush one\'s teeth twice a day',
      'feel tired / feel better / feel well'
    ],
    et4t2: [
      'What should I do? — You should rest at home.',
      'What shouldn\'t I eat? — You shouldn\'t eat too many sweets.',
      'see the doctor / go to see the doctor',
      'have a rest / stay in bed',
      'should 无人称和数的变化：He should ...'
    ],
    et5t1: [
      'What are you doing, Mum? — I\'m cooking dinner.',
      'What is Dad doing? — He\'s washing the car.',
      'Are you doing your homework? — Yes, I am.',
      'help Mum clean the table / wash the dishes',
      'at weekends we help our parents'
    ],
    et5t2: [
      'write→writing, make→making（去 e 加 ing）',
      'run→running, swim→swimming（双写加 ing）',
      'read→reading, sleep→sleeping',
      'What are they doing? — They are playing games.',
      'be busy doing = be busy with + 名词'
    ],
    et6t1: [
      'There is some bread and some soup in the kitchen.',
      'There are some eggs on the table.',
      'The meat smells nice. / The cake looks delicious.',
      'Don\'t touch! It\'s very hot.',
      'Would you like some soup? — Yes, please.'
    ],
    et6t2: [
      'Is there any milk in the fridge? — No, there isn\'t.',
      'Are there any tomatoes? — Yes, there are.',
      'How many eggs are there? — There are six.',
      'look / smell / taste + 形容词（不用 well 作“好吃”）',
      'There be 句型：就近原则 There is a pen and two books.'
    ],
    et7t1: [
      'The Spring Festival is in January or February.',
      'We eat rice dumplings at the Dragon Boat Festival.',
      'We eat mooncakes at the Mid-Autumn Festival.',
      'People visit their grandparents at the Double Ninth Festival.',
      'At the Lantern Festival, we guess riddles on the lanterns.'
    ],
    et7t2: [
      'What\'s your favourite festival? — My favourite festival is ...',
      'What do you usually do at ...? — We ...',
      'It\'s in March / April / May / June / July / August / September / October / November / December',
      'We have a big dinner with my family.',
      'I like ... because ... — 说明喜欢原因'
    ],
    et8t1: [
      'When\'s your birthday? — It\'s on the eleventh of May.',
      'first–twelfth 序数词要会拼：third, fifth, eighth, ninth, twelfth',
      'January the first = the first of January',
      'Children\'s Day is on the first of June.',
      'Teachers\' Day is on the tenth of September.'
    ],
    et8t2: [
      'What do you do on your birthday?',
      'I usually have a birthday party with my friends.',
      'My parents give me a nice present.',
      'We eat a birthday cake and sing a song.',
      'start to do / start doing 开始做某事'
    ]
  };

  const MORE_TOPICS = [
    {
      id: 'et1t3',
      title: 'Sound / Cartoon / Culture time',
      points: [
        'Sound time：/uː/ shoe, room, cool, school',
        'Cartoon time：Bobby and Sam 表演短剧',
        'Why are you so happy? — Because we can play now.',
        'Culture time：世界各地都有灰姑娘式故事',
        '单元复习：Why/Because, has to, try on, 第三人称单数'
      ]
    },
    {
      id: 'et2t3',
      title: 'Sound / Cartoon / Culture time',
      points: [
        'Sound time：/ʊ/ book, look, good, cook',
        'Cartoon time：Bobby asks the way to the zoo',
        'How do I get to the zoo? — Take bus No. 5.',
        'Culture time：Different countries, different school rules',
        '单元复习：by + 交通, on foot, How do you come to ...?'
      ]
    },
    {
      id: 'et3t3',
      title: 'Sound / Cartoon / Culture time',
      points: [
        'Sound time：/aɪ/ bike, ride, kite, white',
        'Cartoon time：Bobby and Tina ask the way',
        'It\'s on Moon Street, next to the bank.',
        'Culture time：Public signs（No parking, Keep quiet）',
        '单元复习：get to, turn left/right, at the traffic lights'
      ]
    },
    {
      id: 'et4t3',
      title: 'Sound / Cartoon / Culture time',
      points: [
        'Sound time：/eɪ/ cake, make, lake, take',
        'Cartoon time：Bobby has a toothache',
        'You shouldn\'t eat before bed.',
        'Culture time：Healthy eating around the world',
        '单元复习：have a ..., should/shouldn\'t, see the doctor'
      ]
    },
    {
      id: 'et5t3',
      title: 'Sound / Cartoon / Culture time',
      points: [
        'Sound time：/aɪ/ fly, my, sky, cry',
        'Cartoon time：Sam is helping his mother',
        'What are you doing? — I\'m sweeping the floor.',
        'Culture time：Children help at home in different countries',
        '单元复习：家务短语 + 现在进行时问答'
      ]
    },
    {
      id: 'et6t3',
      title: 'Sound / Cartoon / Culture time',
      points: [
        'Sound time：/aʊ/ how, now, cow, wow',
        'Cartoon time：Bobby is making a salad',
        'There is some fruit. There are some vegetables.',
        'Culture time：Table manners in the UK',
        '单元复习：there be, 感官动词, How many ...?'
      ]
    },
    {
      id: 'et7t3',
      title: 'Sound / Cartoon / Culture time',
      points: [
        'Sound time：/eɪ/ day, play, say, May',
        'Cartoon time：Bobby talks about festivals',
        'The Mid-Autumn Festival is in September or October.',
        'Culture time：Chinese festivals and Western holidays',
        '单元复习：节日名称 + 活动 + in/on 时间表达'
      ]
    },
    {
      id: 'et8t3',
      title: 'Sound / Cartoon / Project time',
      points: [
        'Sound time：/eɪ/ date, late, game, name',
        'Cartoon time：When\'s Bobby\'s birthday?',
        'Project 2：My important days — 写重要日子',
        'My birthday is on ... / Mother\'s Day is on ...',
        '单元复习：序数词 + the ... of ... + 日期问答'
      ]
    }
  ];

  ENG_UNITS.forEach((u, ui) => {
    u.topics.forEach(t => {
      if (EXTRA[t.id]) t.points.push(...EXTRA[t.id]);
    });
    if (ui < 8 && MORE_TOPICS[ui]) {
      u.topics.push(MORE_TOPICS[ui]);
    }
  });

  const TB_EX2 = {
    et1t3: [{ paper: '教材 U1', type: '语音', q: 'shoe / room 中元音', a: '/uː/' }],
    et2t3: [{ paper: '教材 U2', type: '交通', q: 'How does he go to work?', a: 'By car. / He goes by car.' }],
    et3t3: [{ paper: '教材 U3', type: '指路', q: 'You can\'t miss it.', a: '你不会错过的（肯定能找到）' }],
    et4t3: [{ paper: '教材 U4', type: '建议', q: 'You should rest at home.', a: 'should + 原形' }],
    et5t3: [{ paper: '教材 U5', type: '进行时', q: 'What is Dad doing?', a: 'He is washing the car.' }],
    et6t3: [{ paper: '教材 U6', type: 'there be', q: 'Is there any milk?', a: 'No, there isn\'t.' }],
    et7t3: [{ paper: '教材 U7', type: '节日', q: 'eat mooncakes', a: '中秋节吃月饼' }],
    et8t3: [{ paper: '教材 U8', type: '日期', q: 'Children\'s Day 日期', a: 'the first of June' }]
  };

  if (typeof ENG_TOPIC_EXAMPLES !== 'undefined') {
    Object.assign(ENG_TOPIC_EXAMPLES, TB_EX2);
  }
})();
