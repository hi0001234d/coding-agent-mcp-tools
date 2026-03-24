# Agent Configuration

## RAG (Retrieval-Augmented Generation)

Use the available MCP tools to enhance responses with project-specific knowledge:

- **llama-index MCP** → Use llama-index MCP to index and query documentation or large datasets.
- **codebase-memory MCP** → Use codebase-memory MCP to understand and recall codebase structure and context.
- **basic-memory MCP** → Use basic-memory MCP for lightweight memory and quick context storage.

---

## Agent Behavior

- Always try to understand the full codebase before making changes.
- Use memory tools to maintain context across tasks.
- Prefer safe and explainable changes over blind code generation.
- Assist in debugging, refactoring, and extending existing systems.