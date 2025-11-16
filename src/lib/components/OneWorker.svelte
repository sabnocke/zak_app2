<script lang="ts">
	import { UserIcon, EditSquareIcon, ClockIcon, CheckCircle } from '$lib/components/Icons/iconIndex.ts';
	import { employees } from '$lib/stores.svelte.ts';
	import { tick } from 'svelte';

	let { name = '~~MISSING~~' }: { name: string } = $props();

	// svelte-ignore non_reactive_update
	let focusTrg: HTMLInputElement;
	// svelte-ignore non_reactive_update
	let newName: string = '';

	let isDisabled = true; //TODO link to job being selected
	let isEditing = $state(false);
	let excludeButtonDown = $state(false);

	let isHoveredEdit = $state(false);
	let colorEdit = $derived(isHoveredEdit ? '#facc15' : '#9ca3af');

	let isHovered = $state(false);
	let color = $derived(isHovered ? '#4ade80' : '#d1d5db');

	async function changeName() {
		isEditing = true;

		await tick();
		console.log(focusTrg);
		focusTrg.focus();
	}

	function doChangeName() {
		const employee = employees.find(employee => employee.name === name);
		if (!employee) {
			alert('ERROR: failed to propagate change of name; altered employee doesn\'t exist in store.');
			return;
		}
		const correctName = newName !== '' ? newName.trim() : name;
		employee.name = correctName;
		name = correctName;
		focusTrg.nodeValue = '';
		focusTrg.placeholder = correctName;
		isEditing = false;
	}

	async function handleInputBlur() {
		await tick();

		if (!excludeButtonDown) {
			doChangeName();
			return;
		}

		excludeButtonDown = false;
		isHovered = false;
		isHoveredEdit = false;
	}

</script>


{#if !isEditing}
	<div class="item">
		<div class="first-container">
			<UserIcon width="36px" height="36px" />
			<span>{name}</span>
		</div>
		<div class="second-container">
			<button class="icon-link" onclick={changeName}
							onmouseover={() => isHoveredEdit = true}
							onfocus={() => isHoveredEdit = true}

							onmouseout={() => isHoveredEdit = false}
							onblur={() => isHoveredEdit = false}
			>
				<EditSquareIcon color={colorEdit} />
			</button>
			<button class="button-small-success-fixed" disabled={isDisabled}>
				<ClockIcon />
				<span>Přihlásit</span>
			</button>
		</div>
	</div>
{:else}
	<div class="item-alt">
		<UserIcon width="36px" height="36px" />
		<input id="nameSource" type="text"
					 placeholder={name}
					 class="name-change"
					 bind:this={focusTrg}
					 bind:value={newName}
					 onblur={handleInputBlur} />
		<button class="change-btn"
						onmouseenter={() => isHovered = true}
						onmouseleave={() => isHovered = false}
						onclick={() => excludeButtonDown = true}>
			<CheckCircle color={color} />
		</button>
	</div>
{/if}


<style lang="scss">
  $spacing-3: 0.75rem;
  $rounded-lg: 0.5rem;
  $gray-600: #4b5563;
  $brand-surface: #1e293b; // Example custom color
  $transition-duration: 200ms;
  $transition-easing: cubic-bezier(0.4, 0, 0.2, 1);

  .item {
    // Layout and Display (p-3 flex items-center justify-between)
    padding: $spacing-3;
    display: flex;
    align-items: center;
    justify-content: space-between;

    // Background and Border (bg-brand-surface border-2 border-gray-600 rounded-lg)
    background-color: $brand-surface;
    border: 2px solid $gray-600;
    border-radius: $rounded-lg;

    // Transitions (transition-all duration-200)
    transition-property: all;
    transition-duration: $transition-duration;
    transition-timing-function: $transition-easing;
  }

  .first-container {
    display: flex;
    align-items: center;
    flex-grow: 1;
    gap: 0.75rem;
  }

  .second-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  // Variables
  $w-32: 8rem;
  $text-sm: 0.875rem;
  $spacing-1-5: 0.375rem; // gap-1.5
  $spacing-2: 0.5rem; // py-2
  $spacing-3: 0.75rem; // px-3
  $font-bold: 700;
  $rounded-lg: 0.5rem;
  $duration-300: 300ms;
  $green-600: #059669;
  $green-500: #10b981;

  .button-small-success-fixed {
    // Sizing and Typography
    width: $w-32;
    font-size: $text-sm;
    line-height: 1.25rem; // From text-sm
    font-weight: $font-bold;

    // Layout
    display: flex;
    align-items: center;
    justify-content: center;
    gap: $spacing-1-5;

    // Padding
    padding: $spacing-2 $spacing-3;

    // Styling
    border-radius: $rounded-lg;
    background-color: $green-600;

    // Transitions
    transition-property: background-color;
    transition-duration: $duration-300;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

    // Hover State (hover:bg-green-500)
    &:hover {
      background-color: $green-500;
    }

    // Disabled State (disabled:opacity-50 disabled:cursor-not-allowed)
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  $spacing-1-5: 0.375rem;
  $gray-400: #9ca3af;
  $yellow-400: #facc15;

  .icon-link {
    // p-1.5
    padding: $spacing-1-5;

    // text-gray-400
    color: $gray-400;
		background-color: transparent;
		border: none !important;

    // Optional: Add transition property for smoothness
    transition: color 150ms ease-in-out;

    // hover:text-yellow-400
    &:hover {
      color: $yellow-400;
    }
  }

  $gray-700: #374151;

  .item-alt {
    // Layout and Display (p-3 flex items-center justify-between)
    padding: $spacing-3;
    display: flex;
    align-items: center;
    justify-content: space-around;

    // Background and Border (bg-brand-surface border-2 border-gray-600 rounded-lg)
    background-color: $brand-surface;
    border: 2px solid $gray-600;
    border-radius: $rounded-lg;

    // Transitions (transition-all duration-200)
    transition-property: all;
    transition-duration: $transition-duration;
    transition-timing-function: $transition-easing;
  }

  $gray-500: #6b7280;
  $white: #ffffff;
  $spacing-1: 0.25rem;
  $spacing-2: 0.5rem;
  $rounded-md: 0.375rem;

  .name-change {
    width: 100%;
		height: 2rem;
		font-size: 1rem;
    background-color: $gray-700;

    // border border-gray-500
    border: 1px solid $gray-500;

    // rounded-md
    border-radius: $rounded-md;

    // py-1 px-2
    padding: $spacing-1 $spacing-2;

    // text-white
    color: white;

    &:focus {
      outline: none;
    }
  }

  $spacing-1-5: 0.375rem;
  $gray-300: #d1d5db;
  $green-400: #4ade80;

  .change-btn {
    padding: $spacing-1-5;

    // text-gray-300
    color: $gray-300 !important;
    outline: none !important;
    border: none !important;
    background-color: transparent !important;

    // Add transition property for smoothness
    transition: color 150ms ease-in-out;

    cursor: pointer;
  }
</style>