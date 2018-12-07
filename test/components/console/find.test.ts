import find from '../../../src/components/console/find'

const testDirectory = {
	files: [],
	a: {
		files: [],
		b: {
			files: [],
			c: {
				files: [],
				d : {
					files: ['test']
				}
			}
		}
	}
}

it('Searches a directory successfully when the path exists', () => {
	const path = 'a|b|c|d'

	const result = find(testDirectory, path)

	expect(result.dir).toEqual({files: ['test']})
	expect(result.path).toEqual('/a/b/c/d/')
})

it('Handles root directory queries successfully', () => {
	const path = 'a|..'

	const result = find(testDirectory, path)

	expect(result.dir).toEqual(testDirectory)
	expect(result.path).toEqual('/')
})
