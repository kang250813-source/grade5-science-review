#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');

function loadUnits(file, varName) {
  const code = fs.readFileSync(path.join(root, 'js', file), 'utf8');
  const fn = new Function(code + `; return ${varName};`);
  return fn();
}

function makeExpansion(unitsVar, extraPoints, newTopicsByUnit, newUnits, outFile) {
  const lines = [
    '/* 知识点扩充 — 加载于 *-data.js 之后 */',
    '(function () {',
    "  'use strict';",
    '',
    '  const EXTRA = ' + JSON.stringify(extraPoints, null, 2) + ';',
    '',
    `  ${unitsVar}.forEach(u => {`,
    '    u.topics.forEach(t => {',
    '      if (EXTRA[t.id]) t.points.push(...EXTRA[t.id]);',
    '    });',
    '  });',
    ''
  ];

  if (newTopicsByUnit && Object.keys(newTopicsByUnit).length) {
    lines.push('  const NEW_TOPICS = ' + JSON.stringify(newTopicsByUnit, null, 2) + ';');
    lines.push(`  ${unitsVar}.forEach(u => {`);
    lines.push('    if (NEW_TOPICS[u.id]) u.topics.push(...NEW_TOPICS[u.id]);');
    lines.push('  });');
    lines.push('');
  }

  if (newUnits && newUnits.length) {
    lines.push(`  ${unitsVar}.push(...` + JSON.stringify(newUnits, null, 2) + ');');
    lines.push('');
  }

  lines.push('})();');
  fs.writeFileSync(path.join(root, 'js', outFile), lines.join('\n'));
}

