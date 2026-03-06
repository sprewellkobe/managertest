// ===== 下载码管理中心（Supabase 版） =====

const DEFAULT_PASSWORD = '123456';
const PAGE_SIZE = 20;

let allCodes = [];
let filteredCodes = [];
let currentPage = 1;
let selectedIds = new Set();

// ===== 初始化 =====
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.admin-container').style.display = 'none';
    document.getElementById('login-overlay').style.display = 'flex';
    document.getElementById('login-password').focus();
});

// ===== 登录逻辑 =====
async function handleLogin() {
    const input = document.getElementById('login-password').value;
    const errorEl = document.getElementById('login-error');

    if (!input) {
        errorEl.textContent = '请输入密码';
        return;
    }

    try {
        const sb = getSupabase();

        // 从 Supabase 获取密码和修改标记
        const { data: pwdRow } = await sb
            .from('admin_settings')
            .select('value')
            .eq('key', 'admin_password')
            .maybeSingle();

        const { data: changedRow } = await sb
            .from('admin_settings')
            .select('value')
            .eq('key', 'pwd_changed')
            .maybeSingle();

        const savedPwd = pwdRow ? pwdRow.value : null;
        const pwdChanged = changedRow ? changedRow.value === 'true' : false;

        let valid = false;
        if (pwdChanged && savedPwd) {
            valid = (input === savedPwd);
        } else {
            valid = (input === DEFAULT_PASSWORD) || (savedPwd && input === savedPwd);
        }

        if (!valid) {
            errorEl.textContent = '密码错误，请重试';
            shakeInput('login-password');
            return;
        }

        errorEl.textContent = '';

        if (!pwdChanged) {
            document.getElementById('login-form').style.display = 'none';
            document.getElementById('change-pwd-form').style.display = 'block';
            document.getElementById('new-password').focus();
            return;
        }

        enterAdmin();
    } catch (err) {
        console.error('Login error:', err);
        // 回退到默认密码验证
        if (input === DEFAULT_PASSWORD) {
            enterAdmin();
        } else {
            errorEl.textContent = '登录失败，请重试';
        }
    }
}

// ===== 修改密码 =====
async function handleChangePwd() {
    const newPwd = document.getElementById('new-password').value;
    const confirmPwd = document.getElementById('confirm-password').value;
    const errorEl = document.getElementById('change-pwd-error');

    if (!newPwd) { errorEl.textContent = '请输入新密码'; return; }
    if (newPwd.length < 6) { errorEl.textContent = '密码长度至少6位'; return; }
    if (newPwd === DEFAULT_PASSWORD) { errorEl.textContent = '新密码不能与初始密码相同'; return; }
    if (newPwd !== confirmPwd) { errorEl.textContent = '两次输入的密码不一致'; return; }

    try {
        const sb = getSupabase();
        await sb.from('admin_settings').upsert({ key: 'admin_password', value: newPwd, updated_at: new Date().toISOString() });
        await sb.from('admin_settings').upsert({ key: 'pwd_changed', value: 'true', updated_at: new Date().toISOString() });
        enterAdmin();
    } catch (err) {
        console.error('Change password error:', err);
        errorEl.textContent = '保存密码失败，请重试';
    }
}

// ===== 进入管理后台 =====
async function enterAdmin() {
    document.getElementById('login-overlay').style.display = 'none';
    document.querySelector('.admin-container').style.display = 'flex';

    await loadCodes();
    if (allCodes.length === 0) {
        await initializeCodes(100);
    }
    refreshAll();
    showToast('登录成功', 'success');
}

function shakeInput(id) {
    const el = document.getElementById(id);
    el.style.animation = 'shake 0.5s ease';
    setTimeout(() => { el.style.animation = ''; }, 500);
}

// ===== 数据加载/保存（Supabase） =====
async function loadCodes() {
    try {
        const sb = getSupabase();
        const { data, error } = await sb
            .from('download_codes')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) throw error;
        allCodes = (data || []).map(row => ({
            id: row.id,
            code: row.code,
            status: row.status,
            createdAt: row.created_at,
            usedAt: row.used_at,
            tag: row.tag || ''
        }));
    } catch (err) {
        console.error('Load codes error:', err);
        allCodes = [];
    }
}

// ===== 生成下载码算法 =====
function generateCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let middle = '';
    for (let j = 0; j < 4; j++) {
        middle += chars[Math.floor(Math.random() * chars.length)];
    }
    let sum = 0;
    for (let j = 0; j < middle.length; j++) {
        sum += middle.charCodeAt(j);
    }
    const checksum = String((sum * 7) % 1000).padStart(3, '0');
    return 'MGR' + middle + checksum;
}

