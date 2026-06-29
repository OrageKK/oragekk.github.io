---
title: "OpenSpec 技术分享：用规格驱动 AI 编程"
icon: "command"
description: "正在使用 Cursor、Claude Code、Codex、GitHub Copilot、Gemini CLI、Windsurf 等 AI 编程工具的研发团队"
date: 2026-06-29
star: true
isOriginal: true
cover: https://s41.ax1x.com/2026/06/29/pma61AK.png
category:
  - 教程
  - AI
tag:
  - ChatGPT
  - Codex
---
# OpenSpec 技术分享：用规格驱动 AI 编程

> 面向：正在使用 Cursor、Claude Code、Codex、GitHub Copilot、Gemini CLI、Windsurf 等 AI 编程工具的研发团队。
>
> 目标：理解 OpenSpec 解决什么问题、如何在 IDE 和 CLI 中落地、典型工作流、注意事项和示例。

---

## 1. 背景：为什么需要 OpenSpec

AI 编程助手很擅长生成代码，但如果需求只存在于聊天上下文里，常见问题会很快出现：

- 需求口径容易在多轮对话中漂移。
- 实现细节缺少可审查的依据。
- 换一个会话、换一个模型、换一个人之后，上下文断裂。
- 代码改完了，但产品需求、验收条件、设计取舍没有留下结构化记录。

OpenSpec 的定位是 **Spec-Driven Development, SDD，规格驱动开发**。它不是一个新的 IDE，也不是新的大模型，而是在现有 AI 编程工具之上增加一层轻量的规格工作流：

```mermaid
flowchart LR
    Idea["想法 / 需求"] --> Proposal["proposal.md<br/>为什么做、做什么"]
    Proposal --> Spec["specs/<domain>/spec.md<br/>行为要求和场景"]
    Spec --> Design["design.md<br/>技术方案"]
    Design --> Tasks["tasks.md<br/>实现清单"]
    Tasks --> Code["代码实现"]
    Code --> Validate["验证 / 审查"]
    Validate --> Archive["归档并合并到主规格"]
```

一句话概括：**先把“要做什么”沉淀成可版本化的规格，再让 AI 按规格实现。**

---

## 2. OpenSpec 是什么

OpenSpec 是 Fission-AI 开源的规格驱动开发框架，官方描述是 “Spec-driven development for AI coding assistants”。它的核心特点：

- **轻量**：基于 Markdown 文件和目录结构，不强绑定复杂平台。
- **迭代式**：不是瀑布式流程，需求、设计、任务可以在实现中持续修订。
- **适合存量项目**：不只服务新项目，也适合在已有项目中逐步补规格。
- **多工具适配**：通过 skills / commands / prompts 适配多种 AI coding assistant。
- **规格可追踪**：每个 change 都有独立目录，完成后归档，保留审计历史。

OpenSpec 主要管理两类内容：

- `openspec/specs/`：当前系统行为的事实来源。
- `openspec/changes/`：正在提议或实现中的变更。

以本地项目中一次真实归档 change 为例，目录如下：

```text
openspec/changes/archive/2026-06-11-fix-chat-top-history-pagination-scroll/
├── .openspec.yaml
├── proposal.md
├── design.md
├── tasks.md
├── specs/
│   ├── ai-message-list-public-api/
│   │   └── spec.md
│   └── ai-session-container-component/
│       └── spec.md
```

---

## 3. 核心概念

### 3.1 Change：一次可审查的变更

一个 change 代表一次明确的功能、修复、重构或架构调整。它通常包含：

| 文件 | 作用 |
| --- | --- |
| `proposal.md` | 说明为什么做、做什么、不做什么 |
| `specs/` | 描述行为变化，通常是 delta spec |
| `design.md` | 技术方案、架构影响、取舍 |
| `tasks.md` | 可执行的实现清单 |

### 3.2 Delta Spec：描述“变化”而不是重复全量文档

OpenSpec 的关键设计是 delta spec。它用 `ADDED`、`MODIFIED`、`REMOVED` 描述相对当前系统规格的变化。下面片段来自本地项目真实 change 的 `specs/ai-message-list-public-api/spec.md`。

