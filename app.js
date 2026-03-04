/**
 * 管理层级上限测试 - 主应用逻辑
 */

// ===== 全局状态 =====
let currentQuestion = 0;
let answers = new Array(QUESTIONS.length).fill(null);
let multiSelections = {}; // 多选题的选中状态 { questionIndex: Set<optionIndex> }
let testResult = null;
let userExpectation = { position: null, timeline: null, teamsize: null, experience: null };

// ===== 页面导航 =====
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById(pageId);
    target.classList.add('active');
    window.scrollTo(0, 0);
}

// ===== 首页数字动画 =====
function animateStats() {
    document.querySelectorAll('.stat-num').forEach(el => {
        const target = parseInt(el.dataset.target);
        let current = 0;
        const step = target / 30;
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = Math.round(current);
        }, 40);
    });
}

// ===== 开始测试 =====
function selectIndustry(industryId) {
    selectedIndustry = industryId;

    // 高亮选中
    document.querySelectorAll('.industry-card').forEach(card => {
        card.classList.toggle('selected', card.dataset.id === industryId);
    });

    // 延迟后进入测试
    setTimeout(() => {
        QUESTIONS = generateTestQuestions();
        currentQuestion = 0;
        answers = new Array(QUESTIONS.length).fill(null);
        multiSelections = {};
        showPage('page-test');
        renderQuestion();
    }, 400);
}

function renderIndustryPage() {
    const grid = document.getElementById('industry-grid');
    if (!grid) return;
    grid.innerHTML = '';
    INDUSTRIES.forEach(ind => {
        const card = document.createElement('div');
        card.className = 'industry-card';
        card.dataset.id = ind.id;
        card.innerHTML = `
            <div class="industry-icon">${ind.icon}</div>
            <div class="industry-name">${ind.name}</div>
            <div class="industry-desc">${ind.desc}</div>
        `;
        card.addEventListener('click', () => selectIndustry(ind.id));
        grid.appendChild(card);
    });
}

function skipIndustry() {
    selectedIndustry = 'general';
    QUESTIONS = generateTestQuestions();
    currentQuestion = 0;
    answers = new Array(QUESTIONS.length).fill(null);
    multiSelections = {};
    showPage('page-test');
    renderQuestion();
}

function startTest() {
    // 兼容直接调用
    QUESTIONS = generateTestQuestions();
    currentQuestion = 0;
    answers = new Array(QUESTIONS.length).fill(null);
    multiSelections = {};
    showPage('page-test');
    renderQuestion();
}

// ===== 渲染题目 =====
function renderQuestion() {
    const q = QUESTIONS[currentQuestion];
    const dim = DIMENSIONS.find(d => d.id === q.dimension);
    const isMulti = q.type === 'multi';

    // 进度
    const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100;
    document.getElementById('progress-fill').style.width = progress + '%';
    document.getElementById('progress-text').textContent = `${currentQuestion + 1} / ${QUESTIONS.length}`;
    document.getElementById('progress-percent').textContent = Math.round(progress) + '%';
    document.getElementById('dimension-tag').textContent = dim.icon + ' ' + dim.name;

    // 题目
    document.getElementById('question-text').textContent = q.text;

    // 多选标记
    const questionCard = document.getElementById('question-card');
    if (isMulti) {
        questionCard.classList.add('multi-select');
    } else {
        questionCard.classList.remove('multi-select');
    }

    // 选项
    const optionsList = document.getElementById('options-list');
    optionsList.innerHTML = '';

    if (isMulti) {
        // 多选题
        if (!multiSelections[currentQuestion]) {
            multiSelections[currentQuestion] = new Set();
        }
        const selected = multiSelections[currentQuestion];

        q.options.forEach((opt, idx) => {
            const div = document.createElement('div');
            div.className = 'option-item multi' + (selected.has(idx) ? ' selected' : '');
            div.innerHTML = `
                <div class="option-checkbox">${selected.has(idx) ? '✓' : ''}</div>
                <span>${opt.text}</span>
            `;
            div.addEventListener('click', () => toggleMultiOption(idx));
            optionsList.appendChild(div);
        });
    } else {
        // 单选题
        q.options.forEach((opt, idx) => {
            const div = document.createElement('div');
            div.className = 'option-item' + (answers[currentQuestion] === opt.score ? ' selected' : '');
            div.innerHTML = `
                <div class="option-radio"></div>
                <span>${opt.text}</span>
            `;
            div.addEventListener('click', () => selectOption(idx, opt.score));
            optionsList.appendChild(div);
        });
    }

    // 按钮状态
    document.getElementById('btn-prev').disabled = currentQuestion === 0;
    const answered = isMulti
        ? (multiSelections[currentQuestion] && multiSelections[currentQuestion].size > 0)
        : (answers[currentQuestion] !== null);
    document.getElementById('btn-next').disabled = !answered;

    // 更新按钮文字
    const btnNext = document.getElementById('btn-next');
    if (currentQuestion === QUESTIONS.length - 1) {
        btnNext.innerHTML = '提交测评 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
    } else {
        btnNext.innerHTML = '下一题 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
    }

    // 动画
    const card = document.getElementById('question-card');
    card.style.opacity = '0';
    card.style.transform = 'translateX(30px)';
    requestAnimationFrame(() => {
        card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        card.style.opacity = '1';
        card.style.transform = 'translateX(0)';
    });
}

