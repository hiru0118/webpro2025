// node.jsの標準ライブラリである http と url を読み込む
// 'node:' から始めると、Node.jsに標準で入っている機能だと明示的に示せるのじゃ
const http = require('node:http');

// 環境変数 'PORT' があればそれを使う。なければ 8888番 を使う
// Webサーバーが外部からのリクエストを待ち受ける「窓口」のようなものじゃな
const PORT = process.env.PORT || 8888;

// ここでWebサーバーの本体を作っておる
// リクエスト(req)が来るたびに、この中の処理が実行されるんじゃ
const server = http.createServer((req, res) => {
  // 受け取ったリクエストのURL情報を、扱いやすい形に変換する
  const url = new URL(req.url, `http://${req.headers.host}`);

  // レスポンスのヘッダーに、文字コードがUTF-8であることを設定する
  // これをしないと、日本語が文字化けしてしまうことがあるんじゃ
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');

  // URLのパス名によって処理を分ける
  if (url.pathname === '/') {
    // http://localhost:8888/ にアクセスされた場合
    console.log('ルートパス / へのアクセスがありました。');
    res.writeHead(200); // 200は「成功」を意味するステータスコードじゃ
    res.end('こんにちは！');

  } else if (url.pathname === '/ask') {
    // http://localhost:8888/ask?... にアクセスされた場合
    console.log('/ask パスへのアクセスがありました。');
    // URLの 'q' というパラメータの値を取得する
    const question = url.searchParams.get('q');
    res.writeHead(200);
    res.end(`Your question is '${question}'`);

  } else {
    // それ以外のURLにアクセスされた場合
    console.log('未定義のパスへのアクセスがありました。');
    res.writeHead(404); // 404は「見つかりませんでした」を意味する
    res.end('Not Found');
  }
});

// 指定したポートで、サーバーを起動してリクエストを待ち始める
server.listen(PORT, () => {
  console.log(`サーバーがポート ${PORT} で起動しました: http://localhost:${PORT}`);
});