function generateUniqueCode(existingSet) {
    let code;
    let attempts = 0;
    do {
        code = generateCode();
        attempts++;
    } while (existingSet.has(code) && attempts < 1000);
    return code;
}

// ===== 初始化下载码 =====
async function initializeCodes(count) {
    const existingSet = new Set(allCodes.map(c => c.code));
    const now = new Date().toISOString();
    const rows = [];
    for (let i = 0; i < count; i++) {
        const code = generateUniqueCode(existingSet);
        existingSet.add(code);
        rows.push({
            code: code,
            status: 'unused',
            tag: '初始批次',
            created_at: now,
            used_at: null
        });
    }

    try {
        const sb = getSupabase();
        const { error } = await sb.from('download_codes').insert(rows);
        if (error) throw error;
        await loadCodes();
        showToast('已初始化 100 个下载码', 'success');
    } catch (err) {
        console.error('Initialize codes error:', err);
        showToast('初始化失败', 'error');
    }
}

// ===== 刷新所有视图 =====
function refreshAll() {
    updateStats();
    filterCodes();
}

// ===== 统计概览 =====
function updateStats() {
    const total = allCodes.length;
    const unused = allCodes.filter(c => c.status === 'unused').length;
    const used = allCodes.filter(c => c.status === 'used').length;
    const disabled = allCodes.filter(c => c.status === 'disabled').length;

    document.getElementById('stat-total').textContent = total;
    document.getElementById('stat-unused').textContent = unused;
    document.getElementById('stat-used').textContent = used;
    document.getElementById('stat-disabled').textContent = disabled;
}

// ===== 排序 =====
let sortField = 'createdAt';
let sortDir = 'desc';

function toggleSort(field) {
    if (sortField === field) {
        sortDir = sortDir === 'asc' ? 'desc' : 'asc';
    } else {
        sortField = field;
        sortDir = 'desc';
    }
    updateSortArrows();
    applySortAndRender();
}

function updateSortArrows() {
    ['status', 'createdAt', 'usedAt'].forEach(f => {
        const el = document.getElementById('sort-arrow-' + f);
        if (!el) return;
        if (f === sortField) {
            el.textContent = sortDir === 'asc' ? '▲' : '▼';
            el.classList.add('sort-active');
        } else {
            el.textContent = '⇅';
            el.classList.remove('sort-active');
        }
    });
}

function applySortAndRender() {
    const statusOrder = { unused: 0, used: 1, disabled: 2 };
    const dir = sortDir === 'asc' ? 1 : -1;

    filteredCodes.sort((a, b) => {
        if (sortField === 'status') {
            return (statusOrder[a.status] - statusOrder[b.status]) * dir;
        }
        if (sortField === 'createdAt') {
            return (new Date(a.createdAt) - new Date(b.createdAt)) * dir;
        }
        if (sortField === 'usedAt') {
            const tA = a.usedAt ? new Date(a.usedAt).getTime() : 0;
            const tB = b.usedAt ? new Date(b.usedAt).getTime() : 0;
            return (tA - tB) * dir;
        }
        return 0;
    });

    currentPage = 1;
    renderCodesTable();
    renderPagination();
}

// ===== 下载码列表 =====
function filterCodes() {
    const search = (document.getElementById('search-code')?.value || '').trim().toUpperCase();
    const status = document.getElementById('filter-status')?.value || 'all';

    filteredCodes = allCodes.filter(c => {
        const matchSearch = !search || c.code.includes(search) || (c.tag && c.tag.includes(search));
        const matchStatus = status === 'all' || c.status === status;
        return matchSearch && matchStatus;
    });

    updateSortArrows();
    applySortAndRender();
}

