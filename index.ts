// 生成した Prisma Client をインポートする場所が、node_modulesではなくなった点に注意じゃ
import { PrismaClient } from "./generated/prisma/client";

// Prisma Client のインスタンスを作成する
const prisma = new PrismaClient({
  // ログの設定: 'query' を指定すると、実行されたSQLクエリがコンソールに表示される
  log: ['query'],
});

// メインの処理を記述する非同期関数
async function main() {
  console.log("Prisma Client を初期化しました。");

  // データベースに接続して、すべてのユーザーを取得する
  let users = await prisma.user.findMany();
  console.log("Before ユーザー一覧:", users);

  // 新しいユーザーを一人追加する
  const newUser = await prisma.user.create({
    data: {
      name: `新しいユーザー ${new Date().toISOString()}`,
    },
  });
  console.log("新しいユーザーを追加しました:", newUser);

  // もう一度、すべてのユーザーを取得して表示する
  users = await prisma.user.findMany();
  console.log("After ユーザー一覧:", users);
}

// main 関数を実行する
main()
  .catch(e => {
    // もし途中でエラーが起きたら、内容を表示して終了する
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // 処理が成功しても失敗しても、必ず最後にデータベースとの接続を切断する
    await prisma.$disconnect();
    console.log("Prisma Client を切断しました。");
  });