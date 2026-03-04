/**
 * 管理层级上限测试 - 题目库
 * 6大维度，通用题库 + 行业专属题
 */

// ===== 行业定义 =====
const INDUSTRIES = [
    { id: 'tech', name: '互联网/科技', icon: '💻', desc: 'IT、软件、AI、云计算等' },
    { id: 'finance', name: '金融', icon: '🏦', desc: '银行、证券、保险、基金等' },
    { id: 'manufacture', name: '制造业', icon: '🏭', desc: '生产、制造、工程等' },
    { id: 'retail', name: '消费/零售', icon: '🛒', desc: '电商、快消、餐饮、零售等' },
    { id: 'medical', name: '医疗/健康', icon: '🏥', desc: '医院、药企、健康科技等' },
    { id: 'education', name: '教育/培训', icon: '📚', desc: '学校、培训、在线教育等' },
    { id: 'realestate', name: '地产/建筑', icon: '🏗️', desc: '房地产、建筑、工程等' },
    { id: 'media', name: '传媒/文创', icon: '🎬', desc: '广告、影视、游戏、内容等' },
    { id: 'other', name: '其他行业', icon: '🌐', desc: '政府、能源、物流等' }
];

const DIMENSIONS = [
    { id: 'strategy', name: '战略思维', icon: '🎯', color: '#6c5ce7', pickCount: 5, industryPick: 1 },
    { id: 'leadership', name: '领导力', icon: '👑', color: '#a855f7', pickCount: 5, industryPick: 1 },
    { id: 'decision', name: '决策能力', icon: '⚡', color: '#06b6d4', pickCount: 5, industryPick: 1 },
    { id: 'communication', name: '沟通影响', icon: '🗣️', color: '#f59e0b', pickCount: 4, industryPick: 1 },
    { id: 'execution', name: '执行推动', icon: '🚀', color: '#10b981', pickCount: 4, industryPick: 1 },
    { id: 'growth', name: '自我进化', icon: '🧬', color: '#ef4444', pickCount: 5, industryPick: 1 }
];

let selectedIndustry = null;
