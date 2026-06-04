# 发布到 npm（GitHub Release）

本仓库配置了 GitHub Actions：当你发布一个 GitHub Release（Published）时，会自动执行测试并发布到 npm。

## 前置条件

1. 在 npm 上为该包配置 Trusted Publishers（GitHub Actions）
2. GitHub Actions 工作流需要具备 OIDC 权限（本仓库工作流已申请 `id-token: write`）
3. 需要 npm CLI 11.5.1+ 且 Node 22.14.0+（本仓库工作流会在 CI 中安装满足要求的 npm 版本）

## 发布流程

1. 确保本地测试通过

```bash
npm test
```

2. 更新版本号并创建 tag

推荐用 npm 的版本命令，它会同时更新 `package.json`、创建 git commit、并创建 tag：

```bash
npm version patch
```

你也可以改成 `minor` / `major`，或者手动编辑 `package.json` 后自己打 tag。

3. 推送 commit 与 tag

```bash
git push origin HEAD
git push origin --tags
```

4. 创建 GitHub Release

在 GitHub 仓库的 Releases 页面，选择刚刚推送的 tag（通常形如 `v0.2.3`）创建 Release 并发布。

5. 等待 GitHub Actions 完成

Release 发布后会触发工作流，工作流会执行：

- `npm install --include=optional`
- `npm test`
- 校验 tag 是否与 `package.json` 的 `version` 一致（`vX.Y.Z` ↔ `X.Y.Z`）
- `npm publish --access public --provenance`

## 常见问题

### 1) Release 发布失败：version 不匹配

请确保 tag 名与 `package.json` 的 version 对应，例如：

- tag: `v0.2.3`
- package.json: `"version": "0.2.3"`

### 2) 发布失败：需要 public access

`@scope/name` 形式的包在 npm 上默认会走 restricted，工作流已使用 `--access public`。如需发布私有包，需要将命令与 npm 权限策略改为 `restricted`。

### 3) CI 报错：npm ci lockfile 不同步 / Missing @rollup/* / Missing @esbuild/*

这通常是因为 `package-lock.json` 在某个平台上生成（例如 Windows），但 CI 在另一个平台（Linux）执行 `npm ci` 时会严格校验当前平台的 optionalDependencies 条目是否在 lockfile 里可还原。

本仓库工作流选择在 CI 中使用 `npm install --include=optional` 来避免跨平台 lockfile 导致的 `npm ci` 失败。

### 4) 发布失败：E404 Not Found - PUT https://registry.npmjs.org/@scope%2fname

通常意味着 npm 侧无法识别该包或你没有对该 scope/package 的发布权限（npm 有时会用 404 隐藏权限问题）。

排查顺序：

1. 确认 `package.json.name` 对应的包确实存在于 npm（例如 `@aviala-design/color`）
2. 确认该包已配置 Trusted Publishers，且指向当前仓库与 workflow
3. 如果这是“第一次发布该包”，很多情况下需要先用传统方式手动发布一次以创建包，然后再启用 Trusted Publishers
