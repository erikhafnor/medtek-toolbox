import { describe, it, expect } from 'vitest';
import { createScenarioState, selectChoice, getScore, isComplete, getCurrentStep } from '../../src/lib/scenario-logic';

const mockSteps = [
  {
    type: 'multiple-choice' as const,
    id: 'step1',
    question: 'What do you do?',
    choices: [
      { text: 'Wrong', correct: false, feedback: 'Nope' },
      { text: 'Right', correct: true, feedback: 'Yes' },
    ],
  },
  {
    type: 'multiple-choice' as const,
    id: 'step2',
    question: 'Next?',
    choices: [
      { text: 'Right', correct: true, feedback: 'Yes' },
      { text: 'Wrong', correct: false, feedback: 'Nope' },
    ],
  },
];

describe('scenario-logic', () => {
  it('initializes at step 0 with no answers', () => {
    const state = createScenarioState(mockSteps);
    expect(state.currentStepIndex).toBe(0);
    expect(state.answers).toEqual({});
    expect(isComplete(state)).toBe(false);
  });

  it('records answer and advances step', () => {
    let state = createScenarioState(mockSteps);
    state = selectChoice(state, 'step1', 1, true);
    expect(state.answers['step1']).toEqual({ choiceIndex: 1, correct: true });
    expect(state.currentStepIndex).toBe(1);
  });

  it('calculates score correctly', () => {
    let state = createScenarioState(mockSteps);
    state = selectChoice(state, 'step1', 1, true);   // correct
    state = selectChoice(state, 'step2', 1, false);   // wrong
    expect(getScore(state)).toEqual({ correct: 1, total: 2 });
  });

  it('marks complete after last step answered', () => {
    let state = createScenarioState(mockSteps);
    state = selectChoice(state, 'step1', 0, false);
    state = selectChoice(state, 'step2', 0, true);
    expect(isComplete(state)).toBe(true);
  });

  it('getCurrentStep returns correct step', () => {
    let state = createScenarioState(mockSteps);
    expect(getCurrentStep(state, mockSteps).id).toBe('step1');
    state = selectChoice(state, 'step1', 0, false);
    expect(getCurrentStep(state, mockSteps).id).toBe('step2');
  });
});
