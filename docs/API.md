# OpenFish REST API Reference

The OpenFish platform exposes internal and integration APIs for dispatching autonomous honeypot investigations and querying evidence dossiers.

---

### 1. Dispatch Honeypot Investigation
Dispatches an autonomous TinyFish browser agent to investigate a suspect link or entity.

- **URL:** `/api/cases`
- **Method:** `POST`
- **Headers:** `Content-Type: application/json`

#### Request Body
```json
{
  "target": "https://hdfc-kyc-update-portal.online",
  "type": "URL",
  "impersonating": "HDFC Bank"
}
```

#### Response (`201 Created`)
```json
{
  "id": "case_hdfc_kyc_8921",
  "status": "RUNNING",
  "target": "https://hdfc-kyc-update-portal.online",
  "createdAt": "2026-11-27T10:00:00.000Z"
}
```

---

### 2. Stream Case Execution Events
Server-Sent Events (SSE) stream providing real-time telemetry from the TinyFish execution container.

- **URL:** `/api/cases/{id}/events`
- **Method:** `GET`
- **Headers:** `Accept: text/event-stream`

#### Stream Events
```text
event: step
data: {"step": 1, "action": "NAVIGATE", "target": "https://hdfc-kyc-update-portal.online", "timestamp": "2026-11-27T10:00:02Z"}

event: extracted
data: {"type": "UPI_VPA", "value": "hdfcverify@ybl", "confidence": 0.98}
```

---

### 3. Generate Section 65B Complaint
Generates a pre-filled legal complaint ready for submission on [cybercrime.gov.in](https://cybercrime.gov.in).

- **URL:** `/api/cases/{id}/complaint`
- **Method:** `GET`

#### Response (`200 OK`)
```json
{
  "caseId": "case_hdfc_kyc_8921",
  "statutoryText": "FORMAL CYBERCRIME COMPLAINT UNDER SECTION 66D IT ACT...",
  "chainOfCustodyHash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "generatedAt": "2026-11-27T10:02:15Z"
}
```
