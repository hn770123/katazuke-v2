// ========================================
// カタヅケ - データ定義
// ========================================

// ヒアリング質問
const HEARING_QUESTIONS = [
    {
        id: 'lifestyle',
        question: 'あなたの生活スタイルは？',
        description: '普段の生活パターンを教えてください',
        type: 'single',
        options: [
            { value: 'single', icon: '👤', text: '一人暮らし', desc: '自分のペースで片付けできる' },
            { value: 'couple', icon: '👫', text: '二人暮らし', desc: 'パートナーと協力して' },
            { value: 'family_small', icon: '👨‍👩‍👧', text: '小さい子どもがいる', desc: '子どもがいると散らかりがち' },
            { value: 'family_large', icon: '👨‍👩‍👧‍👦', text: '大きい子どもがいる', desc: '家族みんなで協力' }
        ]
    },
    {
        id: 'work_style',
        question: 'お仕事のスタイルは？',
        description: '在宅かどうかで片付けのタイミングが変わります',
        type: 'single',
        options: [
            { value: 'office', icon: '🏢', text: '出社メイン', desc: '日中は家を空ける' },
            { value: 'remote', icon: '🏠', text: '在宅ワーク', desc: '家で過ごす時間が長い' },
            { value: 'hybrid', icon: '🔄', text: 'ハイブリッド', desc: '出社と在宅が混在' },
            { value: 'flexible', icon: '⏰', text: '自由業・フレックス', desc: '時間の融通がきく' },
            { value: 'homemaker', icon: '🏡', text: '専業主婦/主夫', desc: '家事が中心' }
        ]
    },
    {
        id: 'trouble_areas',
        question: '特に散らかりやすい場所は？',
        description: '複数選択できます',
        type: 'multi',
        options: [
            { value: 'living', icon: '🛋️', text: 'リビング' },
            { value: 'kitchen', icon: '🍳', text: 'キッチン' },
            { value: 'bedroom', icon: '🛏️', text: '寝室' },
            { value: 'closet', icon: '👕', text: 'クローゼット' },
            { value: 'bathroom', icon: '🚿', text: '洗面所/お風呂' },
            { value: 'entrance', icon: '🚪', text: '玄関' },
            { value: 'desk', icon: '💻', text: 'デスク周り' },
            { value: 'storage', icon: '📦', text: '収納スペース' }
        ]
    },
    {
        id: 'available_time',
        question: '片付けに使える時間は？',
        description: '1日あたりの隙間時間を教えてください',
        type: 'single',
        options: [
            { value: 'minimal', icon: '⚡', text: '5分程度', desc: '忙しくて時間がない' },
            { value: 'short', icon: '🕐', text: '10〜15分', desc: '少しなら確保できる' },
            { value: 'medium', icon: '🕑', text: '20〜30分', desc: 'ある程度の時間がある' },
            { value: 'long', icon: '🕒', text: '30分以上', desc: 'しっかり時間を取れる' }
        ]
    },
    {
        id: 'goal',
        question: '片付けの目標は？',
        description: 'どんな状態を目指したいですか',
        type: 'single',
        options: [
            { value: 'maintain', icon: '✨', text: 'キレイを維持したい', desc: '今の状態を保つ' },
            { value: 'improve', icon: '📈', text: '少しずつ改善したい', desc: '無理なく良くしていく' },
            { value: 'organize', icon: '🗂️', text: '整理整頓を習慣化', desc: '片付けを習慣に' },
            { value: 'minimalist', icon: '🌿', text: 'モノを減らしたい', desc: 'スッキリした暮らし' }
        ]
    },
    {
        id: 'challenge',
        question: '片付けで困っていることは？',
        description: '複数選択できます',
        type: 'multi',
        options: [
            { value: 'start', icon: '😫', text: 'やる気が出ない' },
            { value: 'time', icon: '⏰', text: '時間がない' },
            { value: 'method', icon: '❓', text: 'やり方がわからない' },
            { value: 'discard', icon: '🗑️', text: '捨てられない' },
            { value: 'maintain', icon: '🔄', text: '維持できない' },
            { value: 'family', icon: '👨‍👩‍👧', text: '家族が協力しない' }
        ]
    }
];

