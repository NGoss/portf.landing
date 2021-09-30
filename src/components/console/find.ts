interface result {
	dir :object,
	path :string
}

const find = (root :object, stack :string) :result => {
	return iterate(root, aggregateRelative(stack))
}

const iterate = (root :object, stack :string) :result => {
	//a.b.c.d

	if (!stack) return {dir: root, path: '/'}

	let dirs = stack.split('|')
	let current :string | undefined = dirs[0]

	if (root.hasOwnProperty(current)) {
		if (!(dirs.length - 1)) {
			return {dir: root[current], path: `/${stack}/`}
		}

		dirs.shift()

		const {dir, path} = iterate(root[current], dirs.join('|'))
		return {dir, path: `/${current}${path}`}

	}

	throw `Could not find directory: ${stack}`
}

const aggregateRelative = (path :string) :string => {
	let dirs = path.split('|')

	return dirs.reduce((previous :string, current :string) :string => {
		switch (current) {
			case '..':
				if (!previous.includes('|')) return ''
				return previous.slice(0, previous.lastIndexOf('|'))
			case '.':
				return previous
			default:
				return previous ? previous + '|' + current : current
		}
	})
}

export default find
