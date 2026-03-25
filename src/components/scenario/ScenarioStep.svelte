<script lang="ts">
  import type { ScenarioStep, Answer } from '../../lib/scenario-logic';
  import MeasurementDisplay from './MeasurementDisplay.svelte';

  interface Props {
    step: ScenarioStep;
    answer?: Answer;
    onSelect?: (choiceIndex: number) => void;
    labHandoffLabel: string;
    hintLabel: string;
  }

  let { step, answer, onSelect, labHandoffLabel, hintLabel }: Props = $props();

  let hintOpen = $state(false);

  const isAnswered = $derived(answer !== undefined);

  function choiceLetters(index: number): string {
    return String.fromCharCode(65 + index); // A, B, C, D...
  }

  function choiceClasses(index: number): string {
    if (!isAnswered) {
      return 'bg-white border-gray-200 text-gray-800 hover:border-blue-400 hover:translate-x-1 cursor-pointer';
    }
    if (step.type === 'multiple-choice') {
      const isCorrect = step.choices[index].correct;
      const isSelected = answer?.choiceIndex === index;

      if (isCorrect) {
        return 'bg-green-50 border-green-400 text-green-900 cursor-default';
      }
      if (isSelected && !isCorrect) {
        return 'bg-red-50 border-red-400 text-red-900 cursor-default';
      }
      return 'bg-gray-50 border-gray-200 text-gray-400 cursor-default opacity-60';
    }
    return 'cursor-default';
  }
</script>

{#if step.type === 'multiple-choice'}
  <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
    <!-- Question header -->
    <div class="px-6 pt-6 pb-4">
      <div class="flex items-start gap-3">
        <div class="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
          <svg class="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p class="text-base font-semibold text-gray-900 leading-snug">{step.question}</p>
      </div>
    </div>

    <!-- Hint (collapsible) -->
    {#if step.hint}
      <div class="px-6 pb-4">
        <button
          class="w-full text-left"
          onclick={() => (hintOpen = !hintOpen)}
        >
          <div class="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 text-sm hover:bg-amber-100 transition-colors">
            <svg class="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.35.35A3.007 3.007 0 0118 14.76V18a1 1 0 01-1 1h-2a1 1 0 01-1-1v-.97a3.007 3.007 0 01-.878-2.124 5 5 0 010-.9z" />
            </svg>
            <span class="font-medium">{hintLabel}</span>
            <svg
              class="w-4 h-4 ml-auto transition-transform {hintOpen ? 'rotate-180' : ''}"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>
        {#if hintOpen}
          <div class="mt-2 px-3 py-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-sm leading-relaxed">
            {step.hint}
          </div>
        {/if}
      </div>
    {/if}

    <!-- Choices -->
    <div class="px-6 pb-6 space-y-2.5">
      {#each step.choices as choice, i}
        <button
          class="w-full text-left rounded-lg border-2 px-4 py-3 transition-all duration-150 {choiceClasses(i)}"
          disabled={isAnswered}
          onclick={() => onSelect?.(i)}
        >
          <div class="flex items-start gap-3">
            <span class="flex-shrink-0 w-6 h-6 rounded-full bg-current/10 flex items-center justify-center text-xs font-bold border border-current/20">
              {choiceLetters(i)}
            </span>
            <span class="text-sm leading-relaxed">{choice.text}</span>

            <!-- Status icon when answered -->
            {#if isAnswered}
              {#if choice.correct}
                <svg class="w-5 h-5 ml-auto flex-shrink-0 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              {:else if answer?.choiceIndex === i}
                <svg class="w-5 h-5 ml-auto flex-shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              {/if}
            {/if}
          </div>
        </button>

        <!-- Feedback -->
        {#if isAnswered && (choice.correct || answer?.choiceIndex === i)}
          <div
            class="ml-4 px-3 py-2 rounded-lg text-sm italic leading-relaxed
              {choice.correct ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-red-50 border border-red-200 text-red-800'}"
          >
            {choice.feedback}
          </div>
        {/if}
      {/each}
    </div>
  </div>

{:else if step.type === 'lab-handoff'}
  <div class="space-y-4">
    <!-- Measurement display -->
    <MeasurementDisplay
      tool={step.simulated_data.tool}
      load={step.simulated_data.load}
      readings={step.simulated_data.readings}
    />

    <!-- Lab handoff callout -->
    <div class="rounded-xl overflow-hidden bg-gradient-to-r from-indigo-600 to-blue-700 p-4 text-white">
      <div class="flex items-start gap-3">
        <div class="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        </div>
        <div>
          <p class="font-semibold text-sm mb-1">{labHandoffLabel}</p>
          <p class="text-blue-100 text-sm leading-relaxed">{step.instruction}</p>
        </div>
      </div>
    </div>
  </div>
{/if}
