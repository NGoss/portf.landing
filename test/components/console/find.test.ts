import iterate from '../../../src/components/console/find'

it('Searches a directory successfully when the path exists', () => {
	const path = 'a|b|c|d'
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

	const result = iterate(testDirectory, path)

	expect(result).toEqual({files: ['test']})
})
