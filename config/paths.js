const source = {
	html: "src/*.html",
	sass: "src/styles/*.{scss,sass}",
	js: "src/scripts/*.js",
	img: "src/images/**/*.{jpg,svg}"
}

const dist = {
	dev: {
		html: ".tmp",
		sass: ".tmp/styles",
		js: ".tmp/scripts",
		img: ".tmp/images"
	},
	prod: {
		html: "build",
		sass: "build/styles",
		js: "build/scripts",
		img: "build/images"
	}
}

const watches = {
	html: ".tmp/*.html",
	sass: "src/styles/**/*.{scss,sass}",
	js: "src/scripts/**/*.js",
	img: "src/images/**"
}

const builds = [
	"build/*.html",
	"build/styles/*.css",
	"build/scripts/*.js",
	"build/images/**"
]

export { source, dist, watches, builds }