// タスクテンプレート
const TASK_TEMPLATES = {
    morning: {
        basic: [
            { id: 'm1', name: 'ベッドを整える', duration: 2, area: 'bedroom', tip: 'シーツを引っ張って枕を整えるだけでOK' },
            { id: 'm2', name: '洗面台を拭く', duration: 1, area: 'bathroom', tip: '使ったタオルでサッと拭くだけ' },
            { id: 'm3', name: 'テーブルの上を片付ける', duration: 3, area: 'living', tip: '定位置に戻すだけで見違える' },
            { id: 'm4', name: 'ゴミをまとめる', duration: 2, area: 'kitchen', tip: '曜日ごとのゴミ出しを習慣に' },
            { id: 'm5', name: '靴を揃える', duration: 1, area: 'entrance', tip: 'たった30秒で玄関が整う' }
        ],
        kitchen: [
            { id: 'mk1', name: '食器を片付ける', duration: 5, area: 'kitchen', tip: '朝食後すぐに洗うと汚れが落ちやすい' },
            { id: 'mk2', name: 'シンクを拭く', duration: 1, area: 'kitchen', tip: '水滴を拭くだけで清潔感アップ' },
            { id: 'mk3', name: 'コンロ周りをサッと拭く', duration: 2, area: 'kitchen', tip: '油汚れは温かいうちに' }
        ],
        remote: [
            { id: 'mr1', name: 'デスク周りを整える', duration: 3, area: 'desk', tip: '仕事前の整理で集中力アップ' },
            { id: 'mr2', name: '不要な紙類を処分', duration: 2, area: 'desk', tip: '毎日少しずつがポイント' }
        ]
    },
    evening: {
        basic: [
            { id: 'e1', name: '郵便物を仕分け', duration: 3, area: 'living', tip: 'すぐ処理・後で・保管の3つに分ける' },
            { id: 'e2', name: 'リビングをリセット', duration: 5, area: 'living', tip: '使ったものを元の場所へ' },
            { id: 'e3', name: 'カバンの中を整理', duration: 3, area: 'entrance', tip: 'レシートや不要なものを出す' },
            { id: 'e4', name: '洗濯物を畳む', duration: 10, area: 'bedroom', tip: 'ドラマを見ながらでもOK' },
            { id: 'e5', name: '明日の準備', duration: 5, area: 'entrance', tip: '朝の余裕につながる' }
        ],
        kitchen: [
            { id: 'ek1', name: 'キッチンカウンターを片付け', duration: 5, area: 'kitchen', tip: '何も置かない状態が理想' },
            { id: 'ek2', name: '冷蔵庫の中をチェック', duration: 3, area: 'kitchen', tip: '賞味期限切れを発見しやすい' },
            { id: 'ek3', name: '調味料を拭く', duration: 2, area: 'kitchen', tip: 'ベタつきを防ぐ' }
        ],
        family: [
            { id: 'ef1', name: 'おもちゃを片付け', duration: 5, area: 'living', tip: '子どもと一緒にゲーム感覚で' },
            { id: 'ef2', name: '学校のプリント整理', duration: 5, area: 'desk', tip: '必要なものだけ残す' }
        ]
    },
    night: {
        basic: [
            { id: 'n1', name: 'キッチンをリセット', duration: 10, area: 'kitchen', tip: '朝起きた時の気分が違う' },
            { id: 'n2', name: '洗面所を整える', duration: 3, area: 'bathroom', tip: '化粧品や洗面用具を定位置に' },
            { id: 'n3', name: '床のものを拾う', duration: 3, area: 'living', tip: '床に何もない状態が理想' },
            { id: 'n4', name: 'ゴミ箱チェック', duration: 2, area: 'kitchen', tip: '溢れる前に処理' },
            { id: 'n5', name: 'リモコン・スマホ充電器を定位置に', duration: 1, area: 'living', tip: '探し物がなくなる' }
        ],
        closet: [
            { id: 'nc1', name: '脱いだ服を処理', duration: 2, area: 'closet', tip: '洗濯か収納か即決断' },
            { id: 'nc2', name: 'ハンガーを揃える', duration: 2, area: 'closet', tip: '方向を統一するだけで美しい' }
        ]
    },
    weekend: {
        basic: [
            { id: 'w1', name: '掃除機をかける', duration: 15, area: 'living', tip: '好きな音楽をかけながら' },
            { id: 'w2', name: '水回りの掃除', duration: 20, area: 'bathroom', tip: '週1でキレイをキープ' },
            { id: 'w3', name: '床拭き', duration: 15, area: 'living', tip: '掃除機の後にやると効果的' },
            { id: 'w4', name: 'シーツ交換', duration: 10, area: 'bedroom', tip: '週1で清潔な睡眠を' },
            { id: 'w5', name: '不用品を1つ処分', duration: 5, area: 'storage', tip: '毎週少しずつが大切' }
        ],
        deep: [
            { id: 'wd1', name: 'クローゼット整理', duration: 30, area: 'closet', tip: '季節ごとに見直し' },
            { id: 'wd2', name: '書類整理', duration: 20, area: 'desk', tip: '不要な書類を処分' },
            { id: 'wd3', name: '冷蔵庫掃除', duration: 15, area: 'kitchen', tip: '賞味期限切れを一掃' },
            { id: 'wd4', name: '靴の手入れ', duration: 15, area: 'entrance', tip: '月1でも十分' },
            { id: 'wd5', name: '収納の見直し', duration: 20, area: 'storage', tip: '使いやすさを追求' }
        ],
        minimalist: [
            { id: 'wm1', name: '不用品を5つ選ぶ', duration: 10, area: 'storage', tip: '迷ったら「1年使ったか」で判断' },
            { id: 'wm2', name: '紙類を処分', duration: 15, area: 'desk', tip: '写真に撮ってデジタル化も' },
            { id: 'wm3', name: '衣類を見直す', duration: 20, area: 'closet', tip: '着ていない服を手放す勇気' }
        ]
    }
};

