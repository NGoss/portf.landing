import { fake } from 'sinon'
import { cat, setUpFreePrint } from '../../../src/components/console/exec'

it('Executes cat successfully with file in current directory', () => {
	const wdir = '/home/user/guest/'
	const targetFile = 'hello.txt'
	const printFake = fake()

	setUpFreePrint(printFake)

	cat(targetFile, wdir)

	expect(printFake.calledWith('Hello, world!')).toBe(true)
})

it('Executes cat successfully with ./ file path', () => {
	const wdir = '/home/user/guest/'
	const targetFile = './hello.txt'
	const printFake = fake()

	setUpFreePrint(printFake)

	cat(targetFile, wdir)

	expect(printFake.calledWith('Hello, world!')).toBe(true)
})

it('Executes cat successfully with ../ file path', () => {
	const wdir = '/home/user/guest/'
	const targetFile = '../users.txt'
	const printFake = fake()

	setUpFreePrint(printFake)

	cat(targetFile, wdir)

	expect(printFake.calledWith('These are the users configured on your virtual workspace.')).toBe(true)
})
