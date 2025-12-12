# Excalidraw Diagram Generator

Generate architecture diagrams as `.excalidraw` files directly from codebase analysis.

## Description

This skill enables Claude Code to analyze any codebase and generate professional architecture diagrams in Excalidraw format. No existing diagrams or infrastructure-as-code templates required.

## Features

- Analyzes codebases to identify components, services, databases, and APIs
- Maps relationships and data flows automatically
- Generates valid Excalidraw JSON with proper element bindings
- Supports multiple layout patterns (vertical, horizontal, hub-and-spoke)
- Platform-agnostic color palettes (AWS, Azure, Kubernetes)
- Produces clean 90-degree elbow arrows

## Usage

Simply ask Claude Code to generate an architecture diagram:

```
"Generate an architecture diagram for this project"
"Create an excalidraw diagram of the system"
"Visualize this codebase as an excalidraw file"
```

## Installation

```bash
# Copy to Claude skills directory
cp -r ./excalidraw ~/.claude/skills/

# Or symlink for development
ln -s $(pwd)/excalidraw ~/.claude/skills/excalidraw
```

## Output

The skill generates `.excalidraw` files that can be opened directly in:
- [Excalidraw](https://excalidraw.com/)
- VS Code with Excalidraw extension
- Any tool supporting the Excalidraw format

## Source

Original skill from [ooiyeefei/ccc](https://github.com/ooiyeefei/ccc/tree/main/skills/excalidraw)
