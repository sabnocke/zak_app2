<script lang="ts">
	import type {BarChartProps} from '$lib/types.ts';
	import {formatValue} from '$lib/utils.ts';

	let {
		data,
		title,
		barColorClass = "fill-brand-primary",
		unit = 'h',
	} : BarChartProps = $props();

	const maxValue = Math.max(...data.map(d => d.first + (d.second ?? 0)), 1);

	const chartHeight = 250;
	const topMargin = 20;
	const effectiveChartHeight = chartHeight - topMargin;
	const barWidth = 30;
	const barMargin = 20;
	const svgWidth = data.length * (barWidth + barMargin);
	const labelRotation = -45;
	const labelYOffset = Math.cos(labelRotation * Math.PI / 180) * 10;
	const svgHeight = chartHeight + 80;
</script>

<div>
	<h4>{title}</h4>
	<div>
		<div><span>Práce</span></div>
		<div><span>Pauza</span></div>
	</div>
	<div>
		<svg width={svgWidth} height={svgHeight} class="chart-svg">
			{#each data as d, i (i)}
				<g transform={`translate(${i * (barWidth + barMargin)}, 0)`} class="chart">
					{#if d.second}
						{@const totalValue = d.first + d.second}
						{@const workHeight = (d.first / maxValue) * effectiveChartHeight}
						{@const pauseHeight = (d.second / maxValue) * effectiveChartHeight}

						<rect
							y={chartHeight - workHeight}
							height={workHeight}
							class="chart-bar chart-bar--primary"
						/>

						<rect
							y={chartHeight - workHeight - pauseHeight}
							height={pauseHeight}
							class="chart-bar chart-bar--secondary"
						/>

						<text y={chartHeight - workHeight - pauseHeight - 5} text-anchor="middle" class="chart-value">
							{formatValue(totalValue, unit)}
						</text>

					{:else}
						{@const barHeight = (d.first / maxValue) * effectiveChartHeight}

						<rect
							y={chartHeight - barHeight}
							height={barHeight}
							class={`chart-bar ${barColorClass}`}
						/>

						<text y={chartHeight - barHeight - 5} text-anchor="middle" class="chart-value">
							{formatValue(d.first, unit)}
						</text>
					{/if}

					<text
						x={barWidth / 2}
						y={chartHeight + labelYOffset + 15}
						text-anchor="end"
						class="chart-label"
						transform={`rotate(${labelRotation} ${barWidth / 2} ${chartHeight + 15}`}
					>
						{d.label}
					</text>

				</g>
			{/each}
		</svg>
	</div>
</div>

<style lang="scss">
	.chart-container {
		background-color: #1f2937;
		padding: 1rem;
		border-radius: 0.5rem;
	}

	.chart-svg {
		font-family: sans-serif;
	}

	.chart-bar {
		transition: all 300ms ease-in-out;
		cursor: pointer;

		&:hover {
			opacity: 0.8;
		}
	}

	.chart-bar--primary {
		fill: #3b82f6;
	}

	.chart-bar--secondary {
		fill: #f97316;
	}

	.chart-value {
		font-size: 0.75rem;
		fill: #f3f4f6;
		font-weight: bold;
	}

	.chart-label {
		font-size: 0.75rem;
		fill: #9ca3af;
	}
</style>