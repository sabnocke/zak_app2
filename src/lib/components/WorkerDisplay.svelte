<script lang="ts">
	import {AddUserIcon} from '$lib/components/Icons/iconIndex.ts';
	import OneWorker from '$lib/components/OneWorker.svelte';
	import { employees } from '$lib/stores.svelte.ts';
	import { Employee } from '$lib/class/SmallClasses.ts';

	function createNewWorker() {
		const placeholderName = `Zaměstnanec ${employees.length}`;

		const newest = Employee.new(placeholderName);
		employees.push(newest);

		//TODO add addWorker() call here...
	}

</script>

<div>
	<div class="header-container">
		<h3 class="section-header">Zaměstnanci</h3>
		<button class="button-small-success" onclick={createNewWorker}>
			<AddUserIcon />
			<span>Přidat zaměstnance</span>
		</button>
	</div>
	<div class="space-y-3-parent listing">
		{#each employees as employee (employee.id)}
			<OneWorker name={employee.name} />
		{/each}
	</div>
</div>

<style lang="scss">
	//TODO extract common parts between this and WorkDisplay.svelte
  @use "sass:color";

  $brand-surface: #4318ff;
  $blur-sm: 4px;
  $rounded-xl: 0.75rem;
  $gray-700: #374151;

  $spacing-1: 0.25rem;
  $spacing-2: 0.5rem;
  $spacing-3: 0.75rem;
  $spacing-4: 1rem;
  $spacing-6: 1.5rem;
  $spacing-8: 2rem;

  $animation-duration: 0.5s;
  $sm-breakpoint: 640px;

  $green-600: #059669;
  $green-500: #10b981;
  $white: #ffffff;
  $spacing-half: 0.125rem; // Base for 0.5rem (gap-2)
  $spacing-1-5: 0.375rem; // py-1.5
  $spacing-3: 0.75rem; // px-3
  $rounded-lg: 0.5rem;
  $font-bold: 700;
  $transition-duration: 150ms;
  $transition-easing: cubic-bezier(0.4, 0, 0.2, 1);

  .frosted-card {
    // Background and Filter (bg-brand-surface/50 backdrop-blur-sm)
    // Using transparentize() for the /50 opacity
    background-color: color.change($brand-surface, $alpha: 0.5);
    backdrop-filter: blur($blur-sm);

    // Border (rounded-xl border border-gray-700)
    border-radius: $rounded-xl;
    border: 1px solid $gray-700;

    // Shadow (shadow-2xl)
    box-shadow: 0 0 #0000, 0 0 #0000, 0 25px 50px -12px rgba(0, 0, 0, 0.25);

    // Padding (p-6 and sm:p-8)
    padding: $spacing-6;
    @media (min-width: $sm-breakpoint) {
      padding: $spacing-8; // Assuming p-8 is 2rem
    }

    // Vertical Spacing (space-y-8)
    > * + * {
      margin-top: $spacing-8;
    }

    // Animation (animate-slide-in)
    animation: slide-in $animation-duration ease-out forwards;
  }

	.header-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}

	.section-header {
		font-weight: 700;
		font-size: 1.25rem;
		line-height: 1.75rem;
	}

  .button-small-success {
    // Layout (flex items-center gap-2)
    display: flex;
    align-items: center;
    gap: $spacing-half * 4; // gap: 0.5rem

    // Sizing and Typography
    font-weight: $font-bold;
    padding: $spacing-1-5 $spacing-3; // py-1.5 px-3
    border-radius: $rounded-lg;

    // Colors (bg-green-600 text-white)
    background-color: $green-600;
    color: $white;

    // Transitions (transition-colors)
    transition-property: background-color;
    transition-duration: $transition-duration;
    transition-timing-function: $transition-easing;

    // Hover State (hover:bg-green-500)
    &:hover {
      background-color: $green-500;
    }
  }

  $spacing-3: 0.75rem;

  .space-y-3-parent {
    // space-y-3
    // Selects every child element (*) that is immediately preceded by another child element (*)
    > * + * {
      margin-top: $spacing-3;
    }
  }

	.listing {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
</style>