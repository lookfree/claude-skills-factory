# Claude Skills Factory

## Project Overview

A curated collection of high-quality Claude Code skills for AI-assisted development workflows. Skills are modular components that extend Claude's capabilities for specific tasks.

## Project Structure

```
claude-skills-factory/
├── README.md              # Main project documentation
├── CONTRIBUTING.md        # Contribution guidelines
├── LICENSE                # MIT License
├── .gitignore
├── code-review-assistant/ # Code review skill
│   ├── SKILL.md           # Skill definition (required)
│   ├── README.md          # User documentation
│   └── scripts/           # Helper scripts
│       └── complexity_checker.py
└── excalidraw/            # Architecture diagram generator
    ├── SKILL.md           # Skill definition
    └── README.md          # User documentation
```

## Skill Architecture

Each skill follows a standard structure:

```
skill-name/
├── SKILL.md          # Main skill definition (required)
├── README.md         # Skill documentation (optional)
├── scripts/          # Helper scripts (optional)
│   └── *.py, *.sh
└── examples/         # Usage examples (optional)
```

### SKILL.md Format

```markdown
---
name: skill-name
description: Brief English description. 中文描述
---
# Skill Content
```

## Available Skills

| Skill | Description |
|-------|-------------|
| `code-review-assistant` | Code review for PRs and snippets (6-dimension analysis) |
| `excalidraw` | Generate architecture diagrams as .excalidraw files from codebase analysis |

## Development Commands

```bash
# Install skill locally (symlink)
ln -s $(pwd)/skill-name ~/.claude/skills/skill-name

# Install all skills
for skill in */; do
  ln -s $(pwd)/$skill ~/.claude/skills/$skill
done

# Copy skill to Claude skills directory
cp -r ./skill-name ~/.claude/skills/

# Run complexity checker (code-review-assistant)
python code-review-assistant/scripts/complexity_checker.py /path/to/code
```

## Creating New Skills

1. Create directory with kebab-case name: `mkdir my-new-skill`
2. Add `SKILL.md` with frontmatter (name, description)
3. Add `README.md` with usage instructions
4. (Optional) Add helper scripts in `scripts/`
5. (Optional) Add examples in `examples/`
6. Update root `README.md` with new skill entry

## Skill Guidelines

- **Naming**: lowercase, hyphen-separated (e.g., `code-review-assistant`)
- **Bilingual**: Include English and Chinese in description/content
- **Focused**: One skill = one specific task
- **Documented**: Clear usage instructions and examples
- **Tested**: Verify triggers and output format

## Coding Standards

### Python Scripts
- Python 3.6+ compatible
- PEP 8 style
- Include shebang: `#!/usr/bin/env python3`
- Handle errors gracefully with helpful messages
- Use standard library only when possible

### Markdown
- ATX-style headers (`#`)
- Fenced code blocks with language tags
- Use emoji sparingly and consistently

## Roadmap

Planned skills:
- API Documentation Generator
- Test Case Generator
- Refactoring Assistant
- Performance Profiler
- Security Auditor
- Database Query Optimizer
- Git Commit Message Generator
- Architecture Analyzer

## Key Files

| File | Purpose |
|------|---------|
| `README.md` | Project overview and installation |
| `CONTRIBUTING.md` | Detailed contribution guidelines |
| `*/SKILL.md` | Skill definition files |
| `*/README.md` | Individual skill documentation |

## License

MIT License - free to use in any project.
