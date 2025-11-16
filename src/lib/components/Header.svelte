<script lang="ts">
import { authState } from '$lib/stores.svelte.ts';
import { handleSignOut } from '$lib/services/authService.ts';
import ClockIcon from '$lib/components/Icons/ClockIcon.svelte';

const options: Intl.DateTimeFormatOptions = {
	dateStyle: undefined,
	hour: "2-digit",
	minute: "2-digit",
	second: "2-digit",
}

let currentTime = $state(new Date());
let cTime = $derived(new Intl.DateTimeFormat("cs-CZ", options).format(currentTime));

$effect(() => {
	const timer = setInterval(() => {
		currentTime = new Date();
	}, 1000);

	return () => clearInterval(timer);
})

</script>

<header class="header">
	<div>
		<!--	icon here			-->
		<h1 class="header__title">Vítejte, {authState.user.displayName ?? "EXCEPTION: Missing name"}!</h1>
	</div>
	<div class="timer-outer-container">
		<div class="time-container">
			<ClockIcon />
			<span class="header__clock">{cTime}</span>
		</div>
	</div>
	<button onclick={handleSignOut} class="btn-signout">Odhlásit se</button>
</header>


<style lang="scss">
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

	.timer-outer-container {
    display: flex;
    align-items: center;
    gap: 1rem;
	}

  .time-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border-radius: 0.5rem;
    border-width: 1px;
    border-color: rgb(55,65,81);
    background-color: rgb(31,41,55);
    padding: 0.25rem 0.75rem;

    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    font-size: 1.125rem;
    line-height: 1.75rem;
  }

  .btn-signout {
    background-color: #dc2626;
    color: white;
    font-weight: bold;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    transition: all 0.3s ease-in-out;
    cursor: pointer;

    &:hover {
      background-color: #b91c1c;
    }
  }

</style>