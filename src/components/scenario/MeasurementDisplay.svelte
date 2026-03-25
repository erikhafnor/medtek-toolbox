<script lang="ts">
  interface Reading {
    setting: string;
    delivered: string | null;
    status: 'pass' | 'fail' | 'warning';
    error?: string;
    charge_time?: string;
    spec?: string;
  }

  interface Props {
    tool: string;
    load?: string;
    readings: Reading[];
  }

  let { tool, load, readings }: Props = $props();

  function statusColor(status: 'pass' | 'fail' | 'warning') {
    if (status === 'pass') return 'text-green-400';
    if (status === 'fail') return 'text-red-400';
    return 'text-yellow-400';
  }

  function statusIcon(status: 'pass' | 'fail' | 'warning') {
    if (status === 'pass') return '✓';
    if (status === 'fail') return '✗';
    return '⚠';
  }

  function statusBorder(status: 'pass' | 'fail' | 'warning') {
    if (status === 'pass') return 'border-green-800';
    if (status === 'fail') return 'border-red-800';
    return 'border-yellow-800';
  }

  function statusBg(status: 'pass' | 'fail' | 'warning') {
    if (status === 'pass') return 'bg-green-950/40';
    if (status === 'fail') return 'bg-red-950/40';
    return 'bg-yellow-950/40';
  }
</script>

<div class="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden font-mono text-sm">
  <!-- Header -->
  <div class="bg-gray-800 px-4 py-3 border-b border-gray-700 flex items-center gap-3">
    <div class="flex gap-1.5">
      <div class="w-3 h-3 rounded-full bg-red-500/70"></div>
      <div class="w-3 h-3 rounded-full bg-yellow-500/70"></div>
      <div class="w-3 h-3 rounded-full bg-green-500/70"></div>
    </div>
    <span class="text-gray-300 text-xs">{tool}</span>
    {#if load}
      <span class="ml-auto text-gray-500 text-xs">Load: {load}</span>
    {/if}
  </div>

  <!-- Readings -->
  <div class="p-4 space-y-3">
    {#each readings as reading}
      <div class="rounded border {statusBorder(reading.status)} {statusBg(reading.status)} px-3 py-2.5">
        <div class="flex items-start justify-between gap-2">
          <span class="text-gray-400 text-xs leading-relaxed">{reading.setting}</span>
          <div class="flex items-center gap-2 flex-shrink-0">
            {#if reading.delivered}
              <span class="text-white font-semibold">{reading.delivered}</span>
            {/if}
            <span class="font-bold text-base {statusColor(reading.status)}">{statusIcon(reading.status)}</span>
          </div>
        </div>

        {#if reading.error}
          <div class="mt-1.5 text-red-400 text-xs italic">{reading.error}</div>
        {/if}

        {#if reading.charge_time}
          <div class="mt-1.5 flex items-center gap-2 text-xs">
            <span class="text-gray-500">Charge time:</span>
            <span class="{reading.spec && reading.charge_time ? 'text-yellow-400' : 'text-gray-300'} font-medium">
              {reading.charge_time}
            </span>
            {#if reading.spec}
              <span class="text-gray-600">(spec: {reading.spec})</span>
            {/if}
          </div>
        {/if}
      </div>
    {/each}
  </div>
</div>
