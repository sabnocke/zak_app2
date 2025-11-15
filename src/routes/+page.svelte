<script lang="ts">
	import {
		// user,
		state,
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
	// import {GoogleIcon} from ... //TODO
	// import {onMount} from 'svelte';
	// import {firebase} from "$lib/firebase"
	import { TimeUpdate } from '$lib/TimeUpdate.ts';
	import { deepCopy } from '$lib/utils.ts';
	// import type {ChartData} from '$lib/types.ts';
	import GoogleIcon from '$lib/components/Icons/GoogleIcon.svelte';
	import UserIcon from '$lib/components/Icons/UserIcon.svelte';

	let currentTime = new Date();
	let signInError: string | null = null;
	let selectedJobId: string | null = null;
	let isLoading = $derived(state.isLoading);

	const timeUpdate = new TimeUpdate(state.user.uid, jobs, employees, activeWork, workLog, pauseLog, dailyLog);

	$effect(() => {
		const interval = setInterval(async () => {
			currentTime = new Date();

			if (state.user && Object.keys(activeWork).length > 0) {
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
		if (!state.isAuthenticated || !selectedJobId) return;

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


{#if isLoading}
	<!-- Třídy pro loading screen -->
	<div class="app-screen loading-screen">Načítání...</div>
{:else if !state.isAuthenticated}
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
		<header class="header">
			<h1 class="header__title">Vítejte, {state.user.displayName ?? "EXCEPTION: Missing name"}!</h1>
			<p class="header__clock">{currentTime.toLocaleTimeString()}</p>
			<button onclick={handleSignOut} class="btn-signout">Odhlásit se</button>
		</header>

		<main class="main-grid">
			<!-- Sloupec 1: Formulář pro zakázky -->
			<div>
				<JobForm />
			</div>

			<!-- Sloupec 2: Seznam aktivních zakázek -->
			<div class="main-grid-col-2">
				<h2 class="section-title">Aktivní Zakázky</h2>
				<div class="job-list">
					{#each jobs as job (job.id)}
						<div
							class="job-card"
							class:is-selected={selectedJobId === job.id}
							onclick={() => selectedJobId = job.id}
						>
							<h3 class="job-card__title">{job.name}</h3>
							<p class="job-card__remaining">Zbývá: {job.remainingHours.toFixed(1)} h / {job.totalHours.toFixed(1)}
								h</p>
							<p class="job-card__workers">
								Pracují: {activeWork[job.id]?.map(id => employees.find(e => e.id === id)?.name).join(', ') || 'Nikdo'}</p>
						</div>
					{/each}
				</div>
			</div>

			<!-- Sloupec 3 (přes celou šířku): Zaměstnanci a Evidence -->
			<div class="main-grid-col-3">
				<h2>Zaměstnanci a Evidence</h2>
				<div class="employee-grid">
					{#each employees as employee (employee.id)}
						{@const isActive = activeWork[selectedJobId || ""]?.includes(employee.id)}
						<button
							onclick={() => handleEmployeeToggle(employee.id)}
							disabled={!selectedJobId}
							class:is-active={isActive}
							class="btn-employee"
						>
							<UserIcon />
							<span class="">{employee.name}</span>
							<span class="employee-status">{isActive ? 'Aktivní' : 'Mimo'}</span>
						</button>
					{/each}
				</div>
			</div>

			<!-- Sloupec 3 (přes celou šířku): Graf -->
			<div class="main-grid-col-3">
				<BarChart data={chartData} title="Odpracované Hodiny na Zakázkách" unit="h" />
			</div>

		</main>
	</div>

{/if}


<style lang="scss">

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

  .app-screen {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
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

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;

    &__title {
      font-size: 1.5rem;
      font-weight: bold;
    }

    &__clock {
      color: #9ca3af;
    }
  }

  .btn-signout {
    background-color: #dc2626;
    color: white;
    font-weight: bold;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    transition: all 0.3s ease-in-out;

    &:hover {
      background-color: #b91c1c;
    }
  }

  .section-title {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: white;
  }

  .margin-top-4 {
    margin-top: 1rem;
  }


  /* Mřížka hlavního obsahu */
  .main-grid {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 1.5rem;

    @media (min-width: 768px) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
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