# Integration tests

These run the SDK against a compatible endpoint rather than mocks. They validate
the real transports and authentication flow.

## Running

From `sdk/typescript/`, optionally point the smoke tests at an endpoint:

```bash
HTTP_ADDRESS=http://localhost:8080 WEBSOCKET_ADDRESS=ws://localhost:3000/ws \
npm run test:integration
```

Both variables are optional; the local network defaults are used when omitted.
The smoke test auto-skips every case if the endpoint is unreachable.

## What must stay out of `src/`

Test-only setup must stay outside `src/`. The published SDK (`src/` → `dist/`)
must never depend on it; the leak guard (`npm run guard`) enforces that `src/`
imports nothing outside itself.
