#!/bin/bash

# 1. Configs and tooling
git add package.json package-lock.json eslint.config.mjs .prettierrc .husky/ vitest.config.ts playwright.config.ts .claude/ tests/
git commit -m "build: establish strict tooling, vitest, playwright, and ai-native constraints"

# 2. Domain
git add src/domain/
git commit -m "feat(domain): introduce strict zod schemas and bounded context invariants"

# 3. Infrastructure
git add src/infrastructure/ src/lib/db/ src/lib/brightdata/
git commit -m "feat(infrastructure): encapsulate brightdata and db repositories behind boundary"

# 4. Use Cases
git add src/use-cases/
git commit -m "feat(use-cases): extract application logic into isolated workflows"

# 5. Delivery & Clean up
git add src/app/api/ src/components/ src/types/ src/lib/ src/app/
git commit -m "refactor(delivery): migrate Next.js endpoints to boundary-validated use cases"

# 6. Formatting / Leftovers
git add -A
git commit -m "style: finalize structural formatting and minor cleanup"

git push
