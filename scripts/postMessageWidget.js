// 聲明值得信賴的消息源——父頁面的源
var trustedOrigin = 'http://portal.example.com:9999';

function messageHandler(e) {
    if (e.origin == trustedOrigin) {
        document.getElementById('status').textContent = e.data;
    } else {
	// 忽略來自不可信來源的消息
    }
}

// 用postMessage()函數向iframe最頂層父窗口即門戶頁面通信
function sendString(s) {
    window.top.postMessage(s, trustedOrigin);
}

function sendMessage() {
    var messageText = document.getElementById('messageText').value;
    sendString(messageText);
}

function loadDemo() {
    document.getElementById('actionButton').addEventListener('click', sendMessage, true);
}

window.addEventListener('load', loadDemo, true);
window.addEventListener('message', messageHandler, true);
