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
- [Supabase MCP](https://github.com/supabase-community/supabase-mcp) – Supabase database and backend MCP integration  
- [Sentry](https://github.com/getsentry/sentry) (MCP) – Real-time error tracking and performance monitoring  
- [OpenTelemetry](https://github.com/open-telemetry/opentelemetry-collector) (MCP) – Observability and telemetry data collection for MCP  
- [Grafana](https://github.com/grafana/grafana) (MCP) – Analytics and visualization platform for MCP observability data 

---

### Codebase Understanding

Tools that help developers and AI agents analyze large repositories and understand complex systems.

- [Inspector](https://github.com/modelcontextprotocol/inspector) – Debugging and observability tool for MCP servers  
- [Code Interpreter (MCP)](https://github.com/e2b-dev/code-interpreter) – Execute and analyze code in secure MCP environments  
- [SonarQube MCP](https://github.com/SonarSource/sonarqube-mcp-server) – Code quality and security analysis for MCP workflows

---

### Documentation

Tools that help generate, maintain, or improve project documentation.

- [YFinance MCP](https://github.com/narumiruna/yfinance-mcp) – Financial data access and analysis via MCP (also used in Data/Database MCP)  
- [Xiyan MCP Server](https://github.com/XGenerationLab/xiyan_mcp_server) – AI-assisted data processing and database access (also used in AI/Tooling MCP & Data/Database MCP) 

---

### Maintenance

Tools designed to support long-lived projects and ongoing software maintenance.

- [AWS Platform MCP](https://github.com/awslabs/mcp) – Manage AWS resources and services via MCP  
- [Kubernetes MCP](https://github.com/containers/kubernetes-mcp-server) – MCP server for Kubernetes cluster management  
- [Docker MCP](https://github.com/modelcontextprotocol/servers/tree/main/src/docker) – MCP integration for Docker container workflows  
- [Datadog MCP Server](https://github.com/winor30/mcp-server-datadog) – Observability and monitoring via Datadog MCP integration

---

### Testing

Tools that assist with automated testing, validation, and QA workflows.

- [Playwright MCP](https://github.com/microsoft/playwright-mcp) – Browser automation and testing  
- [TestSprite](https://www.npmjs.com/package/@testsprite/testsprite-mcp) – End-to-end test automation framework  
- [MCP Server Cloudflare](https://github.com/cloudflare/mcp-server-cloudflare) – Cloudflare MCP server integration  
- [Inspector](https://github.com/modelcontextprotocol/inspector) – Debugging and observability tool for MCP servers  
- [Code Interpreter](https://github.com/e2b-dev/code-interpreter) – Execute and analyze code in secure environments

---

### DevOps & Infrastructure

Tools that help manage environments, deployments, and infrastructure operations.

- [AWS Platform MCP](https://github.com/awslabs/mcp) – Manage AWS resources and services via MCP  
- [Kubernetes MCP](https://github.com/containers/kubernetes-mcp-server) – MCP server for Kubernetes cluster management  
- [Docker MCP](https://github.com/modelcontextprotocol/servers/tree/main/src/docker) – MCP integration for Docker container workflows  
- [Datadog MCP Server](https://github.com/winor30/mcp-server-datadog) – Observability and monitoring via Datadog MCP integration

---

### Security

Tools that help identify vulnerabilities and improve secure development practices.

- [Snyk Agent Scan](https://github.com/snyk/agent-scan) – Automated vulnerability scanning for code and dependencies  
- [SonarQube MCP](https://github.com/SonarSource/sonarqube-mcp-server) – Code quality and security analysis for MCP workflows  
- [MCP Security Hub](https://github.com/FuzzingLabs/mcp-security-hub) – Centralized security insights for MCP-managed projects  
- [Cisco MCP Scanner](https://github.com/cisco-ai-defense/mcp-scanner) – Security scanning and threat detection for MCP-integrated systems  

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