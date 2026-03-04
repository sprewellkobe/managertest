/**
 * 行业专属题库 - 每行业每维度2道专属题
 * "other"行业使用通用管理题作为"行业题"
 */
const INDUSTRY_QUESTIONS = {
    tech: [
        { dimension: 'strategy', text: '面对技术路线之争（如自研vs开源），你的决策方式是：', options: [
            { text: '听技术负责人的决定', score: 1 }, { text: '选更流行的技术方案', score: 2 },
            { text: '从业务需求出发，评估技术方案的适配性', score: 3 }, { text: '综合技术趋势、团队能力和业务演进制定技术战略', score: 4 },
            { text: '构建技术愿景，让技术选型成为业务竞争力的核心支撑', score: 5 }
        ]},
        { dimension: 'strategy', text: '你如何看待AI对你所在业务的影响？', options: [
            { text: '和我关系不大，先观望', score: 1 }, { text: '在尝试用AI工具提升效率', score: 2 },
            { text: '正在评估AI如何改造现有业务流程', score: 3 }, { text: '制定了AI融合路线图，推动团队全面拥抱AI', score: 4 },
            { text: '用AI重新定义产品和商业模式，建立AI原生竞争壁垒', score: 5 }
        ]},
        { dimension: 'leadership', text: '在技术团队中，你如何平衡"技术追求"和"业务交付"？', options: [
            { text: '只管完成需求，没时间考虑技术优化', score: 1 }, { text: '偶尔做些技术优化，但业务优先', score: 2 },
            { text: '在迭代中留出20%时间做技术改进', score: 3 }, { text: '建立技术债务管理机制，让技术投入和业务产出良性循环', score: 4 },
            { text: '让技术卓越成为团队文化，在交付中自然实现技术进化', score: 5 }
        ]},
        { dimension: 'decision', text: '当需要在"快速上线"和"代码质量"之间做取舍时：', options: [
            { text: '领导说什么就什么', score: 1 }, { text: '总是先上线再说', score: 2 },
            { text: '评估影响范围，对核心模块保质量，非核心快速上', score: 3 }, { text: '建立分级发布策略和质量门禁机制', score: 4 },
            { text: '构建CI/CD体系让速度和质量不再冲突', score: 5 }
        ]},
        { dimension: 'communication', text: '你如何向非技术高管解释技术方案？', options: [
            { text: '用技术术语讲，听不懂是他们的问题', score: 1 }, { text: '尽量简化但经常说不清楚', score: 2 },
            { text: '用业务语言和类比解释技术价值', score: 3 }, { text: '将技术方案转化为商业ROI分析', score: 4 },
            { text: '建立技术与业务的共同语言体系，推动组织技术认知升级', score: 5 }
        ]},
        { dimension: 'execution', text: '你对敏捷开发/迭代管理的实践程度是：', options: [
            { text: '不太了解敏捷是什么', score: 1 }, { text: '名义上敏捷，实际上还是瀑布式', score: 2 },
            { text: '团队能做到规范的Sprint迭代和站会', score: 3 }, { text: '持续优化研发效能指标，建立了DevOps体系', score: 4 },
            { text: '让敏捷思维渗透到组织各层级，实现业务敏捷', score: 5 }
        ]},
        { dimension: 'growth', text: '你从"技术专家"向"技术管理者"的转型状态是：', options: [
            { text: '还是更喜欢写代码，管理让我不适', score: 1 }, { text: '在尝试但经常被技术细节拉回去', score: 2 },
            { text: '已适应管理角色，偶尔过度参与技术细节', score: 3 }, { text: '在技术深度和管理广度之间找到了好平衡', score: 4 },
            { text: '建立了技术领导力模型，能培养更多技术管理者', score: 5 }
        ]}
    ],

    finance: [
        { dimension: 'strategy', text: '面对金融科技的冲击，你的应对思路是：', options: [
            { text: '传统业务还能做很久，不急', score: 1 }, { text: '关注着但还没想好怎么应对', score: 2 },
            { text: '评估金融科技对现有业务的影响并制定应对方案', score: 3 }, { text: '主动布局金融科技，推动业务数字化转型', score: 4 },
            { text: '重新定义金融服务边界，构建科技驱动的新型金融生态', score: 5 }
        ]},
        { dimension: 'strategy', text: '你对合规与业务创新之间关系的理解是：', options: [
            { text: '合规很麻烦，经常阻碍业务发展', score: 1 }, { text: '严格遵守合规要求，以合规为优先', score: 2 },
            { text: '在合规框架内寻找创新空间', score: 3 }, { text: '将合规能力转化为竞争优势，让风控成为护城河', score: 4 },
            { text: '参与行业合规标准制定，用专业影响监管方向', score: 5 }
        ]},
        { dimension: 'leadership', text: '在金融机构中，你如何管理"合规文化"与"创新文化"的并存？', options: [
            { text: '只关注合规，创新太冒险', score: 1 }, { text: '想创新但怕出合规问题', score: 2 },
            { text: '在合规红线内鼓励有边界的创新尝试', score: 3 }, { text: '建立"合规创新"双轨机制，让两者互相促进', score: 4 },
            { text: '打造既敬畏风险又勇于创新的组织文化', score: 5 }
        ]},
        { dimension: 'decision', text: '当需要在风险控制和业务增长之间做平衡时：', options: [
            { text: '完全规避风险，宁可不做', score: 1 }, { text: '按现有风控标准机械执行', score: 2 },
            { text: '量化风险收益比，在可控范围内追求增长', score: 3 }, { text: '建立动态风险定价模型，实现精细化风险管理', score: 4 },
            { text: '构建风险管理即竞争力的体系，化风险为机遇', score: 5 }
        ]},
        { dimension: 'communication', text: '你如何向客户解释复杂的金融产品或风险？', options: [
            { text: '用专业术语，客户听不懂也没办法', score: 1 }, { text: '简单说一下收益，淡化风险', score: 2 },
            { text: '用通俗语言解释产品逻辑和风险收益', score: 3 }, { text: '根据客户类型定制沟通策略，确保充分理解', score: 4 },
            { text: '建立透明的客户教育体系，提升行业整体的客户信任', score: 5 }
        ]},
        { dimension: 'execution', text: '你对金融业务的风控流程建设参与度如何？', options: [
            { text: '按现有流程操作就好', score: 1 }, { text: '发现风控漏洞会汇报', score: 2 },
            { text: '主动优化风控流程，提升效率和覆盖面', score: 3 }, { text: '搭建智能风控体系，实现风险的实时监测和预警', score: 4 },
            { text: '设计全面风险管理框架，将风控融入业务每个环节', score: 5 }
        ]},
        { dimension: 'growth', text: '你对金融行业数字化转型的学习状态是：', options: [
            { text: '和我关系不大，还是做好本职', score: 1 }, { text: '听过一些概念但没深入', score: 2 },
            { text: '在学习数字金融相关知识和工具', score: 3 }, { text: '已掌握数据分析/金融科技能力，推动团队转型', score: 4 },
            { text: '成为金融数字化转型的引领者，输出方法论', score: 5 }
        ]}
    ],

    manufacture: [
        { dimension: 'strategy', text: '面对智能制造和工业4.0趋势，你的思考是：', options: [
            { text: '我们的传统工艺还能用很久', score: 1 }, { text: '听说过但觉得和当前业务关系不大', score: 2 },
            { text: '评估智能制造对现有生产线的改造空间', score: 3 }, { text: '制定数字化转型路线图，推动生产智能化升级', score: 4 },
            { text: '重新定义制造业价值链，构建柔性智造生态系统', score: 5 }
        ]},
        { dimension: 'leadership', text: '在制造业中，你如何管理一线工人和技术人员的团队？', options: [
            { text: '制定规范让大家遵守就行', score: 1 }, { text: '发现问题就纠正，保证产品质量', score: 2 },
            { text: '建立技能培训体系，提升团队整体素质', score: 3 }, { text: '打造"工匠精神"文化，让质量意识深入每个人', score: 4 },
            { text: '构建人才与自动化协同的精益生产体系', score: 5 }
        ]},
        { dimension: 'decision', text: '当需要在降本和品质之间做选择时：', options: [
            { text: '领导说降本就降本', score: 1 }, { text: '尽量降本，品质差不多就行', score: 2 },
            { text: '精准分析成本结构，在不影响核心品质的前提下优化', score: 3 }, { text: '通过工艺创新和流程再造同时实现降本和提质', score: 4 },
            { text: '重新定义产品价值标准，用品质壁垒创造高端定价空间', score: 5 }
        ]},
        { dimension: 'execution', text: '你对精益生产/六西格玛等方法论的实践程度是：', options: [
            { text: '不太了解这些方法论', score: 1 }, { text: '听说过但没系统应用', score: 2 },
            { text: '在局部推行过精益改善项目', score: 3 }, { text: '系统化导入精益体系，持续改善生产效率', score: 4 },
            { text: '将精益思维融入组织DNA，打造持续进化的制造体系', score: 5 }
        ]},
        { dimension: 'communication', text: '你如何协调研发、生产和销售部门之间的矛盾？', options: [
            { text: '各做各的，有问题再说', score: 1 }, { text: '出了问题才沟通协调', score: 2 },
            { text: '建立定期协调会议，提前暴露和解决问题', score: 3 }, { text: '构建IPD（集成产品开发）流程，打通全价值链', score: 4 },
            { text: '建立以客户为中心的端到端协同机制', score: 5 }
        ]},
        { dimension: 'growth', text: '你对供应链管理能力的提升状况：', options: [
            { text: '供应链是采购部门的事', score: 1 }, { text: '了解一些基本的供应链知识', score: 2 },
            { text: '在学习和实践供应链优化方法', score: 3 }, { text: '具备全链路供应链管理能力，推动数字化供应链建设', score: 4 },
            { text: '构建韧性供应链生态，在全球化不确定性中建立竞争优势', score: 5 }
        ]}
    ],

    retail: [
        { dimension: 'strategy', text: '面对线上线下融合(OMO)趋势，你的战略思考是：', options: [
            { text: '做好自己的渠道就行', score: 1 }, { text: '知道要做全渠道但不知道怎么开始', score: 2 },
            { text: '在推动线上线下渠道打通和数据整合', score: 3 }, { text: '构建以消费者为中心的全渠道运营体系', score: 4 },
            { text: '重新定义零售业态，打造数据驱动的新零售生态', score: 5 }
        ]},
        { dimension: 'leadership', text: '你如何管理门店/一线销售团队？', options: [
            { text: '定好KPI让他们自己完成', score: 1 }, { text: '盯着业绩数据，差了就施压', score: 2 },
            { text: '提供销售培训和工具支持，帮助团队提升能力', score: 3 }, { text: '构建"赋能+激励"体系，让一线成为客户体验的创造者', score: 4 },
            { text: '打造品牌文化驱动的服务团队，让每个人都是品牌大使', score: 5 }
        ]},
        { dimension: 'decision', text: '关于产品/品类的选择和调整，你的决策方式是：', options: [
            { text: '跟着市场热点走，什么火卖什么', score: 1 }, { text: '凭经验判断哪些产品好卖', score: 2 },
            { text: '基于销售数据分析进行品类优化', score: 3 }, { text: '结合消费趋势和数据洞察，建立动态品类管理体系', score: 4 },
            { text: '从消费者生活方式出发，定义品类战略和产品矩阵', score: 5 }
        ]},
        { dimension: 'execution', text: '你对消费者运营（会员/私域/复购）的管理水平是：', options: [
            { text: '主要靠促销拉新，没有系统运营', score: 1 }, { text: '有基本的会员体系但不够精细', score: 2 },
            { text: '建立了分层运营策略，关注核心指标', score: 3 }, { text: '构建全生命周期的消费者运营体系', score: 4 },
            { text: '打造数据驱动的消费者关系平台，实现千人千面的精准运营', score: 5 }
        ]},
        { dimension: 'communication', text: '你如何维护与核心供应商/合作伙伴的关系？', options: [
            { text: '纯粹的买卖关系，谁便宜用谁', score: 1 }, { text: '维持基本合作，有问题再沟通', score: 2 },
            { text: '建立稳定的合作关系，定期沟通需求和反馈', score: 3 }, { text: '构建战略合作伙伴关系，实现资源互补和共同成长', score: 4 },
            { text: '打造共赢的商业生态，让合作伙伴成为竞争优势的一部分', score: 5 }
        ]},
        { dimension: 'growth', text: '你对消费者行为和市场趋势的洞察力如何？', options: [
            { text: '不太关注，做好本职就行', score: 1 }, { text: '偶尔看看行业报告', score: 2 },
            { text: '持续关注消费趋势，了解目标客群的需求变化', score: 3 }, { text: '建立消费者洞察体系，能预判消费趋势的变化', score: 4 },
            { text: '引领消费潮流，创造新的消费需求和场景', score: 5 }
        ]}
    ],

    medical: [
        { dimension: 'strategy', text: '面对医疗行业的数字化转型（如互联网医院、AI辅助诊断），你的态度是：', options: [
            { text: '传统医疗模式更可靠', score: 1 }, { text: '有了解但觉得还不成熟', score: 2 },
            { text: '积极评估数字化工具在本业务中的应用场景', score: 3 }, { text: '制定数字化转型路线图，推动业务模式升级', score: 4 },
            { text: '重新定义医疗服务价值链，构建智慧医疗生态', score: 5 }
        ]},
        { dimension: 'leadership', text: '在医疗团队中，你如何平衡"临床专业权威"和"管理效能"？', options: [
            { text: '专业人员不需要太多管理', score: 1 }, { text: '用行政手段管理，但经常遇到抵触', score: 2 },
            { text: '尊重专业自主权的同时建立管理规范', score: 3 }, { text: '构建"临床卓越+管理精益"双轮驱动模式', score: 4 },
            { text: '打造医疗专业共同体，让管理服务于专业价值创造', score: 5 }
        ]},
        { dimension: 'decision', text: '当医疗安全和运营效率存在冲突时，你的决策原则是：', options: [
            { text: '按规定执行，不做额外判断', score: 1 }, { text: '安全优先但经常影响效率', score: 2 },
            { text: '在确保安全底线的前提下优化流程提升效率', score: 3 }, { text: '建立医疗质量管理体系，让安全和效率相互促进', score: 4 },
            { text: '构建循证管理决策机制，用数据驱动安全与效率的双重提升', score: 5 }
        ]},
        { dimension: 'execution', text: '你对医疗质量管理体系的建设参与度是：', options: [
            { text: '按照医院规定执行就好', score: 1 }, { text: '发现质量问题会反馈', score: 2 },
            { text: '主动参与质量改进项目', score: 3 }, { text: '搭建科室/部门的质量管理体系和持续改进机制', score: 4 },
            { text: '推动组织级的医疗质量文化建设，对标国际标准', score: 5 }
        ]},
        { dimension: 'communication', text: '你如何处理医患关系和公众沟通？', options: [
            { text: '尽量少和患者沟通复杂问题', score: 1 }, { text: '按规范告知，走流程', score: 2 },
            { text: '注重沟通技巧，建立患者信任', score: 3 }, { text: '构建系统化的患者体验管理和医患沟通体系', score: 4 },
            { text: '推动以患者为中心的服务文化变革', score: 5 }
        ]},
        { dimension: 'growth', text: '你如何保持医疗管理专业能力的持续更新？', options: [
            { text: '靠工作经验积累就够了', score: 1 }, { text: '偶尔参加行业会议', score: 2 },
            { text: '持续学习医疗管理前沿知识，关注政策变化', score: 3 }, { text: '建立系统的医疗管理知识体系，推动团队学习', score: 4 },
            { text: '成为医疗管理领域的思想领袖，影响行业发展', score: 5 }
        ]}
    ],

    education: [
        { dimension: 'strategy', text: '面对教育行业的变革（如AI教育、在线化），你的战略思考是：', options: [
            { text: '做好本职教学工作就行', score: 1 }, { text: '关注变化但不确定如何应对', score: 2 },
            { text: '积极探索新技术在教育中的应用场景', score: 3 }, { text: '制定教育创新战略，推动教学模式升级', score: 4 },
            { text: '重新定义教育价值，构建未来教育生态体系', score: 5 }
        ]},
        { dimension: 'leadership', text: '你如何激发教师/培训师团队的教学创新？', options: [
            { text: '教师自主发挥就好，不需要管太多', score: 1 }, { text: '推荐一些好的教学方法', score: 2 },
            { text: '建立教研机制，定期交流和分享教学创新', score: 3 }, { text: '构建教学创新孵化机制，提供资源和激励支持', score: 4 },
            { text: '打造创新型教学组织文化，让持续进化成为团队基因', score: 5 }
        ]},
        { dimension: 'decision', text: '当教学质量和招生规模存在冲突时：', options: [
            { text: '先保证招生数量', score: 1 }, { text: '两个都想要但经常顾此失彼', score: 2 },
            { text: '在保证基本质量的前提下适度扩大规模', score: 3 }, { text: '建立质量管控体系，实现规模化高品质教学', score: 4 },
            { text: '用品质口碑驱动增长，构建品质与规模的正向飞轮', score: 5 }
        ]},
        { dimension: 'execution', text: '你对教学效果的评估和改进机制建设如何？', options: [
            { text: '按传统方式考试评分就好', score: 1 }, { text: '有基本的教学评估但不系统', score: 2 },
            { text: '建立多维度的教学效果评估体系', score: 3 }, { text: '构建"评估-反馈-改进"的闭环教学质量管理系统', score: 4 },
            { text: '打造数据驱动的教学优化引擎，实现个性化教学', score: 5 }
        ]},
        { dimension: 'communication', text: '你如何管理与学生/家长/客户的关系？', options: [
            { text: '完成教学任务就好，不太管关系', score: 1 }, { text: '有问题时才沟通', score: 2 },
            { text: '主动建立沟通渠道，及时反馈学习情况', score: 3 }, { text: '构建全方位的服务体验体系，提升满意度和口碑', score: 4 },
            { text: '建立教育社区生态，让家长和学生成为品牌传播者', score: 5 }
        ]},
        { dimension: 'growth', text: '你对教育行业趋势的学习和研究状况是：', options: [
            { text: '专注当前工作，没时间研究趋势', score: 1 }, { text: '偶尔了解一些教育新理念', score: 2 },
            { text: '持续关注教育政策和行业趋势', score: 3 }, { text: '系统研究教育创新方法论，推动组织变革', score: 4 },
            { text: '成为教育创新的引领者，影响行业发展方向', score: 5 }
        ]}
    ],

    realestate: [
        { dimension: 'strategy', text: '面对房地产行业的深度调整，你的战略判断是：', options: [
            { text: '等行情回暖，按原来的做', score: 1 }, { text: '缩减投入，保守过冬', score: 2 },
            { text: '调整产品和客群定位，适应新市场需求', score: 3 }, { text: '推动业务多元化转型，探索存量运营和城市更新', score: 4 },
            { text: '重新定义不动产价值，构建空间服务生态体系', score: 5 }
        ]},
        { dimension: 'leadership', text: '在地产/建筑行业中，你如何管理跨专业团队（设计、工程、营销）？', options: [
            { text: '各管各的，有问题再协调', score: 1 }, { text: '开会统一要求，出问题再解决', score: 2 },
            { text: '建立标准化的协作流程和沟通机制', score: 3 }, { text: '构建项目管理体系，实现跨专业团队的高效协同', score: 4 },
            { text: '打造以客户价值为中心的一体化项目管理文化', score: 5 }
        ]},
        { dimension: 'decision', text: '关于项目投资决策，你的参与和能力水平是：', options: [
            { text: '不参与投资决策', score: 1 }, { text: '按公司标准做基础测算', score: 2 },
            { text: '能做较全面的项目可行性分析', score: 3 }, { text: '建立多维度的投资评估模型，含敏感性分析和风险预案', score: 4 },
            { text: '从城市发展和产业趋势出发，做出前瞻性投资布局', score: 5 }
        ]},
        { dimension: 'execution', text: '你对工程项目的进度和质量管控能力如何？', options: [
            { text: '基本靠催，经常延期', score: 1 }, { text: '能按计划推进但应对变化能力差', score: 2 },
            { text: '建立进度和质量的双重管控体系', score: 3 }, { text: '构建数字化项目管理平台，实现全过程精细化管控', score: 4 },
            { text: '建立行业标杆级的项目管理体系，输出管理方法论', score: 5 }
        ]},
        { dimension: 'communication', text: '你如何处理与政府、社区等利益相关方的关系？', options: [
            { text: '被动应对，有要求才配合', score: 1 }, { text: '维持基本沟通，不主动深入', score: 2 },
            { text: '主动建立良好的政企关系和社区关系', score: 3 }, { text: '构建多层级的利益相关方管理体系', score: 4 },
            { text: '成为政府信赖的产业合作伙伴，参与城市发展规划', score: 5 }
        ]},
        { dimension: 'growth', text: '你对城市发展和地产行业趋势的学习状况是：', options: [
            { text: '专注当前项目，不太关注行业趋势', score: 1 }, { text: '了解一些政策变化', score: 2 },
            { text: '系统研究城市发展规律和行业周期', score: 3 }, { text: '建立行业研究能力，能预判市场趋势变化', score: 4 },
            { text: '形成独到的行业洞察，能影响公司战略方向', score: 5 }
        ]}
    ],

    media: [
        { dimension: 'strategy', text: '面对短视频、AIGC等内容形态变革，你的策略是：', options: [
            { text: '坚守传统内容形态', score: 1 }, { text: '跟风做一些新形态的尝试', score: 2 },
            { text: '评估新内容形态的机会，制定转型方案', score: 3 }, { text: '构建多元内容矩阵，建立跨平台分发能力', score: 4 },
            { text: '引领内容创新方向，定义新的内容消费场景和商业模式', score: 5 }
        ]},
        { dimension: 'leadership', text: '你如何管理创意型团队？', options: [
            { text: '给任务给DDL，其他不管', score: 1 }, { text: '控制流程保证产出', score: 2 },
            { text: '给予创意空间的同时保证项目按时交付', score: 3 }, { text: '构建"创意自由+商业约束"的平衡机制', score: 4 },
            { text: '打造激发创造力的组织文化，让团队产出超越预期的作品', score: 5 }
        ]},
        { dimension: 'decision', text: '当内容创意和商业收益之间存在冲突时：', options: [
            { text: '完全听甲方/客户的要求', score: 1 }, { text: '优先商业需求，创意让步', score: 2 },
            { text: '在满足商业需求的基础上坚持一定的创意水准', score: 3 }, { text: '让创意成为商业价值的放大器，实现艺术与商业的融合', score: 4 },
            { text: '用优质内容重新定义商业价值，让好内容自带商业势能', score: 5 }
        ]},
        { dimension: 'execution', text: '你对内容生产流程的标准化和效率优化做到什么程度？', options: [
            { text: '全靠个人能力，没什么流程', score: 1 }, { text: '有基本流程但经常被打乱', score: 2 },
            { text: '建立了规范的内容生产流水线', score: 3 }, { text: '构建高效的内容工业化体系，实现创意规模化生产', score: 4 },
            { text: '打造AI+人协同的内容生产体系，定义行业效率标准', score: 5 }
        ]},
        { dimension: 'communication', text: '你如何与品牌客户/投资方沟通创意价值？', options: [
            { text: '按客户要求做，不多解释', score: 1 }, { text: '展示作品效果，希望客户认可', score: 2 },
            { text: '用数据和案例论证创意的商业价值', score: 3 }, { text: '构建创意价值的评估体系，让客户理解内容投资的ROI', score: 4 },
            { text: '成为客户的战略内容顾问，用专业引导客户的内容投资方向', score: 5 }
        ]},
        { dimension: 'growth', text: '你对内容行业趋势和消费者口味变化的敏感度如何？', options: [
            { text: '做好当前项目就行，不太关注', score: 1 }, { text: '偶尔看看热门内容', score: 2 },
            { text: '持续研究内容消费趋势和平台算法变化', score: 3 }, { text: '建立行业洞察体系，能提前捕捉内容趋势', score: 4 },
            { text: '引领内容审美和消费趋势，成为行业风向标', score: 5 }
        ]}
    ],

    other: [
        { dimension: 'strategy', text: '你对所在行业的政策环境和监管趋势的关注程度是：', options: [
            { text: '不太关注政策，做好本职工作', score: 1 }, { text: '有大的政策变化时才关注', score: 2 },
            { text: '持续跟踪政策动向，评估对业务的影响', score: 3 }, { text: '提前布局政策方向，让组织在政策变化中占据先机', score: 4 },
            { text: '参与行业标准制定，用专业影响政策方向', score: 5 }
        ]},
        { dimension: 'leadership', text: '在你所在的行业中，最大的人才管理挑战是什么？你如何应对？', options: [
            { text: '没特别想过人才管理的挑战', score: 1 }, { text: '招人难，留不住人', score: 2 },
            { text: '识别关键人才，给予重点培养和激励', score: 3 }, { text: '建立适合行业特点的人才发展体系', score: 4 },
            { text: '打造行业人才高地，让组织成为行业人才的首选', score: 5 }
        ]},
        { dimension: 'decision', text: '面对行业特有的监管或合规要求，你的决策方式是：', options: [
            { text: '严格按规定执行，不做任何创新', score: 1 }, { text: '在规定范围内做事，不越雷池', score: 2 },
            { text: '在合规框架内寻找创新和优化空间', score: 3 }, { text: '将合规要求转化为管理体系的一部分，提升整体效率', score: 4 },
            { text: '在合规基础上引领行业标准提升', score: 5 }
        ]},
        { dimension: 'execution', text: '你对所在行业的专业流程和标准体系建设参与度如何？', options: [
            { text: '按现有标准执行就好', score: 1 }, { text: '发现问题会反馈', score: 2 },
            { text: '主动参与流程优化和标准制定', score: 3 }, { text: '搭建部门/业务线的标准化管理体系', score: 4 },
            { text: '制定行业级的标准和最佳实践', score: 5 }
        ]},
        { dimension: 'communication', text: '你如何与行业主管部门、合作方等外部利益相关方沟通？', options: [
            { text: '尽量少打交道', score: 1 }, { text: '被动应对，有需求才沟通', score: 2 },
            { text: '主动维护关系，建立良好的沟通渠道', score: 3 }, { text: '构建多层级的外部关系网络', score: 4 },
            { text: '成为行业关键人物，能影响行业生态的走向', score: 5 }
        ]},
        { dimension: 'growth', text: '你对行业前沿趋势的学习和研究投入如何？', options: [
            { text: '忙于日常，没时间学习', score: 1 }, { text: '偶尔关注一下行业动态', score: 2 },
            { text: '有计划地学习行业前沿知识', score: 3 }, { text: '建立行业研究能力，能预判趋势变化', score: 4 },
            { text: '成为行业思想领袖，输出方法论和趋势判断', score: 5 }
        ]}
    ]
};

