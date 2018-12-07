// Collection of implementations for console commands

import { Map } from 'immutable'

import directory from './directory'
import find from './find'

type freePrintMethod = (message :string) => void
let freePrint :freePrintMethod

export const setUpFreePrint = (freePrintRef :freePrintMethod) => {
	freePrint = freePrintRef
}


const processRelativePath = (target :string, wdir :string) :string => {
	let targetDir = target
	if (targetDir[0] !== '/') {
		targetDir = wdir + target
	}

	if (targetDir[targetDir.length - 1] === '/') targetDir = targetDir.slice(0, targetDir.length - 1)
	if (targetDir[0] === '/') targetDir = targetDir.slice(1, targetDir.length)

	return targetDir
}


export const ls = (wdir :string, target ?:string | undefined) :void => {
	let targetDir = target ? processRelativePath(target, wdir) : wdir
	let dir :any

	if (targetDir[targetDir.length - 1] === '/') targetDir = targetDir.slice(0, targetDir.length - 1)
	if (targetDir[0] === '/') targetDir = targetDir.slice(1, targetDir.length)
	const result = find(directory['/'], targetDir.split('/').join('|'))
	dir = result.dir

	const files = Object.keys(dir).filter((value :string) => typeof dir[value] === 'string')
	const subdirs = Object.keys(dir).filter((value :string) => typeof dir[value] === 'object')

	if (subdirs.length) freePrint(subdirs.reduce((next :string, current :string) => `${current} ${next}`))
	if (files.length) freePrint(files.reduce((next :string, current :string) => `${current}  ${next}`))
}

export const help = () :void => {
	const commands = Map({
		ls: 'list the contents of the current directory',
		cd: 'change the current working directory',
		help: 'print list of commands with usage',
		cat: 'view contents of text file'
	})
	commands.forEach((value :string, key :string) => {
		freePrint(`${key}: ${value}`)
	})
}

export const cd = (target :string, wdir :string) :string => {
	let targetDir = processRelativePath(target, wdir)

	const {dir, path} = find(directory['/'], targetDir.split('/').join('|'))
	if (dir) {
		if (targetDir[targetDir.length -1] !== '/') targetDir = targetDir + '/'
		if (targetDir[0] !== '/') targetDir = '/' + targetDir

		return path
	}

	freePrint('System could not find directory ' + target)
	return wdir
}

export const cat = (targetFile :string, wdir :string) :void => {
	const target = processRelativePath(targetFile, wdir)
	const file = find(directory['/'], target.split('/').join('|'))

	if (typeof file === "string") {
		freePrint(file)
	}
}
