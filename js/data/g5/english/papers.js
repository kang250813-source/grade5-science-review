/* 亮点给力大试卷 A3 · 译林版五下 Unit 1-8（扫描卷 OCR/读图提取） */

const ENG_SOURCES = [
  { id: 'ld', name: 'A3亮点给力大试卷（1-90页）', region: '译林版五下' },
  { id: 'ld-u1a', name: 'Unit 1 综合测试卷(A)', region: 'Cinderella' },
  { id: 'ld-u1b', name: 'Unit 1 综合测试卷(B)', region: 'Cinderella' },
  { id: 'ld-u2a', name: 'Unit 2 综合测试卷(A)', region: 'How do you come to school?' },
  { id: 'ld-u2b', name: 'Unit 2 综合测试卷(B)', region: '交通方式' },
  { id: 'ld-u3', name: 'Unit 3 综合测试', region: 'Asking the way' },
  { id: 'ld-u4', name: 'Unit 4 综合测试', region: 'Seeing the doctor' },
  { id: 'ld-u5', name: 'Unit 5 综合测试', region: 'Helping our parents' },
  { id: 'ld-u6', name: 'Unit 6 综合测试', region: 'In the kitchen' },
  { id: 'ld-u7', name: 'Unit 7 综合测试', region: 'Chinese festivals' },
  { id: 'ld-u8', name: 'Unit 8 综合测试', region: 'Birthdays' },
  { id: 'ld-mix', name: '单元易错点汇总 + 文化阅读', region: '综合' }
];

const ENG_EXAM_SECTIONS = [
  { icon: '🎧', title: '听力部分', desc: '听音选图、听对话选答、听短文排序/填表（约 30 分）' },
  { icon: '📝', title: '笔试词汇', desc: '首字母填空、词形变化、选词填空、完形填空' },
  { icon: '✅', title: '单项选择', desc: '语法、固定搭配、课文细节、生活运用' },
  { icon: '📖', title: '阅读', desc: '短文理解、任务型阅读、T/F 判断、信息匹配' },
  { icon: '💬', title: '对话与写作', desc: '补全对话、连词成句、书面表达' }
];

const ENG_COMMON_MISTAKES = [
  { unit: 1, topic: 'have to / has to', tip: '主语第三人称单数用 has to；I/you/we/they 用 have to' },
  { unit: 1, topic: 'try on 语序', tip: '宾语是代词放中间：try it on ✓；try on it ✗' },
  { unit: 2, topic: 'by + 交通工具', tip: 'by bus / by metro 不加冠词；take a bus 是动词短语' },
  { unit: 3, topic: 'get in / get on', tip: '小汽车、出租车 get in；公交、火车、飞机 get on' },
  { unit: 4, topic: 'too much / too many', tip: 'too much + 不可数；too many + 可数复数' },
  { unit: 5, topic: 'be busy', tip: 'be busy with sth. / be busy (in) doing sth.' },
  { unit: 6, topic: 'look for / find', tip: 'look for 强调过程；find 强调结果' },
  { unit: 7, topic: 'give 双宾语', tip: '两宾语都是代词时只用 give sth. to sb.' },
  { unit: 8, topic: 'start doing / to do', tip: 'start doing 已在进行；start to do 即将开始' }
];