```markdown
## ADDED Requirements

### Requirement: 历史分页 loading 位置稳定
`message-list` MUST 在历史分页加载过程中以稳定位置展示 loading 状态，并且该展示链路 MUST 与流式回复状态解耦。

#### Scenario: 触发顶部分页时展示 loading
- **WHEN** 用户触发顶部加载更多且历史请求已进入进行中状态
- **THEN** `message-list` MUST 显示分页 loading
- **THEN** loading 的位置 MUST 相对消息滚动容器保持稳定，不得出现明显漂移

## MODIFIED Requirements

### Requirement: 历史消息前插时保持滚动位置稳定
`message-list` MUST 在外层前插历史消息时保持当前阅读位置稳定，避免页面跳顶或明显抖动。历史分页补位链路中的高度测量与回算 MUST 使用统一的可滚动内容高度语义，在 `chat-top` 可见时 MUST 将其高度纳入计算。

#### Scenario: chat-top 可见时执行历史补位
- **WHEN** `chat-top` 可见且触发历史分页前插
- **THEN** `message-list` MUST 在补位计算中纳入 `chat-top` 高度
- **THEN** `message-list` MUST 保持分页前后视口锚点相对位置一致
```

### 3.3 Archive：把变更合并回主规格

当一个 change 完成后，执行归档：

- `ADDED` 合并到主规格。
- `MODIFIED` 替换主规格中的旧要求。
- `REMOVED` 从主规格删除。
- change 移动到 `openspec/changes/archive/`，保留历史。

---

## 4. 安装与初始化

官方要求 Node.js 20.19.0 或更高版本。

```bash
node --version
npm install -g @fission-ai/openspec@latest
```

进入项目目录后初始化：

```bash
cd /Users/huangkun/Desktop/AllianceWork/mer_uniapp
openspec init
```

如果要非交互式初始化，并指定工具：

```bash
# 只配置 Claude Code 和 Cursor
openspec init --tools claude,cursor

# 配置所有支持工具
openspec init --tools all

# 只创建 OpenSpec 结构，不配置 AI 工具
openspec init --tools none
```

更新 OpenSpec 包和项目内的 agent 指令：

```bash
npm install -g @fission-ai/openspec@latest
openspec update
```

---

## 5. CLI 使用方式

OpenSpec CLI 主要负责项目初始化、查看、校验、归档和配置。

| 命令 | 作用 |
| --- | --- |
| `openspec init` | 初始化项目结构并配置工具 |
| `openspec update` | 刷新 agent 指令、slash commands、skills |
| `openspec list` | 查看 active changes 和 specs |
| `openspec show <item>` | 查看某个 change 或 spec 的详情 |
| `openspec validate` | 校验规格和 change 格式 |
| `openspec view` | 打开交互式 dashboard |
| `openspec archive <change>` | 归档完成的 change |
| `openspec config` | 查看或修改配置 |

常用检查命令：

```bash
# 查看当前变更
openspec list

# 查看某个变更详情
openspec show fix-chat-top-history-pagination-scroll

# 校验单个变更
openspec validate fix-chat-top-history-pagination-scroll

# 校验全部内容，适合 CI 或脚本
openspec validate --all --json

# 打开交互式视图
openspec view
```

适合 agent 或脚本读取的命令通常支持 `--json`：

```bash
openspec list --json
openspec show fix-chat-top-history-pagination-scroll --json
openspec status --json
openspec instructions --json
```

---

## 6. IDE / AI Assistant 适配方式

OpenSpec 的 IDE 适配不是通过单一插件完成，而是把对应的 **skills、commands 或 prompts** 写入各工具约定的目录。初始化时可以选择目标工具。

官方文档列出的适配工具较多，常见包括：

