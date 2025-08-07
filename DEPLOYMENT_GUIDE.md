# 部署指南 - demo.amio.love

## ✅ 已完成配置

1. **GitHub Actions 工作流** - 自动构建和部署
2. **CNAME 文件** - 指向 demo.amio.love
3. **Webpack 配置** - 生产环境优化

## 🚀 立即需要完成的步骤

### 1. 配置 GitHub Pages (必需)

1. 访问你的仓库: https://github.com/byheaven/aitoy
2. 点击 **Settings** (设置)
3. 左侧菜单找到 **Pages**
4. 在 **Source** 部分，选择 **GitHub Actions**
5. 保存设置

### 2. 添加环境变量 (可选，如需要 API)

在 GitHub 仓库中：
1. Settings → Secrets and variables → Actions
2. 点击 **New repository secret**
3. 添加以下密钥（如果需要）：
   - `NEXT_PUBLIC_CONVEX_URL`: 你的 Convex URL
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: 你的 Clerk 密钥

### 3. 配置 DNS (必需)

在你的域名提供商处添加 CNAME 记录：

```
类型: CNAME
名称: demo
值: byheaven.github.io
TTL: 3600 (或默认值)
```

**常见域名提供商设置位置：**
- Cloudflare: DNS → Records → Add record
- 阿里云: 云解析 DNS → 解析设置 → 添加记录
- 腾讯云: DNS 解析 → 解析 → 添加记录

### 4. 等待部署完成

1. GitHub Actions 会自动开始构建（约 2-3 分钟）
2. 查看构建状态: https://github.com/byheaven/aitoy/actions
3. DNS 生效可能需要 5-30 分钟

## 🔍 验证部署

### 检查 GitHub Actions
```bash
# 查看最新的工作流运行状态
访问: https://github.com/byheaven/aitoy/actions
```

### 检查 DNS 解析
```bash
# 在终端运行
nslookup demo.amio.love
# 或
dig demo.amio.love
```

### 访问网站
部署成功后，访问：
- https://demo.amio.love

## 🛠 故障排除

### 如果网站无法访问：

1. **检查 GitHub Pages 状态**
   - Settings → Pages → 查看部署状态

2. **检查 DNS 配置**
   - 确认 CNAME 记录正确
   - 等待 DNS 传播（最多 48 小时）

3. **检查 Actions 日志**
   - 查看是否有构建错误

### 如果显示 404：

1. 确保 GitHub Pages 已启用
2. 检查分支是否为 `gh-pages`
3. 清除浏览器缓存

## 📊 监控

- **构建状态**: ![Build Status](https://github.com/byheaven/aitoy/actions/workflows/deploy.yml/badge.svg)
- **网站状态**: 使用 UptimeRobot 或类似服务监控

## 🔄 更新流程

每次推送到 `main` 分支都会自动触发部署：

```bash
git add .
git commit -m "Update demo"
git push origin main
# 等待 2-3 分钟，访问 demo.amio.love 查看更新
```

## 📝 注意事项

- 首次部署可能需要更长时间
- HTTPS 证书会自动配置
- 建议使用 Cloudflare 进行 CDN 加速

---

**需要帮助？** 
- 查看 Actions 日志：https://github.com/byheaven/aitoy/actions
- 查看 GitHub Pages 文档：https://docs.github.com/pages