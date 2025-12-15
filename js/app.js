// ========================================
// カタヅケ - メインアプリケーション
// ========================================

// アプリ状態
const App = {
    currentPage: 'home',
    hearingStep: 0,
    hearingAnswers: {},
    userData: null,
    tasks: [],
    currentTimeSlot: 'morning',
    deferredPrompt: null
};

// ========================================
// 初期化
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    loadUserData();
    setupEventListeners();
    updateGreeting();
    checkTimeSlot();

    if (App.userData && App.userData.hearingCompleted) {
        showDashboard();
        generateTasks();
        updateDashboard();
    }

    // PWAインストール
    setupPWA();

    // 1分ごとに時間帯をチェック
    setInterval(checkTimeSlot, 60000);
}

// ========================================
// データ管理
// ========================================
function loadUserData() {
    const saved = localStorage.getItem('katazuke_userData');
    if (saved) {
        App.userData = JSON.parse(saved);
    } else {
        App.userData = {
            hearingCompleted: false,
            profile: {},
            tasks: [],
            completedTasks: [],
            stats: {
                totalCompleted: 0,
                currentStreak: 0,
                maxStreak: 0,
                activeDays: [],
                morningCompleted: 0,
                eveningCompleted: 0,
                nightCompleted: 0,
                weekendCompleted: 0
            },
            settings: {
                notifications: false,
                morningStart: 6,
                eveningStart: 17,
                nightStart: 21,
                weekendDays: [0, 6]
            },
            lastVisit: null
        };
    }
}

function saveUserData() {
    localStorage.setItem('katazuke_userData', JSON.stringify(App.userData));
}

// ========================================
// イベントリスナー
// ========================================
function setupEventListeners() {
    // メニュー
    document.getElementById('menuBtn').addEventListener('click', toggleMenu);
    document.getElementById('overlay').addEventListener('click', closeMenu);

    // ナビゲーション
    document.querySelectorAll('.menu-list a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = e.target.dataset.page;
            navigateTo(page);
            closeMenu();
        });
    });

    // ヒアリング開始
    document.getElementById('startHearingBtn').addEventListener('click', startHearing);

    // ヒアリングナビゲーション
    document.getElementById('hearingNextBtn').addEventListener('click', nextHearingStep);
    document.getElementById('hearingBackBtn').addEventListener('click', prevHearingStep);

    // タスク操作
    document.getElementById('completeTaskBtn').addEventListener('click', completeCurrentTask);
    document.getElementById('skipTaskBtn').addEventListener('click', skipCurrentTask);

    // モーダル
    document.getElementById('closeModalBtn').addEventListener('click', closeModal);

    // 時間タブ
    document.querySelectorAll('.time-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            document.querySelectorAll('.time-tab').forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            renderTaskList(e.target.dataset.time);
        });
    });

    // Tipsカテゴリ
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderTips(e.target.dataset.category);
        });
    });

    // 設定
    document.getElementById('notificationToggle').addEventListener('change', toggleNotifications);
    document.getElementById('resetHearingBtn').addEventListener('click', resetHearing);
    document.getElementById('resetDataBtn').addEventListener('click', resetAllData);

    // インストールバナー
    document.getElementById('installBtn')?.addEventListener('click', installPWA);
    document.getElementById('closeInstallBanner')?.addEventListener('click', closeInstallBanner);
}

// ========================================
// ナビゲーション
// ========================================
function toggleMenu() {
    const menu = document.getElementById('sideMenu');
    const overlay = document.getElementById('overlay');
    const btn = document.getElementById('menuBtn');

    menu.classList.toggle('open');
    overlay.classList.toggle('show');
    btn.classList.toggle('active');
}

function closeMenu() {
    document.getElementById('sideMenu').classList.remove('open');
    document.getElementById('overlay').classList.remove('show');
    document.getElementById('menuBtn').classList.remove('active');
}

function navigateTo(page) {
    // メニューのアクティブ状態を更新
    document.querySelectorAll('.menu-list a').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === page) {
            link.classList.add('active');
        }
    });

    // ページ表示を切り替え
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

    switch (page) {
        case 'home':
            document.getElementById('homePage').classList.add('active');
            break;
        case 'tasks':
            document.getElementById('tasksPage').classList.add('active');
            renderTaskList(App.currentTimeSlot);
            break;
        case 'tips':
            document.getElementById('tipsPage').classList.add('active');
            renderTips('all');
            break;
        case 'progress':
            document.getElementById('progressPage').classList.add('active');
            renderProgress();
            break;
        case 'settings':
            document.getElementById('settingsPage').classList.add('active');
            loadSettings();
            break;
    }

    App.currentPage = page;
}

