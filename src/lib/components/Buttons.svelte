<script lang="ts">
	import {
		UploadIcon,
		DownloadIcon,
		CalendarIcon,
		AnalyticsIcon,
		BuildingIcon,
		MonitorIcon,
		GraphIcon
	} from '$lib/components/Icons/iconIndex';

</script>

<h2 class="section-header">Vytvořit novou zakázku</h2>
<div class="buttons">
	<button class="export-button">
		<UploadIcon />
		<span>Exportovat data</span>
	</button>
	<button class="import-button">
		<DownloadIcon />
		<span>Importovat data</span>
	</button>
	<button class="plan-button">
		<CalendarIcon />
		<span>Plánování Nepřítomnosti</span>
	</button>
	<button class="month-button">
		<BuildingIcon />
		<span>Měsiční přehled firmy</span>
	</button>
	<button class="graph-button">
		<AnalyticsIcon />
		<span>Firemní grafy</span>
	</button>
	<button class="calc-button">
		<MonitorIcon />
		<span>Výpočet mzdy</span>
	</button>
	<button class="view-button">
		<GraphIcon />
		<span>Přehled zakázek</span>
	</button>
</div>


<style lang="scss">
  @use "sass:color";

  .section-header {
    font-weight: 700;
    font-size: 1.5rem;
    line-height: 2rem;
  }

  $blue-700: #1d4ed8;
  $blue-600: #2563eb;
  $white: #ffffff;
  $spacing-2: 0.5rem;
  $spacing-4: 1rem;
  $rounded-lg: 0.5rem;
  $font-bold: 700;
  $transition-duration: 150ms;
  $transition-easing: cubic-bezier(0.4, 0, 0.2, 1);

  $indigo-700: #4338ca;
  $gray-700: #374151;
  $teal-700: #0f766e;

  @mixin generic-button($color) {
    font-weight: $font-bold;
    padding: $spacing-2 $spacing-4;
    border-radius: $rounded-lg;

    display: flex;
    align-items: center;
    gap: $spacing-2;

    background-color: $color;
    color: white;
		cursor: pointer;

    transition-property: background-color;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;

    &:hover {
      background-color: color.adjust($color, $lightness: +10%, $saturation: +15%);
    }
  }

  .buttons {
    margin-bottom: 1rem;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .export-button {
    @include generic-button(#16A34A);
  }

  .import-button {
    @include generic-button(#2563EB);
  }

  .plan-button {
    @include generic-button(#9333ea);
  }

  .month-button {
    @include generic-button(#9333ea);
  }

  .graph-button {
    @include generic-button($teal-700);
  }

  .calc-button {
    @include generic-button($indigo-700);
  }

  .view-button {
    @include generic-button($gray-700)
  }

</style>