# CareRoute Architectural Constraints

When contributing to CareRoute, AI agents MUST follow these architectural dependency rules.

## Dependency Rule

Inner layers must NEVER depend on outer layers.

1. **Domain (`/domain`)**: Has NO dependencies. Contains Zod schemas and business logic invariants.
2. **Use Cases (`/use-cases`)**: Can depend on Domain and Infrastructure Interfaces. Orchestrates the flow. Does NOT depend on Next.js/React.
3. **Infrastructure (`/infrastructure`)**: Implements external concerns (Bright Data fetch logic, SQLite repositories). Depends on Domain schemas for boundaries.
4. **Delivery (`/app`)**: Next.js route handlers and UI. Can depend on Use Cases and Domain. MUST NOT contain raw `fetch` calls to Bright Data or raw SQL queries.

## Validation

- All untrusted input (API payloads, Webhooks, Env variables) MUST be validated using Zod at the boundary.
- Do NOT use `any` or `as` type casting.

## Error Handling

- Throw `CareRouteError` subclasses (`ValidationError`, `InfrastructureError`, `DomainStateError`) from Use Cases and Domain.
- Catch these in `/app` route handlers and map them to HTTP status codes. Never leak internal stack traces to the client.