| 工具 | Tool ID | 典型产物 |
| --- | --- | --- |
| Claude Code | `claude` | `.claude/skills/openspec-*/SKILL.md`、`.claude/commands/opsx/<id>.md` |
| Cursor | `cursor` | `.cursor/skills/openspec-*/SKILL.md`、`.cursor/commands/opsx-<id>.md` |
| Codex | `codex` | `.codex/skills/openspec-*/SKILL.md`、`$CODEX_HOME/prompts/opsx-<id>.md` |
| Gemini CLI | `gemini` | `.gemini/skills/openspec-*/SKILL.md`、`.gemini/commands/opsx/<id>.toml` |
| GitHub Copilot | `github-copilot` | `.github/skills/openspec-*/SKILL.md`、`.github/prompts/opsx-<id>.prompt.md` |
| Windsurf | `windsurf` | `.windsurf/skills/openspec-*/SKILL.md`、`.windsurf/workflows/opsx-<id>.md` |
| OpenCode | `opencode` | `.opencode/skills/openspec-*/SKILL.md`、`.opencode/commands/opsx-<id>.md` |

示例：为 Cursor、Claude Code、Codex 同时生成适配文件：

```bash
cd /Users/huangkun/Desktop/AllianceWork/mer_uniapp
openspec init --tools cursor,claude,codex
```

如果项目已经初始化，修改 profile 或 tools 后，需要刷新：

```bash
openspec update
```

注意：Codex 的 slash command prompt 文件按官方说明会安装到全局 Codex home，即 `$CODEX_HOME/prompts/`，如果没有设置 `$CODEX_HOME`，通常是 `~/.codex/prompts/`。

---

## 7. Slash Commands 工作流

OpenSpec 通过 AI 编程助手里的 slash commands 驱动日常流程。

### 7.1 默认 core profile

默认 profile 是 `core`，包含：

| 命令 | 作用 |
| --- | --- |
| `/opsx:propose` | 创建 change，并生成 proposal、spec、design、tasks |
| `/opsx:explore` | 在创建 change 前探索问题、分析代码、比较方案 |
| `/opsx:apply` | 按 tasks 实现代码 |
| `/opsx:sync` | 把 delta specs 合并到主 specs |
| `/opsx:archive` | 归档完成的 change |

核心路径：

```text
/opsx:propose  ->  /opsx:apply  ->  /opsx:sync  ->  /opsx:archive
```

### 7.2 扩展工作流

如果团队想更细粒度地控制每一步，可以启用扩展命令：

| 命令 | 作用 |
| --- | --- |
| `/opsx:new` | 只创建 change 脚手架 |
| `/opsx:continue` | 按依赖关系生成下一个 artifact |
| `/opsx:ff` | fast-forward，一次性生成规划文档 |
| `/opsx:verify` | 验证实现是否匹配 artifacts |
| `/opsx:bulk-archive` | 批量归档 |
| `/opsx:onboard` | 引导式教程 |

启用方式：

```bash
openspec config profile
openspec update
```

扩展路径：

```text
/opsx:new  ->  /opsx:ff 或 /opsx:continue  ->  /opsx:apply  ->  /opsx:verify  ->  /opsx:archive
```

---

## 8. 示例：基于 mer_uniapp 的历史会话滚动修复

下面使用本地项目 `/Users/xxxx/Desktop/AllianceWork/mer_uniapp/openspec` 中已有的 OpenSpec 结构做示例。该项目是一个 uni-app AI Bot 管家，核心工作目录为 `pages/AiIndex`，涉及 SSE 流式输出、AI 消息列表、历史会话、音频播放、图片/PDF 混合消息等能力。

当前项目已经沉淀了多个规格域，例如：

```text
/Users/huangkun/Desktop/AllianceWork/mer_uniapp/openspec/
├── project.md
├── config.yaml
├── specs/
│   ├── ai-session-container-component/
│   ├── ai-message-list-public-api/
│   ├── scroll-into-view-history/
│   ├── scroll-into-view-streaming/
│   ├── mixed-media-message-send/
│   └── sse-flow-controller/
└── changes/
    └── archive/
```

这类项目非常适合用 OpenSpec，因为 AI 聊天页面的行为不是单点逻辑，而是由 SSE、消息列表渲染、滚动定位、历史分页、媒体消息、TTS 播放等多条链路共同影响。

