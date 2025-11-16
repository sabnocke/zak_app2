<script lang="ts">
	import {
		// user,
		authState,
		jobs,
		employees,
		activeWork,
		// totalWorkingHours,
		workLog,
		pauseLog,
		dailyLog,
	} from '$lib/stores.svelte.ts';
	import { handleSignIn, handleSignOut } from '$lib/services/authService'; //TODO
	import JobForm from '$lib/components/JobForm.svelte';
	import BarChart from '$lib/components/BarChart.svelte';
	import { TimeUpdate } from '$lib/TimeUpdate.ts';
	import { deepCopy } from '$lib/utils.ts';
	// import type {ChartData} from '$lib/types.ts';
	import GoogleIcon from '$lib/components/Icons/GoogleIcon.svelte';
	import UserIcon from '$lib/components/Icons/UserIcon.svelte';
	import {getWorkers} from '$lib/services/transporterService.ts';
	import ClockIcon from '$lib/components/Icons/ClockIcon.svelte';
	import Header from '$lib/components/Header.svelte';

	import Buttons from '$lib/components/Buttons.svelte';
	import FormOrderCreate from '$lib/components/FormOrderCreate.svelte';
	import WorkDisplay from '$lib/components/WorkDisplay.svelte';
	import WorkerDisplay from '$lib/components/WorkerDisplay.svelte';

	let currentTime = $state(new Date());
	let signInError: string | null = $state(null);
	let selectedJobId: string | null = $state(null);
	let isLoading = $derived(false);

	getWorkers().then(() => {
		console.log("success");
	})

	const timeUpdate = new TimeUpdate(authState.user.uid, jobs, employees, activeWork, workLog, pauseLog, dailyLog);

	$effect(() => {
		const interval = setInterval(async () => {
			currentTime = new Date();

			if (authState.user && Object.keys(activeWork).length > 0) {
				timeUpdate.update();
			}
		}, 1000);

		return () => clearInterval(interval);
	});

	const chartData = $derived(jobs.map(job => ({
		label: job.name,
		first: job.totalHours - job.remainingHours,
		second: null
	})));

	async function handleEmployeeToggle(employeeId: string) {
		if (!authState.isAuthenticated || !selectedJobId) return;

		const newActiveWork = deepCopy(activeWork);
		const isWorkingOnSelectedJob = newActiveWork[selectedJobId]?.includes(employeeId);

		if (isWorkingOnSelectedJob) {
			// ... logika pro přidání zaměstnance na vybranou zakázku ...
		}

		// Zde by mělo být volání na Firebase pro uložení newActiveWork a změnu stavu onPause
		// db.doc(`users/${$user.uid}/state/activeWork`).set({ data: newActiveWork });
		// db.doc(`users/${$user.uid}/employees/${employeeId}`).update({ onPause: false });
	}

	function sign() {
		const result = handleSignIn();
		if (!result.isSuccess) {
			signInError = result.error.message;
		}
	}

</script>


