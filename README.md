# Quaetn

Quaetn is Terilliom's virtual creator and software lifecycle operating system.

It learns how an individual creator turns imperfect thoughts into finished systems, then applies that creative process to each new software project. It translates natural communication into structured models, asks high-value questions, builds real software, accepts scoped changes, tests results, and manages applications throughout their lifecycle.

## Product principles

- Creator-led, not template-led.
- Discover intent through natural conversation, examples, analogies, and visual exploration.
- Keep the Creator Model separate from each Application Model.
- Ask the most useful next question, not a fixed questionnaire.
- Track known, confirmed, assumed, inferred, ambiguous, missing, contradictory, rejected, and superseded information.
- Support scoped custom requests for workflows, features, UI, themes, and behaviour.
- Preserve relationships, decisions, context, and change history.
- The Sphere is a spatial control surface backed by real persisted system data.
- Generated applications must be real, testable, and isolated from Quaetn's privileged runtime.

## Current build

The initial foundation is a lightweight open-source React + TypeScript application. The first vertical slice focuses on the Sphere-first HQ, creator conversation, structured project model, and local persistence. Backend, authentication, durable multi-user storage, AI provider integration, isolated generation, and deployment adapters will be introduced as independently testable capabilities.

## Run locally

```bash
npm install
npm run dev
```

## Build and check

```bash
npm run build
npm run typecheck
```

## Cost and licensing

The project prioritises open-source dependencies and free development workflows. Hosting, model inference, domains, and external infrastructure may incur costs depending on provider and usage. No paid service is assumed to be available.

## Product documentation

See `docs/PRODUCT_FOUNDATION.md` and `docs/ROADMAP.md`.
