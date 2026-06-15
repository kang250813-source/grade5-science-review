/* 英语听力 · 译林三下 */

(function () {
  'use strict';

  if (typeof G3_ENG_LISTENING === 'undefined') return;

  G3_ENG_LISTENING.push(
    {
      id: 'g3ln-u1-class',
      unit: 0,
      title: 'Unit 1 · In class',
      tag: '听课堂对话',
      lines: [
        { speaker: 'Mr Green', text: 'Good morning, class.' },
        { speaker: 'Class', text: 'Good morning, Mr Green.' },
        { speaker: 'Mr Green', text: 'Stand up.' },
        { speaker: 'Mr Green', text: 'Liu Tao, please open the door.' },
        { speaker: 'Liu Tao', text: 'Yes, Mr Green.' },
        { speaker: 'Mr Green', text: 'Sit down, please.' }
      ],
      questions: [
        { q: 'Who opens the door?', options: ['Liu Tao.', 'Mike.', 'Mr Green.', 'Wang Bing.'], answer: 0, explain: 'Liu Tao, please open the door.' },
        { q: 'They say good morning.', answer: true },
        { q: 'Mr Green opens the door.', answer: false }
      ]
    },
    {
      id: 'g3ln-u5-age',
      unit: 5,
      title: 'Unit 5 · How old are you?',
      tag: '听对话选答',
      lines: [
        { speaker: 'Su Hai', text: 'How old are you, Mike?' },
        { speaker: 'Mike', text: 'I\'m nine. How about you?' },
        { speaker: 'Su Hai', text: 'I\'m ten.' },
        { speaker: 'Mike', text: 'Happy birthday!' }
      ],
      questions: [
        { q: 'How old is Mike?', options: ['Nine.', 'Ten.', 'Eight.', 'Eleven.'], answer: 0, explain: 'I\'m nine.' },
        { q: 'Su Hai is ten.', answer: true },
        { q: 'Mike is ten.', answer: false }
      ]
    },
    {
      id: 'g3ln-u6-time',
      unit: 6,
      title: 'Unit 6 · What time is it?',
      tag: '听时间',
      lines: [
        { speaker: 'Yang Ling', text: 'What time is it?' },
        { speaker: 'Liu Tao', text: 'It\'s seven o\'clock.' },
        { speaker: 'Yang Ling', text: 'It\'s time for breakfast.' },
        { speaker: 'Liu Tao', text: 'Hurry up!' }
      ],
      questions: [
        { q: 'What time is it?', options: ['Seven o\'clock.', 'Eight o\'clock.', 'Six o\'clock.', 'Nine o\'clock.'], answer: 0, explain: 'It\'s seven o\'clock.' },
        { q: 'It\'s time for breakfast.', answer: true },
        { q: 'It\'s twelve o\'clock.', answer: false }
      ]
    },
    {
      id: 'g3ln-u7-farm',
      unit: 7,
      title: 'Unit 7 · On the farm',
      tag: '听农场描述',
      lines: [
        { speaker: 'Narrator', text: 'This is a farm.' },
        { speaker: 'Narrator', text: 'These are pigs. Those are cows.' },
        { speaker: 'Narrator', text: 'The duck says quack. The cow says moo.' }
      ],
      questions: [
        { q: 'What are these?', options: ['Pigs.', 'Cows.', 'Ducks.', 'Chickens.'], answer: 0, explain: 'These are pigs.' },
        { q: 'Those are cows.', answer: true },
        { q: 'The pig says moo.', answer: false }
      ]
    }
  );
})();
