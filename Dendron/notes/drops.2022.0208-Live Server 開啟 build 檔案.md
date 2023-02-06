---
id: Ge24zKfcbPxVmQ2OpQhBY
title: 0208 Live Server 開啟 build 檔案
desc: ''
updated: 1644456757297
created: 1644317231901
tags:
  - PROG.Angular
  - PROG.Server
---

## 1. 直接資料夾開啟 index.html，會遇到一些問題:

在 angular 的 index.html 預設是 `<base href="/">`

所以會以檔案資料夾目錄的位置打開(網址列會長這樣: `file:///C:/Users/xxx.../dist/apps/client/index.html`)

如果想用 `<base href="./">` 解決問題，若有設定路由會發現網址除了 server 根網址以外還多了路由，然後發生 404 錯誤...

![](/assets/images/2022-02-08-17-00-24.png)

另外，在瀏覽器上 es6 module 一定會遵循 CORS (參考文章:[ES6 模組匯入-林信良](https://www.ithome.com.tw/voice/132470))，所以如果直接用 `file:///C:/Users/xxx.../dist/apps/client/index.html` 開啟會出現這樣的錯誤:

![](/assets/images/2022-02-08-17-18-04.png)

![](/assets/images/2022-02-08-17-55-33.png)

> Origin: null 是 null 的。😭

## 2. 下載 Live Server

![](/assets/images/2022-02-08-13-49-40.png)

所以這時就可以用 vscode 的 [Live Server 擴充套件](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) 來解決 Origin 的問題。

接著發現可以成功載入首頁，但是其他路由會 404...

## 3. 使用 Live Server 但路由出問題:

原因是瀏覽器把路由當成 http request 了。😭

![](/assets/images/2022-02-08-18-04-09.png)

於是為了解決這個問題，可以設定 HashLocationStrategy。

```typescript
providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},
```

## 4. 關於 Angular HashLocationStrategy

- Angular 官網
  [HashLocationStrategy](https://angular.tw/api/common/HashLocationStrategy)

> A LocationStrategy used to configure the Location service to represent its state in the [hash fragment](https://en.wikipedia.org/wiki/URL#Syntax) of the browser's URL.
> 此 LocationStrategy 用來配置 Location 服務，以便在瀏覽器 URL 的 [hash 片段](https://en.wikipedia.org/wiki/URL#Syntax)中表示其狀態。

- URI fragment wiki 說明
  [URI fragment](https://en.wikipedia.org/wiki/URI_fragment)

> Fragments depend on the document MIME type and are evaluated by the client (web browser). Clients are not supposed to send URI fragments to servers when they retrieve a document, and without help from a local application (see below) fragments do not participate in HTTP redirections.

所以看起來 fragments 可以解決網址被送到 server 的問題！🎉

感覺設定成 HashLocationStrategy 只有好處沒有壞處的感覺(除了不常看到有網址會長這樣以外)。

## 5. 小結:設定 HashLocationStrategy + live server

以後要開啟 build 後的檔案，可以設定 HashLocationStrategy 然後再用 live server 開啟就 Ok 了。🎉
