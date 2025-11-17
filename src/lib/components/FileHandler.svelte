<script lang="ts">
	import { FolderIcon } from '$lib/components/Icons/iconIndex.ts';
	import type { ChangeEventHandler } from 'svelte/elements';
	import { publicFiles } from '$lib/stores.svelte.ts';
	import type { FileStore } from "$lib/types"
	import { RefFile } from '$lib/class/SmallClasses.ts';
	import OneFile from '$lib/components/OneFile.svelte';

	interface FileHandlerProps {
		title: string,
		subtitle: string,
		buttonName: string,
		buttonColor: string,
		iconColor: string,
		source: FileStore,
	}

	let {
		title,
		subtitle,
		buttonName,
		buttonColor,
		iconColor,
		source,
	}: FileHandlerProps = $props();

	function createFileHandler(): ChangeEventHandler<HTMLInputElement> {
		return (event) => {
			const files = event.currentTarget.files;

			if (!files || !(files as FileList).length) {
				console.log('No files selected.');
				source.clear();
				return;
			}

			for (const file of files) {
				source.add(new RefFile(file));
			}
			console.log(`${publicFiles.size} files selected.`);
		};
	}

</script>

<div>
	<h5 class="title">
		<FolderIcon color={iconColor} />
		{title}
	</h5>
	<div class="space-y-2-parent">
		{#if !source}
			<p class="no-files-display">{subtitle}</p>
		{:else}
			{#each source as file (file.id)}
				<OneFile name={file.file.name.trim()} />
			{/each}
		{/if}
	</div>
	<label class="clickable-tag" style={`background-color: ${buttonColor}`}>
		{buttonName}
		<input type="file" multiple onchange={createFileHandler()} />
	</label>
</div>

<style lang="scss">
  @use "sass:color";

  $text-sm: 0.875rem;
  $font-semibold: 600;
  $spacing-2: 0.5rem;
  $brand-text-secondary: #a1a1aa; // Example color

  .title {
    // text-sm font-semibold
    font-size: $text-sm;
    line-height: 1.25rem;
    font-weight: $font-semibold;

    // text-brand-text-secondary
    color: $brand-text-secondary;

    // flex items-center gap-2
    display: flex;
    align-items: center;
    gap: $spacing-2;

    // mb-2
    margin-bottom: $spacing-2;
  }

  $blue-600: #2563EB;
  $spacing-2: 0.5rem;
  $spacing-1: 0.25rem;
  $spacing-3: 0.75rem;
  $text-sm: 0.875rem;
  $font-semibold: 600;
  $rounded-default: 0.25rem;
  $white: #ffffff;

  .clickable-tag {
    // mt-2
    margin-top: $spacing-2;

    // text-sm font-semibold text-white
    font-size: $text-sm;
    line-height: 1.25rem;
    font-weight: $font-semibold;
    color: $white;

    // inline-block cursor-pointer
    display: inline-block;
    cursor: pointer;

    // py-1 px-3
    padding: $spacing-1 $spacing-3;

    // rounded
    border-radius: $rounded-default;

    // bg-blue-600/50
    background-color: color.change($blue-600, $alpha: 0.5);

    // Transition (implied default)
    transition: background-color 150ms ease-in-out;

    // hover:bg-blue-600/80
    &:hover {
      background-color: color.change($blue-600, $alpha: 0.8);
    }
  }

  $spacing-2: 0.5rem;

  .space-y-2-parent {
    // space-y-2
    // Applies 0.5rem margin-top to every child element that follows another child element
    > * + * {
      margin-top: $spacing-2;
    }
  }

  $text-xs: 0.75rem;
  $gray-500: #6b7280;
  $spacing-2: 0.5rem;

  .no-files-display {
    // text-xs
    font-size: $text-xs;
    line-height: 1rem;

    // text-gray-500
    color: $gray-500;

    // px-2
    padding-left: $spacing-2;
    padding-right: $spacing-2;
  }
</style>