function renderCodesTable() {
    const tbody = document.getElementById('codes-table-body');
    if (!tbody) return;

    const start = (currentPage - 1) * PAGE_SIZE;
    const pageData = filteredCodes.slice(start, start + PAGE_SIZE);

    if (pageData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="empty-msg">暂无数据</td></tr>';
        return;
    }

    tbody.innerHTML = pageData.map((c, i) => `
        <tr class="${selectedIds.has(c.id) ? 'row-selected' : ''}">
            <td><input type="checkbox" ${selectedIds.has(c.id) ? 'checked' : ''} onchange="toggleSelect('${c.id}')"></td>
            <td class="text-dim">${start + i + 1}</td>
            <td><code class="code-text">${c.code}</code>
                <button class="btn-icon" onclick="copyCode('${c.code}')" title="复制">📋</button>
                ${c.tag ? `<span class="code-tag">${c.tag}</span>` : ''}
            </td>
            <td>${getStatusBadge(c.status)}</td>
            <td class="text-dim">${formatTime(c.createdAt)}</td>
            <td class="text-dim">${c.usedAt ? formatTime(c.usedAt) : '-'}</td>
            <td>
                ${c.status === 'unused' ? `<button class="btn btn-sm btn-outline" onclick="markUsed('${c.id}')">标记已用</button>` : ''}
                ${c.status === 'unused' ? `<button class="btn btn-sm btn-danger-outline" onclick="disableCode('${c.id}')">禁用</button>` : ''}
                ${c.status === 'disabled' ? `<button class="btn btn-sm btn-outline" onclick="enableCode('${c.id}')">启用</button>` : ''}
                ${c.status === 'used' ? `<button class="btn btn-sm btn-outline" onclick="resetCode('${c.id}')">重置</button>` : ''}
            </td>
        </tr>
    `).join('');
}

function renderPagination() {
    const container = document.getElementById('pagination');
    if (!container) return;

    const totalPages = Math.ceil(filteredCodes.length / PAGE_SIZE);
    if (totalPages <= 1) { container.innerHTML = ''; return; }

    let html = `<span class="page-info">共 ${filteredCodes.length} 条，第 ${currentPage}/${totalPages} 页</span>`;
    html += `<button class="btn btn-sm btn-outline" ${currentPage <= 1 ? 'disabled' : ''} onclick="goPage(${currentPage - 1})">上一页</button>`;

    for (let i = 1; i <= totalPages; i++) {
        if (totalPages > 7 && Math.abs(i - currentPage) > 2 && i !== 1 && i !== totalPages) {
            if (i === currentPage - 3 || i === currentPage + 3) html += '<span class="page-dots">...</span>';
            continue;
        }
        html += `<button class="btn btn-sm ${i === currentPage ? 'btn-primary' : 'btn-outline'}" onclick="goPage(${i})">${i}</button>`;
    }

    html += `<button class="btn btn-sm btn-outline" ${currentPage >= totalPages ? 'disabled' : ''} onclick="goPage(${currentPage + 1})">下一页</button>`;
    container.innerHTML = html;
}

function goPage(page) {
    const totalPages = Math.ceil(filteredCodes.length / PAGE_SIZE);
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    renderCodesTable();
    renderPagination();
}

// ===== 选择操作 =====
function toggleSelect(id) {
    if (selectedIds.has(id)) selectedIds.delete(id);
    else selectedIds.add(id);
    renderCodesTable();
}

function toggleSelectAll() {
    const start = (currentPage - 1) * PAGE_SIZE;
    const pageData = filteredCodes.slice(start, start + PAGE_SIZE);
    const allSelected = pageData.every(c => selectedIds.has(c.id));

    if (allSelected) {
        pageData.forEach(c => selectedIds.delete(c.id));
    } else {
        pageData.forEach(c => selectedIds.add(c.id));
    }
    renderCodesTable();
}

// ===== 状态操作（Supabase） =====
async function markUsed(id) {
    try {
        const sb = getSupabase();
        const { error } = await sb
            .from('download_codes')
            .update({ status: 'used', used_at: new Date().toISOString() })
            .eq('id', id);
        if (error) throw error;
        const code = allCodes.find(c => c.id === id);
        if (code) { code.status = 'used'; code.usedAt = new Date().toISOString(); }
        refreshAll();
        showToast(`${code?.code || ''} 已标记为已使用`, 'success');
    } catch (err) {
        console.error('markUsed error:', err);
        showToast('操作失败', 'error');
    }
}

async function disableCode(id) {
    try {
        const sb = getSupabase();
        const { error } = await sb
            .from('download_codes')
            .update({ status: 'disabled' })
            .eq('id', id);
        if (error) throw error;
        const code = allCodes.find(c => c.id === id);
        if (code) code.status = 'disabled';
        refreshAll();
        showToast(`${code?.code || ''} 已禁用`, 'warning');
    } catch (err) {
        console.error('disableCode error:', err);
        showToast('操作失败', 'error');
    }
}

