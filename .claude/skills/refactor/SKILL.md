---
name: refactor
description: Refactor code for clarity, simplicity, or performance. Use when improving code quality, extracting reusable components, or reducing duplication.
arguments: [target]
allowed-tools: Read Grep Edit Write Bash
---

# Refactor Assistant

Refactor the target: **$target**

## Steps

1. **Read the file(s)** — understand what the code does before changing it
2. **Identify issues** — look for duplication, complex logic, poor naming, large functions
3. **Refactor incrementally** — small, safe steps; preserve behavior at each step
4. **Verify** — no regressions, no new console errors, UI still works

## Vue/SCSS specifics (this project)

- Keep component public interface stable (props, emits)
- Extract shared logic into composables if used in more than one place
- Keep styles in the component's scoped block or the matching `.scss` file
- Test interactive elements after each change

## Success criteria

- Code is simpler and more readable
- No behavior change
- No lint errors
