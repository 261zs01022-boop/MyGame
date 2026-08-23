// 2. キー入力の監視
window.addEventListener('keydown', e => keys[e.key] = true);
window.addEventListener('keyup', e => keys[e.key] = false);

// 3. ゲームのメインループ（1秒間に60回実行される）
function gameLoop() {
    shokika();
    // 【移動処理】会話中でない場合のみ動かせる
    // スペースキーが押されたとき
      if (keys['ArrowUp'] || keys['w']) {
        if (Event.canW == 1) Wkey();
      }
      if (keys['ArrowDown'] || keys['s']) {
        if (Event.canS == 1) Skey();
      }
      if (keys['ArrowLeft'] || keys['a']) {
        if (Event.canA == 1) Akey();
      }
      if (keys['ArrowRight'] || keys['d']) {
        if (Event.canD == 1) Dkey();
      }
      if(Event.canwalk == 1){
        walk();
      }

      tojikome();
    
      if (keys['z']) { // 移動してから
        if (Event.canZ == 1) {
          Zkey()
        }
        keys["z"] = false;
      }
      if (keys['x']) { // 移動してから
        if (Event.canX == 1) {
          Xkey()
        }
        keys["x"] = false;
      }
      
      canvasreset();
      drawBackground();
      makeObjectsZ();
      drawObjects();
      drawUIs();

    // 次のフレームの実行をブラウザに要求
    requestAnimationFrame(gameLoop);
}

// ゲームスタート
gameLoop();