// ===== 选择选项（单选） =====
function selectOption(idx, score) {
    answers[currentQuestion] = score;

    // 更新UI
    document.querySelectorAll('.option-item').forEach((el, i) => {
        el.classList.toggle('selected', i === idx);
    });

    document.getElementById('btn-next').disabled = false;

    // 自动跳转下一题（延迟一下让用户看到选中效果）
    if (currentQuestion < QUESTIONS.length - 1) {
        setTimeout(() => nextQuestion(), 600);
    }
}

// ===== 多选题切换选项 =====
function toggleMultiOption(idx) {
    if (!multiSelections[currentQuestion]) {
        multiSelections[currentQuestion] = new Set();
    }
    const selected = multiSelections[currentQuestion];

    if (selected.has(idx)) {
        selected.delete(idx);
    } else {
        selected.add(idx);
    }

    // 计算多选题得分
    const q = QUESTIONS[currentQuestion];
    let rawScore = 0;
    selected.forEach(i => { rawScore += q.options[i].score; });
    const maxS = q.maxScore || 5;
    const minS = q.minScore || 1;
    answers[currentQuestion] = selected.size > 0 ? Math.max(minS, Math.min(maxS, rawScore)) : null;

    // 更新UI
    document.querySelectorAll('.option-item.multi').forEach((el, i) => {
        el.classList.toggle('selected', selected.has(i));
        el.querySelector('.option-checkbox').textContent = selected.has(i) ? '✓' : '';
    });

    document.getElementById('btn-next').disabled = selected.size === 0;
}

// ===== 上一题 =====
function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        renderQuestion();
    }
}

// ===== 下一题 =====
function nextQuestion() {
    if (answers[currentQuestion] === null) return;

    if (currentQuestion < QUESTIONS.length - 1) {
        currentQuestion++;
        renderQuestion();
    } else {
        submitTest();
    }
}

// ===== 提交测评 =====
function submitTest() {
    // 先计算结果
    testResult = calculateScores(answers);
    testResult.level = getLevel(testResult.totalScore);

    // 重置期望
    userExpectation = { position: null, timeline: null, teamsize: null, experience: null };
    document.querySelectorAll('.exp-option').forEach(el => el.classList.remove('selected'));
    document.getElementById('btn-submit-exp').disabled = true;

    // 进入期望设定页
    showPage('page-expectation');
}

// ===== 期望设定 =====
function selectExpOption(field, value, el) {
    userExpectation[field] = value;

    // UI高亮
    el.parentElement.querySelectorAll('.exp-option').forEach(o => o.classList.remove('selected'));
    el.classList.add('selected');

    // 检查是否所有必填项都选了（至少选2项即可提交）
    const filled = Object.values(userExpectation).filter(v => v !== null).length;
    document.getElementById('btn-submit-exp').disabled = filled < 2;
}

function submitExpectation() {
    showLoadingAndReport();
}

function skipExpectation() {
    userExpectation = { position: null, timeline: null, teamsize: null, experience: null };
    showLoadingAndReport();
}

function showLoadingAndReport() {
    showPage('page-loading');

    const statusTexts = [
        'AI 正在解析你的答题模式...',
        'AI 正在分析战略思维维度...',
        'AI 正在评估领导力潜能...',
        'AI 正在测算决策能力指数...',
        'AI 正在解析沟通影响力...',
        'AI 正在计算执行推动力...',
        'AI 正在评估自我进化潜力...',
        'AI 正在交叉验证 6 大维度数据...',
        'AI 正在生成个性化深度报告...',
        'AI 分析完成，报告即将呈现...'
    ];

    let step = 0;
    const loadingFill = document.getElementById('loading-fill');
    const loadingStatus = document.getElementById('loading-status');

    const interval = setInterval(() => {
        step++;
        const progress = Math.min((step / statusTexts.length) * 100, 100);
        loadingFill.style.width = progress + '%';

        if (step <= statusTexts.length) {
            loadingStatus.textContent = statusTexts[step - 1];
        }

        if (step >= statusTexts.length + 1) {
            clearInterval(interval);
            showBriefReport();
        }
    }, 500);
}

