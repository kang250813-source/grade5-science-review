/* 译林版 · 义务教育教科书英语四年级下册（教材知识点） */

(function () {
  'use strict';

  if (typeof G4_ENG_UNITS === 'undefined') return;

  G4_ENGLISH_EXAM.subtitle = '译林四下教材 · 互动复习课件';
  G4_ENGLISH_EXAM.note = '已整合译林版四下 8 单元 + Project 1/2。建议：教材单元 → 闪卡 → 测验 → 听力。';

  const G4_ENG_TEXTBOOK_UNITS = [
    {
      id: 'g4etb1',
      title: '【教材】Unit 1 · Our school subjects',
      emoji: '📚',
      topics: [
        {
          id: 'g4et1t1',
          title: 'Story time · 课程词汇',
          points: [
            'subjects：Chinese, Maths, English, Art, PE, Music, Science',
            'timetable 课程表；Welcome back to school',
            'What subjects do you like? I like ... and ...',
            'What about you? Me too. / I like ... too.',
            'It\'s time for PE/Music/...'
          ]
        },
        {
          id: 'g4et1t2',
          title: 'Grammar · 科目与 like',
          points: [
            'I like Chinese and Maths. / They like Art.',
            'don\'t = do not：I don\'t like ...',
            'Sound time：ar 发音（arm, art, card）',
            'Culture time：School subjects in other countries',
            'Cartoon time：Bobby 的趣味对话'
          ]
        }
      ]
    },
    {
      id: 'g4etb2',
      title: '【教材】Unit 2 · After school',
      emoji: '⚽',
      topics: [
        {
          id: 'g4et2t1',
          title: 'Story time · 课后活动',
          points: [
            'go swimming, play football, play basketball, play table tennis',
            'Let\'s go ... / Good idea! / What day is it today?',
            'Wednesday, Thursday, Friday, Saturday, Sunday',
            'I have a swimming lesson on ...',
            'What a pity! / All right.'
          ]
        },
        {
          id: 'g4et2t2',
          title: 'Grammar · go + V-ing',
          points: [
            'Let\'s go and play football.',
            'go + 活动-ing：go swimming, go skating, go climbing',
            'play + 球类：play football（不用 the）',
            'Sound time：a 发音（bag, cap, class, match）',
            'Rhyme time：After school 歌谣'
          ]
        }
      ]
    },
    {
      id: 'g4etb3',
      title: '【教材】Unit 3 · My day',
      emoji: '⏰',
      topics: [
        {
          id: 'g4et3t1',
          title: 'Story time · 一天作息',
          points: [
            'get up, have breakfast/lunch/dinner, go to school, go home',
            'in the morning/afternoon/evening, at night',
            'What time do you get up? I get up at seven.',
            'I have ... lessons in the morning.',
            'watch TV, go to bed'
          ]
        },
        {
          id: 'g4et3t2',
          title: 'Grammar · 时间表达',
          points: [
            'at + 时刻：at seven, at seven twenty',
            'What time is it? It\'s ... o\'clock. / It\'s ... thirty.',
            '第三人称单数：gets up, has breakfast, goes to school',
            'Sound time：e 发音（he, she, me, be）',
            'Song time：This is the way'
          ]
        }
      ]
    },
    {
      id: 'g4etb4',
      title: '【教材】Unit 4 · Drawing in the park',
      emoji: '🎨',
      topics: [
        {
          id: 'g4et4t1',
          title: 'Story time · 公园景物',
          points: [
            'draw, boat, flower, tree, river, hill, lake, bridge',
            'Can you draw a ...? Yes, I can. / No, I can\'t.',
            'What can you see? I can see ...',
            'over there, good idea',
            'Well done!'
          ]
        },
        {
          id: 'g4et4t2',
          title: 'Grammar · can 句型',
          points: [
            'I can draw a boat. / Can you ...? Yes, I can./No, I can\'t.',
            'What can you do? I can ...',
            'Sound time：e 发音（she, see, three, tree）',
            'Culture time：Famous places',
            'Cartoon time'
          ]
        }
      ]
    },
    {
      id: 'g4etb5',
      title: '【教材】Project 1 · My school life',
      emoji: '🏫',
      topics: [
        {
          id: 'g4et5t1',
          title: 'Project · 综合复习 1-4 单元',
          points: [
            '制作 timetable 并介绍课程',
            '谈论课后活动和爱好',
            '描述 My day 时间表',
            'Draw and say in the park',
            '小组展示 school life poster'
          ]
        }
      ]
    },
    {
      id: 'g4etb6',
      title: '【教材】Unit 5 · Seasons',
      emoji: '🍂',
      topics: [
        {
          id: 'g4et6t1',
          title: 'Story time · 四季',
          points: [
            'spring, summer, autumn, winter',
            'warm, hot, cool, cold',
            'In spring, it\'s warm. We fly kites and go boating.',
            'In summer, go swimming. In winter, make snowmen.',
            'Which season do you like best? I like ...'
          ]
        },
        {
          id: 'g4et6t2',
          title: 'Grammar · 季节与活动',
          points: [
            'In + 季节 + , it\'s + 形容词.',
            'We can + 动词原形 / go + V-ing',
            'Sound time：u 发音（cup, duck, summer, sun）',
            'Rhyme time：Seasons song',
            'Culture time：Seasons in Australia'
          ]
        }
      ]
    },
    {
      id: 'g4etb7',
      title: '【教材】Unit 6 · Whose dress is this?',
      emoji: '👗',
      topics: [
        {
          id: 'g4et7t1',
          title: 'Story time · 衣物与所有格',
          points: [
            'clothes：dress, coat, shirt, skirt, cap, trousers, sweater',
            'Whose ... is this/are these? It\'s/They\'re ...\'s.',
            'too short/long/big/small',
            'Try ... on. / Put on your ...',
            'Look at my ... It\'s nice.'
          ]
        },
        {
          id: 'g4et7t2',
          title: 'Grammar · 名词所有格',
          points: [
            'Mike\'s cap, Su Hai\'s dress, Yang Ling\'s coat',
            'trousers 复数：Whose trousers are these?',
            'this/that + 单数；these/those + 复数',
            'Sound time：ar 发音（arm, park, party, farm）',
            'Cartoon time'
          ]
        }
      ]
    },
    {
      id: 'g4etb8',
      title: '【教材】Unit 7 · What\'s the matter?',
      emoji: '🤒',
      topics: [
        {
          id: 'g4et8t1',
          title: 'Story time · 疾病与建议',
          points: [
            'What\'s the matter? I\'m tired/hot/cold/thirsty/hungry.',
            'I have a cough/fever/headache.',
            'Take care. / You should ... / Let\'s go to see the doctor.',
            'water, drink, eat, rest',
            'Are you all right? Yes, thank you.'
          ]
        },
        {
          id: 'g4et8t2',
          title: 'Grammar · have 与 should',
          points: [
            'I have a ... / He has a ...',
            'You should drink water / have a rest',
            'Sound time：u 发音（bus, cut, run, sun）',
            'Rhyme time',
            'Culture time：Health tips'
          ]
        }
      ]
    },
    {
      id: 'g4etb9',
      title: '【教材】Unit 8 · How are you?',
      emoji: '📞',
      topics: [
        {
          id: 'g4et9t1',
          title: 'Story time · 电话用语',
          points: [
            'Hello, ... speaking. / Is that ...?',
            'How are you? I\'m fine, thank you. / Not so good.',
            'See you tomorrow. / Goodbye.',
            'Sorry, wrong number.',
            'May I speak to ...?'
          ]
        },
        {
          id: 'g4et9t2',
          title: 'Grammar · 电话交际',
          points: [
            'This is ... speaking.（电话自我介绍）',
            'Who is that speaking?（询问对方）',
            'Sound time：qu 发音（queen, quiet, quilt, question）',
            'Song time',
            'Cartoon time'
          ]
        }
      ]
    },
    {
      id: 'g4etb10',
      title: '【教材】Project 2 · A party',
      emoji: '🎉',
      topics: [
        {
          id: 'g4et10t1',
          title: 'Project · 综合复习 5-8 单元',
          points: [
            '策划 A party：时间、地点、活动',
            '谈论季节、穿着、健康',
            '用电话邀请朋友',
            '制作 party invitation',
            '期末综合展示'
          ]
        }
      ]
    }
  ];

  G4_ENG_UNITS.unshift(...G4_ENG_TEXTBOOK_UNITS);

  if (typeof G4_ENG_FLASHCARDS !== 'undefined') {
    G4_ENG_FLASHCARDS.push(
      { unit: 0, q: '【U1】timetable 是？', a: '课程表' },
      { unit: 1, q: '【U2】play football 还是 play the football?', a: 'play football（不加 the）' },
      { unit: 2, q: '【U3】get up at seven 用介词？', a: 'at' },
      { unit: 3, q: '【U4】Can you draw...? 肯定答？', a: 'Yes, I can.' },
      { unit: 4, q: '【P1】Project 1 主题？', a: 'My school life' },
      { unit: 5, q: '【U5】冬天 cold，春天？', a: 'warm' },
      { unit: 6, q: '【U6】Whose cap is this? 答？', a: 'It\'s Mike\'s.' },
      { unit: 7, q: '【U7】have a fever 意思？', a: '发烧' },
      { unit: 8, q: '【U8】电话自我介绍？', a: 'This is ... speaking.' }
    );
  }

  if (typeof G4_ENG_QUIZ_QUESTIONS !== 'undefined') {
    G4_ENG_QUIZ_QUESTIONS.push(
      { unit: 0, q: '【U1】I don\'t like PE. don\'t = ?', options: ['do not', 'does not', 'did not', 'am not'], answer: 0, explain: 'do not。' },
      { unit: 1, q: '【U2】Let\'s go ___.', options: ['swimming', 'swim', 'swims', 'swam'], answer: 0, explain: 'go swimming。' },
      { unit: 2, q: '【U3】She ___ up at six.', options: ['gets', 'get', 'getting', 'got'], answer: 0, explain: '第三人称单数。' },
      { unit: 5, q: '【U5】We fly kites in ___.', options: ['spring', 'summer', 'winter', 'autumn only'], answer: 0, explain: '春天放风筝。' },
      { unit: 6, q: '【U6】These are Su Hai\'s ___.', options: ['trousers', 'trouser', 'a trouser', 'trouser\'s'], answer: 0, explain: 'trousers 复数。' },
      { unit: 7, q: '【U7】You should drink ___.', options: ['water', 'waters', 'a waters', 'watering'], answer: 0, explain: 'water 不可数。' },
      { unit: 8, q: '【U8】___ is Mike speaking.', options: ['This', 'That', 'It', 'He'], answer: 0, explain: 'This is ... speaking.' }
    );
  }
})();
