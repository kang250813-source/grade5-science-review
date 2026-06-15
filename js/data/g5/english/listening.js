/* 英语听力练习 · 译林五下（浏览器 TTS 朗读） */

const ENG_LISTENING = [
  {
    id: 'ln-u1-cinderella',
    unit: 0,
    title: 'Unit 1 · Cinderella',
    tag: '听对话选答',
    lines: [
      { speaker: 'Girl', text: 'Why are you so sad, Cinderella?' },
      { speaker: 'Cinderella', text: 'Because I can\'t go to the party. I don\'t have nice clothes or shoes.' },
      { speaker: 'Girl', text: 'Who helps her?' },
      { speaker: 'Cinderella', text: 'A fairy helps me. But I have to come back before twelve o\'clock.' }
    ],
    questions: [
      {
        q: 'Why is Cinderella sad?',
        options: [
          'Because she can\'t go to the party.',
          'Because she loses her shoe.',
          'Because the prince is angry.',
          'Because it is midnight.'
        ],
        answer: 0,
        explain: 'Because I can\'t go to the party.'
      },
      {
        q: 'When must Cinderella come back?',
        options: ['Before 10 o\'clock.', 'Before 11 o\'clock.', 'Before 12 o\'clock.', 'After 12 o\'clock.'],
        answer: 2,
        explain: 'I have to come back before twelve o\'clock.'
      }
    ]
  },
  {
    id: 'ln-u2-school',
    unit: 1,
    title: 'Unit 2 · How do you come to school?',
    tag: '听对话选答',
    lines: [
      { speaker: 'Amy', text: 'How do you come to school, Mike?' },
      { speaker: 'Mike', text: 'I come to school by bus.' },
      { speaker: 'Amy', text: 'What about your sister?' },
      { speaker: 'Mike', text: 'She goes to school on foot. Our school is near our home.' }
    ],
    questions: [
      {
        q: 'How does Mike come to school?',
        options: ['By bus.', 'On foot.', 'By bike.', 'By metro.'],
        answer: 0,
        explain: 'Mike: I come to school by bus.'
      },
      {
        q: 'How does Mike\'s sister go to school?',
        options: ['By bus.', 'On foot.', 'By car.', 'By taxi.'],
        answer: 1,
        explain: 'She goes to school on foot.'
      }
    ]
  },
  {
    id: 'ln-u3-way',
    unit: 2,
    title: 'Unit 3 · Asking the way',
    tag: '听对话选答',
    lines: [
      { speaker: 'Tourist', text: 'Excuse me, how do I get to the cinema?' },
      { speaker: 'Boy', text: 'Go along this street. Turn left at the traffic lights.' },
      { speaker: 'Tourist', text: 'Is it far from here?' },
      { speaker: 'Boy', text: 'No. It\'s on your right. You can\'t miss it.' }
    ],
    questions: [
      {
        q: 'Where does the tourist want to go?',
        options: ['The hospital.', 'The cinema.', 'The zoo.', 'The library.'],
        answer: 1,
        explain: 'How do I get to the cinema?'
      },
      {
        q: 'Where should the tourist turn left?',
        options: ['At the second crossing.', 'At the traffic lights.', 'At the bus stop.', 'At the library.'],
        answer: 1,
        explain: 'Turn left at the traffic lights.'
      }
    ]
  },
  {
    id: 'ln-u4-doctor',
    unit: 3,
    title: 'Unit 4 · Seeing the doctor',
    tag: '听对话选答',
    lines: [
      { speaker: 'Doctor', text: 'What\'s wrong with you, Tim?' },
      { speaker: 'Tim', text: 'I have a toothache. I can\'t eat anything.' },
      { speaker: 'Doctor', text: 'You shouldn\'t eat too many sweets.' },
      { speaker: 'Doctor', text: 'You should see the dentist and drink warm water.' }
    ],
    questions: [
      {
        q: 'What\'s wrong with Tim?',
        options: ['He has a fever.', 'He has a toothache.', 'He has a cough.', 'He has a headache.'],
        answer: 1,
        explain: 'I have a toothache.'
      },
      {
        q: 'What shouldn\'t Tim do?',
        options: ['Drink warm water.', 'Eat too many sweets.', 'See the dentist.', 'Rest at home.'],
        answer: 1,
        explain: 'You shouldn\'t eat too many sweets.'
      }
    ]
  },
  {
    id: 'ln-u5-parents',
    unit: 4,
    title: 'Unit 5 · Helping our parents',
    tag: '听对话选答',
    lines: [
      { speaker: 'Mum', text: 'What are you doing, Sam?' },
      { speaker: 'Sam', text: 'I\'m sweeping the floor.' },
      { speaker: 'Mum', text: 'Good boy! What is your father doing?' },
      { speaker: 'Sam', text: 'He is washing the car in the garden.' }
    ],
    questions: [
      {
        q: 'What is Sam doing?',
        options: ['Cooking dinner.', 'Sweeping the floor.', 'Washing clothes.', 'Making the bed.'],
        answer: 1,
        explain: 'I\'m sweeping the floor.'
      },
      {
        q: 'What is Sam\'s father doing?',
        options: ['Watering flowers.', 'Cleaning the room.', 'Washing the car.', 'Reading a book.'],
        answer: 2,
        explain: 'He is washing the car.'
      }
    ]
  },
  {
    id: 'ln-u7-festival',
    unit: 6,
    title: 'Unit 7 · Chinese festivals',
    tag: '听短文选答',
    lines: [
      { speaker: '', text: 'My favourite festival is the Spring Festival. It is in January or February.' },
      { speaker: '', text: 'We usually have a big dinner with my family.' },
      { speaker: '', text: 'We also visit our grandparents and get red packets.' },
      { speaker: '', text: 'At the Lantern Festival, we eat yuanxiao and guess riddles on the lanterns.' }
    ],
    questions: [
      {
        q: 'When is the Spring Festival?',
        options: ['In March or April.', 'In January or February.', 'In June or July.', 'In September or October.'],
        answer: 1,
        explain: 'It is in January or February.'
      },
      {
        q: 'What do people do at the Lantern Festival?',
        options: ['Eat mooncakes.', 'Eat yuanxiao and guess riddles.', 'Climb mountains.', 'Watch dragon boat races.'],
        answer: 1,
        explain: 'We eat yuanxiao and guess riddles.'
      }
    ]
  },
  {
    id: 'ln-u8-birthday',
    unit: 7,
    title: 'Unit 8 · Birthdays',
    tag: '听对话选答',
    lines: [
      { speaker: 'Nancy', text: 'When\'s your birthday, Liu Tao?' },
      { speaker: 'Liu Tao', text: 'It\'s on the eleventh of May.' },
      { speaker: 'Nancy', text: 'What do you usually do on your birthday?' },
      { speaker: 'Liu Tao', text: 'I usually have a birthday party with my friends. We eat a birthday cake.' }
    ],
    questions: [
      {
        q: 'When is Liu Tao\'s birthday?',
        options: ['The eighth of April.', 'The eleventh of May.', 'The first of June.', 'The tenth of September.'],
        answer: 1,
        explain: 'It\'s on the eleventh of May.'
      },
      {
        q: 'What does Liu Tao usually do?',
        options: ['Visit grandparents.', 'Have a birthday party.', 'Go to the cinema.', 'Play football.'],
        answer: 1,
        explain: 'I usually have a birthday party with my friends.'
      }
    ]
  }
];