// ===== 显示简略报告 =====
function showBriefReport() {
    const { dimScores, totalScore, level } = testResult;

    document.getElementById('brief-level-badge').textContent = level.id;
    document.getElementById('brief-level-name').textContent = level.name;

    // 显示行业标签
    const ind = INDUSTRIES.find(i => i.id === selectedIndustry);
    const industryLabel = ind ? `${ind.icon} ${ind.name}` : '';
    const briefTitle = document.getElementById('brief-title');
    briefTitle.textContent = '你的管理层级上限';
    if (industryLabel) {
        briefTitle.textContent += ` · ${industryLabel}`;
    }

    // 分数动画
    animateNumber('brief-score', totalScore);

    // 维度卡片
    const dimContainer = document.getElementById('brief-dimensions');
    dimContainer.innerHTML = '';

    const colors = ['#6c5ce7', '#a855f7', '#06b6d4', '#f59e0b', '#10b981', '#ef4444'];

    // 找到得分比例最低的维度（短板）
    let worstDimId = null, worstRatio = 1;
    DIMENSIONS.forEach(dim => {
        const s = dimScores[dim.id];
        const m = (dim.id === 'communication' || dim.id === 'execution') ? 20 : 25;
        const r = s / m;
        if (r < worstRatio) { worstRatio = r; worstDimId = dim.id; }
    });

    DIMENSIONS.forEach((dim, i) => {
        const score = dimScores[dim.id];
        const maxScore = (dim.id === 'communication' || dim.id === 'execution') ? 20 : 25;
        const percent = (score / maxScore) * 100;
        const analysis = getDimensionAnalysis(dim.id, score);

        // 根据等级生成简短标签和提示
        let levelLabel, levelClass, briefHint;
        if (analysis.level === 'high') {
            levelLabel = '优秀';
            levelClass = 'level-high';
            briefHint = '已是核心优势，完整报告含进阶策略';
        } else if (analysis.level === 'mid') {
            levelLabel = '中等';
            levelClass = 'level-mid';
            briefHint = '有提升空间，完整报告含突破方法';
        } else {
            levelLabel = '待提升';
            levelClass = 'level-low';
            briefHint = '关键短板，完整报告含改善路径';
        }

        // 如果是最弱维度，额外展开分析
        let expandedAnalysis = '';
        if (dim.id === worstDimId && analysis.level !== 'high') {
            // 截取分析描述的前60字作为引子
            const previewDesc = analysis.desc.length > 60 ? analysis.desc.substring(0, 60) + '...' : analysis.desc;
            // 截取建议的前40字作为引子
            const previewAdvice = analysis.advice.length > 40 ? analysis.advice.substring(0, 40) + '...' : analysis.advice;
            expandedAnalysis = `
                <div class="dim-expanded">
                    <div class="dim-expanded-tag">⚡ AI 深度诊断</div>
                    <p class="dim-expanded-desc">${previewDesc}</p>
                    <div class="dim-expanded-advice">
                        <span class="advice-label">💡 改善方向：</span>
                        <span class="advice-text">${previewAdvice}</span>
                    </div>
                    <div class="dim-expanded-lock">🔓 解锁完整报告查看 ${dim.name} 的系统性提升方案 →</div>
                </div>
            `;
        }

        const card = document.createElement('div');
        card.className = 'dim-card' + (dim.id === worstDimId && analysis.level !== 'high' ? ' dim-card-expanded' : '');
        card.innerHTML = `
            <div class="dim-name">${dim.icon} ${dim.name}</div>
            <div class="dim-score-bar">
                <div class="dim-score-fill" style="width: 0%; background: ${colors[i]}"></div>
            </div>
            <div class="dim-brief-row">
                <span class="dim-level-tag ${levelClass}">${levelLabel}</span>
                <span class="dim-percent">${Math.round(percent)}%</span>
            </div>
            <div class="dim-brief-hint">🔒 ${briefHint}</div>
            ${expandedAnalysis}
        `;
        dimContainer.appendChild(card);

        // 动画
        setTimeout(() => {
            card.querySelector('.dim-score-fill').style.width = percent + '%';
        }, 300 + i * 150);
    });

    showPage('page-brief');

    // 绘制雷达图
    setTimeout(() => drawRadarChart('radarChart', dimScores), 500);
}

// ===== 数字递增动画 =====
function animateNumber(elementId, target) {
    const el = document.getElementById(elementId);
    let current = 0;
    const step = target / 40;
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = Math.round(current);
    }, 30);
}

// ===== 绘制雷达图 =====
function drawRadarChart(canvasId, dimScores) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const dpr = window.devicePixelRatio || 1;
    const displaySize = 350;
    canvas.width = displaySize * dpr;
    canvas.height = displaySize * dpr;
    canvas.style.width = displaySize + 'px';
    canvas.style.height = displaySize + 'px';
    ctx.scale(dpr, dpr);

    const cx = displaySize / 2;
    const cy = displaySize / 2;
    const maxR = 130;
    const dims = DIMENSIONS;
    const n = dims.length;
    const angleStep = (Math.PI * 2) / n;
    const startAngle = -Math.PI / 2;

    ctx.clearRect(0, 0, displaySize, displaySize);

    // 背景网格
    for (let ring = 1; ring <= 5; ring++) {
        const r = (ring / 5) * maxR;
        ctx.beginPath();
        for (let i = 0; i <= n; i++) {
            const angle = startAngle + i * angleStep;
            const x = cx + Math.cos(angle) * r;
            const y = cy + Math.sin(angle) * r;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = 'rgba(108, 92, 231, ' + (ring === 5 ? 0.3 : 0.1) + ')';
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    // 轴线
    for (let i = 0; i < n; i++) {
        const angle = startAngle + i * angleStep;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(angle) * maxR, cy + Math.sin(angle) * maxR);
        ctx.strokeStyle = 'rgba(108, 92, 231, 0.15)';
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    // 标签
    ctx.font = '13px "Noto Sans SC", sans-serif';
    ctx.fillStyle = '#9090b8';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let i = 0; i < n; i++) {
        const angle = startAngle + i * angleStep;
        const labelR = maxR + 28;
        const x = cx + Math.cos(angle) * labelR;
        const y = cy + Math.sin(angle) * labelR;
        ctx.fillText(dims[i].icon + ' ' + dims[i].name, x, y);
    }

    // 数据区域
    const points = [];
    for (let i = 0; i < n; i++) {
        const dim = dims[i];
        const score = dimScores[dim.id];
        const maxScore = (dim.id === 'communication' || dim.id === 'execution') ? 20 : 25;
        const ratio = score / maxScore;
        const angle = startAngle + i * angleStep;
        points.push({
            x: cx + Math.cos(angle) * maxR * ratio,
            y: cy + Math.sin(angle) * maxR * ratio
        });
    }

    // 填充
    ctx.beginPath();
    points.forEach((p, i) => {
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
    });
    ctx.closePath();

    const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
    gradient.addColorStop(0, 'rgba(108, 92, 231, 0.3)');
    gradient.addColorStop(1, 'rgba(168, 85, 247, 0.1)');
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.strokeStyle = 'rgba(168, 85, 247, 0.8)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // 数据点
    points.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#a855f7';
        ctx.fill();
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.5)';
        ctx.lineWidth = 6;
        ctx.stroke();
    });
}

