<script lang="ts">
  interface Props {
    currentLocale: 'en' | 'no';
    alternateUrl: string;
  }

  let { currentLocale, alternateUrl }: Props = $props();
</script>

<a href={alternateUrl} class="text-sm font-medium text-gray-600 hover:text-gray-900">
  {#if currentLocale === 'en'}
    EN | <strong>NO</strong>
  {:else}
    <strong>EN</strong> | NO
  {/if}
</a>