// ========================================
// ヒアリングシステム
// ========================================
function startHearing() {
    App.hearingStep = 0;
    App.hearingAnswers = {};

    document.getElementById('homePage').classList.remove('active');
    document.getElementById('hearingPage').classList.add('active');

    renderHearingStep();
}

function renderHearingStep() {
    const question = HEARING_QUESTIONS[App.hearingStep];
    const content = document.getElementById('hearingContent');
    const progress = document.getElementById('hearingProgressFill');
    const step = document.getElementById('hearingStep');
    const backBtn = document.getElementById('hearingBackBtn');
    const nextBtn = document.getElementById('hearingNextBtn');

    // 進捗更新
    const progressPercent = ((App.hearingStep + 1) / HEARING_QUESTIONS.length) * 100;
    progress.style.width = `${progressPercent}%`;
    step.textContent = `${App.hearingStep + 1}/${HEARING_QUESTIONS.length}`;

    // 戻るボタン表示
    backBtn.style.visibility = App.hearingStep === 0 ? 'hidden' : 'visible';

    // 次へボタンテキスト
    nextBtn.textContent = App.hearingStep === HEARING_QUESTIONS.length - 1 ? '完了' : '次へ';

    // 質問コンテンツ
    let optionsHtml = '';

    if (question.type === 'single') {
        optionsHtml = `<div class="hearing-options">
            ${question.options.map(opt => `
                <label class="hearing-option ${App.hearingAnswers[question.id] === opt.value ? 'selected' : ''}" data-value="${opt.value}">
                    <input type="radio" name="${question.id}" value="${opt.value}" ${App.hearingAnswers[question.id] === opt.value ? 'checked' : ''}>
                    <span class="option-icon">${opt.icon}</span>
                    <div>
                        <div class="option-text">${opt.text}</div>
                        ${opt.desc ? `<div class="option-desc">${opt.desc}</div>` : ''}
                    </div>
                </label>
            `).join('')}
        </div>`;
    } else {
        const selectedValues = App.hearingAnswers[question.id] || [];
        optionsHtml = `<div class="hearing-checkbox">
            ${question.options.map(opt => `
                <label class="checkbox-option ${selectedValues.includes(opt.value) ? 'selected' : ''}" data-value="${opt.value}">
                    <input type="checkbox" value="${opt.value}" ${selectedValues.includes(opt.value) ? 'checked' : ''}>
                    <span class="option-icon">${opt.icon}</span>
                    <span class="option-text">${opt.text}</span>
                </label>
            `).join('')}
        </div>`;
    }

    content.innerHTML = `
        <div class="hearing-question">
            <h3>${question.question}</h3>
            <p>${question.description}</p>
        </div>
        ${optionsHtml}
    `;

    // オプションクリックイベント
    if (question.type === 'single') {
        content.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                content.querySelectorAll('.hearing-option').forEach(o => o.classList.remove('selected'));
                const parent = e.target.closest('.hearing-option');
                parent.classList.add('selected');
                App.hearingAnswers[question.id] = e.target.value;
            });
        });
    } else {
        content.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const parent = e.target.closest('.checkbox-option');
                parent.classList.toggle('selected', e.target.checked);

                if (!App.hearingAnswers[question.id]) {
                    App.hearingAnswers[question.id] = [];
                }

                const value = e.target.value;
                if (e.target.checked) {
                    App.hearingAnswers[question.id].push(value);
                } else {
                    App.hearingAnswers[question.id] = App.hearingAnswers[question.id].filter(v => v !== value);
                }
            });
        });
    }
}

