// Collection of implementations for console commands

import { Map } from 'immutable'

import directory from './directory'
import find from './find'

type freePrintMethod = (message :string) => void
let freePrint :freePrintMethod

export const setUpFreePrint = (freePrintRef :freePrintMethod) => {
	freePrint = freePrintRef
}


const processRelativePath = (target :string, wdir :string, parentDir :string) :string => {
	let targetDir = target //Store for processing purposes

	//relative path to parent directory
	if (targetDir.slice(0, 3) === '../') {
		target = parentDir + targetDir.slice(3, targetDir.length)
		targetDir = target
	}

	//relative path to subdirectory
	if (targetDir[0] !== '/' || targetDir.slice(0,2) === './') {
		target = wdir + targetDir
		targetDir = target
	}

	if (targetDir[targetDir.length - 1] === '/') targetDir = targetDir.slice(0, targetDir.length - 1)
	if (targetDir[0] === '/') targetDir = targetDir.slice(1, targetDir.length)

	return targetDir
}


export const ls = (targetDir :string, rootListing :boolean) :void => {
	let dir :any
	if (rootListing) {
		dir = directory['/']
	} else {
		if (targetDir[targetDir.length - 1] === '/') targetDir = targetDir.slice(0, targetDir.length - 1)
		if (targetDir[0] === '/') targetDir = targetDir.slice(1, targetDir.length)
		dir = find(directory['/'], targetDir.split('/').join('|'))
	}
	
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

export const cd = (target :string, wdir :string, parentDir :string) :string => {
	let targetDir = processRelativePath(target, wdir, parentDir)

	const dir = find(directory['/'], targetDir.split('/').join('|'))
	if (dir) {
		if (target[target.length -1] !== '/') target = target + '/'
		if (target[0] !== '/') target = '/' + target

		return target
	}

	freePrint('System could not find directory ' + target)
	return wdir
}

export const cat = (targetFile :string, wdir :string, parentDir :string) :void => {
	const target = processRelativePath(targetFile, wdir, parentDir)
	const file = find(directory['/'], target.split('/').join('|'))

	if (typeof file === "string") {
		freePrint(file)
	}
}