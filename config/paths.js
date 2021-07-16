const source = {
	html: "src/*.html",
	sass: "src/styles/*.{scss,sass}",
	js: "src/scripts/*.js",
}

const dist = {
	dev: {
		html: ".tmp",
		sass: ".tmp/styles",
		js: ".tmp/scripts",
	},
	prod: {
		html: "build",
		sass: "build/styles",
		js: "build/scripts",
	}
}

const watches = {
	html: ".tmp/*.html",
	sass: "src/styles/**/*.{scss,sass}",
	js: "src/scripts/**/*.js",
}

const builds = [
	"build/*.html",
	"build/styles/*.css",
	"build/scripts/*.js",
]

export { source, dist, watches, builds }