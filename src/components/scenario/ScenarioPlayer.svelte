<script lang="ts">
  import type { ScenarioStep as ScenarioStepType } from '../../lib/scenario-logic';
  import { createScenarioState, selectChoice, getScore, isComplete } from '../../lib/scenario-logic';
  import DifficultyBadge from './DifficultyBadge.svelte';
  import ProgressBar from './ProgressBar.svelte';
  import ScenarioStepCard from './ScenarioStep.svelte';

  interface LearningPoint {
    text: string;
    source?: string;
    source_type?: 'standard' | 'incident-data' | 'literature' | 'best-practice';
  }

  interface Briefing {
    caller: string;
    location: string;
    facility: string;
    time: string;
    message: string;
    urgency: 'low' | 'medium' | 'high';
    context: string[];
  }

  interface ScenarioData {
    id: string;
    title: string;
    device: string;
    category: string;
    level: 1 | 2 | 3;
    estimated_time: string;
    has_lab_handoff: boolean;
    briefing: Briefing;
    steps: ScenarioStepType[];
    learning_points: LearningPoint[];
  }

  interface Props {
    scenario: ScenarioData;
    locale: 'en' | 'no';
  }

  let { scenario, locale }: Props = $props();

  const labels = {
    en: {
      briefing: 'Briefing',
      hint: 'Click for hint',
      labHandoff: 'Hands-on: Perform this test in the lab',
      learning: 'Key Takeaways',
      complete: 'Scenario complete',
      correctAnswers: 'correct answers',
      caller: 'Caller',
      facility: 'Facility',
      time: 'Time',
      urgencyHigh: 'Urgent',
      urgencyMedium: 'Medium priority',
      urgencyLow: 'Low priority',
      score: 'Score',
      sources: 'Sources',
      stepLabel: 'Step',
    },
    no: {
      briefing: 'Situasjonsbeskrivelse',
      hint: 'Klikk for hint',
      labHandoff: 'Praktisk: Utfør denne testen på lab',
      learning: 'Viktige læringspunkter',
      complete: 'Scenario fullført',
      correctAnswers: 'riktige svar',
      caller: 'Innringer',
      facility: 'Avdeling',
      time: 'Tidspunkt',
      urgencyHigh: 'Haster',
      urgencyMedium: 'Medium prioritet',
      urgencyLow: 'Lav prioritet',
      score: 'Poengsum',
      sources: 'Kilder',
      stepLabel: 'Steg',
    },
  };

  const lbl = $derived(labels[locale]);

  let state = $state(createScenarioState(scenario.steps));

  const completed = $derived(isComplete(state));
  const score = $derived(getScore(state));

  // Progress: briefing (index 0) + each step
  const stepLabels = $derived([
    lbl.briefing,
    ...scenario.steps.map((s, i) => `${lbl.stepLabel} ${i + 1}`),
  ]);

  // currentStep in progress: 0 = on briefing, 1+ = on step N-1
  // After briefing we're at progress step 1
  const progressStep = $derived(Math.min(state.currentStepIndex + 1, stepLabels.length - 1));

  function handleSelect(stepIndex: number, choiceIndex: number) {
    const step = scenario.steps[stepIndex];
    if (step.type !== 'multiple-choice') return;
    const isCorrect = step.choices[choiceIndex].correct;
    state = selectChoice(state, step.id, choiceIndex, isCorrect);
  }

  function urgencyBadge(urgency: 'low' | 'medium' | 'high') {
    if (urgency === 'high') return 'bg-red-100 text-red-700 border-red-200';
    if (urgency === 'medium') return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    return 'bg-gray-100 text-gray-600 border-gray-200';
  }

  function urgencyLabel(urgency: 'low' | 'medium' | 'high') {
    if (urgency === 'high') return lbl.urgencyHigh;
    if (urgency === 'medium') return lbl.urgencyMedium;
    return lbl.urgencyLow;
  }

  function sourceTypeBadge(type?: string) {
    if (type === 'standard') return 'bg-blue-100 text-blue-700 border-blue-200';
    if (type === 'incident-data') return 'bg-red-100 text-red-700 border-red-200';
    if (type === 'literature') return 'bg-purple-100 text-purple-700 border-purple-200';
    return 'bg-gray-100 text-gray-600 border-gray-200';
  }
</script>

