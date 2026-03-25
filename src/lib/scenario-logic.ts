export type Choice = {
  text: string;
  correct: boolean;
  feedback: string;
};

export type MultipleChoiceStep = {
  type: 'multiple-choice';
  id: string;
  question: string;
  hint?: string;
  choices: Choice[];
};

export type LabHandoffStep = {
  type: 'lab-handoff';
  id: string;
  instruction: string;
  simulated_data: {
    tool: string;
    load?: string;
    readings: Array<{
      setting: string;
      delivered: string | null;
      status: 'pass' | 'fail' | 'warning';
      error?: string;
      charge_time?: string;
      charge_time_spec?: string;
      charge_time_status?: 'pass' | 'fail' | 'warning';
    }>;
  };
};

export type ScenarioStep = MultipleChoiceStep | LabHandoffStep;

export type Answer = {
  choiceIndex: number;
  correct: boolean;
};

export type ScenarioState = {
  currentStepIndex: number;
  answers: Record<string, Answer>;
  totalSteps: number;
};

export function createScenarioState(steps: ScenarioStep[]): ScenarioState {
  return {
    currentStepIndex: 0,
    answers: {},
    totalSteps: steps.length,
  };
}

export function selectChoice(
  state: ScenarioState,
  stepId: string,
  choiceIndex: number,
  isCorrect: boolean
): ScenarioState {
  const nextIndex = Math.min(state.currentStepIndex + 1, state.totalSteps);
  return {
    ...state,
    answers: {
      ...state.answers,
      [stepId]: { choiceIndex, correct: isCorrect },
    },
    currentStepIndex: nextIndex,
  };
}

export function getScore(state: ScenarioState): { correct: number; total: number } {
  const answerValues = Object.values(state.answers);
  const correct = answerValues.filter((a) => a.correct).length;
  return { correct, total: answerValues.length };
}

export function isComplete(state: ScenarioState): boolean {
  return state.currentStepIndex >= state.totalSteps;
}

export function getCurrentStep(state: ScenarioState, steps: ScenarioStep[]): ScenarioStep {
  return steps[state.currentStepIndex];
}
