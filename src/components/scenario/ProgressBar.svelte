<script lang="ts">
  interface Props {
    currentStep: number;
    totalSteps: number;
    stepLabels: string[];
  }

  let { currentStep, totalSteps, stepLabels }: Props = $props();
</script>

<div class="w-full">
  <div class="flex items-center">
    {#each stepLabels as label, i}
      {@const stepNum = i}
      {@const isCompleted = stepNum < currentStep}
      {@const isCurrent = stepNum === currentStep}

      <!-- Step dot -->
      <div class="flex flex-col items-center">
        <div
          class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300
            {isCompleted
              ? 'bg-green-500 border-green-500 text-white'
              : isCurrent
                ? 'bg-white border-blue-500 text-blue-600 ring-2 ring-blue-200'
                : 'bg-gray-100 border-gray-300 text-gray-400'}"
        >
          {#if isCompleted}
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          {:else}
            {stepNum + 1}
          {/if}
        </div>
        <span
          class="mt-1 text-xs text-center max-w-16 leading-tight hidden sm:block
            {isCompleted ? 'text-green-600 font-medium' : isCurrent ? 'text-blue-600 font-medium' : 'text-gray-400'}"
        >
          {label}
        </span>
      </div>

      <!-- Connector line (not after last step) -->
      {#if i < stepLabels.length - 1}
        <div
          class="flex-1 h-0.5 mx-1 transition-all duration-300
            {stepNum < currentStep ? 'bg-green-400' : 'bg-gray-200'}"
        ></div>
      {/if}
    {/each}
  </div>
</div>
