// おみくじデータ
const fortuneData = {
    大吉: {
        messages: [
            "素晴らしい一年になるでしょう。新しい挑戦を恐れずに進みましょう。",
            "あなたの努力が実を結ぶ年です。自信を持って前進してください。",
            "幸運が続く一年です。周りの人との絆を大切にしましょう。",
            "バグのない完璧なコードのように、smooth な一年になりそうです。"
        ],
        health: ["絶好調", "元気いっぱい", "健康そのもの"],
        work: ["大成功", "昇進の予感", "プロジェクト成功", "完璧なデプロイ"],
        love: ["運命の出会い", "絆が深まる", "愛に満ちた日々"],
        money: ["臨時収入あり", "財運上昇", "投資好調", "ボーナス増額"]
    },
    中吉: {
        messages: [
            "良い一年になります。小さな幸せを見つけていきましょう。",
            "着実に前進できる年です。焦らず一歩ずつ進みましょう。",
            "新しい出会いが待っています。人との繋がりを大切に。",
            "コードレビューで褒められる機会が増えそうです。"
        ],
        health: ["良好", "安定", "体調管理に注意"],
        work: ["順調", "成長の年", "チャンス到来", "CI/CD 導入成功"],
        love: ["良縁あり", "関係が深まる", "優しい時間"],
        money: ["安定", "堅実な貯蓄", "無駄遣い注意"]
    },
    小吉: {
        messages: [
            "平穏な一年です。日々の小さな幸せを大切にしましょう。",
            "地道な努力が報われます。コツコツと積み重ねていきましょう。",
            "新しい趣味を始めるのに良い年です。",
            "Stack Overflow の reputation が地味に上がる年です。"
        ],
        health: ["まずまず", "適度な運動を", "規則正しい生活"],
        work: ["普通", "真面目にコツコツ", "スキルアップ", "リファクタリング日和"],
        love: ["現状維持", "焦らずゆっくり", "友達から"],
        money: ["普通", "計画的に", "節約を心がけて"]
    },
    吉: {
        messages: [
            "穏やかな一年になります。無理せず自分のペースで。",
            "小さな幸運が訪れます。見逃さないように注意深く。",
            "周りの人に感謝する気持ちを忘れずに。",
            "とりあえず動くコードが書ける、そんな一年です。"
        ],
        health: ["注意が必要", "休息を大切に", "無理は禁物"],
        work: ["ぼちぼち", "焦らず着実に", "学びの年", "ドキュメント整備"],
        love: ["ゆっくり進展", "友情を大切に", "自分磨き"],
        money: ["倹約を", "計画的に", "貯金推奨"]
    },
    末吉: {
        messages: [
            "忍耐の一年です。地道に努力を続けましょう。",
            "後半に良いことが待っています。前半は準備期間です。",
            "困難は成長のチャンス。諦めずに挑戦しましょう。",
            "デバッグに時間がかかる年ですが、最後には解決します。"
        ],
        health: ["体調管理を", "早めの休息", "予防が大切"],
        work: ["忍耐", "準備期間", "基礎固め", "テストコード充実"],
        love: ["じっくりと", "焦りは禁物", "自分を磨く"],
        money: ["倹約", "無駄遣い注意", "計画性を"]
    },
    凶: {
        messages: [
            "試練の年ですが、乗り越えれば大きく成長できます。",
            "慎重に行動しましょう。焦りは禁物です。",
            "周りの人の助けを素直に受け入れましょう。",
            "本番環境でバグが出そうですが、落ち着いて対処しましょう。"
        ],
        health: ["要注意", "無理は厳禁", "早めの休息"],
        work: ["慎重に", "基本に忠実に", "助けを求めて", "バックアップ必須"],
        love: ["距離を保って", "焦らず待つ", "自分を大切に"],
        money: ["節約", "慎重な判断", "衝動買い厳禁"]
    },
    大凶: {
        messages: [
            "今は我慢の時。でも大丈夫、来年はきっと良くなります！",
            "転んでもただでは起きない精神で。学びの多い一年に。",
            "困難な時こそ周りの人の温かさに気づけるはず。",
            "git push --force してしまいそうな年ですが、慎重に！"
        ],
        health: ["十分な休息を", "健康第一", "無理は絶対禁物"],
        work: ["慎重すぎるくらいに", "ダブルチェック", "保守的に", "まずローカルで確認"],
        love: ["一人の時間も大切", "焦らない", "自己成長"],
        money: ["超節約", "貯蓄優先", "大きな買い物は避けて"]
    }
};

