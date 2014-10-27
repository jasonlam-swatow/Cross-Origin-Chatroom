


# 使用postMessage API的跨源聊天網站
***
> 這個網站項目集合了HTML5通信規範中兩個新元素——`postMessage` API和源安全。它利用跨文檔消息通信（Cross Document Messaging）來實現門戶頁面和聊天部件之間的交互。
***
## Overview
***
包含兩個HTML文件：`postMessagePortal.html`爲門戶頁面，`postMessageWidget.html`爲嵌在前者中的iframe部件。兩者不同源，故通過`postMessage`來跨源通信，並使用了源安全概念來篩選消息。
工作流程爲：
1.  兩者均設置對方的源爲信賴源，只接收該源發出的消息並作出處理。
2.  父窗口能改變用戶狀態，並通知iframe部件，後者作出響應。
3.  iframe部件能發送消息，並通知父窗口，後者通過閃爍網頁標題來提醒用戶（這是後臺接收事件的應用中常見的UI/UE技術）。
4.  本應用專注於`postMessage`技術的實現，在樣式方面不作強求，界面簡單煩請見諒。
***
## Run
***
兩個頁面必須部署於Web伺服器上，並來自不同的域。可將它們部署於不同域的多個Web伺服器（eg: 兩臺Apache HTTP伺服器），再運行之。
要在本機部署運行應用，需要使用Python的SimpleHTTPServer Web伺服器，步驟如下：
1.  更新hosts文件（Windows系統：`C:\Windows\system32\drivers\etc\hosts`；Linux系統：`/etc/hosts`），增加兩條指向`localhost`（IP爲`127.0.0.1`）的記錄：
    127.0.0.1  chat.example.net
    127.0.0.1  portal.example.com
2.  安裝Python，其中包括SimpleHTTPServer。
3.  打開項目目錄。
4.  在終端或CMD啓動Web伺服器：
    python -m SimpleHTTPServer 9999
   亦可直接運行`start-server.sh`腳本文件。
5.  在瀏覽器前往`http://portal.example.com:9999/postMessagePortal.html`，就能使用這個Web應用喇。
***
## Troubleshooting
***
1. 若應用運行不成功或不符預期，請檢查是否開啓SimpleHTTPServer伺服器（開啓成功時終端會顯示`Serving HTTP on 0.0.0.0 port 9999 ...`）。
2. 若頁面顯示亂碼，請設置瀏覽器的字元編碼爲`Unicode`。