// ── 语文 ──
const CHN_EXTRA = {
  c1t1: ['卷面分占 5–10 分：字迹清楚、不写连笔潦草', '多音字在词语中定音：勉强 qiǎng、强词夺理 qiǎng', '“眷恋”的“眷”上部是“龹”，不要写成“卷”', '苏州卷常把“看拼音写词语”与“选字填空”合并考', '写完一组词后回头检查：偏旁、笔画、空格是否漏填'],
  c1t2: ['“爱憎分明”读 zēng，不要读 zèng', '“监”在“监考”读 jiān，在“太监”读 jiàn', '“撩”读 liáo（撩乱），不要读 liāo', '形声字误读：以声旁猜音易错，以课内注释为准', '选择题：先排除明显错误，再在近音字中比较'],
  c1t3: ['“衔接”的“衔”中间是“钅”，不是“匀”', '“发怔”的“怔”是竖心旁，不是“定”', '“摩拳擦掌”四字都要写对，常漏“擦”', '“已/己/巳”口诀：已半开，己全开，巳全封', '改错题型：在错字下画圈，改正后写在旁边'],
  c1t4: ['“一针见血”形容说话直切要害，不能形容做事快', '“肃然起敬”表示因尊敬而严肃，不能用于搞笑场合', '“养尊处优”含贬义，形容脱离劳动、贪图享受', '选词填空：先读全句，再看搭配对象和感情色彩', '近义词辨析：程度、范围、搭配不同（如“美丽/漂亮/好看”）'],
  c2t1: ['“通过……使/让/由……造成”是典型的成分残缺', '“提高……水平”不能搭配“提高……态度”', '“能否……是……的关键”前后要对应（一否一肯）', '“原因是……造成的”语义重复，删其一', '找语病：缩句后看主干是否完整、搭配是否恰当'],
  c2t2: ['引号内句号在引号里；引号外句号在引号外', '书名、篇名用《》，报刊名也用《》', '破折号表解释说明或声音延长', '省略号占两格，不能写成三个点', '顿号、逗号：并列词语用顿号，并列分句用逗号'],
  c2t3: ['反问：答案在问句里，语气强烈；设问：自问自答', '拟人：赋予人的动作、情感；拟物：把人当作物写', '对偶：字数相等、结构相同、意义相关', '反复：强调；反复与排比区别看是否同一词语重复', '答题格式：运用了……修辞，生动形象地写出了……'],
  c2t4: ['“不但……而且……”递进；“即使……也……”假设让步', '“因为……所以……”不能连用多个“因为”造成杂糅', '陈述改反问：加“难道/怎么”，删“不”，末用问号', '缩句：删修饰语，保留“谁做什么/怎么样”', '转述句：改人称、改标点，意思不变'],
  c3t1: ['《西游记》作者吴承恩；大闹天宫、三打白骨精也是西游情节', '《三国演义》作者罗贯中；赤壁之战、空城计', '《水浒传》作者施耐庵；景阳冈打虎是武松', '《红楼梦》作者曹雪芹；金陵十二钗', '人物外貌描写题：抓关键词（羽扇、金箍棒、丹凤眼）'],
  c3t2: ['《手指》中心：五指各有长短，团结才有力量', '《跳水》用动作描写表现紧张，结尾“转危为安”', '《猴王出世》石猴称王，体现勇敢、有主见', '《金字塔》两则：抒情与说明结合，体会不同表达目的', '《杨氏之子》对答巧妙，体现儿童机智'],
  c3t3: ['甲骨文：刻在龟甲兽骨上，是最早成熟文字', '金文：铸在青铜器上，笔画较粗', '楷书：横平竖直，现行通用字体', '行书：介于楷草之间，日常书写', '选择题：看笔画特点辨字体，小篆对称、隶书扁方'],
  c3t4: ['“及笄”指女子十五岁；与“豆蔻”不要混淆', '“不惑”四十；“知天命”五十；“花甲”六十', '《论语》记录孔子及弟子言行；《左传》是史书', '文化常识题常出现在非连续性文本材料里', '年龄称谓题：先判断性别，再选对应称谓'],
  c4t1: ['《四时田园杂兴》范成大，写乡村儿童学种瓜', '《村晚》雷震，牧童、短笛，意境闲适', '《从军行》王昌龄，边塞诗，表现报国壮志', '《闻官军收河南河北》杜甫，狂喜还乡', '默写前先背全诗，再记易错字：桑阴、金甲、玉门关'],
  c4t2: ['“君子坦荡荡”与“小人长戚戚”对比', '“多行不义必自毙”强调作恶必遭报应', '“三万里河东入海”陆游，气势磅礴', '名言出处要对应：论语、左传、唐诗宋词', '理解性默写：根据主题、情感、作者选句'],
  c4t3: ['边塞诗：苍凉、悲壮、爱国；田园诗：宁静、忙碌', '炼字题：解释字义+表达效果+联系情感', '“穿”字：表现战争频繁、金甲磨穿', '“信口吹”：表现牧童天真自由', '选诗句填情境：先抓关键词再匹配'],
  c4t4: ['易错字：桑阴（不是“荫”）、穿金甲、玉门关', '整句默写不要漏字、多字、倒字', '标点用中文全角；诗题一般不要求默写', '考前按单元过一遍“日积月累”', '写完后通读，检查同音别字'],
  c5t1: ['“诣”：拜访（如“诣门拜访”）', '“未闻孔雀是夫子家禽”中“闻”：听说', '“禽”：鸟的总称，这里指鸟', '实词解释：先课下注释，再组词，最后看语境', '一词多义：比较文中义与常见义'],
  c5t2: ['翻译原则：信、达、雅；小学以“信、达”为主', '补充省略：谁做了什么，缺主语要补', '“未若柳絮因风起”：不如比作柳絮随风飘', '“此必苦李”：这一定是苦的李子', '关键字错译整句零分，要抓实词虚词'],
  c5t3: ['《自相矛盾》：讽刺言行前后抵触', '《杨氏之子》：以“杨梅”对“孔君平”，机智应对', '《咏雪》：谢道韫才思优于谢朗', '内容理解题：选项常偷换概念，回原文核对', '“公大笑乐”的原因要联系上下文'],
  c6t1: ['词语理解：本义+语境义（如“体面”在文中指什么）', '句子理解：表层意思+深层含义', '指代题：“这/那/它”回前文找指代对象', '赏析词句：手法+内容+情感，三点齐全', '不要脱离文本主观发挥'],
  c6t2: ['开头：总起全文、设置悬念、交代背景', '结尾：点明中心、照应标题、升华主题', '插叙：补充背景，丰富内容', '顺叙：按时间；倒叙：先结果后原因', '分点作答：①……②……条理清楚'],
  c6t3: ['人物性格：从语言、动作、神态、心理四方面找', '“笑”的作用：表现人物/推动情节/渲染气氛', '环境描写：烘托心情、暗示命运、推动情节', '情感题：抓抒情句、议论句', '评价人物要有文本依据，忌空泛'],
  c6t4: ['说明顺序：时间、空间、逻辑（由主到次）', '打比方：生动形象；作比较：突出特征', '分类别：条理清楚；举例子：具体可信', '“约、左右、几乎”体现语言准确性', '说明文也可能考“某词能否删去”'],
  c7t1: ['读图表：看标题、横纵轴、图例、单位', '比较数据：最大、最小、增减趋势', '结论要有数据支撑，如“占 35%”', '发现问题：至少写两点，分条表述', '建议要针对问题，切实可行'],
  c7t2: ['多则材料：每则材料对应一问', '信息筛选：圈画关键词、数字、专有名词', '比较异同：相同点合并，不同点分条', '答案尽量用材料原词，少改写', '年龄称谓、汉字演变常作知识卡片出现'],
  c7t3: ['宣传语：简洁、押韵、有感染力、扣主题', '建议书：标题+称呼+正文+署名日期', '通知：时间、地点、事项、要求四要素', '口语交际：礼貌用语、表达清楚', '综合性学习：发现问题→分析原因→提建议'],
  c8t1: ['写人：选 1–2 个典型事例，不要流水账', '细节描写：一个动作、一句对话胜过空泛评价', '开头：开门见山或设置悬念', '结尾：点题“这就是我……的……”', '五下常考：我敬佩的____、熟悉的人'],
  c8t2: ['写事：六要素齐全，详写高潮部分', '读后感：引（摘原文）→议（谈感受）→联（联系生活）→结', '题目要新颖，点明中心', '段落之间过渡自然', '字数 400–500 字左右，不要头重脚轻'],
  c8t3: ['列提纲：开头—事例一—事例二—结尾', '开头忌“有一天”“在我的生活中”套话', '适当用比喻、排比，但不要堆砌', '卷面整洁：涂改少、字大小均匀', '写完留 3 分钟检查错别字'],
  c8t4: ['《手指》“无爱憎”≠没有感情，指不偏爱某一指', '“却看”在古诗中≠转折“但是”', '“一针见血”≠做事麻利', '三借芭蕉扇≠草船借箭，分清单元', '期末前把易错汇总再过一遍']
};

