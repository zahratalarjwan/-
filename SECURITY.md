# Security Policy for CineFlow AI Studio

## Supported Versions
Security updates are actively applied to the current production release.

| Version | Supported |
| :--- | :--- |
| 1.0.x | Yes |
| < 1.0 | No |

## Reporting a Vulnerability
We take the security of CineFlow AI Studio and its integrations seriously. If you identify a security vulnerability, please do NOT open a public GitHub issue.

Instead, please send an encrypted or private report to:
`security@cineflow.studio`

Include:
- Type of issue (e.g., Command Injection, Path Traversal, Credential Exposure, XSS, CSRF).
- Exact steps to reproduce or Proof of Concept (PoC).
- Potential impact and affected endpoints.
- Recommended mitigation if known.

We will acknowledge receipt within 24 hours and provide an estimated remediation timeline.

## Security Architecture Principles
1. **Zero Secret Exposure:**
   - No API keys, OAuth secrets, or credentials are baked into client bundles, HTML outputs, or git commits.
   - All external keys reside strictly in server environment variables.
2. **Subprocess Sanitization:**
   - All parameters passed to external utilities (e.g., FFmpeg) are strictly sanitized against shell command injection via regex allow-lists and bounded parameter validation.
3. **HTTP Security Headers:**
   - Next.js injects strict security headers:
     - `X-Frame-Options: SAMEORIGIN`
     - `X-Content-Type-Options: nosniff`
     - `Referrer-Policy: strict-origin-when-cross-origin`
     - `Permissions-Policy: camera=(), microphone=(self), geolocation=()`
4. **Third-Party Platform Integrity:**
   - We do not scrape, bypass, or reverse-engineer Google Flow sessions. Assisted Flow Mode provides creator-driven workflow orchestration that respects terms of service and account safety.
