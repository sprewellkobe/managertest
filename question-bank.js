/**
 * 通用题库 - 每维度8-10题
 */
const QUESTION_BANK = [
    // ===== 战略思维 (10题) =====
    { dimension: 'strategy', text: '当公司面临一个全新的市场机会时，你通常会：', options: [
        { text: '等领导做决定，然后执行', score: 1 }, { text: '分析一下利弊，提出自己的看法', score: 2 },
        { text: '做详细的市场调研并制定初步方案', score: 3 }, { text: '从行业趋势出发，制定包含风险预案的完整战略', score: 4 },
        { text: '整合内外部资源，构建多情景战略框架并推动组织共识', score: 5 }
    ]},
    { dimension: 'strategy', text: '在做年度规划时，你更倾向于：', options: [
        { text: '参考去年的计划，做些微调', score: 1 }, { text: '根据领导指示设定目标', score: 2 },
        { text: '基于数据分析设定量化目标并拆解关键节点', score: 3 }, { text: '结合行业趋势和竞争态势制定差异化战略', score: 4 },
        { text: '从3-5年愿景倒推年度战略，建立动态调整机制', score: 5 }
    ]},
    { dimension: 'strategy', text: '面对行业剧变（如AI革命），你的第一反应是：', options: [
        { text: '感到焦虑，不知如何应对', score: 1 }, { text: '观望同行动态，跟随调整', score: 2 },
        { text: '研究变革影响，识别机会与威胁', score: 3 }, { text: '重新审视商业模式，制定转型路径', score: 4 },
        { text: '洞察变革本质，引领组织率先建立竞争壁垒', score: 5 }
    ]},
    { dimension: 'strategy', text: '你如何看待竞争对手的动态？', options: [
        { text: '很少关注竞争对手', score: 1 }, { text: '偶尔了解一下主要对手在做什么', score: 2 },
        { text: '定期跟踪竞争动态，知道对手的优劣势', score: 3 }, { text: '深度分析竞争格局，找到差异化定位', score: 4 },
        { text: '超越竞争思维，重新定义赛道规则和价值链', score: 5 }
    ]},
    { dimension: 'strategy', type: 'multi', text: '公司业务增长放缓，高层要求各部门提出应对方案。你认为以下哪些做法是有效的？（多选）', options: [
        { text: '加大营销投入，用促销刺激短期业绩', score: 0 },
        { text: '分析增长放缓的结构性原因（市场饱和/产品老化/竞争加剧）', score: 2 },
        { text: '砍掉所有非核心业务，集中资源保主业', score: -1 },
        { text: '研究客户需求变化，寻找新的价值增长点', score: 2 },
        { text: '把团队所有人工作时长增加50%来提升产出', score: -1 },
        { text: '跳出现有业务框架，探索相邻市场或新商业模式', score: 2 }
    ], maxScore: 5, minScore: 1 },
    { dimension: 'strategy', type: 'multi', text: '你在做战略规划时，通常会考虑以下哪些因素？（多选）', options: [
        { text: '领导的个人偏好和喜好', score: -1 },
        { text: '行业技术发展趋势和颠覆性变量', score: 1 },
        { text: '竞争对手的战略动向和差异化空间', score: 1 },
        { text: '去年的计划完成率', score: 0 },
        { text: '核心客户需求的演进方向', score: 1 },
        { text: '组织内部能力的差距和建设周期', score: 1 },
        { text: '短期内能拿到的快速成果', score: 0 },
        { text: '宏观经济和政策环境的变化', score: 1 }
    ], maxScore: 5, minScore: 1 },
    { dimension: 'strategy', text: '你对"长期主义"的理解和实践是：', options: [
        { text: '太遥远了，先顾好眼前', score: 1 }, { text: '认同但很难做到，总被短期指标牵着走', score: 2 },
        { text: '在关键决策中会考虑长期影响', score: 3 }, { text: '能在短期利益和长期价值之间做出平衡取舍', score: 4 },
        { text: '用长期愿景驱动当下行动，构建可持续竞争优势', score: 5 }
    ]},
    { dimension: 'strategy', text: '当所在业务面临增长瓶颈时，你会怎么思考？', options: [
        { text: '继续努力做好手头的工作', score: 1 }, { text: '想办法在现有模式下提效降本', score: 2 },
        { text: '分析瓶颈原因，寻找新的增长点', score: 3 }, { text: '重新定义目标客户和价值主张，推动业务模式升级', score: 4 },
        { text: '从产业链视角重构商业生态，开辟全新增长空间', score: 5 }
    ]},
    { dimension: 'strategy', text: '你做战略分析时的信息来源主要是：', options: [
        { text: '主要靠领导传达的信息', score: 1 }, { text: '看看行业新闻和报道', score: 2 },
        { text: '系统性地收集行业报告、数据和专家观点', score: 3 }, { text: '建立多渠道信息网络，包括客户、供应商、行业专家', score: 4 },
        { text: '构建战略情报体系，将碎片信息整合为趋势洞察', score: 5 }
    ]},
    { dimension: 'strategy', text: '你对"跨界思维"的应用程度如何？', options: [
        { text: '基本只关注本专业领域', score: 1 }, { text: '偶尔看看其他行业的案例', score: 2 },
        { text: '经常借鉴其他行业的成功经验来解决本领域问题', score: 3 }, { text: '主动建立跨行业认知地图，进行系统性迁移创新', score: 4 },
        { text: '能从不同领域的交叉点发现颠覆性机会，引领行业创新', score: 5 }
    ]},

    // ===== 领导力 (10题) =====
    { dimension: 'leadership', text: '团队中有成员公开质疑你的决定时，你会：', options: [
        { text: '感到不安，回避冲突', score: 1 }, { text: '用权力压制，要求服从', score: 2 },
        { text: '倾听意见，解释决策逻辑', score: 3 }, { text: '鼓励建设性讨论，如果对方有理就调整方案', score: 4 },
        { text: '建立开放决策文化，将质疑转化为团队共创的契机', score: 5 }
    ]},
    { dimension: 'leadership', text: '关于团队激励，你的做法是：', options: [
        { text: '主要靠公司的薪资和福利', score: 1 }, { text: '偶尔表扬表现好的人', score: 2 },
        { text: '根据不同人的特点给予差异化激励', score: 3 }, { text: '构建使命感驱动+成长通道+即时反馈的激励体系', score: 4 },
        { text: '打造自驱型文化，让每个人都在追求卓越中获得成就感', score: 5 }
    ]},
    { dimension: 'leadership', text: '你觉得自己在团队中扮演的角色更像是：', options: [
        { text: '执行者：完成分配给我的任务', score: 1 }, { text: '协调者：确保大家按计划推进', score: 2 },
        { text: '指导者：帮团队成员成长和解决问题', score: 3 }, { text: '引领者：设定方向并激发团队潜能', score: 4 },
        { text: '塑造者：定义组织文化和价值观，培养下一代领导者', score: 5 }
    ]},
    { dimension: 'leadership', text: '当你需要推动一项不受欢迎但必要的变革时：', options: [
        { text: '犹豫不决，尽量回避', score: 1 }, { text: '直接宣布执行，不做过多解释', score: 2 },
        { text: '先与核心骨干沟通，争取支持后再推行', score: 3 }, { text: '构建变革愿景，分阶段推进并持续沟通', score: 4 },
        { text: '将变革转化为组织共识，让团队成为变革的主导者', score: 5 }
    ]},
    { dimension: 'leadership', type: 'multi', text: '一位核心骨干提出离职，同时团队另外两人也表现出不稳定。以下哪些是你会采取的措施？（多选）', options: [
        { text: '立刻给骨干加薪挽留', score: 0 },
        { text: '与骨干深入沟通，了解离职的真实原因', score: 2 },
        { text: '私下和其他不稳定的成员谈话，了解共性问题', score: 1 },
        { text: '反思团队管理机制是否存在系统性问题', score: 2 },
        { text: '在团队公开会上批评"缺乏忠诚度"的风气', score: -2 },
        { text: '同步启动关键岗位的备选方案和人才储备', score: 1 }
    ], maxScore: 5, minScore: 1 },
    { dimension: 'leadership', type: 'multi', text: '你认为一个优秀的管理者应该具备以下哪些特质？（多选——注意，不是所有好听的都对）', options: [
        { text: '任何情况下都能和团队打成一片，没有距离感', score: 0 },
        { text: '敢于在必要时做出不受欢迎的决定', score: 2 },
        { text: '能根据不同下属的特点调整管理方式', score: 1 },
        { text: '永远保持正面乐观，从不在团队面前展现脆弱', score: -1 },
        { text: '善于倾听，但最终能独立做出判断', score: 2 },
        { text: '关注团队能力的系统性建设，而非只盯个人表现', score: 1 }
    ], maxScore: 5, minScore: 1 },
    { dimension: 'leadership', text: '你做决策时，团队参与的程度通常是：', options: [
        { text: '自己想好了直接通知', score: 1 }, { text: '通知后象征性地征求意见', score: 2 },
        { text: '重大决策前会认真听取团队意见', score: 3 }, { text: '建立民主决策机制，让团队充分参与并共同承担', score: 4 },
        { text: '根据决策类型灵活选择独裁/民主/共识等模式', score: 5 }
    ]},
    { dimension: 'leadership', text: '当下属犯了严重错误时，你的第一反应是：', options: [
        { text: '生气批评，追究责任', score: 1 }, { text: '帮他善后，但心里不满', score: 2 },
        { text: '先解决问题，再和他一起复盘原因', score: 3 }, { text: '把错误视为学习机会，帮他建立防错机制', score: 4 },
        { text: '反思管理机制是否有缺陷，从系统层面防止类似问题', score: 5 }
    ]},
    { dimension: 'leadership', text: '你如何看待"授权"这件事？', options: [
        { text: '不太放心，大部分事情亲力亲为', score: 1 }, { text: '简单的事授权，重要的事自己做', score: 2 },
        { text: '逐步培养信任，授权范围越来越大', score: 3 }, { text: '建立授权框架和监督机制，大胆授权并赋能', score: 4 },
        { text: '打造"无我管理"体系，团队能在没有你的情况下自主运转', score: 5 }
    ]},
    { dimension: 'leadership', text: '你如何处理团队中的"明星员工"和"普通员工"的关系？', options: [
        { text: '没特别区分，一视同仁', score: 1 }, { text: '重点关注明星员工，其他人自生自灭', score: 2 },
        { text: '给明星更多机会的同时，也关注其他人的发展', score: 3 }, { text: '构建梯队式发展体系，让每个人都有清晰的成长路径', score: 4 },
        { text: '营造"人人都能成为明星"的文化，激发全员潜能', score: 5 }
    ]},

    // ===== 决策能力 (10题) =====
    { dimension: 'decision', text: '面对信息不充分的紧急决策，你倾向于：', options: [
        { text: '等更多信息再说，无法承受决策失误', score: 1 }, { text: '请示上级，由上级定夺', score: 2 },
        { text: '基于现有信息做出判断，同时准备备选方案', score: 3 }, { text: '用概率思维评估风险收益，果断决策并快速迭代', score: 4 },
        { text: '在不确定中识别关键变量，做出反脆弱的决策架构', score: 5 }
    ]},
    { dimension: 'decision', text: '你做过的最大胆的职业/管理决定是什么级别？', options: [
        { text: '基本没做过超出日常的决定', score: 1 }, { text: '在本职范围内做过一些改进', score: 2 },
        { text: '主动推动过影响部门的重要改变', score: 3 }, { text: '做过涉及跨部门或业务方向的重大决策', score: 4 },
        { text: '做过影响组织战略或商业模式的变革性决策', score: 5 }
    ]},
    { dimension: 'decision', text: '当数据和直觉发生冲突时：', options: [
        { text: '完全依赖数据，不相信直觉', score: 2 }, { text: '忽略数据，跟着感觉走', score: 1 },
        { text: '以数据为基础，直觉作为参考', score: 3 }, { text: '深入探究冲突原因，往往能发现数据背后的盲区', score: 4 },
        { text: '融合理性分析与模式识别，形成超越数据的洞察力', score: 5 }
    ]},
    { dimension: 'decision', text: '你对"决策失误"的态度是：', options: [
        { text: '非常害怕犯错，尽量不做重要决定', score: 1 }, { text: '犯错后会自责很久', score: 2 },
        { text: '接受失误是常态，注重从中学习', score: 3 }, { text: '建立决策复盘机制，把失误转化为组织智慧', score: 4 },
        { text: '创造"安全试错"文化，让团队在可控风险中快速进化', score: 5 }
    ]},
    { dimension: 'decision', text: '面对两个都不完美的方案，你怎么选？', options: [
        { text: '很难抉择，一直纠结', score: 1 }, { text: '选看起来风险更小的那个', score: 2 },
        { text: '量化对比核心指标，选综合最优的', score: 3 }, { text: '评估两个方案能否整合优势，创造第三种可能', score: 4 },
        { text: '跳出当前框架，重新定义问题从而找到更优解', score: 5 }
    ]},
    { dimension: 'decision', type: 'multi', text: '你正在推进一个重要项目，中途出现了以下几种风险信号。你会重点关注哪些？（多选）', options: [
        { text: '客户反馈产品方向可能偏离需求', score: 2 },
        { text: '竞争对手也在做类似项目', score: 0 },
        { text: '团队核心开发者已经连续加班3周', score: 1 },
        { text: '项目预算已经使用了80%但进度只有50%', score: 2 },
        { text: '隔壁部门的领导对项目提出了一些批评意见', score: 0 },
        { text: '技术方案依赖的外部服务近期出现了不稳定', score: 1 }
    ], maxScore: 5, minScore: 1 },
    { dimension: 'decision', text: '当一个决策执行后效果不好时，你会：', options: [
        { text: '坚持到底，不想承认错误', score: 1 }, { text: '后悔当初的选择', score: 2 },
        { text: '及时调整方向，减少损失', score: 3 }, { text: '复盘决策过程，识别思维盲区并建立纠偏机制', score: 4 },
        { text: '将"止损"本身转化为新的战略机会', score: 5 }
    ]},
    { dimension: 'decision', text: '你如何看待"沉没成本"？', options: [
        { text: '已经投入这么多了，不能放弃', score: 1 }, { text: '虽然知道要放弃，但感情上很难割舍', score: 2 },
        { text: '理性评估未来收益，必要时果断止损', score: 3 }, { text: '建立定期评估机制，让止损决策制度化', score: 4 },
        { text: '在组织层面建立"战略撤退"文化，让资源向高价值方向流动', score: 5 }
    ]},
    { dimension: 'decision', text: '你做决策时考虑的时间维度通常是：', options: [
        { text: '主要看当下能不能解决眼前问题', score: 1 }, { text: '考虑到这个季度或半年的影响', score: 2 },
        { text: '评估1-2年内的影响和发展趋势', score: 3 }, { text: '用3-5年的视角审视决策的战略影响', score: 4 },
        { text: '同时考虑短中长期影响，确保决策在不同时间尺度上都有价值', score: 5 }
    ]},
    { dimension: 'decision', text: '面对利益相关方的反对意见，你如何推进决策？', options: [
        { text: '放弃或无限期搁置', score: 1 }, { text: '硬推，先做了再说', score: 2 },
        { text: '逐一沟通说服，化解反对意见', score: 3 }, { text: '找到各方共同利益点，设计共赢方案', score: 4 },
        { text: '通过制度设计和利益重构，让决策自然获得支持', score: 5 }
    ]},

    // ===== 沟通影响 (8题) =====
    { dimension: 'communication', text: '在跨部门协作中，当其他部门不配合时：', options: [
        { text: '向领导告状，让领导协调', score: 1 }, { text: '多催几次，实在不行就放弃', score: 2 },
        { text: '了解对方痛点，找到双赢方案来推动', score: 3 }, { text: '建立利益共同体机制，从制度层面消除协作障碍', score: 4 },
        { text: '构建跨组织信任网络，让协作变成各方的自发行为', score: 5 }
    ]},
    { dimension: 'communication', text: '你向高层汇报工作时的方式是：', options: [
        { text: '尽量少汇报，害怕被问问题', score: 1 }, { text: '把事情经过详细描述一遍', score: 2 },
        { text: '结论先行，数据支撑，突出成果和计划', score: 3 }, { text: '站在高层视角包装信息，链接战略价值', score: 4 },
        { text: '通过讲故事的方式影响高层认知，推动战略方向调整', score: 5 }
    ]},
    { dimension: 'communication', text: '你能影响到的范围大致是：', options: [
        { text: '身边几个同事', score: 1 }, { text: '本组/本团队的人', score: 2 },
        { text: '部门内的大多数人', score: 3 }, { text: '跨部门的关键决策者', score: 4 },
        { text: '能影响公司高层甚至行业内的人', score: 5 }
    ]},
    { dimension: 'communication', type: 'multi', text: '一个跨部门项目陷入僵局，各方立场对立。以下哪些做法能有效打破僵局？（多选）', options: [
        { text: '直接找对方领导施压解决', score: -1 },
        { text: '分别与各方私下沟通，了解其真实顾虑和底线', score: 2 },
        { text: '写一封长邮件详细说明自己部门的困难', score: 0 },
        { text: '组织一个有明确议程的工作坊，聚焦共同目标而非分歧', score: 2 },
        { text: '找到各方都在乎的"共同敌人"（如竞品/客户流失），重建协作动力', score: 2 },
        { text: '降低自己的要求，做出最大让步来换取推进', score: -1 }
    ], maxScore: 5, minScore: 1 },
    { dimension: 'communication', text: '你在会议中的表现通常是：', options: [
        { text: '尽量不发言，默默听', score: 1 }, { text: '被点名时才表态', score: 2 },
        { text: '主动发表有价值的见解，推动讨论', score: 3 }, { text: '引导会议走向，确保产出有效结论', score: 4 },
        { text: '用提问和框架设计来引发深度思考，让会议产出超预期', score: 5 }
    ]},
    { dimension: 'communication', text: '当你需要说服一个不同意你的人时：', options: [
        { text: '避免争论，随他去吧', score: 1 }, { text: '反复讲道理试图说服', score: 2 },
        { text: '先倾听对方立场，找到共识点再推进', score: 3 }, { text: '用数据和案例建立说服力，同时给对方台阶', score: 4 },
        { text: '理解对方底层诉求，重新构建叙事框架让对方自己转变', score: 5 }
    ]},
    { dimension: 'communication', text: '你在建立职业人脉方面的做法是：', options: [
        { text: '基本没有刻意经营人脉', score: 1 }, { text: '认识一些同行，但联系不多', score: 2 },
        { text: '有意识地维护核心人脉，定期交流', score: 3 }, { text: '构建跨层级、跨行业的高质量人脉网络', score: 4 },
        { text: '成为关键节点人物，能连接不同圈层的资源和信息', score: 5 }
    ]},
    { dimension: 'communication', text: '你处理团队内部冲突的方式是：', options: [
        { text: '视而不见，希望自行解决', score: 1 }, { text: '各打五十大板，要求和好', score: 2 },
        { text: '分别了解诉求，居中调解达成共识', score: 3 }, { text: '把冲突转化为建设性讨论，找到更优方案', score: 4 },
        { text: '建立冲突管理机制，让良性冲突成为团队创新的源泉', score: 5 }
    ]},

    // ===== 执行推动 (8题) =====
    { dimension: 'execution', text: '你管理项目的方式更接近：', options: [
        { text: '按领导安排做事，完成交办任务', score: 1 }, { text: '制定计划然后推进，遇到问题再调整', score: 2 },
        { text: '建立里程碑和关键节点，主动跟踪和预警', score: 3 }, { text: '构建目标-策略-执行-复盘的闭环管理体系', score: 4 },
        { text: '建立OKR/指标体系，让团队在自治中实现目标对齐', score: 5 }
    ]},
    { dimension: 'execution', text: '当项目严重延期时，你会：', options: [
        { text: '加班硬扛，死磕到底', score: 1 }, { text: '向上汇报寻求支持', score: 2 },
        { text: '重新评估范围，砍需求保核心交付', score: 3 }, { text: '根因分析+资源重组+预期管理三管齐下', score: 4 },
        { text: '建立预警机制防止再次发生，同时把危机变成团队进化契机', score: 5 }
    ]},
    { dimension: 'execution', text: '你同时管理多个任务时的状态：', options: [
        { text: '经常手忙脚乱，顾此失彼', score: 1 }, { text: '按时间顺序一个一个来', score: 2 },
        { text: '用优先级排序+时间块管理，效率不错', score: 3 }, { text: '搭建系统化的任务管理框架，大部分能委派出去', score: 4 },
        { text: '建立组织级的运营系统，自己只聚焦战略性事项', score: 5 }
    ]},
    { dimension: 'execution', text: '关于流程和制度建设，你的参与度是：', options: [
        { text: '遵守现有流程就好', score: 1 }, { text: '发现不合理的流程会提出意见', score: 2 },
        { text: '主动优化所在领域的关键流程', score: 3 }, { text: '从零搭建过团队或部门的管理体系', score: 4 },
        { text: '设计过跨组织的运营机制或变革过组织架构', score: 5 }
    ]},
    { dimension: 'execution', type: 'multi', text: '一个项目在上线前两周发现严重质量问题。以下哪些是你会采取的行动？（多选）', options: [
        { text: '全员加班赶工，不管怎样先上线', score: -1 },
        { text: '立即评估问题影响范围，区分致命问题和可接受问题', score: 2 },
        { text: '向上汇报风险，提出延期或分批上线的方案', score: 1 },
        { text: '追责：找出是谁引入了这个问题', score: -1 },
        { text: '与关键干系人沟通，重新对齐上线标准和预期', score: 1 },
        { text: '把质量问题作为案例，推动建立更完善的质量保障流程', score: 1 }
    ], maxScore: 5, minScore: 1 },
    { dimension: 'execution', text: '你推动跨部门项目落地的能力如何？', options: [
        { text: '很少参与跨部门项目', score: 1 }, { text: '参与过但主要是配合角色', score: 2 },
        { text: '能独立推动小型跨部门项目按时落地', score: 3 }, { text: '能驾驭复杂的跨部门大型项目，协调多方资源', score: 4 },
        { text: '能推动组织级变革项目，在资源和权限不足时依然高效推进', score: 5 }
    ]},
    { dimension: 'execution', text: '你如何对待"复盘"这件事？', options: [
        { text: '做完就做完了，很少回头看', score: 1 }, { text: '偶尔简单总结一下', score: 2 },
        { text: '项目结束后系统性复盘，提炼经验教训', score: 3 }, { text: '建立定期复盘机制，推动团队持续学习和迭代', score: 4 },
        { text: '让复盘成为组织学习的核心引擎，将经验沉淀为可复用的方法论', score: 5 }
    ]},
    { dimension: 'execution', text: '你面对突发状况时的反应是：', options: [
        { text: '慌张，不知道该先做什么', score: 1 }, { text: '按流程上报，等指示', score: 2 },
        { text: '快速判断优先级，组织资源应急处理', score: 3 }, { text: '同步启动应急响应和根因分析，确保短期止血+长期修复', score: 4 },
        { text: '建立完善的应急体系和预案，让团队在危机中展现组织韧性', score: 5 }
    ]},

    // ===== 自我进化 (10题) =====
    { dimension: 'growth', text: '你现在的学习习惯是：', options: [
        { text: '工作太忙，基本没时间学习', score: 1 }, { text: '偶尔看看行业文章', score: 2 },
        { text: '有固定的学习计划，持续输入新知识', score: 3 }, { text: '跨领域学习+实践验证，建立自己的知识体系', score: 4 },
        { text: '通过教授他人、输出思考来倒逼深度学习，形成思想领导力', score: 5 }
    ]},
    { dimension: 'growth', text: '你最近一次主动走出舒适区是什么时候？', options: [
        { text: '记不清了，或者从不主动', score: 1 }, { text: '半年前勉强尝试了一些新东西', score: 2 },
        { text: '每季度都会挑战一些不擅长的领域', score: 3 }, { text: '持续寻找stretch目标，刻意突破能力边界', score: 4 },
        { text: '把"反舒适"作为成长引擎，每个阶段都在重塑自我', score: 5 }
    ]},
    { dimension: 'growth', text: '面对负面反馈，你的真实反应是：', options: [
        { text: '心里不舒服，觉得对方有偏见', score: 1 }, { text: '表面接受，但很少真正改变', score: 2 },
        { text: '认真分析反馈，有选择地调整', score: 3 }, { text: '主动寻求反馈，建立360度反馈机制', score: 4 },
        { text: '将反馈视为成长礼物，同时帮助组织建立反馈文化', score: 5 }
    ]},
    { dimension: 'growth', text: '你对自己未来3年的职业规划：', options: [
        { text: '没太想过，走一步看一步', score: 1 }, { text: '有模糊的方向，但没具体计划', score: 2 },
        { text: '有清晰的目标和实现路径', score: 3 }, { text: '不仅规划了自己的路径，还在布局所需的资源和关系', score: 4 },
        { text: '在规划自身发展的同时，也在思考如何创造更大的行业影响力', score: 5 }
    ]},
    { dimension: 'growth', type: 'multi', text: '以下关于管理者成长的观点，你认同哪些？（多选——有些观点可能是"常见误区"）', options: [
        { text: '管理能力主要靠天赋，后天很难改变', score: -1 },
        { text: '管理最重要的是实战经验，系统学习用处不大', score: -1 },
        { text: '好的管理者需要持续更新认知框架，而非只积累经验', score: 2 },
        { text: '向比自己优秀的管理者学习是最高效的成长方式之一', score: 1 },
        { text: '管理者应该刻意练习自己不擅长的领域，而非只发挥长处', score: 1 },
        { text: '失败经历对管理成长的价值远大于成功经历', score: 1 },
        { text: '到了一定层级后，自我反思比外部学习更重要', score: 1 }
    ], maxScore: 5, minScore: 1 },
    { dimension: 'growth', text: '你对自己弱点的认知程度如何？', options: [
        { text: '没仔细想过自己有什么弱点', score: 1 }, { text: '知道一些，但觉得不影响大局', score: 2 },
        { text: '清楚自己的短板，并有针对性的改进计划', score: 3 }, { text: '定期做自我评估，将弱点转化为发展机会', score: 4 },
        { text: '建立"强项驱动+弱项补位"的个人发展系统，并影响团队也这样做', score: 5 }
    ]},
    { dimension: 'growth', text: '你如何看待"失败"这件事？', options: [
        { text: '尽量避免失败，失败让人难堪', score: 1 }, { text: '失败了会沮丧，但慢慢恢复', score: 2 },
        { text: '把失败当作学习机会，快速调整方向', score: 3 }, { text: '建立"快速失败、快速学习"的工作方式', score: 4 },
        { text: '将组织的失败经验系统化为集体智慧，提升整体抗风险能力', score: 5 }
    ]},
    { dimension: 'growth', text: '你在行业内的影响力如何？', options: [
        { text: '在行业里没什么存在感', score: 1 }, { text: '在公司内部有一定知名度', score: 2 },
        { text: '在行业小圈子里有一些影响力', score: 3 }, { text: '经常被邀请做分享或担任行业评委', score: 4 },
        { text: '是行业思想领袖，能影响行业趋势和标准', score: 5 }
    ]},
    { dimension: 'growth', text: '你的精力管理做得如何？', options: [
        { text: '经常疲惫，感觉被掏空', score: 1 }, { text: '忙的时候牺牲健康和生活', score: 2 },
        { text: '有意识地平衡工作和生活，保持精力充沛', score: 3 }, { text: '建立科学的精力管理系统，持续保持高效能状态', score: 4 },
        { text: '帮助团队也建立健康的工作节奏，实现可持续的高绩效', score: 5 }
    ]},
    { dimension: 'growth', text: '你对"终身学习"的实践程度是：', options: [
        { text: '学校毕业后就基本没怎么学了', score: 1 }, { text: '工作需要时才去学', score: 2 },
        { text: '每年有学习预算和计划，持续投入', score: 3 }, { text: '构建个人知识管理系统，跨领域系统性学习', score: 4 },
        { text: '成为学习型组织的倡导者，推动团队和组织的知识进化', score: 5 }
    ]}
];
