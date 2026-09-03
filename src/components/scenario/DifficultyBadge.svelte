<script lang="ts">
  import { t } from '../../lib/i18n';
  import type { Locale } from '../../lib/i18n';

  interface Props {
    level: 1 | 2 | 3;
    locale?: Locale;
  }

  let { level, locale = 'en' }: Props = $props();

  const config = $derived(
    level === 1
      ? { bg: 'bg-green-100 text-green-800 border-green-200', label: t(locale, 'level.1') }
      : level === 2
        ? { bg: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: t(locale, 'level.2') }
        : { bg: 'bg-red-100 text-red-800 border-red-200', label: t(locale, 'level.3') }
  );
</script>

<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border {config.bg}">
  {config.label}
</span>
