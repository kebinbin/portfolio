import fitty from 'fitty'

function applyFitty() {
	fitty('.fit-text', {
		multiLine: false
	})
}

// Run initially
document.addEventListener('DOMContentLoaded', applyFitty)

// Re-run after Astro View Transitions finish
document.addEventListener('astro:after-swap', applyFitty)
