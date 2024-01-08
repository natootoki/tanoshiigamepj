let odai_box = ["Natootoki", "Hello", "Windows", "JavaScript", "Google", "Japan", "Typing", "HyperText Markup Language"]

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

    if (keyName.length == 1) {
        document.getElementById('output').textContent += keyName;
    }

    if (keyName === 'Enter') {
        if (document.getElementById('output').textContent == document.getElementById('question').textContent){
            playSound(880);
        }else{
            playSound(440);
        }
        document.getElementById('output').textContent = "";
        document.getElementById('question').textContent = "";
        document.getElementById('question').textContent += odai_box[getRandomInt(0,odai_box.length-1)];
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