function nextHearingStep() {
    const question = HEARING_QUESTIONS[App.hearingStep];

    // バリデーション
    if (question.type === 'single' && !App.hearingAnswers[question.id]) {
        document.getElementById('hearingContent').classList.add('shake');
        setTimeout(() => {
            document.getElementById('hearingContent').classList.remove('shake');
        }, 500);
        return;
    }

    if (question.type === 'multi' && (!App.hearingAnswers[question.id] || App.hearingAnswers[question.id].length === 0)) {
        document.getElementById('hearingContent').classList.add('shake');
        setTimeout(() => {
            document.getElementById('hearingContent').classList.remove('shake');
        }, 500);
        return;
    }

    if (App.hearingStep < HEARING_QUESTIONS.length - 1) {
        App.hearingStep++;
        renderHearingStep();
    } else {
        completeHearing();
    }
}

function prevHearingStep() {
    if (App.hearingStep > 0) {
        App.hearingStep--;
        renderHearingStep();
    }
}

function completeHearing() {
    App.userData.hearingCompleted = true;
    App.userData.profile = App.hearingAnswers;
    saveUserData();

    document.getElementById('hearingPage').classList.remove('active');
    document.getElementById('homePage').classList.add('active');

    showDashboard();
    generateTasks();
    updateDashboard();
}

// ========================================
// ダッシュボード
// ========================================
function showDashboard() {
    document.getElementById('welcomeCard').style.display = 'none';
    document.getElementById('dashboard').style.display = 'flex';
}

function updateDashboard() {
    updateCurrentTask();
    updateProgress();
    updateDailyTip();
    updateStreak();
}

function updateCurrentTask() {
    const tasks = getTodayTasks().filter(t => !isTaskCompleted(t.id));
    const taskElement = document.getElementById('currentTask');
    const badge = document.getElementById('currentTimeBadge');

    // 時間帯バッジ更新
    const timeSlotNames = {
        morning: '朝',
        evening: '夕方',
        night: '夜',
        weekend: '休日'
    };
    badge.textContent = timeSlotNames[App.currentTimeSlot];
    badge.className = `time-badge ${App.currentTimeSlot}`;

    if (tasks.length > 0) {
        const task = tasks[0];
        taskElement.innerHTML = `
            <p class="task-name">${task.name}</p>
            <p class="task-duration">⏱️ 約${task.duration}分</p>
        `;
        App.currentTask = task;
    } else {
        taskElement.innerHTML = `
            <p class="task-name">🎉 すべて完了！</p>
            <p class="task-duration">お疲れ様でした</p>
        `;
        App.currentTask = null;
    }
}

function updateProgress() {
    const todayTasks = getTodayTasks();
    const completed = todayTasks.filter(t => isTaskCompleted(t.id)).length;
    const total = todayTasks.length;
    const percent = total > 0 ? (completed / total) * 100 : 0;

    document.getElementById('todayProgress').style.width = `${percent}%`;
    document.getElementById('completedCount').textContent = completed;
    document.getElementById('totalCount').textContent = total;
}

function updateDailyTip() {
    const today = new Date().toDateString();
    const tipIndex = hashString(today) % TIPS.length;
    document.getElementById('dailyTip').textContent = TIPS[tipIndex].content;
}

function updateStreak() {
    document.getElementById('streakCount').textContent = App.userData.stats.currentStreak;
}

function updateGreeting() {
    const hour = new Date().getHours();
    let greeting = 'こんにちは！';

    if (hour < 10) {
        greeting = 'おはようございます！';
    } else if (hour >= 17) {
        greeting = 'こんばんは！';
    }

    document.getElementById('userGreeting').textContent = greeting;
}

