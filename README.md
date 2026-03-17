# Coding Agents & MCP Tools for Maintenance and Debugging

As vibe-coded projects grow larger, they often evolve into large codebases with increasingly complex architectures that require better tooling for understanding, debugging, and maintenance. These same challenges also exist in existing large codebases and complex systems. This repository focuses on tools that support real-world software development workflows in such environments. The goal is to highlight tools that help developers and AI coding agents understand, debug, maintain, and extend software systems effectively.

---

## Vision

Modern AI coding agents are becoming powerful at generating new code, but real software development rarely starts from scratch. Most development happens inside large codebases and complex systems, and increasingly also within vibe-coded projects as they grow and evolve.

Developers working in these environments often need to understand the codebase, reason about system behavior, debug issues, and safely introduce changes. Because of this, effective AI tooling must support the same workflows developers already rely on.

This repository focuses on how coding agents and MCP-based tools can assist developers in these real-world scenarios. The curated tools help support workflows such as debugging, codebase understanding, documentation, maintenance, testing, and security.

The goal is to highlight tools that enable agent-assisted development for vibe-coded systems and large, long-lived software systems.

---

## Curated Tools

Tools in this repository are organized by common development workflows. Many of these tools can be combined to support complete development workflows, and the descriptions under each category briefly explain how they can be used together in practical scenarios.

---

### Debugging

Tools that help investigate failures, analyze logs, trace issues, and understand runtime behavior.

