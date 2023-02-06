---
id: DTeYpEuPv3KIHugUyqZPu
title: 1226 使用 Dendron 紀錄
desc: ''
updated: 1647711639804
created: 1640525260857
tags:
  - PROG.Dendron
---

## 使用 Dendron 紀錄

### Dendron 簡介

筆記都可以方便被記錄，但取出筆記又是一大學問。

Dendron 主打方便取出筆記 (get notes back out)。
作者 [Kevin](https://www.dendron.so/about) 說道 Dendron 有以下三特點:

- [Note Reference](https://wiki.dendron.so/notes/f1af56bb-db27-47ae-8406-61a98de6c78c/)
- [Commands](https://wiki.dendron.so/notes/eea2b078-1acc-4071-a14e-18299fc28f47/#refactor-hierarchy)
- [Lookup](https://wiki.dendron.so/notes/a7c3a810-28c8-4b47-96a6-8156b1524af3/)

總之，寫筆記可以變得像在寫程式，可以加入「參考」，如果「參考」不存在，還可以幫你新增一個對應的空白參考。

檔案分類以資料夾檔名分類，每篇筆記會有一個獨一無二的 id，同時一個 id 會有一個 title (文章標題)。

當使用者想將文章移去其他分類時只要改檔名就好，檔名命名邏輯以「.」分層，第一層.第二層.第三層... 以此類推。

另外還有 Note Graph 的功能 `ctrl+shift+P`、`Dendron: Show Note Graph` 就可以看到整個 vault 的結構 (下圖為我目前的 Note Graph)。

![](/assets/images/2022-01-01-13-19-20.png)

[綱要(Schemas)](https://wiki.dendron.so/notes/c5e5adde-5459-409b-b34d-a0d75cbb1052/) 是用 YAML 來為筆記設定基礎樣板。

支援 [mermaid-js](https://mermaid-js.github.io/mermaid/#/)。

另外 Dendron 提供了不少 [組織(Organizing)](https://wiki.dendron.so/notes/BWYKFQ8297OgfWWyV7Bgn/) 筆記的功能 (Tags 就是其中一種)，另外也有給團隊使用的組織方式。

![](/assets/images/2022-01-01-13-41-23.png)

> 有這麼多組織(Organizing)的方式...(水好深)。🤤

另外 Dendron 還可以部署到 Github Pages 上，詳情請參閱官網: [Dendron to Github Pages](https://wiki.dendron.so/notes/yg3EL1x9fEe4NMqxUC3jP/)。

下載 `Dendron CLI` 後可以將筆記轉成資料、並套上 `Next.js` 的部落格樣板，`git push` 到 github 上做些設定就可以看到部落格了。🎉

所以 `Next.js` 的使用者有福了!可以用熟悉的網頁框架客製化自己的部落格。

謝謝 Dendron 作者們讓菜雞如我可以接觸 `Next.js`。😆

### 撰寫文章

選擇在欲要新增文章的 parent .md 檔上，`Dendron: Lookup (Ctrl+L / Cmd+L) `，輸入檔名就可以開始寫新筆記了。

### 建置並預覽筆記

- **Preview**

  `npx dendron publish dev`

  http://localhost:3000 在本機查看網站，`Crtl+C` 離開終端機。

- **Publish**

  `npx dendron publish export --target github`

  以 target github 輸出網站。

參考資料:
https://wiki.dendron.so/notes/yg3EL1x9fEe4NMqxUC3jP/

---

### .next 專案 fork 來源

https://github.com/dendronhq/nextjs-template

---

## 問題紀錄

### github page build 失敗

```bash
  /usr/bin/git submodule sync
  Error: fatal: No url found for submodule path '.next' in .gitmodules
```

![](/assets/images/2021-12-31-19-23-24.png)

解答: https://stackoverflow.com/questions/4185365/no-submodule-mapping-found-in-gitmodule-for-a-path-thats-not-a-submodule

- 問題起因: `git submodule update --init` 發生 No submodule mapping found in .gitmodules 問題。

  覺得應該是一開始我 `git init` 時，忘記先將 .next 排除版控 `echo .next >> .gitignore`。

  造成 .git 版控出了一些問題 (.next 自己也有一個 .git 版控)，執行下面的指令後就好了。

- `git rm --cached .next`

  [git 官網參數說明](https://git-scm.com/docs/git-rm)

  ```bash
  --cached
  Use this option to unstage and remove paths only from the index.
  Working tree files, whether modified or not, will be left alone.
  ```

  取消追蹤 .next 資料夾版控後，github page build 就可以順利完成 github page 的 build 了。 😄

### npx dendron publish dev ctrl+c 以後 port 沒有清掉

`netstat -a` 查看使用中連線。

`npx kill-port 3000` 清除 3000 port。

參考網址: https://stackoverflow.com/questions/39632667/how-do-i-kill-the-process-currently-using-a-port-on-localhost-in-windows

### 加入 Disqus 留言板

參考資料:

- [Integrating Disqus in your Next.js React Application by Imran Sayed](https://imranhsayed.medium.com/disqus-is-a-networked-community-platform-used-by-hundreds-of-thousands-of-sites-all-over-the-web-39b88bafaca5)
- [如何安裝 Disqus 留言板](https://ithelp.ithome.com.tw/articles/10242269)

### 為標題編號

下載 vscode 套件 [markdown all in one](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)

`shift + ctrl + P` 輸入 number 然後選這個，就會自動編號了。

![](/assets/images/2022-02-08-18-31-50.png)
