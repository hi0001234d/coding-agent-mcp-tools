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

- [AgentOps](https://github.com/AgentOps-AI/agentops-mcp) – Observability and tracing for debugging AI agents  
- [Arize Phoenix](https://github.com/search?q=Arize+Phoenix) – LLM observability and trace inspection  
- [Axiom](https://github.com/search?q=Axiom+logs) – Query and analyze logs and traces  
- [Comet Opik](https://github.com/search?q=Comet+Opik) – Analyze LLM logs, prompts, telemetry  
- [Chrome DevTools MCP](https://github.com/search?q=Chrome+DevTools+MCP) – Debug web pages with runtime insights  
- [BrowserStack](https://github.com/search?q=BrowserStack) – Debug tests, accessibility testing  
- [CircleCI](https://github.com/search?q=CircleCI) – Fix build failures  
- [Buildkite](https://github.com/search?q=Buildkite) – Access pipeline builds and test logs  
- [Codacy](https://github.com/search?q=Codacy) – Code quality issues and vulnerability insights  
- [CodeLogic](https://github.com/search?q=CodeLogic) – Understand code dependencies for debugging
- [Dynatrace](https://github.com/search?q=dynatrace) – Real-time observability and monitoring platform  
- [Debugg.AI](https://github.com/search?q=debugg.ai) – AI-managed end-to-end testing agents  
- [Contrast Security](https://github.com/search?q=contrast+security) – Vulnerability insights directly into coding agents  
- [Cycode](https://github.com/search?q=cycode) – Security scanning across development lifecycle  
- [Endor Labs](https://github.com/search?q=endor+labs) – Scan and fix vulnerabilities and secret leaks  
- [Fluid Attacks](https://github.com/search?q=fluid+attacks) – Vulnerability management and security insights 
- [Logfire MCP Server](https://github.com/search?q=logfire+mcp+server) – Access traces, logs, and telemetry for debugging applications  
- [Metoro MCP Server](https://github.com/search?q=metoro+mcp+server) – Query Kubernetes environments to diagnose production issues  
- [Powerdrill MCP Server](https://github.com/search?q=powerdrill+mcp+server) – Analyze datasets and system metrics with AI assistance  

---

### Codebase Understanding

Tools that help developers and AI agents analyze large repositories and understand complex systems.

- [Claude Context](https://github.com/search?q=Claude+Context) – Bring entire codebase as context to Claude  
- [CodeLogic](https://github.com/search?q=CodeLogic) – Graph software architecture dependencies  
- [BuiltWith](https://github.com/search?q=BuiltWith) – Identify technology stack of websites  
- [AtomGit](https://github.com/search?q=AtomGit) – Repository integration for PRs, issues, branches  
- [Atlassian MCP](https://github.com/search?q=Atlassian+MCP) – Access Jira and Confluence project data  
- [Archbee](https://github.com/search?q=Archbee) – Knowledge and documentation system  
- [Anytype](https://github.com/search?q=Anytype) – Local wiki knowledge organization
- [Construe](https://github.com/search?q=construe+obsidian) – Obsidian vault context management with chunking and filtering  
- [Context Templates](https://github.com/search?q=context+templates+ai) – Reusable prompt and workflow templates  
- [Detailer](https://github.com/search?q=detailer+github+documentation) – AI-powered documentation for GitHub repositories  
- [DevExpress Documentation MCP](https://github.com/search?q=devexpress+documentation+mcp) – Access large documentation datasets  
- [Figma MCP Server](https://github.com/search?q=figma+mcp+server) – Bring design context into code workflows 
- [GitHub MCP Server](https://github.com/github) – Access repositories, issues, and pull requests  
- [GitLab MCP Server](https://github.com/gitlabhq) – Explore GitLab repositories and projects  
- [Gitea MCP Server](https://github.com/go-gitea/gitea) – Interact with self-hosted Git repositories  
- [Neo4j MCP Server](https://github.com/neo4j) – Explore graph-based code and knowledge structures  
- [Neo4j Agent Memory MCP](https://github.com/search?q=neo4j+agent+memory+mcp) – Knowledge graph memory for AI agents 

---

### Documentation

Tools that help generate, maintain, or improve project documentation.

- [Archbee](https://github.com/search?q=Archbee) – Documentation platform with AI assistance  
- [Clix MCP Server](https://github.com/search?q=Clix+MCP+Server) – Trusted documentation and SDK examples  
- [Cloudinary MCP](https://github.com/search?q=Cloudinary+MCP) – Media and asset documentation context  
- [Archbee AI](https://github.com/search?q=Archbee+AI) – Documentation knowledge base 
- [Detailer](https://github.com/search?q=detailer+github+documentation) – Generate documentation for repositories  
- [DevExpress Documentation MCP](https://github.com/search?q=devexpress+documentation+mcp) – Access 300k+ documentation topics  
- [DeepL](https://github.com/search?q=deepl+translator) – Translate and rewrite documentation content  
- [Datawrapper MCP](https://github.com/search?q=datawrapper+mcp) – Generate charts and visual documentation 
- [Microsoft Learn Docs MCP Server](https://github.com/MicrosoftDocs) – Structured Microsoft documentation access  
- [Langfuse MCP Server](https://github.com/langfuse/langfuse) – Prompt management and evaluation for AI apps  
- [Notifly MCP Server](https://github.com/search?q=notifly+mcp+server) – Access SDK examples and documentation resources  

---

### Maintenance

Tools designed to support long-lived projects and ongoing software maintenance.

- [ConfigCat](https://github.com/search?q=ConfigCat) – Feature flag management and configuration  
- [Codacy](https://github.com/search?q=Codacy) – Maintain code quality and coverage  
- [Buildable](https://github.com/search?q=Buildable) – AI-assisted project task tracking  
- [Boost.space](https://github.com/search?q=Boost.space) – Automated business data integration  
- [Algolia MCP](https://github.com/search?q=Algolia+MCP) – Manage search indexes  
- [Cloudinary](https://github.com/search?q=Cloudinary) – Media management and optimization  
- [Chiki StudIO](https://github.com/search?q=Chiki+StudIO) – Create configurable MCP servers
- [DevCycle](https://github.com/search?q=devcycle) – Feature flag management  
- [Convex](https://github.com/search?q=convex+backend) – Query and introspect deployed applications  
- [Defang](https://github.com/search?q=defang+cloud) – Cloud deployment platform  
- [Edgee](https://github.com/search?q=edgee) – Deploy and manage edge components  
- [Fireproof](https://github.com/search?q=fireproof+database) – Immutable ledger database  
- [Dolt](https://github.com/search?q=dolt+database) – Version-controlled SQL database
- [GitGuardian MCP Server](https://github.com/gitguardian) – Scan repositories for secrets and leaked credentials  
- [Mobb MCP Server](https://github.com/mobb-dev) – Automated vulnerability remediation for AI-generated code  
- [Optuna MCP Server](https://github.com/optuna/optuna) – Manage and optimize ML training pipelines 

---

### Testing

Tools that assist with automated testing, validation, and QA workflows.

- [AltTester](https://github.com/search?q=AltTester) – Game test automation for Unity/Unreal  
- [Appium MCP Server](https://github.com/search?q=Appium+MCP+Server) – Mobile test automation  
- [BrowserStack](https://github.com/search?q=BrowserStack) – Cross-device testing platform  
- [CircleCI](https://github.com/search?q=CircleCI) – CI test execution  
- [Buildkite](https://github.com/search?q=Buildkite) – CI pipelines and tests  
- [CloudBees CI](https://github.com/search?q=CloudBees+CI) – Jenkins-based CI platform  
- [APIMatic MCP](https://github.com/search?q=APIMatic+MCP) – Validate OpenAPI specifications
- [Debugg.AI](https://github.com/search?q=debugg.ai) – End-to-end AI testing agents  
- [EduBase](https://github.com/search?q=edubase) – Testing and exam management platform  
- [DeployHQ](https://github.com/search?q=deployhq) – Deployment and release monitoring for testing workflows
- [LambdaTest MCP Server](https://github.com/search?q=lambdatest+mcp+server) – AI-powered testing workflows and automation  
- [Playwright MCP Server](https://github.com/microsoft/playwright) – Browser automation and testing  
- [Lippia MCP Server](https://github.com/search?q=lippia+mcp+server) – Accelerate test automation processes 

---

### DevOps & Infrastructure

Tools that help manage environments, deployments, and infrastructure operations.

- [AWS MCP Servers](https://github.com/search?q=AWS+MCP+Server) – AWS infrastructure tools  
- [Azure MCP Server](https://github.com/search?q=Azure+MCP+Server) – Azure services integration  
- [Azure DevOps MCP](https://github.com/search?q=Azure+DevOps+MCP) – CI/CD pipelines and repositories  
- [Bitrise](https://github.com/search?q=Bitrise) – CI/CD automation platform  
- [Cloudflare MCP](https://github.com/search?q=Cloudflare+MCP) – Deploy and manage infrastructure  
- [CloudBees Unify](https://github.com/search?q=CloudBees+Unify) – DevOps environment integration  
- [Buildkite](https://github.com/search?q=Buildkite) – CI/CD pipeline automation  
- [Alibaba Cloud OPS](https://github.com/search?q=Alibaba+Cloud+OPS) – Cloud resource lifecycle management  
- [Alibaba Cloud DataWorks](https://github.com/search?q=Alibaba+Cloud+DataWorks) – Cloud data workflow orchestration  
- [Aiven](https://github.com/search?q=Aiven) – Manage Kafka, PostgreSQL, ClickHouse services  
- [Databricks MCP Server](https://github.com/search?q=databricks+mcp+server) – Data platform integration  
- [DeployHQ](https://github.com/search?q=deployhq) – Manage deployments  
- [Daytona](https://github.com/search?q=daytona+dev) – Secure execution sandboxes for generated code  
- [E2B](https://github.com/search?q=e2b+dev) – Run code in secure cloud sandboxes  
- [Firebase MCP Server](https://github.com/search?q=firebase+mcp+server) – Backend and infrastructure integration  
- [Firefly](https://github.com/search?q=firefly+cloud+infrastructure) – Manage cloud infrastructure resources  
- [Diffusion MCP Server](https://github.com/search?q=diffusion+mcp+server) – Messaging and data streaming platform  
- [Cortex MCP Server](https://github.com/search?q=cortex+mcp+server) – Internal developer portal integration  
- [Couchbase MCP Server](https://github.com/search?q=couchbase+mcp+server) – Database cluster interaction  
- [Elasticsearch MCP Server](https://github.com/search?q=elasticsearch+mcp+server) – Query Elasticsearch data  
- [FalkorDB MCP Server](https://github.com/search?q=falkordb+mcp+server) – Graph database management 
- [Jenkins MCP Server](https://github.com/jenkinsci/jenkins) – Manage CI/CD pipelines and builds  
- [Octopus Deploy MCP Server](https://github.com/OctopusDeploy) – Deployment automation platform  
- [Netlify MCP Server](https://github.com/netlify) – Manage site deployment and hosting  
- [Heroku MCP Server](https://github.com/heroku) – Manage applications and dynos  
- [LaunchDarkly MCP Server](https://github.com/launchdarkly) – Feature flag management for continuous delivery  
- [OpsLevel MCP Server](https://github.com/opslevel) – Engineering service catalog management  
- [Grafbase MCP Server](https://github.com/grafbase/grafbase) – Turn GraphQL APIs into MCP servers   

---

### Security

Tools that help identify vulnerabilities and improve secure development practices.

- [BoostSecurity](https://github.com/search?q=BoostSecurity) – Prevent vulnerable dependencies  
- [Burp Suite MCP](https://github.com/search?q=Burp+Suite+MCP) – Web security testing platform  
- [Auth0 MCP](https://github.com/search?q=Auth0+MCP) – Identity and access management  
- [Cheqd](https://github.com/search?q=Cheqd) – Identity verification and trust registries  
- [ChainAware.ai](https://github.com/search?q=ChainAware) – Fraud detection and wallet behavior analysis  
- [BICScan](https://github.com/search?q=BICScan) – Blockchain risk score and asset tracking 
- [CrowdStrike Falcon](https://github.com/search?q=crowdstrike+falcon) – Threat detection and security intelligence  
- [Cycode](https://github.com/search?q=cycode) – Security scanning (SAST, SCA, secrets)  
- [Contrast Security](https://github.com/search?q=contrast+security) – Vulnerability remediation insights  
- [Endor Labs](https://github.com/search?q=endor+labs) – Security risk detection  
- [Fluid Attacks](https://github.com/search?q=fluid+attacks) – Security vulnerability management  
- [Drata](https://github.com/search?q=drata+security) – Compliance and security intelligence 
- [PDFActionInspector MCP Server](https://github.com/search?q=pdfactioninspector+mcp+server) – Analyze PDF scripts for security risks  
- [GitGuardian MCP Server](https://github.com/gitguardian) – Detect exposed secrets and credentials  
- [Mobb MCP Server](https://github.com/mobb-dev) – Security remediation for vulnerable code   

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