<div class="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
  <!-- Header -->
  <div class="rounded-2xl overflow-hidden bg-gradient-to-r from-slate-800 to-blue-700 text-white p-6">
    <div class="flex flex-wrap items-start gap-3 mb-3">
      <DifficultyBadge level={scenario.level} />
      <span class="text-blue-200 text-sm font-medium">{scenario.device}</span>
      <span class="ml-auto text-blue-200 text-sm">{scenario.estimated_time}</span>
    </div>
    <h1 class="text-2xl font-bold leading-tight">{scenario.title}</h1>
  </div>

  <!-- Progress bar -->
  <div class="bg-white rounded-xl border border-gray-200 shadow-sm px-6 py-5">
    <ProgressBar
      currentStep={progressStep}
      totalSteps={stepLabels.length}
      stepLabels={stepLabels}
    />
  </div>

  <!-- Briefing card -->
  <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
    <div class="bg-slate-50 border-b border-gray-200 px-6 py-3 flex items-center gap-2">
      <svg class="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
      <span class="font-semibold text-slate-700 text-sm">{lbl.briefing}</span>
    </div>

    <div class="p-6">
      <!-- Caller info -->
      <div class="flex flex-wrap gap-4 mb-4 text-sm">
        <div>
          <span class="text-gray-500">{lbl.caller}: </span>
          <span class="font-medium text-gray-900">{scenario.briefing.caller}</span>
        </div>
        <div>
          <span class="text-gray-500">{lbl.facility}: </span>
          <span class="font-medium text-gray-900">{scenario.briefing.facility} — {scenario.briefing.location}</span>
        </div>
        <div>
          <span class="text-gray-500">{lbl.time}: </span>
          <span class="font-medium text-gray-900">{scenario.briefing.time}</span>
        </div>
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border {urgencyBadge(scenario.briefing.urgency)}">
          {urgencyLabel(scenario.briefing.urgency)}
        </span>
      </div>

      <!-- Message bubble -->
      <div class="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4 relative">
        <div class="absolute -top-2 left-6 w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-blue-200"></div>
        <p class="text-gray-800 text-sm leading-relaxed italic">"{scenario.briefing.message}"</p>
      </div>

      <!-- Context chips -->
      {#if scenario.briefing.context.length > 0}
        <div class="flex flex-wrap gap-2">
          {#each scenario.briefing.context as ctx}
            <span class="text-xs bg-gray-100 text-gray-600 rounded-full px-3 py-1 border border-gray-200">
              {ctx}
            </span>
          {/each}
        </div>
      {/if}
    </div>
  </div>

  <!-- Steps (progressive reveal) -->
  {#each scenario.steps as step, i}
    {#if i <= state.currentStepIndex}
      <ScenarioStepCard
        {step}
        answer={state.answers[step.id]}
        onSelect={(choiceIndex) => handleSelect(i, choiceIndex)}
        labHandoffLabel={lbl.labHandoff}
        hintLabel={lbl.hint}
      />
    {/if}
  {/each}

  <!-- Completion card -->
  {#if completed}
    <div class="bg-white rounded-xl border border-green-300 shadow-sm overflow-hidden">
      <div class="bg-green-50 border-b border-green-200 px-6 py-4 flex items-center gap-3">
        <div class="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
          <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div class="flex-1">
          <h2 class="font-bold text-green-900">{lbl.complete}</h2>
        </div>
        <div class="text-right">
          <div class="text-2xl font-bold text-green-700">{score.correct}/{score.total}</div>
          <div class="text-xs text-green-600">{lbl.correctAnswers}</div>
        </div>
      </div>

      <!-- Learning points -->
      <div class="p-6">
        <h3 class="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <svg class="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          {lbl.learning}
        </h3>

        <ul class="space-y-4">
          {#each scenario.learning_points as point}
            <li class="flex gap-3">
              <div class="flex-shrink-0 w-1.5 rounded-full bg-green-400 self-stretch"></div>
              <div class="flex-1">
                <p class="text-sm text-gray-800 leading-relaxed">{point.text}</p>
                {#if point.source || point.source_type}
                  <div class="mt-1.5 flex flex-wrap gap-1.5">
                    {#if point.source}
                      <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                        {point.source}
                      </span>
                    {/if}
                    {#if point.source_type}
                      <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border {sourceTypeBadge(point.source_type)}">
                        {point.source_type}
                      </span>
                    {/if}
                  </div>
                {/if}
              </div>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  {/if}
</div>