### 8.1 真实 change 路径

下面复盘项目中已经归档的一次真实 change：

```text
/Users/huangkun/Desktop/AllianceWork/mer_uniapp/openspec/changes/archive/2026-06-11-fix-chat-top-history-pagination-scroll/
├── .openspec.yaml
├── proposal.md
├── design.md
├── tasks.md
└── specs/
    ├── ai-message-list-public-api/
    │   └── spec.md
    └── ai-session-container-component/
        └── spec.md
```

`.openspec.yaml` 内容：

```yaml
schema: spec-driven
created: 2026-06-11
```

### 8.2 proposal.md 原文

```markdown
## Why

当前会话在 `sessionId` 为空但仍返回消息内容时，无法被准确识别为“今日会话”，导致 `chat-top` 展示与历史分页滚动补位行为不一致。该问题直接影响会话首屏体验与上拉加载稳定性，需要尽快修复并统一规则。

## What Changes

- 新增“今日会话识别”判定：当 `sessionId` 为空且查询返回有效消息内容时，标记为今日会话。
- 调整 `chat-top` 展示规则：今日会话场景下显示 `chat-top`，并让其与消息列表同一滚动容器共同滑动。
- 修复历史分页滚动补位高度计算：在历史前插与高度回算链路中纳入 `chat-top` 高度，避免跳动/偏移。
- 修复历史加载中 loading 视觉位置：使 loading 在分页触发与恢复阶段位置稳定、与滚动逻辑一致。
- 明确范围边界：不修改流式文本增量渲染与流式贴底滚动逻辑。

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `ai-session-container-component`: 会话记录查询结果在 `sessionId` 为空时，增加“今日会话”识别与 `chat-top` 可见性决策要求。
- `ai-message-list-public-api`: 历史分页补位、内容高度测量与 loading 展示要求更新，要求将 `chat-top` 纳入同一滚动与高度计算语义。

## Impact

- Affected specs:
  - `openspec/specs/ai-session-container-component/spec.md`
  - `openspec/specs/ai-message-list-public-api/spec.md`
- Affected code (expected):
  - `pages/AiIndex/components/message-list/index.vue`
  - 会话容器与历史查询状态映射相关文件（AiIndex 会话容器/会话状态管理）
- 无新增后端依赖与外部 API；主要为前端会话状态与滚动计算行为修正。
```

### 8.3 design.md 原文摘录

`design.md` 的 `Context` 部分原文如下：

```markdown
## Context

当前 AI 会话页面存在三类耦合问题：

1. 会话识别问题：`sessionId` 为空时，首屏查询可能仍返回消息内容，但前端未将其识别为“今日会话”语义，导致 `chat-top` 展示策略与真实会话状态不一致。
2. 历史分页补位问题：历史前插后的滚动回算依赖内容高度差，但在 `chat-top` 可见场景下存在未纳入高度的路径，出现补位偏移。
3. loading 视觉问题：分页 loading 的展示位置与滚动恢复时机不一致，用户可感知到位置漂移。

现有实现已经将流式增量滚动与历史分页滚动拆为两条链路，且流式链路在当前版本稳定。本次变更必须严格限制在“历史分页相关滚动 + 会话识别 + chat-top 展示”范围内。
```

其中关键目标和非目标如下，来自原文件的 `Goals / Non-Goals` 部分：

```markdown
## Goals / Non-Goals

**Goals:**
- 在 `sessionId` 为空但查询返回消息时，建立明确的“今日会话”判定，并驱动 `chat-top` 展示。
- 保证 `chat-top` 与消息列表处于同一滚动上下文，随会话消息一起滑动。
- 修复历史分页补位高度回算，统一将 `chat-top` 纳入测量语义。
- 修复分页 loading 的位置显示与状态切换时机。
- 保持流式增量滚动、流式贴底、流式 markdown 渲染链路不变。

**Non-Goals:**
- 不调整 SSE 流式 patch 合并、节流策略、自动贴底策略。
- 不引入新的后端接口、协议字段或数据存储。
- 不重构消息气泡渲染结构与样式体系。
```

