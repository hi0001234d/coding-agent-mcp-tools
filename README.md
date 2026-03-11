# Coding Agents & MCP Tools for Maintenance and Debugging

This repository focuses on tools that support real-world software development workflows, particularly when working with existing projects, large codebases, and complex architectures. The goal is to highlight tools that help developers and AI coding agents understand, debug, maintain, and extend software systems effectively.

---

## Vision

Modern AI coding agents are becoming powerful at generating new code, but real software development rarely starts from scratch. Most development happens inside existing systems with large codebases, complex environments, and evolving architectures.

Developers working in these environments often need to understand the codebase, reason about system behavior, debug issues, and safely introduce changes. Because of this, effective AI tooling must support the same workflows developers already rely on.

This repository focuses on how coding agents and MCP-based tools can assist developers in these real-world scenarios. The curated tools help support workflows such as debugging, codebase understanding, documentation, maintenance, testing, and security.

The goal is to highlight tools that enable agent-assisted development for existing and long-lived software systems.

---

## Curated Tools

Tools in this repository are organized by common development workflows. Many of these tools can be combined to support complete development workflows, and the descriptions under each category briefly explain how they can be used together in practical scenarios.

---

### Debugging

Tools that help investigate failures, analyze logs, trace issues, and understand runtime behavior.

