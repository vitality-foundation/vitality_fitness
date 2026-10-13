# Vitality

Connected health and family wellbeing platform. A vision for healthier, happier lives.

Vitality brings wearables, care services, family support, emergency assistance, and insurance-funded benefits into one health companion. Technology stays in the background. Users see clearer information, next steps, professional help when needed, and meaningful benefits.

**Vitality Guard** is a wearable and location-enabled assistance network. It can connect a person in distress with nearby eligible helpers and approved healthcare or emergency partners.

## Outcomes

- Clearer understanding of personal health
- Healthier daily habits without unnecessary pressure
- Care-team connection when professional support is needed
- A trusted emergency path for danger or acute distress
- Safe support from family, friends, and nearby eligible participants
- Insurance-funded preventive care and verified assistance

## Who participates

The patient stays at the center. Family and friends are an optional support layer and may share wellness goals only. Social sharing does not include diagnoses, clinician notes, raw measurements, or private medical conversations.

Clinicians manage review, care plans, evidence, messaging, and escalation. Insurers fund programs and benefits without unrestricted clinical access. Healthcare organizations manage programs, staff, and clinical responsibility. Every participant sees and does only what they are authorized to do.

## Connected devices

Permitted observations can come from wearables, mobile health frameworks, home monitors, rehabilitation equipment, and dedicated IoT hardware. Device data is evidence, not a diagnosis. Missing, stale, or uncertain readings are data-quality conditions.

Early hardware can use the Nordic Semiconductor nRF5 Series (nRF52832, nRF52833, nRF52840), plus STM32 and Arduino BLE. Devices handle sensing, local buffering, Bluetooth Low Energy, identity, and secure sync. Approved edge gateways may extend coverage later and do not receive protected clinical data.

```text
Device → BLE / gateway → authenticated ingestion → quality checks
  → secure health store → care programs → user and care-team apps
```

## Vitality Guard

Approved wearables (watch, ring, pendant, safety band, or similar) support daily wellbeing and a deliberate SOS trigger. AI may raise an assistance event from permitted signals such as a hard fall or prolonged immobility. That event is an escalation request, not a diagnosis.

Location is event-scoped and minimum-necessary. Nearby helpers may be matched within about 100–500 meters where density, consent, safety rules, and local law allow it. They receive a short request, approximate location, and an accept or decline action. They are not asked to confront threats or give care beyond their training. Dangerous situations route to appropriate emergency, security, or law-enforcement partners where those integrations exist.

```text
SOS or risk signal → authenticate → locate → orchestrate
  → confirm when appropriate → nearby helpers and professional routing
  → verify assistance → close → reward only after verification
```

The patient app shows a simple path: Triggered, Locating, Routing, Responder Accepted, Help In Progress, Verification, Closed. Server-side event states include Detected, Triggered, Confirmation Pending, Active, Routing, Responder Accepted, Professional Response Requested, Help In Progress, Verification Pending, Resolved, Cancelled, and Closed. Clients cannot invent a completed rescue or create a reward.

## Experience and backend

The web app can use SvelteKit and TypeScript. Native or mobile components handle Bluetooth, notifications, and device permissions. The interface separates device data, AI assistance, and clinician-approved information. Users control what is shared.

Go services enforce identity, consent, enrollment, care programs, device registration, observations, messaging, benefits, and partner integrations. PostgreSQL holds operational data. Controlled object storage holds restricted evidence. FHIR-compatible APIs connect healthcare systems where appropriate. A reward outage must not block care plans, clinical communication, or health data.

## AI

AI organizes information, summarizes permitted records, explains approved instructions, and routes questions. It can return “insufficient information.” It does not diagnose, change care plans, override clinicians, release insurance funds, or authorize rewards. Emergency detection produces a risk signal and escalation level. False positives and false negatives are safety metrics. An AI event alone never authorizes payment.

## Benefits and rewards

Insurers fund eligible programs. Patients do not buy, deposit, invest, or trade reward units. The app shows a benefit balance. Credits are closed-loop entitlements: not sold to users, not transferred between members, not cash by default, and not listed on an exchange. Legal treatment is reviewed per market and sponsor before launch.

A credit is issued once, against a unique approved milestone or assistance event, and only while the funded allocation covers its maximum redemption liability. Value is fixed or bounded in advance. There is no bidding during an emergency.

```text
Program budget → eligible activity → review → authorization
  → benefit balance → approved provider → fulfillment → insurer settlement
```

Emergency helper rewards require a full event timeline: signed timestamps, authenticated triggers, location consistency, acceptance and arrival, protected messages, and user, care-team, or partner confirmation when available. Decisions are Verified, Partially Verified, Rejected, or Manual Review Required. The ledger stores the accounting result and non-sensitive references only.

Reward states: Potential, Under Review, Approved, Processing, Available, Reserved, Redeemed.

## Permissioned ledger

Hyperledger Fabric with Go chaincode is a proposed internal ledger for authorized reward movements: duplicate prevention, program limits, reservation, redemption, release, and correction. It does not diagnose, judge clinical evidence, or store health information.

Contract operations: `CreateProgram`, `AmendProgram`, `FundAllocation`, `IssueAward`, `ReserveAward`, `ConfirmRedemption`, `ReleaseReservation`, `RecordCorrection`. Writes are idempotent. Corrections are new linked entries. Issued redemption liability cannot exceed the funded allocation.

Use Fabric in production only if multiple organizations need a shared, independently verifiable record and the audit benefit outweighs the operating cost. Until peers, joint approval, finance reconciliation, and a consortium agreement exist, the ledger is a proposed design. A single-operator pilot should compare it with a conventional audited database first.

## Privacy and safety

Encrypt data in transit and at rest. Use OIDC, server-side authorization, role-based access, staff MFA, key management, tenant isolation, audit, and retention controls. Precise location is purpose-limited and expires with the event. Controls cover false SOS events, spoofed location, replay, account takeover, stalking, and reward fraud. Users can manage community participation, emergency contacts, location permission, and automatic detection.

## Technology baseline

| Area | Technology |
| --- | --- |
| Web | SvelteKit + TypeScript |
| Backend | Go |
| Operational data | PostgreSQL |
| Evidence and attachments | Controlled object storage |
| Identity | OIDC, RBAC, consent, staff MFA |
| Interoperability | FHIR-compatible APIs |
| IoT | nRF5 Series, STM32, Arduino BLE; BLE and Wi-Fi |
| AI | Backend-managed assistance |
| Observability | OpenTelemetry |
| Rewards | Go reward service; Hyperledger Fabric and Go chaincode as proposed |
| Reward views | PostgreSQL projections of committed ledger events |

Build in dependency order: identity and consent, devices and integrations, validation, care programs, AI assistance, clinical responsibility, insurer funding, then authorized reward accounting. Healthcare continues if the reward ledger is unavailable.

Success is healthier routines, engagement, preventive care, reliable devices, family support, benefit use, and long-term wellbeing. Vitality is a health platform first.
