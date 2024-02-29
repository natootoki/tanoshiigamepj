let odai_box = [
    "Natootoki", "Hello, world!", "Windows", "JavaScript", "Google",
    "Japan", "Typing", "HyperText Markup Language", "Cascading Style Sheet", "Python",
    "Cola", "Linux", "Raspberry Pi", "Arduino", "Hypertext Preprocessor",
    "Hypertext Transfer Protocol", "Oracle", "PostgreSQL",
    "Perl", "Java", "Ruby", "Docker", "Kubernetes",
    "GitHub", "Git", "GitLab", "GitBash", "Subversion",
    "Apache", "Tomcat", "NginX", "VMware", "VirtualBox",
    "こんにちは", "おはよう", "こんばんは", "さようなら", "またあした",
    "OpenAI", "ChatGPT", "Microsoft","Office", "Excel",
    "Word", "PowerPoint", "Access", "Keyboard", "Mouse",
]
let odai_log = []
let log_num = 7;
let unique_num = 3;
let unique_count = 0;
let color = "";
let odai = "";
let type = "";

let positive = 0;
let negative = 0;
let accuracy = 0;
let parts = String(accuracy.toFixed(5)).split('.'); // 小数点を基準に分割
let integerPart = parts[0]; // 整数部分
let decimalPart = parts[1] || ''; // 小数部分（ない場合は空文字列）
// 小数部分が足りない場合、ゼロで埋める
let paddedDecimalPart = decimalPart.padEnd(5, '0'); // 2桁までゼロ埋め
// ゼロ埋めした小数部分を含めて結果を生成
let accuracy_result = integerPart + (paddedDecimalPart ? '.' + paddedDecimalPart : '');
// 起点となる時間を取得
const startTime = new Date();
let timer = 0;
let speed = 0;

let mode_content = ["omoji", "komoji"]
let mode = 0;

// 日本語文字列をローマ字に変換する関数
function convertToRomaji(str) {
    // ローマ字に変換する
    return wanakana.toRomaji(str);
}

odai = odai_box[getRandomInt(0,odai_box.length-1)];
if(containsJapanese(odai)){
    // 使用例
    var japaneseString = odai;
    var romajiString = convertToRomaji(japaneseString);
    console.log(romajiString); // 出力結果: "konnichiwa, sekai!"
    odai = romajiString;
}
if (mode_content[mode] == "komoji"){
    odai = odai.toLowerCase();
}

const circle = document.getElementById('circle');

// 初期位置
let x = window.innerWidth / 2;
let y = window.innerHeight / 2;

// 移動量
const moveSpeed = 10;

function containsJapanese(str) {
    return /[^\x01-\x7E]/.test(str); // ASCII以外の文字が含まれているかどうかを判定
}

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

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('time_num').innerHTML = timer;
    document.getElementById('accuracy_num').innerHTML = accuracy_result;
    // ここにHTMLが読み込まれた後に行いたい処理を記述します
    document.getElementById('question').innerHTML = "";
    for(let i=0;i<odai.length;i++){
        if(i==type.length){
            document.getElementById('question').innerHTML += "<u>"+odai[i]+"</u>";
        }else{
            document.getElementById('question').innerHTML += odai[i];
        }
    }
    setInterval(function() {
        const currentTime = new Date();
        timer = (currentTime - startTime)/1000;
        speed = positive/timer * 60;
        document.getElementById('time_num').innerHTML = timer.toFixed(0);
        document.getElementById('speed_num').innerHTML = speed.toFixed(0);
      }, 1000);
});