- [Sentry](https://github.com/getsentry/sentry) (MCP) – Real-time error tracking and performance monitoring   
- [Last9 MCP](https://github.com/last9/last9-mcp-server) – Bring logs, metrics, and traces from production into the local debugging environment  
- [Raygun](https://github.com/MindscapeHQ/mcp-server-raygun) – Interact with your crash reporting and real-user monitoring data on your Raygun account  
- [proxymock](https://docs.speedscale.com/proxymock/reference/mcp/) – An MCP server that automatically generates tests and mocks by recording a live app  
- [ReportPortal](https://github.com/reportportal/reportportal-mcp-server) – Explore and analyze automated test results from ReportPortal using your favourite LLM 
- [Debugg.AI](https://github.com/debugg-ai/debugg-ai-mcp) – AI-powered debugging and testing platform for analyzing application failures 
- [lldb-mcp](https://github.com/stass/lldb-mcp) — MCP server that enables AI‑driven debugging using the LLDB debugger.
- [SqlAugur MCP](https://github.com/mbentham/SqlAugur) — Provides AST-based SQL query validation and analysis to help review and understand SQL Server queries during development and debugging workflows.
- [Multiplayer MCP](https://www.multiplayer.app/docs/ai/mcp-server) – Analyze full-stack session recordings to reproduce and debug bugs
- [Memalot MCP](https://github.com/nfergu/memalot) – Finds memory leaks in Python programs via MCP  
- [DuckDuckGo MCP Server](https://github.com/nickclyde/duckduckgo-mcp-server) – MCP search integration for private workflows    

---

### Codebase Understanding

Tools that help developers and AI agents analyze large repositories and understand complex systems.
 
- [Sourcegraph Cody MCP](https://sourcegraph.com/docs/api/mcp) – AI-powered code search and codebase understanding tool  
- [Continue MCP](https://github.com/continuedev/continue) – Open-source AI coding assistant that understands large codebases
- [Nx MCP](https://github.com/nrwl/nx-console/blob/master/apps/nx-mcp) – Exposes Nx project graph and architecture insights to AI tools  
- [JetBrains MCP](https://www.jetbrains.com/help/idea/mcp-server.html) – Work on your code with JetBrains IDEs such as IntelliJ IDEA and PhpStorm  
- [Rember](https://github.com/rember/rember-mcp) – Create spaced repetition flashcards in Rember to remember anything you learn in your chats  
- [code-assistant](https://github.com/stippi/code-assistant) – MCP coding assistant for exploring and editing code repositories with AI assistance.
- [code-context-provider-mcp](https://github.com/AB498/code-context-provider-mcp) – Extracts directory structures and code symbols using Tree-sitter for AI code analysis.
- [consult7](https://github.com/szeider/consult7) – Tool for analyzing large codebases and document collections using high-context AI models.
- [cplusplus-mcp](https://github.com/kandrwmrtn/cplusplus_mcp) – Semantic C++ code analysis using libclang AST parsing for better code navigation and understanding.
- [Files MCP](https://github.com/flesler/mcp-files) – Enables AI agents to search, locate, and modify code symbols across large codebases.
- [Git MCP](https://github.com/geropl/git-mcp-go) – Provides AI assistants access to local Git repositories for version control operations.
- [GitHub MCP Server](https://github.com/0xshariq/github-mcp-server) – Provides comprehensive Git repository management including commit history, branches, and repository operations.
- [GitHub Actions MCP](https://github.com/ko1ynnky/github-actions-mcp-server) – Enables interaction with GitHub Actions workflows and CI/CD pipelines.
- [GitHub Enterprise MCP](https://github.com/ddukbg/github-enterprise-mcp) – Provides MCP integration with GitHub Enterprise environments.
- [GitHub GraphQL MCP](https://github.com/QuentinCody/github-graphql-mcp-server) – Provides access to GitHub’s GraphQL API for complex repository queries.
- [Figma Context MCP](https://github.com/GLips/Figma-Context-MCP) – Provides direct access to Figma design file data for development workflows.
- [Figma MCP Server](https://github.com/paulvandermeijs/figma-mcp) – High-performance MCP server for reading and exporting Figma design files.
- [Figma to Flutter MCP](https://github.com/mhmzdev/figma-flutter-mcp) – Converts Figma design tokens into Flutter UI code.
- [GitHub Projects MCP](https://github.com/redducklabs/github-projects-mcp) — Manage GitHub Projects with full GraphQL API access including project items, fields, and milestones.
- [GitHub Repos Manager MCP Server](https://github.com/kurdin/github-repos-manager-mcp) — GitHub automation and repository management platform with token-based authentication and extensive API integration.
- [Java Decompiler MCP](https://github.com/idachev/mcp-javadc) — Decompile Java bytecode from class files or JAR archives into readable source code using the CFR decompiler.
- [Language Server](https://github.com/isaacphi/mcp-language-server) — Provides semantic code navigation tools such as definitions, references, rename, and diagnostics.
- [lsp-mcp](https://github.com/Tritlo/lsp-mcp) — Connects to Language Server Protocol to provide hover information, code actions, and completions.
- [lean-lsp-mcp](https://github.com/oOo0oOo/lean-lsp-mcp) — Interact with the Lean theorem prover through Language Server Protocol tools.
- [vscode-ai-model-detector](https://github.com/thisis-romar/vscode-ai-model-detector) — Detect active AI models inside VS Code Copilot sessions to improve development workflows.
- [Code-to-Tree MCP](https://github.com/micl2e2/code-to-tree) — Converts source code from multiple languages into Abstract Syntax Trees (AST) to help analyze and understand code structure.
- [Cicada MCP](https://github.com/wende/cicada) — Provides module search and function tracking for Elixir projects to help explore and understand large codebases.
- [CodeGraphContext](https://github.com/Shashankss1205/CodeGraphContext) — Index local code into a graph database to help AI assistants understand the codebase through graphical visualizations.  
- [RepoMapper](https://github.com/pdavis68/RepoMapper) — Generates a dynamic repository map including function prototypes and relevant file information (similar to Aider.chat functionality).  
- [FileScopeMCP](https://github.com/admica/FileScopeMCP) — Analyzes the codebase based on dependency relationships and assigns importance scores to files.  
- [callout](https://github.com/fantasieleven-code/callout) — Performs architecture reviews using nine expert viewpoints (CTO, Security, DevOps, etc.).  
- [CodeLogic](https://github.com/CodeLogicIncEngineering/codelogic-mcp-server) — Provides code dependency analytics and architectural risk analysis.  
- [javalens-mcp](https://github.com/pzalutski-pixel/javalens-mcp) — Offers 56 semantic Java analysis tools (Eclipse JDT) for compiler-accurate navigation and refactoring.  
- [sharplens-mcp](https://github.com/pzalutski-pixel/sharplens-mcp) — Provides 58 semantic C#/.NET analysis tools (Roslyn) for code intelligence.  
- [repocrunch](https://github.com/kimwwk/repocrunch) — Generates deterministic JSON output with GitHub repository intelligence: tech stack, architecture, and health metrics.  
- [react-analyzer-mcp](https://github.com/azer/react-analyzer-mcp) — Analyzes React code locally and generates project documentation/llm.txt.  
- [Chisel](https://github.com/ckanthony/Chisel) — Enables efficient code inspection in large codebases by sharing optimized unified diffs instead of full files, allowing targeted file reading and analysis.  
- [smart-tree](https://github.com/8b-is/smart-tree) — AI-native directory visualization tool that presents project structures in a compact format using semantic analysis.  
- [large-file-mcp](https://github.com/willianpinho/large-file-mcp) — Provides a server for efficiently exploring large files with smart chunking, navigation, and regex-based search capabilities.   
- [git-context-mcp](https://github.com/TamiShaks-2/git-context-mcp) — Analyzes local Git repositories to generate a structured code map and identify risk hotspots.
- [mcp-git-ingest](https://github.com/adhikasp/mcp-git-ingest) — Reads and analyzes GitHub repositories to provide full context for AI agents.

---

### Documentation

Tools that help generate, maintain, or improve project documentation.
 
- [DevDocs MCP](https://github.com/freeCodeCamp/devdocs) – Access and query developer documentation directly from MCP clients  
- [Context7 MCP](https://github.com/upstash/context7) – Provides structured documentation context for AI agents 
- [Microsoft Learn Docs MCP](https://github.com/microsoftdocs/mcp) – Structured access to Microsoft documentation for code generation and Q&A  
- [Notifly MCP](https://github.com/notifly-tech/notifly-mcp-server) – Provides trusted documentation and SDK examples for integrations 
- [PrestaShop.com](https://docs.mcp.prestashop.com/) – Manage your PrestaShop store with AI Assistant by using the official PrestaShop MCP server  
- [ADR Analysis](https://github.com/tosin2013/mcp-adr-analysis-server) – AI-powered Architectural Decision Records analysis  
- [Apple Docs](https://github.com/kimsungwhee/apple-docs-mcp) – Provides natural language access to Apple Developer documentation, frameworks, and APIs.
- [Docs MCP](https://github.com/da1z/docsmcp) – Provides documentation access to local and remote files including llms.txt resources.
- [DocuMCP](https://github.com/tosin2013/documcp) – Document management server supporting multiple formats and document operations.
- [Docy MCP](https://github.com/oborchers/mcp-server-docy) – Real-time access to technical documentation sources for accurate AI coding assistance.
- [DocBase MCP](https://help.docbase.io/posts/3925317) – Official MCP server for managing posts and collaboration in DocBase documentation platform.
- [HackMD MCP Server](https://github.com/yuna0x0/hackmd-mcp) — Integration with HackMD collaborative markdown editor for creating, reading, and updating documentation using MCP.
- [HTML to Markdown MCP](https://github.com/levz0r/html-to-markdown-mcp) — Fetch web pages and convert HTML content into clean, readable Markdown for documentation workflows.
- [html2md MCP Server](https://github.com/sunshad0w/html2md-mcp) — Converts HTML pages into optimized Markdown with support for authenticated browsing and JavaScript rendering.
- [Markdown2doc](https://github.com/Klavis-AI/klavis/tree/main/mcp_servers/pandoc) — Convert documents between multiple formats using Pandoc.
- [Markdownify](https://github.com/zcaceres/mcp-markdownify-server) — Convert files such as HTML, PDF, PPTX, and transcripts into Markdown format.
- [Markitdown](https://github.com/Klavis-AI/klavis/tree/main/mcp_servers/markitdown) — Convert documents and files into Markdown format.
- [MCP Documentation Server](https://github.com/andrea9293/mcp-documentation-server) — Local‑first document management and semantic search with embeddings and caching.
- [Md2doc](https://github.com/Yorick-Ryu/md2doc-mcp) — Convert Markdown documents into DOCX format.
- [Pandoc MCP](https://github.com/vivekVells/mcp-pandoc) — Convert documents between multiple formats including Markdown, PDF, HTML, DOCX.
- [PDF reader MCP](https://github.com/gpetraroli/mcp_pdf_reader) — Read and search text content inside local PDF files.
- [PDF Tools MCP](https://github.com/Sohaib-2/pdf-mcp-server) — Toolkit for manipulating PDFs including merge, split, and optimization.
- [Spring Initializr](https://github.com/hpalma/springinitializr-mcp) — Generate Spring Boot projects with custom dependencies.
- [Starwind UI](https://github.com/Boston343/starwind-ui-mcp/) — Commands and documentation access for Starwind UI components.
- [Context Awesome MCP](https://github.com/bh-rat/context-awesome) — Provides MCP tools to search across thousands of curated development resources and learning materials, helping coding agents and developers access useful documentation and references.
- [Arch Linux MCP](https://github.com/nihalxkumar/arch-mcp) — Provides MCP tools to search the Arch Wiki and retrieve information about Arch Linux packages and documentation for development and system reference.
- [mermaid-mcp-server](https://github.com/GittyBurstein/mermaid-mcp-server) — Automatically converts local projects and GitHub repositories into Mermaid diagrams.
- [mermaid-mcp](https://github.com/Narasimhaponnada/mermaid-mcp) — AI-based tool that generates 22+ diagram types (flowcharts, state machines, etc.). 
- [plsreadme](https://github.com/FacundoLucci/plsreadme) — Transforms Markdown and text content into clean, shareable web links.
- [gibs-mcp](https://github.com/buildsyncinc/gibs-mcp) — Provides structured documentation and article-level citations for regulatory frameworks such as AI governance and compliance standards.

---

### Screenshot / Visualization

Tools that help capture screenshots, generate visuals, and analyze images or videos for AI agents and MCP workflows.

- [ScreenshotMCP](https://github.com/upnorthmedia/ScreenshotMCP/) – Full-page and element screenshot capture for MCP workflows and AI agents.
- [ScreenshotOne](https://github.com/screenshotone/mcp/) – Render high-quality website screenshots for MCP servers and AI agent automation workflows.
- [VisionAgent MCP](https://github.com/landing-ai/vision-agent-mcp) – MCP server that enables AI agents to analyze and reason over images, videos, and documents.
- [WaveSpeed](https://github.com/WaveSpeedAI/mcp-server) – Image and video generation engine for AI agents and MCP-based automation workflows.
- [VideoDB Director](https://github.com/video-db/agent-toolkit/tree/main/modelcontextprotocol) – AI-powered video workflow tool for MCP agents, supporting video editing, search, and highlight generation.
- [BrowserLoop](https://github.com/mattiasw/browserloop) – Capture full-page and element screenshots of websites using Playwright.
- [Code Screenshot Generator](https://github.com/MoussaabBadla/code-screenshot-mcp) – Generates professional syntax-highlighted screenshots of source code with themes and git diff visualization.
- [ECharts MCP](https://github.com/hustcc/mcp-echarts) – Dynamic chart and visualization generation using Apache ECharts through MCP.
- [DaVinci Resolve MCP](https://github.com/samuelgursky/davinci-resolve-mcp) – Provides AI-driven automation and workflows for video editing and media management in DaVinci Resolve.
- [Fal MCP](https://github.com/raveenb/fal-mcp-server) – Generate images, videos, and audio using AI models through MCP.
- [JavaFX MCP](https://github.com/quarkiverse/quarkus-mcp-servers/tree/main/jfx) — Enables AI assistants to create visual drawings and graphical content using a JavaFX canvas environment.
- [LottieFiles](https://github.com/junmer/mcp-server-lottiefiles) — Search and retrieve Lottie animation assets for applications and design projects.
- [MasterGo](https://github.com/mastergo-design/mastergo-magic-mcp) — Connects AI models with MasterGo design files and retrieves design DSL data.
- [mcp-screenshot-website-fast](https://github.com/just-every/mcp-screenshot-website-fast) — Capture optimized website screenshots for visual analysis.
- [Screeny](https://github.com/rohanrav/screeny) — macOS MCP server providing visual context through window screenshots.
- [Vega-Lite](https://github.com/isaacwasserman/mcp-vegalite-server) — Generate visualizations from datasets using Vega-Lite format.
- [Talk To Figma](https://github.com/sonnylazuardi/cursor-talk-to-figma-mcp) — Read and modify Figma designs programmatically.
- [Talk To Figma via Claude](https://github.com/gaganmanku96/talk-with-figma-claude) — Create and modify Figma designs using natural language.
- [Storybook](https://github.com/stefanoamorelli/storybook-mcp-server) — Interact with Storybook component libraries for UI testing.
- [SnapRender MCP](https://github.com/User0856/snaprender-mcp) — Provides MCP tools to capture website screenshots, helping coding agents and developers create visual previews and documentation during development workflows.
- [AntV Chart MCP](https://github.com/antv/mcp-server-chart) — Provides MCP integration for generating visual charts and graphs using the AntV data visualization library.
- [Manim MCP](https://github.com/abhiemj/manim-mcp-server) — Provides MCP integration with the Manim library to generate mathematical and educational animations for visualization and documentation purposes.
- [excalidraw-architect-mcp](https://github.com/BV-Venky/excalidraw-architect-mcp) — Tool for generating software architecture diagrams with auto-layout and 50+ technology mappings.
- [Webpage Screenshot MCP](https://github.com/ananddtyagi/webpage-screenshot-mcp) — MCP server for capturing webpage screenshots during UI development or documentation review.

---

### Maintenance

Tools designed to support long-lived projects and ongoing software maintenance.
   
- [GitGuardian MCP](https://github.com/GitGuardian/ggshield) – Detect secrets and security risks in repositories  
- [Codacy MCP](https://github.com/codacy) – Automated code quality and security analysis for repositories 
- [LaunchDarkly MCP](https://github.com/launchdarkly/mcp-server) – Feature flag platform enabling safe deployments and iteration  
- [Octopus Deploy MCP](https://github.com/OctopusDeploy/mcp-server) – Manage and inspect deployments and release pipelines   
- [Roundtable](https://github.com/askbudi/roundtable) – Unified integration layer that bridges multiple AI coding assistants (Codex, Claude Code, Cursor, Gemini) through zero-configuration auto-discovery and enterprise-ready architecture
- [DesktopCommander MCP](https://github.com/wonderwhy-er/DesktopCommanderMCP) – Allows AI to manage files, run terminal commands, and connect to remote servers.
- [Fast Filesystem MCP](https://github.com/efforthye/fast-filesystem-mcp) – Advanced filesystem operations including fast reading, writing, and large file handling.
- [itemit MCP](https://github.com/umin-ai/itemit-mcp) — Asset tracking and inventory monitoring platform used for managing equipment and organizational resources.
- [kill-process-mcp](https://github.com/misiektoja/kill-process-mcp) — List and terminate OS processes through natural language commands.
- [man-mcp-server](https://github.com/guyru/man-mcp-server) — Search and access Linux manual pages directly through MCP tools.
- [Local History](https://github.com/xxczaki/local-history-mcp) — Access local history stored in VS Code or Cursor editors.
- [WordPress MCP](https://github.com/Automattic/wordpress-mcp) — Expose WordPress functionality to AI agents.
- [WordPress MCP Adapter](https://github.com/WordPress/mcp-adapter) — Bridge WordPress plugin abilities to MCP protocol.
- [Trello MCP Server](https://github.com/lioarce01/trello-mcp-server) — Manage Trello boards and tasks.
- [Wekan](https://github.com/namar0x0309/wekan-mcp) — Manage boards and tasks via Wekan APIs.
- [YouTrack](https://github.com/tonyzorin/youtrack-mcp) — Interact with JetBrains YouTrack issue management systems.
- [mcp-shell](https://github.com/sonirico/mcp-shell) — Securely runs shell commands in isolated environments (e.g., Docker) with auditing support.  
- [fastmcp-sonarqube-metrics](https://github.com/ArchAI-Labs/fastmcp-sonarqube-metrics) — Retrieves historical metrics, issues, and health status from SonarQube. 
- [mcp_safe_local_python_executor](https://github.com/maxim-saplin/mcp_safe_local_python_executor) — Safe Python interpreter based on HF Smolagents’ LocalPythonExecutor.  
- [blind-auditor](https://github.com/sim-xia/blind-auditor) — Forces AI to self-correct messages while protecting against context leakage and prompt injection.  
- [code-guardian](https://github.com/phuongrealmax/code-guardian) — AI-powered maintenance tools for analyzing codebase complexity, detecting hotspots, and generating automated refactoring plans.  
- [bundler_mcp](https://github.com/subelsky/bundler_mcp) — Utilities for inspecting Gemfile dependencies and package relationships in Ruby projects.

---

### Testing

Tools that assist with automated testing, validation, and QA workflows.

- [Playwright MCP](https://github.com/microsoft/playwright-mcp) – Browser automation and testing  
- [TestSprite](https://www.npmjs.com/package/@testsprite/testsprite-mcp) – End-to-end test automation framework     
- [LambdaTest MCP](https://www.lambdatest.com/mcp) – Connect AI assistants with automated testing workflows  
- [Lippia MCP](https://github.com/Lippia-io/Lippia-MCP-Server/blob/main/getting-started.md) – Accelerates test automation using the Lippia testing framework  
- [Console Automation MCP](https://github.com/ooples/mcp-console-automation) – Terminal automation system supporting SSH sessions, testing, monitoring, and background jobs.
- [JMeter MCP](https://github.com/QAInsights/jmeter-mcp-server) — Run performance and load testing using Apache JMeter through MCP-based tools.
- [Great Expectations MCP (gx-mcp-server)](https://github.com/davidf9999/gx-mcp-server) — Exposes data validation and data quality testing capabilities through MCP tools.
- [Locust](https://github.com/QAInsights/locust-mcp-server) — Run and analyze Locust performance testing workloads through MCP clients.
- [Mandoline](https://github.com/mandoline-ai/mandoline-mcp-server) — Evaluate and improve AI assistant performance through testing and feedback loops.
- [iOS MCP Code Quality](https://github.com/a-25/ios-mcp-code-quality-server) — Provides MCP tools to execute Xcode tests and perform linting, helping coding agents and developers maintain code quality in iOS development workflows. 
- [atest-mcp-server](https://github.com/LinuxSuRen/atest-mcp-server) — Server for managing test suites and cases (Postman alternative).
- [octomind-mcp](https://github.com/OctoMind-dev/octomind-mcp) — Enables AI agents to create and run end-to-end tests.  
- [currents-mcp](https://github.com/currents-dev/currents-mcp) — Allows AI agents to detect and fix Playwright test failures.  
- [xcomet-mcp-server](https://github.com/shuji-bonji/xcomet-mcp-server)s — Uses xCOMET models to evaluate translation quality by providing scoring and error detection capabilities.

---

### DevOps & Infrastructure

Tools that help manage environments, deployments, and infrastructure operations.

- [AWS Platform MCP](https://github.com/awslabs/mcp) – Manage AWS resources and services via MCP  
- [Kubernetes MCP](https://github.com/containers/kubernetes-mcp-server) – MCP server for Kubernetes cluster management  
- [Docker MCP](https://github.com/modelcontextprotocol/servers/tree/main/src/docker) – MCP integration for Docker container workflows  
- [Cloudflare MCP](https://github.com/cloudflare/mcp-server-cloudflare) – MCP server for interacting with Cloudflare APIs and infrastructure  
- [Netlify MCP](https://docs.netlify.com/welcome/build-with-ai/netlify-mcp-server/) – Build, deploy, and manage websites using Netlify platform  
- [NanoVMs MCP](https://github.com/nanovms/ops-mcp) – Build and deploy unikernels to cloud environments  
- [Kernel MCP](https://github.com/onkernel/kernel-mcp-server) – Access cloud-based browsers through MCP  
- [Metoro MCP](https://github.com/metoro-io/metoro-mcp-server) – Query and interact with Kubernetes environments 
- [Pulumi](https://github.com/pulumi/mcp-server) – Deploy and manage cloud infrastructure using Pulumi  
- [Render](https://render.com/docs/mcp-server) – The official Render MCP server: spin up new services, run queries against your databases, and debug rapidly with direct access to service metrics and logs  
- [OpsLevel](https://github.com/opslevel/opslevel-mcp) – Official MCP Server for OpsLevel  
- [Red Hat Insights](https://github.com/RedHatInsights/insights-mcp) – Interact with Red Hat Insights - build images, manage vulnerabilities, or view targeted recommendations  
- [Redis](https://github.com/redis/mcp-redis/) – The Redis official MCP Server offers an interface to manage and search data in Redis  
- [Redis Cloud API](https://github.com/redis/mcp-redis-cloud/) – The Redis Cloud API MCP Server allows you to manage your Redis Cloud resources using natural language  
- [PostIdentity](https://github.com/PostIdentity/mcp-server) – Generate AI-powered social media posts from any AI assistant. Manage identities, create posts, track referrals, and browse marketplace templates   
- [Airflow](https://github.com/yangkyeongmo/mcp-server-apache-airflow) – MCP Server that connects to Apache Airflow using official Python client  
- [AWS](https://github.com/rishikavikondala/mcp-server-aws) – Perform operations on AWS resources using an LLM  
- [AWS Athena](https://github.com/lishenxydlgzs/aws-athena-mcp) – MCP server for AWS Athena to run SQL queries on Glue Catalog  
- [Azure DevOps](https://github.com/Vortiago/mcp-azure-devops) – MCP server bridging AI assistants to Azure DevOps services 
- [AWS Cognito](https://github.com/gitCarrot/mcp-server-aws-cognito) – Manage authentication and user management with AWS Cognito.
- [AWS Resources Operations](https://github.com/baryhuang/mcp-server-aws-resources-python) – Query and manage AWS resources using secure generated Python code.
- [Bsc-mcp](https://github.com/TermiX-official/bsc-mcp) – MCP server that serves as the bridge between AI and BNB Chain, enabling AI agents to execute complex on-chain operations  
- [consul-mcp](https://github.com/kocierik/consul-mcp-server) – A consul MCP server for service management, health check, and Key-Value Store  
- [deploy-mcp](https://github.com/alexpota/deploy-mcp) – Universal deployment tracker for AI assistants with live status badges and deployment monitoring  
- [Docker MCP Server (Advanced)](https://github.com/0xshariq/docker-mcp-server) – Extended Docker management with orchestration capabilities.
- [DevOps-MCP](https://github.com/wangkanai/devops-mcp) – Dynamic Azure DevOps MCP server supporting work items, repositories, builds, pipelines, and multi-project management  
- [DevOps AI Toolkit](https://github.com/vfarcic/dot-ai) – AI-powered development productivity platform enhancing software development workflows   
- [Devcontainer MCP](https://github.com/AI-QL/mcp-devcontainers) – Generates and manages development containers directly from devcontainer configurations.
- [DevOps MCP](https://github.com/wangkanai/devops-mcp) – Azure DevOps integration supporting work items, repositories, builds, and pipelines.
- [EdgeOne Pages MCP](https://github.com/TencentEdgeOne/edgeone-pages-mcp) – Deploy HTML pages and obtain publicly accessible URLs using EdgeOne Pages services.
- [DataWorks MCP](https://github.com/aliyun/alibabacloud-dataworks-mcp-server) – Enables interaction with Alibaba Cloud DataWorks API for data platform operations.
- [Fleet MCP](https://github.com/SimplyMinimal/fleet-mcp) – Device management and security monitoring platform with vulnerability tracking and policy management.
- [Dagster MCP](https://github.com/dagster-io/dagster/tree/master/python_modules/libraries/dagster-dg-cli) – MCP server that helps create and manage data pipelines using Dagster.
- [Cronlytic MCP](https://github.com/Cronlytic/cronlytic-mcp-server) – Manage serverless cron jobs including creation, scheduling, and monitoring.
- [Fabric MCP](https://github.com/adapoet/fabric-mcp-server) – Integrates Fabric patterns with AI tools for automated task execution.
- [Fabric Real-Time Intelligence MCP](https://github.com/Microsoft/fabric-rti-mcp) – MCP server for working with Microsoft Fabric event streams and data exploration tools.
- [Drupal MCP](https://github.com/Omedia/mcp-server-drupal) – Integration for interacting with Drupal CMS using MCP.
- [Helm Chart CLI MCP](https://github.com/jeff-nasseri/helm-chart-cli-mcp) — Enables AI assistants to interact with Helm package manager for Kubernetes including chart installation and repository management.
- [k8s Multicluster MCP Server](https://github.com/razvanmacovei/k8s-multicluster-mcp) — Manage and interact with multiple Kubernetes clusters simultaneously using MCP tools.
- [Kafka MCP Server](https://github.com/tuannvm/kafka-mcp-server) — MCP integration for interacting with Apache Kafka clusters including topics, messages, and consumer management.
- [Kafka Schema Registry MCP Server](https://github.com/aywengo/kafka-schema-reg-mcp) — Enterprise schema management for Kafka Schema Registry with advanced tooling and security features.
- [Kubernetes](https://github.com/Flux159/mcp-server-kubernetes) — Manage Kubernetes clusters including pods, deployments, and services.
- [Kubernetes and OpenShift](https://github.com/manusa/kubernetes-mcp-server) — Manage Kubernetes and OpenShift resources with CRUD operations.
- [KubeSphere](https://github.com/kubesphere/ks-mcp-server) — Integrates with KubeSphere APIs for cluster and user management.
- [libvirt-mcp](https://github.com/MatiasVara/libvirt-mcp) — Manage virtual machines using libvirt virtualization APIs.
- [mcp-containerd](https://github.com/jokemanfire/mcp-containerd) — Manage container runtime operations through containerd.
- [Kubeflow Spark History MCP Server](https://github.com/kubeflow/mcp-apache-spark-history-server) — Analyze Spark job history and performance.
- [MCP-Airflow-API](https://github.com/call518/MCP-Airflow-API) — Manage Apache Airflow clusters and operations.
- [MCP-Ambari-API](https://github.com/call518/MCP-Ambari-API) — Manage Hadoop clusters through Apache Ambari API.
- [MCP-OpenStack-Ops](https://github.com/call518/MCP-OpenStack-Ops) — Automate OpenStack infrastructure operations.
- [MLflow MCP](https://github.com/kkruglik/mlflow-mcp) — Manage ML experiment tracking, artifacts, and model registry operations.
- [Multicluster MCP Server](https://github.com/yanmxa/multicluster-mcp-server) — Gateway to interact with multiple Kubernetes clusters.
- [nomad-mcp](https://github.com/kocierik/mcp-nomad) — Manage Nomad clusters and workloads through MCP.
- [Pulumi MCP](https://github.com/dogukanakkaya/pulumi-mcp-server) — Manage Pulumi infrastructure stacks.
- [OpenStack MCP](https://github.com/wangsqly0407/openstack-mcp-server) — MCP server for managing OpenStack cloud resources.
- [Oracle Cloud Infrastructure MCP](https://github.com/karthiksuku/oci-mcp) — Access and manage OCI cloud services.
- [SSH MCP Server](https://github.com/classfang/ssh-mcp-server) — Execute remote SSH commands and automate server management.
- [Terraform Cloud](https://github.com/severity1/terraform-cloud-mcp) — Manage infrastructure via Terraform Cloud APIs.
- [VMware Fusion](https://github.com/yeahdongcn/vmware-fusion-mcp-server) — Manage VMware VMs through Fusion REST API.
- [TrueNAS Core MCP](https://github.com/vespo92/TrueNasCoreMCP) — Interact with TrueNAS storage servers.
- [Windows CLI](https://github.com/SimonB97/win-cli-mcp-server) — Secure Windows command-line interactions.
- [Terminal-Control](https://github.com/GongRzhe/terminal-controller-mcp) — Execute terminal commands and manage filesystem.
- [TcpSocketMCP](https://github.com/SpaceyKasey/TcpSocketMCP/) — Provide raw TCP socket connectivity.
- [use_aws_mcp](https://github.com/runjivu/use_aws_mcp) — General AWS API interaction tool.
- [VolcEngine TOS](https://github.com/dinghuazhou/sample-mcp-server-tos) — Interact with VolcEngine TOS object storage.
- [Higress MCP Server Hosting](https://github.com/alibaba/higress/tree/main/plugins/wasm-go/mcp-servers) — Host MCP servers using Envoy-based API gateway architecture.
- [FastAPI to MCP Auto Generator](https://github.com/tadata-org/fastapi_mcp) — Automatically convert FastAPI endpoints into MCP tools.
- [WildFly MCP](https://github.com/wildfly-extras/wildfly-mcp) — Interact with WildFly application servers to retrieve metrics and logs.
- [Tyk API Management](https://github.com/TykTechnologies/tyk-dashboard-mcp) — Manage API lifecycle, tokens, analytics, and services through Tyk APIs.
- [AWS SSO MCP](https://github.com/aashari/mcp-server-aws-sso) — Provides MCP integration for listing AWS accounts and executing commands using temporary credentials through AWS SSO.
- [Alibaba Cloud Ops MCP](https://github.com/aliyun/alibaba-cloud-ops-mcp-server) — Provides MCP tools to manage Alibaba Cloud resources such as ECS instances and monitoring services within infrastructure workflows.
- [Rancher MCP](https://github.com/mrostamii/rancher-mcp-server) — Provides MCP tools for managing multi-cluster Kubernetes environments and infrastructure platforms.
- [4EVERLAND Hosting MCP](https://github.com/4everland/4everland-hosting-mcp) — Provides MCP tools to deploy code and applications to distributed storage and hosting networks.
- [Jenkins MCP Server](https://github.com/avisangle/jenkins-mcp-server) — Provides MCP integration for monitoring and managing CI/CD pipelines and build artifacts in Jenkins.
- [TeamCity MCP](https://github.com/Daghis/teamcity-mcp) — Provides MCP integration with JetBrains TeamCity to manage builds, pipelines, and automation workflows.
- [mcpx](https://github.com/TheLunarCompany/lunar/tree/main/mcpx) — Open-source gateway to manage MCP servers at scale with access control and usage tracking.
- [mcgravity](https://github.com/tigranbs/mcgravity) — Proxy tool that composes multiple MCP servers into one unified endpoint with load balancing.
- [pluggedin-mcp-proxy](https://github.com/VeriTeknik/pluggedin-mcp-proxy) — Proxy server that combines multiple MCP servers into a single interface.
- [mcp-gateway](https://github.com/ViperJuice/mcp-gateway) — Meta server that enables dynamic MCP server provisioning for agent environments.
- [mcp-access-point](https://github.com/sxhxliang/mcp-access-point) — Turn any web service into an MCP server with minimal setup.
- [open-mcp](https://github.com/wegotdocs/open-mcp) — Quickly convert web APIs into MCP servers for open-source ecosystems.
- [mcp-ipfs](https://github.com/alexbakers/mcp-ipfs) — Upload and manipulate files on IPFS storage.  
- [aws-mcp-server (alexei-led)](https://github.com/alexei-led/aws-mcp-server) — Safely execute AWS CLI commands within a Docker environment.  
- [esxi-mcp-server](https://github.com/bright8192/esxi-mcp-server) — Simple REST API interface for managing VMware ESXi and vCenter.  
- [adls-mcp-server](https://github.com/erikhoward/adls-mcp-server) — Manage containers and files in Azure Data Lake Storage.  
- [azure-resource-graph-mcp-server](https://github.com/hardik-id/azure-resource-graph-mcp-server) — Query and analyze infrastructure using Azure Resource Graph.  
- [terraform-mcp-server (Official)](https://github.com/hashicorp/terraform-mcp-server) — Integration with Terraform ecosystem for provider discovery and module analysis.  
- [azure-cli-mcp](https://github.com/jdubois/azure-cli-mcp) — Wrapper for Azure CLI to enable direct interaction with Azure.  
- [netskope-mcp](https://github.com/johnneerdael/netskope-mcp) — Access Netskope Private Access components and setup information.  
- [pythonanywhere-mcp-server](https://github.com/pythonanywhere/pythonanywhere-mcp-server) — Implementation for the PythonAnywhere cloud platform.  
- [qiniu-mcp-server](https://github.com/qiniu/qiniu-mcp-server) — Access Qiniu Cloud Storage and media processing services.  
- [mcp-nutanix](https://github.com/thunderboltsid/mcp-nutanix) — Go-based server to interface with Nutanix Prism Central resources.  
- [aws-pricing-mcp (trilogy-group)](https://github.com/trilogy-group/aws-pricing-mcp) — Retrieve up-to-date EC2 pricing information.  
- [agent-deploy-dashboard-mcp](https://github.com/aparajithn/agent-deploy-dashboard-mcp) — Unified deployment dashboard for Vercel, Render, Railway, and Fly.io.  
- [k8s-mcp-server (alexei-led)](https://github.com/alexei-led/k8s-mcp-server) — Execute kubectl, helm, and ArgoCD commands safely in a Docker environment.  
- [mcp-cyclops](https://github.com/cyclops-ui/mcp-cyclops) — Manage Kubernetes resources via Cyclops abstraction.  
- [devops-mcp-webui](https://github.com/elevy99927/devops-mcp-webui) — Bridge Kubernetes with an open web UI for non-technical teams.  
- [cert-manager-mcp-server](https://github.com/pibblokto/cert-manager-mcp-server) — Management and troubleshooting for cert-manager.  
- [portainer-mcp](https://github.com/portainer/portainer-mcp) — Interact with Portainer instances for container management and monitoring.  
- [kubectl-mcp-server (rohitg00)](https://github.com/rohitg00/kubectl-mcp-server) — Interact with Kubernetes clusters using natural language.  
- [mcp-k8s (silenceper)](https://github.com/silenceper/mcp-k8s) — Manage Deployments and Services using natural language without complex commands.  
- [lumino-mcp-server](https://github.com/spre-sre/lumino-mcp-server) — SRE tool for Tekton pipeline debugging and predictive monitoring. 
- [mkp](https://github.com/StacklokLabs/mkp) — Enable LLM-powered apps to interact with Kubernetes clusters.  
- [ocireg-mcp](https://github.com/StacklokLabs/ocireg-mcp) — Retrieve container image and tag information from OCI registries.  
- [kubefwd](https://github.com/txn2/kubefwd) — Bulk port forwarding with service discovery and traffic monitoring.  
- [k8m / kom](https://github.com/weibaohui/k8m) — 50+ built-in tools for multi-cluster Kubernetes management and operations.  
- [mcp-k8s-eye](https://github.com/wenhuwang/mcp-k8s-eye) — Analyze Kubernetes management and cluster/application health.    
- [liveblocks-mcp-server](https://github.com/liveblocks/liveblocks-mcp-server) — Create and modify rooms, threads, and comments in Liveblocks.  
- [nebulablock-mcp-server](https://github.com/Nebula-Block-Data/nebulablock-mcp-server) — Expose NebulaBlock API functionalities as tools.  
- [sitelauncher-mcp-server](https://github.com/trackerfitness729-jpg/sitelauncher-mcp-server) — Deploy instant HTTPS websites on Base chain using USDC.  
- [spaceship-mcp](https://github.com/bartwaardenburg/spaceship-mcp) — Manage domains, DNS records, and marketplace listings.
- [method-crm-mcp](https://github.com/avisangle/method-crm-mcp) — 20 tools for integrating with Method CRM API, including tables, users, and events.  
- [registep-mcp](https://github.com/saikiyusuke/registep-mcp) — 67 tools for POS and sales analytics, including weather correlation and AI chat analysis.  
- [jenkins-mcp-server](https://github.com/avisangle/jenkins-mcp-server) — Enterprise-grade Jenkins integration for managing jobs and monitoring builds.  
- [buildkite-mcp-server](https://github.com/buildkite/buildkite-mcp-server) — Official tool to manage pipelines and monitor job queues.  
- [mcp-server-circleci](https://github.com/CircleCI-Public/mcp-server-circleci) — Enables AI agents to detect and fix CircleCI build failures.  
- [teamcity-mcp](https://github.com/Daghis/teamcity-mcp) — Provides 87 tools for JetBrains TeamCity: build management, testing, and pipeline operations.  
- [mcp-server-atlassian-jira](https://github.com/aashari/mcp-server-atlassian-jira) — Integration with Atlassian Jira Cloud for project tracking.  
- [mcp-server-atlassian-bitbucket](https://github.com/aashari/mcp-server-atlassian-bitbucket) — Interact with Bitbucket Cloud repositories and pull requests.  
- [gitkraken/gk-cli](https://github.com/gitkraken/gk-cli) — Connects GitKraken APIs, Jira, GitHub, and GitLab with AI agents.  
- [ssh-mcp](https://github.com/blakerouse/ssh-mcp) — Execute remote shell commands on Linux and Windows servers.   
- [filestash](https://github.com/mickael-kerjean/filestash/tree/master/server/plugin/plg_handler_mcp) — Provides a secure interface to interact with remote storage systems such as SFTP, S3, FTP, SMB, NFS, and SharePoint.  
- [mcp-server-opendal](https://github.com/Xuanwo/mcp-server-opendal) — Integrates with Apache OpenDAL to provide unified access to multiple storage backends, simplifying cloud and distributed storage operations. 
- [trackmage-mcp-server](https://github.com/trackmage/trackmage-mcp-server) — Provides infrastructure integration for managing logistics and shipment tracking workflows.
- [ig-mcp-server (Inspektor Gadget)](https://github.com/inspektor-gadget/ig-mcp-server) — MCP interface for inspecting and debugging container and Kubernetes workloads using eBPF-based tools.
- [Clojars MCP](https://github.com/Bigsy/Clojars-MCP-Server) — Provides tools to access dependency information and package data for libraries in the Clojure ecosystem.
- [zitadel-mcp](https://github.com/takleb3rry/zitadel-mcp) — Integrates with the Zitadel identity management platform to manage users, roles, and authentication systems.
- [mcp-server-bitbucket](https://github.com/JaviMaligno/mcp-server-bitbucket) — Server with 58 specialized tools for managing pipelines, branch restrictions, and webhooks on Bitbucket.
- [mcp-server-azure-devops](https://github.com/Tiberriver256/mcp-server-azure-devops) — Integrates with Azure DevOps to manage work items, pipelines, and repositories.
- [tod](https://github.com/theonedev/tod) — CI/CD pipeline editing and pull request review automation for OneDev.
- [gitea-mcp](https://gitea.com/gitea/gitea-mcp) — Interacts with Gitea instances to manage repositories.  
- [forgejo-mcp](https://github.com/raohwork/forgejo-mcp) — Interacts with Forgejo instances for repository management.
- [github-enterprise-mcp](https://github.com/ddukbg/github-enterprise-mcp) — Integrates with GitHub Enterprise API for large-scale enterprise repository management.

---

### Security

Tools that help identify vulnerabilities and improve secure development practices.

- [Snyk Agent Scan](https://github.com/snyk/agent-scan) – Automated vulnerability scanning for code and dependencies  
- [SonarQube MCP](https://github.com/SonarSource/sonarqube-mcp-server) – Code quality and security analysis for MCP workflows  
- [MCP Security Hub](https://github.com/FuzzingLabs/mcp-security-hub) – Centralized security insights for MCP-managed projects  
- [Cisco MCP Scanner](https://github.com/cisco-ai-defense/mcp-scanner) – Security scanning and threat detection for MCP-integrated systems  
- [Semgrep MCP](https://github.com/semgrep/semgrep) – Static code analysis and vulnerability scanning for repositories
- [Mobb MCP](https://github.com/mobb-dev/bugsy) – Identifies and remediates vulnerabilities in code  
- [IPLocate MCP](https://github.com/iplocate/mcp-server-iplocate) – Lookup IP geolocation, detect proxies and VPNs  
- [IP2Location MCP](https://github.com/ip2location/mcp-ip2location-io) – Retrieve geolocation information for an IP address
- [SafeDep](https://github.com/safedep/vet/blob/main/docs/mcp.md) – Vet open source packages for security risks—such as vulnerabilities and malicious code—before they're used in your project, especially with AI-generated code suggestions  
- [SafeLine](https://github.com/chaitin/SafeLine/tree/main/mcp_server) – Self-hosted WAF (Web Application Firewall) to protect your web apps from attacks and exploits 
- [CVE Intelligence](https://github.com/gnlds/mcp-cve-intelligence-server-lite) – Provides vulnerability intelligence via multi-source CVE data, essential exploit discovery, and EPSS risk scoring through the MCP   
- [Domain Tools MCP](https://github.com/deshabhishek007/domain-tools-mcp-server) – Domain analysis tools including WHOIS lookup, DNS records, and DNS health checks.
- [FPE Demo MCP](https://github.com/Horizon-Digital-Engineering/fpe-demo-mcp) – Demonstrates format-preserving encryption workflows for secure data handling.
- [Keycloak MCP Server](https://github.com/idoyudha/mcp-keycloak) — Identity and access management integration for managing users, roles, and authentication workflows.
- [Keycloak MCP (Model Context Protocol)](https://github.com/ChristophEnglisch/keycloak-model-context-protocol) — Provides natural language interaction with Keycloak identity management systems.
- [Keycloak MCP Server (Advanced)](https://github.com/sshaaf/keycloak-mcp-server) — Comprehensive Keycloak management including realms, clients, roles, and authentication providers.
- [Hashing MCP Server](https://github.com/kanad13/MCP-Server-for-Hashing) — Cryptographic hashing tools supporting SHA256, MD5, and other algorithms for data integrity verification.
- [Masquerade](https://github.com/postralai/masquerade) — Redacts sensitive data from documents before sharing.
- [Maybe Don't AI Policy Engine](https://www.maybedont.ai/download/) — Policy validation for AI tool requests.
- [MCPIgnore Filesystem](https://github.com/CyberhavenInc/filesystem-mcpignore) — Filesystem MCP server that prevents access to sensitive data using .mcpignore.
- [Nikto MCP](https://github.com/weldpua2008/nikto-mcp) — MCP server integration for web server security scanning.
- [Pinner MCP](https://github.com/safedep/pinner-mcp) — Pin GitHub Actions and container images to immutable hashes.
- [Thales CDSP CAKM MCP Server](https://github.com/sanyambassi/thales-cdsp-cakm-mcp-server) — Integration with CipherTrust platform to securely manage database encryption keys.
- [Thales CDSP CRDP MCP Server](https://github.com/sanyambassi/thales-cdsp-crdp-mcp-server) — Connects with CipherTrust data protection services for secure data operations.
- [Thales CipherTrust Manager MCP Server](https://github.com/sanyambassi/ciphertrust-manager-mcp-server) — Manage cryptographic keys and security operations using CipherTrust Manager.
- [vulnicheck](https://github.com/andrasfe/vulnicheck) — Scan Python dependencies for vulnerabilities using public security databases.
- [ShieldAPI MCP](https://github.com/alberthild/shieldapi-mcp) — Provides MCP tools that help coding agents and developers identify potential security weaknesses in applications.
- [Cybersec Watchdog MCP](https://github.com/girste/mcp-cybersec-watchdog) — Provides MCP tools to audit Linux servers using multiple security control checks.
- [Agent BOM MCP](https://github.com/msaad00/agent-bom) — Provides MCP tools to analyze software supply chain dependencies used by AI agent environments.
- [Air Blackbox MCP](https://github.com/airblackbox/air-blackbox-mcp) — Provides MCP tools to perform compliance checks for AI systems based on regulatory frameworks.
- [bicscan-mcp](https://github.com/ahnlabio/bicscan-mcp) — Provides analysis tools to evaluate blockchain addresses and domains for asset holdings and network activity insights.  
- [heurist-mesh-mcp-server](https://github.com/heurist-network/heurist-mesh-mcp-server) — Integrates with AI agents to analyze smart contract infrastructure and provide security insights within decentralized finance ecosystems.
- [gleif-mcp-server](https://github.com/olgasafonova/gleif-mcp-server) — Provides tools to access the Global Legal Entity Identifier (LEI) database for organization verification and entity identification.
- [ZoomEye MCP](https://github.com/zoomeye-ai/mcp_zoomeye) — Enables querying network assets and internet infrastructure data for security and infrastructure analysis.
- [gia-mcp-server](https://github.com/knowledgepa3/gia-mcp-server) — Provides compliance validation tools aligned with enterprise AI governance frameworks.    
- [mcp-shodan](https://github.com/BurtTheCoder/mcp-shodan) — Queries internet-connected infrastructure data for security and infrastructure analysis.  
- [mcp-virustotal](https://github.com/BurtTheCoder/mcp-virustotal) — Integrates with the VirusTotal API to scan and analyze files and URLs for threats.  
- [vuln-nist-mcp-server](https://github.com/HaroldFinchIFT/vuln-nist-mcp-server) — Interface for retrieving software vulnerability information from the NIST vulnerability database.  
- [mcp-recon](https://github.com/nickpending/mcp-recon) — Provides technical analysis tools for domains, certificates, and network infrastructure.
- [secretctl](https://github.com/forest6511/secretctl) — Secure secrets management system that injects credentials as protected environment variables.  
- [onepassword-mcp-server](https://github.com/dkvdm/onepassword-mcp-server) — MCP interface for securely retrieving credentials from 1Password vaults.

---

### Backend Database

Tools that help query and manage backend databases during development and debugging.

- [Supabase MCP](https://github.com/supabase-community/supabase-mcp) – Supabase database and backend MCP integration
- [MongoDB Chatbot (MCP)](https://github.com/mongodb/chatbot) – Build AI chatbots that interact with MongoDB databases  
- [LlamaIndex (MCP)](https://github.com/run-llama/llama_index) – Data framework for connecting LLMs with external data sources
- [PostgreSQL MCP](https://github.com/modelcontextprotocol/servers) – Execute database queries and manage PostgreSQL through MCP tools 
- [Neo4j MCP](https://github.com/neo4j-contrib/mcp-neo4j) – Interact with Neo4j graph database via Cypher queries  
- [Milvus MCP](https://github.com/zilliztech/mcp-server-milvus) – Search and interact with data in Milvus vector database  
- [Neon MCP](https://github.com/neondatabase/mcp-server-neon) – Interact with the Neon serverless Postgres platform  
- [MotherDuck MCP](https://github.com/motherduckdb/mcp-server-motherduck) – Query and analyze data using MotherDuck and DuckDB  
- [Memgraph MCP](https://github.com/memgraph/ai-toolkit/tree/main/integrations/mcp-memgraph) – Query graph data stored in Memgraph database  
- [Kuzu MCP](https://github.com/kuzudb/kuzu-mcp-server) – Inspect schema and execute queries on Kuzu graph database  
- [OceanBase MCP](https://github.com/oceanbase/mcp-oceanbase) – Manage and interact with OceanBase database  
- [KWDB MCP](https://github.com/KWDB/kwdb-mcp-server) – Perform DDL and data operations on KWDB database  
- [Qdrant](https://github.com/qdrant/mcp-server-qdrant/) – Implement semantic memory layer on top of the Qdrant vector search engine  
- [Rill Data](https://docs.rilldata.com/explore/mcp) – Interact with Rill Data to query and analyze your data  
- [Prisma](https://www.prisma.io/docs/postgres/integrations/mcp-server) – Create and manage Prisma Postgres databases 
- [Airtable](https://github.com/domdomegg/airtable-mcp-server) – Read and write access to Airtable databases with schema inspection  
- [ArangoDB](https://github.com/ravenwits/mcp-server-arangodb) – MCP server providing database interaction capabilities  
- [ArangoDB Graph](https://github.com/PCfVW/mcp-arangodb-async) – Async-first Python architecture for ArangoDB graphs and analytics  
- [BigQuery](https://github.com/LucasHild/mcp-server-bigquery) – Enables LLMs to inspect database schemas and execute queries  
- [Databricks MCP](https://github.com/JordiNeil/mcp-databricks-server) – Allows LLMs to run SQL queries, list and get details of job executions in a Databricks account  
- [CockroachDB](https://github.com/amineelkouhen/mcp-cockroachdb) – MCP server enabling AI agents and LLMs to manage, monitor, and query CockroachDB using natural language  
- [DBHub MCP](https://github.com/bytebase/dbhub/) – Universal database MCP server connecting to MySQL, MariaDB, PostgreSQL, and SQL Server  
- [DevDb](https://github.com/damms005/devdb-vscode) – IDE-based MCP server allowing direct connection to multiple relational databases for querying and management.
- [Druid MCP](https://github.com/iunera/druid-mcp-server) – MCP server for Apache Druid clusters providing data analytics tools and cluster management features.
- [DynamoDB Toolbox MCP](https://www.dynamodbtoolbox.com/docs/databases/actions/mcp-toolkit) – Natural language interaction layer for DynamoDB using defined schemas and access patterns.  
- [Elasticsearch MCP](https://github.com/cr7258/elasticsearch-mcp-server) – Enables AI assistants to interact with Elasticsearch clusters for search and analytics.
- [D365FO MCP](https://github.com/mafzaal/d365fo-client) – Connects to Microsoft Dynamics 365 Finance & Operations APIs for data access and management.
- [Firebase MCP](https://github.com/gannonh/firebase-mcp) – Enables interaction with Firebase Authentication, Firestore, and Storage services.
- [Contentful MCP ](https://github.com/ivo-toby/contentful-mcp) – Manage and update content stored in Contentful CMS spaces.
- [InfluxDB MCP Server](https://github.com/idoru/influxdb-mcp-server) — Enables querying and managing time-series data stored in InfluxDB databases.
- [JDBC MCP Server](https://github.com/quarkiverse/quarkus-mcp-servers/tree/main/jdbc) — Universal database connectivity supporting MySQL, PostgreSQL, SQLite, SQL Server, Oracle, and other JDBC-compatible databases.
- [MariaDB](https://github.com/abel9851/mcp-server-mariadb) — MCP server integration for MariaDB databases.
- [MCP-Database-Server](https://github.com/executeautomation/mcp-database-server) — Unified interface for SQL Server, SQLite, and PostgreSQL.
- [MongoDB MCP Server](https://github.com/kiliczsh/mcp-mongo-server) — Integration server for MongoDB.
- [MongoDB & Mongoose MCP](https://github.com/nabid-pf/mongo-mongoose-mcp) — MongoDB server with schema validation and Mongoose support.
- [MongoDB Lens](https://github.com/furey/mongodb-lens) — Advanced MCP server for MongoDB database exploration.
- [MySQL MCP Server](https://github.com/benborla/mcp-server-mysql) — NodeJS-based MCP server for MySQL.
- [MySQL MCP Server (Python)](https://github.com/designcomputer/mysql_mcp_server) — Python implementation for MySQL databases.
- [PostgreSQL MCP Server](https://github.com/ahmedmustahid/postgres-mcp-server) — Database schema inspection and query execution.
- [Redis MCP Server](https://github.com/GongRzhe/REDIS-MCP-Server) — Manage Redis caching and key-value operations.
- [Snowflake](https://github.com/Snowflake-Labs/mcp) — Official MCP server supporting SQL execution, object management, and RBAC controls.
- [Solr MCP](https://github.com/mjochum64/mcp-solr-search) — Perform search queries on Apache Solr servers.
- [Teradata](https://github.com/arturborycki/mcp-teradata) — Run analytics tasks and queries on Teradata databases.
- [TigerGraph](https://github.com/custom-discoveries/TigerGraph_MCP) — Graph database integration for AI agents.
- [Vertica](https://github.com/nolleh/mcp-vertica) — Database integration with schema inspection and access control.
- [Trino](https://github.com/tuannvm/mcp-trino) — High-performance distributed query execution.
- [XiYan](https://github.com/XGenerationLab/xiyan_mcp_server) — Natural language to SQL MCP server.
- [Typesense](https://github.com/suhail-ak-s/mcp-typesense-server) — Provides AI access to Typesense search collections for fast data queries.
- [Unity Catalog](https://github.com/ognis1205/mcp-server-unitycatalog) — Manage and execute Unity Catalog functions through MCP.
- [SmartDB MCP](https://github.com/wenb1n-dev/SmartDB_MCP) — Provides MCP tools to connect and interact with multiple databases through a unified interface.
- [Microsoft Dataverse MCP](https://github.com/codeurali/mcp-dataverse) — Provides MCP tools for performing entity CRUD operations and executing workflows within Dataverse environments.
- [Method CRM MCP](https://github.com/avisangle/method-crm-mcp) — Provides MCP tools to manage CRM data including tables, users, and events.
- [Google Sheets MCP](https://github.com/henilcalagiya/google-sheets-mcp) — Provides MCP integration to automate data operations and workflows with Google Sheets.
- [anyquery](https://github.com/julien040/anyquery) — Query multiple databases and applications such as PostgreSQL and MySQL using a unified SQL interface.
- [omop_mcp](https://github.com/OHNLP/omop_mcp) — Maps clinical terminology to OMOP standard concepts to standardize healthcare data.
- [alkemi-mcp](https://github.com/alkemiai/alkemi-mcp) — Enables natural language queries on Snowflake, BigQuery, and Databricks data products.  
- [qlik-mcp](https://github.com/jwaxman19/qlik-mcp) — Extracts data from Qlik Cloud API applications, sheets, and visualizations.  
- [keboola-mcp-server](https://github.com/keboola/keboola-mcp-server) — Provides access to Keboola Connection platform storage APIs for data extraction.
- [kaggle-mcp](https://github.com/arrismo/kaggle-mcp) — Provides tools to download and analyze datasets from the Kaggle platform.  
- [kaggle-mcp-server](https://github.com/KrishnaPramodParupudi/kaggle-mcp-server) — MCP server implementation for browsing Kaggle competitions, leaderboards, models, and kernels.

---

### Cost Optimization

Tools that help track, analyze, and optimize development and infrastructure costs.

- [AWS Billing & Cost Management MCP](https://github.com/awslabs/mcp) – Manage AWS billing, cost insights, and resources via MCP
- [Momento MCP](https://github.com/momentohq/mcp-momento) – High-performance caching to improve performance and reduce infrastructure cost
- [Ramp](https://github.com/ramp-public/ramp-mcp) – Interact with Ramp's Developer API to run analysis on your spend and gain insights leveraging LLMs 
- [Cloud Cost MCP](https://github.com/jasonwilbur/cloud-cost-mcp) — Provides MCP tools to compare real-time pricing across major cloud providers such as AWS, Azure, GCP, and OCI to support infrastructure cost planning.
- [OCI Pricing MCP](https://github.com/jasonwilbur/oci-pricing-mcp) — Provides MCP tools to access and analyze Oracle Cloud Infrastructure pricing data for infrastructure planning and cost evaluation.
- [llmkit](https://github.com/smigolsmigol/llmkit) — Provides tools for tracking AI API usage costs and managing budgets.

---

### AI Agent Infrastructure

Tools that help connect AI models, agents, and developer tooling for faster workflows.

- [MCP Memory Service](https://github.com/doobidoo/mcp-memory-service) – Persistent memory service for MCP-based AI agents  
- [Hugging Face MCP](https://huggingface.co/settings/mcp) – Access Hugging Face models, datasets, and tools programmatically  
- [Kiln MCP](https://github.com/Kiln-AI/Kiln) – Open-source platform for building production-ready AI systems with RAG and agents  
- [Needle MCP](https://github.com/needle-ai/needle-mcp) – Production-ready RAG system for retrieving information from documents  
- [Moorcheh MCP](https://github.com/moorcheh-ai/moorcheh-mcp) – Embedding, vector store, and AI answer services integration  
- [kluster.ai MCP](https://docs.kluster.ai/get-started/mcp/overview/) – Provides AI services and guardrails like hallucination detection
- [Plus AI](https://plusai.com/features/mcp) – MCP server for automatically generating professional PowerPoint and Google Slides presentations using the Plus AI presentation API  
- [PAIML MCP Agent Toolkit](https://github.com/paiml/paiml-mcp-agent-toolkit) – Professional project scaffolding toolkit with zero-configuration AI context generation, template generation for Rust/Deno/Python projects, and hybrid neuro-symbolic code analysis  
- [Patronus AI](https://github.com/patronus-ai/patronus-mcp-server) – Test, evaluate, and optimize AI agents and RAG apps  
- [Prode.ai (ProdE)](https://github.com/CuriousBox-AI/ProdE-mcp) – Your 24/7 production engineer that preserves context across multiple codebases  
- [Riza](https://github.com/riza-io/riza-mcp) – Arbitrary code execution and tool-use platform for LLMs  
- [Quickchat AI](https://github.com/incentivai/quickchat-ai-mcp) – Launch your conversational Quickchat AI agent as an MCP to give AI apps real-time access to its Knowledge Base and conversational capabilities  
- [Ragie](https://github.com/ragieai/ragie-mcp-server/) – Retrieve context from your Ragie (RAG) knowledge base connected to integrations like Google Drive, Notion, JIRA and more  
- [1mcpserver](https://github.com/particlefuture/1mcpserver) – MCP of MCPs. Automatically discover, configure, and add MCP servers on your local machine  
- [1Panel](https://github.com/1Panel-dev/mcp-1panel) – MCP server implementation that provides 1Panel interaction  
- [A2A](https://github.com/GongRzhe/A2A-MCP-Server) – Bridges MCP with Agent-to-Agent protocol for AI assistant interaction  
- [Actor Critic Thinking](https://github.com/aquarius-wing/actor-critic-thinking-mcp) – Actor-critic thinking for performance evaluation
- [Agentic Framework](https://github.com/Piotr1215/mcp-agentic-framework) – Multi-agent collaboration framework enabling agents to work together on complex tasks  
- [AI Tasks](https://github.com/jbrinkman/valkey-ai-tasks) – Let the AI manage complex plans with integrated task management tools
- [Chroma MCP](https://github.com/privetin/chroma) – Vector database server for semantic document search and metadata filtering  
- [ChatMCP](https://github.com/AI-QL/chat-mcp) – Cross-platform GUI for interacting with MCP servers across multiple LLMs   
- [Context Processor MCP](https://github.com/mschultheiss83/context-processor) – Preprocess and structure context for AI consumption, search, and metadata extraction  
- [Ableton Live](https://github.com/ahujasid/ableton-mcp) – Ableton integration allowing prompt-enabled music creation  
- [Context-portal MCP](https://github.com/GreatScottyMac/context-portal) – Build project-specific memory graphs for RAG applications   
- [Archestra.AI](https://github.com/archestra-ai/archestra) – Enterprise MCP gateway, registry, orchestration, credential management, and agent management platform.
- [AX-Platform](https://github.com/AX-MCP/PaxAI?tab=readme-ov-file#mcp-setup-guides) – AI agent collaboration platform to coordinate tasks and share context across agents. 
- [CRASH MCP](https://github.com/nikkoxgonzales/crash-mcp) – Structured reasoning and iterative thinking framework designed for AI agents.
- [CreateveAI Nexus](https://github.com/spgoodman/createveai-nexus-server) – Enterprise integration layer connecting AI agents with enterprise systems and APIs.
- [Dispatch Agent](https://github.com/abhinav-mangla/dispatch-agent) – Intelligent MCP server that coordinates sub-agents to perform advanced file and system operations.
- [DeepSeek MCP](https://github.com/DMontgomery40/deepseek-mcp-server) – Integration server enabling AI assistants to interact with DeepSeek language models.
- [DeepSeek Thinker MCP](https://github.com/ruixingshi/deepseek-thinker-mcp) – Provides reasoning outputs from DeepSeek models for enhanced agent decision workflows.
- [DeepSeek R1 MCP](https://github.com/66julienmartin/MCP-server-Deepseek_R1) – MCP server connecting Claude Desktop to DeepSeek language models.
- [Gemini Bridge](https://github.com/eLyiN/gemini-bridge) – Lightweight MCP bridge enabling interaction with Google Gemini models via CLI.
- [fastn.ai Unified API MCP](https://github.com/fastnai/mcp-fastn) – Unified API server connecting AI agents to thousands of tools and workflows.
- [Depyler](https://github.com/paiml/depyler/blob/main/docs/mcp-integration.md) – Python-to-Rust transpiler designed for efficient and secure code transformation workflows.
- [Dify MCP](https://github.com/YanxingLiu/dify-mcp-server) – MCP integration for running Dify AI workflows and automations.
- [ggRMCP](https://github.com/aalobaidi/ggRMCP) – Gateway that converts gRPC services into MCP-compatible tools.
- [Eunomia MCP](https://github.com/whataboutyou-ai/eunomia-MCP-server) – Framework extension that connects Eunomia instruments with MCP servers.
- [FoundationModels MCP](https://github.com/phimage/mcp-foundation-models) – Integrates Apple FoundationModels for AI text generation workflows.
- [Human-In-the-Loop MCP Server](https://github.com/GongRzhe/Human-In-the-Loop-MCP-Server) — Enables AI assistants to request user feedback and confirmations through interactive GUI dialogs.
- [Human Use MCP](https://github.com/RapidataAI/human-use) — Connects AI workflows with real human input for real-time feedback and decision support.
- [Hypertool MCP](https://github.com/toolprint/hypertool-mcp) — Framework that allows AI assistants to dynamically switch between multiple toolsets from different MCP servers.
- [Inner Monologue MCP](https://github.com/abhinav-mangla/inner-monologue-mcp) — Structured reasoning tool that allows AI agents to perform internal reflection before generating responses.
- [interactive-mcp](https://github.com/ttommyth/interactive-mcp) — Adds interactive prompts and conversational workflows inside MCP-based AI pipelines.
- [Magg: The MCP Aggregator](https://github.com/sitbon/magg) — Meta MCP server for orchestration.
- [MCP Bundles Hub](https://github.com/thinkchainai/mcpbundles) — Discover and install MCP integrations.
- [MCP Create](https://github.com/tesla0225/mcp-create) — Dynamically create MCP servers.
- [MCP Server Creator](https://github.com/GongRzhe/MCP-Server-Creator) — Generate MCP server code automatically.
- [MCP Server Generator](https://github.com/SerhatUzbas/mcp-server-generator) — AI-assisted MCP server creation.
- [MCP Proxy Server](https://github.com/TBXark/mcp-proxy) — Aggregate multiple MCP servers.
- [MCP Installer](https://github.com/anaisbetts/mcp-installer) — Install and configure MCP servers.
- [MCP Compass](https://github.com/liuyoshio/mcp-compass) — Suggest suitable MCP servers.
- [MCP Context Provider](https://github.com/doobidoo/MCP-Context-Provider) — Persistent tool context across sessions.
- [MCP Toolz](https://github.com/taylorleese/mcp-toolz) — Context management and orchestration.
- [mcp-mcp](https://github.com/wojtyniak/mcp-mcp) — Meta discovery service for MCP servers.
- [MCPfinder](https://github.com/mcpfinder/server) — Discovery platform for exploring, installing, and managing MCP servers and AI capabilities.
- [MCPJungle](https://github.com/mcpjungle/MCPJungle) — Self-hosted MCP registry and gateway for enterprise AI agent ecosystems.
- [Nacos MCP Router](https://github.com/nacos-group/nacos-mcp-router) — Router and proxy server that discovers, installs, and connects multiple MCP servers.
- [NCP (Natural Context Provider)](https://github.com/portel-dev/ncp) — Dynamic tool discovery and context provider system for AI agents.
- [Anubis MCP](https://github.com/zoedsoupe/anubis-mcp) — High-performance MCP implementation in Elixir for scalable MCP applications.
- [ModelFetch](https://github.com/phuctm97/modelfetch/) — Runtime-agnostic SDK for creating and deploying MCP servers in JS/TS.
- [EasyMCP](https://github.com/zcaceres/easy-mcp/) — Lightweight framework for building MCP servers in TypeScript.
- [FastMCP](https://github.com/punkpeye/fastmcp) — Simple and efficient TypeScript framework for rapid MCP server development.
- [Foobara MCP Connector](https://github.com/foobara/mcp-connector) — Expose Ruby-based Foobara commands as MCP tools for AI agents.
- [Foxy Contexts](https://github.com/strowk/foxy-contexts) — Golang library for building MCP servers and managing structured contexts.
- [MCP Declarative Java SDK](https://github.com/codeboyzhou/mcp-declarative-java-sdk) — Annotation-based Java SDK for building MCP servers with minimal dependencies.
- [MCP‑Framework](https://mcp-framework.com) — TypeScript framework with CLI tools for structured MCP project setup.
- [MCP Plexus](https://github.com/Super-I-Tech/mcp_plexus) — Multi-tenant Python framework for scalable MCP server applications.
- [mcp_sse (Elixir)](https://github.com/kEND/mcp_sse) — Server-Sent Events implementation for building MCP servers in Elixir.
- [mxcp](https://github.com/raw-labs/mxcp) — Python framework for enterprise-grade MCP servers with YAML, SQL, and Python support.
- [Next.js MCP Server Template](https://github.com/vercel-labs/mcp-for-next.js) — Starter project for MCP clients to connect via Next.js applications.
- [Perl SDK](https://github.com/mojolicious/mojo-mcp) — Build MCP servers and clients in Perl.
- [Quarkus MCP Server SDK](https://github.com/quarkiverse/quarkus-mcp-server) — Java SDK for MCP server development within Quarkus.
- [R mcptools](https://github.com/posit-dev/mcptools) — R language toolkit for building MCP servers.
- [SAP ABAP MCP Server SDK](https://github.com/abap-ai/mcp) — SDK for MCP servers in SAP ABAP enterprise applications.
- [Spring AI MCP](https://docs.spring.io/spring-ai/reference/api/mcp/mcp-server-boot-starter-docs.html) — Spring Boot auto-configuration for MCP servers in Java.
- [Template MCP](https://github.com/mcpdotdirect/template-mcp-server) — CLI tool to generate starter project structure for MCP servers.
- [AgentR Universal MCP SDK](https://github.com/universal-mcp/universal-mcp) — Python SDK for MCP servers with credential/config management.
- [Vercel MCP Adapter](https://github.com/vercel/mcp-adapter) — Adapter to run MCP servers in JS frameworks like Next.js, Nuxt, and Svelte.
- [PHP MCP](https://github.com/php-mcp/server) — Core PHP implementation of MCP for building MCP servers.
- [codemirror-mcp](https://github.com/marimo-team/codemirror-mcp) — CodeMirror extension implementing MCP for resource mentions and prompt commands.
- [llm-analysis-assistant](https://github.com/xuzexin-hz/llm-analysis-assistant) — Streamlined MCP client supporting stdio, SSE, and HTTP streaming with logs and simulation for OpenAI/Ollama interfaces.
- [MCP-Agent](https://github.com/lastmile-ai/mcp-agent) — Composable framework to build AI agents using MCP.
- [Spring AI MCP Client](https://docs.spring.io/spring-ai/reference/api/mcp/mcp-client-boot-starter-docs.html) — Spring Boot auto-configuration providing MCP client functionality for Java apps.
- [MCP CLI Client](https://github.com/vincent-pli/mcp-cli-host) — CLI host enabling LLMs to interact with external tools via MCP.
- [OpenMCP Client](https://github.com/LSTM-Kirigaya/openmcp-client) — VSCode/Trae/Cursor plugin for MCP server debugging with SDK and docs support.
- [PHP MCP Client](https://github.com/php-mcp/client) — Core PHP implementation of MCP client.
- [Runbear](https://runbear.io/solutions/integrations/slack/mcp) — No-code MCP client for team chat platforms including Slack, Teams, and Discord.
- [Think MCP](https://github.com/Rai220/think-mcp) — Enhances AI agent reasoning with structured thinking tools designed for agent workflows.
- [Think Node MCP](https://github.com/abhinav-mangla/think-tool-mcp) — Node.js implementation of think-tools that improves reasoning and decision making for AI agents.
- [Wanaku MCP Router](https://github.com/wanaku-ai/wanaku/) — Routing engine enabling AI agents to connect with enterprise systems through MCP.
- [Template MCP Server](https://github.com/mcpdotdirect/template-mcp-server) — CLI tool for creating MCP server projects with TypeScript and flexible architecture.
- [Universal MCP Servers](https://github.com/universal-mcp) — Collection of MCP servers built using the Universal MCP SDK for AI agent integrations.
- [Owlex MCP](https://github.com/agentic-mcp-tools/owlex) — Provides MCP infrastructure that enables parallel querying across multiple CLI agents to support coordinated agent workflows.
- [Mengram MCP](https://github.com/alibaizhanov/mengram) — Provides MCP-based semantic and episodic memory layers to support long-term memory capabilities for AI agents.
- [Engram-rs MCP](https://github.com/kael-bit/engram-rs) — Provides a Rust-based MCP memory engine with automatic decay mechanisms designed for AI agent memory management.
- [blockrun-mcp](https://github.com/blockrunai/blockrun-mcp) — Access multiple AI models like GPT, Claude, Gemini and others using a pay-per-use infrastructure without managing API keys.
- [1mcp/agent](https://github.com/1mcp-app/agent) — Unified Model Context Protocol server that aggregates multiple MCP servers into one interface.
- [Aganium](https://github.com/Aganium/agenium) — Connect MCP servers to the agent network for identity discovery and service access.
- [evc-spark-mcp](https://github.com/entire-vc/evc-spark-mcp) — Catalog platform to search and discover AI agents, skills, and MCP connectors.
- [mcp-orchestrator](https://github.com/rupinder2/mcp-orchestrator) — Central hub that aggregates tools from multiple MCP servers with unified search capabilities.
- [AgentHotspot](https://github.com/AgentHotspot/agenthotspot-mcp) — Marketplace platform to search, integrate, and manage MCP connectors.
- [agentnet](https://github.com/oxgeneral/agentnet) — Agent discovery network where AI agents can find and recommend services to each other.
- [Agent47](https://github.com/espadaw/Agent47) — Unified job aggregation platform for AI agents across multiple ecosystems.
- [neurolink](https://github.com/juspay/neurolink) — Platform that unifies multiple model providers with orchestration and guardrails.
- [Pipedream MCP](https://github.com/PipedreamHQ/pipedream/tree/master/modelcontextprotocol) — Integration platform providing thousands of API connections and automation tools.
- [node-code-sandbox-mcp](https://github.com/alfonsograziano/node-code-sandbox-mcp) — Execute JavaScript snippets in isolated Docker sandboxes.  
- [piston-mcp](https://github.com/alvii147/piston-mcp) — Support code execution in multiple programming languages using the Piston engine.  
- [dagger/container-use](https://github.com/dagger/container-use) — Allow agents to work in fresh containers and git branches, preventing conflicts in complex environments.  
- [mcp-run-python (Pydantic AI)](https://github.com/pydantic/pydantic-ai/tree/main/mcp-run-python) — Run Python code in a secure sandbox to safely test system behavior.
- [claude-concilium](https://github.com/spyrae/claude-concilium) — Multi-agent framework for Claude Code with parallel code review and fallback chains.  
- [llm-council](https://github.com/elhamid/llm-council) — Three-stage council based on Andrej Karpathy’s concept: parallel responses, anonymous ranking, and synthesis.
- [label-studio-mcp-server](https://github.com/HumanSignal/label-studio-mcp-server) — Provides an AI-friendly interface to manage and automate Label Studio projects and data labeling tasks.  
- [clawpay-mcp](https://github.com/up2itnow0822/clawpay-mcp) — Provides an interface for autonomous systems to manage payment transactions and implement on-chain spending policies.  
- [payclaw-mcp](https://github.com/payclaw/mcp-server) — System for issuing virtual payment cards and managing automated payment workflows.  
- [lightning-enable-mcp](https://github.com/refined-element/lightning-enable-mcp) — Integration for creating invoices and processing payments on the Bitcoin Lightning Network.  
- [agentpay-server](https://github.com/joepangallo/mcp-server-agentpay) — Payment gateway designed for autonomous systems, supporting pay-per-call billing and payment integrations.
- [engram](https://github.com/tstockham96/engram) — Intelligent agent memory system that provides semantic recall and context-aware memory management, enabling agents to efficiently store and reuse long-term information.  
- [memora](https://github.com/agentic-mcp-tools/memora) — Persistent agent memory platform offering structured memory management with knowledge graph visualization and cloud storage synchronization.  
- [contextstream](https://www.npmjs.com/package/@contextstream/mcp-server) — Universal persistent memory platform providing tools for semantic code search, impact analysis, and decision tracking.  
- [In-Memoria](https://github.com/pi22by7/In-Memoria) — Hybrid TypeScript and Rust–based memory system that enables coding assistants to maintain cumulative context memory and learn patterns over time.  

---

### Monitoring / Logs

Tools that help track application performance, logs, and system activity.

- [PostHog MCP](https://github.com/PostHog/mcp) – MCP server for accessing PostHog analytics, feature flags, and error tracking through AI tools :contentReference[oaicite:0]{index=0}  
- [Axiom MCP](https://github.com/axiomhq/mcp-server-axiom) – Query and analyze logs, traces, and observability data using MCP
- [Langfuse MCP](https://github.com/langfuse/mcp-server-langfuse) – Monitor and debug LLM applications with observability tools  
- [Logfire MCP](https://github.com/pydantic/logfire-mcp) – Access OpenTelemetry traces and metrics  
- [Mixpanel MCP](https://docs.mixpanel.com/docs/features/mcp) – Query product analytics data via natural language  
- [Microsoft Clarity MCP](https://github.com/microsoft/clarity-mcp-server) – Retrieve behavioral analytics insights  
- [PagerDuty](https://github.com/PagerDuty/pagerduty-mcp-server) – Interact with your PagerDuty account, manage incidents, services, schedules, and more directly from your MCP-enabled client  
- [Powerdrill](https://github.com/powerdrillai/powerdrill-mcp) – MCP server providing smart AI data analysis and insights  
- [Parallel Task MCP](https://github.com/parallel-web/task-mcp) – Initiate Deep Research and Batch Tasks 
- [ActivityPub MCP](https://github.com/cameronrye/activitypub-mcp) – Enables LLMs to interact with Fediverse via ActivityPub protocol  
- [AWS Cost Explorer](https://github.com/aarora79/aws-cost-explorer-mcp-server) – Optimize your AWS spend using an MCP server
- [Downdetector MCP](https://github.com/domdomegg/downdetector-mcp) – Retrieves service status and outage information for real-time availability monitoring.  
- [FDIC BankFind MCP](https://github.com/clafollett/fdic-bank-find-mcp-server) – Provides structured banking data from FDIC APIs for financial monitoring and analysis.
- [Federal Reserve Economic Data MCP](https://github.com/stefanoamorelli/fred-mcp-server) – Access to macroeconomic datasets from the FRED database.
- [Descope MCP](https://github.com/descope-sample-apps/descope-mcp-server) – Manage users and audit logs through Descope identity platform integration.
- [Graylog MCP Server](https://github.com/Pranavj17/mcp-server-graylog) — Enables AI assistants to query and analyze logs stored in Graylog monitoring systems.
- [Kibana MCP Server](https://github.com/TocharianOU/mcp-server-kibana.git) — Allows monitoring and log analysis through integration with Kibana dashboards.
- [Loki MCP Server](https://github.com/mo-silent/loki-mcp-server) — Python-based server for Loki logs.
- [librenms-mcp](https://github.com/mhajder/librenms-mcp) — Integration with LibreNMS for network monitoring.
- [Prometheus MCP Server](https://github.com/pab1it0/prometheus-mcp-server) — Query metrics and analyze monitoring data from Prometheus.
- [Splunk](https://github.com/jkosik/mcp-server-splunk) — Query searches, alerts, and indexes in Splunk.
- [Tempo](https://github.com/scottlepp/tempo-mcp-server) — Query distributed traces from Grafana Tempo.
- [Tideways](https://github.com/abuhamza/tideways-mcp-server) — PHP performance monitoring insights.
- [System Health](https://github.com/thanhtung0201/mcp-remote-system-health) — Real-time health monitoring for Linux servers.
- [SystemSage](https://github.com/Tarusharma1/SystemSage) — Cross-platform system monitoring and management.
- [sslmon](https://github.com/firesh/sslmon-mcp) — Monitor domain registration and SSL certificate validity.
- [WaveGuardClient](https://github.com/gpartin/WaveGuardClient) — Physics-based anomaly detection system that uses GPU acceleration to detect infrastructure and system anomalies.  
- [renoun-mcp](https://github.com/98lukehall/renoun-mcp) — Provides structural observability for AI conversations and system workflows, tracking loops and state transitions.
- [box-mcp-server-remote](https://github.com/box/mcp-server-box-remote/) — Official MCP integration for securely accessing, searching, and managing Box cloud storage content.  
- [mcp-gdrive](https://github.com/isaacphi/mcp-gdrive) — Integration for reading Google Drive files and editing Google Sheets through MCP.
- [Datadog MCP (TANTIOPE)](https://github.com/TANTIOPE/datadog-mcp-server) — Provides access to Datadog observability data for log search, APM trace filtering, and cross-correlation between logs and metrics.  
- [dynatrace-mcp](https://github.com/dynatrace-oss/dynatrace-mcp) — Connects with the Dynatrace observability platform to analyze anomalies, events, and distributed traces.  
- [VictoriaMetrics MCP](https://github.com/VictoriaMetrics-Community/mcp-victoriametrics) — Integrates with VictoriaMetrics monitoring APIs to query metrics and analyze monitoring data.  
- [edgedelta-mcp-server](https://github.com/edgedelta/edgedelta-mcp-server) — Provides tools for analyzing logs and events to understand system behavior and identify issues.  
- [zabbix-mcp-server](https://github.com/mpeirone/zabbix-mcp-server) — Integrates with the Zabbix monitoring system to access hosts, triggers, and infrastructure monitoring data.  
- [fortimonitor-mcp-server](https://github.com/gjenkins20/unofficial-fortimonitor-mcp-server) — Provides monitoring tools for infrastructure tracking, outage detection, and notification management.  
- [mcp-monitor](https://github.com/seekrays/mcp-monitor) — Exposes real-time system metrics such as CPU, memory, disk, and network usage for LLM agents.

---

### Knowledge Retrieval (RAG)

Tools that provide persistent memory and knowledge storage capabilities for AI agents.

- [Basic Memory](https://github.com/basicmachines-co/basic-memory) – Local knowledge system that builds a semantic graph from markdown files for persistent AI memory.
- [Cognee MCP](https://github.com/topoteretes/cognee/tree/main/cognee-mcp) – GraphRAG memory server with ingestion, processing, and search capabilities  
- [Context Portal](https://github.com/GreatScottyMac/context-portal) – Project knowledge graph and memory database for AI assistants, designed for Retrieval Augmented Generation with structured project data.
- [Extended Memory MCP](https://github.com/ssmirnovpro/extended-memory-mcp) – Persistent memory system for AI assistants with tagging, importance scoring, and long-term knowledge storage.
- [Context Crystallizer](https://github.com/hubertciebiada/context-crystallizer) – Converts large repositories into structured AI-friendly knowledge representations for improved retrieval.
- [GitMCP](https://github.com/idosal/git-mcp) — Generic remote MCP server that allows AI assistants to connect with any GitHub repository or documentation for contextual knowledge retrieval.
- [Glean MCP Server](https://github.com/longyi1207/glean-mcp-server) — Provides enterprise knowledge search and conversational access using the Glean API.
- [Google Vertex AI Search MCP](https://github.com/ubie-oss/mcp-vertexai-search) — Enables AI assistants to retrieve information from private datasets using Google Vertex AI Search.
- [Google Scholar MCP Server](https://github.com/JackKuo666/Google-Scholar-MCP-Server) — Allows AI assistants to search and access academic research papers through Google Scholar.
- [Google Scholar MCP (TypeScript)](https://github.com/mochow13/google-scholar-mcp) — MCP server that integrates Google Scholar search with AI assistants using TypeScript implementation.
- [Local RAG](https://github.com/shinpr/mcp-local-rag) — Lightweight document search with PDF, DOCX, Markdown.
- [mcp-local-rag](https://github.com/nkapila6/mcp-local-rag) — Local RAG server with document embeddings and web search.
- [Langflow-DOC-QA-SERVER](https://github.com/GongRzhe/Langflow-DOC-QA-SERVER) — Document Q&A system with Langflow backend.
- [LlamaCloud](https://github.com/run-llama/mcp-server-llamacloud) — Access managed vector indexes for AI retrieval.
- [lucene-mcp-server](https://github.com/VivekKumarNeu/MCP-Lucene-Server) — High-performance document indexing using Apache Lucene.
- [Minima](https://github.com/dmayboroda/minima) — Lightweight RAG system for local files.
- [RAG Local MCP](https://github.com/renl/mcp-rag-local) — Store and retrieve text passages locally using semantic search.
- [RAG Web Browser MCP](https://github.com/apify/mcp-server-rag-web-browser) — Perform web search and scraping for RAG pipelines.
- [py-mcp-qdrant-rag](https://github.com/amornpan/py-mcp-qdrant-rag) — Implement RAG pipelines using Qdrant vector DB.
- [Pinecone MCP Server](https://github.com/sirmews/mcp-pinecone) — Vector DB integration for semantic search and RAG workflows.
- [Source to Knowledge Base](https://github.com/vezlo/src-to-kb) — Convert source code repositories into searchable knowledge bases with AI-powered semantic search.
- [Sourcerer](https://github.com/st3v3nmw/sourcerer-mcp) — Semantic code search and navigation MCP for efficient code exploration.
- [Stitch AI](https://github.com/StitchAI/stitch-ai-mcp/) — Knowledge management system with memory spaces and contextual retrieval.
- [Zettelkasten](https://github.com/joshylchen/zettelkasten) — AI-powered knowledge management supporting structured notes and semantic linking.
- [Wren Engine](https://github.com/Canner/wren-engine) — Semantic engine for MCP clients providing structured knowledge retrieval.
- [Project Context MCP](https://github.com/ericbrown/project-context-mcp) — Provides MCP tools to access files in the .context directory so coding agents can retrieve structured project knowledge.
- [OpenZIM MCP](https://github.com/cameronrye/openzim-mcp) — Provides MCP tools to access ZIM archive datasets, enabling AI agents to retrieve offline knowledge collections.
- [ragmap](https://github.com/khalidsaidi/ragmap) — Registry and routing layer to discover retrieval-enabled MCP servers using structured constraints.
- [PersonalizationMCP](https://github.com/YangLiangwei/PersonalizationMCP) — Aggregates personal data sources to enable contextual retrieval and personalization.
- [claude-skills-mcp](https://github.com/K-Dense-AI/claude-skills-mcp) — Intelligent discovery system that allows models to search and use Claude agent skills.
- [biothings-mcp](https://github.com/longevity-genie/biothings-mcp) — Interact with the BioThings API to retrieve data related to genes, genetic variants, and drugs.
- [opengenes-mcp](https://github.com/longevity-genie/opengenes-mcp) — Database interface for accessing gene datasets for aging and longevity research.
- [synergy-age-mcp](https://github.com/longevity-genie/synergy-age-mcp) — Interface for accessing genetic interaction datasets from the SynergyAge database.
- [encode-toolkit](https://github.com/ammawla/encode-toolkit) — Toolkit for searching and analyzing ENCODE genomic datasets.
- [ChatSpatial](https://github.com/cafferychen777/ChatSpatial) — Server to support analysis workflows with spatial transcriptomics datasets.
- [onekgpd-mcp](https://github.com/dnaerys/onekgpd-mcp) — Provides real-time access to the 1000 Genomes Project dataset.
- [ucsc-genome-mcp](https://github.com/hlydecker/ucsc-genome-mcp) — Interact with the UCSC Genome Browser API to retrieve genome and chromosome data.
- [gget-mcp](https://github.com/longevity-genie/gget-mcp) — Toolkit for bioinformatics queries and genomics data analysis.
- [dbt-mcp (Official)](https://github.com/dbt-labs/dbt-mcp) — Integrates with dbt Core/Cloud to access project metadata, model information, and semantic layer queries.  
- [dbt-docs-mcp](https://github.com/mattijsdp/dbt-docs-mcp) — Provides dbt-core (OSS) users with model- and column-level lineage and documentation access.  
- [bonnard-cli](https://github.com/meal-inc/bonnard-cli) — Agent-first semantic layer that simplifies data interaction.    
- [keyneg-mcp](https://github.com/Osseni94/keyneg-mcp) — Enterprise-grade sentiment analysis and keyword extraction with 95+ labels.  
- [oyemi-mcp](https://github.com/Osseni94/oyemi-mcp) — Provides semantic word encoding and similarity analysis using a 145K+ word lexicon.  
- [zaturn](https://github.com/kdqed/zaturn) — Connects multiple data sources (SQL, CSV, Parquet) and provides structured data context for AI agents to perform analysis and generate insights.
- [finbrain-mcp](https://github.com/ahmetsbilgin/finbrain-mcp) — Integrates alternative financial datasets with LLM workflows to provide contextual financial insights and knowledge retrieval.  
- [shareseer-mcp-server](https://github.com/shareseer/shareseer-mcp-server) — Server for retrieving SEC filings, corporate financial reports, and insider trading datasets in a structured format.
- [CodeCortex](https://github.com/rushikeshmore/CodeCortex) — Transforms codebases into structured knowledge formats with symbol indexing and dependency graphs for optimized context retrieval.  
- [mcp-obsidian](https://github.com/bitbonsai/mcp-obsidian) — Integrates with Obsidian vaults to provide read and write access to team documentation and internal knowledge notes.  
- [easy-obsidian-mcp](https://github.com/louis030195/easy-obsidian-mcp) — Provides structured access to Obsidian-based knowledge repositories, integrating internal documentation into AI workflows.   
- [project-tessera](https://github.com/besslframework-stack/project-tessera) — Local workspace memory system that stores documents and session logs in a vector-based index for efficient knowledge retrieval.
- [us-legal-mcp](https://github.com/JamesANZ/us-legal-mcp) — Server for searching legal databases and legislation documents to retrieve structured legal information.  
- [idapixl-web-research-mcp](https://github.com/idapixl/idapixl-web-research-mcp) — Research automation tools that collect information from multiple sources and generate structured research summaries.
- [NotebookLM MCP Secure](https://github.com/Pantheon-Security/notebooklm-mcp-secure) — Secure integration with Google NotebookLM for retrieving structured information from documents and knowledge sources.  
- [Vectara MCP](https://github.com/vectara/vectara-mcp) — Enables trusted knowledge search and retrieval workflows using Vectara’s retrieval-augmented generation APIs.  
- [CustomGPT MCP](https://github.com/poll-the-people/customgpt-mcp) — Integrates with the CustomGPT knowledge platform to support document-based question answering and retrieval workflows.
- [Nexus](https://github.com/adawalli/nexus) — AI-powered search server that uses Perplexity Sonar models to return search results with source citations.  
- [Octagon Deep Research](https://github.com/OctagonAI/octagon-deep-research-mcp) — Enables deep research workflows for AI agents to generate structured reports on complex topics.  
- [Exa AI Search](https://github.com/exa-labs/exa-mcp-server) — Provides real-time web search capabilities for AI assistants using the Exa AI Search API.  
- [Google Researcher MCP](https://github.com/zoharbabin/google-researcher-mcp) — Comprehensive toolkit that collects research information from Google Search, web scraping, and academic sources such as arXiv, PubMed, and IEEE.  
- [ArXiv MCP (blazickjp)](https://github.com/blazickjp/arxiv-mcp-server) — MCP interface for searching and reading research papers from arXiv.  
- [PubMed MCP (andybrandt)](https://github.com/andybrandt/mcp-simple-pubmed) — Provides tools to search and read medical and life sciences research papers from PubMed.  
- [PapersWithCode MCP](https://github.com/hbg/mcp-paperswithcode) — Enables searching machine learning research papers and associated code implementations through the PapersWithCode API.

---

### Utility

Tools that help simplify and automate utility tasks in development workflows.

- [Calculator MCP](https://github.com/githejie/mcp-server-calculator) – Enables LLMs to perform precise numerical calculations.
- [Code Interpreter](https://github.com/e2b-dev/code-interpreter) – Execute and analyze code in secure environments 
- [eBook MCP](https://github.com/onebirdrocks/ebook-mcp) – MCP server for accessing and generating eBook content  
- [Any Chat Completions](https://github.com/pyroprompts/any-chat-completions-mcp) – Connect to OpenAI compatible chat completion APIs such as OpenAI, Groq, Perplexity, and others.
- [Commands MCP](https://github.com/g0t4/mcp-server-commands) – Run system commands and scripts similar to a terminal environment.
- [CSV Editor MCP](https://github.com/santoshray02/csv-editor) – CSV processing tool supporting data manipulation, validation, and analysis for large datasets.
- [Current Time UTC MCP](https://github.com/jairampatel/currenttimeutc-mcp) – Provides accurate UTC time and timezone conversions.
- [Cursor MCP Installer](https://github.com/matthewdcage/cursor-mcp-installer) – Simplifies installation and configuration of MCP servers within the Cursor IDE.
- [Enhance Prompt MCP](https://github.com/FelixFoster/mcp-enhance-prompt) – Improves prompt quality and clarity for AI assistant interactions.
- [Everything Search MCP](https://github.com/mamertofabian/mcp-everything-search) – Fast cross-platform file search capabilities for local systems.
- [Excel MCP](https://github.com/haris-musa/excel-mcp-server) – Provides Excel spreadsheet operations including reading, writing, formatting, and chart creation.
- [Excel to JSON MCP](https://github.com/he-yang/excel-to-json-mcp) – Converts Excel and CSV data into structured JSON format for data processing workflows.
- [Email MCP](https://github.com/Shy2593666979/mcp-server-email) – Enables sending emails and managing attachments through multiple email providers.
- [Email SMTP MCP](https://github.com/egyptianego17/email-mcp-server) – Lightweight SMTP server allowing AI agents to send emails with attachments.
- [Frankfurter MCP](https://github.com/anirbanbasu/frankfurtermcp) – Currency exchange data access using the Frankfurter API.
- [Coin API MCP](https://github.com/longmans/coin_api_mcp) – Provides cryptocurrency market data from CoinMarketCap including prices, rankings, and metrics.
- [CoinMarketCap MCP](https://github.com/shinzo-labs/coinmarketcap-mcp) – Full API integration for accessing cryptocurrency market data and exchange statistics.
- [Discord MCP](https://github.com/v-3/discordmcp) – Enables AI assistants to interact with Discord servers and channels through a bot.
- [Discord MCP (Alternative)](https://github.com/SaseQ/discord-mcp) – Another implementation providing Discord integration with extended functionality.
- [Discord MCP (Klavis)](https://github.com/Klavis-AI/klavis/tree/main/mcp_servers/discord) – MCP server enabling Discord API integration for AI assistants.
- [Discourse MCP](https://github.com/AshDevFr/discourse-mcp-server) – Search and retrieve posts from Discourse forums.
- [Ghost MCP](https://github.com/MFYDev/ghost-mcp) – MCP server enabling interaction with Ghost CMS content.
- [JSON MCP Server](https://github.com/GongRzhe/JSON-MCP-Server) — Advanced JSON data processing server with support for JSONPath queries and structured operations.
- [JSON MCP Filter](https://github.com/kehvinbehvin/json-mcp-filter) — JSON schema generation and filtering tools optimized for extracting relevant structured data.
- [JSON to Excel MCP](https://github.com/he-yang/json-to-excel-mcp) — Converts JSON datasets into CSV or Excel compatible formats for data analysis.
- [it-tools MCP](https://github.com/wrenchpilot/it-tools-mcp) — Provides a collection of developer utilities including encoding, decoding, and format conversion tools.
- [Large File MCP](https://github.com/willianpinho/large-file-mcp) — Efficient handling of large files with streaming and caching.
- [mcp-grep](https://github.com/erniebrodeur/mcp-grep) — Pattern search and directory scanning.
- [KYC-mcp-server](https://github.com/vishnurudra-ai/KYC-mcp-server) — System diagnostics for operating systems.
- [Matlab-MCP-Tools](https://github.com/neuromechanist/matlab-mcp-tools) — Execute MATLAB scripts via MCP.
- [Random Number MCP](https://github.com/zazencodes/random-number-mcp) — Generate random numbers and values using Python libraries.
- [ScriptFlow MCP](https://github.com/yanmxa/scriptflow-mcp) — Convert repetitive AI interactions into reusable automation scripts.
- [QuickChart MCP](https://github.com/GongRzhe/Quickchart-MCP-Server) — Generate charts dynamically using QuickChart APIs.
- [Solver](https://github.com/szeider/mcp-solver) — Solve constraint satisfaction and optimization problems.
- [Stockfish](https://github.com/sonirico/mcp-stockfish) — Connect AI models to the Stockfish chess engine.
- [Weather MCP Server](https://github.com/devilcoder01/weather-mcp-server) — Retrieve real-time weather data.
- [Travel Planner](https://github.com/GongRzhe/TRAVEL-PLANNER-MCP-Server) — Create travel itineraries using Google Maps data.
- [Ticketmaster MCP Server](https://github.com/mochow13/ticketmaster-mcp-server) — Search events, venues, and attractions.
- [Wordle MCP](https://github.com/cr2007/mcp-wordle-python) — Retrieve Wordle puzzle solutions.
- [Yahoo Finance](https://github.com/AgentX-ai/yahoo-finance-server) — Access stock market data and analytics.
- [PayMCP](https://github.com/blustAI/paymcp) — Payment integration layer for exposing MCP tools as paid API endpoints.
- [A2A-MCP Java Bridge](https://github.com/vishalmysore/a2ajava) — Annotate Java methods to expose MCP servers or A2A-discoverable actions.
- [AiMCP](https://www.aimcp.info) — Collection of MCP clients and servers to discover and select MCP tools.
- [Awesome Crypto MCP Servers by badkk](https://github.com/badkk/awesome-crypto-mcp-servers) — Curated list of crypto-focused MCP servers.
- [Awesome MCP Servers by appcypher](https://github.com/appcypher/awesome-mcp-servers) — Curated MCP server collection for reference.
- [Awesome MCP Servers by punkpeye](https://github.com/punkpeye/awesome-mcp-servers) — Curated MCP server list with website and references.
- [Awesome MCP Servers by wong2](https://github.com/wong2/awesome-mcp-servers) — Curated MCP server collection including website references.
- [Awesome Remote MCP Servers by JAW9C](https://github.com/jaw9c/awesome-remote-mcp-servers) — Remote MCP servers with authentication support.
- [Discord Server](https://glama.ai/mcp/discord) — Community Discord for MCP discussion and collaboration.
- [Install This MCP](https://installthismcp.com) — Guides and tools to reduce MCP installation friction.
- [Klavis AI](https://www.klavis.ai) — Open Source MCP infra with hosted MCP servers and clients for Slack/Discord.
- [MCP Badges](https://github.com/mcpx-dev/mcp-badges) — Tool to create badges highlighting MCP projects.
- [MCPProxy](https://github.com/smart-mcp-proxy/mcpproxy-go) — Local app for accessing multiple MCP servers with discovery and sandboxing.
- [MCPRepository.com](https://mcprepository.com/) — Repository indexing MCP servers for easy discovery.
- [mcp-cli](https://github.com/wong2/mcp-cli) — Command-line inspector for MCP tools and servers.
- [mcp-dockmaster](https://mcp-dockmaster.com) — UI for installing/managing MCP servers across platforms.
- [mcp-get](https://mcp-get.com) — CLI tool for installing and managing MCP servers.
- [mcp-guardian](https://github.com/eqtylab/mcp-guardian) — GUI + tools to manage MCP servers with proxy control.
- [MCP Linker](https://github.com/milisp/mcp-linker) — Cross-platform GUI for one-click MCP server setup and management.
- [mcp-manager](https://github.com/zueai/mcp-manager) — Web UI for installing/managing MCP servers for Claude Desktop.
- [MCP Marketplace Web Plugin](https://github.com/AI-Agent-Hub/mcp-marketplace) — Web plugin to browse/select MCP servers in AI apps.
- [mcp.natoma.ai](https://mcp.natoma.ai) — Hosted MCP platform to discover, install, deploy MCP servers.
- [mcp.run](https://mcp.run) — Hosted registry and control plane for secure MCP server deployment.
- [MCPHub](https://www.mcphub.com) — Website listing high-quality MCP servers with chatbot integration.
- [MCP Router](https://mcp-router.net) — Windows/macOS app simplifying MCP management, authentication, and logs.
- [MCP Servers Hub](https://github.com/apappascs/mcp-servers-hub) — Curated MCP server list with website interface.
- [MCPServers.com](https://mcpservers.com) — Directory of MCP servers with setup guides and client support.
- [MCP Servers Rating and User Reviews](http://www.deepnlp.org/store/ai-agent/mcp-server) — Platform to rate MCP servers, write reviews, search MCP services.
- [MCP Sky](https://bsky.app/profile/brianell.in/feed/mcp) — Bluesky feed for MCP news and discussion.
- [MCP X Community](https://x.com/i/communities/1861891349609603310) — Twitter community for MCP discussion.
- [MCPHub (Desktop App)](https://github.com/Jeamee/MCPHub-Desktop) — Open Source macOS & Windows app for MCP server management.
- [mcpm](https://github.com/pathintegral-institute/mcpm.sh) — Homebrew-like service for managing MCP servers across clients.
- [MCPVerse](https://mcpverse.dev) — Portal for creating & hosting authenticated MCP servers.
- [MCP Servers Search](https://github.com/atonomus/mcp-servers-search) — MCP server providing query & discovery tools.
- [Search MCP Server](https://github.com/krzysztofkucmierz/search-mcp-server) — Tool recommending MCP servers based on client queries.
- [MCPWatch](https://github.com/kapilduraphe/mcp-watch) — Security scanner for MCP servers detecting vulnerabilities.
- [mkinf](https://mkinf.io) — Open Source registry of hosted MCP servers to accelerate AI agent workflows.
- [Open-Sourced MCP Servers Directory](https://github.com/chatmcp/mcp-directory) — Curated MCP server list for easy discovery.
- [OpenTools](https://opentools.com) — Open registry to find, install, and build with MCP servers.
- [Programmatic MCP Prototype](https://github.com/domdomegg/programmatic-mcp-prototype) — Experimental agent prototype for tool composition and execution via MCP.
- [PulseMCP](https://www.pulsemcp.com) — Community hub & newsletter for discovering MCP servers and news.
- [r/mcp](https://www.reddit.com/r/mcp) — Reddit community for MCP discussion.
- [MCP.ing](https://mcp.ing/) — MCP services search and community discovery.
- [MCP Hunt](https://mcp-hunt.com) — Platform for discovering trending MCP servers with community votes.
- [Smithery](https://smithery.ai/) — Registry of MCP servers for selecting tools for LLM agents.
- [Toolbase](https://gettoolbase.ai) — Desktop app managing MCP servers and tools.
- [ToolHive](https://github.com/StacklokLabs/toolhive) — Utility for deployment and management of MCP servers via containerization.
- [NetMind](https://www.netmind.ai/AIServices) — Access AI services via APIs or MCP servers.
- [Webrix MCP Gateway](https://github.com/webrix-ai/secure-mcp-gateway) — Enterprise MCP gateway with SSO, RBAC, audit trails, token vaults for secure AI agent access.
- [Tasks](https://github.com/flesler/mcp-tasks) — Efficient task management tool supporting multiple file formats.
- [Todos](https://github.com/tomelliot/todos-mcp) — Simple todo list manager designed for AI assistant workflows.
- [Todoist](https://github.com/abhiz123/todoist-mcp-server) — Manage personal and team tasks through Todoist APIs.
- [TickTick](https://github.com/alexarevalo9/ticktick-mcp-server) — Integrates the TickTick task platform for productivity workflows.
- [Things3 MCP](https://github.com/urbanogardun/things3-mcp) — Task and project management integration for the Things3 productivity application.
- [Workflowy](https://github.com/danield137/mcp-workflowy) — Interact with the Workflowy outline-based task and knowledge management platform.
- [Ticket Generator MCP](https://github.com/trycon/ticket-generator-mcp) — Generate event tickets using Ticket Generator APIs.
- [Starling Bank](https://github.com/domdomegg/starling-bank-mcp) — Access banking account balances and transaction history through MCP tools.
- [Xero MCP Server](https://github.com/john-zhang-dev/xero-mcp) — Community MCP integration for Xero accounting operations such as invoicing and finance management.
- [Xero MCP Server (Official)](https://github.com/XeroAPI/xero-mcp-server) — Official Xero MCP server integration for financial and accounting workflows.
- [YNAB](https://github.com/ChuckBryan/ynabmcpserver) — Analyze personal financial data through the YNAB budgeting platform.
- [IO Aerospace MCP Server](https://github.com/IO-Aerospace-software-engineering/mcp-server) — Provides MCP tools for orbital conversions, time calculations, and mathematical utilities.
- [IcoGenie MCP](https://github.com/albertnahas/icogenie-mcp) — Provides MCP tools that generate SVG icons from text descriptions for use in development and design workflows.
- [DotNet Template MCP](https://github.com/YuliiaKovalova/dotnet-template-mcp) — Provides MCP tools to generate project scaffolding templates for .NET applications.
- [x402-discovery-mcp](https://github.com/rplryan/x402-discovery-mcp) — Runtime discovery layer that helps agents route API calls based on capabilities.
- [voxie-ai-directory-mcp](https://github.com/sonnyflylock/voxie-ai-directory-mcp) — AI phone directory that connects to different services and personas.
- [medical-mcp](https://github.com/JamesANZ/medical-mcp) — Interface for querying drug databases and healthcare information resources.
- [mcp-immostage](https://github.com/LarryWalkerDEV/mcp-immostage) — AI-driven virtual staging for real estate, 3D floor plan rendering, and property description generation.
- [dingo](https://github.com/DataEval/dingo) — Provides rule-based and AI-assisted tools for evaluating data quality.  
- [math-mcp-learning-server](https://github.com/clouatre-labs/math-mcp-learning-server) — Interactive environment for educational math operations and workspace-based calculations.
- [brightspace-mcp-server](https://github.com/RohanMuppa/brightspace-mcp-server) — Integrates with the D2L Brightspace learning platform to access courses, assignments, and academic information.  
- [wildfire-mcp-server](https://github.com/aliafsahnoudeh/wildfire-mcp-server) — Provides access to global wildfire monitoring and environmental data analysis using NASA FIRMS and Google Earth Engine data.
- [filesystem-context-mcp-server](https://github.com/j0hanz/filesystem-context-mcp-server) — Server for secure read-only filesystem exploration and search operations.
- [md-to-pdf-mcp](https://github.com/MarceauSolutions/md-to-pdf-mcp) — Generates professional PDF files directly from Markdown documents.
- [hledger-mcp](https://github.com/iiAtlas/hledger-mcp) — Provides an interface for interacting with double-entry accounting journals to read and manage financial transactions.  
- [ledger-mcp-server](https://github.com/minhyeoky/mcp-server-ledger) — MCP server integrating with Ledger-CLI to manage financial records and generate accounting reports.
- [stadiamaps-mcp-server](https://github.com/stadiamaps/stadiamaps-mcp-server-ts) — Provides address lookup, routing, and static map generation using the Stadia Maps API.  
- [mcp-server-iplocate](https://github.com/iplocate/mcp-server-iplocate) — Interface for retrieving IP address geolocation and network information.  
- [mcp-server-ipinfo](https://github.com/briandconnelly/mcp-server-ipinfo) — Integrates with the IPInfo API to access geolocation and network metadata.
- [citedy-seo-agent](https://github.com/Citedy/citedy-seo-agent) — Offers tools for SEO content generation, competitor analysis, and online trend discovery.
- [AEO CLI](https://github.com/hanselhansel/aeo-cli) — Audits URLs to check AI crawler readiness (e.g., robots.txt, llms.txt) and provides a structured evaluation score.
- [lara-mcp](https://github.com/translated/lara-mcp) — Integrates with the Lara Translate API to provide context-aware translations and automatic language detection.

---

### Web Scraping / Data Extraction

Tools that help AI agents search the web, crawl websites, and extract structured data from online sources.

- [Search1API](https://github.com/fatwang2/search1api-mcp) – Unified API for search, crawling, and sitemap discovery across websites.
- [SearchUnify](https://github.com/searchunify/su-mcp) – MCP server that integrates SearchUnify knowledge discovery and enterprise search capabilities with AI tools.
- [Tavily](https://github.com/tavily-ai/tavily-mcp) – AI search engine designed for agents to retrieve and extract high-quality web information.
- [Tako](https://github.com/TakoData/tako-mcp) – Natural language interface to access real-time financial, sports, weather, and public data with visualization.
- [Bing Web Search API](https://github.com/leehanchung/bing-search-mcp) – Allows AI assistants to perform web searches using Microsoft Bing API.
- [Baidu AI Search](https://github.com/baidubce/app-builder/tree/master/python/mcp_server/ai_search) – Provides web search capabilities using Baidu Cloud AI Search services.
- [Defuddle Fetch MCP](https://github.com/domdomegg/defuddle-fetch-mcp-server) – Fetch and convert web pages into structured markdown for easier data extraction.
- [Fetch MCP](https://github.com/zcaceres/fetch-mcp) – Flexible content fetching server supporting HTML, JSON, Markdown, and plaintext.
- [DataCite MCP](https://github.com/QuentinCody/datacite-mcp-server) – Provides access to research datasets and scholarly publication metadata through DataCite APIs.
- [DPLP MCP](https://github.com/szeider/mcp-dblp) – Enables search across the DBLP computer science bibliography database.
- [Entrez MCP](https://github.com/QuentinCody/entrez-mcp-server) – Provides access to biomedical databases including PubMed and gene information.
- [Dataset Viewer MCP](https://github.com/privetin/dataset-viewer) – Allows browsing and analysis of Hugging Face datasets with filtering and statistics features.
- [Data Exploration MCP](https://github.com/reading-plus-ai/mcp-server-data-exploration) – Autonomous exploration tool for analyzing CSV datasets and generating insights.
- [Data4Library MCP](https://github.com/isnow890/data4library-mcp) – Access public library data including book search and loan information.
- [Discogs MCP](https://github.com/cswkim/discogs-mcp-server) – Connects to Discogs API for accessing music collection and marketplace data.
- [Congress.gov MCP](https://github.com/AshwinSundar/congress_gov_mcp) – Provides access to legislative data from the U.S. Congress API.
- [Dappier MCP](https://github.com/DappierAI/dappier-mcp) – Connects AI assistants to real-time web data including news, finance, and sports.
- [Dune Analytics MCP](https://github.com/kukapay/dune-analytics-mcp) – Access blockchain analytics data and queries from Dune Analytics.
- [Google Custom Search MCP](https://github.com/adenot/mcp-google-search) — Retrieves Google search results programmatically through the Google Custom Search API.
- [Google Maps MCP Server](https://github.com/Mastan1301/google_maps_mcp) — Accesses location information and places data using Google Maps and Places API.
- [Job Searcher MCP Server](https://github.com/0xDAEF0F/job-searchoor) — Retrieve and filter job listings based on keywords, time range, and remote work preferences.
- [JobsWithGPT MCP Server](https://github.com/jobswithgpt/mcp) — Job search engine MCP integration with access to large-scale job listings database.
- [kwrds.ai](https://github.com/mkotsollaris/kwrds_ai_mcp) — Keyword research and SERP data analysis.
- [market-fiyati](https://github.com/mtcnbzks/market-fiyati-mcp-server) — Grocery price search and comparison.
- [LunarCrush Remote MCP](https://github.com/lunarcrush/mcp-server) — Social metrics and crypto data analysis.
- [mcp-youtube-extract](https://github.com/sinjab/mcp_youtube_extract) — Extract video information and transcripts from YouTube with intelligent fallback logic.
- [scrapling-fetch](https://github.com/cyberchitta/scrapling-fetch-mcp) — Extract text content from websites with automation protection support.
- [Serper MCP](https://github.com/garylab/serper-mcp-server) — Perform Google search queries and retrieve structured search results.
- [SearXNG MCP](https://github.com/ihor-sokoliuk/mcp-searxng) — Perform web searches through the SearXNG metasearch engine.
- [SearXNG Public MCP](https://github.com/pwilkin/mcp-searxng-public) — Access public SearXNG instances with fallback search support.
- [Web Search MCP](https://github.com/mrkrsl/web-search-mcp) — Provides full web search capabilities and page extraction for AI systems.
- [Whois MCP](https://github.com/bharathvaj-ganesan/whois-mcp) — Performs WHOIS lookups for domains, IPs, and network identifiers.
- [Wikipedia MCP](https://github.com/Rudra-ravi/wikipedia-mcp) — Search and retrieve Wikipedia articles using standardized MCP tools.
- [Wikidata MCP](https://github.com/zzaebok/mcp-wikidata) — Access structured Wikidata knowledge through search and SPARQL queries.
- [Wikidata SPARQL](https://github.com/QuentinCody/wikidata-sparql-mcp-server) — Execute semantic queries against Wikidata knowledge graph endpoints.
- [World Bank Data API](https://github.com/anshumax/world_bank_mcp_server) — Retrieve global economic indicators and statistics from the World Bank platform.
- [USA Spending MCP Server](https://github.com/thsmale/usaspending-mcp-server) — Explore and analyze government spending datasets through MCP tools.
- [USPTO](https://github.com/riemannzeta/patent_mcp_server) — Access patent and trademark datasets from the USPTO open data API.
- [Bilibili MCP JS](https://github.com/34892002/bilibili-mcp-js) — Provides MCP tools to search and retrieve content information from the Bilibili platform.
- [agent-scraper-mcp](https://github.com/aparajithn/agent-scraper-mcp) — Provides AI agents with web scraping, content extraction, and link extraction capabilities.  
- [ashra-mcp](https://github.com/getrupt/ashra-mcp) — Extract structured JSON data from any website based on a prompt.  
- [comet-mcp](https://github.com/hanzili/comet-mcp) — Connects with the Perplexity Comet browser to enable agentic web browsing and deep research.  
- [freshcontext-mcp](https://github.com/PrinceGabriel-lgtm/freshcontext-mcp) — Provides real-time web intelligence, including a “freshness” timestamp for each result.
- [apollo-io-mcp](https://github.com/louis030195/apollo-io-mcp) — Provides tools to search and enrich prospects from large B2B contact datasets for sales intelligence workflows.
- [Idea Reality MCP](https://github.com/mnemox-ai/idea-reality-mcp) — Scans platforms like GitHub, npm, and Product Hunt to provide ecosystem insights and validate new project ideas.  
- [BrowserAI-Dev](https://github.com/BrowseAI-HQ/BrowserAI-Dev) — Provides research-focused browsing tools to gather structured research results and referenced information from web sources.
- [Read Website Fast](https://github.com/just-every/mcp-read-website-fast) — Converts web pages into clean Markdown format for efficient content analysis by AI agents.  
- [MinerU MCP](https://github.com/linxule/mineru-mcp) — Converts PDFs, images, and PPTX files into structured text output using OCR for AI processing.  
- [StripFeed](https://github.com/StripFeed/mcp-server) — Extracts content from URLs and converts it into token-efficient Markdown format.
- [reddit-research-mcp](https://github.com/king-of-the-grackles/reddit-research-mcp) — Provides tools to analyze discussions and trends from Reddit communities using semantic search.  
- [reddit-mcp-buddy](https://github.com/karanb192/reddit-mcp-buddy) — Simple interface for browsing Reddit posts, performing searches, and analyzing community activity.  
- [macrocosmos-mcp](https://github.com/macrocosm-os/macrocosmos-mcp) — Provides access to real-time social content search and filtering across platforms such as X, Reddit, and YouTube.  
- [scrapebadger-mcp](https://github.com/scrape-badger/scrapebadger-mcp) — API integration for accessing profiles, posts, and trend-related data from social platforms.

---

### Development Tools

Tools that integrate with development environments to support coding workflows and project planning.

- [Codex MCP Tool](https://github.com/x51xxx/codex-mcp-tool) — Connects IDE environments with the Codex CLI to help coding agents analyze and edit code within development workflows.
- [StacksFinder MCP](https://github.com/hoklims/stacksfinder-mcp) — Recommends and evaluates technology stacks based on project requirements to support development planning.
- [mcp-server-openai-bridge](https://github.com/jaspertvdm/mcp-server-openai-bridge) — Bridge that connects MCP environments with OpenAI models such as GPT-4 and GPT-4o.
- [mcp-server-ollama-bridge](https://github.com/jaspertvdm/mcp-server-ollama-bridge) — Bridge to run local LLM models through the Ollama environment.
- [mcp-server-gemini-bridge](https://github.com/jaspertvdm/mcp-server-gemini-bridge) — Bridge to access Google Gemini models through MCP.
- [Grok-MCP](https://github.com/merterbak/Grok-MCP) — MCP server that integrates xAI Grok models with agent tools and file capabilities.
- [browser-use-rs](https://github.com/BB-fat/browser-use-rs) — Lightweight browser automation server written in Rust with zero dependencies.  
- [mcp-server-browserbase](https://github.com/browserbase/mcp-server-browserbase) — Automates browser interactions (web navigation, data extraction) in the cloud.  
- [DOMShell](https://github.com/apireno/DOMShell) — Maps Chrome’s Accessibility Tree to a virtual filesystem, allowing browsing using filesystem commands (ls, cd).  
- [gomcp](https://github.com/lightpanda-io/gomcp) — Ultra-fast headless browser server written in Go (Lightpanda).  
- [iwdp-mcp](https://github.com/nnemirovsky/iwdp-mcp) — Supports iOS Safari debugging via ios-webkit-debug-proxy and full WebKit Inspector Protocol.  
- [chrome-mcp-secure](https://github.com/Pantheon-Security/chrome-mcp-secure) — Security-hardened Chrome automation with post-quantum encryption and memory scrubbing.  
- [pagemap](https://github.com/Retio-ai/Retio-pagemap) — Compresses large HTML content so AI agents can understand full pages using fewer tokens.
- [mcp-server-terminal](https://github.com/aybelatchane/mcp-server-terminal) — Works like Playwright for terminals; provides a Terminal State Tree representation for interacting with TUI/CLI applications.  
- [mcp-console-automation](https://github.com/ooples/mcp-console-automation) — Provides 40 AI-driven console automation tools including session management and background jobs.  
- [iterm-mcp](https://github.com/ferrislucas/iterm-mcp) — Gives access to iTerm, allowing AI agents to observe terminal activity and ask questions about the environment.  
- [persistproc](https://github.com/irskep/persistproc) — Controls long-running processes such as web servers, including start, stop, and log reading.  
- [augments-mcp-server](https://github.com/augmnt/augments-mcp-server) — Provides real-time access to documentation for 90+ frameworks, including React and Next.js.  
- [rust-docs-mcp-server](https://github.com/Govcraft/rust-docs-mcp-server) — Up-to-date Rust crates documentation with semantic search context.  
- [faf-mcp](https://github.com/Wolfe-Jam/faf-mcp) — Universal persistent project context (Project DNA) for tools like Cursor, VS Code, and Claude.  
- [RulesetMCP](https://github.com/n8daniels/RulesetMCP) — Queries project-specific rule files to keep AI grounded in coding standards.  
- [agent-utils-mcp](https://github.com/aparajithn/agent-utils-mcp) — Swiss-army-knife tool for JSON validation, regex testing, and Markdown conversion. 
- [stella-mcp](https://github.com/bradleylab/stella-mcp) — Toolset for reading, validating, and saving Stella system dynamics simulation models (.stmx files).  
- [networkx-mcp-server](https://github.com/Bright-L01/networkx-mcp-server) — Integrates NetworkX for graph analysis and visualization, including centrality algorithms and community detection tools.  
- [optuna-mcp](https://github.com/optuna/optuna-mcp) — Official Optuna integration for orchestrating hyperparameter optimization workflows with AI agents.  
- [fermat-mcp](https://github.com/abhiphile/fermat-mcp) — Unified server providing symbolic algebra (SymPy), numerical computing (NumPy), and data visualization (Matplotlib).
- [jupyter-notebook-mcp](https://github.com/jjsantos01/jupyter-notebook-mcp) — Enables AI assistants to directly interact with and control Jupyter Notebooks.  
- [MCPR](https://github.com/phisanti/MCPR) — Allows AI agents to participate in interactive coding sessions for the R programming language.  
- [jupyter-mcp-server](https://github.com/datalayer/jupyter-mcp-server) — Provides a Model Context Protocol server implementation for Jupyter environments.
- [homebrew-mcp](https://github.com/jeannier/homebrew-mcp) — Automation interface for installing, managing, and troubleshooting macOS Homebrew packages.
- [systemr-python](https://github.com/System-R-AI/systemr-python) — Provides tools for managing trading workflows, including risk evaluation, position sizing, and automated trading strategy support.  
- [metatrader-mcp-server](https://github.com/ariadng/metatrader-mcp-server) — Interface for integrating with the MetaTrader 5 platform to manage trading automation workflows.  
- [ccxt-mcp-server](https://github.com/doggybee/mcp-server-ccxt) — Integration for accessing real-time market data and managing trading operations across multiple cryptocurrency exchanges.
- [godot-mcp-pro](https://github.com/youichi-uda/godot-mcp-pro) — Provides advanced development tools for the Godot game engine, including scene editing, runtime debugging, scripting, and shader management features.  
- [better-godot-mcp](https://github.com/n24q02m/better-godot-mcp) — Enables structured interaction with the Godot 4.x engine, allowing management of physics systems, navigation, signals, and input mapping workflows.  
- [mcp-unity](https://github.com/CoderGamester/mcp-unity) — Interface for integrating with the Unity3D game engine to automate game development workflows and editor interactions.  
- [Unity-MCP](https://github.com/IvanMurzak/Unity-MCP) — MCP integration for the Unity game engine, enabling AI agents to interact with the Unity editor and runtime environment.
- [gis-mcp-server](https://github.com/matbel91765/gis-mcp-server) — Provides geospatial workflow tools including geocoding, routing, elevation, and spatial analysis. Supports formats such as Shapefile, GeoJSON, and GeoPackage.  
- [QGIS MCP](https://github.com/jjsantos01/qgis_mcp) — Integrates with QGIS Desktop to load GIS layers and manage projects through prompts.  
- [geoserver-mcp](https://github.com/mahdin75/geoserver-mcp) — Connects with the GeoServer REST API to manage geospatial datasets and map services.
- [tiktok-ads-mcp-server](https://github.com/AdsMCP/tiktok-ads-mcp-server) — Integrates with the TikTok Ads API to manage marketing campaigns and analyze performance metrics.  
- [google-ads-mcp-server](https://github.com/gomarble-ai/google-ads-mcp-server) — Provides integration with the Google Ads platform for accessing and managing advertising campaign data.  
- [facebook-ads-mcp-server](https://github.com/gomarble-ai/facebook-ads-mcp-server) — Enables programmatic access to Facebook Ads data and automates campaign management workflows.
- [Saga MCP](https://github.com/spranab/saga-mcp) — Project tracking system for AI agents supporting a Projects → Epics → Tasks hierarchy, task dependencies, and activity logging.  
- [PM Copilot](https://github.com/dkships/pm-copilot) — Generates prioritized product plans from support tickets and feature requests, helping with business metric–driven planning workflows.
- [Deep Research MCP](https://github.com/pminervini/deep-research-mcp) — MCP interface for executing detailed technical research tasks with web search, research workflows, and code interpreter integration.
- [SemanticAPI](https://github.com/peter-j-thompson/semanticapi-mcp) — Provides discovery tools to search capabilities across 700+ APIs, find endpoints, and set up integrations using natural language.
- [jira-mcp](https://github.com/nguyenvanduocit/jira-mcp) — A Go-based connector that helps agents interact with Jira for issue management, sprint planning, and workflow transitions.
- [mcp-atlassian](https://github.com/sooperset/mcp-atlassian) — Integrates with Atlassian platforms such as Confluence and Jira (Cloud/Server) to manage documentation, content creation, and issue workflows.
- [mcp-jira-server](https://github.com/tom28881/mcp-jira-server) — A feature-rich MCP server with 20+ specialized tools for Jira, including batch operations, attachment handling, and sprint management.
- [bugherd-mcp](https://github.com/Berckan/bugherd-mcp) — Provides integration with the BugHerd platform to track bugs, filter tasks, and access comments within development workflows.
- [yandex-tracker-mcp](https://github.com/aikts/yandex-tracker-mcp) — Integration for retrieving issues, queues, and user information from Yandex Tracker.
- [weblate-mcp](https://github.com/mmntm/weblate-mcp) — Integrates with the Weblate translation management system to manage projects, translation workflows, and format transformations.

---

### Email / Communication MCP

Tools that deal specifically with email, messaging, or communication platforms.

- [Gmail MCP](https://github.com/GongRzhe/Gmail-MCP-Server) — A Model Context Protocol (MCP) server for Gmail integration in Claude Desktop with auto authentication support.
- [Gmail Headless MCP](https://github.com/baryhuang/mcp-headless-gmail) — Remote hostable MCP server for sending/receiving Gmail messages without local credentials.
- [Instagram DM MCP](https://github.com/trypeggy/instagram_dm_mcp) — Send direct messages on Instagram through LLMs.
- [iMCP](https://github.com/loopwork-ai/iMCP) — macOS app MCP server for iMessage, Reminders, and other Apple services.
- [Intercom MCP](https://github.com/raoulbia-ai/mcp-server-for-intercom) — Retrieve and analyze customer support tickets from Intercom.
- [HubSpot MCP](https://github.com/buryhuang/mcp-hubspot) — Manage CRM contacts and companies directly through Claude chat.
- [LINE](https://github.com/amornpan/py-mcp-line) — Interact with LINE messaging platform.
- [Mailchimp MCP](https://github.com/AgentX-ai/mailchimp-mcp) — Read-only integration for Mailchimp APIs.
- [MailNet](https://github.com/Astroa7m/MailNet-MCP-Server) — Unified Gmail and Outlook MCP server.
- [Matrix](https://github.com/mjknowles/matrix-mcp-server) — Interact with Matrix communication servers.
- [mac-messages-mcp](https://github.com/carterlasalle/mac_messages_mcp) — Access iMessage conversations.
- [mcp-notify](https://github.com/aahl/mcp-notify) — Push notifications via Telegram, DingTalk, WeChat.
- [Resend MCP](https://github.com/Klavis-AI/klavis/tree/main/mcp_servers/resend) — Send transactional emails using Resend API.
- [SendGrid MCP](https://github.com/recepyavuz0/sendgrid-mcp-server) — Send and manage emails using SendGrid API.
- [Slack MCP](https://github.com/zencoderai/slack-mcp-server) — MCP server for Slack with stdio and HTTP transport support.
- [Telegram](https://github.com/chigwell/telegram-mcp) — Send and retrieve messages from Telegram.
- [Telegram Client](https://github.com/chaindead/telegram-mcp) — Manage dialogs, drafts, and user messages via Telegram API.
- [WhatsApp MCP Server](https://github.com/lharries/whatsapp-mcp) — Send messages and manage chats on WhatsApp.
- [Webex](https://github.com/Kashyap-AI-ML-Solutions/webex-messaging-mcp-server) — Access Cisco Webex messaging capabilities.
- [Zoom](https://github.com/Prathamesh0901/zoom-mcp-server/tree/main) — Create and manage Zoom meetings.
- [X (Twitter)](https://github.com/EnesCinr/twitter-mcp) — Post tweets and search Twitter data.
- [WayStation MCP](https://github.com/waystation-ai/mcp) — Connect AI agents to productivity platforms such as Notion, Slack, and Airtable.
- [mailchimp-mcp-server](https://github.com/damientilman/mailchimp-mcp-server) — Integrates with the Mailchimp Marketing API to manage campaigns, audiences, and marketing reports.
- [insta-mcp](https://github.com/arjun1194/insta-mcp) — Provides tools to interact with Instagram accounts, including accessing posts, user profiles, and engagement insights.  
- [facebook-mcp-server](https://github.com/HagaiHen/facebook-mcp-server) — Integrates with Facebook Pages to manage posts, comments, and engagement data.  
- [twitter-mcp](https://github.com/kunallunia/twitter-mcp) — Provides tools to access Twitter timelines, hashtags, and conversation streams.  
- [bluesky-social-mcp](https://github.com/gwbischof/bluesky-social-mcp) — MCP server for interacting with the Bluesky social network to access posts and activity streams.
- [freshdesk-mcp](https://github.com/effytech/freshdesk-mcp) — Connects with the Freshdesk support platform to automate ticket management, support workflows, and service operations.

---

### Image / Media MCP

Tools focused on image, video, or media processing and generation.

- [Image Generation MCP](https://github.com/GongRzhe/Image-Generation-MCP-Server) — Image generation using Replicate Flux model.
- [ImageSorcery MCP](https://github.com/sunriseapps/imagesorcery-mcp) — Computer vision-based image recognition and editing for AI assistants.
- [Intelligent Image Generator MCP](https://github.com/shinpr/mcp-image) — Turn casual prompts into professional-quality AI-generated images.
- [JSON2Video MCP](https://github.com/omergocmen/json2video-mcp-server) — Programmatically generate videos from JSON using the json2video API.
- [mcp-meme-sticky](https://github.com/nkapila6/mcp-meme-sticky) — Create memes and stickers for messaging platforms.
- [Meme MCP](https://github.com/lidorshimoni/meme-mcp) — Generate memes using AI through Imgflip API.
- [Pexels MCP](https://github.com/garylab/pexels-mcp-server) — Search and retrieve royalty-free images from Pexels API.
- [Placid MCP](https://github.com/felores/placid-mcp-server) — Generate marketing images and videos using Placid templates.
- [Transcribe](https://github.com/transcribe-app/mcp-transcribe) — Convert audio/video into text transcripts.
- [Video Editor](https://github.com/burningion/video-editing-mcp) — Add, edit, and search video content using Video Jungle APIs.
- [ZapCap](https://github.com/bogdan01m/zapcap-mcp-server) — Generate captions and B-roll suggestions using AI.
- [YouTube](https://github.com/Klavis-AI/klavis/tree/main/mcp_servers/youtube) — Retrieve and manage YouTube content.
- [YouTube DLP](https://github.com/AgentX-ai/youtube-dlp-server) — Extract video metadata, subtitles, and comments.
- [YouTube Video Summarizer](https://github.com/nabid-pf/youtube-video-summarizer-mcp) — Summarize long YouTube videos automatically.
- [Voice Status Report](https://github.com/tomekkorbak/voice-status-report-mcp-server) — Generate voice-based status reports using text-to-speech APIs.
- [VoiceMode](https://github.com/mbailey/voicemode) — Enable conversational voice interfaces using speech recognition and synthesis services.
- [imagen3-mcp](https://github.com/hamflx/imagen3-mcp) — Generate high-quality images using Google's Imagen API through MCP.
- [openai-gpt-image-mcp](https://github.com/SureScaleAI/openai-gpt-image-mcp) — Image generation and editing server powered by OpenAI image models.
- [studiomcphub](https://github.com/codex-curator/studiomcphub) — Creative AI toolkit with image generation, upscaling, background removal, and artwork tools.
- [comfy-pilot](https://github.com/ConstantineB6/comfy-pilot) — Control and run ComfyUI node-based image generation workflows from AI agents.
- [MeiGen-AI-Design-MCP](https://github.com/jau123/MeiGen-AI-Design-MCP) — AI design toolkit with a curated prompt library and image enhancement tools.
- [agent-media](https://github.com/yuvalsuede/agent-media) — Access multiple video and image generation models for media creation workflows.
- [mcp-alphabanana](https://github.com/tasopen/mcp-alphabanana) — Local image generation server using Google Gemini image models.
- [aseprite-mcp](https://github.com/diivi/aseprite-mcp) — Use AI agents to create and edit pixel art through the Aseprite API.
- [svgmaker-mcp](https://github.com/GenWaveLLC/svgmaker-mcp) — Generate and edit SVG graphics using natural language instructions.
- [pageshot-api](https://github.com/softvoyagers/pageshot-api) — Free API for capturing webpage screenshots, including dark mode and viewport options.
- [pyxel-mcp](https://github.com/kitao/pyxel-mcp) — Integrates with the Pyxel retro game engine to inspect sprites, capture screenshots, and analyze game audio.
- [ffmpeg-mcp](https://github.com/video-creator/ffmpeg-mcp) — Executes FFmpeg commands to automate local video search, editing, and media processing workflows.  
- [video-edit-mcp](https://github.com/Aditya2755/video-edit-mcp) — MCP server for advanced video editing operations such as trimming, merging, and adding overlays.  
- [atsurae](https://github.com/1000ri-jp/atsurae) — AI-powered video editing workflow supporting multi-layer compositing and FFmpeg-based rendering.  
- [exif-mcp](https://github.com/stass/exif-mcp) — Provides tools to inspect image metadata (EXIF, GPS, XMP) and organize or search image collections.  
- [topaz-mcp](https://github.com/TopazLabs/topaz-mcp) — MCP integration using the Topaz Labs API for AI image enhancement such as denoising and sharpening.  
- [youtube-uploader-mcp](https://github.com/anwerj/youtube-uploader-mcp) — Automates YouTube video upload workflows directly from MCP clients.  
- [fitness-influencer-mcp](https://github.com/MarceauSolutions/fitness-influencer-mcp) — Provides tools for video editing automation and media publishing workflows.
- [voice-mcp](https://github.com/mbailey/voice-mcp) — Supports real-time voice conversations with speech-to-text and text-to-speech capabilities using OpenAI and LiveKit integrations.
- [Kokoro TTS](https://github.com/mberg/kokoro-tts-mcp) — Converts text into audio (MP3) using Kokoro text-to-speech models, with support for local processing and cloud storage uploads.

---

### Infrastructure & Environment Understanding

Tools focused on analyzing and understanding existing infrastructure environments, including cloud resources, clusters, and Infrastructure-as-Code systems.

- [terraform-mcp-server](https://github.com/hashicorp/terraform-mcp-server) — Official MCP server for Terraform that analyzes Infrastructure-as-Code modules, plans, and configurations.
- [k8s-mcp-server](https://github.com/alexei-led/k8s-mcp-server) — Enables secure analysis of Kubernetes clusters using kubectl and Helm within a Docker environment.
- [portainer-mcp](https://github.com/portainer/portainer-mcp) — Provides natural language access to monitor and manage running containers and infrastructure through Portainer.
- [azure-resource-graph-mcp-server](https://github.com/hardik-id/azure-resource-graph-mcp-server) — Allows querying and exploring large-scale Azure infrastructure using Azure Resource Graph.

---

### API Integration & System Interoperability

Tools that enable AI agents to integrate with existing APIs and external systems.

- [openapi-mcp](https://github.com/ckanthony/openapi-mcp) — Generates MCP tools directly from existing OpenAPI documentation, allowing agents to interact with APIs automatically.
- [openapi-to-mcp](https://github.com/ouvreboite/openapi-to-mcp) — Converts APIs into MCP tools with support for OAuth2 authentication and secure integrations.
- [netskope-mcp](https://github.com/johnneerdael/netskope-mcp) — Provides access to information about private access environments and security components managed by Netskope.

---


### Multi-Agent Coordination & Delegation

Tools that enable multiple AI agents to collaborate, delegate tasks, and coordinate workflows.

- [outsource-mcp](https://github.com/gwbischof/outsource-mcp) — Allows one AI agent to delegate specific tasks to other specialized AI models such as OpenAI or Gemini.

---

### System Administration

Tools designed for Linux and server administration tasks.

- [webmin-mcp-server](https://github.com/gjenkins20/webmin-mcp-server) — Integrates with Webmin to manage Linux server services, users, storage, and system configurations.

---

### Task & Project Management Systems

Tools that integrate with task management and project workflow platforms.

- [kanboard-mcp](https://github.com/bivex/kanboard-mcp) — A Go-based server that converts natural language commands into Kanboard API actions.
- [better-notion-mcp](https://github.com/n24q02m/better-notion-mcp) — Markdown-first Notion integration with tiered documentation, designed to reduce token usage by up to ~77%.
- [mcp-orchestro](https://github.com/khaoss85/mcp-orchestro) — A Trello-like visual Kanban board for Claude Code with over 60 MCP tools for workflow management.
- [claudia](https://github.com/yuvalsuede/claudia) — AI-native task management system supporting hierarchical tasks, dependencies, and multi-agent coordination.
- [huly-mcp](https://github.com/dearlordylord/huly-mcp) — Integration for the Huly project management platform to query issues and update tasks.

---

### Workspace & Productivity Suite

Tools designed to improve everyday productivity by integrating with document systems, collaboration tools, and time tracking platforms.

- [Google-Workspace-MCP-Server](https://github.com/giuseppe-coco/Google-Workspace-MCP-Server) — Provides seamless interaction with Google Workspace services including Gmail, Google Drive, and Google Calendar.
- [quip-mcp](https://github.com/bug-breeder/quip-mcp) — Enables lifecycle management of Quip documents with features such as smart search and comment management.
- [UnMarkdown](https://github.com/UnMarkdown/mcp-server) — Converts Markdown content into professional formats suitable for platforms like Google Docs, Microsoft Word, and Slack.
- [toggl-mcp](https://github.com/louis030195/toggl-mcp) — Integrates with Toggl Track to provide time tracking capabilities for project billing and productivity monitoring.

---

### Scheduling & Calendar Integration

Tools that help manage scheduling, calendar events, and time-based workflows across different platforms.

- [temporal-cortex/mcp](https://github.com/temporal-cortex/mcp) — Middleware for scheduling and booking that integrates with Google Calendar, Outlook, and CalDAV, featuring two-phase commit booking and deterministic datetime resolution.
- [reclaim-mcp-server](https://github.com/universalamateur/reclaim-mcp-server) — Integrates with Reclaim.ai and provides 40 tools for managing tasks, habits, and focus time.
- [calendar-mcp](https://github.com/wyattjoh/calendar-mcp) — A specialized server for accessing and managing macOS Calendar events.

---

### Career & CRM Tools

Tools focused on career management, job search automation, and personal relationship management.

- [jobgpt-mcp-server](https://github.com/6figr-com/jobgpt-mcp-server) — Provides 34 tools for job search workflows, including tailored resume generation and job application tracking.
- [keepsake-mcp](https://github.com/nicolascroce/keepsake-mcp) — Personal CRM system with 42 tools for managing contacts, tracking interactions, and organizing notes.

---

### System Analysis & Diagramming

Tools for visualizing existing system logic, architecture, and workflows to improve understanding and documentation.

- [plantuml_web](https://github.com/2niuhe/plantuml_web) — Provides PlantUML syntax validation and diagram generation to visualize complex system architectures and workflows.
- [ai-vision-mcp](https://github.com/tan-yong-sheng/ai-vision-mcp) — Multimodal AI vision server that supports UI/UX evaluation, visual regression testing, and interface understanding.
- [screenpipe](https://github.com/mediar-ai/screenpipe) — Local-first system for capturing screen and audio data with semantic search and historical analysis capabilities.

---

### Developer Productivity & Automation

Tools designed to streamline developer workflows and expose automation tools that AI agents can interact with.

- [make-mcp-server](https://github.com/integromat/make-mcp-server) — Converts Make (Integromat) automation scenarios into AI agent-callable tools.
- [mcp-graphql-forge](https://github.com/UnitVectorY-Labs/mcp-graphql-forge) — Exposes curated GraphQL queries as modular MCP tools for structured data access.

---

### Project & Knowledge Management

Tools that support team collaboration, project coordination, and integration with documentation or knowledge base systems.

- [plane-mcp-server](https://github.com/kelvin6365/plane-mcp-server) — Enables AI agents to manage projects and issues within the Plane project management platform.
- [Yuque-MCP-Server](https://github.com/HenryHaoson/Yuque-MCP-Server) — Integrates with Yuque to manage documentation and interact with knowledge bases.
- [mcp-linear](https://github.com/tacticlaunch/mcp-linear) — Provides integration with the Linear project management system for managing issues and workflows.

---

### Observability Tools for MCP Servers

Tools that help monitor, trace, and analyze MCP servers and AI agent behavior for better debugging and system visibility.

- [OpenTelemetry](https://github.com/open-telemetry/opentelemetry-collector) (MCP) – Observability and telemetry data collection for MCP 
- [Inspector](https://github.com/modelcontextprotocol/inspector) – Debugging and observability tool for MCP servers
- [Grafana](https://github.com/grafana/grafana) (MCP) – Analytics and visualization platform for MCP observability data 
- [AgentOps](https://github.com/AgentOps-AI/agentops) – Monitor, trace, and debug AI agent executions with observability tools  
- [Netdata MCP](https://github.com/netdata/netdata/blob/master/src/web/mcp/README.md) – Discovery, exploration, reporting and root cause analysis using observability data 
- [langfuse-mcp (avivsinai)](https://github.com/avivsinai/langfuse-mcp) — Provides debugging tools for querying LLM application traces, analyzing exceptions, and inspecting sessions.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for information about contributing to this repository.

---

## Security

See [SECURITY.md](SECURITY.md) for reporting security vulnerabilities.

---

## Community

### GitHub Discussions

---

## License

This project is licensed under the  [**Apache License, Version 2.0**](LICENSE).