async function enableCode(id) {
    try {
        const sb = getSupabase();
        const { error } = await sb
            .from('download_codes')
            .update({ status: 'unused', used_at: null })
            .eq('id', id);
        if (error) throw error;
        const code = allCodes.find(c => c.id === id);
        if (code) { code.status = 'unused'; code.usedAt = null; }
        refreshAll();
        showToast(`${code?.code || ''} 已重新启用`, 'success');
    } catch (err) {
        console.error('enableCode error:', err);
        showToast('操作失败', 'error');
    }
}

async function resetCode(id) {
    try {
        const sb = getSupabase();
        const { error } = await sb
            .from('download_codes')
            .update({ status: 'unused', used_at: null })
            .eq('id', id);
        if (error) throw error;
        const code = allCodes.find(c => c.id === id);
        if (code) { code.status = 'unused'; code.usedAt = null; }
        refreshAll();
        showToast(`${code?.code || ''} 已重置为未使用`, 'success');
    } catch (err) {
        console.error('resetCode error:', err);
        showToast('操作失败', 'error');
    }
}

async function batchDisable() {
    if (selectedIds.size === 0) {
        showToast('请先选择下载码', 'warning');
        return;
    }
    if (!confirm(`确定禁用选中的 ${selectedIds.size} 个下载码？`)) return;

    try {
        const sb = getSupabase();
        const ids = Array.from(selectedIds);
        const { error } = await sb
            .from('download_codes')
            .update({ status: 'disabled' })
            .in('id', ids)
            .eq('status', 'unused');
        if (error) throw error;

        ids.forEach(id => {
            const code = allCodes.find(c => c.id === id);
            if (code && code.status === 'unused') code.status = 'disabled';
        });
        selectedIds.clear();
        refreshAll();
        showToast('批量禁用完成', 'success');
    } catch (err) {
        console.error('batchDisable error:', err);
        showToast('批量操作失败', 'error');
    }
}

// ===== 生成新下载码 =====
async function generateNewCodes() {
    const count = parseInt(document.getElementById('gen-count').value) || 20;
    const tag = document.getElementById('gen-tag').value.trim() || '';

    if (count < 1 || count > 500) {
        showToast('数量范围 1-500', 'error');
        return;
    }

    const existingSet = new Set(allCodes.map(c => c.code));
    const now = new Date().toISOString();
    const rows = [];

    for (let i = 0; i < count; i++) {
        const code = generateUniqueCode(existingSet);
        existingSet.add(code);
        rows.push({
            code: code,
            status: 'unused',
            tag: tag || `批次 ${new Date().toLocaleDateString()}`,
            created_at: now,
            used_at: null
        });
    }

    try {
        const sb = getSupabase();
        const { data, error } = await sb.from('download_codes').insert(rows).select();
        if (error) throw error;

        const newCodes = (data || rows).map(r => ({ code: r.code }));
        await loadCodes();
        refreshAll();

        const resultDiv = document.getElementById('gen-result');
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = `
            <div class="gen-success">
                <p>✅ 成功生成 <strong>${count}</strong> 个下载码</p>
                <div class="gen-codes-preview">
                    ${newCodes.slice(0, 10).map(c => `<code>${c.code}</code>`).join('')}
                    ${count > 10 ? `<span class="text-dim">... 等共 ${count} 个</span>` : ''}
                </div>
                <button class="btn btn-outline btn-sm" onclick="copyNewCodes('${newCodes.map(c=>c.code).join(',')}')">📋 复制全部新码</button>
            </div>
        `;

        showToast(`成功生成 ${count} 个下载码`, 'success');
    } catch (err) {
        console.error('Generate codes error:', err);
        showToast('生成失败', 'error');
    }
}

function copyNewCodes(codesStr) {
    const codes = codesStr.split(',');
    navigator.clipboard.writeText(codes.join('\n')).then(() => {
        showToast('已复制到剪贴板', 'success');
    });
}

// ===== 导出 =====
function exportCodes() {
    if (filteredCodes.length === 0) {
        showToast('没有数据可导出', 'warning');
        return;
    }
    const data = filteredCodes.map(c => ({
        下载码: c.code,
        状态: c.status === 'unused' ? '未使用' : c.status === 'used' ? '已使用' : '已禁用',
        标签: c.tag || '',
        创建时间: formatTime(c.createdAt),
        使用时间: c.usedAt ? formatTime(c.usedAt) : ''
    }));

    const headers = Object.keys(data[0]);
    const csv = [headers.join(',')].concat(data.map(row => headers.map(h => `"${row[h]}"`).join(','))).join('\n');

    downloadFile(`下载码_${new Date().toLocaleDateString()}.csv`, '\uFEFF' + csv, 'text/csv');
    showToast('导出成功', 'success');
}