设计决策包括：

```markdown
### Decision 1: 增加“今日会话”显式状态，而不是复用 `sessionId` 非空判定
- Choice: 在会话容器层根据“`sessionId` 为空 + 查询结果存在有效消息”设置今日会话标识，并向 message-list 传递 `hasHistory` / `showChatTop` 所需状态。
- Rationale: `sessionId` 仅能标识命名会话，无法覆盖“匿名但有当日消息”的场景；显式状态可避免将 UI 逻辑硬编码为 `sessionId` 判断。
- Alternative considered: 继续使用 `sessionId` 作为唯一判定。Rejected，因为会漏判今日匿名会话。

### Decision 2: 历史分页高度测量统一走“可滚动内容总高”语义
- Choice: 历史分页补位相关的 `oldScrollHeight/newScrollHeight/bottomDistance` 回算统一基于“`chat-top`（可见时）+ message-list”总高度。
- Rationale: 这样可以保证在 `chat-top` 显隐场景下，补位链路拥有一致输入，避免只测量消息区导致的偏移。
- Alternative considered: 在补位最终值上做固定偏移补偿。Rejected，因为偏移与设备尺寸、渲染时序相关，不稳定。

### Decision 3: loading 展示位置由分页状态驱动，并与滚动恢复阶段解耦
- Choice: loading 的显示与隐藏仅由分页状态机（触发、请求中、恢复完成）驱动，避免被流式状态和其他 UI 状态干扰。
- Rationale: 提升用户感知稳定性，减少 loading 闪动与漂移。
- Alternative considered: 使用绝对定位 + 动态 top 追随。Rejected，因为会引入额外测量与抖动风险。

### Decision 4: 明确“流式滚动链路不可变”作为保护约束
- Choice: 在实现和验收中将流式增量滚动逻辑列为保护区，不改动相关分支、阈值与回调。
- Rationale: 降低回归面，确保本次修复聚焦历史分页问题。
- Alternative considered: 同步整理流式与历史滚动逻辑。Rejected，因为超出本次目标，风险较高。
```

### 8.4 specs 原文

`specs/ai-session-container-component/spec.md`：

```markdown
## MODIFIED Requirements

### Requirement: 会话记录查询入口
系统 MUST 在接收到有效 `sessionId` 时请求该会话的历史聊天记录，并将首屏历史消息注入消息列表；系统 MUST 维护分页状态以支持继续加载更早的历史页。系统 MUST 在 `sessionId` 为空但查询返回有效消息内容时，将该结果识别为“今日会话”，并输出用于控制 `chat-top` 展示的会话可见性状态。

#### Scenario: 首次进入会话请求历史
- **WHEN** 组件实例收到有效 `sessionId`
- **THEN** 系统 MUST 请求该会话的首屏历史记录
- **THEN** 系统 MUST 将返回的历史消息转换为统一消息模型并注入消息列表
- **THEN** 系统 MUST 记录当前分页状态用于后续继续加载

#### Scenario: 继续请求更早历史页
- **WHEN** 用户触发向上滑动分页并且当前仍有更早历史可加载
- **THEN** 系统 MUST 基于当前分页状态请求更早一页历史记录
- **THEN** 系统 MUST 将解析后的历史消息前插到现有消息列表之前
- **THEN** 系统 MUST 保留当前实时消息与已渲染历史消息

#### Scenario: 无 sessionId 但查询结果存在有效消息
- **WHEN** 当前 `sessionId` 为空且会话查询返回有效消息内容
- **THEN** 系统 MUST 将该会话标记为“今日会话”
- **THEN** 系统 MUST 向消息列表层传递用于展示 `chat-top` 的可见性状态
- **THEN** 系统 MUST 保持历史分页状态可继续工作
```

`specs/ai-message-list-public-api/spec.md`：

