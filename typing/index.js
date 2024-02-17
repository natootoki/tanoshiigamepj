let odai_box = ["Natootoki", "Hello, world!", "Windows", "JavaScript", "Google",
"Japan", "Typing", "HyperText Markup Language", "Cascading Style Sheet", "Python",
"Cola", "Linux", "Raspberry Pi", "Arduino", "Hypertext Preprocessor",
"Hypertext Transfer Protocol", "Oracle", "PostgreSQL"]
let odai_log = []
let type_log = []
let color = "";
let odai = "";

odai = odai_box[getRandomInt(0,odai_box.length-1)];

console.log(odai[0]);

document.getElementById('question').textContent += odai;

const circle = document.getElementById('circle');

// 初期位置
let x = window.innerWidth / 2;
let y = window.innerHeight / 2;

// 移動量
const moveSpeed = 10;

function getRandomInt(min, max) {
    // min（含む）から max（含む）までのランダムな整数を生成
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function playSound(frequency) {
    // Web Audio APIを初期化
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // オシレーターノードの作成
    const oscillator = audioContext.createOscillator();

    // 出力先のノードを作成
    const gainNode = audioContext.createGain();

    // オシレーターを出力先に接続
    oscillator.connect(gainNode);

    // 出力先をAudioContextに接続
    gainNode.connect(audioContext.destination);

    // オシレーターの設定
    oscillator.type = 'sine'; // 波形: 正弦波
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime); // 周波数: 440Hz

    // 出力先の音量を設定
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);

    // オシレーターの開始
    oscillator.start();

    // 1秒後に停止
    setTimeout(() => {
      oscillator.stop();
    }, 100);
}

// キーボードのキーが押されたときのイベントハンドラ
function handleKeyPress(event) {
    // イベントから押されたキーの名前を取得
    var keyName = event.key;

    if (keyName.length == 1 && keyName == odai[document.getElementById('output').textContent.length]) {
        document.getElementById('output').textContent += keyName;
    }else if(keyName.length == 1){
        playSound(440);
    }

    // エンター押したときの処理
    if (keyName === 'Enter' && document.getElementById('output').textContent == document.getElementById('question').textContent) {
        odai_log.push(document.getElementById('question').textContent)
        type_log.push(document.getElementById('output').textContent)
        playSound(880);
        document.getElementById('log').innerHTML = "<br>";
        for(i=0;i<odai_log.length&&i<5;i++){
            if(odai_log[odai_log.length-1-i] == type_log[odai_log.length-1-i]){
                color = "blue";
            }else{
                color = "red";
            }
            document.getElementById('log').innerHTML = document.getElementById('log').innerHTML + odai_log[odai_log.length-1-i] + "<br>";
            document.getElementById('log').innerHTML = document.getElementById('log').innerHTML +'<span style="color: ' + color + ';">'+ type_log[odai_log.length-1-i] + '</span>' + "<br>" + "<br>";
        }

        document.getElementById('output').textContent = "";
        document.getElementById('question').textContent = "";
        odai = odai_box[getRandomInt(0,odai_box.length-1)];
        document.getElementById('question').textContent += odai;
    }

    if (keyName === 'ArrowUp') {
        y -= moveSpeed;
    }

    if (keyName === 'ArrowDown') {
        y += moveSpeed;
    }

    if (keyName === 'ArrowLeft') {
        x -= moveSpeed;
    }

    if (keyName === 'ArrowRight') {
        x += moveSpeed;
    }

    // 新しい位置を適用
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
}

// キーボードのキーが押されたときにイベントハンドラを呼び出す
document.addEventListener('keydown', handleKeyPress);
