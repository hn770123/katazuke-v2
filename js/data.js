// ========================================
// カタヅケ - データ定義
// ========================================

// ヒアリング質問（18個に拡充）
const HEARING_QUESTIONS = [
    // 1. 基本情報
    {
        id: 'lifestyle',
        question: 'あなたの生活スタイルは？',
        description: '普段の生活パターンを教えてください',
        type: 'single',
        category: 'basic',
        options: [
            { value: 'single', icon: '👤', text: '一人暮らし', desc: '自分のペースで片付けできる' },
            { value: 'couple', icon: '👫', text: '二人暮らし', desc: 'パートナーと協力して' },
            { value: 'roommate', icon: '🏠', text: 'ルームシェア', desc: '共有スペースの管理が大切' },
            { value: 'family_baby', icon: '👶', text: '乳幼児がいる', desc: '安全で清潔な環境が最優先' },
            { value: 'family_small', icon: '👨‍👩‍👧', text: '小学生以下の子供', desc: '子どもがいると散らかりがち' },
            { value: 'family_teen', icon: '👨‍👩‍👧‍👦', text: '中高生の子供', desc: '子どもの自立を促しながら' },
            { value: 'family_adult', icon: '👨‍👩‍👦‍👦', text: '成人した家族と同居', desc: '各自のスペース管理' },
            { value: 'multi_gen', icon: '👴', text: '三世代同居', desc: '世代間の調整が必要' },
            { value: 'with_pet', icon: '🐕', text: 'ペットと暮らす', desc: 'ペット用品の管理も' }
        ]
    },
    // 2. 住居情報
    {
        id: 'housing_type',
        question: 'お住まいのタイプは？',
        description: '住居に合った片付け方法を提案します',
        type: 'single',
        category: 'basic',
        options: [
            { value: 'studio', icon: '🏢', text: 'ワンルーム', desc: '限られた空間を最大活用' },
            { value: '1k_1dk', icon: '🚪', text: '1K・1DK', desc: 'コンパクトな空間' },
            { value: '1ldk_2dk', icon: '🛋️', text: '1LDK・2DK', desc: '適度な広さ' },
            { value: '2ldk_3dk', icon: '🏠', text: '2LDK・3DK', desc: '部屋数に余裕あり' },
            { value: '3ldk_more', icon: '🏡', text: '3LDK以上', desc: '広い空間の管理' },
            { value: 'house_small', icon: '🏘️', text: '戸建て（小）', desc: '複数階の管理' },
            { value: 'house_large', icon: '🏰', text: '戸建て（大）', desc: '広い戸建て' }
        ]
    },
    // 3. 収納状況
    {
        id: 'storage_situation',
        question: '収納スペースの状況は？',
        description: '収納量に合わせたアドバイスをします',
        type: 'single',
        category: 'basic',
        options: [
            { value: 'very_limited', icon: '📦', text: 'とても少ない', desc: '収納が足りない' },
            { value: 'limited', icon: '🗄️', text: 'やや少ない', desc: 'もう少し欲しい' },
            { value: 'adequate', icon: '🗃️', text: 'ちょうど良い', desc: '現状で十分' },
            { value: 'plenty', icon: '📚', text: '余裕がある', desc: '収納には困らない' },
            { value: 'too_much', icon: '🏪', text: '余りすぎ', desc: '収納が多すぎて活用できてない' }
        ]
    },
    // 4. 仕事スタイル
    {
        id: 'work_style',
        question: 'お仕事のスタイルは？',
        description: '在宅かどうかで片付けのタイミングが変わります',
        type: 'single',
        category: 'work',
        options: [
            { value: 'office_full', icon: '🏢', text: '完全出社', desc: '毎日オフィスへ' },
            { value: 'office_long', icon: '🌃', text: '出社＋残業多め', desc: '帰宅が遅い' },
            { value: 'remote_full', icon: '🏠', text: '完全リモート', desc: '家で過ごす時間が長い' },
            { value: 'remote_busy', icon: '💻', text: 'リモート＋忙しい', desc: '在宅だけど時間がない' },
            { value: 'hybrid', icon: '🔄', text: 'ハイブリッド', desc: '出社と在宅が混在' },
            { value: 'shift', icon: '🔀', text: 'シフト勤務', desc: '不規則な勤務時間' },
            { value: 'night_shift', icon: '🌙', text: '夜勤あり', desc: '昼夜逆転することも' },
            { value: 'flexible', icon: '⏰', text: '自由業・フレックス', desc: '時間の融通がきく' },
            { value: 'part_time', icon: '⏱️', text: 'パート・アルバイト', desc: '決まった時間働く' },
            { value: 'homemaker', icon: '🏡', text: '専業主婦/主夫', desc: '家事が中心' },
            { value: 'student', icon: '📚', text: '学生', desc: '学業と両立' },
            { value: 'retired', icon: '🌅', text: '退職・リタイア', desc: '時間に余裕あり' }
        ]
    },
    // 5. 通勤・外出時間
    {
        id: 'commute_time',
        question: '通勤・外出にかかる時間は？',
        description: '自由時間の目安を把握します',
        type: 'single',
        category: 'work',
        options: [
            { value: 'none', icon: '🏠', text: 'なし（在宅）', desc: '通勤時間ゼロ' },
            { value: 'short', icon: '🚶', text: '30分以内', desc: '近距離通勤' },
            { value: 'medium', icon: '🚃', text: '30分〜1時間', desc: '一般的な通勤時間' },
            { value: 'long', icon: '🚄', text: '1〜1.5時間', desc: 'やや長い通勤' },
            { value: 'very_long', icon: '🛤️', text: '1.5時間以上', desc: '長距離通勤' }
        ]
    },
    // 6. 朝の余裕
    {
        id: 'morning_routine',
        question: '朝の時間の過ごし方は？',
        description: '朝の片付けタスクを調整します',
        type: 'single',
        category: 'time',
        options: [
            { value: 'very_rushed', icon: '😰', text: 'ギリギリ派', desc: '起きてすぐ出発' },
            { value: 'rushed', icon: '🏃', text: '急いでいる', desc: '最低限の準備だけ' },
            { value: 'normal', icon: '☕', text: '普通', desc: 'それなりに余裕' },
            { value: 'relaxed', icon: '🌅', text: '余裕あり', desc: '朝の時間を楽しむ' },
            { value: 'early_bird', icon: '🐦', text: '朝活派', desc: '早起きして活動' }
        ]
    },
    // 7. 夜の過ごし方
    {
        id: 'evening_routine',
        question: '夜の時間の過ごし方は？',
        description: '夜の片付けタスクを調整します',
        type: 'single',
        category: 'time',
        options: [
            { value: 'exhausted', icon: '😴', text: '疲れて何もできない', desc: '帰ったら休むだけ' },
            { value: 'limited', icon: '🌙', text: '少しだけ時間あり', desc: '最低限の家事だけ' },
            { value: 'normal', icon: '📺', text: '普通', desc: 'リラックスタイムもある' },
            { value: 'active', icon: '🎯', text: '夜型で活動的', desc: '夜が一番元気' },
            { value: 'family_time', icon: '👨‍👩‍👧', text: '家族と過ごす', desc: '家族との時間が優先' }
        ]
    },
    // 8. 片付け可能時間
    {
        id: 'available_time',
        question: '片付けに使える時間は？',
        description: '1日あたりの隙間時間を教えてください',
        type: 'single',
        category: 'time',
        options: [
            { value: 'minimal', icon: '⚡', text: '5分程度', desc: '本当に忙しい' },
            { value: 'short', icon: '🕐', text: '10〜15分', desc: '少しなら確保できる' },
            { value: 'medium', icon: '🕑', text: '20〜30分', desc: 'ある程度の時間がある' },
            { value: 'long', icon: '🕒', text: '30〜45分', desc: 'しっかり時間を取れる' },
            { value: 'plenty', icon: '🕓', text: '1時間以上', desc: 'たっぷり時間がある' }
        ]
    },
    // 9. 散らかりやすい場所
    {
        id: 'trouble_areas',
        question: '特に散らかりやすい場所は？',
        description: '複数選択できます（3つまで推奨）',
        type: 'multi',
        category: 'area',
        options: [
            { value: 'living', icon: '🛋️', text: 'リビング' },
            { value: 'kitchen', icon: '🍳', text: 'キッチン' },
            { value: 'dining', icon: '🍽️', text: 'ダイニング' },
            { value: 'bedroom', icon: '🛏️', text: '寝室' },
            { value: 'closet', icon: '👕', text: 'クローゼット' },
            { value: 'bathroom', icon: '🚿', text: '洗面所' },
            { value: 'toilet', icon: '🚽', text: 'トイレ' },
            { value: 'bath', icon: '🛁', text: 'お風呂' },
            { value: 'entrance', icon: '🚪', text: '玄関' },
            { value: 'desk', icon: '💻', text: 'デスク周り' },
            { value: 'kids_room', icon: '🧸', text: '子供部屋' },
            { value: 'storage', icon: '📦', text: '収納スペース' },
            { value: 'balcony', icon: '🌿', text: 'ベランダ' },
            { value: 'garage', icon: '🚗', text: '車庫・ガレージ' }
        ]
    },
    // 10. 物の多さ
    {
        id: 'stuff_amount',
        question: '所有物の量は？',
        description: '物の量に応じた片付け戦略を提案します',
        type: 'single',
        category: 'possession',
        options: [
            { value: 'minimalist', icon: '🌿', text: 'ミニマリスト', desc: '必要最低限のみ' },
            { value: 'less', icon: '✨', text: '少なめ', desc: '厳選している' },
            { value: 'average', icon: '📦', text: '普通', desc: '一般的な量' },
            { value: 'more', icon: '📚', text: 'やや多い', desc: '物が増えがち' },
            { value: 'much', icon: '🗃️', text: '多い', desc: 'かなり物が多い' },
            { value: 'overwhelming', icon: '🏔️', text: '溢れている', desc: '収納しきれない' }
        ]
    },
    // 11. 増えやすい物
    {
        id: 'accumulating_items',
        question: '増えやすい物は？',
        description: '複数選択できます',
        type: 'multi',
        category: 'possession',
        options: [
            { value: 'clothes', icon: '👕', text: '衣類' },
            { value: 'books', icon: '📚', text: '本・雑誌' },
            { value: 'papers', icon: '📄', text: '書類・紙類' },
            { value: 'hobby', icon: '🎨', text: '趣味の道具' },
            { value: 'cosmetics', icon: '💄', text: '化粧品・美容用品' },
            { value: 'gadgets', icon: '📱', text: 'ガジェット・電子機器' },
            { value: 'kitchenware', icon: '🍳', text: 'キッチン用品' },
            { value: 'food', icon: '🍱', text: '食品・調味料' },
            { value: 'toys', icon: '🧸', text: 'おもちゃ' },
            { value: 'souvenirs', icon: '🎁', text: '思い出の品・お土産' },
            { value: 'bags', icon: '👜', text: 'バッグ・かばん' },
            { value: 'shoes', icon: '👟', text: '靴' }
        ]
    },
    // 12. 片付けの目標
    {
        id: 'goal',
        question: '片付けの目標は？',
        description: 'どんな状態を目指したいですか',
        type: 'single',
        category: 'goal',
        options: [
            { value: 'maintain', icon: '✨', text: 'キレイを維持', desc: '今の状態を保つ' },
            { value: 'improve', icon: '📈', text: '少しずつ改善', desc: '無理なく良くしていく' },
            { value: 'organize', icon: '🗂️', text: '整理整頓を習慣化', desc: '片付けを習慣に' },
            { value: 'declutter', icon: '🧹', text: 'スッキリさせたい', desc: '今より物を減らす' },
            { value: 'minimalist', icon: '🌿', text: 'ミニマルに暮らす', desc: '必要最低限の暮らし' },
            { value: 'functional', icon: '⚙️', text: '機能的な空間', desc: '使いやすさ重視' },
            { value: 'cozy', icon: '🏡', text: '居心地の良い空間', desc: 'リラックスできる部屋' },
            { value: 'guest_ready', icon: '🚪', text: '人を呼べる部屋', desc: 'いつでも来客OK' }
        ]
    },
    // 13. 片付けの困りごと
    {
        id: 'challenge',
        question: '片付けで困っていることは？',
        description: '複数選択できます',
        type: 'multi',
        category: 'challenge',
        options: [
            { value: 'start', icon: '😫', text: 'やる気が出ない' },
            { value: 'time', icon: '⏰', text: '時間がない' },
            { value: 'energy', icon: '🔋', text: '体力・気力がない' },
            { value: 'method', icon: '❓', text: 'やり方がわからない' },
            { value: 'discard', icon: '🗑️', text: '捨てられない' },
            { value: 'maintain', icon: '🔄', text: '維持できない' },
            { value: 'family', icon: '👨‍👩‍👧', text: '家族が協力しない' },
            { value: 'space', icon: '📦', text: '収納場所がない' },
            { value: 'categories', icon: '🏷️', text: '分類が苦手' },
            { value: 'perfectionism', icon: '💯', text: '完璧主義で進まない' },
            { value: 'distracted', icon: '🦋', text: '途中で別のことを始める' },
            { value: 'overwhelmed', icon: '😵', text: '何から始めればいいかわからない' }
        ]
    },
    // 14. 片付けスタイルの好み
    {
        id: 'cleaning_style',
        question: '好みの片付けスタイルは？',
        description: 'あなたに合った方法を提案します',
        type: 'single',
        category: 'preference',
        options: [
            { value: 'quick_daily', icon: '⚡', text: '毎日ちょこちょこ', desc: '短時間を毎日' },
            { value: 'weekend_batch', icon: '📅', text: '週末にまとめて', desc: '休日に集中' },
            { value: 'routine', icon: '🔁', text: 'ルーティン化', desc: '決まった時間に' },
            { value: 'mood_based', icon: '🎭', text: '気分が乗った時', desc: 'やる気がある時に' },
            { value: 'timer', icon: '⏱️', text: 'タイマーで区切る', desc: '時間を決めて' },
            { value: 'music', icon: '🎵', text: '音楽をかけながら', desc: '楽しみながら' },
            { value: 'reward', icon: '🎁', text: 'ご褒美を用意', desc: '達成感を重視' }
        ]
    },
    // 15. 体力・健康状態
    {
        id: 'physical_condition',
        question: '普段の体力・健康状態は？',
        description: '負担の少ないタスクを提案します',
        type: 'single',
        category: 'condition',
        options: [
            { value: 'very_active', icon: '💪', text: 'とても元気', desc: '体を動かすのが好き' },
            { value: 'active', icon: '🏃', text: '元気', desc: '普通に動ける' },
            { value: 'normal', icon: '😊', text: '普通', desc: '日常生活には問題なし' },
            { value: 'tired', icon: '😔', text: '疲れやすい', desc: 'あまり無理できない' },
            { value: 'limited', icon: '🦽', text: '体に制限あり', desc: '動作に制限がある' },
            { value: 'varies', icon: '📊', text: '日によって違う', desc: '調子に波がある' }
        ]
    },
    // 16. 同居人の協力度
    {
        id: 'household_cooperation',
        question: '家族・同居人の片付けへの協力は？',
        description: '一人暮らしの方は「該当なし」を選択',
        type: 'single',
        category: 'household',
        options: [
            { value: 'solo', icon: '👤', text: '該当なし（一人暮らし）', desc: '自分だけで管理' },
            { value: 'very_cooperative', icon: '🤝', text: 'とても協力的', desc: '一緒に片付ける' },
            { value: 'cooperative', icon: '👍', text: '協力的', desc: '頼めばやってくれる' },
            { value: 'neutral', icon: '😐', text: '普通', desc: '自分のことは自分で' },
            { value: 'uncooperative', icon: '😕', text: 'あまり協力的でない', desc: '散らかしがち' },
            { value: 'resistant', icon: '😤', text: '非協力的', desc: '片付けに無関心' }
        ]
    },
    // 17. 買い物習慣
    {
        id: 'shopping_habit',
        question: '買い物の習慣は？',
        description: '物が増える原因を把握します',
        type: 'single',
        category: 'habit',
        options: [
            { value: 'very_careful', icon: '🧐', text: 'とても慎重', desc: '必要な物だけ買う' },
            { value: 'careful', icon: '🤔', text: '慎重', desc: 'よく考えてから買う' },
            { value: 'normal', icon: '🛒', text: '普通', desc: '必要に応じて買う' },
            { value: 'impulsive', icon: '💫', text: 'つい買ってしまう', desc: '衝動買いしがち' },
            { value: 'bargain_hunter', icon: '🏷️', text: 'セールに弱い', desc: 'お得だと買ってしまう' },
            { value: 'online_shopper', icon: '📦', text: 'ネット通販が多い', desc: '届く荷物が多い' },
            { value: 'collector', icon: '🎯', text: 'コレクター気質', desc: '集めるのが好き' }
        ]
    },
    // 18. モチベーション
    {
        id: 'motivation',
        question: '片付けのモチベーションは何？',
        description: '複数選択できます',
        type: 'multi',
        category: 'motivation',
        options: [
            { value: 'comfort', icon: '🛋️', text: '快適に過ごしたい' },
            { value: 'guest', icon: '🚪', text: '人を呼びたい' },
            { value: 'find_things', icon: '🔍', text: '物を探す時間を減らしたい' },
            { value: 'mental_health', icon: '🧘', text: '心を整えたい' },
            { value: 'productivity', icon: '📈', text: '生産性を上げたい' },
            { value: 'save_money', icon: '💰', text: '無駄な出費を減らしたい' },
            { value: 'moving', icon: '🚚', text: '引っ越し予定がある' },
            { value: 'life_change', icon: '🔄', text: '生活を変えたい' },
            { value: 'health', icon: '🏥', text: '健康のため（ハウスダスト等）' },
            { value: 'kids', icon: '👶', text: '子供のため' },
            { value: 'habit', icon: '✨', text: '良い習慣を身につけたい' }
        ]
    }
];