- [Sentry MCP](https://github.com/modelcontextprotocol/servers/tree/main/src/sentry) – Crash reporting and monitoring for MCP-based applications  
- [Sentry](https://github.com/getsentry/sentry) (MCP) – Real-time error tracking and performance monitoring  
- [OpenTelemetry](https://github.com/open-telemetry/opentelemetry-collector) (MCP) – Observability and telemetry data collection for MCP  
- [Inspector](https://github.com/modelcontextprotocol/inspector) – Debugging and observability tool for MCP servers
- [DuckDuckGo MCP Server](https://github.com/nickclyde/duckduckgo-mcp-server) – MCP search integration for private workflows    
- [Grafana](https://github.com/grafana/grafana) (MCP) – Analytics and visualization platform for MCP observability data 
- [AgentOps](https://github.com/AgentOps-AI/agentops) – Monitor, trace, and debug AI agent executions with observability tools  
- [Debugg.AI](https://debugg.ai) – AI-powered debugging and testing platform for analyzing application failures 
- [Memalot MCP](https://github.com/nfergu/memalot) – Finds memory leaks in Python programs via MCP  
- [Multiplayer MCP](https://www.multiplayer.app/docs/ai/mcp-server) – Analyze full-stack session recordings to reproduce and debug bugs  
- [Last9 MCP](https://github.com/last9/last9-mcp-server) – Bring logs, metrics, and traces from production into the local debugging environment  
- [Netdata MCP](https://github.com/netdata/netdata/blob/master/src/web/mcp/README.md) – Discovery, exploration, reporting and root cause analysis using observability data 
- [Raygun](https://github.com/MindscapeHQ/mcp-server-raygun) – Interact with your crash reporting and real-user monitoring data on your Raygun account  
- [proxymock](https://docs.speedscale.com/proxymock/reference/mcp/) – An MCP server that automatically generates tests and mocks by recording a live app  
- [ReportPortal](https://github.com/reportportal/reportportal-mcp-server) – Explore and analyze automated test results from ReportPortal using your favourite LLM 

---

### Codebase Understanding

Tools that help developers and AI agents analyze large repositories and understand complex systems.
 
- [Sourcegraph Cody MCP](https://github.com/sourcegraph/cody) – AI-powered code search and codebase understanding tool  
- [Continue MCP](https://github.com/continuedev/continue) – Open-source AI coding assistant that understands large codebases
- [Nx MCP](https://github.com/nrwl/nx-console/blob/master/apps/nx-mcp) – Exposes Nx project graph and architecture insights to AI tools  
- [JetBrains MCP](https://www.jetbrains.com/help/idea/mcp-server.html) – Work on your code with JetBrains IDEs such as IntelliJ IDEA and PhpStorm  
- [Jellyfish MCP](https://github.com/Jellyfish-AI/jellyfish-mcp) – Gives AI agents context about engineering workflows and team allocations 
- [Rember](https://github.com/rember/rember-mcp) – Create spaced repetition flashcards in Rember to remember anything you learn in your chats  
- [Memalot](https://github.com/nfergu/memalot?tab=readme-ov-file#mcp-server) – Finds memory leaks in Python programs  
- [ProdE](https://github.com/CuriousBox-AI/ProdE-mcp) – Your 24/7 production engineer that preserves context across multiple codebases  
- [code-assistant](https://github.com/stippi/code-assistant) – MCP coding assistant for exploring and editing code repositories with AI assistance.
- [code-context-provider-mcp](https://github.com/AB498/code-context-provider-mcp) – Extracts directory structures and code symbols using Tree-sitter for AI code analysis.
- [consult7](https://github.com/szeider/consult7) – Tool for analyzing large codebases and document collections using high-context AI models.
- [cplusplus-mcp](https://github.com/kandrwmrtn/cplusplus_mcp) – Semantic C++ code analysis using libclang AST parsing for better code navigation and understanding.
- [Files MCP](https://github.com/flesler/mcp-files) – Enables AI agents to search, locate, and modify code symbols across large codebases.
- [Git MCP](https://github.com/geropl/git-mcp-go) – Provides AI assistants access to local Git repositories for version control operations.
- [GitHub MCP Server](https://github.com/0xshariq/github-mcp-server) – Provides comprehensive Git repository management including commit history, branches, and repository operations.
- [GitHub Actions MCP](https://github.com/ko1ynnky/github-actions-mcp-server) – Enables interaction with GitHub Actions workflows and CI/CD pipelines.
- [GitHub Enterprise MCP](https://github.com/ddukbg/github-enterprise-mcp) – Provides MCP integration with GitHub Enterprise environments.
- [GitHub GraphQL MCP](https://github.com/QuentinCody/github-graphql-mcp-server) – Enables advanced GitHub data queries using GraphQL API.
- [Figma Context MCP](https://github.com/GLips/Figma-Context-MCP) – Provides direct access to Figma design file data for development workflows.
- [Figma MCP Server](https://github.com/paulvandermeijs/figma-mcp) – High-performance MCP server for reading and exporting Figma design files.
- [Figma to Flutter MCP](https://github.com/mhmzdev/figma-flutter-mcp) – Converts Figma design tokens into Flutter UI code.
- [GitHub Projects MCP](https://github.com/redducklabs/github-projects-mcp) — Manage GitHub Projects with full GraphQL API access including project items, fields, and milestones.
- [GitHub Repos Manager MCP Server](https://github.com/kurdin/github-repos-manager-mcp) — GitHub automation and repository management platform with token-based authentication and extensive API integration.
- [Java Decompiler MCP](https://github.com/idachev/mcp-javadc) — Decompile Java bytecode from class files or JAR archives into readable source code using the CFR decompiler.

---

### Documentation

Tools that help generate, maintain, or improve project documentation.
 
- [Xiyan MCP Server](https://github.com/XGenerationLab/xiyan_mcp_server) – AI-assisted data processing and database access (also used in AI/Tooling MCP & Data/Database MCP) 
- [DevDocs MCP](https://github.com/freeCodeCamp/devdocs) – Access and query developer documentation directly from MCP clients  
- [Context7 MCP](https://github.com/upstash/context7) – Provides structured documentation context for AI agents 
- [Microsoft Learn Docs MCP](https://github.com/microsoftdocs/mcp) – Structured access to Microsoft documentation for code generation and Q&A  
- [Notifly MCP](https://github.com/notifly-tech/notifly-mcp-server) – Provides trusted documentation and SDK examples for integrations  
- [PaddleOCR](https://paddlepaddle.github.io/PaddleOCR/latest/en/version3.x/deployment/mcp_server.html) – An MCP server that brings enterprise-grade OCR and document parsing capabilities to AI applications  
- [Probe.dev](https://docs.probe.dev/guides/mcp-integration) – Comprehensive media analysis and validation powered by Probe.dev. Hosted MCP server with FFprobe, MediaInfo, and Probe Report analysis capabilities  
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

---

### Screenshot / Visualization

Tools that help capture screenshots, generate visuals, and analyze images or videos for AI agents and MCP workflows.

- [ScreenshotMCP](https://github.com/upnorthmedia/ScreenshotMCP/) – Full-page and element screenshot capture for MCP workflows and AI agents.
- [ScreenshotOne](https://github.com/screenshotone/mcp/) – Render high-quality website screenshots for MCP servers and AI agent automation workflows.
- [VisionAgent MCP](https://github.com/landing-ai/vision-agent-mcp) – MCP server that enables AI agents to analyze and reason over images, videos, and documents.
- [WaveSpeed](https://github.com/WaveSpeedAI/mcp-server) – Image and video generation engine for AI agents and MCP-based automation workflows.
- [VideoDB Director](https://github.com/video-db/agent-toolkit/tree/main/modelcontextprotocol) – AI-powered video workflow tool for MCP agents, supporting video editing, search, and highlight generation.
- [AntV Chart MCP](https://github.com/antvis/mcp-server-chart) – MCP server for generating and interacting with charts using AntV visualization tools 
- [BrowserLoop](https://github.com/mattiasw/browserloop) – Capture full-page and element screenshots of websites using Playwright.
- [Code Screenshot Generator](https://github.com/MoussaabBadla/code-screenshot-mcp) – Generates professional syntax-highlighted screenshots of source code with themes and git diff visualization.
- [ECharts MCP](https://github.com/hustcc/mcp-echarts) – Dynamic chart and visualization generation using Apache ECharts through MCP.
- [DaVinci Resolve MCP](https://github.com/samuelgursky/davinci-resolve-mcp) – Provides AI-driven automation and workflows for video editing and media management in DaVinci Resolve.
- [Fal MCP](https://github.com/raveenb/fal-mcp-server) – Generate images, videos, and audio using AI models through MCP.
- [JavaFX MCP](https://github.com/quarkiverse/quarkus-mcp-servers/tree/main/jfx) — Enables AI assistants to create visual drawings and graphical content using a JavaFX canvas environment.

---

### Maintenance

Tools designed to support long-lived projects and ongoing software maintenance.
   
- [GitGuardian MCP](https://github.com/GitGuardian/ggshield) – Detect secrets and security risks in repositories  
- [Codacy MCP](https://github.com/codacy) – Automated code quality and security analysis for repositories 
- [LaunchDarkly MCP](https://github.com/launchdarkly/mcp-server) – Feature flag platform enabling safe deployments and iteration  
- [Octopus Deploy MCP](https://github.com/OctopusDeploy/mcp-server) – Manage and inspect deployments and release pipelines  
- [Routine](https://github.com/routineco/mcp-server) – MCP server to interact with Routine: calendars, tasks, notes, etc.  
- [Roundtable](https://github.com/askbudi/roundtable) – Unified integration layer that bridges multiple AI coding assistants (Codex, Claude Code, Cursor, Gemini) through zero-configuration auto-discovery and enterprise-ready architecture
- [DesktopCommander MCP](https://github.com/wonderwhy-er/DesktopCommanderMCP) – Allows AI to manage files, run terminal commands, and connect to remote servers.
- [Fast Filesystem MCP](https://github.com/efforthye/fast-filesystem-mcp) – Advanced filesystem operations including fast reading, writing, and large file handling.
- [Goal Story MCP](https://github.com/hichana/goalstory-mcp) — Goal tracking and visualization platform designed for monitoring personal and professional objectives.
- [itemit MCP](https://github.com/umin-ai/itemit-mcp) — Asset tracking and inventory monitoring platform used for managing equipment and organizational resources.

---

### Testing

Tools that assist with automated testing, validation, and QA workflows.

- [Playwright MCP](https://github.com/microsoft/playwright-mcp) – Browser automation and testing  
- [TestSprite](https://www.npmjs.com/package/@testsprite/testsprite-mcp) – End-to-end test automation framework  
- [MCP Server Cloudflare](https://github.com/cloudflare/mcp-server-cloudflare) – Cloudflare MCP server integration    
- [Code Interpreter](https://github.com/e2b-dev/code-interpreter) – Execute and analyze code in secure environments
- [LambdaTest MCP](https://www.lambdatest.com/mcp) – Connect AI assistants with automated testing workflows  
- [Lippia MCP](https://github.com/Lippia-io/Lippia-MCP-Server/blob/main/getting-started.md) – Accelerates test automation using the Lippia testing framework  
- [Label Studio MCP](https://github.com/HumanSignal/label-studio-mcp-server) – Open-source data labeling platform for ML and AI workflows
- [Console Automation MCP](https://github.com/ooples/mcp-console-automation) – Terminal automation system supporting SSH sessions, testing, monitoring, and background jobs.
- [JMeter MCP](https://github.com/QAInsights/jmeter-mcp-server) — Run performance and load testing using Apache JMeter through MCP-based tools.
- [Great Expectations MCP (gx-mcp-server)](https://github.com/davidf9999/gx-mcp-server) — Exposes data validation and data quality testing capabilities through MCP tools.

---

### DevOps & Infrastructure

Tools that help manage environments, deployments, and infrastructure operations.

- [AWS Platform MCP](https://github.com/awslabs/mcp) – Manage AWS resources and services via MCP  
- [Kubernetes MCP](https://github.com/containers/kubernetes-mcp-server) – MCP server for Kubernetes cluster management  
- [Docker MCP](https://github.com/modelcontextprotocol/servers/tree/main/src/docker) – MCP integration for Docker container workflows  
- [Cloudflare MCP](https://github.com/cloudflare/mcp-server-cloudflare) – MCP server for interacting with Cloudflare APIs and infrastructure  
- [Jenkins MCP](https://plugins.jenkins.io/mcp-server/) – Manage builds, retrieve logs, and interact with CI/CD pipelines  
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
- [Deploy MCP](https://github.com/alexpota/deploy-mcp) – Deployment tracking tool with status monitoring and deployment insights.
- [EdgeOne Pages MCP](https://github.com/TencentEdgeOne/edgeone-pages-mcp) – Deploy HTML pages and obtain publicly accessible URLs using EdgeOne Pages services.
- [DataWorks MCP](https://github.com/aliyun/alibabacloud-dataworks-mcp-server) – Enables interaction with Alibaba Cloud DataWorks API for data platform operations.
- [Fleet MCP](https://github.com/SimplyMinimal/fleet-mcp) – Device management and security monitoring platform with vulnerability tracking and policy management.
- [Dagster MCP](https://github.com/dagster-io/dagster/tree/master/python_modules/libraries/dagster-dg-cli) – MCP server that helps create and manage data pipelines using Dagster.
- [Cronlytic MCP](https://github.com/Cronlytic/cronlytic-mcp-server) – Manage serverless cron jobs including creation, scheduling, and monitoring.
- [ESP MCP](https://github.com/horw/esp-mcp) – Integrates ESP-IDF development commands for building and flashing firmware to ESP devices.
- [Fabric MCP](https://github.com/adapoet/fabric-mcp-server) – Integrates Fabric patterns with AI tools for automated task execution.
- [Fabric Real-Time Intelligence MCP](https://github.com/Microsoft/fabric-rti-mcp) – MCP server for working with Microsoft Fabric event streams and data exploration tools.
- [Drupal MCP](https://github.com/Omedia/mcp-server-drupal) – Integration for interacting with Drupal CMS using MCP.
- [EdgeOne Pages MCP](https://github.com/TencentEdgeOne/edgeone-pages-mcp) – Deploy static HTML pages to EdgeOne hosting and generate public URLs.
- [Helm Chart CLI MCP](https://github.com/jeff-nasseri/helm-chart-cli-mcp) — Enables AI assistants to interact with Helm package manager for Kubernetes including chart installation and repository management.
- [Jenkins MCP Server](https://github.com/jasonkylelol/jenkins-mcp-server) — Integration with Jenkins for creating and managing automation tasks and CI/CD pipelines.
- [k8s Multicluster MCP Server](https://github.com/razvanmacovei/k8s-multicluster-mcp) — Manage and interact with multiple Kubernetes clusters simultaneously using MCP tools.
- [Kafka MCP Server](https://github.com/tuannvm/kafka-mcp-server) — MCP integration for interacting with Apache Kafka clusters including topics, messages, and consumer management.
- [Kafka Schema Registry MCP Server](https://github.com/aywengo/kafka-schema-reg-mcp) — Enterprise schema management for Kafka Schema Registry with advanced tooling and security features.

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
- [Bybit MCP](https://github.com/ethancod1ng/bybit-mcp-server) – Integrates AI assistants with Bybit cryptocurrency exchange APIs, enabling automated trading, market data access, and account management  
- [crypto-feargreed-mcp](https://github.com/kukapay/crypto-feargreed-mcp) – Provides real-time and historical Crypto Fear & Greed Index data  
- [crypto-indicators-mcp](https://github.com/kukapay/crypto-indicators-mcp) – Provides a range of cryptocurrency technical analysis indicators and strategies  
- [crypto-sentiment-mcp](https://github.com/kukapay/crypto-sentiment-mcp) – Delivers cryptocurrency sentiment analysis to AI agents  
- [cryptopanic-mcp-server](https://github.com/kukapay/cryptopanic-mcp-server) – Provides latest cryptocurrency news to AI agents, powered by CryptoPanic  
- [Domain Tools MCP](https://github.com/deshabhishek007/domain-tools-mcp-server) – Domain analysis tools including WHOIS lookup, DNS records, and DNS health checks.
- [FPE Demo MCP](https://github.com/Horizon-Digital-Engineering/fpe-demo-mcp) – Demonstrates format-preserving encryption workflows for secure data handling.
- [Keycloak MCP Server](https://github.com/idoyudha/mcp-keycloak) — Identity and access management integration for managing users, roles, and authentication workflows.
- [Keycloak MCP (Model Context Protocol)](https://github.com/ChristophEnglisch/keycloak-model-context-protocol) — Provides natural language interaction with Keycloak identity management systems.
- [Keycloak MCP Server (Advanced)](https://github.com/sshaaf/keycloak-mcp-server) — Comprehensive Keycloak management including realms, clients, roles, and authentication providers.
- [Hashing MCP Server](https://github.com/kanad13/MCP-Server-for-Hashing) — Cryptographic hashing tools supporting SHA256, MD5, and other algorithms for data integrity verification.

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
- [Pinecone](https://github.com/pinecone-io/pinecone-mcp) – Pinecone's developer MCP Server assists developers in searching documentation and managing data within their development environment  
- [Pinecone Assistant](https://github.com/pinecone-io/assistant-mcp) – Retrieves context from your Pinecone Assistant knowledge base  
- [Qdrant](https://github.com/qdrant/mcp-server-qdrant/) – Implement semantic memory layer on top of the Qdrant vector search engine  
- [Rill Data](https://docs.rilldata.com/explore/mcp) – Interact with Rill Data to query and analyze your data  
- [Prisma](https://www.prisma.io/docs/postgres/integrations/mcp-server) – Create and manage Prisma Postgres databases 
- [Airtable](https://github.com/domdomegg/airtable-mcp-server) – Read and write access to Airtable databases with schema inspection  
- [ArangoDB](https://github.com/ravenwits/mcp-server-arangodb) – MCP server providing database interaction capabilities  
- [ArangoDB Graph](https://github.com/PCfVW/mcp-arangodb-async) – Async-first Python architecture for ArangoDB graphs and analytics  
- [BigQuery](https://github.com/LucasHild/mcp-server-bigquery) – Enables LLMs to inspect database schemas and execute queries  
- [Databricks MCP](https://github.com/JordiNeil/mcp-databricks-server) – Allows LLMs to run SQL queries, list and get details of job executions in a Databricks account  
- [CockroachDB](https://github.com/amineelkouhen/mcp-cockroachdb) – MCP server enabling AI agents and LLMs to manage, monitor, and query CockroachDB using natural language  
- [Databricks Genie MCP](https://github.com/yashshingvi/databricks-genie-MCP) – Connects to Databricks Genie, enabling natural language queries, SQL execution, and interactions with Databricks agents  
- [Databricks Smart SQL MCP](https://github.com/RafaelCartenet/mcp-databricks-server) – Perform smart and efficient SQL queries using Databricks Unity Catalog metadata  
- [DBHub MCP](https://github.com/bytebase/dbhub/) – Universal database MCP server connecting to MySQL, MariaDB, PostgreSQL, and SQL Server  
- [DataWorks MCP](https://github.com/aliyun/alibabacloud-dataworks-mcp-server) – Allows AI to interact with Alibaba Cloud DataWorks Open API 
- [CockroachDB MCP](https://github.com/viragtripathi/cockroachdb-mcp-server) – Full-featured MCP implementation built with FastAPI and CockroachDB; supports schema bootstrapping, JSONB storage, LLM-ready CLI, and optional /debug endpoints
- [DevDb](https://github.com/damms005/devdb-vscode) – IDE-based MCP server allowing direct connection to multiple relational databases for querying and management.
- [Druid MCP](https://github.com/iunera/druid-mcp-server) – MCP server for Apache Druid clusters providing data analytics tools and cluster management features.
- [DynamoDB Toolbox MCP](https://www.dynamodbtoolbox.com/docs/databases/actions/mcp-toolkit) – Natural language interaction layer for DynamoDB using defined schemas and access patterns.  
- [Elasticsearch MCP](https://github.com/cr7258/elasticsearch-mcp-server) – Enables AI assistants to interact with Elasticsearch clusters for search and analytics.
- [D365FO MCP](https://github.com/mafzaal/d365fo-client) – Connects to Microsoft Dynamics 365 Finance & Operations APIs for data access and management.
- [Firebase MCP](https://github.com/gannonh/firebase-mcp) – Enables interaction with Firebase Authentication, Firestore, and Storage services.
- [Contentful MCP ](https://github.com/ivo-toby/contentful-mcp) – Manage and update content stored in Contentful CMS spaces.
- [Elasticsearch MCP ](https://github.com/cr7258/elasticsearch-mcp-server) – MCP integration enabling AI assistants to interact with Elasticsearch clusters.
- [InfluxDB MCP Server](https://github.com/idoru/influxdb-mcp-server) — Enables querying and managing time-series data stored in InfluxDB databases.
- [JDBC MCP Server](https://github.com/quarkiverse/quarkus-mcp-servers/tree/main/jdbc) — Universal database connectivity supporting MySQL, PostgreSQL, SQLite, SQL Server, Oracle, and other JDBC-compatible databases.

---

### Cost Optimization

Tools that help track, analyze, and optimize development and infrastructure costs.

- [AWS Billing & Cost Management MCP](https://github.com/awslabs/mcp) – Manage AWS billing, cost insights, and resources via MCP
- [Momento MCP](https://github.com/momentohq/mcp-momento) – High-performance caching to improve performance and reduce infrastructure cost
- [Optuna](https://github.com/optuna/optuna-mcp) – Official MCP server enabling seamless orchestration of hyperparameter search and other optimization tasks with Optuna  
- [Ramp](https://github.com/ramp-public/ramp-mcp) – Interact with Ramp's Developer API to run analysis on your spend and gain insights leveraging LLMs 

---

### AI Agent Infrastructure

Tools that help connect AI models, agents, and developer tooling for faster workflows.

- [MCP Memory Service](https://github.com/doobidoo/mcp-memory-service) – Persistent memory service for MCP-based AI agents  
- [MCP Local RAG](https://github.com/nkapila6/mcp-local-rag) – Local Retrieval-Augmented Generation (RAG) system for MCP workflows
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
- [Ableton Live](https://github.com/Simon-Kansara/ableton-live-mcp-server) – MCP server to control Ableton Live  
- [Actor Critic Thinking](https://github.com/aquarius-wing/actor-critic-thinking-mcp) – Actor-critic thinking for performance evaluation
- [Agentic Framework](https://github.com/Piotr1215/mcp-agentic-framework) – Multi-agent collaboration framework enabling agents to work together on complex tasks  
- [AI Tasks](https://github.com/jbrinkman/valkey-ai-tasks) – Let the AI manage complex plans with integrated task management tools
- [Chroma MCP](https://github.com/privetin/chroma) – Vector database server for semantic document search and metadata filtering  
- [ChatMCP](https://github.com/AI-QL/chat-mcp) – Cross-platform GUI for interacting with MCP servers across multiple LLMs  
- [ChatSum MCP](https://github.com/mcpso/mcp-server-chatsum) – Summarize and query chat messages using LLMs  
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
- [CV Forge](https://github.com/thechandanbhagat/cv-forge) – MCP server that analyzes job descriptions and generates matching CV content.
- [Deep Research](https://github.com/reading-plus-ai/mcp-server-deep-research) – Automated research exploration tool that generates structured reports from multiple sources.
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

---

### Monitoring / Logs

Tools that help track application performance, logs, and system activity.

- [PostHog MCP](https://github.com/PostHog/mcp) – MCP server for accessing PostHog analytics, feature flags, and error tracking through AI tools :contentReference[oaicite:0]{index=0}  
- [Axiom MCP](https://github.com/axiomhq/mcp-server-axiom) – Query and analyze logs, traces, and observability data using MCP
- [Langfuse MCP](https://github.com/langfuse/mcp-server-langfuse) – Monitor and debug LLM applications with observability tools  
- [Datadog MCP](https://github.com/winor30/mcp-server-datadog) – Observability and monitoring via Datadog MCP integration
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
- [FlightRadar24 MCP](https://github.com/sunsetcoder/flightradar24-mcp-server) – Provides real-time aircraft tracking and flight information.
- [Graylog MCP Server](https://github.com/Pranavj17/mcp-server-graylog) — Enables AI assistants to query and analyze logs stored in Graylog monitoring systems.
- [Kibana MCP Server](https://github.com/TocharianOU/mcp-server-kibana.git) — Allows monitoring and log analysis through integration with Kibana dashboards.

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

---

### Utility

Tools that help simplify and automate utility tasks in development workflows.

- [Calculator MCP](https://github.com/githejie/mcp-server-calculator) – Enables LLMs to perform precise numerical calculations. 
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
- [Computer Control MCP](https://github.com/AB498/computer-control-mcp) – Enables AI assistants to control mouse, keyboard, and perform OCR-based interactions on a computer.
- [Computer Use MCP](https://github.com/domdomegg/computer-use-mcp) – Allows automated desktop interaction including screen capture, keyboard input, and mouse control.
- [Remote macOS Computer Use](https://github.com/baryhuang/mcp-remote-macos-use) – Provides remote macOS system control for AI agents.
- [Discord MCP](https://github.com/v-3/discordmcp) – Enables AI assistants to interact with Discord servers and channels through a bot.
- [Discord MCP (Alternative)](https://github.com/SaseQ/discord-mcp) – Another implementation providing Discord integration with extended functionality.
- [Discord MCP (Klavis)](https://github.com/Klavis-AI/klavis/tree/main/mcp_servers/discord) – MCP server enabling Discord API integration for AI assistants.
- [Discourse MCP](https://github.com/AshDevFr/discourse-mcp-server) – Search and retrieve posts from Discourse forums.
- [Ghost MCP](https://github.com/MFYDev/ghost-mcp) – MCP server enabling interaction with Ghost CMS content.
- [JSON MCP Server](https://github.com/GongRzhe/JSON-MCP-Server) — Advanced JSON data processing server with support for JSONPath queries and structured operations.
- [JSON MCP Filter](https://github.com/kehvinbehvin/json-mcp-filter) — JSON schema generation and filtering tools optimized for extracting relevant structured data.
- [JSON to Excel MCP](https://github.com/he-yang/json-to-excel-mcp) — Converts JSON datasets into CSV or Excel compatible formats for data analysis.
- [it-tools MCP](https://github.com/wrenchpilot/it-tools-mcp) — Provides a collection of developer utilities including encoding, decoding, and format conversion tools.

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

---

### Email / Communication MCP

Tools that deal specifically with email, messaging, or communication platforms.

- [Gmail MCP](https://github.com/GongRzhe/Gmail-MCP-Server) — A Model Context Protocol (MCP) server for Gmail integration in Claude Desktop with auto authentication support.
- [Gmail MCP (Simple)](https://github.com/Ayush-k-Shukla/gmail-mcp-server) — Simple MCP server for Gmail with basic operations via OAuth2.0.
- [Gmail Headless MCP](https://github.com/baryhuang/mcp-headless-gmail) — Remote hostable MCP server for sending/receiving Gmail messages without local credentials.
- [Gmail MCP (Google Email API)](https://github.com/gangradeamitesh/mcp-google-email) — Gmail service implementation providing full sending, receiving, and management via Gmail API.
- [Instagram DM MCP](https://github.com/trypeggy/instagram_dm_mcp) — Send direct messages on Instagram through LLMs.
- [iMCP](https://github.com/loopwork-ai/iMCP) — macOS app MCP server for iMessage, Reminders, and other Apple services.
- [Intercom MCP](https://github.com/raoulbia-ai/mcp-server-for-intercom) — Retrieve and analyze customer support tickets from Intercom.
- [HubSpot MCP](https://github.com/buryhuang/mcp-hubspot) — Manage CRM contacts and companies directly through Claude chat.

---

### Image / Media MCP

Tools focused on image, video, or media processing and generation.

- [Image Generation MCP](https://github.com/GongRzhe/Image-Generation-MCP-Server) — Image generation using Replicate Flux model.
- [ImageSorcery MCP](https://github.com/sunriseapps/imagesorcery-mcp) — Computer vision-based image recognition and editing for AI assistants.
- [Intelligent Image Generator MCP](https://github.com/shinpr/mcp-image) — Turn casual prompts into professional-quality AI-generated images.
- [JSON2Video MCP](https://github.com/omergocmen/json2video-mcp-server) — Programmatically generate videos from JSON using the json2video API.

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