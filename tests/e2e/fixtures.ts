// Identity for students invented by the e2e suite.
//
// The booking tests write to the real Neon database, which is shared with
// production, so every test booking must be recognisable as one. The teardown
// deletes exactly what this helper creates — keeping both sides on the same
// constant is what stops a cleanup rule from drifting away from the tests and
// either missing rows or, far worse, matching a real student.

/** Marks a booking as belonging to the test suite. Never use as a real name. */
export const E2E_STUDENT_PREFIX = 'E2E';

export interface TestStudent {
  name: string;
  email: string;
}

/**
 * A student unique to this moment, so repeat and parallel runs never collide
 * on the one-seat-per-lab rule.
 */
export function testStudent(): TestStudent {
  const id = `${E2E_STUDENT_PREFIX}${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  return { name: id, email: `${id.toLowerCase()}@stud.uis.no` };
}