// デイリーステータス選択肢
const DAILY_STATUS_OPTIONS = {
    today_type: {
        question: '今日はどんな日？',
        options: [
            { value: 'work_normal', icon: '💼', text: '通常の仕事日', desc: '普通の平日' },
            { value: 'work_busy', icon: '🔥', text: '忙しい仕事日', desc: '残業予定・締め切り前' },
            { value: 'work_light', icon: '☀️', text: '軽めの仕事日', desc: '余裕がある日' },
            { value: 'remote_day', icon: '🏠', text: '在宅勤務日', desc: '家で仕事' },
            { value: 'holiday_free', icon: '🎉', text: '休み（フリー）', desc: '予定なしの休日' },
            { value: 'holiday_busy', icon: '🗓️', text: '休み（予定あり）', desc: '外出予定の休日' },
            { value: 'holiday_home', icon: '🏡', text: '休み（家で用事）', desc: '家事・作業予定' },
            { value: 'sick_tired', icon: '😷', text: '体調不良・疲労', desc: '無理は禁物' },
            { value: 'half_day', icon: '🌗', text: '半休・早帰り', desc: '午後から/まで休み' }
        ]
    },
    today_energy: {
        question: '今日のエネルギーレベルは？',
        options: [
            { value: 'high', icon: '⚡', text: '元気いっぱい', desc: 'やる気満々' },
            { value: 'normal', icon: '😊', text: '普通', desc: 'いつも通り' },
            { value: 'low', icon: '😔', text: '少し疲れている', desc: '軽めがいい' },
            { value: 'very_low', icon: '😴', text: 'とても疲れている', desc: '最小限だけ' }
        ]
    },
    today_time: {
        question: '今日の片付け可能時間は？',
        options: [
            { value: 'none', icon: '⏰', text: 'ほぼない', desc: '1-2分程度' },
            { value: 'minimal', icon: '⚡', text: '5分程度', desc: '隙間時間のみ' },
            { value: 'short', icon: '🕐', text: '10-15分', desc: '少しだけ' },
            { value: 'medium', icon: '🕑', text: '20-30分', desc: 'ある程度' },
            { value: 'long', icon: '🕒', text: '30分以上', desc: 'しっかり時間あり' }
        ]
    },
    evening_plan: {
        question: '今日の夜の予定は？',
        options: [
            { value: 'home', icon: '🏠', text: '家にいる', desc: '夜は在宅' },
            { value: 'going_out', icon: '🌃', text: '外出予定', desc: '夜は出かける' },
            { value: 'late_return', icon: '🌙', text: '遅く帰宅', desc: '帰りが遅い' },
            { value: 'guest', icon: '🚪', text: '来客予定', desc: 'お客さんが来る' },
            { value: 'uncertain', icon: '❓', text: '未定', desc: 'まだわからない' }
        ]
    },
    tomorrow_type: {
        question: '明日の予定は？',
        options: [
            { value: 'work', icon: '💼', text: '仕事', desc: '通常の出勤日' },
            { value: 'work_early', icon: '🌅', text: '仕事（早出）', desc: '朝早く出発' },
            { value: 'work_important', icon: '⭐', text: '大事な仕事', desc: '会議・プレゼン等' },
            { value: 'remote', icon: '🏠', text: '在宅勤務', desc: '家で仕事' },
            { value: 'holiday', icon: '🎉', text: '休み', desc: '仕事なし' },
            { value: 'travel', icon: '✈️', text: '出張・旅行', desc: '朝から移動' },
            { value: 'event', icon: '📅', text: 'イベント', desc: '特別な予定' }
        ]
    }
};