// ===== Fisher-Yates 洗牌 =====
function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// ===== 随机抽题函数 =====
function generateTestQuestions() {
    const industry = selectedIndustry || 'other';
    const industryQs = INDUSTRY_QUESTIONS[industry] || INDUSTRY_QUESTIONS['other'];
    const selected = [];

    DIMENSIONS.forEach(dim => {
        // 获取该维度的通用题
        const generalQs = QUESTION_BANK.filter(q => q.dimension === dim.id);
        // 获取该维度的行业题
        const indQs = industryQs.filter(q => q.dimension === dim.id);

        // 行业题数量（最多 industryPick 道）
        const indPick = Math.min(dim.industryPick, indQs.length);
        // 通用题数量 = 总数 - 行业题数
        const genPick = dim.pickCount - indPick;

        // 随机抽取行业题
        const pickedInd = shuffle(indQs).slice(0, indPick);
        // 随机抽取通用题
        const pickedGen = shuffle(generalQs).slice(0, genPick);

        // 合并并打乱选项顺序
        [...pickedGen, ...pickedInd].forEach(q => {
            const item = {
                dimension: q.dimension,
                text: q.text,
                options: shuffle(q.options)
            };
            if (q.type === 'multi') {
                item.type = 'multi';
                item.maxScore = q.maxScore || 5;
                item.minScore = q.minScore || 1;
            }
            selected.push(item);
        });
    });

    return selected;
}

// 当前测试使用的题目
let QUESTIONS = generateTestQuestions();
