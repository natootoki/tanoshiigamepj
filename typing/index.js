let default_text = document.getElementById('output').textContent;

function playSound() {
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
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // 周波数: 440Hz

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

    // キーの名前が 'a'（小文字）の場合に文字を表示
    // if (keyName === 'a') {
    //     document.getElementById('output').textContent += 'A';
    // }

    if (keyName.length == 1) {
        document.getElementById('output').textContent += keyName;
    }

    if (keyName === 'Enter') {
        document.getElementById('output').textContent = default_text;
        playSound();
    }
}

// キーボードのキーが押されたときにイベントハンドラを呼び出す
document.addEventListener('keydown', handleKeyPress);