const ENG_TOPIC_EXAMPLES = {
  e1t1: [
    { paper: '亮点给力 U4', type: '选择', q: 'Mike shouldn\'t drink ______ cola.', a: 'too much（不可数）' },
    { paper: '亮点给力 U1', type: '选择', q: 'Here ______ some bread for you.', a: 'is' }
  ],
  e1t2: [
    { paper: '亮点给力 易错', type: '填空', q: 'Don\'t drink ______ cola.', a: 'too much' },
    { paper: '亮点给力 U4', type: '选择', q: 'too many apples', a: '可数复数用 too many' }
  ],
  e2t1: [
    { paper: '亮点给力 U1B', type: '选择', q: 'Mr Green ______ every day.', a: 'swims' },
    { paper: '亮点给力 U1', type: '选择', q: 'The flower ______ pretty.', a: 'looks' }
  ],
  e2t2: [
    { paper: '亮点给力 U1', type: '选择', q: 'Look! He ______ now.', a: 'is swimming' },
    { paper: '亮点给力 U1B', type: '词汇', q: 'The students ______ a Music lesson.', a: 'are having' }
  ],
  e3t1: [
    { paper: '亮点给力 U1', type: '选择', q: 'go to work ______ 7:00 ______ every morning', a: 'at; /' },
    { paper: '亮点给力 U8', type: '填空', q: 'the eighth of April', a: '序数词 + of + 月份' }
  ],
  e3t2: [
    { paper: '亮点给力 U1', type: '选择', q: 'Turn right ______ the traffic lights', a: 'at' },
    { paper: '亮点给力 U2', type: '选择', q: 'on your left', a: 'on + 方位' }
  ],
  e3t3: [
    { paper: '亮点给力 U2A', type: '选择', q: 'What about ______ kites?', a: 'flying（about + doing）' },
    { paper: '亮点给力 U2', type: '阅读', q: 'Chongqing Metro Line 4 — farmers sell vegetables', a: 'by metro 生活运用' }
  ],
  e4t1: [
    { paper: '亮点给力 U1', type: '选择', q: 'Why are you so sad?', a: 'Because...' },
    { paper: '亮点给力 U2', type: '选择', q: 'Why 对应 Because', a: '时态一致' }
  ],
  e4t2: [
    { paper: '亮点给力 U1', type: '选择', q: 'Mother\'s Day — second Sunday of May', a: 'C' },
    { paper: '亮点给力 U7', type: '对话', q: 'Lantern Festival — 15th day of first lunar month', a: '农历表达' }
  ],
  e4t3: [
    { paper: '亮点给力 对话', type: '填空', q: 'guess riddles on the lanterns', a: '元宵节活动' },
    { paper: '亮点给力 U7', type: '选择', q: 'give it to him（两代词）', a: '不能 give him it' }
  ],
  e5t1: [
    { paper: '亮点给力 U5', type: '选择', q: 'be busy ______ homework', a: 'with / doing' },
    { paper: '亮点给力 U1', type: '填空', q: 'pick grapes / make the bed', a: '日常短语' }
  ],
  e5t2: [
    { paper: '亮点给力 U4', type: '填空', q: 'have a toothache — can\'t eat', a: 'toothache' },
    { paper: '亮点给力 U1', type: '选择', q: 'feel well', a: '感官动词 + 形容词' }
  ],
  e5t3: [
    { paper: '亮点给力 U2A', type: '词汇', q: 'drive → driver; foot → feet', a: '词形变化' },
    { paper: '亮点给力 U1B', type: '词汇', q: 'try → trying', a: '现在分词' }
  ],
  e6t1: [
    { paper: '南京卷', type: '阅读', q: 'Myopia — two hours outdoor', a: '遗传 + 户外活动' },
    { paper: '亮点给力 综合', type: '阅读', q: '20/20/20 Rule', a: '护眼习惯' }
  ],
  e6t2: [
    { paper: '南京卷', type: '阅读', q: 'six kinds of tea; gong fu tea', a: '茶文化' },
    { paper: '亮点给力 综合', type: '阅读', q: 'Don\'t make the cup too full', a: '倒茶礼仪' }
  ],
  e6t3: [
    { paper: '亮点给力 U2', type: '对话', q: 'go to the park to fly kites by bike', a: '写作句型' },
    { paper: '亮点给力 U2', type: '匹配', q: 'Transport manual — by ship / Shenzhou', a: '交通主题写作' }
  ],
  e7t1: [
    { paper: '亮点给力 U3', type: '选择', q: 'Turn left ______ the cinema.', a: 'at' },
    { paper: '亮点给力 U3', type: '填空', q: 'on your left / right', a: '方位介词 on' }
  ],
  e7t2: [
    { paper: '亮点给力 U4', type: '选择', q: 'Tim has a toothache. He can\'t eat.', a: 'toothache' },
    { paper: '亮点给力 U4', type: '对话', q: 'You shouldn\'t drink too much cola.', a: 'should/shouldn\'t' }
  ],
  e7t3: [
    { paper: '亮点给力 U5', type: '选择', q: 'Mum is busy ______ dinner.', a: 'cooking / with' },
    { paper: '亮点给力 U5', type: '填空', q: 'make the bed / sweep the floor', a: '家务短语' }
  ],
  e7t4: [
    { paper: '亮点给力 U6', type: '选择', q: 'Are you cooking? — Yes, I am.', a: '现在进行时' },
    { paper: '亮点给力 U6', type: '填空', q: 'smell nice / taste good', a: '感官动词+形容词' }
  ],
  e8t1: [
    { paper: '亮点给力 U1', type: '选择', q: 'Cinderella has to go home before 12.', a: 'has to + 原形' },
    { paper: '亮点给力 U1B', type: '填空', q: 'She has to ______ home early.', a: 'go' }
  ],
  e8t2: [
    { paper: '亮点给力 U1', type: '选择', q: 'Try it on.', a: '代词放中间' },
    { paper: '亮点给力 U7', type: '选择', q: 'Give it to him.', a: '双宾语' }
  ],
  e8t3: [
    { paper: '亮点给力 U6', type: '填空', q: 'I\'m looking for my pen.', a: 'look for 过程' },
    { paper: '亮点给力 U8', type: '选择', q: 'It\'s starting to rain.', a: 'start to do' }
  ],
  e8t4: [
    { paper: '亮点给力 U2', type: '阅读', q: 'Chongqing Metro Line 4', a: '农民卖蔬菜' },
    { paper: '亮点给力 阅读', type: '阅读', q: 'The talkative turtle', a: '张嘴掉下来' }
  ]
};

