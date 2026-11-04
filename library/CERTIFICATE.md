# Lean certificate: library/AnagramReachability.lean

- Toolchain: `leanprover/lean4:v4.34.0` (core Lean only; the unused Mathlib imports were removed).
- `stateCard_eq : stateCard = 3456000` (where `stateCard = 6 * 5^3 * 4^2 * 3^2 * 2^5`) is proved by `decide +kernel` (was `native_decide`).
- `#print axioms stateCard_eq`: does not depend on any axioms.
- No `sorry`, no `native_decide`, no `axiom` declarations. Enforced by `.github/workflows/certify.yml`.
