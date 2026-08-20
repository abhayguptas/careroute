/**
 * Base Application Error for CareRoute.
 * Extends standard Error but adds strong typing for HTTP mapping.
 */
export class CareRouteError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly metadata?: Record<string, unknown>;

  constructor(
    message: string,
    code: string,
    statusCode: number,
    metadata?: Record<string, unknown>
  ) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = statusCode;
    this.metadata = metadata;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Thrown when domain validation (e.g., Zod parsing) fails.
 */
export class ValidationError extends CareRouteError {
  constructor(message: string, metadata?: Record<string, unknown>) {
    super(message, 'VALIDATION_ERROR', 400, metadata);
  }
}

/**
 * Thrown when an external infrastructure call (like Bright Data) fails.
 */
export class InfrastructureError extends CareRouteError {
  constructor(message: string, metadata?: Record<string, unknown>) {
    super(message, 'INFRASTRUCTURE_ERROR', 502, metadata);
  }
}

/**
 * Thrown when a requested resource (Scraper, Facility) is not found.
 */
export class NotFoundError extends CareRouteError {
  constructor(message: string, metadata?: Record<string, unknown>) {
    super(message, 'NOT_FOUND', 404, metadata);
  }
}

/**
 * Thrown when the application encounters an invalid state transition.
 */
export class DomainStateError extends CareRouteError {
  constructor(message: string, metadata?: Record<string, unknown>) {
    super(message, 'INVALID_STATE', 409, metadata);
  }
}