// 2026年1月1日 00:00:00 JST
const targetDate = new Date('2026-01-01T00:00:00+09:00').getTime();

// カウントダウン更新
function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
        // 新年になった
        showNewYearScreen();
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

// 新年画面表示
function showNewYearScreen() {
    document.getElementById('countdown-screen').classList.remove('active');
    document.getElementById('newyear-screen').classList.add('active');
}

// おみくじ画面表示
function showOmikujiScreen() {
    document.getElementById('newyear-screen').classList.remove('active');
    document.getElementById('omikuji-screen').classList.add('active');
    drawOmikuji();
}

// おみくじを引く
function drawOmikuji() {
    const fortunes = Object.keys(fortuneData);
    // 確率を設定（大吉と大凶を少なめに）
    const weights = [10, 20, 25, 25, 15, 3, 2]; // 大吉, 中吉, 小吉, 吉, 末吉, 凶, 大凶
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    let random = Math.random() * totalWeight;

    let selectedIndex = 0;
    for (let i = 0; i < weights.length; i++) {
        random -= weights[i];
        if (random <= 0) {
            selectedIndex = i;
            break;
        }
    }

    const fortune = fortunes[selectedIndex];
    const data = fortuneData[fortune];

    // 結果を表示
    const resultElement = document.getElementById('fortune-result');
    resultElement.textContent = fortune;
    resultElement.className = 'fortune-result';

    // CSSクラスを追加
    const className = fortune.replace(/大/g, 'dai').replace(/中/g, 'chu').replace(/小/g, 'sho')
                             .replace(/吉/g, 'kichi').replace(/末/g, 'sue').replace(/凶/g, 'kyo');
    resultElement.classList.add(className);

    // メッセージをランダムに選択
    const message = data.messages[Math.floor(Math.random() * data.messages.length)];
    document.getElementById('fortune-message').textContent = message;

    // 各運勢をランダムに選択
    document.getElementById('health').textContent = data.health[Math.floor(Math.random() * data.health.length)];
    document.getElementById('work').textContent = data.work[Math.floor(Math.random() * data.work.length)];
    document.getElementById('love').textContent = data.love[Math.floor(Math.random() * data.love.length)];
    document.getElementById('money').textContent = data.money[Math.floor(Math.random() * data.money.length)];
}

// もう一度引く
function retryOmikuji() {
    document.getElementById('omikuji-screen').classList.remove('active');
    document.getElementById('newyear-screen').classList.add('active');
}

// 雪のパーティクル生成
function createSnowflakes() {
    const container = document.getElementById('snow-container');
    const snowflakes = ['❄', '❅', '❆'];

    for (let i = 0; i < 50; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflake.textContent = snowflakes[Math.floor(Math.random() * snowflakes.length)];
        snowflake.style.left = Math.random() * 100 + '%';
        snowflake.style.animationDuration = (Math.random() * 3 + 5) + 's';
        snowflake.style.animationDelay = (Math.random() * -10) + 's';
        snowflake.style.opacity = Math.random() * 0.6 + 0.4;
        snowflake.style.fontSize = (Math.random() * 10 + 10) + 'px';
        container.appendChild(snowflake);
    }
}

// 初期化
document.addEventListener('DOMContentLoaded', function() {
    // 雪を生成
    createSnowflakes();

    // 現在の時刻をチェック
    const now = new Date().getTime();
    if (now >= targetDate) {
        // すでに新年
        showNewYearScreen();
    } else {
        // カウントダウン開始
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // イベントリスナー
    document.getElementById('omikuji-btn').addEventListener('click', showOmikujiScreen);
    document.getElementById('retry-btn').addEventListener('click', retryOmikuji);
});
