/* 译林版 · 义务教育教科书英语三年级下册 */

(function () {
  'use strict';

  if (typeof G3_ENG_UNITS === 'undefined') return;

  G3_ENGLISH_EXAM.subtitle = '译林三下教材 · 互动复习课件';
  G3_ENGLISH_EXAM.note = '已整合译林版三下 8 单元 + Project 1/2。建议：教材单元 → 闪卡 → 测验 → 听力。';

  const G3_ENG_TEXTBOOK_UNITS = [
    {
      id: 'g3etb1',
      title: '【教材】Unit 1 · In class',
      emoji: '🏫',
      topics: [
        {
          id: 'g3et1t1',
          title: 'Story time · 课堂用语',
          points: [
            'Stand up. / Sit down, please.',
            'Good morning, class. / Good morning, Mr Green.',
            'Open/Close the door/window.',
            'Don\'t open the window. / I\'m sorry.',
            'Come in, please. / Yes, Mr Green.'
          ]
        },
        {
          id: 'g3et1t2',
          title: 'Grammar · 祈使句',
          points: [
            'Open the door. / Close the window.',
            'Don\'t run. / Don\'t talk.',
            'please 表示礼貌：Sit down, please.',
            'Sound time：ar 发音（arm, art, car, park）',
            'Cartoon time：Bobby 趣味对话'
          ]
        }
      ]
    },
    {
      id: 'g3etb2',
      title: '【教材】Unit 2 · In the library',
      emoji: '📚',
      topics: [
        {
          id: 'g3et2t1',
          title: 'Story time · 图书馆规则',
          points: [
            'Shh! Don\'t talk. / Don\'t run.',
            'Don\'t eat or drink.',
            'Would you like ...? Yes, please. / No, thank you.',
            'library, book, read, write',
            '保持安静，爱护书籍'
          ]
        },
        {
          id: 'g3et2t2',
          title: 'Grammar · Don\'t 句型',
          points: [
            'Don\'t + 动词原形',
            'Talk quietly. / Read quietly.',
            'Sound time：a 发音（bag, cap, class, dad）',
            'Rhyme time：In the library',
            'Culture time：图书馆礼仪'
          ]
        }
      ]
    },
    {
      id: 'g3etb3',
      title: '【教材】Unit 3 · Is this your pencil?',
      emoji: '✏️',
      topics: [
        {
          id: 'g3et3t1',
          title: 'Story time · 物品与物主代词',
          points: [
            'schoolbag, pen, pencil, ruler, rubber, crayon',
            'Is this your ...? Yes, it is. / No, it isn\'t.',
            'Is that your ...? it 指近，that 指远',
            'This is my ... / That is your ...',
            'Lost and Found 失物招领'
          ]
        },
        {
          id: 'g3et3t2',
          title: 'Grammar · my/your',
          points: [
            'my book, your pen, his, her（拓展）',
            'this/that + is + 名词',
            'Sound time：e 发音（he, she, me, we）',
            'Song time',
            'Cartoon time'
          ]
        }
      ]
    },
    {
      id: 'g3etb4',
      title: '【教材】Unit 4 · Where\'s the bird?',
      emoji: '🐦',
      topics: [
        {
          id: 'g3et4t1',
          title: 'Story time · 方位介词',
          points: [
            'on, in, under, behind, beside',
            'Where\'s the bird? It\'s in the tree.',
            'Where\'s my ...? It\'s on the desk.',
            'chair, desk, bird, in the tree',
            'Look! A bird!'
          ]
        },
        {
          id: 'g3et4t2',
          title: 'Grammar · Where\'s ...?',
          points: [
            'Where\'s = Where is',
            'It\'s + 介词短语',
            'Sound time：i 发音（it, is, sit, this）',
            'Rhyme time',
            'Culture time'
          ]
        }
      ]
    },
    {
      id: 'g3etb5',
      title: '【教材】Project 1 · My puppy',
      emoji: '🐶',
      topics: [
        {
          id: 'g3et5t1',
          title: 'Project · 综合复习 1-4 单元',
          points: [
            '制作 My puppy 海报',
            '复习课堂用语、图书馆规则',
            '描述物品归属与位置',
            '小组展示',
            '创意画与口语结合'
          ]
        }
      ]
    },
    {
      id: 'g3etb6',
      title: '【教材】Unit 5 · How old are you?',
      emoji: '🎂',
      topics: [
        {
          id: 'g3et6t1',
          title: 'Story time · 年龄',
          points: [
            'How old are you? I\'m nine.',
            'How old is he/she? He/She is ...',
            'one to twelve 数字',
            'happy birthday, cake, make a wish',
            'Don\'t ... for your sister/brother'
          ]
        },
        {
          id: 'g3et6t2',
          title: 'Grammar · 年龄询问',
          points: [
            'I\'m ... / He\'s ... / She\'s ...',
            'How old is ...? 第三人称单数',
            'Sound time：o 发音（go, no, so, hello）',
            'Song time：Happy Birthday',
            'Cartoon time'
          ]
        }
      ]
    },
    {
      id: 'g3etb7',
      title: '【教材】Unit 6 · What time is it?',
      emoji: '⏰',
      topics: [
        {
          id: 'g3et7t1',
          title: 'Story time · 时间',
          points: [
            'What time is it? It\'s ... o\'clock.',
            'It\'s time for breakfast/lunch/dinner/class.',
            'wake up, go to school, go to bed',
            'Hurry up! / It\'s late.',
            'clock, time'
          ]
        },
        {
          id: 'g3et7t2',
          title: 'Grammar · 整点表达',
          points: [
            'It\'s seven o\'clock.',
            'It\'s time for + 名词 / to + 动词',
            'Sound time：u 发音（bus, duck, run, sun）',
            'Rhyme time',
            'Culture time：时间观念'
          ]
        }
      ]
    },
    {
      id: 'g3etb8',
      title: '【教材】Unit 7 · On the farm',
      emoji: '🐄',
      topics: [
        {
          id: 'g3et8t1',
          title: 'Story time · 农场动物',
          points: [
            'cow, pig, duck, chicken, sheep, horse',
            'What are these/those? They\'re ...',
            'moo, oink, quack, cluck',
            'On the farm, I can see ...',
            'These/Those 指近指远'
          ]
        },
        {
          id: 'g3et8t2',
          title: 'Grammar · these/those',
          points: [
            'What are these? They\'re pigs.',
            'this/that 单数，these/those 复数',
            'Sound time：e 发音（he, she, we, be）',
            'Song time：Old MacDonald',
            'Cartoon time'
          ]
        }
      ]
    },
    {
      id: 'g3etb9',
      title: '【教材】Unit 8 · We\'re twins!',
      emoji: '👯',
      topics: [
        {
          id: 'g3et9t1',
          title: 'Story time · 人物介绍',
          points: [
            'We\'re twins! / We\'re sisters/brothers.',
            'Who\'s that girl/boy/man/woman?',
            'She\'s my friend. / He\'s my brother.',
            'Nice to meet you. / Nice to meet you, too.',
            'name, friend, sister, brother'
          ]
        },
        {
          id: 'g3et9t2',
          title: 'Grammar · Who\'s ...?',
          points: [
            'Who\'s = Who is',
            'She\'s/He\'s ... / We\'re ... / They\'re ...',
            'Sound time：qu 发音（queen, quiet, quilt）',
            'Rhyme time',
            'Culture time：介绍他人'
          ]
        }
      ]
    },
    {
      id: 'g3etb10',
      title: '【教材】Project 2 · A magic clock',
      emoji: '🕐',
      topics: [
        {
          id: 'g3et10t1',
          title: 'Project · 综合复习 5-8 单元',
          points: [
            '制作 magic clock 展示一天作息',
            '复习年龄、时间、农场、人物介绍',
            'What time is it? 与活动配对',
            '小组表演',
            '期末综合展示'
          ]
        }
      ]
    }
  ];

  G3_ENG_UNITS.unshift(...G3_ENG_TEXTBOOK_UNITS);

  if (typeof G3_ENG_FLASHCARDS !== 'undefined') {
    G3_ENG_FLASHCARDS.push(
      { unit: 0, q: '【U1】Close the window 意思？', a: '关窗' },
      { unit: 1, q: '【U2】Shh! 意思？', a: '嘘！安静' },
      { unit: 2, q: '【U3】Is this your pen? 否定答？', a: 'No, it isn\'t.' },
      { unit: 3, q: '【U4】在树下用？', a: 'under the tree' },
      { unit: 4, q: '【P1】Project 1 主题？', a: 'My puppy' },
      { unit: 5, q: '【U5】How old is he? 答？', a: 'He\'s ...' },
      { unit: 6, q: '【U6】It\'s time for lunch 意思？', a: '该吃午饭了' },
      { unit: 7, q: '【U7】These are ___ (pig).', a: 'pigs' },
      { unit: 8, q: '【U8】Who\'s that girl? 答？', a: 'She\'s ...' }
    );
  }

  if (typeof G3_ENG_QUIZ_QUESTIONS !== 'undefined') {
    G3_ENG_QUIZ_QUESTIONS.push(
      { unit: 0, q: '【U1】Come in 意思？', options: ['进来', '出去', '起立', '坐下'], answer: 0, explain: 'Come in 进来。' },
      { unit: 2, q: '【U3】That is ___ pen.', options: ['your', 'you', 'yours pen', 'you\'re'], answer: 0, explain: 'your + 名词。' },
      { unit: 3, q: '【U4】It\'s ___ the desk.', options: ['on', 'in', 'at', 'of'], answer: 0, explain: 'on the desk。' },
      { unit: 5, q: '【U5】I\'m ten ___.', options: ['(省略 years old)', 'year', 'years old old', 'old years'], answer: 0, explain: 'I\'m ten.' },
      { unit: 6, q: '【U6】It\'s eight ___.', options: ['o\'clock', 'clock', 'a clock', 'clocks'], answer: 0, explain: '整点 o\'clock。' },
      { unit: 7, q: '【U7】What are those? They\'re ___.', options: ['ducks', 'duck', 'a duck', 'ducking'], answer: 0, explain: '复数 ducks。' },
      { unit: 8, q: '【U8】We ___ twins.', options: ['are', 'is', 'am', 'be'], answer: 0, explain: 'We are twins.' }
    );
  }
})();
