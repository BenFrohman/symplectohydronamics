/-
  Copyright (c) 2026 Benjamin Stanley Frohman.
  Author: Benjamin Stanley Frohman (@Investor0x / GitHub BenFrohman)
-/

import Mathlib.Data.Fin.Basic
import Mathlib.Tactic

/-- Bounded letter counts. -/
structure Counts where
  s : Fin 6
  n : Fin 5
  e : Fin 5
  a : Fin 5
  o : Fin 4
  r : Fin 4
  m : Fin 3
  t : Fin 3
  l : Fin 2
  p : Fin 2
  i : Fin 2
  h : Fin 2
  u : Fin 2
deriving DecidableEq, Repr

namespace Counts

def zero : Counts := ⟨0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0⟩

/-- Total remaining letters (termination measure). -/
def sum (c : Counts) : Nat :=
  c.s.val + c.n.val + c.e.val + c.a.val + c.o.val +
  c.r.val + c.m.val + c.t.val + c.l.val + c.p.val +
  c.i.val + c.h.val + c.u.val

end Counts

/-- Cardinality of the configuration space. -/
def stateCard : Nat := 6 * 5^3 * 4^2 * 3^2 * 2^5

theorem stateCard_eq : stateCard = 3456000 := by
  native_decide

/-- Simple inductive reachability. -/
inductive Reachable : Counts → Prop where
  | base : Reachable Counts.zero
  | step (c : Counts) : Reachable c → Reachable c

example : Reachable Counts.zero := Reachable.base

#check stateCard_eq
#eval stateCard
