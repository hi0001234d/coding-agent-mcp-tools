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
- [DuckDuckGo MCP Server](https://github.com/nickclyde/duckduckgo-mcp-server) – Private search engine integration for MCP workflows    
- [Sentry](https://github.com/getsentry/sentry) (MCP) – Real-time error tracking and performance monitoring  
- [OpenTelemetry](https://github.com/open-telemetry/opentelemetry-collector) (MCP) – Observability and telemetry data collection for MCP  
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

- [Inspector](https://github.com/modelcontextprotocol/inspector) – Debugging and observability tool for MCP servers  
- [Code Interpreter (MCP)](https://github.com/e2b-dev/code-interpreter) – Execute and analyze code in secure MCP environments  
- [SonarQube MCP](https://github.com/SonarSource/sonarqube-mcp-server) – Code quality and security analysis for MCP workflows
- [Sourcegraph Cody MCP](https://github.com/sourcegraph/cody) – AI-powered code search and codebase understanding tool  
- [Continue MCP](https://github.com/continuedev/continue) – Open-source AI coding assistant that understands large codebases
- [Nx MCP](https://github.com/nrwl/nx-console/blob/master/apps/nx-mcp) – Exposes Nx project graph and architecture insights to AI tools  
- [JetBrains MCP](https://www.jetbrains.com/help/idea/mcp-server.html) – Work on your code with JetBrains IDEs such as IntelliJ IDEA and PhpStorm  
- [Jellyfish MCP](https://github.com/Jellyfish-AI/jellyfish-mcp) – Gives AI agents context about engineering workflows and team allocations 
- [Rember](https://github.com/rember/rember-mcp) – Create spaced repetition flashcards in Rember to remember anything you learn in your chats  
- [Memalot](https://github.com/nfergu/memalot?tab=readme-ov-file#mcp-server) – Finds memory leaks in Python programs  
- [ProdE](https://github.com/CuriousBox-AI/ProdE-mcp) – Your 24/7 production engineer that preserves context across multiple codebases  

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

---

### Maintenance

Tools designed to support long-lived projects and ongoing software maintenance.

- [AWS Platform MCP](https://github.com/awslabs/mcp) – Manage AWS resources and services via MCP  
- [Kubernetes MCP](https://github.com/containers/kubernetes-mcp-server) – MCP server for Kubernetes cluster management  
- [Docker MCP](https://github.com/modelcontextprotocol/servers/tree/main/src/docker) – MCP integration for Docker container workflows  
- [Datadog MCP Server](https://github.com/winor30/mcp-server-datadog) – Observability and monitoring via Datadog MCP integration
- [GitGuardian MCP](https://github.com/GitGuardian/ggshield) – Detect secrets and security risks in repositories  
- [Codacy MCP](https://github.com/codacy) – Automated code quality and security analysis for repositories 
- [LaunchDarkly MCP](https://github.com/launchdarkly/mcp-server) – Feature flag platform enabling safe deployments and iteration  
- [Octopus Deploy MCP](https://github.com/OctopusDeploy/mcp-server) – Manage and inspect deployments and release pipelines  
- [Routine](https://github.com/routineco/mcp-server) – MCP server to interact with Routine: calendars, tasks, notes, etc.  
- [Roundtable](https://github.com/askbudi/roundtable) – Unified integration layer that bridges multiple AI coding assistants (Codex, Claude Code, Cursor, Gemini) through zero-configuration auto-discovery and enterprise-ready architecture

---

### Testing

Tools that assist with automated testing, validation, and QA workflows.

- [Playwright MCP](https://github.com/microsoft/playwright-mcp) – Browser automation and testing  
- [TestSprite](https://www.npmjs.com/package/@testsprite/testsprite-mcp) – End-to-end test automation framework  
- [MCP Server Cloudflare](https://github.com/cloudflare/mcp-server-cloudflare) – Cloudflare MCP server integration  
- [Inspector](https://github.com/modelcontextprotocol/inspector) – Debugging and observability tool for MCP servers  
- [Code Interpreter](https://github.com/e2b-dev/code-interpreter) – Execute and analyze code in secure environments
- [LambdaTest MCP](https://www.lambdatest.com/mcp) – Connect AI assistants with automated testing workflows  
- [Lippia MCP](https://github.com/Lippia-io/Lippia-MCP-Server/blob/main/getting-started.md) – Accelerates test automation using the Lippia testing framework  
- [Label Studio MCP](https://github.com/HumanSignal/label-studio-mcp-server) – Open-source data labeling platform for ML and AI workflows

---

### DevOps & Infrastructure

Tools that help manage environments, deployments, and infrastructure operations.

- [AWS Platform MCP](https://github.com/awslabs/mcp) – Manage AWS resources and services via MCP  
- [Kubernetes MCP](https://github.com/containers/kubernetes-mcp-server) – MCP server for Kubernetes cluster management  
- [Docker MCP](https://github.com/modelcontextprotocol/servers/tree/main/src/docker) – MCP integration for Docker container workflows  
- [Datadog MCP Server](https://github.com/winor30/mcp-server-datadog) – Observability and monitoring via Datadog MCP integration
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

---

### Cost Optimization

Tools that help track, analyze, and optimize development and infrastructure costs.

- [AWS Billing & Cost Management MCP](https://github.com/awslabs/mcp) – Manage AWS billing, cost insights, and resources via MCP
- [Momento MCP](https://github.com/momentohq/mcp-momento) – High-performance caching to improve performance and reduce infrastructure cost
- [Optuna](https://github.com/optuna/optuna-mcp) – Official MCP server enabling seamless orchestration of hyperparameter search and other optimization tasks with Optuna  
- [Ramp](https://github.com/ramp-public/ramp-mcp) – Interact with Ramp's Developer API to run analysis on your spend and gain insights leveraging LLMs 

---

### AI / Tooling

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

---

### Monitoring / Logs

Tools that help track application performance, logs, and system activity.

 [PostHog MCP](https://github.com/PostHog/mcp) – MCP server for accessing PostHog analytics, feature flags, and error tracking through AI tools :contentReference[oaicite:0]{index=0}  
- [Axiom MCP Server](https://github.com/axiomhq/mcp-server-axiom) – Query and analyze logs, traces, and observability data using MCP
- [Langfuse MCP](https://github.com/langfuse/mcp-server-langfuse) – Monitor and debug LLM applications with observability tools  
- [Logfire MCP](https://github.com/pydantic/logfire-mcp) – Access OpenTelemetry traces and metrics  
- [Mixpanel MCP](https://docs.mixpanel.com/docs/features/mcp) – Query product analytics data via natural language  
- [Microsoft Clarity MCP](https://github.com/microsoft/clarity-mcp-server) – Retrieve behavioral analytics insights  
- [PagerDuty](https://github.com/PagerDuty/pagerduty-mcp-server) – Interact with your PagerDuty account, manage incidents, services, schedules, and more directly from your MCP-enabled client  
- [Powerdrill](https://github.com/powerdrillai/powerdrill-mcp) – MCP server providing smart AI data analysis and insights  
- [Parallel Task MCP](https://github.com/parallel-web/task-mcp) – Initiate Deep Research and Batch Tasks 

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