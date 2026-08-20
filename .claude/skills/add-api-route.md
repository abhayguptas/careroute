---
name: 'Add API Route'
description: 'Workflow for creating a new Next.js API route using strict boundaries.'
---

# Add API Route Skill

When adding a new API route to CareRoute, you must execute the following workflow:

1. **Define the Zod Schema**: Create a Zod schema representing the expected incoming JSON payload or search params. Keep this inside the route handler file if it's UI specific, or in `/domain` if it's a domain concept.
2. **Create/Update Use Case**: If business logic is required, create a class in `/use-cases`. The route handler must NOT contain business logic.
3. **Parse at the Edge**: In your route handler, use `Schema.safeParse(rawBody)`. If `!success`, immediately return a 400 response with `parsed.error.issues`.
4. **Execute Use Case**: Call the Use Case with the parsed data.
5. **Catch CareRouteErrors**: Wrap the Use Case execution in a try-catch block. Catch `CareRouteError` and map it to the corresponding HTTP status code (`err.statusCode`). Return a fallback 500 for unknown errors.
6. **Verify Types**: Ensure you do not use `any` anywhere in the pipeline.
