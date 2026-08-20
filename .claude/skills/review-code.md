---
name: 'Review Code'
description: 'Mandatory checklist to verify code readiness before finalizing a task.'
---

# Code Readiness Review

Before declaring any feature complete or prompting the user for a final review, you MUST run this checklist:

1. **Typechecking**: Run `npm run check:types`. There must be ZERO TypeScript compiler errors.
2. **Linting**: Run `npm run lint`. Ensure there are no `any` casts, non-null assertions (`!`), or unused variables.
3. **Formatting**: Run `npm run check:format`. If it fails, run `npm run format`.
4. **Validation**: Run `npm run validate` to ensure all checks pass synchronously.
5. **Testing**: Run `npx vitest run` to ensure all existing unit and integration tests still pass.
6. **Architectural Review**: Verify that no UI components contain direct DB calls, and no `/domain` files import Next.js or external network libraries.

Only after ALL these commands execute successfully should you report back to the user that the task is complete.
