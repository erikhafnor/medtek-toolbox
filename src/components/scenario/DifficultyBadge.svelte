<script lang="ts">
  interface Props {
    level: 1 | 2 | 3;
  }

  let { level }: Props = $props();

  const config = $derived(
    level === 1
      ? { bg: 'bg-green-100 text-green-800 border-green-200', label: 'Level 1 — Basic' }
      : level === 2
        ? { bg: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: 'Level 2 — Multi-system' }
        : { bg: 'bg-red-100 text-red-800 border-red-200', label: 'Level 3 — Intermittent' }
  );
</script>

<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border {config.bg}">
  {config.label}
</span>
