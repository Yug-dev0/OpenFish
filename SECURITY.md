# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.2.x   | :white_check_mark: |
| 0.1.x   | :x:                |

## Isolation & Sandbox Architecture

OpenFish operates honeypot agents against active scam infrastructure. To maintain strict isolation:
- All external interactions run in headless, isolated Chromium instances managed via TinyFish.
- No arbitrary external code is executed in host or client browsers.
- Synthetic PII (fake PAN, Aadhaar, bank details) is generated client-side using deterministic generators and contains no real personal identifiable information.

## Reporting a Vulnerability

If you discover a security vulnerability within OpenFish:
1. **Do not create a public GitHub issue.**
2. Email the lead maintainer directly at: `yug.dev04@gmail.com` with the subject line `[SECURITY] OpenFish Vulnerability Report`.
3. Include:
   - Detailed description of the vulnerability.
   - Steps to reproduce or proof-of-concept payload.
   - Potential impact assessment.
4. We aim to acknowledge reports within 24 hours and issue patches within 72 hours for critical severity items.