// タスクテンプレート（大幅に拡充）
const TASK_TEMPLATES = {
    morning: {
        basic: [
            { id: 'm1', name: 'ベッドを整える', duration: 2, area: 'bedroom', tip: 'シーツを引っ張って枕を整えるだけでOK', energy: 'low' },
            { id: 'm2', name: '洗面台を拭く', duration: 1, area: 'bathroom', tip: '使ったタオルでサッと拭くだけ', energy: 'low' },
            { id: 'm3', name: 'テーブルの上を片付ける', duration: 3, area: 'living', tip: '定位置に戻すだけで見違える', energy: 'low' },
            { id: 'm4', name: 'ゴミをまとめる', duration: 2, area: 'kitchen', tip: '曜日ごとのゴミ出しを習慣に', energy: 'low' },
            { id: 'm5', name: '靴を揃える', duration: 1, area: 'entrance', tip: 'たった30秒で玄関が整う', energy: 'low' }
        ],
        kitchen: [
            { id: 'mk1', name: '食器を片付ける', duration: 5, area: 'kitchen', tip: '朝食後すぐに洗うと汚れが落ちやすい', energy: 'medium' },
            { id: 'mk2', name: 'シンクを拭く', duration: 1, area: 'kitchen', tip: '水滴を拭くだけで清潔感アップ', energy: 'low' },
            { id: 'mk3', name: 'コンロ周りをサッと拭く', duration: 2, area: 'kitchen', tip: '油汚れは温かいうちに', energy: 'low' },
            { id: 'mk4', name: '排水口をチェック', duration: 1, area: 'kitchen', tip: 'ゴミを取り除くだけ', energy: 'low' },
            { id: 'mk5', name: '調味料を拭く', duration: 2, area: 'kitchen', tip: 'ベタつき防止', energy: 'low' }
        ],
        remote: [
            { id: 'mr1', name: 'デスク周りを整える', duration: 3, area: 'desk', tip: '仕事前の整理で集中力アップ', energy: 'low' },
            { id: 'mr2', name: '不要な紙類を処分', duration: 2, area: 'desk', tip: '毎日少しずつがポイント', energy: 'low' },
            { id: 'mr3', name: 'ケーブル類を整理', duration: 3, area: 'desk', tip: '絡まりを防ぐ', energy: 'low' },
            { id: 'mr4', name: 'デスク周りを拭く', duration: 2, area: 'desk', tip: 'ホコリを払う', energy: 'low' }
        ],
        quick: [
            { id: 'mq1', name: 'クッションを整える', duration: 1, area: 'living', tip: 'ソファの見た目が一新', energy: 'low' },
            { id: 'mq2', name: 'リモコンを定位置に', duration: 1, area: 'living', tip: '探し物がなくなる', energy: 'low' },
            { id: 'mq3', name: 'カーテンを開けてスッキリ', duration: 1, area: 'living', tip: '朝の光で気分も上がる', energy: 'low' }
        ],
        family: [
            { id: 'mf1', name: 'お弁当箱を洗う', duration: 3, area: 'kitchen', tip: '朝のうちに', energy: 'medium' },
            { id: 'mf2', name: '子供の持ち物チェック', duration: 3, area: 'entrance', tip: '忘れ物防止', energy: 'low' },
            { id: 'mf3', name: '水筒を準備', duration: 2, area: 'kitchen', tip: '清潔に保つ', energy: 'low' }
        ],
        relaxed: [
            { id: 'mx1', name: '窓を開けて換気', duration: 2, area: 'living', tip: '新鮮な空気で気分リフレッシュ', energy: 'low' },
            { id: 'mx2', name: '植物に水やり', duration: 3, area: 'living', tip: '観葉植物のケア', energy: 'low' },
            { id: 'mx3', name: '洗濯機を回す', duration: 3, area: 'bathroom', tip: '朝のうちに', energy: 'low' }
        ],
        bathroom: [
            { id: 'mb1', name: '鏡を拭く', duration: 1, area: 'bathroom', tip: '水滴を取るだけ', energy: 'low' },
            { id: 'mb2', name: '歯ブラシ立てを整理', duration: 1, area: 'bathroom', tip: '清潔に保つ', energy: 'low' },
            { id: 'mb3', name: 'タオルを交換', duration: 1, area: 'bathroom', tip: '清潔なタオルで気持ちよく', energy: 'low' }
        ]
    },
    evening: {
        basic: [
            { id: 'e1', name: '郵便物を仕分け', duration: 3, area: 'living', tip: 'すぐ処理・後で・保管の3つに分ける', energy: 'medium' },
            { id: 'e2', name: 'リビングをリセット', duration: 5, area: 'living', tip: '使ったものを元の場所へ', energy: 'medium' },
            { id: 'e3', name: 'カバンの中を整理', duration: 3, area: 'entrance', tip: 'レシートや不要なものを出す', energy: 'low' },
            { id: 'e4', name: '洗濯物を畳む', duration: 10, area: 'bedroom', tip: 'ドラマを見ながらでもOK', energy: 'medium' },
            { id: 'e5', name: '明日の準備', duration: 5, area: 'entrance', tip: '朝の余裕につながる', energy: 'medium' }
        ],
        kitchen: [
            { id: 'ek1', name: 'キッチンカウンターを片付け', duration: 5, area: 'kitchen', tip: '何も置かない状態が理想', energy: 'medium' },
            { id: 'ek2', name: '冷蔵庫の中をチェック', duration: 3, area: 'kitchen', tip: '賞味期限切れを発見しやすい', energy: 'low' },
            { id: 'ek3', name: '調味料を拭く', duration: 2, area: 'kitchen', tip: 'ベタつきを防ぐ', energy: 'low' },
            { id: 'ek4', name: '食器棚を整理', duration: 5, area: 'kitchen', tip: '使いやすく並べ直す', energy: 'medium' },
            { id: 'ek5', name: 'シンク下を確認', duration: 3, area: 'kitchen', tip: '在庫チェック', energy: 'low' }
        ],
        family: [
            { id: 'ef1', name: 'おもちゃを片付け', duration: 5, area: 'living', tip: '子どもと一緒にゲーム感覚で', energy: 'medium' },
            { id: 'ef2', name: '学校のプリント整理', duration: 5, area: 'desk', tip: '必要なものだけ残す', energy: 'medium' },
            { id: 'ef3', name: 'ランドセル/カバンの中身を出す', duration: 3, area: 'entrance', tip: '毎日の習慣に', energy: 'low' },
            { id: 'ef4', name: '子供服を準備', duration: 3, area: 'closet', tip: '明日着る服を選ぶ', energy: 'low' }
        ],
        quick: [
            { id: 'eq1', name: 'テーブルを拭く', duration: 2, area: 'dining', tip: '食後すぐに', energy: 'low' },
            { id: 'eq2', name: 'ゴミを集める', duration: 3, area: 'living', tip: '各部屋のゴミ箱をチェック', energy: 'low' },
            { id: 'eq3', name: '床のものを拾う', duration: 2, area: 'living', tip: '床に何もない状態に', energy: 'low' }
        ],
        tired: [
            { id: 'et1', name: '服を脱衣カゴに入れる', duration: 1, area: 'bedroom', tip: '床に置かない', energy: 'low' },
            { id: 'et2', name: 'シンクに食器を集める', duration: 2, area: 'kitchen', tip: '洗うのは明日でもOK', energy: 'low' },
            { id: 'et3', name: '充電器をセット', duration: 1, area: 'living', tip: '定位置で充電', energy: 'low' }
        ],
        going_out: [
            { id: 'eo1', name: '出かける前にテーブルを片付け', duration: 2, area: 'living', tip: '帰宅時に気持ちいい', energy: 'low' },
            { id: 'eo2', name: 'ゴミを出す', duration: 2, area: 'kitchen', tip: '出かけるついでに', energy: 'low' }
        ],
        guest_coming: [
            { id: 'eg1', name: 'トイレを掃除', duration: 5, area: 'toilet', tip: 'お客様が使う場所', energy: 'medium' },
            { id: 'eg2', name: '玄関を整える', duration: 3, area: 'entrance', tip: '第一印象が大切', energy: 'low' },
            { id: 'eg3', name: 'リビングを整頓', duration: 5, area: 'living', tip: 'おもてなしの準備', energy: 'medium' },
            { id: 'eg4', name: '洗面所をチェック', duration: 3, area: 'bathroom', tip: 'タオルを新しく', energy: 'low' }
        ]
    },
    night: {
        basic: [
            { id: 'n1', name: 'キッチンをリセット', duration: 10, area: 'kitchen', tip: '朝起きた時の気分が違う', energy: 'medium' },
            { id: 'n2', name: '洗面所を整える', duration: 3, area: 'bathroom', tip: '化粧品や洗面用具を定位置に', energy: 'low' },
            { id: 'n3', name: '床のものを拾う', duration: 3, area: 'living', tip: '床に何もない状態が理想', energy: 'low' },
            { id: 'n4', name: 'ゴミ箱チェック', duration: 2, area: 'kitchen', tip: '溢れる前に処理', energy: 'low' },
            { id: 'n5', name: 'リモコン・スマホ充電器を定位置に', duration: 1, area: 'living', tip: '探し物がなくなる', energy: 'low' }
        ],
        closet: [
            { id: 'nc1', name: '脱いだ服を処理', duration: 2, area: 'closet', tip: '洗濯か収納か即決断', energy: 'low' },
            { id: 'nc2', name: 'ハンガーを揃える', duration: 2, area: 'closet', tip: '方向を統一するだけで美しい', energy: 'low' },
            { id: 'nc3', name: '明日の服を選ぶ', duration: 3, area: 'closet', tip: '朝の時短に', energy: 'low' }
        ],
        quick: [
            { id: 'nq1', name: 'テーブルをリセット', duration: 2, area: 'living', tip: '何も置かない状態に', energy: 'low' },
            { id: 'nq2', name: 'クッションを整える', duration: 1, area: 'living', tip: '明日の朝気持ちいい', energy: 'low' },
            { id: 'nq3', name: '玄関の靴を並べる', duration: 1, area: 'entrance', tip: '出かける時スムーズ', energy: 'low' }
        ],
        tired: [
            { id: 'nt1', name: '服をハンガーにかける', duration: 1, area: 'bedroom', tip: '脱ぎっぱなし防止', energy: 'low' },
            { id: 'nt2', name: '食器をシンクに集める', duration: 1, area: 'kitchen', tip: '最低限だけ', energy: 'low' },
            { id: 'nt3', name: 'ゴミをまとめる', duration: 1, area: 'kitchen', tip: '明日の朝楽になる', energy: 'low' }
        ],
        tomorrow_early: [
            { id: 'ne1', name: '持ち物を玄関に準備', duration: 3, area: 'entrance', tip: '忘れ物防止', energy: 'low' },
            { id: 'ne2', name: '服を用意', duration: 3, area: 'closet', tip: '朝迷わない', energy: 'low' },
            { id: 'ne3', name: '朝食の下準備', duration: 5, area: 'kitchen', tip: '時短につながる', energy: 'medium' }
        ],
        tomorrow_important: [
            { id: 'ni1', name: '大事な書類を確認', duration: 3, area: 'desk', tip: '忘れ物チェック', energy: 'low' },
            { id: 'ni2', name: 'アイロンがけ', duration: 10, area: 'closet', tip: 'パリッとした服で', energy: 'medium' },
            { id: 'ni3', name: '靴を磨く', duration: 5, area: 'entrance', tip: '第一印象アップ', energy: 'medium' }
        ],
        bathroom: [
            { id: 'nb1', name: '浴室の水滴を拭く', duration: 3, area: 'bath', tip: 'カビ防止', energy: 'low' },
            { id: 'nb2', name: '排水口の髪の毛を取る', duration: 1, area: 'bath', tip: '毎日取ると楽', energy: 'low' },
            { id: 'nb3', name: '洗面台を拭く', duration: 2, area: 'bathroom', tip: '水滴を残さない', energy: 'low' }
        ]
    },
    weekend: {
        basic: [
            { id: 'w1', name: '掃除機をかける', duration: 15, area: 'living', tip: '好きな音楽をかけながら', energy: 'medium' },
            { id: 'w2', name: '水回りの掃除', duration: 20, area: 'bathroom', tip: '週1でキレイをキープ', energy: 'high' },
            { id: 'w3', name: '床拭き', duration: 15, area: 'living', tip: '掃除機の後にやると効果的', energy: 'medium' },
            { id: 'w4', name: 'シーツ交換', duration: 10, area: 'bedroom', tip: '週1で清潔な睡眠を', energy: 'medium' },
            { id: 'w5', name: '不用品を1つ処分', duration: 5, area: 'storage', tip: '毎週少しずつが大切', energy: 'low' }
        ],
        deep: [
            { id: 'wd1', name: 'クローゼット整理', duration: 30, area: 'closet', tip: '季節ごとに見直し', energy: 'high' },
            { id: 'wd2', name: '書類整理', duration: 20, area: 'desk', tip: '不要な書類を処分', energy: 'medium' },
            { id: 'wd3', name: '冷蔵庫掃除', duration: 15, area: 'kitchen', tip: '賞味期限切れを一掃', energy: 'medium' },
            { id: 'wd4', name: '靴の手入れ', duration: 15, area: 'entrance', tip: '月1でも十分', energy: 'medium' },
            { id: 'wd5', name: '収納の見直し', duration: 20, area: 'storage', tip: '使いやすさを追求', energy: 'high' },
            { id: 'wd6', name: '窓拭き', duration: 15, area: 'living', tip: '明るい部屋に', energy: 'medium' },
            { id: 'wd7', name: 'エアコンフィルター掃除', duration: 10, area: 'living', tip: '月1が理想', energy: 'medium' }
        ],
        minimalist: [
            { id: 'wm1', name: '不用品を5つ選ぶ', duration: 10, area: 'storage', tip: '迷ったら「1年使ったか」で判断', energy: 'medium' },
            { id: 'wm2', name: '紙類を処分', duration: 15, area: 'desk', tip: '写真に撮ってデジタル化も', energy: 'medium' },
            { id: 'wm3', name: '衣類を見直す', duration: 20, area: 'closet', tip: '着ていない服を手放す勇気', energy: 'medium' },
            { id: 'wm4', name: 'キッチン用品を見直す', duration: 15, area: 'kitchen', tip: '使ってない道具はない？', energy: 'medium' },
            { id: 'wm5', name: '本・雑誌を整理', duration: 15, area: 'living', tip: '読み返さない本は手放す', energy: 'medium' }
        ],
        quick: [
            { id: 'wq1', name: 'トイレ掃除', duration: 10, area: 'toilet', tip: '週1でピカピカ', energy: 'medium' },
            { id: 'wq2', name: '洗濯槽クリーニング', duration: 5, area: 'bathroom', tip: '月1で清潔に', energy: 'low' },
            { id: 'wq3', name: 'ゴミ箱を洗う', duration: 5, area: 'kitchen', tip: '臭い防止', energy: 'low' }
        ],
        busy_holiday: [
            { id: 'wb1', name: 'サッと掃除機', duration: 5, area: 'living', tip: '目立つところだけ', energy: 'low' },
            { id: 'wb2', name: 'テーブルを拭く', duration: 2, area: 'dining', tip: '短時間でスッキリ', energy: 'low' },
            { id: 'wb3', name: '洗面所を整理', duration: 3, area: 'bathroom', tip: '出かける前に', energy: 'low' }
        ],
        family: [
            { id: 'wf1', name: '子供部屋の整理', duration: 20, area: 'kids_room', tip: '一緒に片付け', energy: 'medium' },
            { id: 'wf2', name: 'おもちゃの断捨離', duration: 15, area: 'kids_room', tip: '使わないものを選ぶ', energy: 'medium' },
            { id: 'wf3', name: '学用品の整理', duration: 10, area: 'desk', tip: '新学期に向けて', energy: 'medium' }
        ],
        bathroom_deep: [
            { id: 'wbd1', name: '浴槽をしっかり洗う', duration: 15, area: 'bath', tip: '週末にしっかり', energy: 'high' },
            { id: 'wbd2', name: '排水口の掃除', duration: 10, area: 'bath', tip: '詰まり防止', energy: 'medium' },
            { id: 'wbd3', name: 'シャンプー類の整理', duration: 5, area: 'bath', tip: '使い切りを意識', energy: 'low' }
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
