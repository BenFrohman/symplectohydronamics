/-
Copyright (c) 2026 Benjamin Stanley Frohman. All rights reserved.
Released under Apache 2.0 license as described in the file LICENSE.
Authors: Benjamin Stanley Frohman
-/

import Lake

/-!
# library.lakefile

Machine-checked Lean 4 module.
-/

open Lake DSL

package «AnagramReachability»

@[default_target]
lean_lib «AnagramReachability» where
  roots := #[`AnagramReachability]
