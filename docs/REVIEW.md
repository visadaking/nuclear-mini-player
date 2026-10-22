# Review checklist: pass all five before any change ships

1. **Plain words.** UI strings and docs a non-technical friend follows.
2. **Host-tolerant.** Every `api.*` call feature-checked with fallback;
   older Nuclear versions must degrade, never crash.
3. **Proven, not claimed.** `node --check` clean, TEXT keys complete in
   all 5 languages, pure functions unit-tested, loaded in real Nuclear.
4. **Docs match code.** Settings/behavior changes update README +
   release notes together.
5. **Small and reviewable.** One concern per change, flat layout kept.
