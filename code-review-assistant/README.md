# Code Review Assistant

A comprehensive code review assistant that helps identify issues in Pull Requests and code snippets.

## Features

### 🔍 Six-Dimensional Analysis

1. **Code Standards**
   - Clear naming conventions
   - Consistent formatting
   - Proper commenting
   - Style guide compliance

2. **Logic Correctness**
   - Logic errors detection
   - Boundary condition handling
   - Exception handling
   - Null pointer and array overflow checks

3. **Performance**
   - N+1 query detection
   - Loop optimization opportunities
   - Unnecessary database access
   - Memory leak risks

4. **Security**
   - SQL injection vulnerabilities
   - XSS attack vectors
   - Hardcoded credentials
   - Permission validation

5. **Maintainability**
   - Function length analysis
   - Code duplication detection
   - Magic number identification
   - Single Responsibility Principle adherence

6. **Logging Standards**
   - Critical operation logging
   - Appropriate log levels
   - Context information inclusion
   - Sensitive data masking

### 🤖 Automated Complexity Checking

Includes a Python script for calculating cyclomatic complexity:

```bash
cat your_code.py | python scripts/complexity_checker.py
```

The script will:
- ✅ Calculate cyclomatic complexity
- ⚠️  Warn if complexity > 10
- 💡 Suggest refactoring for complex code

## Installation

```bash
# Copy to Claude skills directory
cp -r code-review-assistant ~/.claude/skills/

# Or symlink for development
ln -s $(pwd)/code-review-assistant ~/.claude/skills/code-review-assistant
```

## Usage

### Trigger Methods

1. **Direct invocation**:
   ```
   @code-review-assistant Review this PR
   ```

2. **Natural language**:
   - "Please review this code"
   - "Check this PR for issues"
   - "Analyze code quality"
   - "Inspect these changes"

3. **Chinese triggers**:
   - "审查这段代码"
   - "检查这个 PR"
   - "分析代码质量"

### Example Usage

**Input**:
```
Please review this code:

def process_user_data(user_id):
    user = db.query("SELECT * FROM users WHERE id=" + user_id)
    password = "admin123"
    for i in range(1000):
        result = calculate(i)
    return user
```

**Output**:
```markdown
### 审查概览
- **整体评价**: 严重问题
- **主要关注点**: 存在 SQL 注入和硬编码密码

### 详细发现

#### 🔴 严重问题(必须修复)

1. **SQL 注入** 位置:`process_user_data:2`
   - 问题描述: 直接拼接 user_id 到 SQL 查询
   - 风险说明: 攻击者可以注入恶意 SQL 代码
   - 建议修复方案: 使用参数化查询

2. **硬编码密码** 位置:`process_user_data:3`
   - 问题描述: 密码明文硬编码在代码中
   - 风险说明: 敏感信息泄露
   - 建议修复方案: 使用环境变量或密钥管理服务

#### 🟡 需要优化(建议修复)

1. **性能问题** 位置:`process_user_data:4-5`
   - 问题描述: 循环中调用 calculate() 可能耗时
   - 改进建议: 考虑批处理或缓存结果
```

## Output Format

The assistant provides structured output with:

- 📊 **Overview**: Overall assessment and key concerns
- 🔴 **Critical Issues**: Must-fix problems with solutions
- 🟡 **Improvements**: Suggested optimizations
- 🟢 **Good Practices**: Positive feedback
- 💡 **Summary**: Actionable next steps

## Dependencies

- Python 3.6+ (for complexity checker)
- No additional Python packages required (uses standard library)

## Configuration

No configuration needed. The skill works out of the box.

## Limitations

- Complexity checker currently supports Python only
- Static analysis only (no runtime behavior analysis)
- May not catch all edge cases

## Future Enhancements

- [ ] Support for more languages in complexity checker
- [ ] Integration with linting tools
- [ ] Customizable review criteria
- [ ] Team-specific coding standards
- [ ] Historical issue tracking

## Contributing

Found a bug or have a suggestion? Please open an issue or PR!

## License

MIT License

## Author

Part of the Claude Skills Factory collection.
