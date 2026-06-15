/* 英语听力练习 · 译林六下（浏览器 TTS 朗读） */

(function () {
  'use strict';

  if (typeof G6_ENG_LISTENING === 'undefined') return;

  G6_ENG_LISTENING.push(
    {
      id: 'g6ln-u1-lion',
      unit: 0,
      title: 'Unit 1 · The lion and the mouse',
      tag: '听故事选答',
      lines: [
        { speaker: 'Narrator', text: 'There was a large and strong lion in the forest.' },
        { speaker: 'Narrator', text: 'A mouse walked by and woke the lion up. The lion was angry.' },
        { speaker: 'Mouse', text: 'Please don\'t eat me. I can help you some day.' },
        { speaker: 'Lion', text: 'You\'re so small! How can you help me?' },
        { speaker: 'Narrator', text: 'Later, the mouse helped the lion get out of the net. They became friends.' }
      ],
      questions: [
        {
          q: 'Who woke the lion up?',
          options: ['A mouse.', 'Two men.', 'A fairy.', 'Sam.'],
          answer: 0,
          explain: 'A mouse walked by and woke the lion up.'
        },
        {
          q: 'How did the mouse help the lion?',
          options: ['Made a hole in the net.', 'Gave him food.', 'Called the men.', 'Ran away.'],
          answer: 0,
          explain: 'The mouse made a big hole in the net.'
        }
      ]
    },
    {
      id: 'g6ln-u2-habits',
      unit: 1,
      title: 'Unit 2 · Good habits',
      tag: '听对话选答',
      lines: [
        { speaker: 'Wang Bing', text: 'Did you go to bed late last night, Liu Tao?' },
        { speaker: 'Liu Tao', text: 'Yes, but I\'m not sleepy. I can walk fast.' },
        { speaker: 'Wang Bing', text: 'Ouch! You shouldn\'t go to bed late, Liu Tao.' },
        { speaker: 'Teacher', text: 'Good habits help you do well at school.' }
      ],
      questions: [
        {
          q: 'Did Liu Tao go to bed late?',
          options: ['Yes.', 'No.', 'We don\'t know.', 'He never does.'],
          answer: 0,
          explain: 'Liu Tao: Yes (I went to bed late).'
        },
        {
          q: 'What should Liu Tao not do?',
          options: ['Go to bed late.', 'Get up early.', 'Help parents.', 'Brush teeth.'],
          answer: 0,
          explain: 'You shouldn\'t go to bed late.'
        }
      ]
    },
    {
      id: 'g6ln-u3-diet',
      unit: 2,
      title: 'Unit 3 · A healthy diet',
      tag: '听对话选答',
      lines: [
        { speaker: 'Doctor', text: 'Mike likes sweets and ice cream. He only drinks a little water.' },
        { speaker: 'Doctor', text: 'Yang Ling eats some meat and vegetables. She eats a little rice.' },
        { speaker: 'Girl', text: 'Do you have a healthy diet?' },
        { speaker: 'Boy', text: 'I eat some fruit every day and not too many sweets.' }
      ],
      questions: [
        {
          q: 'How much water does Mike drink?',
          options: ['A little.', 'A lot.', 'None.', 'A few cups.'],
          answer: 0,
          explain: 'He only drinks a little water.'
        },
        {
          q: 'Yang Ling eats a lot of ___. ',
          options: ['rice', 'noodles for breakfast', 'sweets only', 'cola'],
          answer: 1,
          explain: 'She often has a lot of noodles for breakfast.'
        }
      ]
    },
    {
      id: 'g6ln-u4-road',
      unit: 3,
      title: 'Unit 4 · Road safety',
      tag: '听规则选答',
      lines: [
        { speaker: 'Teacher', text: 'To cross the road safely, first look for a zebra crossing.' },
        { speaker: 'Teacher', text: 'Then look at the traffic lights and wait for the green man.' },
        { speaker: 'Teacher', text: 'You must not run or play football on the road.' },
        { speaker: 'Teacher', text: 'Follow the rules and stay safe!' }
      ],
      questions: [
        {
          q: 'What must you wait for?',
          options: ['The green man.', 'The red man.', 'Any car.', 'Your friends only.'],
          answer: 0,
          explain: 'Wait for the green man.'
        },
        {
          q: 'What must you NOT do on the road?',
          options: ['Run or play football.', 'Walk on the pavement.', 'Look left and right.', 'Use a zebra crossing.'],
          answer: 0,
          explain: 'You must not run or play football on the road.'
        }
      ]
    },
    {
      id: 'g6ln-u5-party',
      unit: 5,
      title: 'Unit 5 · A party',
      tag: '听对话选答',
      lines: [
        { speaker: 'Mike', text: 'It is Children\'s Day. We are going to have a party at my house.' },
        { speaker: 'Su Hai', text: 'I am going to buy some snacks and drinks.' },
        { speaker: 'Wang Bing', text: 'I am going to bring some fruit from home.' },
        { speaker: 'Liu Tao', text: 'Here are some balloons for you! I am the clown!' }
      ],
      questions: [
        {
          q: 'Where is the party?',
          options: ['At Mike\'s house.', 'At Su Hai\'s house.', 'At school.', 'In the park.'],
          answer: 0,
          explain: 'Party at Mike\'s house.'
        },
        {
          q: 'What is Liu Tao going to bring?',
          options: ['Balloons.', 'Snacks.', 'Fruit.', 'Toys.'],
          answer: 0,
          explain: 'Here are some balloons for you.'
        }
      ]
    },
    {
      id: 'g6ln-u6-australia',
      unit: 6,
      title: 'Unit 6 · An interesting country',
      tag: '听介绍选答',
      lines: [
        { speaker: 'Liu Tao', text: 'We will learn about Australia next week.' },
        { speaker: 'Mike', text: 'I\'ll ask my e-friend in Australia. She can send me some photos.' },
        { speaker: 'Reader', text: 'You will find kangaroos and koalas in Australia. Sydney is a beautiful city.' },
        { speaker: 'Reader', text: 'Australian football games are very exciting.' }
      ],
      questions: [
        {
          q: 'What animals can you find in Australia?',
          options: ['Kangaroos and koalas.', 'Pandas.', 'Lions.', 'Bears only.'],
          answer: 0,
          explain: 'kangaroos and koalas'
        },
        {
          q: 'Mike will ___ his e-friend.',
          options: ['ask', 'visit', 'forget', 'draw'],
          answer: 0,
          explain: 'I\'ll ask my e-friend in Australia.'
        }
      ]
    },
    {
      id: 'g6ln-u7-holiday',
      unit: 7,
      title: 'Unit 7 · Summer holiday plans',
      tag: '听计划选答',
      lines: [
        { speaker: 'Yang Ling', text: 'Where will you go for the holiday, Mike?' },
        { speaker: 'Mike', text: 'I\'ll go back to London. I\'ll stay there for a month.' },
        { speaker: 'Su Hai', text: 'I\'ll go to Hong Kong with my family. We\'ll go to Disneyland.' },
        { speaker: 'Liu Tao', text: 'I\'ll go to Taipei with my parents.' }
      ],
      questions: [
        {
          q: 'How long will Mike stay in London?',
          options: ['For a month.', 'For a week.', 'For two days.', 'For a year.'],
          answer: 0,
          explain: 'I\'ll stay there for a month.'
        },
        {
          q: 'Where will Su Hai go?',
          options: ['Hong Kong.', 'London.', 'Beijing.', 'Taipei.'],
          answer: 0,
          explain: 'I\'ll go to Hong Kong.'
        }
      ]
    },
    {
      id: 'g6ln-u8-dreams',
      unit: 8,
      title: 'Unit 8 · Our dreams',
      tag: '听对话选答',
      lines: [
        { speaker: 'Miss Li', text: 'What do you want to be in the future, Mike?' },
        { speaker: 'Mike', text: 'I want to be a dentist. I want to help children care for their teeth.' },
        { speaker: 'Wang Bing', text: 'I want to be an astronaut. I want to fly a spaceship to the Moon.' },
        { speaker: 'Miss Li', text: 'I want to see your dreams come true!' }
      ],
      questions: [
        {
          q: 'What does Mike want to be?',
          options: ['A dentist.', 'An astronaut.', 'A writer.', 'A cook.'],
          answer: 0,
          explain: 'I want to be a dentist.'
        },
        {
          q: 'Where does Wang Bing want to fly?',
          options: ['To the Moon.', 'To London.', 'To Australia.', 'To Hong Kong.'],
          answer: 0,
          explain: 'fly a spaceship to the Moon'
        }
      ]
    }
  );
})();
