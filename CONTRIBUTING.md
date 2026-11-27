# Contributing to OpenFish

Thank you for your interest in contributing to **OpenFish** — the autonomous cyber defense and honeypot mesh platform.

## Code of Conduct
By participating in this project, you agree to abide by our [Code of Conduct](./CODE_OF_CONDUCT.md).

## Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Yug-dev0/OpenFish.git
   cd OpenFish
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start local mock environment:**
   ```bash
   npm run dev:mock
   ```
   This runs the local TinyFish automation mock on port 4010 and Next.js web application on port 3000.

## Development Workflow

- **Branch Naming:** Use descriptive branch names like `feat/upi-validator`, `fix/timeline-overflow`, `docs/api-reference`.
- **Commit Messages:** Follow Conventional Commits (`feat:`, `fix:`, `refactor:`, `test:`, `docs:`, `perf:`).
- **TypeScript:** Ensure zero type errors prior to committing:
  ```bash
  npx tsc --noEmit
  ```
- **Testing:** Run all test suites:
  ```bash
  npm test
  ```

## Section 65B Forensic Integrity Standards
Any PR modifying evidentiary data pipelines or statutory complaint generators must preserve:
1. Deterministic SHA-256 evidence chain calculation.
2. Unaltered chronometer timestamps (ISO 8601 UTC).
3. Exact verbatim capture of unmasked financial identifiers (UPI VPAs, IFSC, Phone Numbers).

## Submitting Pull Requests
1. Push your branch to your fork.
2. Open a Pull Request against `main`.
3. Provide a clear summary of changes, motivation, and test verification output.
