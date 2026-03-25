<script lang="ts">
  interface Props {
    placeholder: string;
    locale: 'en' | 'no';
  }

  let { placeholder, locale }: Props = $props();

  let query = $state('');

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/${locale}/search/?q=${encodeURIComponent(query.trim())}`;
    }
  }
</script>

<form onsubmit={handleSubmit} class="w-full max-w-2xl mx-auto">
  <div class="relative flex items-center">
    <svg
      class="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
      />
    </svg>
    <input
      type="text"
      bind:value={query}
      {placeholder}
      class="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
    />
    <button
      type="submit"
      class="absolute right-2 px-4 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-blue-700 transition-colors"
    >
      {locale === 'en' ? 'Search' : 'Søk'}
    </button>
  </div>
</form>