// ===== 验证下载码 =====
function verifyCode() {
    const code = document.getElementById('download-code').value;
    const errorEl = document.getElementById('code-error');

    if (!code.trim()) {
        errorEl.textContent = '请输入下载码';
        return;
    }

    if (verifyDownloadCode(code)) {
        errorEl.style.color = '#10b981';
        errorEl.textContent = '✓ 验证成功！正在解锁完整报告...';
        setTimeout(() => showFullReport(), 1000);
    } else {
        errorEl.style.color = '#ef4444';
        errorEl.textContent = '下载码无效，请检查后重试';
        // 输入框震动效果
        const input = document.getElementById('download-code');
        input.style.animation = 'shake 0.5s ease';
        setTimeout(() => { input.style.animation = ''; }, 500);
    }
}

// 添加震动动画
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20% { transform: translateX(-8px); }
        40% { transform: translateX(8px); }
        60% { transform: translateX(-4px); }
        80% { transform: translateX(4px); }
    }
`;
document.head.appendChild(shakeStyle);

// ===== 显示完整报告 =====
function showFullReport() {
    const { dimScores, totalScore, level } = testResult;

    document.getElementById('full-level-badge').textContent = level.id;
    document.getElementById('full-level-name').textContent = level.name;
    animateNumber('full-score', totalScore);

    // 行业标签
    const ind = INDUSTRIES.find(i => i.id === selectedIndustry);
    const industryLabel = ind ? `${ind.icon} ${ind.name}` : '';

    // 维度详细分析
    const dimContainer = document.getElementById('full-dimensions');
    dimContainer.innerHTML = (industryLabel ? `<div class="industry-badge-report">${industryLabel} · 专属评估报告</div>` : '') +
        '<h3 class="section-title">📊 六大维度深度解析</h3>';

    const colors = ['#6c5ce7', '#a855f7', '#06b6d4', '#f59e0b', '#10b981', '#ef4444'];
    DIMENSIONS.forEach((dim, i) => {
        const score = dimScores[dim.id];
        const maxScore = (dim.id === 'communication' || dim.id === 'execution') ? 20 : 25;
        const percent = (score / maxScore) * 100;
        const analysis = getDimensionAnalysis(dim.id, score);

        const card = document.createElement('div');
        card.className = 'full-dim-card';
        card.innerHTML = `
            <div class="full-dim-header">
                <div class="full-dim-name">${dim.icon} ${dim.name}</div>
                <div class="full-dim-score">${score} / ${maxScore}</div>
            </div>
            <div class="full-dim-bar">
                <div class="full-dim-fill" style="width: 0%; background: ${colors[i]}"></div>
            </div>
            <div class="full-dim-desc">${analysis.desc}</div>
            <div class="full-dim-advice">
                <h4>💡 提升建议</h4>
                <p>${analysis.advice}</p>
            </div>
        `;
        dimContainer.appendChild(card);

        setTimeout(() => {
            card.querySelector('.full-dim-fill').style.width = percent + '%';
        }, 300 + i * 200);
    });

    // 管理风格画像
    const profileContainer = document.getElementById('full-profile');
    profileContainer.innerHTML = `
        <h3 class="section-title">🎯 你的管理风格画像</h3>
        <div class="profile-card">
            <div class="profile-type">${level.profile}</div>
            <div class="profile-desc">${level.detail}</div>
            <div class="profile-traits">
                ${level.traits.map(t => `<span class="trait-tag">${t}</span>`).join('')}
            </div>
        </div>
    `;

    // 突破策略
    const strategyContainer = document.getElementById('full-strategy');
    strategyContainer.innerHTML = `
        <h3 class="section-title">⚡ 突破当前层级的关键策略</h3>
        ${level.strategies.map((s, i) => `
            <div class="strategy-card">
                <div class="strategy-num">${i + 1}</div>
                <div class="strategy-content">
                    <h4>${s.title}</h4>
                    <p>${s.desc}</p>
                </div>
            </div>
        `).join('')}
    `;

    // 行动计划
    const actionContainer = document.getElementById('full-action');
    actionContainer.innerHTML = `
        <h3 class="section-title">📈 立即可执行的行动计划</h3>
        ${level.actions.map(a => `
            <div class="action-card">
                <h4>${a.title}</h4>
                <p>${a.desc}</p>
                <span class="timeline">⏰ ${a.timeline}</span>
            </div>
        `).join('')}
    `;

    // 个性化管理路径建议
    renderPathAdvice(level, dimScores, totalScore);

    showPage('page-full');
    setTimeout(() => drawRadarChart('fullRadarChart', dimScores), 500);
}

// ===== 个性化管理路径建议 =====
function renderPathAdvice(level, dimScores, totalScore) {
    const container = document.getElementById('full-path-advice');
    const exp = userExpectation;

    // 如果用户跳过了期望设定，不显示此区块
    const hasFilled = Object.values(exp).some(v => v !== null);
    if (!hasFilled) {
        container.innerHTML = '';
        return;
    }

    const positionMap = {
        teamlead: { name: '团队主管', level: 'L2', minScore: 56, teamMin: 5, teamMax: 15 },
        manager: { name: '部门经理', level: 'L3', minScore: 84, teamMin: 15, teamMax: 50 },
        director: { name: '总监/VP', level: 'L4', minScore: 105, teamMin: 50, teamMax: 300 },
        cxo: { name: 'CEO/合伙人', level: 'L5', minScore: 126, teamMin: 200, teamMax: 10000 }
    };

    const levelOrder = ['L1', 'L2', 'L3', 'L4', 'L5'];
    const positionOrder = ['teamlead', 'manager', 'director', 'cxo'];
    const currentLevelIdx = levelOrder.indexOf(level.id);
    let targetPos = positionMap[exp.position] || positionMap.manager;
    let targetLevelIdx = levelOrder.indexOf(targetPos.level);

    // 如果当前层级已经 >= 目标层级，自动提升目标到下一级
    if (targetLevelIdx <= currentLevelIdx) {
        const currentPosIdx = positionOrder.indexOf(exp.position);
        // 从当前目标往上找，找到比当前层级更高的目标
        let upgraded = false;
        for (let i = currentPosIdx + 1; i < positionOrder.length; i++) {
            const candidate = positionMap[positionOrder[i]];
            if (levelOrder.indexOf(candidate.level) > currentLevelIdx) {
                targetPos = candidate;
                targetLevelIdx = levelOrder.indexOf(targetPos.level);
                upgraded = true;
                break;
            }
        }
        // 如果已经是最高级别（L5），则保持当前目标但 gap 设为 0
        if (!upgraded) {
            targetLevelIdx = currentLevelIdx;
        }
    }
    const gap = targetLevelIdx - currentLevelIdx;

    const timelineYears = exp.timeline === '0' ? 10 : parseInt(exp.timeline) || 5;
    const teamSize = parseInt(exp.teamsize) || 30;

    // 找出最弱的2个维度
    const dimEntries = DIMENSIONS.map(dim => {
        const maxScore = (dim.id === 'communication' || dim.id === 'execution') ? 20 : 25;
        return { id: dim.id, name: dim.name, icon: dim.icon, score: dimScores[dim.id], max: maxScore, ratio: dimScores[dim.id] / maxScore };
    }).sort((a, b) => a.ratio - b.ratio);
    const weakDims = dimEntries.slice(0, 2);
    const strongDims = dimEntries.slice(-2).reverse();

    // 生成路径阶段
    const stages = generatePathStages(level, targetPos, gap, timelineYears, exp.experience, weakDims, teamSize);

    // 匹配度评估
    const matchAnalysis = getMatchAnalysis(gap, timelineYears, exp.experience, totalScore, targetPos);

    // 渲染
    container.innerHTML = `
        <h3 class="section-title">🗺️ 你的专属管理晋升路径</h3>

        <div class="path-goal-card">
            <div class="path-goal-header">
                <div class="path-from">
                    <div class="path-level-tag current">${level.id}</div>
                    <div class="path-level-name">${level.name}</div>
                    <div class="path-level-score">当前 ${totalScore} 分</div>
                </div>
                <div class="path-arrow">
                    <svg width="40" height="20" viewBox="0 0 40 20"><path d="M0 10h32M26 4l8 6-8 6" stroke="var(--accent-2)" stroke-width="2" fill="none"/></svg>
                    <span class="path-timeline-tag">${timelineYears === 10 ? '长期' : timelineYears + '年'}</span>
                </div>
                <div class="path-to">
                    <div class="path-level-tag target">${targetPos.level}</div>
                    <div class="path-level-name">${targetPos.name}</div>
                    <div class="path-level-score">目标 ${targetPos.minScore}+ 分</div>
                </div>
            </div>
            <div class="path-match ${matchAnalysis.type}">
                <span class="path-match-icon">${matchAnalysis.icon}</span>
                <span class="path-match-text">${matchAnalysis.text}</span>
            </div>
        </div>

        <div class="path-insight-cards">
            <div class="path-insight">
                <div class="path-insight-title">🔑 核心优势</div>
                <div class="path-insight-content">${strongDims.map(d => `<span class="dim-tag strong">${d.icon} ${d.name} ${Math.round(d.ratio * 100)}%</span>`).join('')}</div>
                <p class="path-insight-desc">这些是你迈向 ${targetPos.name} 的加速引擎，继续保持并放大它们的影响力。</p>
            </div>
            <div class="path-insight">
                <div class="path-insight-title">⚠️ 关键短板</div>
                <div class="path-insight-content">${weakDims.map(d => `<span class="dim-tag weak">${d.icon} ${d.name} ${Math.round(d.ratio * 100)}%</span>`).join('')}</div>
                <p class="path-insight-desc">这些维度是你晋升路上的最大障碍，优先突破它们将事半功倍。</p>
            </div>
        </div>

        ${teamSize > 0 ? `
        <div class="path-team-readiness">
            <div class="path-insight-title">👥 团队管理就绪度</div>
            <p class="path-insight-desc">${getTeamReadinessText(teamSize, dimScores, level, exp.experience)}</p>
        </div>` : ''}

        <div class="path-stages">
            <div class="path-stages-title">📍 分阶段晋升路线图</div>
            ${stages.map((stage, i) => `
                <div class="path-stage-card">
                    <div class="path-stage-marker">
                        <div class="path-stage-dot">${i + 1}</div>
                        ${i < stages.length - 1 ? '<div class="path-stage-line"></div>' : ''}
                    </div>
                    <div class="path-stage-content">
                        <div class="path-stage-header">
                            <h4>${stage.title}</h4>
                            <span class="path-stage-time">⏰ ${stage.time}</span>
                        </div>
                        <p class="path-stage-goal">${stage.goal}</p>
                        <div class="path-stage-actions">
                            ${stage.actions.map(a => `<div class="path-stage-action">→ ${a}</div>`).join('')}
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>

        <div class="path-final-note">
            <p>💡 <strong>温馨提示</strong>：管理成长不是线性的，每个阶段都可能遇到平台期。关键是保持学习的热情和对自我的诚实。你的测评数据只是起点，真正的管理力来自每一天的实践与反思。</p>
        </div>
    `;
}

function generatePathStages(currentLevel, targetPos, gap, years, experience, weakDims, teamSize) {
    const stages = [];
    const levelNames = { L1: '基层执行者', L2: '团队主管', L3: '高级经理', L4: '总监/VP', L5: 'CEO/合伙人' };
    const levelOrder = ['L1', 'L2', 'L3', 'L4', 'L5'];
    const currentIdx = levelOrder.indexOf(currentLevel.id);
    const targetIdx = levelOrder.indexOf(targetPos.level);

    if (gap <= 0) {
        // 已达到或超过目标
        stages.push({
            title: '巩固与深耕阶段',
            time: '当前 - 6个月',
            goal: `你已具备 ${targetPos.name} 的能力基础，现在需要在实战中持续打磨。`,
            actions: [
                '深度参与至少一个战略级项目，用成果证明你的层级',
                `持续强化短板维度：${weakDims.map(d => d.name).join('、')}`,
                '建立你的管理方法论，形成可传承的管理体系'
            ]
        });
        stages.push({
            title: '影响力扩展阶段',
            time: '6个月 - 1年',
            goal: '从"有能力"到"被认可"，让组织看到你的价值。',
            actions: [
                '主动承担跨部门或跨业务线的协调工作',
                '培养2-3个核心骨干作为你的管理梯队',
                '在行业或公司层面发出自己的声音（演讲、分享、方案）'
            ]
        });
    } else {
        // 需要跨越多个层级
        const stepsPerLevel = Math.max(1, Math.floor(years / gap));
        const isAggressive = experience === 'none' && gap >= 2 && years <= 3;

        for (let i = 1; i <= Math.min(gap, 3); i++) {
            const nextLevelId = levelOrder[currentIdx + i];
            const nextLevelName = levelNames[nextLevelId];
            const startTime = i === 1 ? '现在' : `第${(i - 1) * stepsPerLevel}年`;
            const endTime = i === gap ? `第${years}年` : `第${i * stepsPerLevel}年`;

            const stageActions = getStageActions(nextLevelId, weakDims, teamSize, experience, i === 1);

            stages.push({
                title: `晋升至 ${nextLevelName}`,
                time: `${startTime} - ${endTime}`,
                goal: getStageGoal(nextLevelId, teamSize),
                actions: stageActions
            });
        }

        if (isAggressive) {
            stages.push({
                title: '风险提醒：加速成长计划',
                time: '贯穿全程',
                goal: '你的目标相对激进，需要额外的加速策略。',
                actions: [
                    '寻找一位已在目标职位的导师，每月进行深度交流',
                    '每季度做一次自我评估，及时调整发展方向',
                    '刻意寻找"高难度任务"来加速经验积累，不怕犯错但要快速复盘'
                ]
            });
        }
    }

    return stages;
}

function getStageGoal(levelId, teamSize) {
    const goals = {
        L2: `具备独立带领5-15人团队的能力，能将团队目标拆解为可执行的任务并推动达成。`,
        L3: `能管理跨职能团队（${Math.min(teamSize, 50)}人规模），从执行管理升级为业务管理，用战略思维驱动部门发展。`,
        L4: `具备多部门/事业线的统筹能力，从管理者进化为领导者，影响组织战略方向。`,
        L5: `能够掌舵整个企业或事业体，构建可持续发展的组织生态和商业模式。`
    };
    return goals[levelId] || goals.L3;
}

function getStageActions(levelId, weakDims, teamSize, experience, isFirst) {
    const weakNames = weakDims.map(d => d.name);
    const actionSets = {
        L2: [
            `优先突破「${weakNames[0]}」：每周花2小时专项训练此维度`,
            isFirst && experience === 'none' ? '主动申请带一个3-5人的小项目组练手' : '系统学习团队管理方法论（推荐OKR+1on1机制）',
            `开始管理${Math.min(teamSize, 15)}人团队的实践，建立固定的管理节奏`,
            '每月完成一次管理复盘，记录成功经验和踩坑教训'
        ],
        L3: [
            `补强「${weakNames[0]}」和「${weakNames[1]}」这两个关键短板`,
            '主导一个对业务有显著影响的中型项目（跨3个以上团队）',
            '建立部门级的人才梯队，培养2个可以独当一面的骨干',
            '每季度向上级提交一份业务战略分析和建议方案'
        ],
        L4: [
            '从"管事"转向"管系统"——设计组织结构和激励机制',
            '建立跨行业的人脉网络，每月与3位不同领域的管理者交流',
            `在${weakNames[0]}维度上达到行业中上水平`,
            '主导一次组织变革或业务创新项目'
        ],
        L5: [
            '构建个人的商业判断力——每周深度分析一个商业案例',
            '组建你的核心管理团队（至少3个互补的高管伙伴）',
            '建立行业影响力：发表观点、参与论坛、建立个人品牌',
            '开始思考"使命"而非仅仅是"目标"——你想创造什么样的价值'
        ]
    };
    return actionSets[levelId] || actionSets.L3;
}

function getMatchAnalysis(gap, years, experience, totalScore, targetPos) {
    // 评估目标匹配度
    const expFactor = { none: 0, junior: 1, mid: 2, senior: 3 }[experience] || 0;

    if (gap <= 0) {
        return { type: 'excellent', icon: '🌟', text: `你的测评结果已达到 ${targetPos.name} 的能力门槛！现在需要的是在实战中验证和强化这些能力，把潜力转化为被组织认可的成果。` };
    }

    if (gap === 1 && years >= 2) {
        return { type: 'good', icon: '✅', text: `你距离 ${targetPos.name} 仅差一个层级，且给自己留了足够的时间。按计划稳步提升，这个目标非常可实现。` };
    }

    if (gap === 1 && years < 2) {
        return { type: 'challenging', icon: '⚡', text: `跨越一个层级用${years}年是可行的，但需要高强度的刻意练习。建议聚焦最薄弱的1-2个维度做突破性提升。` };
    }

    if (gap >= 2 && years <= gap) {
        return { type: 'ambitious', icon: '🔥', text: `目标很有野心！${years}年内跨越${gap}个层级到 ${targetPos.name} 需要超常规的努力和机遇。建议设置中间里程碑，一步步来。` };
    }

    if (gap >= 2 && years >= gap * 2) {
        return { type: 'realistic', icon: '📊', text: `你的目标有挑战性但留出了合理的时间窗口。建议每${Math.floor(years / gap)}年完成一个层级的跃升，并根据实际情况动态调整节奏。` };
    }

    return { type: 'moderate', icon: '💪', text: `这是一个有挑战但值得追求的目标。关键是把${years}年的大目标拆解成可衡量的季度小目标，保持持续进步的节奏。` };
}

function levelIdx(levelId) {
    return ['L1', 'L2', 'L3', 'L4', 'L5'].indexOf(levelId);
}

function getTeamReadinessText(teamSize, dimScores, level, experience) {
    const leadershipRatio = dimScores.leadership / 25;
    const communicationRatio = dimScores.communication / 20;
    const executionRatio = dimScores.execution / 20;
    const avgRatio = (leadershipRatio + communicationRatio + executionRatio) / 3;

    if (teamSize <= 15) {
        if (avgRatio >= 0.7) {
            return `你希望管理一个${teamSize}人左右的团队——好消息是，你的领导力(${Math.round(leadershipRatio * 100)}%)、沟通力(${Math.round(communicationRatio * 100)}%)和执行推动力(${Math.round(executionRatio * 100)}%)都处于良好水平，基本具备小团队管理的能力基础。建议从建立周例会和1对1机制开始实践。`;
        }
        return `你希望管理${teamSize}人左右的团队。当前你的团队管理相关能力（领导力 ${Math.round(leadershipRatio * 100)}%、沟通力 ${Math.round(communicationRatio * 100)}%）还有提升空间。建议先从带一个3-5人的小项目组开始练手，逐步扩大管理范围。`;
    }

    if (teamSize <= 100) {
        if (avgRatio >= 0.75) {
            return `管理${teamSize}人规模的团队需要较强的体系化能力。你在人员管理相关维度表现不错，下一步重点是：学会"通过制度管人"而非"亲力亲为"，建立标准化的管理流程和人才培养体系。`;
        }
        return `${teamSize}人规模的团队管理是一个显著的挑战。你需要重点提升领导力和沟通影响力——这两个维度是管理中型团队的核心。建议找一位管理过同等规模团队的导师做长期辅导。`;
    }

    return `管理${teamSize}人以上的组织属于高管级挑战。这不仅需要个人管理能力，更需要组织设计和文化塑造的能力。建议系统学习组织行为学，并通过轮岗或兼管跨部门项目积累大团队管理经验。你当前的综合能力(${level.id})是一个${levelIdx(level.id) >= 3 ? '不错的' : '需要持续提升的'}起点。`;
}

// ===== 分享结果 =====
function shareResult() {
    shareToPlat('copy');
}

// ===== 多平台分享 =====
function getShareText() {
    const pageUrl = window.location.href.split('?')[0];
    if (testResult && testResult.level) {
        const { level, totalScore } = testResult;
        const ind = INDUSTRIES.find(i => i.id === selectedIndustry);
        const indName = ind ? `（${ind.name}行业）` : '';
        return {
            title: '管理层级上限测试',
            text: `我在「管理层级上限测试」${indName}中获得了 ${totalScore} 分，管理层级上限是【${level.name}】！你也来测测你的管理天花板吧 👉`,
            url: pageUrl
        };
    }
    return {
        title: '管理层级上限测试',
        text: '这个管理层级上限测试超准！28道题测出你的管理潜力天花板，快来试试 👉',
        url: pageUrl
    };
}

function shareToPlat(platform) {
    const { title, text, url } = getShareText();
    const fullText = text + ' ' + url;

    switch (platform) {
        case 'wechat':
            showShareModal('wechat', title, fullText);
            break;
        case 'weibo':
            const weiboUrl = `https://service.weibo.com/share/share.php?title=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
            window.open(weiboUrl, '_blank', 'width=600,height=500');
            break;
        case 'xiaohongshu':
            showShareModal('xiaohongshu', title, fullText);
            break;
        case 'douyin':
            showShareModal('douyin', title, fullText);
            break;
        case 'copy':
            copyShareText(fullText);
            break;
    }
}

function showShareModal(platform, title, text) {
    const platformNames = {
        wechat: '微信',
        xiaohongshu: '小红书',
        douyin: '抖音'
    };
    const platformTips = {
        wechat: '复制下方文案，打开微信粘贴发送给好友',
        xiaohongshu: '复制下方文案，打开小红书发布笔记时粘贴',
        douyin: '复制下方文案，打开抖音分享时粘贴'
    };

    let overlay = document.getElementById('share-modal-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'share-modal-overlay';
        overlay.className = 'share-modal-overlay';
        overlay.onclick = function(e) {
            if (e.target === overlay) closeShareModal();
        };
        document.body.appendChild(overlay);
    }

    overlay.innerHTML = `
        <div class="share-modal">
            <h3>分享到${platformNames[platform]}</h3>
            <p>${platformTips[platform]}</p>
            <div class="share-text-box">${text}</div>
            <div class="share-modal-btns">
                <button class="btn-copy-text" onclick="copyShareText('${text.replace(/'/g, "\\'")}'); closeShareModal();">复制文案</button>
                <button class="btn-close-modal" onclick="closeShareModal()">关闭</button>
            </div>
        </div>
    `;

    requestAnimationFrame(() => {
        overlay.classList.add('active');
    });
}

function closeShareModal() {
    const overlay = document.getElementById('share-modal-overlay');
    if (overlay) {
        overlay.classList.remove('active');
    }
}

function copyShareText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showCopyToast('已复制到剪贴板');
        }).catch(() => {
            fallbackCopy(text);
        });
    } else {
        fallbackCopy(text);
    }
}

function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;left:-9999px;top:-9999px;opacity:0';
    document.body.appendChild(ta);
    ta.select();
    try {
        document.execCommand('copy');
        showCopyToast('已复制到剪贴板');
    } catch (e) {
        showCopyToast('复制失败，请手动复制');
    }
    document.body.removeChild(ta);
}

function showCopyToast(msg) {
    let toast = document.getElementById('copy-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'copy-toast';
        toast.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%) translateY(20px);background:rgba(16,185,129,0.95);color:#fff;padding:12px 28px;border-radius:12px;font-size:14px;font-weight:600;z-index:20000;pointer-events:none;opacity:0;transition:all 0.3s ease;backdrop-filter:blur(8px);box-shadow:0 4px 20px rgba(0,0,0,0.3)';
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
    });
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(20px)';
    }, 2000);
}

// ===== 下载PDF =====
async function downloadPDF() {
    const btn = document.querySelector('.btn-download');
    const origHTML = btn.innerHTML;
    btn.innerHTML = '⏳ 正在生成PDF...';
    btn.disabled = true;

    try {
        const { jsPDF } = window.jspdf;
        const reportEl = document.querySelector('.full-report');

        // 临时隐藏下载按钮
        btn.style.display = 'none';

        // 用 html2canvas 将报告页面截图
        const canvas = await html2canvas(reportEl, {
            scale: 2,
            useCORS: true,
            backgroundColor: '#0a0a1a',
            logging: false,
            windowWidth: 800
        });

        btn.style.display = '';

        const imgWidth = canvas.width;
        const imgHeight = canvas.height;

        // A4 宽度 210mm，根据图片宽高比计算总高度
        const pdfWidth = 210;
        const ratio = pdfWidth / imgWidth;
        const totalPdfHeight = imgHeight * ratio;

        // 创建自定义尺寸的 PDF：宽度A4，高度 = 内容实际高度（一整页，不切割）
        const pdf = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: [pdfWidth, totalPdfHeight]
        });

        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, totalPdfHeight);

        pdf.save('管理层级上限测试报告.pdf');
    } catch (err) {
        console.error('PDF生成失败:', err);
        alert('PDF生成失败，请稍后重试');
    }

    btn.innerHTML = origHTML;
    btn.disabled = false;
}

// ===== 粒子背景 =====
function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const particles = [];
    const particleCount = window.innerWidth < 640 ? 30 : 60;

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 0.5,
            alpha: Math.random() * 0.5 + 0.1
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(108, 92, 231, ${p.alpha})`;
            ctx.fill();
        });

        // 连线
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(108, 92, 231, ${0.1 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
}

// ===== 初始化 =====
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    animateStats();
    renderIndustryPage();
});
