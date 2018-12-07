import { fake } from 'sinon'
import { ls, setUpFreePrint } from '../../../src/components/console/exec'

it('Executes ls successfully with no parameters', () => {
	const wdir = '/home/user/'
	const printFake = fake()

	setUpFreePrint(printFake)

	ls(wdir)

	expect(printFake.calledWith('root guest')).toBe(true)
	expect(printFake.calledWith('users.txt')).toBe(true)
})

it('Executes ls successfully with absolute path parameter', () => {
	const wdir = '/home/user/'
	const target = '/home/user/root/'
	const printFake = fake()

	setUpFreePrint(printFake)

	ls(wdir, target)

	expect(printFake.calledWith('root.txt')).toBe(true)
})

it('Executes ls successfully with relative path parameter', () => {
	const wdir = '/home/user/guest/'
	const target = '../'
	const printFake = fake()

	setUpFreePrint(printFake)

	ls(wdir, target)

	expect(printFake.calledWith('root guest')).toBe(true)
	expect(printFake.calledWith('users.txt')).toBe(true)
})