const CHN_NEW_TOPICS = {
  cu5: [{
    id: 'c5t4',
    title: '文言文答题技巧',
    points: [
      '选择题：先排除与课文明显不符的选项',
      '翻译题：字字落实，尤其虚词“之、其、以、为”',
      '内容理解：回原文找依据，忌想当然',
      '人物评价：结合具体言行，不空喊“聪明”',
      '文言断句：看主谓宾，找对话标志“曰/云”'
    ]
  }],
  cu7: [{
    id: 'c7t4',
    title: '图文转化与信息提取',
    points: [
      '流程图：按箭头顺序概括步骤',
      '表格题：横看纵看，找对比关系',
      '漫画题：抓标题、人物动作、寓意',
      '把图表信息改写成文字要客观准确',
      '综合性题常考“从材料中你能发现什么问题”'
    ]
  }]
};

// ── 数学 ──
const MATH_EXTRA = {
  m1t1: ['100 以内质数要熟记：2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97', '91=7×13 是合数，不是质数', '质数只有 1 和本身两个因数，1 只有一个因数', '判断题：所有偶数都是合数 → 错，2 是质数', '两个质数的积一定是合数（除非其中一个是 1，但 1 不是质数）'],
  m1t2: ['互质两数 GCD=1，LCM=两数之积', '三个数 GCD/LCM：先两两求，再与第三个求', '“每隔 3 天”实际是每 4 天一次，审题要仔细', '相遇问题：同时出发 → 求 LCM；同时到达 → 比较时间', '短除法书写规范：除到商互质为止'],
  m1t3: ['分解质因数结果只能有质数相乘', '24=2³×3，写指数形式更简洁', '因数个数公式：指数加 1 相乘（进阶了解）', '一个数最大因数=最小倍数=本身', '找因数：成对找（1 和 n，2 和 n/2…）'],
  m1t4: ['2 的倍数末位 0,2,4,6,8；5 的倍数末位 0 或 5', '3 的倍数：各位数字之和能被 3 整除', '同时是 2 和 5 的倍数 → 末位是 0', '同时是 2 和 3 的倍数 → 6 的倍数', '奇数+奇数=偶数；奇数+偶数=奇数'],
  m2t1: ['带分数 = 整数 + 真分数，如 2又3/5', '假分数化带分数：分子÷分母', '0 也是自然数时，0/5=0 是合法分数', '分数与除法：a÷b = a/b（b≠0）', '单位“1”可以是一个物体、一个量、一群物体'],
  m2t2: ['约分要约到最简，分子分母互质', '通分找最小公分母（LCM）', '比较大小：化小数、通分、交叉相乘', '分数基本性质是约分通分的依据', '分子分母同时除以 2 等价于除以 4 的一半，要同除'],
  m2t3: ['0.125=1/8；0.375=3/8；0.625=5/8；0.875=7/8 常用要记', '1/3、1/6、1/7、1/9 等不能化有限小数', '循环小数五年级一般不要求精确计算', '写分数结果必须最简（除非题目要求）', '0.3²=0.09，不是 0.6'],
  m2t4: ['进率：km 1000m，t 1000kg，时 60 分，分 60 秒', 'm² 与 dm² 进率 100，不是 10', '写分数结果：先算再约分', '带单位填空：注意单位是否统一', '“占总数的几分之几”分母是总份数'],
  m3t1: ['结果如果是假分数，化成带分数或整数', '1 可以化成任意分母的同分母分数', '连减分数：从左到右或利用减法性质', '验算：用逆运算检查', '应用题答句要带单位'],
  m3t2: ['同分母分数先结合：1/6+5/6=1', '交换律：a/b+c/d = c/d+a/b', '结合律：(a/b+c/d)+e/f 先算前两项', '连续减半：每次剩一半，用乘法理解', '简算题不写简算过程可能扣分'],
  m3t3: ['“占几分之几”= 部分 ÷ 整体', '“比……多/少几分之几”= 差 ÷ 单位“1”', '剩余问题：总量 1 - 已用 = 剩余', '第二段比第一段多 → 第二 = 第一 + 多出的', '读清单位“1”是谁，是易错关键'],
  m3t4: ['数轴上 0 左边是负数（五下拓展），正分数在 0 右', '涂色部分：数格子要统一每格大小', '“剪去 1/4”指剩 3/4；“剪去 1/4 米”是长度', '等腰三角形：两边相等，第三边=周长-另两边', '分数与图形：先数总份数再数涂色份数'],
  m4t1: ['圆心 O，半径 r，直径 d，d=2r', '圆是轴对称图形，有无数条对称轴', '在同圆中所有半径相等、所有直径相等', '周长公式 C=πd=2πr，π 取 3.14', '滚动圆测周长：滚动一圈 = 一个周长'],
  m4t2: ['面积公式 S=πr²，先算 r² 再乘 π', 'r 扩大 n 倍，周长扩大 n 倍，面积扩大 n² 倍', '圆剪拼成长方形：面积不变，周长增加 2r', '半圆面积 = πr²÷2，半圆周 = πr+2r', '“转化”思想：把未知图形化成熟悉图形'],
  m4t3: ['正方形内最大圆：直径 = 边长', '圆内最大正方形：对角线 = 直径', '剩余面积 = 正方形 - 圆（方中圆）', '圆环面积 = π(R²-r²) = π(R+r)(R-r)', '先画示意图再列式，避免看错半径直径'],
  m4t4: ['半圆路径：n 个半圆可能合成 n 个整圆周长', '羊吃草：绳长 = 半径，面积 = πr²', '时针分针：分针长是时针的倍数，扫过面积不同', '花坛围栅栏求周长；铺草坪求面积', '实际应用题注意单位换算（m 与 cm）'],
  m5t1: ['等式性质：两边同加同减同乘同除（除数≠0）', '方程一定是等式，等式不一定是方程', '5a+48 不是方程（无等号）', '含 x 的式子不一定是方程', '列方程前写等量关系式'],
  m5t2: ['移项要变号：+变-，-变+', 'ax+bx=(a+b)x 先合并同类项', 'x÷a=b → x=ab；ax=b → x=b/a', '验算：把解代入原方程看左右是否相等', '解方程写“解：”和每步等号对齐'],
  m5t3: ['和倍：和 ÷ (倍数+1) = 较小数', '差倍：差 ÷ (倍数-1) = 较小数', '相遇：路程和 = 速度和 × 时间', '工程：工效 × 时间 = 工作量', '设 x 要清晰：x 代表什么量'],
  m5t4: ['2a 表示 a 的 2 倍；a+2 表示比 a 大 2', 'a² 表示 a×a，不是 2a', '代入求值：先化简再代入', '字母可以表示任意数，也可以表示特定量', '用字母表示规律：找数量关系'],
  m6t1: ['折线图：看升降趋势、转折点、交点', '单式折线：一组数据；复式：两组对比', '描点要准，连线要顺时间顺序', '预测趋势：延长折线（开放性题）', '体温、股价、销量变化适合折线图'],
  m6t2: ['条形图：比数量多少，条越高数量越大', '复式条形：并列柱对比两组', '纵轴单位长度要看清（一格代表多少）', '横轴是类别，纵轴是数量', '选图题：比多少→条形；看变化→折线'],
  m6t3: ['平均数代表一般水平，受极端值影响', '求平均：总和 ÷ 个数', '平均数不一定等于其中某一个数据', '复式折线两线距离：差距大→差值大', '结合生活解释：如夏天衬衫销量上升'],
  m7t1: ['路程-时间图：水平段 = 停留', '斜率越大速度越快', '平均速度 ≠ 各段速度的平均（除非等时）', '同一时刻纵坐标高者领先', '读图题逐项判断，不要凭感觉'],
  m7t2: ['植树问题：两端都种 → 棵数 = 段数 + 1', '改间隔不动位置 → 找原间隔与新间隔的 LCM', '拼正方形：边长取长方形长宽的 LCM', '周期问题：同时发生 → LCM', '审题“每隔”与“每”差一天'],
  m7t3: ['n 人互相握手：n(n-1)/2 次', '单淘汰 n 队：n-1 场', '倒推法：从结果往回推（毛毛虫题）', '列表法：枚举找规律', '逻辑题：画表格或示意图'],
  m7t4: ['和差问题：和+差=2×大数', '小数点移动：右移一位扩大 10 倍', '年龄问题：年龄差不变', '列方程比算术有时更不易错', '答案要带单位，写答句'],
  m8t1: ['π 是常数，与圆大小无关', '面积单位是平方，不能与长度直接比', '方程必须含未知数且是等式', '0 不能做除数', '三个质数相加：2+奇+奇=偶（若含 2）'],
  m8t2: ['选择题用代入法或排除法', '判断题找反例：举一个反例即错', '“一定/可能/不可能”与概率相关', '分解质因数与乘积形式区分', '统计图选择看题目要求'],
  m8t3: ['作图用铅笔，保留作图痕迹', '圆规画圆：针尖定圆心，半径定大小', '数轴标分数：先分等份再标点', '统计图补全：标图例、单位、标题', '操作题按步骤给分，步骤不能跳']
};