// ========================================
// タスク管理
// ========================================
function generateTasks() {
    const profile = App.userData.profile;
    App.tasks = {
        morning: [...TASK_TEMPLATES.morning.basic],
        evening: [...TASK_TEMPLATES.evening.basic],
        night: [...TASK_TEMPLATES.night.basic],
        weekend: [...TASK_TEMPLATES.weekend.basic]
    };

    // プロフィールに基づいてタスクをカスタマイズ
    if (profile.trouble_areas) {
        if (profile.trouble_areas.includes('kitchen')) {
            App.tasks.morning.push(...TASK_TEMPLATES.morning.kitchen);
            App.tasks.evening.push(...TASK_TEMPLATES.evening.kitchen);
        }
        if (profile.trouble_areas.includes('closet')) {
            App.tasks.night.push(...TASK_TEMPLATES.night.closet);
        }
    }

    if (profile.work_style === 'remote' || profile.work_style === 'flexible') {
        App.tasks.morning.push(...TASK_TEMPLATES.morning.remote);
    }

    if (profile.lifestyle === 'family_small' || profile.lifestyle === 'family_large') {
        App.tasks.evening.push(...TASK_TEMPLATES.evening.family);
    }

    if (profile.goal === 'minimalist') {
        App.tasks.weekend.push(...TASK_TEMPLATES.weekend.minimalist);
    } else {
        App.tasks.weekend.push(...TASK_TEMPLATES.weekend.deep.slice(0, 2));
    }

    // 利用可能時間に基づいてタスク数を調整
    const maxTasks = {
        minimal: 3,
        short: 5,
        medium: 7,
        long: 10
    };

    const limit = maxTasks[profile.available_time] || 5;

    Object.keys(App.tasks).forEach(slot => {
        App.tasks[slot] = App.tasks[slot].slice(0, limit);
    });
}

function getTodayTasks() {
    if (!App.tasks[App.currentTimeSlot]) {
        return [];
    }
    return App.tasks[App.currentTimeSlot];
}

function isTaskCompleted(taskId) {
    const today = new Date().toDateString();
    return App.userData.completedTasks.some(
        t => t.taskId === taskId && t.date === today
    );
}

function completeCurrentTask() {
    if (!App.currentTask) return;

    const today = new Date().toDateString();

    // タスクを完了として記録
    App.userData.completedTasks.push({
        taskId: App.currentTask.id,
        date: today,
        timeSlot: App.currentTimeSlot
    });

    // 統計更新
    App.userData.stats.totalCompleted++;

    // 時間帯別カウント
    switch (App.currentTimeSlot) {
        case 'morning':
            App.userData.stats.morningCompleted++;
            break;
        case 'evening':
            App.userData.stats.eveningCompleted++;
            break;
        case 'night':
            App.userData.stats.nightCompleted++;
            break;
        case 'weekend':
            App.userData.stats.weekendCompleted++;
            break;
    }

    // アクティブ日を記録
    if (!App.userData.stats.activeDays.includes(today)) {
        App.userData.stats.activeDays.push(today);
        updateStreak();
    }

    calculateStreak();
    saveUserData();

    // モーダル表示
    showCompleteModal();

    // ダッシュボード更新
    updateDashboard();
}

function skipCurrentTask() {
    if (!App.currentTask) return;

    // 現在のタスクを配列の最後に移動
    const currentTasks = App.tasks[App.currentTimeSlot];
    const index = currentTasks.findIndex(t => t.id === App.currentTask.id);

    if (index > -1) {
        const task = currentTasks.splice(index, 1)[0];
        currentTasks.push(task);
    }

    updateCurrentTask();
}

function calculateStreak() {
    const today = new Date();
    let streak = 0;
    let checkDate = new Date(today);

    while (true) {
        const dateStr = checkDate.toDateString();
        if (App.userData.stats.activeDays.includes(dateStr)) {
            streak++;
            checkDate.setDate(checkDate.getDate() - 1);
        } else {
            break;
        }
    }

    App.userData.stats.currentStreak = streak;

    if (streak > App.userData.stats.maxStreak) {
        App.userData.stats.maxStreak = streak;
    }
}

function checkTimeSlot() {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay();
    const settings = App.userData.settings;

    // 休日チェック
    if (settings.weekendDays.includes(day)) {
        App.currentTimeSlot = 'weekend';
    } else if (hour >= settings.morningStart && hour < settings.eveningStart) {
        App.currentTimeSlot = 'morning';
    } else if (hour >= settings.eveningStart && hour < settings.nightStart) {
        App.currentTimeSlot = 'evening';
    } else if (hour >= settings.nightStart || hour < settings.morningStart) {
        App.currentTimeSlot = 'night';
    }

    if (App.userData.hearingCompleted) {
        updateDashboard();
    }
}