```markdown
## ADDED Requirements

### Requirement: 历史分页 loading 位置稳定
`message-list` MUST 在历史分页加载过程中以稳定位置展示 loading 状态，并且该展示链路 MUST 与流式回复状态解耦。

#### Scenario: 触发顶部分页时展示 loading
- **WHEN** 用户触发顶部加载更多且历史请求已进入进行中状态
- **THEN** `message-list` MUST 显示分页 loading
- **THEN** loading 的位置 MUST 相对消息滚动容器保持稳定，不得出现明显漂移

#### Scenario: 分页完成后清理 loading
- **WHEN** 历史分页请求完成并进入补位恢复结束状态
- **THEN** `message-list` MUST 隐藏分页 loading
- **THEN** 该过程 MUST 不影响流式回复中的状态展示

## MODIFIED Requirements

### Requirement: 历史消息前插时保持滚动位置稳定
`message-list` MUST 在外层前插历史消息时保持当前阅读位置稳定，避免页面跳顶或明显抖动。历史分页补位链路中的高度测量与回算 MUST 使用统一的可滚动内容高度语义，在 `chat-top` 可见时 MUST 将其高度纳入计算。

#### Scenario: 前插历史消息后保持视图
- **WHEN** 外层在当前消息列表前插入更早的历史消息
- **THEN** `message-list` MUST 保持用户当前阅读区域的相对位置不变
- **THEN** `message-list` MUST 不因前插行为重置到列表顶部或底部

#### Scenario: chat-top 可见时执行历史补位
- **WHEN** `chat-top` 可见且触发历史分页前插
- **THEN** `message-list` MUST 在补位计算中纳入 `chat-top` 高度
- **THEN** `message-list` MUST 保持分页前后视口锚点相对位置一致

#### Scenario: 修复范围不影响流式增量滚动
- **WHEN** 实施历史分页滚动与高度计算修复
- **THEN** `message-list` MUST 保持既有流式文本增量滚动逻辑不变
- **THEN** `message-list` MUST 不改变流式贴底触发与步进跟随行为
```

### 8.5 tasks.md 原文

```markdown
## 1. OpenSpec Review
- [x] 1.1 在会话容器中新增“今日会话”判定：`sessionId` 为空且查询返回有效消息时标记今日会话
- [x] 1.2 将今日会话判定结果映射为 message-list 可消费的 `chat-top` 可见性状态
- [x] 1.3 校验 `sessionId` 非空、有消息、无消息三类场景下 `chat-top` 显示符合预期

## 2. 历史分页滚动补位修复
- [x] 2.1 梳理历史分页补位链路中的高度输入点（old/new scrollHeight、bottomDistance、回算 scrollTop）
- [x] 2.2 将 `chat-top` 可见场景纳入统一内容高度计算，确保前插补位锚点稳定
- [x] 2.3 验证历史分页前插后视口位置保持不变，且不出现跳顶/抖动

## 3. loading 位置与状态修复
- [x] 3.1 调整分页 loading 显隐时机，仅受历史分页状态驱动
- [x] 3.2 修复 loading 在分页请求与恢复阶段的位置稳定性
- [x] 3.3 验证 loading 修复不影响流式回复状态展示

## 4. 回归与边界保护
- [x] 4.1 回归验证流式文本增量滚动、贴底触发与步进跟随逻辑无改动
- [x] 4.2 回归验证 chat-top 与消息列表同容器滚动，且在今日会话下可随列表滑动
- [x] 4.3 补充/更新相关注释与测试记录，明确本次仅覆盖“历史分页相关滚动”修复范围
```

### 8.6 如何讲这个案例

这个案例的重点不是“AI 写了代码”，而是 OpenSpec 如何把一次前端体验问题拆成可审查的工程资产：

- `proposal.md` 说明业务现象、修改范围和影响面。
- `design.md` 明确为什么不用 `sessionId` 作为唯一判定、为什么要统一高度测量语义。
- `specs/` 把“今日会话识别”“loading 位置稳定”“历史消息前插保持滚动位置”变成可验收要求。
- `tasks.md` 把实现拆成会话识别、滚动补位、loading、回归保护四组任务。
- `[x]` 状态说明该 change 已完成并归档，可以作为团队内部的示范样板。

---

## 9. 团队落地建议