const ENG_PAPER_PICKS = [
  { id: 'epk1', paper: '亮点给力 U1', q: 'Cinderella has to ______ home before 12.', options: ['go', 'goes', 'going'], answer: 0, explain: 'has to + 动词原形 go。' },
  { id: 'epk2', paper: '亮点给力 U1', q: 'Try ______ on. (the skirt / it)', options: ['it on', 'on it', 'on the skirt'], answer: 0, explain: '代词放中间：try it on。' },
  { id: 'epk3', paper: '亮点给力 U2', q: 'I go to school ______ bus.', options: ['by', 'take', 'on'], answer: 0, explain: 'by bus 固定搭配。' },
  { id: 'epk4', paper: '亮点给力 U2', q: 'He ______ a bus to the park.', options: ['by', 'takes', 'take'], answer: 1, explain: 'take a bus 作谓语。' },
  { id: 'epk5', paper: '亮点给力 U3', q: 'Get ______ the taxi.', options: ['in', 'on', 'at'], answer: 0, explain: '小汽车/出租车用 get in。' },
  { id: 'epk6', paper: '亮点给力 U3', q: 'Get ______ the bus.', options: ['in', 'on', 'at'], answer: 1, explain: '公交车用 get on。' },
  { id: 'epk7', paper: '亮点给力 U4', q: 'Don\'t eat ______ sweets.', options: ['too much', 'too many', 'much too'], answer: 1, explain: 'sweets 可数复数。' },
  { id: 'epk8', paper: '亮点给力 U4', q: 'Don\'t drink ______ water.', options: ['too many', 'too much', 'many too'], answer: 1, explain: 'water 不可数。' },
  { id: 'epk9', paper: '亮点给力 U5', q: 'Mum is busy ______ dinner.', options: ['cook', 'cooking', 'cooks'], answer: 1, explain: 'be busy doing。' },
  { id: 'epk10', paper: '亮点给力 U5', q: 'He is busy ______ his homework.', options: ['with', 'for', 'at'], answer: 0, explain: 'be busy with sth.' },
  { id: 'epk11', paper: '亮点给力 U6', q: 'I can\'t ______ my pen. I\'m ______ it.', options: ['find; looking for', 'look for; finding', 'find; finding'], answer: 0, explain: 'look for 过程，find 结果。' },
  { id: 'epk12', paper: '亮点给力 U7', q: 'Give ______ to ______.', options: ['it; him', 'him; it', 'him it'], answer: 0, explain: '两代词用 give sth. to sb.' },
  { id: 'epk13', paper: '亮点给力 U8', q: 'It\'s starting ______ rain.', options: ['to', 'ing', 'for'], answer: 0, explain: '即将开始用 start to do。' },
  { id: 'epk14', paper: '亮点给力 U8', q: 'She starts ______ her homework.', options: ['do', 'doing', 'does'], answer: 1, explain: '已在进行 start doing。' },
  { id: 'epk15', paper: '亮点给力 U2A', q: 'What about ______ kites in the park?', options: ['fly', 'flying', 'to fly'], answer: 1, explain: 'What about + doing。' },
  { id: 'epk16', paper: '亮点给力 U2A', q: 'How do they get to the museum?', options: ['By bus.', 'After school.', 'In the park.'], answer: 0, explain: '问交通方式。' },
  { id: 'epk17', paper: '亮点给力 U2', q: 'The shop is ______ Wall Street.', options: ['in', 'on', 'at'], answer: 1, explain: 'on Wall Street。' },
  { id: 'epk18', paper: '亮点给力 U1', q: 'This food is bad. We can\'t eat ______.', options: ['them', 'it', 'us'], answer: 1, explain: 'food 不可数。' },
  { id: 'epk19', paper: '亮点给力 U1', q: '—Here ______ some bread.', options: ['is', 'are', 'have'], answer: 0, explain: 'bread 不可数。' },
  { id: 'epk20', paper: '亮点给力 U1', q: 'Mr Green ______ every day. Look! He ______ now.', options: ['swims; is swimming', 'swim; swims', 'is swimming; swims'], answer: 0, explain: '习惯 vs 现在。' },
  { id: 'epk21', paper: '亮点给力 U1', q: 'John goes by ______. He likes toy ______.', options: ['car; cars', 'a car; car', 'cars; cars'], answer: 0, explain: 'by car；复数 toys cars。' },
  { id: 'epk22', paper: '亮点给力 U1', q: '—When\'s ______? —Second Sunday of May.', options: ['Labour Day', 'Father\'s Day', 'Mother\'s Day'], answer: 2, explain: '母亲节。' },
  { id: 'epk23', paper: '亮点给力 U2', q: 'I sometimes ______ there to buy books.', options: ['by bike', 'ride a bike', 'riding a bike'], answer: 1, explain: '缺谓语动词。' },
  { id: 'epk24', paper: '亮点给力 U4', q: 'Let ______ show you around.', options: ['we', 'us', 'our'], answer: 1, explain: 'Let + 宾格。' },
  { id: 'epk25', paper: '亮点给力 U4', q: 'Tim has a ______. He can\'t eat.', options: ['headache', 'toothache', 'fever'], answer: 1, explain: '牙疼。' },
  { id: 'epk26', paper: '亮点给力 U2', q: 'Chongqing Metro Line 4 helps farmers ______.', options: ['sell vegetables', 'drive buses', 'plant trees'], answer: 0, explain: '阅读：卖蔬菜。' },
  { id: 'epk27', paper: '亮点给力 U2', q: 'London is famous for ______.', options: ['yellow taxis', 'double-decker buses', 'gondolas'], answer: 1, explain: '双层巴士。' },
  { id: 'epk28', paper: '亮点给力 U2', q: 'People in Venice travel by ______.', options: ['tuk-tuk', 'gondola', 'metro'], answer: 1, explain: '贡多拉。' },
  { id: 'epk29', paper: '亮点给力 阅读', q: 'The talkative turtle falls because ______.', options: ['it opens its mouth', 'the birds fly away', 'it is too heavy'], answer: 0, explain: '张嘴说话掉下来。' },
  { id: 'epk30', paper: '亮点给力 阅读', q: 'The coconut trader learns ______.', options: ['haste makes waste', 'boys are clever', 'coconuts are heavy'], answer: 0, explain: '欲速则不达。' },
  { id: 'epk31', paper: '亮点给力 U1B', q: 'Cinderella must ______ home before twelve.', options: ['go', 'goes', 'going'], answer: 0, explain: 'must/has to + 原形。' },
  { id: 'epk32', paper: '亮点给力 U2B', q: 'We cross the sea ______ ship.', options: ['by', 'take', 'on'], answer: 0, explain: 'by ship。' },
  { id: 'epk33', paper: '亮点给力 U3', q: 'Turn left ______ the cinema.', options: ['at', 'in', 'on'], answer: 0, explain: 'at the cinema。' },
  { id: 'epk34', paper: '亮点给力 U6', q: 'Where is my cup? I\'m ______ it.', options: ['looking for', 'finding', 'look at'], answer: 0, explain: '还在找。' },
  { id: 'epk35', paper: '亮点给力 U7', q: 'We ______ riddles at the Lantern Festival.', options: ['guess', 'guesses', 'guessing'], answer: 0, explain: '一般现在时复数。' },
  { id: 'epk36', paper: '亮点给力 U8', q: 'It\'s on the ______ of April.', options: ['eight', 'eighth', 'eights'], answer: 1, explain: '序数词。' }
];

