interface directory {
	files: Array<string>
}

const iterate = (root :directory, stack :string) :directory => {
	//a.b.c.d
	let dirs = stack.split('.')
	if (root.hasOwnProperty(dirs[0])) {
		if (!(dirs.length - 1)) {
			return root[dirs[0]]
		}

		const iterateRoot = root[dirs[0]]
		dirs.shift()
		
		return iterate(iterateRoot, dirs.join('.'))
	}

	throw 'Could not find...'
}

export default iterate