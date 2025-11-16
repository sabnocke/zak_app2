<script>
</script>

<div class="frosted-card">
	<div class="space-y-4-parent">
		<div class="header-container">
			<h3 class="section-header">Aktivní zakázky</h3>
		</div>
<!--		if here -->
		<p class="text-paragraph">Zatím nebyly vytvořeny žádné zakázky.</p>
	</div>
</div>

<style lang="scss">
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

  .space-y-4-parent {
    > * + * {
      margin-top: $spacing-4;
    }
  }

	.section-header {
		font-size: 1.25rem;
		line-height: 1.75rem;
		font-weight: 700;
	}

	.header-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.text-paragraph {
		text-align: center;
		color: #a1a1aa;
	}
</style>