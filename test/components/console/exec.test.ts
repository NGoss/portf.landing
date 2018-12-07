import { cd } from '../../../src/components/console/exec'

it('Executes cd successfully on an absolute path when the directory exists', () => {
	const path = '/home/user/'
	const wdir = '/home/user/guest'

	const result = cd(path, wdir)

	expect(result).toEqual('/home/user/')
})

it('Executes cd successfully on a non-dot relative path when the directory exists', () => {
	const path = 'guest'
	const wdir = '/home/user/'

	const result = cd(path, wdir)

	expect(result).toEqual('/home/user/guest/')
})

it('Executes cd successfully on a dot relative path when the directory exists', () => {
	const path = './guest'
	const wdir = '/home/user/'

	const result = cd(path, wdir)

	expect(result).toEqual('/home/user/guest/')
})

it('Executes cd successfully on a upward-relative path when the directory exists', () => {
	const path = '../guest'
	const wdir = '/home/user/root/'

	const result = cd(path, wdir)

	expect(result).toEqual('/home/user/guest/')
})
