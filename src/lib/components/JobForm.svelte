<script lang="ts">
	import { createJob } from '$lib/services/jobService'; //TODO
	import {authState} from '$lib/stores.svelte.ts';
	import BriefcaseIcon from '$lib/components/Icons/BriefcaseIcon.svelte';

	let jobName = "";
	let jobValue = "";
	let materialCost = "";
	let hourlyRate = "450";
	let error: string | null = null;

	async function submit() {
		error = null;

		if (!authState.isAuthenticated) return;

		const valueNum = parseFloat(jobValue);
		const rateNum = parseFloat(hourlyRate);
		const materialNum = parseFloat(materialCost) || 0;

		if (!jobName.trim() || isNaN(valueNum) || valueNum <= 0 || isNaN(materialNum) || materialNum < 0 || valueNum < materialNum || isNaN(rateNum) || rateNum <= 0) {
			error = "Prosím, vyplňte všechna pole správně.";
			return;
		}

		try {
			createJob({ jobName, jobValue, materialCost, hourlyRate }, authState.user.uid);
			jobName = '';
			jobValue = '';
			hourlyRate = '450';
			materialCost = '';
		} catch {
			error = "Nepodařilo se vytvořit zakázku.";
		}


	}
</script>

<form on:submit|preventDefault={submit} class="form-container">
	<h3 class="form-heading">
		<BriefcaseIcon className="w-6 h-6"/>Nová Zakázka
	</h3>
	{#if error}
		<p class="error-message">{error}</p>
	{/if}

	<button type="submit" class="submit-button">
		Vytvořit Zakázku
	</button>
</form>


<style lang="scss">
	.form-container {
		background-color: #1f2937;
		padding: 1.5rem;
		border-radius: 0.5rem;
		box-shadow: 0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
	}

	.form-heading {
		font-size: 1.25rem;
		font-weight: 600;
		margin-bottom: 1rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.error-message {
		color: #f87171;
		margin-bottom: 1rem;
	}

	.submit-button {
		width: 100%;
		background-color: #059669;
		color: #fff;
		font-weight: 700;
    padding: 0.5rem 1rem;
		border-radius: 0.25rem;
		transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
		transition-duration: 300ms;

		&:hover {
			background-color: #047857;
		}
  }
</style>