// ========================================
// タスク一覧
// ========================================
function renderTaskList(timeSlot) {
    const container = document.getElementById('taskList');
    const tasks = App.tasks[timeSlot] || [];

    if (tasks.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📋</div>
                <p>タスクがありません</p>
            </div>
        `;
        return;
    }

    container.innerHTML = tasks.map(task => {
        const completed = isTaskCompleted(task.id);
        return `
            <div class="task-item ${completed ? 'completed' : ''}" data-id="${task.id}">
                <div class="task-checkbox ${completed ? 'checked' : ''}" onclick="toggleTask('${task.id}')"></div>
                <div class="task-info">
                    <h4>${task.name}</h4>
                    <p>${task.tip}</p>
                </div>
                <span class="task-duration-badge">${task.duration}分</span>
            </div>
        `;
    }).join('');
}

function toggleTask(taskId) {
    const today = new Date().toDateString();
    const existingIndex = App.userData.completedTasks.findIndex(
        t => t.taskId === taskId && t.date === today
    );

    if (existingIndex > -1) {
        // タスクの完了を取り消し
        App.userData.completedTasks.splice(existingIndex, 1);
        App.userData.stats.totalCompleted--;
    } else {
        // タスクを完了
        App.userData.completedTasks.push({
            taskId: taskId,
            date: today,
            timeSlot: App.currentTimeSlot
        });
        App.userData.stats.totalCompleted++;

        if (!App.userData.stats.activeDays.includes(today)) {
            App.userData.stats.activeDays.push(today);
        }
    }

    calculateStreak();
    saveUserData();

    // 表示更新
    const activeTab = document.querySelector('.time-tab.active');
    renderTaskList(activeTab.dataset.time);
    updateDashboard();
}

// ========================================
// Tips
// ========================================
function renderTips(category) {
    const container = document.getElementById('tipsList');
    const filteredTips = category === 'all'
        ? TIPS
        : TIPS.filter(t => t.category === category);

    const categoryNames = {
        basic: '基本',
        maintain: '維持',
        mindset: 'マインド',
        quick: '時短'
    };

    container.innerHTML = filteredTips.map(tip => `
        <div class="tip-item">
            <div class="tip-item-header">
                <span class="tip-item-icon">${tip.icon}</span>
                <span class="tip-item-title">${tip.title}</span>
                <span class="tip-item-category">${categoryNames[tip.category]}</span>
            </div>
            <div class="tip-item-content">${tip.content}</div>
        </div>
    `).join('');
}

// ========================================
// 進捗
// ========================================
function renderProgress() {
    // 統計
    document.getElementById('totalCompleted').textContent = App.userData.stats.totalCompleted;
    document.getElementById('maxStreak').textContent = App.userData.stats.maxStreak;
    document.getElementById('activeDays').textContent = App.userData.stats.activeDays.length;

    // レベル
    const level = LEVELS.slice().reverse().find(l => App.userData.stats.totalCompleted >= l.minTasks);
    document.getElementById('currentLevel').textContent = level ? level.name : '初心者';

    // カレンダー
    renderCalendar();

    // バッジ
    renderBadges();
}

function renderCalendar() {
    const container = document.getElementById('calendar');
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDayOfWeek = firstDay.getDay();

    const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
    const dayNames = ['日', '月', '火', '水', '木', '金', '土'];

    let html = `
        <div class="calendar-header">
            <span class="calendar-month">${year}年 ${monthNames[month]}</span>
        </div>
        <div class="calendar-grid">
            ${dayNames.map(d => `<div class="calendar-day-header">${d}</div>`).join('')}
    `;

    // 空白
    for (let i = 0; i < startDayOfWeek; i++) {
        html += '<div class="calendar-day other-month"></div>';
    }

    // 日付
    for (let day = 1; day <= lastDay.getDate(); day++) {
        const date = new Date(year, month, day);
        const dateStr = date.toDateString();
        const isToday = dateStr === now.toDateString();
        const hasActivity = App.userData.stats.activeDays.includes(dateStr);

        let classes = 'calendar-day';
        if (isToday) classes += ' today';
        if (hasActivity) classes += ' has-activity';

        html += `<div class="${classes}">${day}</div>`;
    }

    html += '</div>';
    container.innerHTML = html;
}

function renderBadges() {
    const container = document.getElementById('badgesGrid');
    const stats = App.userData.stats;

    container.innerHTML = BADGES.map(badge => {
        let earned = false;

        switch (badge.type) {
            case 'total':
                earned = stats.totalCompleted >= badge.threshold;
                break;
            case 'streak':
                earned = stats.maxStreak >= badge.threshold;
                break;
            case 'morning':
                earned = stats.morningCompleted >= badge.threshold;
                break;
            case 'night':
                earned = stats.nightCompleted >= badge.threshold;
                break;
            case 'weekend':
                earned = stats.weekendCompleted >= badge.threshold;
                break;
        }

        return `
            <div class="badge-item ${earned ? '' : 'locked'}">
                <div class="badge-icon">${badge.icon}</div>
                <div class="badge-name">${badge.name}</div>
            </div>
        `;
    }).join('');
}

// ========================================
// 設定
// ========================================
function loadSettings() {
    const settings = App.userData.settings;

    document.getElementById('notificationToggle').checked = settings.notifications;
    document.getElementById('morningTime').value = settings.morningStart;
    document.getElementById('eveningTime').value = settings.eveningStart;
    document.getElementById('nightTime').value = settings.nightStart;

    // 休日設定
    document.querySelectorAll('#weekendDays input').forEach(cb => {
        cb.checked = settings.weekendDays.includes(parseInt(cb.value));
        cb.addEventListener('change', saveWeekendDays);
    });

    // 時間設定変更
    ['morningTime', 'eveningTime', 'nightTime'].forEach(id => {
        document.getElementById(id).addEventListener('change', (e) => {
            const key = id.replace('Time', 'Start');
            App.userData.settings[key] = parseInt(e.target.value);
            saveUserData();
        });
    });
}

function toggleNotifications() {
    const enabled = document.getElementById('notificationToggle').checked;

    if (enabled && 'Notification' in window) {
        Notification.requestPermission().then(permission => {
            App.userData.settings.notifications = permission === 'granted';
            document.getElementById('notificationToggle').checked = permission === 'granted';
            saveUserData();
        });
    } else {
        App.userData.settings.notifications = false;
        saveUserData();
    }
}

function saveWeekendDays() {
    const days = [];
    document.querySelectorAll('#weekendDays input:checked').forEach(cb => {
        days.push(parseInt(cb.value));
    });
    App.userData.settings.weekendDays = days;
    saveUserData();
}

function resetHearing() {
    if (confirm('ヒアリングをやり直しますか？タスクが再生成されます。')) {
        App.userData.hearingCompleted = false;
        App.userData.profile = {};
        saveUserData();

        document.getElementById('dashboard').style.display = 'none';
        document.getElementById('welcomeCard').style.display = 'block';

        navigateTo('home');
    }
}

function resetAllData() {
    if (confirm('すべてのデータを削除しますか？この操作は取り消せません。')) {
        localStorage.removeItem('katazuke_userData');
        location.reload();
    }
}

// ========================================
// モーダル
// ========================================
function showCompleteModal() {
    const modal = document.getElementById('completeModal');
    const message = document.getElementById('completeMessage');

    message.textContent = ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)];
    modal.classList.add('show');
}

function closeModal() {
    document.getElementById('completeModal').classList.remove('show');
}

// ========================================
// PWA
// ========================================
function setupPWA() {
    // Service Workerの登録
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js').catch(err => {
            console.log('Service Worker registration failed:', err);
        });
    }

    // インストールプロンプト
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        App.deferredPrompt = e;

        // iOSでない場合のみバナー表示
        if (!isIOS()) {
            document.getElementById('installBanner').style.display = 'flex';
        }
    });

    // iOS用のインストール案内
    if (isIOS() && !isStandalone()) {
        setTimeout(() => {
            document.getElementById('installBanner').style.display = 'flex';
            document.getElementById('installBanner').querySelector('p').textContent =
                'ホーム画面に追加：共有ボタン → ホーム画面に追加';
        }, 3000);
    }
}

function installPWA() {
    if (App.deferredPrompt) {
        App.deferredPrompt.prompt();
        App.deferredPrompt.userChoice.then(() => {
            App.deferredPrompt = null;
            document.getElementById('installBanner').style.display = 'none';
        });
    }
}

function closeInstallBanner() {
    document.getElementById('installBanner').style.display = 'none';
}

function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
}

function isStandalone() {
    return window.matchMedia('(display-mode: standalone)').matches ||
        window.navigator.standalone === true;
}

// ========================================
// ユーティリティ
// ========================================
function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return Math.abs(hash);
}

// グローバル関数として公開
window.toggleTask = toggleTask;
