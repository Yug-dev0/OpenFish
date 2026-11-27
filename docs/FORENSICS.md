# Section 65B Forensic Integrity Specification

## Indian Evidence Act Statutory Foundation
Under Section 65B of the Indian Evidence Act, 1872 (and corresponding provisions of the Bharatiya Sakshya Adhiniyam, 2023), electronic records are admissible in court only when accompanied by a statutory certificate validating the integrity and uninterrupted operation of the computer system that generated them.

## OpenFish Chain of Custody Protocol

1. **Chronometer Synchronization:**
   - Every agent step records microsecond-precision UTC timestamps.
   - System records NTP server drift metrics during session initialization.

2. **Deterministic Cryptographic Sealing:**
   - Sequential execution events (HTTP requests, DOM mutations, extracted payloads, and screenshots) form a cryptographic hash chain:
   ```
   H_0 = SHA256(Initial Target Payload)
   H_n = SHA256(H_{n-1} || Action_n || Payload_n || Timestamp_n)
   ```
   - Any retrospective tampering with case evidence breaks the chain validation.

3. **Digital Certificate Schema:**
   - System custodian identity (Inspector / Analyst ID).
   - Server MAC address and operating container UUID.
   - Software build hash and TinyFish runtime version.
