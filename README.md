# Claude Skills Factory

🚀 A collection of high-quality Claude Code skills for various development scenarios.

## About

This repository contains a curated collection of Claude Code skills that enhance your AI-assisted development workflow. Each skill is carefully designed to handle specific tasks and scenarios.

## Available Skills

### 1. Code Review Assistant

**Name**: `code-review-assistant`

**Description**: Code review assistant for analyzing Pull Requests and code snippets to identify potential issues.

**Use Cases**:
- Review code changes before merging
- Identify potential bugs and security issues
- Check code quality and maintainability
- Analyze code complexity

**Features**:
- 🔍 Comprehensive code analysis across 6 dimensions
- 🛡️ Security vulnerability detection
- ⚡ Performance optimization suggestions
- 📊 Code complexity checking with automated scripts
- 🌐 Bilingual support (English & Chinese)

[View Details](./code-review-assistant/)

### 2. Excalidraw Diagram Generator

**Name**: `excalidraw`

**Description**: Generate architecture diagrams as .excalidraw files from codebase analysis.

**Use Cases**:
- Create architecture diagrams from code
- Visualize system components and data flows
- Generate documentation diagrams
- Map relationships between services

**Features**:
- Automatic codebase analysis (any language/framework)
- Multiple layout patterns (vertical, horizontal, hub-and-spoke)
- Platform-specific color palettes (AWS, Azure, Kubernetes)
- Clean 90-degree elbow arrows with proper bindings
- No prerequisites required

[View Details](./excalidraw/)

## Installation

### Method 1: Copy to Claude Skills Directory

```bash
# Copy individual skill
cp -r ./code-review-assistant ~/.claude/skills/

# Or copy all skills
cp -r ./* ~/.claude/skills/
```

### Method 2: Symlink (Recommended for development)

```bash
# Symlink individual skill
ln -s $(pwd)/code-review-assistant ~/.claude/skills/code-review-assistant

# Or symlink all skills
for skill in */; do
  ln -s $(pwd)/$skill ~/.claude/skills/$skill
done
```

### Method 3: Using Git Clone Directly

```bash
# Clone to Claude skills directory
cd ~/.claude/skills
git clone https://github.com/YOUR_USERNAME/claude-skills-factory .
```

## Usage

After installation, Claude Code will automatically detect and load these skills. You can trigger them by:

1. **Explicit invocation**: `@code-review-assistant`
2. **Natural language**: "Please review this code"
3. **Context-based**: Claude will suggest the skill when relevant

## Skill Structure

Each skill follows this standard structure:

```
skill-name/
├── SKILL.md          # Main skill definition (required)
├── README.md         # Skill documentation (optional)
├── scripts/          # Helper scripts (optional)
│   └── *.py, *.sh
└── examples/         # Usage examples (optional)
    └── *.md
```

## Creating New Skills

Want to contribute a skill? Follow these steps:

1. Create a new directory with your skill name
2. Add a `SKILL.md` file with frontmatter:
   ```markdown
   ---
   name: your-skill-name
   description: Brief description of what your skill does
   ---
   # Your Skill Name

   [Skill content...]
   ```
3. (Optional) Add helper scripts in `scripts/` directory
4. (Optional) Add examples in `examples/` directory
5. Submit a pull request!

## Contributing

Contributions are welcome! Please read our [Contributing Guide](./CONTRIBUTING.md) before submitting PRs.

### Contribution Guidelines

- **Quality over quantity**: Each skill should solve a real problem
- **Documentation**: Include clear usage instructions
- **Testing**: Test your skill thoroughly before submitting
- **Naming**: Use descriptive, lowercase names with hyphens
- **Bilingual**: Consider adding both English and Chinese support

## Roadmap

Planned skills:

- [ ] API Documentation Generator
- [ ] Test Case Generator
- [ ] Refactoring Assistant
- [ ] Performance Profiler
- [ ] Security Auditor
- [ ] Database Query Optimizer
- [ ] Git Commit Message Generator
- [ ] Architecture Analyzer

## License

MIT License - feel free to use these skills in your projects!

## Related Projects

- [Claude Code](https://claude.com/claude-code) - Official Claude CLI
- [Claude Code Debugger](https://github.com/lookfree/claude-code-debugger) - Visual debugger for Claude Code skills

## Support

- 🐛 [Report Issues](https://github.com/YOUR_USERNAME/claude-skills-factory/issues)
- 💬 [Discussions](https://github.com/YOUR_USERNAME/claude-skills-factory/discussions)
- 📧 Email: your-email@example.com

## Acknowledgments

Thanks to all contributors who help make this collection better!

---

Made with ❤️ by the Claude Code community