if (typeof ENG_QUIZ_QUESTIONS !== 'undefined') {
  ENG_QUIZ_QUESTIONS.push(
    { unit: 0, q: '【亮点给力 U1】Cinderella has to ______ before 12.', options: ['go home', 'goes home', 'going home'], answer: 0, explain: 'has to + 原形。' },
    { unit: 0, q: '【亮点给力 U1】Try the dress on. → Try ______ on.', options: ['it', 'the it', 'on it'], answer: 0, explain: 'try it on。' },
    { unit: 2, q: '【亮点给力 U2】What about ______ kites?', options: ['fly', 'flying', 'to fly'], answer: 1, explain: 'about + doing。' },
    { unit: 2, q: '【亮点给力 U2】He takes ______ to school.', options: ['bus', 'a bus', 'by bus'], answer: 1, explain: 'take a bus。' },
    { unit: 2, q: '【亮点给力 U3】Get ______ the bus.', options: ['in', 'on', 'at'], answer: 1, explain: 'get on the bus。' },
    { unit: 0, q: '【亮点给力 U4】too ______ sweets (可数)', options: ['much', 'many', 'more'], answer: 1, explain: 'too many。' },
    { unit: 4, q: '【亮点给力 U5】be busy ______ homework', options: ['with', 'for', 'at'], answer: 0, explain: 'busy with。' },
    { unit: 4, q: '【亮点给力 U6】I can\'t find it. I\'m ______ it.', options: ['looking for', 'finding', 'look for'], answer: 0, explain: 'look for。' },
    { unit: 3, q: '【亮点给力 U7】Give the book to ______. (he)', options: ['he', 'him', 'his'], answer: 1, explain: 'to + 宾格。' },
    { unit: 3, q: '【亮点给力 U8】start ______ (do) homework now', options: ['do', 'doing', 'does'], answer: 1, explain: 'start doing。' },
    { unit: 2, q: '【亮点给力 U2】The shop is ______ Wall Street.', options: ['in', 'on', 'at'], answer: 1, explain: 'on + 街名。' },
    { unit: 5, q: '【亮点给力 阅读】Chongqing Metro Line 4 is special because ______.', options: ['farmers use it', 'it is very fast', 'it is new'], answer: 0, explain: '农民卖菜。' },
    { unit: 5, q: '【亮点给力 阅读】Gondolas are in ______.', options: ['London', 'Venice', 'Bangkok'], answer: 1, explain: '威尼斯。' },
    { unit: 1, q: '【亮点给力 U1B】The Browns ______ having breakfast.', options: ['is', 'are', 'am'], answer: 1, explain: 'The Browns 复数。' },
    { unit: 4, q: '【亮点给力 U4】She wants to ______ grapes.', options: ['catch', 'pick', 'take'], answer: 1, explain: 'pick 摘。' }
  );
}