### 9.1 适合使用 OpenSpec 的场景

- AI 编程助手已经进入日常开发，但缺少过程治理。
- 多人协作时，需求、设计、实现经常脱节。
- 需要保留功能变化的审计记录。
- 存量项目希望逐步补齐系统行为规格。
- 希望同一套流程同时支持 IDE 和 CLI agent。

### 9.2 不一定适合的场景

- 一次性脚本、非常小的临时代码修改。
- 需求完全不确定，仍处于早期头脑风暴阶段。此时可以先用 `/opsx:explore`，不要急着创建 change。
- 团队没有 review 习惯，只是把 OpenSpec 当成“让 AI 多生成几个 md 文件”的工具。

### 9.3 推荐团队约定

- 每个非平凡改动必须有一个 change。
- `proposal.md` 需要写清楚 scope 和 non-goals。
- `spec.md` 必须包含可验收的 scenario。
- `tasks.md` 的任务粒度应该能被逐项 review。
- `/opsx:apply` 前必须 review proposal/spec/design/tasks。
- 归档前必须运行 `openspec validate` 和项目测试。
- 对安全、权限、计费、数据迁移类改动，必须补充风险和回滚方案。

---

## 10. 注意事项

### 10.1 规格不是越多越好

OpenSpec 的价值在于减少歧义，不是制造文档负担。规格应该描述：

- 用户可观察行为。
- 系统必须满足的约束。
- 关键异常路径。
- 验收场景。

不要把每一行实现细节都写进 spec，否则后续维护成本会很高。

### 10.2 不要跳过人工 review

AI 生成的 proposal、design 和 tasks 仍然可能有误。尤其要检查：

- 是否遗漏边界条件。
- 是否扩大了 scope。
- 是否引入安全或兼容性风险。
- 是否把“不做什么”写清楚。

### 10.3 控制上下文污染

官方也强调上下文卫生。建议：

- 一个 change 尽量对应一个清晰会话。
- 实现前让 AI 重新读取当前 change artifacts。
- 长会话中定期要求 AI 总结当前状态。
- 大型 change 拆成多个小 change。

### 10.4 注意工具适配差异

不同 AI 工具对 skills、commands、prompts 的识别机制不同。初始化后要检查：

- 是否生成了目标工具对应目录。
- slash command 是否能在 IDE 中被识别。
- Codex 这类工具是否写入了全局 prompts 目录。
- 团队成员是否使用相同的 OpenSpec 版本和 profile。

### 10.5 Telemetry

OpenSpec 官方 README 说明会收集匿名使用统计，内容包括命令名和版本，不包含参数、路径、内容或 PII，并且 CI 中自动禁用。如果团队有合规要求，可以关闭：

```bash
export OPENSPEC_TELEMETRY=0
# 或
export DO_NOT_TRACK=1
```

---

## 11. 和直接用 AI 写代码的差异

| 维度 | 直接让 AI 改代码 | 使用 OpenSpec |
| --- | --- | --- |
| 需求记录 | 主要在聊天上下文 | 进入 repo，可版本化 |
| 审查对象 | 主要是代码 diff | proposal/spec/design/tasks/code |
| 上下文延续 | 换会话容易丢 | artifacts 持久存在 |
| 团队协作 | 依赖口头同步 | change 目录承载共识 |
| 风险控制 | 容易边写边偏 | 先约束 scope 和验收条件 |
| 工具锁定 | 取决于当前 IDE/Agent | 适配多种工具 |

---

## 12. 参考资料

- OpenSpec GitHub: https://github.com/Fission-AI/OpenSpec
- OpenSpec 官网: https://openspec.pro/
- Getting Started: https://github.com/Fission-AI/OpenSpec/blob/main/docs/getting-started.md
- Commands: https://github.com/Fission-AI/OpenSpec/blob/main/docs/commands.md
- CLI Reference: https://github.com/Fission-AI/OpenSpec/blob/main/docs/cli.md
- Supported Tools: https://github.com/Fission-AI/OpenSpec/blob/main/docs/supported-tools.md
