<script lang="ts">
	import { ClockIcon, PaidIcon, EditSquareIcon, Archive2Icon, DeleteIcon } from '$lib/components/Icons/iconIndex.ts';
	import type {Job} from '$lib/types.ts';

	let { name, assignedJob }: { name: string, assignedJob: Job } = $props();
	//TODO for delete to work there needs to be some delete mechanism
	//TODO same for archive

	let isActive = $state(false);
	let statusText = $derived(isActive ? 'aktivní' : 'pozastaveno');

	let price = $state(0.0);
	let materialPrice = $state(0.0);
	let priceRemnant = $state(0.0);

	let totalTime = $state(0.0);
	let passedTime = $state(0.0);

	let isHoveredEdit = $state(false);
	let isHoveredDelete = $state(false);
	let isHoveredArchive = $state(false);

	let colorEdit = $derived(isHoveredEdit ? '#facc15' : '#9ca3af');
	let colorArchive = $derived(isHoveredArchive ? '#facc15' : '#9ca3af');
	let colorDelete = $derived(isHoveredDelete ? '#f87171' : '#9ca3af');


	//TODO could just onfocus + onblur replace onmouse... events?
</script>


<div class="outer-shell">
	<div class="inner-shell">
		<div>
			<div class="section-header">
				<h4 class="section-header__text">{name}</h4>
				<span class="section-header__status">{statusText}</span>
			</div>
			<div class="small-status">
				<span>
					Celkem:
					<strong>{price}</strong>
					Kč
				</span>
				<span>|</span>
				<span>
					Materiál:
					<strong>{materialPrice}</strong>
					Kč
				</span>
			</div>
			<div class="measurement-container">
				<div class="measurement-container__item">
					<ClockIcon />
					<span>
						Zbývá: {passedTime} / {totalTime} h
					</span>
				</div>
				<div class="measurement-container__item">
					<PaidIcon />
					Zbytek rozpočtu: {priceRemnant} Kč
				</div>
			</div>
		</div>
		<div class="buttons">
			<button class="buttons__select">Vybrat</button>
			<button title="upravit zakázku" class="buttons__edit"
							onmouseover={() => isHoveredEdit = true}
							onfocus={() => isHoveredEdit = true}
							onmouseout={() => isHoveredEdit = false}
							onblur={() => isHoveredEdit = false}>Vybrat
				<EditSquareIcon color={colorEdit} />
			</button>
			<button title="archivovat" class="buttons__archive"
							onmouseover={() => isHoveredArchive = true}
							onfocus={() => isHoveredArchive = true}
							onmouseout={() => isHoveredArchive = false}
							onblur={() => isHoveredArchive = false}>
				<Archive2Icon color={colorArchive} />
			</button>
			<button title="smazat zakázku" class="buttons__delete"
							onmouseover={() => isHoveredDelete = true}
							onfocus={() => isHoveredDelete = true}
							onmouseout={() => isHoveredDelete = false}
							onblur={() => isHoveredDelete = false}>
				<DeleteIcon color={colorDelete} />
			</button>
		</div>
	</div>
	<div>
<!--		progress bar here-->
	</div>
	<div class="file-section">
		<div></div>
		<div></div>
	</div>
</div>

