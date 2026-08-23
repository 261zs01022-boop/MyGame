const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let textContext = "";
let objects = [];
let players = [];
let npcs = [];

// 1. キャラクターの設定（画像を使わず、色と四角の座標で表現）
class object {
  constructor(x, y, exist, width, height, hit, hWidth, hHeight,z) {
    this.x = x;
    this.y = y;
    this.exist = exist;
    this.width = width;
    this.height = height;
    this.hit = hit;
    this.hWidth = hWidth;
    this.hHeight = hHeight;
    this.z = z;
    objects.push(this);
  }
  hitbox(){
    return {x1: this.x + this.width - this.hWidth ,y1: this.y + this.height - this.hHeight,x2: this.hWidth, y2: this.hHeight}; // 書きやすくするための関数
  }
  zip() {
    return {x: this.x ,y: this.y ,w: this.width, h: this.height, hw: this.hWidth, hh: this.hHeight}; // 書きやすくするための関数
  };
}
class playableObject extends object {
  constructor(x, y, exsit, width, height, hit, hWidth, hHeight, z, speed, xmove, ymove, dir) {
    super(x, y, exsit, width, height, hit, hWidth, hHeight, z);
    this.speed = speed;
    this.xmove = xmove;
    this.ymove = ymove;
    this.dir = dir;
    this.talker;
    players.push(this);
  }
  
}
const player = new playableObject(50, 180, true, 32, 32, true, 32, 16, 1, 4, 0, 0, 3);

class talkableObject extends object {
    constructor(x, y, exsit, width, height, hit, hWidth, hHeight, z, talkmax) {
        super(x, y, exsit, width, height, hit, hWidth, hHeight, z);
        this.talkmax = talkmax;
        this.talknumber = 0;
        npcs.push(this);
    }
    toTalk(){
      player.talker = this;
      Event.talk = 1;
      Event.canwalk = 0;
      this.talkNext();
    }
    talkNext(){
        if(this.talkmax > this.talknumber){
          textContext = text[this.talknumber];
          this.talknumber += 1;
        } else {
          player.talker = null;
          Event.talk = 0;
          Event.canwalk = 1;
          this.talknumber = this.talkmax - 1;
        }
    }
}
const npc1 = new talkableObject(250, 180, true, 32, 48, true, 32, 18, 0, 3)
const npc2 = new talkableObject(30, 30, true, 64, 64, true, 64, 40, 0, 2);


const Event = {canwalk: 1, canZ: 1, canX: 1, canW:1, canA:1, canS:1, canD:1, talk: 0};

const keys = {};       // 押されているキーを記録するオブジェクト

function talknumberdef(){
  let n = 0;
    for (let i = 0; i < npcs.length; i++) {
        npcs[i].talknumber = n;
        n += npcs[i].talkmax;
        npcs[i].talkmax = n;
    }
}
talknumberdef();