const MATH_NEW_TOPICS = {
  mu6: [{
    id: 'm6t4',
    title: '扇形统计图',
    points: [
      '扇形统计图表示部分与整体的关系',
      '整个圆代表单位“1”或总量 100%',
      '圆心角 360° 对应 100%，求百分比先算比例',
      '与条形、折线对比：扇形看占比，条形比多少，折线看变化',
      '已知总量和百分比可求部分：总量 × 百分比'
    ]
  }],
  mu8: [{
    id: 'm8t4',
    title: '期末综合复习策略',
    points: [
      '按单元梳理：因数倍数、分数、圆、方程、统计、应用',
      '计算题：先估算看是否合理，再精确计算',
      '应用题：画线段图或示意图',
      '易错题：判断题、单位换算、剪去 1/4 与 1/4 米',
      '考前过一遍 12 份苏州卷典型题型'
    ]
  }]
};

// ── 英语 ──
const ENG_EXTRA = {
  e1t1: ['some bread / some water — some 可修饰不可数', 'many books / much time — many/much 区别', 'a glass of water / two glasses of water — 量词+of', 'people 本身是复数，不说 peoples（表民族除外）', 'chicken 作“鸡肉”不可数；作“小鸡”可数'],
  e1t2: ['much too + 形容词：much too hot 太热', 'too many people / too much noise', 'enough + 名词；形容词 + enough', 'a lot of = lots of 可数不可数均可', 'so much cola 强调数量多'],
  e1t3: ['show us around — us 宾格', 'between you and me — 介词后用 me', 'I like her. She likes me. — 主格宾格对应', '名词性物主代词：mine, yours, his, hers', '形容词性物主代词 + 名词：my book'],
  e2t1: ['always, usually, often, sometimes, never 频率副词', '第三人称单数：go→goes, watch→watches, study→studies', '否定：doesn\'t + 动词原形', '疑问：Does he...? Yes, he does.', 'The sun rises in the east. — 客观真理用一般现在时'],
  e2t2: ['Look!/Listen!/Now/It\'s 7 o\'clock. — 进行时标志', 'run→running, swim→swimming（双写）', 'write→writing（去 e）', 'lie→lying, die→dying', 'What are you doing? — 现在进行时的特殊疑问句'],
  e2t3: ['He usually walks but he is walking now.', 'always + 一般现在时；now + 进行时', '有些动词很少进行时：know, like, want', 'see films 一般现在时表习惯', 'Look! The students are having a Music lesson.'],
  e3t1: ['on Monday / on weekends — 星期用 on', 'in the morning / in the afternoon', 'at night / at the weekend（英式）', 'from...to... 从……到……', 'before dinner / after school — 不用介词 at'],
  e3t2: ['next to / beside — 在……旁边', 'in front of / behind — 前后', 'How do I get to...? — 问路', 'Walk along... Turn left/right at...', 'on Wall Street / on the street — 街道用 on'],
  e3t3: ['take the metro / by metro — 两种表达', 'take a taxi / by taxi', 'on foot = walk', 'by ship / by plane / by train', 'How do you come to school? — By bus.'],
  e4t1: ['Why...? Because... 成对出现', 'Why not...? = Why don\'t you...? 建议', 'What\'s wrong? / What\'s the matter?', 'Because 不能单独回答 Why not', '时态一致：Why were you late? — Because I missed the bus.'],
  e4t2: ['Spring Festival — 春节；Dragon Boat Festival — 端午', 'Mid-Autumn Festival — 中秋；Double Ninth Festival — 重阳', 'the + 序数词：the first, the second, the eighth', 'in + 月份；on + 具体日期', 'When\'s your birthday? — It\'s on the eighth of April.'],
  e4t3: ['What do you usually do at the Lantern Festival?', 'We eat yuanxiao and guess riddles.', 'I can\'t wait. — 迫不及待', 'My favourite festival is...', 'We have a big dinner with my family.'],
  e5t1: ['wash clothes / sweep the floor / clean the room', 'help our parents / help with housework', 'cook dinner / water the flowers', 'at weekends / on Sundays — 频率', 'What do you do at home? — I make the bed.'],
  e5t2: ['see the doctor — 看医生', 'should / shouldn\'t 给建议：You should rest.', 'have a cold / have a cough', 'What\'s wrong with you? — I have a fever.', 'Don\'t eat too many sweets. — 健康建议'],
  e5t3: ['foot → feet；tooth → teeth；child → children', 'drive → driver；teach → teacher', 'try → tried / trying', 'eighth, ninth, twelfth — 序数词特殊拼写', 'The Browns = the Brown family — 复数表一家'],
  e6t1: ['spend too much time on screens — 屏幕时间', 'play outside — 户外活动', '20/20/20 rule — 护眼规则', 'genetics — 遗传也可能导致近视', 'enough sleep — 充足睡眠很重要'],
  e6t2: ['green tea / black tea / oolong tea', 'Gong fu tea — 功夫茶（广东福建）', 'flowering tea — 花茶（北京）', 'buttered tea — 酥油茶（拉萨）', 'Don\'t fill the cup too full — 倒茶礼仪'],
  e6t3: ['First,... Second,... Finally,... — 写作连接词', 'My father goes to work by metro every day.', 'We should... / We shouldn\'t... — 建议句', '不少于 5 句：Who, Where, What, How', '注意第三人称单数动词加 -s']
};