// キーボードのキーが押されたときのイベントハンドラ
function handleKeyPress(event) {
    // イベントから押されたキーの名前を取得
    var keyName = event.key;
    // console.log(keyName)

    if (keyName.length == 1 && keyName == odai[type.length]) {
        color = "lime"
        positive++;
        accuracy = positive/(positive + negative);
        parts = String(accuracy.toFixed(5)).split('.'); // 小数点を基準に分割
        integerPart = parts[0]; // 整数部分
        decimalPart = parts[1] || ''; // 小数部分（ない場合は空文字列）
        // 小数部分が足りない場合、ゼロで埋める
        paddedDecimalPart = decimalPart.padEnd(5, '0'); // 2桁までゼロ埋め
        // ゼロ埋めした小数部分を含めて結果を生成
        accuracy_result = integerPart + (paddedDecimalPart ? '.' + paddedDecimalPart : '');
        speed = positive/timer * 60;
        document.getElementById('positive_num').innerHTML = positive;
        document.getElementById('accuracy_num').innerHTML = accuracy_result;
        document.getElementById('speed_num').innerHTML = speed.toFixed(0);
        type += keyName
        document.getElementById('question').innerHTML = "";
        for(let i=0;i<odai.length;i++){
            if(i==type.length){
                document.getElementById('question').innerHTML += "<u>"+odai[i]+"</u>";
            }else if(i<type.length){
                document.getElementById('question').innerHTML += '<span style="color: ' + color + ';">'+ odai[i] + '</span>';
            }else{
                document.getElementById('question').innerHTML += odai[i];
            }
        }
        if (type == document.getElementById('question').textContent){
            odai_log.push(document.getElementById('question').textContent)
            playSound(880);
            document.getElementById('log').innerHTML = "<br>";
            for(let i=0;i<odai_log.length&&i<log_num;i++){
                color = "aqua";
                let inner_index = odai_log.length-i;
                document.getElementById('log').innerHTML = document.getElementById('log').innerHTML + inner_index + "：" + '<span style="color: ' + color + ';">'+ odai_log[odai_log.length-1-i] + '</span>' + "<br>" + "<br>";
            }
    
            type = "";
            document.getElementById('question').textContent = "";
            odai = odai_box[getRandomInt(0,odai_box.length-1)];
            if(containsJapanese(odai)){
                // 使用例
                var japaneseString = odai;
                var romajiString = convertToRomaji(japaneseString);
                console.log(romajiString); // 出力結果: "konnichiwa, sekai!"
                odai = romajiString;
            }
            if (mode_content[mode] == "komoji"){
                odai = odai.toLowerCase();
            }
            while(unique_count < unique_num){
                if(odai == odai_log[odai_log.length-1-unique_count]){
                    odai = odai_box[getRandomInt(0,odai_box.length-1)];
                    if(containsJapanese(odai)){
                        // 使用例
                        var japaneseString = odai;
                        var romajiString = convertToRomaji(japaneseString);
                        console.log(romajiString); // 出力結果: "konnichiwa, sekai!"
                        odai = romajiString;
                    }
                    if (mode_content[mode] == "komoji"){
                        odai = odai.toLowerCase();
                    }
                    console.log("kaburi",unique_count+1)
                    unique_count = 0
                }else{
                    unique_count++;
                }
            }
            unique_count = 0;
            document.getElementById('question').innerHTML = "";
            for(let i=0;i<odai.length;i++){
                if(i==type.length){
                    document.getElementById('question').innerHTML += "<u>"+odai[i]+"</u>";
                }else{
                    document.getElementById('question').innerHTML += odai[i];
                }
            }
        }
    }else if(keyName.length == 1){
        negative++;
        accuracy = positive/(positive + negative);
        parts = String(accuracy.toFixed(5)).split('.'); // 小数点を基準に分割
        integerPart = parts[0]; // 整数部分
        decimalPart = parts[1] || ''; // 小数部分（ない場合は空文字列）
        // 小数部分が足りない場合、ゼロで埋める
        paddedDecimalPart = decimalPart.padEnd(5, '0'); // 2桁までゼロ埋め
        // ゼロ埋めした小数部分を含めて結果を生成
        accuracy_result = integerPart + (paddedDecimalPart ? '.' + paddedDecimalPart : '');
        document.getElementById('negative_num').innerHTML = negative;
        document.getElementById('accuracy_num').innerHTML = accuracy_result;
        playSound(440);
    }

    // エンター押したときの処理
    if (keyName === 'Enter' && type == document.getElementById('question').textContent) {
    }

    if (keyName === 'Control') {
        mode++;
        mode = mode % mode_content.length;
        console.log(mode)
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
