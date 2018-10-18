import { cd } from '../../../src/components/console/exec'

it('Executes cd successfully on an absolute path when the directory exists', () => {
	const path = '/home/user/'
	const wdir = '/home/user/guest'
	const parentDir = '/home/user/'

	const result = cd(path, wdir, parentDir)

	expect(result).toEqual('/home/user/')
})