if (typeof ENG_FLASHCARDS !== 'undefined') {
  ENG_FLASHCARDS.push(
    { unit: 0, q: 'Cinderella has to go → has to 后接？', a: '动词原形 go' },
    { unit: 0, q: 'try the skirt on → 代词怎么说？', a: 'try it on' },
    { unit: 2, q: 'by bus vs take a bus？', a: 'by 作状语；take 作谓语' },
    { unit: 2, q: '出租车用 get in 还是 get on？', a: 'get in' },
    { unit: 4, q: 'be busy with 和 be busy doing？', a: '都表示忙于…' },
    { unit: 4, q: 'look for 和 find 区别？', a: '找的过程 vs 找到结果' },
    { unit: 3, q: 'give him it 对吗？', a: '不对，用 give it to him' },
    { unit: 3, q: 'What about 后接？', a: 'doing，如 flying kites' },
    { unit: 5, q: 'Chongqing Metro Line 4 阅读要点？', a: '农民乘地铁卖蔬菜' },
    { unit: 5, q: 'London 标志性交通？', a: 'double-decker buses' }
  );
}

if (typeof ENG_VOCAB_A !== 'undefined') {
  ENG_VOCAB_A.push(
    { id: 'a6', q: 'Get ______ the taxi. Get ______ the bus.', hint: 'in / on', answer: 'in,on', multi: true, explain: 'in 小车；on 公交。' },
    { id: 'a7', q: 'Mum is busy ______ (cook) dinner.', hint: 'cooking', answer: 'cooking', explain: 'busy doing。' },
    { id: 'a8', q: 'What about ______ (fly) kites?', hint: 'flying', answer: 'flying', explain: 'about + doing。' },
    { id: 'a9', q: 'I can\'t ______ my key. I\'m ______ it.', hint: 'find / looking for', answer: 'find,looking for', multi: true, explain: 'find vs look for。' },
    { id: 'a10', q: 'Give ______ (it) to ______ (he).', hint: 'it / him', answer: 'it,him', multi: true, explain: 'give sth. to sb.' }
  );
}

