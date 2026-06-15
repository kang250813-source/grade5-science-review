/* 英语听力练习 · 译林四下（浏览器 TTS 朗读） */

(function () {
  'use strict';

  if (typeof G4_ENG_LISTENING === 'undefined') return;

  G4_ENG_LISTENING.push(
    {
      id: 'g4ln-u1-subjects',
      unit: 0,
      title: 'Unit 1 · School subjects',
      tag: '听对话选答',
      lines: [
        { speaker: 'Miss Li', text: 'Welcome back to school, class.' },
        { speaker: 'Class', text: 'Nice to see you, Miss Li.' },
        { speaker: 'Miss Li', text: 'This is our new timetable. We have English, Chinese, Maths, Art, PE, Music and Science.' },
        { speaker: 'Mike', text: 'What subjects do you like, Wang Bing?' },
        { speaker: 'Wang Bing', text: 'I like Chinese and Maths.' },
        { speaker: 'Yang Ling', text: 'I like Art and Music.' },
        { speaker: 'Miss Li', text: 'Oh! It\'s time for PE.' }
      ],
      questions: [
        {
          q: 'What subjects does Wang Bing like?',
          options: ['Chinese and Maths.', 'Art and Music.', 'PE only.', 'Science only.'],
          answer: 0,
          explain: 'Wang Bing likes Chinese and Maths.'
        },
        {
          q: 'Yang Ling likes Art and Music.',
          answer: true
        },
        {
          q: 'It is time for Music at the end.',
          answer: false
        }
      ]
    },
    {
      id: 'g4ln-u3-day',
      unit: 2,
      title: 'Unit 3 · My day',
      tag: '听短文选答',
      lines: [
        { speaker: 'Narrator', text: 'I get up at seven in the morning.' },
        { speaker: 'Narrator', text: 'I have breakfast at seven twenty and go to school at seven forty.' },
        { speaker: 'Narrator', text: 'I have lunch at school at twelve.' },
        { speaker: 'Narrator', text: 'I go home at four in the afternoon.' },
        { speaker: 'Narrator', text: 'I go to bed at nine.' }
      ],
      questions: [
        {
          q: 'When does the boy get up?',
          options: ['At seven.', 'At eight.', 'At six.'],
          answer: 0,
          explain: 'I get up at seven.'
        },
        {
          q: 'He has lunch at home.',
          answer: false
        },
        {
          q: 'He goes to bed at nine.',
          answer: true
        }
      ]
    },
    {
      id: 'g4ln-u5-seasons',
      unit: 5,
      title: 'Unit 5 · Seasons',
      tag: '听描述选答',
      lines: [
        { speaker: 'Narrator', text: 'In spring, it is warm. We can fly kites and go boating.' },
        { speaker: 'Narrator', text: 'In summer, it is hot. We can go swimming.' },
        { speaker: 'Narrator', text: 'In autumn, it is cool. We can pick apples.' },
        { speaker: 'Narrator', text: 'In winter, it is cold. We can make snowmen and go skating.' }
      ],
      questions: [
        {
          q: 'When can we go swimming?',
          options: ['In summer.', 'In winter.', 'In spring.', 'In autumn.'],
          answer: 0,
          explain: 'In summer, it is hot. We can go swimming.'
        },
        {
          q: 'We can make snowmen in winter.',
          answer: true
        },
        {
          q: 'In spring it is cold.',
          answer: false
        }
      ]
    },
    {
      id: 'g4ln-u8-phone',
      unit: 8,
      title: 'Unit 8 · Phone call',
      tag: '听电话对话',
      lines: [
        { speaker: 'Su Hai', text: 'Hello, this is Su Hai speaking.' },
        { speaker: 'Mike', text: 'Hello, Su Hai. This is Mike.' },
        { speaker: 'Su Hai', text: 'Hi, Mike. How are you?' },
        { speaker: 'Mike', text: 'I\'m fine, thank you. See you tomorrow.' },
        { speaker: 'Su Hai', text: 'See you.' }
      ],
      questions: [
        {
          q: 'Who is calling?',
          options: ['Mike.', 'Su Hai.', 'Miss Li.', 'Tim.'],
          answer: 0,
          explain: 'This is Mike.'
        },
        {
          q: 'They will see each other tomorrow.',
          answer: true
        },
        {
          q: 'Mike is not fine.',
          answer: false
        }
      ]
    }
  );
})();
