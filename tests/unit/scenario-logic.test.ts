import { describe, it, expect } from 'vitest';
import { createScenarioState, selectChoice, advanceStep, getScore, isComplete, getCurrentStep } from '../../src/lib/scenario-logic';

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

describe('lab-handoff steps', () => {
  const stepsWithHandoff = [
    mockSteps[0],
    {
      type: 'lab-handoff' as const,
      id: 'measurement',
      instruction: 'Run the delivered energy test.',
      simulated_data: {
        tool: 'Fluke Impulse 7000DP',
        readings: [{ setting: '50J', delivered: '47J', status: 'pass' as const }],
      },
    },
    mockSteps[1],
  ];

  it('advanceStep moves past a step that takes no answer', () => {
    let state = createScenarioState(stepsWithHandoff);
    state = selectChoice(state, 'step1', 1, true);
    expect(getCurrentStep(state, stepsWithHandoff).type).toBe('lab-handoff');

    state = advanceStep(state);
    expect(state.currentStepIndex).toBe(2);
    expect(getCurrentStep(state, stepsWithHandoff).id).toBe('step2');
  });

  it('a scenario containing a lab-handoff can still be completed', () => {
    let state = createScenarioState(stepsWithHandoff);
    state = selectChoice(state, 'step1', 1, true);
    state = advanceStep(state);
    state = selectChoice(state, 'step2', 0, true);
    expect(isComplete(state)).toBe(true);
  });

  it('scores only the steps that were answered', () => {
    let state = createScenarioState(stepsWithHandoff);
    state = selectChoice(state, 'step1', 1, true);
    state = advanceStep(state);
    state = selectChoice(state, 'step2', 1, false);
    expect(getScore(state)).toEqual({ correct: 1, total: 2 });
  });

  it('advanceStep never runs past the end', () => {
    let state = createScenarioState(stepsWithHandoff);
    state = advanceStep(advanceStep(advanceStep(advanceStep(state))));
    expect(state.currentStepIndex).toBe(3);
  });
});
