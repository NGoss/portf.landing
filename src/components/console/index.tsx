import * as React from 'react'
import { Classes } from 'jss'
import attachStyles from 'react-jss'
import { List, Map } from 'immutable'

import Input from './input'
import Monitor from './monitor'

import directory from './directory'
import find from './find'

export interface User {
	homeDir: string,
	name: string
}

export interface Props {
	classes: Classes
}

export interface State {
	history: List<string>,
	wdir: string,
	user: User
}

class Console extends React.Component<Props, State> {

	 private container: React.RefObject<HTMLDivElement>

	public constructor(props :Props) {
		super(props)

		const guestUser = {
			name: 'guest',
			homeDir: '/home/user/guest/'
		}

		this.state = {
			history: List(['Welcome! Use the console to navigate your virtual workspace.',
										'Type \'help\' for a list of commands.']),
			user: guestUser,
			wdir: '/home/user/guest/'
		}

		this.container = React.createRef()

		this.pushMessageToStack = this.pushMessageToStack.bind(this)
		this.print = this.print.bind(this)
		this.freePrint = this.freePrint.bind(this)
	}

  public render() {
    const { classes } = this.props

    return (
      <div ref={this.container} className={classes.rootContainer}>
				<Monitor history={this.state.history}/>
	  	  <Input wdir={this.getWDir()} user={this.state.user} pushMessage={this.pushMessageToStack}/>
	    </div>
    )
	}
	
	private pushMessageToStack(message :string) :void {
		this.print(message)
		this.parseAndExecuteMessage(message)
	}

	private print(message :string) :void {
		const command = `${this.state.user.name}:${this.getWDir()}%${message}`
		this.setState({history: this.state.history.push(command)})
		if (this.container.current) {
			this.container.current.scrollIntoView({behavior: 'instant', block: 'end'})
		}
	}

	private freePrint(message :string) :void {
		this.setState({history: this.state.history.push(message)})
		if (this.container.current) {
			this.container.current.scrollIntoView({behavior: 'instant', block: 'end'})
		}
	}

	private parseAndExecuteMessage(message :string) :void {
		const lsRegex = /^ls/
		const helpRegex = /^help/
		const cdRegex = /^cd/

		switch (true) {
			case lsRegex.test(message):
				this.ls()
				break
			case helpRegex.test(message):
				this.help()
				break
			case cdRegex.test(message):
				this.cd(message.split('cd')[1].trim())
				break
		}
	}

	private getWDir() :string {
		return this.state.user.homeDir === this.state.wdir ? '~' : this.state.wdir
	}

	private ls() :void {
		let dir :any
		let targetDir = this.state.wdir
		if (this.state.wdir === '/') {
			dir = directory['/']
		} else {
			if (targetDir[targetDir.length - 1] === '/') targetDir = targetDir.slice(0, targetDir.length - 1)
			if (targetDir[0] === '/') targetDir = targetDir.slice(1, targetDir.length)
			dir = find(directory['/'], targetDir.split('/').join('.'))
		}
		
		const files = Object.keys(dir).filter((value :string) => typeof dir[value] === 'string')
		const subdirs = Object.keys(dir).filter((value :string) => typeof dir[value] === 'object')

		if (subdirs.length) this.freePrint(subdirs.reduce((next :string, current :string) => `${current} ${next}`))
		if (files.length) this.freePrint(files.reduce((next :string, current :string) => `${current}  ${next}`))
	}

	private help() :void {
		const commands = Map({
			ls: 'list the contents of the current directory',
			cd: 'change the current working directory',
			help: 'print list of commands with usage'
		})
		commands.forEach((value :string, key :string) => {
			this.freePrint(`${key}: ${value}`)
		})
	}

	private cd(target :string) :void {
		let targetDir = target
		switch (targetDir) {
			case '/':
				this.setState({wdir: '/'})
				break
			case '~':
			case '':
				this.setState({wdir: this.state.user.homeDir})
				break
			default:
				//relative path
				if (targetDir[0] !== '/') {
					target = this.state.wdir + targetDir
					targetDir = target
				}

				if (targetDir[targetDir.length - 1] === '/') targetDir = targetDir.slice(0, targetDir.length - 1)
				if (targetDir[0] === '/') targetDir = targetDir.slice(1, targetDir.length)
				const dir = find(directory['/'], targetDir.split('/').join('.'))
				if (dir) {
					if (target[target.length -1] !== '/') target = target + '/'
					if (target[0] !== '/') target = '/' + target

					this.setState({wdir: target})
				}
		}

	}
}

export default attachStyles({
  rootContainer: {
		display: 'inline-block',
		padding: 10,
  },
})(Console)