if (typeof ENG_VOCAB_B !== 'undefined') {
  ENG_VOCAB_B.push(
    { id: 'b6', q: 'She has to ______ (go) home early.', base: 'go', answer: 'go', explain: 'has to + 原形。' },
    { id: 'b7', q: 'Try ______ (it) on, please.', base: 'it', answer: 'it', explain: 'try it on。' },
    { id: 'b8', q: 'They get to school ______ (take) the metro.', base: 'take', answer: 'by,take', accept: ['by metro','take the metro'], explain: 'by metro / take the metro。' },
    { id: 'b9', q: 'The talkative turtle ______ (open) its mouth and falls.', base: 'open', answer: 'opens', explain: '第三人称单数。' },
    { id: 'b10', q: 'Farmers ______ (sell) vegetables on Metro Line 4.', base: 'sell', answer: 'sell', explain: '一般现在时。' }
  );
}

if (typeof ENG_VOCAB_C !== 'undefined') {
  ENG_VOCAB_C.push(
    { id: 'c6', q: 'Get i______ the taxi.', answer: 'n', full: 'in', explain: 'get in。' },
    { id: 'c7', q: 'Get o______ the bus.', answer: 'n', full: 'on', explain: 'get on。' },
    { id: 'c8', q: 'Mum is b______ with housework.', answer: 'usy', full: 'busy', explain: 'be busy with。' },
    { id: 'c9', q: 'I\'m l______ for my pen.', answer: 'ooking', full: 'looking', explain: 'look for。' },
    { id: 'c10', q: 'G______ it to him.', answer: 'ive', full: 'Give', explain: 'Give sth. to sb.' }
  );
}

const ENG_READING_METRO = {
  title: 'Chongqing Metro Line 4',
  passage: `Metro Line 4 in Chongqing is a special metro line.
Many farmers take this metro to the city.
They sell fresh vegetables at the market.
The metro helps them save time on the road.
People call it a "vegetable metro".
It supports farmers and city life together.`,
  questions: [
    { q: 'Why is Metro Line 4 special?', options: ['Farmers use it to sell vegetables.', 'It is the longest line.', 'It only runs at night.'], answer: 0, explain: '农民卖菜。' },
    { q: 'Farmers go to the city to ______.', options: ['sell vegetables', 'see films', 'go swimming'], answer: 0, explain: '卖蔬菜。' },
    { q: 'The metro helps farmers ______.', options: ['save time', 'cook dinner', 'do homework'], answer: 0, explain: 'save time。' },
    { q: 'People call it a "______ metro".', type: 'fill', answer: 'vegetable', accept: ['vegetable'] }
  ]
};

const ENG_READING_TRANSPORT = {
  title: 'Transport Around the World',
  passage: `There is interesting transport in different countries.

London — People love double-decker buses. They are tall and red.

New York — Yellow taxis are everywhere. You can stop one on the street.

Venice — There are no cars on the water streets. People travel by gondola.

Thailand — Tuk-tuks are small and fast. They are good for short trips.`,
  questions: [
    { q: 'Double-decker buses are in ______.', options: ['London', 'New York', 'Venice'], answer: 0, explain: '伦敦。' },
    { q: 'Yellow taxis are famous in ______.', options: ['Bangkok', 'New York', 'London'], answer: 1, explain: '纽约。' },
    { q: 'People in Venice travel by ______.', options: ['gondola', 'tuk-tuk', 'taxi'], answer: 0, explain: '贡多拉。' },
    { q: 'Tuk-tuks are good for ______ trips.', type: 'fill', answer: 'short', accept: ['short'] },
    { q: 'Venice has water streets, so people don\'t drive ______.', options: ['True 正确', 'False 错误'], answer: 0, explain: '没有汽车。' }
  ]
};

function getEngExamples(topicId) {
  return ENG_TOPIC_EXAMPLES[topicId] || [];
}
