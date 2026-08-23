function shokika(){
    player.xmove = 0;
    player.ymove = 0;
}

function canvasreset(){
    // 【描画処理】一度画面を真っ白（Canvas背景色の緑）にリセット
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function makeBackGround(){
    
}

function drawBackground(){
    
}

function makeObjectsZ(){
    for(let i = 0; i < objects.length; i++){
        objects[i].z = objects[i].y + objects[i].height;
    }
    
}

function drawObjects(){
    objects.sort((a,b) => a.z - b.z);
    for(let i = 0; i < objects.length; i++){
        if(objects[i].constructor.name == "playableObject") ctx.fillStyle = '#44e';    // プレイヤーを描画（青色）
        if(objects[i].constructor.name == "talkableObject") ctx.fillStyle = '#e44';// // NPCを描画（赤色
        ctx.fillRect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
}

function drawUIs(){
    // 【メッセージウィンドウの描画】会話中のみ出現
    if (Event.talk == 1) {
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
        ctx.fillText(textContext, 40, 315);
    }

}

function tojikome(){
    let p = player.zip();
    if (p.x < 0) player.x = 0;
    if (p.x > canvas.width - p.w) player.x = canvas.width - p.w;
    if (p.y < 0) player.y = 0;
    if (p.y > canvas.height - p.h) player.y = canvas.height - p.h;
}

function overLap(ax, ay, aw, ah, bx, by, bw, bh) {
    return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
}

function walk(){
    let c;
    player.x += player.xmove;
    let p = player.hitbox();
    for (let i = 0; i < npcs.length; i++) {
        if(npcs[i].hit == false) continue;
        c = npcs[i].hitbox();
        if(overLap(p.x1, p.y1, p.x2, p.y2, c.x1, c.y1, c.x2, c.y2)){
            for (let i = 0; i < Math.abs(player.xmove); i++) {
                if(overLap(p.x1, p.y1, p.x2, p.y2, c.x1, c.y1, c.x2, c.y2)){
                    player.x -= player.xmove/Math.abs(player.xmove);
                    p = player.hitbox();
                }               
            }
        }
    }
    player.y += player.ymove;
    p = player.hitbox();
    for (let i = 0; i < npcs.length; i++) {
        if (npcs[i].hit == false) continue;
        c = npcs[i].hitbox();
        if(overLap(p.x1, p.y1, p.x2, p.y2, c.x1, c.y1, c.x2, c.y2)){
            for (let i = 0; i < Math.abs(player.ymove); i++) {
                if(overLap(p.x1, p.y1, p.x2, p.y2, c.x1, c.y1, c.x2, c.y2)){
                    player.y -= player.ymove/Math.abs(player.ymove);
                    p = player.hitbox();
                }
               
            }
        }
    }
  }

function catcher(intence){
    let c;
    let p = player.zip();
    let sucsess = [];
    let w;
    let h;
    if(intence == 1){w = 1; h = 1;}
    if(intence == 2){w = player.width; h = 10;}
    switch(player.dir){
    case 0:
        for (let i = 0; i < npcs.length; i++) {
            if(npcs[i].hit == false) continue;
            c = npcs[i].zip();
            if(overLap(p.x+p.hw/2-w/2, p.y-h, w, h, c.x, c.y, c.w, c.h)){
                sucsess.push(npcs[i]);
            }
        }
        break;
    case 1:
        for (let i = 0; i < npcs.length; i++) {
            if(npcs[i].hit == false) continue;
            c = npcs[i].zip();
            if(overLap(p.x-h, p.y+p.hh/2-w/2, h, w, c.x, c.y, c.w, c.h)){
                sucsess.push(npcs[i]);
            }
        }
        break;
    case 2:
        for (let i = 0; i < npcs.length; i++) {
            if(npcs[i].hit == false) continue;
            c = npcs[i].zip();
            if(overLap(p.x+p.hw/2-w/2, p.y+p.hh, w, h, c.x, c.y, c.w, c.h)){
                sucsess.push(npcs[i]);
            }
        }
        break;
    case 3:
        for (let i = 0; i < npcs.length; i++) {
            if(npcs[i].hit == false) continue;
            c = npcs[i].zip();
            if(overLap(p.x+p.hw, p.y+p.hh/2-w/2, h, w, c.x, c.y, c.w, c.h)){
                sucsess.push(npcs[i]);
            }
        }
        break;
    default: alert("エラーが発生しました。catcher"); 
        break;
    }
    return sucsess;
}

function Zkey(){
    switch (Event.talk){
    case 0:
        speaker = catcher(1);
        if(speaker.length != 0){
            speaker[0].toTalk();
        }else{
            speaker = catcher(2);
            if(speaker.length != 0){
                speaker[0].toTalk();
            }
        }
        break;
    case 1:
        player.talker.talkNext();
        break;
    default:
        alert("エラーが発生しました。Zkey"); 
        break;
    }
}

function Xkey(){

}

function Wkey(){
    if (Event.canwalk == 1) {
        player.ymove -= player.speed; player.dir = 0;
    }
}
function Akey(){
    if (Event.canwalk == 1) {
        player.xmove -= player.speed; player.dir = 1;
    }
}
function Skey(){
    if (Event.canwalk == 1) {
        player.ymove += player.speed; player.dir = 2;
    }
}
function Dkey(){
    if (Event.canwalk == 1) {
        player.xmove += player.speed; player.dir = 3;
    }
}