// 片付けのコツ・ノウハウ
const TIPS = [
    // 基本
    {
        id: 't1',
        category: 'basic',
        icon: '📦',
        title: '1日1捨て',
        content: '毎日1つだけモノを手放す習慣をつけましょう。小さなペンから大きな家電まで、何でもOK。1年で365個のモノが減ります。'
    },
    {
        id: 't2',
        category: 'basic',
        icon: '🏠',
        title: 'すべてに住所を',
        content: 'モノには必ず「住所」（定位置）を決めましょう。使ったら住所に戻す。これだけで散らかりにくくなります。'
    },
    {
        id: 't3',
        category: 'basic',
        icon: '⏱️',
        title: '2分ルール',
        content: '2分以内でできることは今すぐやる。郵便物の仕分け、コップを洗う、服をハンガーにかける。後回しにしない！'
    },
    {
        id: 't4',
        category: 'basic',
        icon: '👀',
        title: '見える化収納',
        content: '透明ケースやラベリングで中身を見える化。探し物の時間がゼロになり、重複買いも防げます。'
    },
    {
        id: 't5',
        category: 'basic',
        icon: '📏',
        title: '7割収納',
        content: '収納は7割までに抑える。余白があると出し入れしやすく、片付けが苦にならなくなります。'
    },

    // 維持
    {
        id: 't6',
        category: 'maintain',
        icon: '🌙',
        title: 'リセットタイム',
        content: '寝る前の5分間で部屋をリセット。朝起きた時のスッキリ感が、次の日のモチベーションになります。'
    },
    {
        id: 't7',
        category: 'maintain',
        icon: '📅',
        title: '曜日別ルーティン',
        content: '月曜は洗面所、火曜はキッチン…と曜日で担当を決める。毎日少しずつで全体がキレイに保てます。'
    },
    {
        id: 't8',
        category: 'maintain',
        icon: '🔄',
        title: 'ワンイン・ワンアウト',
        content: '1つ買ったら1つ手放す。モノの総量を一定に保つことで、部屋が散らかりにくくなります。'
    },
    {
        id: 't9',
        category: 'maintain',
        icon: '📸',
        title: '理想の状態を写真に',
        content: 'キレイに片付いた状態を写真に撮っておく。散らかってきたら写真を見て、その状態に戻すだけ。'
    },
    {
        id: 't10',
        category: 'maintain',
        icon: '🎯',
        title: 'ホットスポットを制する',
        content: '散らかりやすい場所（ホットスポット）を特定し、そこだけは毎日リセット。全体に波及します。'
    },

    // マインド
    {
        id: 't11',
        category: 'mindset',
        icon: '💭',
        title: '完璧を目指さない',
        content: '100点の片付けを目指すと続きません。60点でOK！継続できることが何より大切です。'
    },
    {
        id: 't12',
        category: 'mindset',
        icon: '🎁',
        title: '手放すことは贈り物',
        content: '使わないモノを手放すことは、それを必要とする誰かへの贈り物。罪悪感より感謝の気持ちで。'
    },
    {
        id: 't13',
        category: 'mindset',
        icon: '🌱',
        title: '過去より未来',
        content: '「もったいない」は過去への執着。「これから使うか」で判断すると、手放しやすくなります。'
    },
    {
        id: 't14',
        category: 'mindset',
        icon: '✨',
        title: 'ときめきチェック',
        content: 'モノを手に取って「ときめくか」を感じる。ときめかないモノは、感謝して手放しましょう。'
    },
    {
        id: 't15',
        category: 'mindset',
        icon: '🧘',
        title: '片付けは自分との対話',
        content: '片付けは単なる作業ではなく、自分が本当に大切にしたいモノ・コトを見つける旅です。'
    },

    // 時短
    {
        id: 't16',
        category: 'quick',
        icon: '⚡',
        title: '動線を意識',
        content: 'よく使うモノは動線上に配置。歩数が減ると片付けのハードルも下がります。'
    },
    {
        id: 't17',
        category: 'quick',
        icon: '🧺',
        title: '一時置きボックス',
        content: '定位置が決まらないモノは一時置きボックスへ。週末にまとめて判断すればOK。'
    },
    {
        id: 't18',
        category: 'quick',
        icon: '🎵',
        title: '音楽で時間管理',
        content: 'お気に入りの曲1曲分（約4分）だけ片付ける。曲が終わったら終了！気軽に取り組めます。'
    },
    {
        id: 't19',
        category: 'quick',
        icon: '🏃',
        title: 'ついで掃除',
        content: 'トイレに行ったついでに便器を拭く、お風呂上がりに壁の水滴を取る。ながら掃除で時短。'
    },
    {
        id: 't20',
        category: 'quick',
        icon: '📱',
        title: 'タイマー活用',
        content: '5分タイマーをセットして集中片付け。短時間で驚くほど片付きます。'
    }
];

