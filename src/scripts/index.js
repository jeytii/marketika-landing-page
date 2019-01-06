const links = document.querySelectorAll('a');
const form = document.querySelector('form');

function preventDefault(e) {
	e.preventDefault();
}

links.forEach(link => link.addEventListener('click', preventDefault));
form.addEventListener('submit', preventDefault);