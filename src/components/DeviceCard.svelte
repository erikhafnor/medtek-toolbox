<script lang="ts">
  interface Props {
    title: string;
    href: string;
    icon: string;
    color: string;
  }

  let { title, href, icon, color }: Props = $props();
</script>

<a
  {href}
  class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white transition-transform duration-150 hover:scale-105 hover:shadow-md"
  style="background-color: {color};"
>
  <span class="text-base leading-none">{icon}</span>
  <span>{title}</span>
</a>