const ENG_NEW_UNITS = [
  {
    id: 'eu7',
    title: '第七单元 · 问路、购物与情态',
    emoji: '🛒',
    topics: [
      {
        id: 'e7t1',
        title: '问路用语（Unit 3）',
        points: [
          'How do I get to the cinema?',
          'Go along this street. Turn left at the traffic lights.',
          'It\'s on your left / right.',
          'Is there a ... near here?',
          'Walk straight on. You can\'t miss it.'
        ]
      },
      {
        id: 'e7t2',
        title: '看医生与 should（Unit 4）',
        points: [
          'What\'s wrong with you? / What\'s the matter?',
          'I have a fever / toothache / headache.',
          'You should drink warm water.',
          'You shouldn\'t eat too many sweets.',
          'See the doctor — 看医生'
        ]
      },
      {
        id: 'e7t3',
        title: '家务劳动（Unit 5）',
        points: [
          'Helping our parents — 帮父母做家务',
          'be busy with housework / be busy doing housework',
          'sweep the floor, wash clothes, clean the room',
          'What are you doing? — I\'m cooking dinner.',
          'We should help our parents at home.'
        ]
      },
      {
        id: 'e7t4',
        title: '厨房与现在进行时（Unit 6）',
        points: [
          'In the kitchen — 在厨房',
          'Are you cooking? — Yes, I am.',
          'There is some soup in the pot.',
          'smell nice / taste good — 感官动词 + 形容词',
          'Don\'t touch! It\'s hot.'
        ]
      }
    ]
  },
  {
    id: 'eu8',
    title: '第八单元 · 节日、生日与语法综合',
    emoji: '🎂',
    topics: [
      {
        id: 'e8t1',
        title: 'have to / has to / must',
        points: [
          'I have to go home. / She has to go home.',
          'has to 用于第三人称单数',
          'must 语气比 have to 更强：必须',
          'don\'t have to = needn\'t — 不必',
          'Cinderella has to go home before twelve.'
        ]
      },
      {
        id: 'e8t2',
        title: 'try on 与 give 双宾语',
        points: [
          'try on the skirt → try it on（代词放中间）',
          'try on them ✗ → try them on ✓',
          'give him the book = give the book to him',
          'give him it ✗ → give it to him ✓',
          'show me your photos = show your photos to me'
        ]
      },
      {
        id: 'e8t3',
        title: 'look for / find 与 start',
        points: [
          'look for 强调寻找的过程',
          'find 强调找到的结果',
          'I\'m looking for my key. I can\'t find it.',
          'start doing — 已经开始做',
          'start to do — 即将开始做'
        ]
      },
      {
        id: 'e8t4',
        title: '文化阅读与故事',
        points: [
          'Chongqing Metro Line 4 — farmers sell vegetables',
          'Transport: London buses, NY taxis, Venice gondolas',
          'The talkative turtle — 话多的乌龟（张嘴掉下来）',
          'The coconut trader — haste makes waste 欲速则不达',
          '阅读题：先通读，再带问题回文找答案'
        ]
      }
    ]
  }
];

makeExpansion('CHN_UNITS', CHN_EXTRA, CHN_NEW_TOPICS, null, 'chinese-points-expansion.js');
makeExpansion('MATH_UNITS', MATH_EXTRA, MATH_NEW_TOPICS, null, 'math-points-expansion.js');
makeExpansion('ENG_UNITS', ENG_EXTRA, null, ENG_NEW_UNITS, 'english-points-expansion.js');

// stats
['chinese','math','english'].forEach(s => {
  const file = s + '-data.js';
  const varName = s === 'chinese' ? 'CHN_UNITS' : s === 'math' ? 'MATH_UNITS' : 'ENG_UNITS';
  const exp = s + '-points-expansion.js';
  let code = fs.readFileSync(path.join(root, 'js', file), 'utf8');
  code += fs.readFileSync(path.join(root, 'js', exp), 'utf8');
  const fn = new Function(code.replace(/^const /gm, 'var ') + `; return ${varName};`);
  const U = fn();
  let topics = 0, points = 0;
  U.forEach(u => u.topics.forEach(t => { topics++; points += t.points.length; }));
  console.log(`${s}: ${U.length} units, ${topics} topics, ${points} points (avg ${(points/topics).toFixed(1)})`);
});
