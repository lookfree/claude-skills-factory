#!/usr/bin/env python3
import sys
import ast

def calculate_complexity(code):
    """简单的圈复杂度计算"""
    tree = ast.parse(code)
    complexity = 1  # 基础复杂度
    
    for node in ast.walk(tree):
        # 每个判断分支 +1
        if isinstance(node, (ast.If, ast.While, ast.For, ast.ExceptHandler)):
            complexity += 1
        # 布尔运算符 +1
        elif isinstance(node, ast.BoolOp):
            complexity += len(node.values) - 1
    
    return complexity

if __name__ == "__main__":
    code = sys.stdin.read()
    try:
        complexity = calculate_complexity(code)
        if complexity > 10:
            print(f"⚠️  圈复杂度: {complexity} (建议小于10,当前代码可能过于复杂)")
        else:
            print(f"✅ 圈复杂度: {complexity} (在合理范围内)")
    except Exception as e:
        print(f"❌ 代码解析失败: {e}")
