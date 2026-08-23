const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 1. キャラクターの設定（画像を使わず、色と四角の座標で表現）
const player = { x: 50, y: 180, size: 32, speed: 4 };
const npc = { x: 250, y: 180, size: 32, msg: "こんにちは！外は危険がいっぱいだよ。" };

let isTalking = false; // 会話中かどうかのフラグ
const keys = {};       // 押されているキーを記録するオブジェクト

// 2. キー入力の監視
window.addEventListener('keydown', e => {
    keys[e.key] = true;
    
    // スペースキーが押されたとき
    if (e.key === ' ' || e.key === 'Spacebar') {
        // プレイヤーとNPCの中心座標の距離を計算（三平方の定理）
        const distX = (player.x + 16) - (npc.x + 16);
        const distY = (player.y + 16) - (npc.y + 16);
        const distance = Math.sqrt(distX * distX + distY * distY);

        // 近く（50ピクセル以内）にいたら会話を切り替える
        if (distance < 50) {
            isTalking = !isTalking;
        }
    }
});
window.addEventListener('keyup', e => keys[e.key] = false);

// 3. ゲームのメインループ（1秒間に60回実行される）
function gameLoop() {
    // 【移動処理】会話中でない場合のみ動かせる
    if (!isTalking) {
        if (keys['ArrowUp'] || keys['w']) player.y -= player.speed;
        if (keys['ArrowDown'] || keys['s']) player.y += player.speed;
        if (keys['ArrowLeft'] || keys['a']) player.x -= player.speed;
        if (keys['ArrowRight'] || keys['d']) player.x += player.speed;
    }

    // 【描画処理】一度画面を真っ白（Canvas背景色の緑）にリセット
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // NPCを描画（赤色）
    ctx.fillStyle = '#e44';
    ctx.fillRect(npc.x, npc.y, npc.size, npc.size);

    // プレイヤーを描画（青色）
    ctx.fillStyle = '#44e';
    ctx.fillRect(player.x, player.y, player.size, player.size);

    // 【メッセージウィンドウの描画】会話中のみ出現
    if (isTalking) {
        // 半透明の黒いボックス
        ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
        ctx.fillRect(20, 280, 360, 100);
        
        // 白い枠線
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.strokeRect(20, 280, 360, 100);

        // テキストの描画
        ctx.fillStyle = '#fff';
        ctx.font = '16px sans-serif';
        ctx.fillText("【 村人 】", 40, 315);
        ctx.fillText(npc.msg, 40, 345);
    }

    // 次のフレームの実行をブラウザに要求
    requestAnimationFrame(gameLoop);
}

// ゲームスタート
gameLoop();