// 励ましメッセージ
const ENCOURAGEMENTS = [
    '素晴らしい！その調子です！',
    'コツコツが大切。続けていきましょう！',
    '小さな積み重ねが大きな変化を生みます！',
    '今日も頑張りましたね！',
    'あなたの努力は確実に実を結んでいます！',
    'キレイな空間は心も整えてくれますね！',
    '継続は力なり。あなたは素晴らしい！',
    '片付け上手への道を着実に歩んでいます！',
    '自分を褒めてあげてください！',
    '今日のあなた、輝いています！'
];

// バッジ定義
const BADGES = [
    { id: 'first_task', icon: '🌟', name: '最初の一歩', condition: '初めてタスクを完了', threshold: 1, type: 'total' },
    { id: 'week_streak', icon: '🔥', name: '1週間継続', condition: '7日連続達成', threshold: 7, type: 'streak' },
    { id: 'month_streak', icon: '💪', name: '1ヶ月継続', condition: '30日連続達成', threshold: 30, type: 'streak' },
    { id: 'task_10', icon: '✨', name: '片付け見習い', condition: '10タスク完了', threshold: 10, type: 'total' },
    { id: 'task_50', icon: '🎯', name: '片付け習慣', condition: '50タスク完了', threshold: 50, type: 'total' },
    { id: 'task_100', icon: '🏆', name: '片付けマスター', condition: '100タスク完了', threshold: 100, type: 'total' },
    { id: 'morning_10', icon: '🌅', name: '朝活マスター', condition: '朝タスク10回完了', threshold: 10, type: 'morning' },
    { id: 'night_10', icon: '🌙', name: 'リセット上手', condition: '夜タスク10回完了', threshold: 10, type: 'night' },
    { id: 'weekend_5', icon: '🗓️', name: '週末戦士', condition: '休日タスク5回完了', threshold: 5, type: 'weekend' }
];

// レベル定義
const LEVELS = [
    { name: '初心者', minTasks: 0 },
    { name: '見習い', minTasks: 10 },
    { name: '一人前', minTasks: 30 },
    { name: '熟練者', minTasks: 60 },
    { name: 'エキスパート', minTasks: 100 },
    { name: 'マスター', minTasks: 150 },
    { name: '片付け名人', minTasks: 200 }
];