<style lang="scss">
  @use "sass:color";

  $spacing-4: 1rem;
  $rounded-lg: 0.5rem;
  $gray-600: #4b5563;
  $brand-surface: #1e293b; // Example custom color
  $transition-duration: 200ms;
  $transition-easing: cubic-bezier(0.4, 0, 0.2, 1);


  .outer-shell {
    // p-4
    padding: $spacing-4;

    // Background and Border (bg-brand-surface border-2 border-gray-600 rounded-lg)
    background-color: $brand-surface;
    border: 2px solid $gray-600;
    border-radius: $rounded-lg;

    // Transitions (transition-all duration-200)
    transition-property: all;
    transition-duration: $transition-duration;
    transition-timing-function: $transition-easing;
  }

  .inner-shell {
    display: flex;
    align-items: start;
    justify-content: space-between;
  }

  .section-header {
    display: flex;
    gap: 0.75rem;
    align-items: center;


    &__text {
      font-weight: 700;
      font-size: 1.125rem;
      line-height: 1.75rem;
      color: #C9D1D9;
    }

    $spacing-0-5: 0.125rem;
    $spacing-2: 0.5rem;
    $text-xs: 0.75rem;
    $font-bold: 700;
    $yellow-800: #92400e;
    $yellow-200: #fde68a;
    $rounded-full: 9999px;

    &__status {
      // px-2 py-0.5
      padding: $spacing-0-5 $spacing-2;

      // text-xs font-bold
      font-size: $text-xs;
      line-height: 1rem;
      font-weight: $font-bold;

      // rounded-full
      border-radius: $rounded-full;

      // bg-yellow-800 text-yellow-200
      background-color: $yellow-800;
      color: $yellow-200;
    }
  }

  $text-xs: 0.75rem;
  $gray-400: #9ca3af;
  $spacing-2: 0.5rem;

  .small-status {
    // text-xs
    font-size: $text-xs;
    line-height: 1rem;

    // text-gray-400
    color: $gray-400;

    // mb-2
    margin-bottom: $spacing-2;

    // space-x-2 (Applies margin to horizontal siblings)
    // You typically need the parent to be flex or inline-flex for space-x to work well
    display: inline-flex; // Often implied for space-x elements
    gap: $spacing-2;

    > * + * {
      margin-left: $spacing-2;
    }
  }

  $spacing-1-5: 0.375rem;
  $text-sm: 0.875rem;
  $font-medium: 500;
  $brand-text-secondary: #a1a1aa; // Example color

  .measurement-container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;

    &__item {
      display: flex;
      align-items: center;
      gap: $spacing-1-5;

      // text-sm font-medium
      font-size: $text-sm;
      line-height: 1.25rem;
      font-weight: $font-medium;

      // text-brand-text-secondary
      color: $brand-text-secondary;
    }
  }

  $spacing-1: 0.25rem;
  $spacing-3: 0.75rem;
  $text-sm: 0.875rem;
  $font-semibold: 600;
  $rounded-md: 0.375rem;
  $gray-600: #4b5563;
  $gray-500: #6b7280;
  $white: #ffffff;
  $transition-duration: 150ms;
  $transition-easing: cubic-bezier(0.4, 0, 0.2, 1);

  $spacing-1-5: 0.375rem;
  $gray-400: #9ca3af;
  $yellow-400: #facc15;

  .buttons {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &__select {
      // px-3 py-1
      padding: $spacing-1 $spacing-3;

      // text-sm font-semibold
      font-size: $text-sm;
      line-height: 1.25rem;
      font-weight: $font-semibold;

      // rounded-md
      border-radius: $rounded-md;

      // bg-gray-600 text-white
      background-color: $gray-600;
      color: $white;

      // transition-colors
      transition-property: background-color;
      transition-duration: $transition-duration;
      transition-timing-function: $transition-easing;

      // hover:bg-gray-500
      &:hover {
        background-color: $gray-500;
      }
    }

    //TODO the hover color will be removed
    .generic-yellow-button {
      // p-1.5
      padding: $spacing-1-5;

      // text-gray-400
      color: $gray-400;

      // transition-colors
      transition-property: color;
      transition-duration: $transition-duration;
      transition-timing-function: $transition-easing;

      // hover:text-yellow-400
      &:hover {
        color: $yellow-400;
      }
    }

    &__edit {
      @extend .generic-yellow-button;
    }

    &__archive {
      @extend .generic-yellow-button;
    }

    &__delete {
      @extend .generic-yellow-button;
    }
  }



  $spacing-4: 1rem;
  $gray-700: #374151; // Tailwind's default gray-700

	.file-section {
    // mt-4 pt-4
    margin-top: $spacing-4;
    padding-top: $spacing-4;

    // border-t border-gray-700/50
    border-top: 1px solid color.change($gray-700, $alpha: 0.5);

    // space-y-4
    // Applies 1rem margin-top to every direct child (*) that follows another direct child
    > * + * {
      margin-top: $spacing-4;
    }
	}
</style>