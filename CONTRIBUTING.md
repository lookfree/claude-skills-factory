# Contributing to Claude Skills Factory

Thank you for your interest in contributing! This guide will help you create high-quality skills for the Claude Code community.

## 🎯 What Makes a Good Skill?

A good skill should:

1. **Solve a Real Problem**: Address a specific, common development task
2. **Be Well-Documented**: Clear instructions and examples
3. **Be Reliable**: Tested and proven to work
4. **Be Maintainable**: Easy to understand and update
5. **Be Focused**: Do one thing well, not many things poorly

## 📝 Skill Structure

### Required Files

```
your-skill-name/
├── SKILL.md          # Main skill definition
└── README.md         # User-facing documentation
```

### Optional Files

```
your-skill-name/
├── scripts/          # Helper scripts
│   ├── *.py
│   ├── *.sh
│   └── *.js
├── examples/         # Usage examples
│   ├── example1.md
│   └── example2.md
└── tests/           # Skill tests
    └── test_*.md
```

## ✍️ Writing SKILL.md

The `SKILL.md` file is the core of your skill. It must include:

### 1. Frontmatter (Required)

```markdown
---
name: your-skill-name
description: Brief description (English) with Chinese translation. 中文描述
---
```

**Guidelines**:
- `name`: lowercase, hyphen-separated (e.g., `code-review-assistant`)
- `description`: One sentence in English, followed by Chinese translation

### 2. Content Structure (Recommended)

```markdown
# Skill Title

## 你的职责 / Your Role
[What the AI should do when this skill is activated]

## 输入要求 / Input Requirements
[What information is needed]

## 处理步骤 / Processing Steps
[Step-by-step instructions for the AI]

## 输出格式 / Output Format
[Expected output structure]

## 注意事项 / Important Notes
[Special considerations or edge cases]
```

### 3. Best Practices

- **Be Specific**: Clear, actionable instructions
- **Use Examples**: Show input/output examples
- **Set Context**: Define the AI's role clearly
- **Bilingual**: Include both English and Chinese
- **Structured Output**: Define clear output formats

## 📚 Writing README.md

The `README.md` file is for users. It should include:

### Required Sections

1. **Title and Description**
   ```markdown
   # Your Skill Name
   Brief description of what it does
   ```

2. **Features**
   ```markdown
   ## Features
   - Feature 1
   - Feature 2
   ```

3. **Installation**
   ```markdown
   ## Installation
   ```bash
   cp -r your-skill-name ~/.claude/skills/
   ```
   ```

4. **Usage**
   ```markdown
   ## Usage

   ### Trigger Methods
   1. Direct: `@your-skill-name`
   2. Natural: "do something"
   ```

### Optional Sections

- **Examples**: Real-world usage examples
- **Configuration**: If the skill needs setup
- **Dependencies**: Required tools or packages
- **Limitations**: Known issues or constraints
- **Contributing**: How to improve the skill

## 🔧 Adding Helper Scripts

Helper scripts should:

1. **Be Standalone**: Work independently
2. **Have Clear Usage**: Include help text
3. **Handle Errors**: Graceful failure messages
4. **Be Cross-Platform**: Or document OS requirements

Example Python script template:

```python
#!/usr/bin/env python3
"""
Helper script for [purpose]

Usage:
    python script.py <input>
"""

import sys

def main():
    if len(sys.argv) < 2:
        print("Usage: python script.py <input>")
        sys.exit(1)

    try:
        # Your logic here
        pass
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
```

## 🧪 Testing Your Skill

Before submitting:

1. **Install Locally**:
   ```bash
   ln -s $(pwd)/your-skill-name ~/.claude/skills/your-skill-name
   ```

2. **Test Triggers**:
   - Try direct invocation: `@your-skill-name`
   - Try natural language triggers
   - Test edge cases

3. **Verify Output**:
   - Check output format
   - Ensure consistency
   - Test with different inputs

4. **Documentation Check**:
   - Read your README as a new user would
   - Verify all commands work
   - Check for typos

## 📤 Submitting Your Contribution

### Step 1: Fork and Clone

```bash
git clone https://github.com/YOUR_USERNAME/claude-skills-factory.git
cd claude-skills-factory
```

### Step 2: Create a Branch

```bash
git checkout -b add-your-skill-name
```

### Step 3: Add Your Skill

```bash
mkdir your-skill-name
# Add your files
```

### Step 4: Update Main README

Add your skill to the "Available Skills" section in the root `README.md`.

### Step 5: Commit and Push

```bash
git add .
git commit -m "feat: add your-skill-name skill"
git push origin add-your-skill-name
```

### Step 6: Create Pull Request

1. Go to GitHub
2. Click "New Pull Request"
3. Fill in the template:

```markdown
## Skill Name
[Your skill name]

## Description
[What does it do?]

## Motivation
[Why is this skill needed?]

## Testing
- [ ] Tested locally
- [ ] Documentation reviewed
- [ ] Examples verified

## Checklist
- [ ] SKILL.md includes frontmatter
- [ ] README.md is complete
- [ ] Scripts have proper permissions
- [ ] Added to main README.md
```

## 🎨 Style Guidelines

### Naming Conventions

- **Skill Names**: `kebab-case` (e.g., `code-review-assistant`)
- **Files**: Lowercase with extensions (e.g., `complexity_checker.py`)
- **Scripts**: Use shebang line (e.g., `#!/usr/bin/env python3`)

### Markdown Style

- Use ATX-style headers (`#` not `===`)
- Use fenced code blocks with language tags
- Use emoji sparingly but consistently
- Keep line length reasonable (80-100 chars)

### Code Style

- **Python**: Follow PEP 8
- **Shell**: Use `bash` or `sh`, be POSIX-compatible
- **JavaScript**: Use ES6+ features
- Add comments for complex logic

## 🚫 What Not to Include

- ❌ Copyrighted content
- ❌ API keys or credentials
- ❌ Binary files (without good reason)
- ❌ Generated code (AI output without review)
- ❌ Duplicate functionality of existing skills
- ❌ Overly broad or vague skills

## 🆘 Getting Help

- 💬 [Start a Discussion](https://github.com/YOUR_USERNAME/claude-skills-factory/discussions)
- 🐛 [Report an Issue](https://github.com/YOUR_USERNAME/claude-skills-factory/issues)
- 📧 Email maintainers

## 📜 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the skill, not the person
- Help newcomers

## 🏆 Recognition

Contributors will be:
- Listed in the main README
- Mentioned in release notes
- Credited in skill documentation

## ⚖️ License

By contributing, you agree to license your contribution under the MIT License.

---

Thank you for helping make Claude Code better for everyone! 🎉
