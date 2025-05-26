import fitty from 'fitty'

const runFitty = () => {
	fitty('.fit-text', { multiLine: false })
}

document.addEventListener('DOMContentLoaded', runFitty)
document.addEventListener('astro:after-swap', runFitty)
