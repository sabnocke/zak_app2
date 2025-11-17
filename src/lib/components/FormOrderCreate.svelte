<script lang="ts">

	import {jobs} from '$lib/stores.svelte.ts';
	import type { Job } from '$lib/types';

	let name = $state("");
	let value = $state(0);
	let materialCost = $state(0);
	let rate = $state(0);

	function newJob() {
		const job: Job = {}
	}

</script>

<form action="" class="space-y-4-parent">
	<div>
		<label class="label">
			Název zakázky
			<input type="text" class="form-input" required bind:value={name} />
		</label>
	</div>
	<div class="grid-container">
		<div>
			<label class="label">
				Hodnota zakázky (Kč)
				<input type="number" required class="form-input" placeholder="50 000" bind:value={value} />
			</label>
		</div>
		<div>
			<label class="label">
				Hodnota materiálu (Kč)
				<input type="number" required class="form-input" placeholder="50 000" bind:value={materialCost} />
			</label>
		</div>
		<div>
			<label class="label">
				Hodinová sazba (Kč/hod)
				<input type="number" required class="form-input" placeholder="450" bind:value={rate} />
			</label>
		</div>
	</div>
	<div class="text-center-pt-2">
		<button type="submit" class="submit-btn">Vytvořit zakázku</button>
	</div>
</form>

<style lang="scss">

  $spacing-1: 0.25rem;
  $spacing-2: 0.5rem;
  $spacing-3: 0.75rem;
  $spacing-4: 1rem;
  $spacing-8: 2rem;

  $sm-breakpoint: 640px;
  $md-breakpoint: 768px;
  $lg-breakpoint: 1024px;

  $gray-800: #1f2937;
  $gray-700: #374151;
  $gray-600: #4b5563;

  $rounded-md: 0.375rem;
  $rounded-lg: 0.5rem;

  .label {
    display: block;

    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;

    color: #a1a1aa
  }

  .space-y-4-parent {
    > * + * {
      margin-top: $spacing-4;
    }
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: $spacing-4;

    @media (min-width: $md-breakpoint) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .form-input {
    margin-top: $spacing-1;
    display: block;
		box-sizing: border-box;
    width: 100%;

    background-color: $gray-800;
    border: 1px solid $gray-600;
    border-radius: $rounded-md;
    box-shadow: 0 1px 2px 0 #0000000d;

    padding: $spacing-2 $spacing-3;
    color: white;

    &:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 2px #3b82f6;
    }
  }

  .text-center-pt-2 {
    text-align: center;
    padding-top: $spacing-2;
  }

  .submit-btn {
    font-weight: 700;
    padding: $spacing-2 $spacing-3;
    border-radius: $rounded-lg;

    background-color: #4f46e5;
    color: white;

    transition-property: background-color;
    transition-duration: 300ms;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      background-color: #2563eb;
    }
  }


</style>