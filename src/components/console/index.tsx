import * as React from 'react'
import { Classes } from 'jss'
import attachStyles from 'react-jss'
import { List } from 'immutable'

import Input from './input'
import Monitor from './monitor'
import { ls, cd, help, setUpFreePrint, cat } from './exec'

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
		this.getParentDir = this.getParentDir.bind(this)

		setUpFreePrint(this.freePrint)
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
		const catRegex = /^cat/

		switch (true) {
			case lsRegex.test(message):
				ls(this.state.wdir, this.state.wdir === '/')
				break
			case helpRegex.test(message):
				help()
				break
			case cdRegex.test(message):
				switch (message.split('cd')[1].trim()) {
					case '/':
						this.setState({wdir: '/'})
						break
					case '':
						this.setState({wdir: this.state.user.homeDir})
						break
					default:
						this.setState({wdir: cd(message.split('cd')[1].trim(), this.state.wdir)})
						break
				}
				break
			case catRegex.test(message):
				cat(message.split('cat')[1].trim(), this.state.wdir)
		}
	}

	private getWDir() :string {
		return this.state.user.homeDir === this.state.wdir ? '~' : this.state.wdir
	}

	
	private getParentDir() :string {
		const regex = /(^(\/[^\/]+)+\/)/.exec(this.state.wdir.slice(0, this.state.wdir.length - 1))
			if (regex) return regex[0]
			return '/'
	}
}

export default attachStyles({
  rootContainer: {
		display: 'inline-block',
		padding: 10,
  },
})(Console)