function copyAllUnused() {
    const unused = allCodes.filter(c => c.status === 'unused').map(c => c.code);
    if (unused.length === 0) {
        showToast('没有未使用的下载码', 'warning');
        return;
    }
    navigator.clipboard.writeText(unused.join('\n')).then(() => {
        showToast(`已复制 ${unused.length} 个未使用下载码`, 'success');
    });
}

function exportAllData() {
    const json = JSON.stringify(allCodes, null, 2);
    downloadFile(`下载码数据_${new Date().toLocaleDateString()}.json`, json, 'application/json');
    showToast('数据导出成功', 'success');
}

function importData() {
    document.getElementById('import-file').click();
}

async function handleImport(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
        try {
            const data = JSON.parse(e.target.result);
            if (!Array.isArray(data)) throw new Error('格式错误');
            if (!confirm(`确定导入 ${data.length} 条数据？将与现有数据合并。`)) return;

            const existingSet = new Set(allCodes.map(c => c.code));
            const rows = [];
            data.forEach(item => {
                if (item.code && !existingSet.has(item.code)) {
                    existingSet.add(item.code);
                    rows.push({
                        code: item.code,
                        status: item.status || 'unused',
                        tag: item.tag || '',
                        created_at: item.createdAt || item.created_at || new Date().toISOString(),
                        used_at: item.usedAt || item.used_at || null
                    });
                }
            });

            if (rows.length > 0) {
                const sb = getSupabase();
                const { error } = await sb.from('download_codes').insert(rows);
                if (error) throw error;
            }

            await loadCodes();
            refreshAll();
            showToast(`成功导入 ${rows.length} 条新数据`, 'success');
        } catch (err) {
            console.error('Import error:', err);
            showToast('导入失败：数据格式错误', 'error');
        }
    };
    reader.readAsText(file);
    event.target.value = '';
}

function downloadFile(filename, content, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

// ===== 设置 =====
async function savePassword() {
    const pwd = document.getElementById('admin-password').value.trim();
    if (!pwd) { showToast('请输入新密码', 'warning'); return; }
    if (pwd.length < 6) { showToast('密码长度至少6位', 'warning'); return; }
    if (pwd === DEFAULT_PASSWORD) { showToast('不能使用初始密码', 'warning'); return; }

    try {
        const sb = getSupabase();
        await sb.from('admin_settings').upsert({ key: 'admin_password', value: pwd, updated_at: new Date().toISOString() });
        await sb.from('admin_settings').upsert({ key: 'pwd_changed', value: 'true', updated_at: new Date().toISOString() });
        showToast('密码已更新', 'success');
        document.getElementById('admin-password').value = '';
    } catch (err) {
        console.error('Save password error:', err);
        showToast('密码更新失败', 'error');
    }
}

async function resetAllData() {
    if (!confirm('确定要重置所有数据？此操作不可恢复！')) return;
    if (!confirm('再次确认：所有下载码数据将被永久删除！')) return;

    try {
        const sb = getSupabase();
        const { error } = await sb.from('download_codes').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        if (error) throw error;
        allCodes = [];
        refreshAll();
        showToast('所有数据已重置', 'warning');
    } catch (err) {
        console.error('Reset error:', err);
        showToast('重置失败', 'error');
    }
}

// ===== Tab 切换 =====
function switchTab(tabName, el) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

    document.getElementById(`tab-${tabName}`).classList.add('active');
    if (el) el.classList.add('active');

    const titles = { codes: '下载码管理', generate: '生成下载码', settings: '系统设置' };
    document.getElementById('page-title').textContent = titles[tabName] || '';

    if (tabName === 'codes') { updateStats(); filterCodes(); }
}

// ===== 侧边栏 =====
function toggleSidebar() {
    document.querySelector('.sidebar').classList.toggle('show');
}

// ===== 工具函数 =====
function copyCode(code) {
    navigator.clipboard.writeText(code).then(() => showToast('已复制', 'success'));
}

function getStatusBadge(status) {
    const map = {
        unused: '<span class="status-badge status-unused">未使用</span>',
        used: '<span class="status-badge status-used">已使用</span>',
        disabled: '<span class="status-badge status-disabled">已禁用</span>'
    };
    return map[status] || status;
}

function formatTime(iso) {
    if (!iso) return '-';
    const d = new Date(iso);
    const pad = n => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
    toast.innerHTML = `<span>${icons[type] || ''} ${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
