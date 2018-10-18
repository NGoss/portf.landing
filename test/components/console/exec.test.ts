import iterate from '../../../src/components/console/exec'

it('Executes cd successfully on an absolute path when the directory exists', () => {
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
