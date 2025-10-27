## Project Stacks

- frontend: [React Router v7](https://reactrouter.com/home)
- ORM: [drizzle](https://orm.drizzle.team/docs/get-started)
- UI/Styling: [shadcn ui](https://ui.shadcn.com/docs/installation/react-router)
- format/lint: [Biome](https://biomejs.dev/ja/guides/getting-started/)
- Git Hooks: [lefthook](https://lefthook.dev/intro.html)

- Deploy: [Cloudflare Pages](https://developers.cloudflare.com/pages/)
- Database: [Cloudflare D1](https://developers.cloudflare.com/d1/)
- Placeholder Image: [PlaceHold](https://placehold.co/)

### Cloudflare D1 データベースの作成
`wrangler`コマンドでD1データベースを作成する。
```bash
wrangler d1 create <DATABASE_NAME>
# Example: wrangler d1 create my-project-db
```
https://developers.cloudflare.com/d1/wrangler-commands/#d1-create


### Secret Variables
ローカル開発時は`.dev.vars`を使用して環境変数を管理する。
本番環境の環境変数は`wrangler secret`コマンドで管理できる。
```bash
# プロジェクトのサンプルから必要な設定をコピーできます。
cp .env.example .dev.vars

#  シークレットを登録
wrangler secret put <SECRET_NAME>
# 登録済みのシークレット一覧を表示
wrangler secret list
# シークレットを削除
wrangler secret delete <SECRET_NAME>
```

### drizzle ファイル構成
D1データベースに反映するまでの手順
1. `db`配下にdrizzleでschemaファイルを作成する。
2. `pnpm generate`でschemaファイルからmigrationファイルを生成する。

```bash
./
├── schema # drizzle用のスキーマファイル
│   ├── schema.ts 
│   └── auth-schema.ts # better-auth CLI で自動生成されるファイル
├── drizzle # migrationファイル
│   ├── _meta
│   │   └── 0000_snapshot.json
│   └── 0000_init.sql # generateコマンドで生成されるsqlファイル
├── drizzle.config.ts # configファイル
└── wrangler.jsonc
```


### Middleware
React Router の [Middleware](https://reactrouter.com/how-to/middleware) を参照
