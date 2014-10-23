var defaultTitle = '門戶 [http://portal.example.com:9999]';
var notificationTimer = null;

// 聲明值得信賴的消息源——iframe的源
var trustedOrigin = 'http://chat.example.net:9999';

// 此事件監聽器監聽來自聊天部件的消息事件，驗證消息來源
function messageHandler(e) {
    if (e.origin == trustedOrigin) {
        notify(e.data);
    } else {
        // 忽略來自不可信來源的消息
    }
}

// 此爲與聊天部件通信的函數，用postMessage API發送狀態來更新iframe部件
function sendString(s) {
    document.getElementById('widget').contentWindow.postMessage(s, trustedOrigin);
}

function notify(message) {
    stopBlinking();
    blinkTitle(message, defaultTitle);
}

function stopBlinking() {
    if (notificationTimer != null) {
        // 取消定時器
	clearTimeout(notificationTimer);
    }
    // 還原頁面標題
    document.title = defaultTitle;
}

function blinkTitle(m1, m2) {
    document.title = m1;
    // 定時使頁面標題在m1與m2互換
    notificationTimer = setTimeout(blinkTitle, 1000, m2, m1);
}

// 此函數獲取門戶狀態並發送給聊天部件
function sendStatus() {
    var statusText = document.getElementById('statusText').value;
    sendString(statusText);
}

function loadDemo() {
    document.getElementById('sendButton').addEventListener('click', sendStatus, true);
    document.getElementById('stopButton').addEventListener('click', stopBlinking, true);
    // 初始顯示默認狀態
    sendStatus();
}

window.addEventListener('load', loadDemo, true);
window.addEventListener('message', messageHandler, true);
