<script lang="ts">
	import {DraftIcon, DeleteIcon} from '$lib/components/Icons/iconIndex.ts';

	let { name } = $props();

	let isHoveredDelete = $state(false);
	let colorDelete = $derived(isHoveredDelete ? "#f87171" : "#9ca3af");

</script>


<div class="container">
	<button class="interactive-text-link">
		<DraftIcon />
		{name}
	</button>
	<button>
		<DeleteIcon color={colorDelete} />
	</button>
</div>

<style lang="scss">
  @use "sass:color";

  $spacing-2: 0.5rem;
  $gray-700: #374151;
  $rounded-default: 0.25rem;
  $spacing-2: 0.5rem;
  $text-sm: 0.875rem;
  $blue-300: #93c5fd;

  .container {
    // flex items-center justify-between
    display: flex;
    align-items: center;
    justify-content: space-between;

    // bg-gray-700/50
    background-color: color.change($gray-700, $alpha: 0.5);

    // p-2
    padding: $spacing-2;

    // rounded
    border-radius: $rounded-default;
  }

  .interactive-text-link {
    // flex items-center gap-2
    display: flex;
    align-items: center;
    gap: $spacing-2;

    // text-sm
    font-size: $text-sm;
    line-height: 1.25rem;

    // text-blue-300
    color: $blue-300;

    // Optional transition for smoother text-decoration appearance
    transition: text-decoration-color 150ms ease-in-out;

    // hover:underline
    &:hover {
      text-decoration: underline;
    }
  }
</style>