<div class="outer-shell">
	<div class="inner-shell">
		{#if isLoading}
			<!-- Třídy pro loading screen -->
			<div class="app-screen loading-screen">Načítání...</div>
		{:else if !authState.isAuthenticated}
			<!-- Třídy pro přihlašovací obrazovku -->
			<div class="app-screen">
				<div class="auth-card">
					<h1 class="auth-card__title">Systém pro Sledování Zakázek</h1>
					<p class="auth-card__text">Pro pokračování se prosím přihlaste.</p>
					<button onclick={sign} class="btn-google">
						<GoogleIcon />
						<span>Přihlásit se pomocí Google</span>
					</button>
					{#if signInError}
						<p class="auth-card__error">{signInError}</p>
					{/if}
				</div>
			</div>
		{:else}
			<!-- Třídy pro hlavní Dashboard -->
			<div class="app-container">
				<Header />

				<main class="main-grid">
					<Buttons />
					<!-- Sloupec 1: Formulář pro zakázky -->
					<FormOrderCreate />
<!--					<div>-->
<!--						<JobForm />-->
<!--					</div>-->

					<div class="subgrid">
						<WorkDisplay />
						<WorkerDisplay />
					</div>

<!--					&lt;!&ndash; Sloupec 2: Seznam aktivních zakázek &ndash;&gt;-->
<!--					<div class="main-grid-col-2">-->
<!--						<h2 class="section-title">Aktivní Zakázky</h2>-->
<!--						<div class="job-list">-->
<!--							{#each jobs as job (job.id)}-->
<!--								<div-->
<!--									class="job-card"-->
<!--									class:is-selected={selectedJobId === job.id}-->
<!--									onclick={() => selectedJobId = job.id}-->
<!--								>-->
<!--									<h3 class="job-card__title">{job.name}</h3>-->
<!--									<p class="job-card__remaining">Zbývá: {job.remainingHours.toFixed(1)} h / {job.totalHours.toFixed(1)}-->
<!--										h</p>-->
<!--									<p class="job-card__workers">-->
<!--										Pracují: {activeWork[job.id]?.map(id => employees.find(e => e.id === id)?.name).join(', ') || 'Nikdo'}</p>-->
<!--								</div>-->
<!--							{/each}-->
<!--						</div>-->
<!--					</div>-->

<!--					&lt;!&ndash; Sloupec 3 (přes celou šířku): Zaměstnanci a Evidence &ndash;&gt;-->
<!--					<div class="main-grid-col-3">-->
<!--						<h2>Zaměstnanci a Evidence</h2>-->
<!--						<div class="employee-grid">-->
<!--							{#each employees as employee (employee.id)}-->
<!--								{@const isActive = activeWork[selectedJobId || ""]?.includes(employee.id)}-->
<!--								<button-->
<!--									onclick={() => handleEmployeeToggle(employee.id)}-->
<!--									disabled={!selectedJobId}-->
<!--									class:is-active={isActive}-->
<!--									class="btn-employee"-->
<!--								>-->
<!--									<UserIcon />-->
<!--									<span class="">{employee.name}</span>-->
<!--									<span class="employee-status">{isActive ? 'Aktivní' : 'Mimo'}</span>-->
<!--								</button>-->
<!--							{/each}-->
<!--						</div>-->
<!--					</div>-->

					<!-- Sloupec 3 (přes celou šířku): Graf -->
					<div class="main-grid-col-3">
						<BarChart data={chartData} title="Odpracované Hodiny na Zakázkách" unit="h" />
					</div>

				</main>
			</div>
		{/if}c
	</div>
</div>


<style lang="scss">
  @use "sass:color";

  $bg-brand-background: #1f2937 !default;
  $bg-brand-surface: #374151;
  $text-color: #f3f4f6;
  $color-brand-text-secondary: #9ca3af;

  $bg-blue-600: #2563eb;
  $bg-blue-700: #1d4ed8;
  $bg-blue-900: #1e3a8a;

  $text-gray-400: #9ca3af;
  $bg-gray-500: #6b7280;
  $bg-gray-600: #4b5563;
  $bg-gray-700: #374151;

  $text-red-400: #f87171;
  $bg-red-600: #dc2626;
  $bg-red-700: #b91c1c;

  $bg-green-600: #059669;
  $bg-green-700: #047857;

  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slide-in {
    from {
      opacity: 0;
      transform: translateX(-10px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .app-container {
    animation: fade-in 0.5s ease-out;
  }

  .auth-card {
    animation: fade-in 0.5s ease-out 0.2s both;
  }

  .auth-card__error {
    animation: slide-in 0.3s ease-out;
  }

  /* -------------------------------------- */
  /* 1. ZÁKLADNÍ LAYOUT A TYPOGRAFIE */
  /* -------------------------------------- */

  :global(body) {
    background-color: #111827;
    color: white;
    font-family: sans-serif;
    margin: 0;
  }

  .loading-screen {
    color: white;
  }

  $brand-background: #0D1117; // Example: A dark background color
  $brand-text-primary: #C9D1D9;

	body {
		margin: 0;
		line-height: inherit;
	}

	.outer-shell {
		background-color: $brand-background;
		color: $brand-text-primary;
	}

	.inner-shell {
		box-sizing: border-box;
		border-width: 0;
		border-style: solid;
		border-color: #e5e7eb;
	}

  $spacing-4: 1rem;
  $spacing-6: 1.5rem;
  $spacing-8: 2rem;
  $sm-breakpoint: 640px;
  $lg-breakpoint: 1024px;

  .app-screen {
    min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;

		font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";

		padding: $spacing-4;

		@media (min-width: $sm-breakpoint) {
			padding: $spacing-6;
    }

		@media (min-width: $lg-breakpoint) {
			padding: $spacing-8;
    }
  }

  .app-container {
    padding: 1rem;
    margin: 0 auto;
    width: 100%;
    max-width: 1200px;
  }

  .icon-md {
    width: 1.5rem;
    height: 1.5rem;
  }

  /* -------------------------------------- */
  /* 2. AUTENTIZAČNÍ OBRAZOVKA */
  /* -------------------------------------- */

  .auth-card {
    text-align: center;
    padding: 2rem;
    background-color: #1f2937;
    border-radius: 0.75rem;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.5);

    &__title {
      font-size: 1.875rem;
      font-weight: bold;
      margin-bottom: 1.5rem;
    }

    &__text {
      margin-bottom: 2rem;
      color: #9ca3af;
    }

    &__error {
      margin-top: 1rem;
      color: #f87171;
      font-size: 0.875rem;
    }
  }

  .btn-google {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    width: 100%;
    background-color: #2563eb;
    color: white;
    font-weight: bold;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    transition: all 0.3s ease-in-out;
    transform: scale(1);

    &:hover {
      background-color: #1d4ed8;
      transform: scale(1.05);
    }
  }

  /* -------------------------------------- */
  /* 3. HLAVNÍ DASHBOARD */
  /* -------------------------------------- */

  .section-title {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: white;
  }

  .margin-top-4 {
    margin-top: 1rem;
  }


  $brand-surface: #4318FF;



  $spacing-8: 2rem;
  $spacing-6: 1.5rem;
  $gray-700: rgb(55, 65, 81);
  $rounded-xl: 0.75rem;
  $max-w-7xl: 80rem;
  $blur-sm: 4px;

  /* Mřížka hlavního obsahu */
  .main-grid {
    width: 100%;
		max-width: 80rem;
		margin-bottom: 2rem;

		background-color: color.adjust(#4318FF, $alpha: -50%);
		backdrop-filter: blur(4px);

    border-radius: $rounded-xl;
    border-width: 1px;
    border-style: solid;
    border-color: $gray-700;

		padding: $spacing-6;

		box-shadow: 0 0 black, 0 0 black, 0 25px 50px -12px #00000040;

		animation: slide-in 0.5s ease-out forwards;

		@media(min-width: 640px) {
			padding: 2rem;
		}
  }

	.subgrid {
		width: 100%;
		max-width: 80rem;
		margin-top: 1rem;
		margin-left: auto;
		margin-right: auto;

		display: grid;
		grid-template-columns: repeat(1, 1fr);

		gap: 2rem;

		@media (min-width: 1024px) {
			grid-template-columns: repeat(2, 1fr);
    }
	}

  .main-grid-col-2 {
    @media (min-width: 768px) {
      grid-column: span 2 / span 2;
    }
  }

  .main-grid-col-3 {
    @media (min-width: 768px) {
      grid-column: span 3 / span 3;
    }
  }

  /* -------------------------------------- */
  /* 4. SEZNAM ZAKÁZEK (JOB LIST) */
  /* -------------------------------------- */

  .job-list {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 1rem;

    @media (min-width: 1024px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  .job-card {
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    background-color: #374151; /* bg-gray-700 */

    &.is-selected {
      background-color: #1e3a8a; /* bg-blue-900 */
      border: 1px solid #2563eb;
    }

    &__title {
      font-weight: 600;
      color: white;
    }

    &__remaining {
      font-size: 0.875rem;
      color: #9ca3af;
    }

    &__workers {
      font-size: 0.875rem;
      color: #d1d5db;
    }
  }

  /* -------------------------------------- */
  /* 5. SEZNAM ZAMĚSTNANCŮ (EMPLOYEE LIST) */
  /* -------------------------------------- */

  .employee-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;

    @media (min-width: 640px) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    @media (min-width: 1024px) {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }
  }

  .btn-employee {
    padding: 1rem;
    border-radius: 0.5rem;
    text-align: center;
    transition: all 0.2s ease-in-out;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);

    color: white;
    font-weight: 600;

    background-color: #4b5563; /* Neaktivní stav */

    &:hover {
      background-color: #6b7280;
    }

    &.is-active {
      background-color: #10b981; /* Aktivní stav */
      &:hover {
        background-color: #059669;
      }
    }

    &[disabled] {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .employee-icon {
    width: 1.5rem;
    height: 1.5rem;
    margin: 0 auto 0.25rem;
  }

  .employee-status {
    font-size: 0.75rem;
  }

</style>