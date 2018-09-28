import * as React from 'react'
import { Classes } from 'jss'
import attachStyles from 'react-jss'
import { List } from 'immutable'

import Input from './input'
import Monitor from './monitor'

export interface User {
	homeDir: string,

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

	public constructor(props :Props) {
		super(props)

		const guestUser = {
			homeDir: '/home/guest/'
		}

		this.state = {
			history: List(),
			user: guestUser,
			wdir: '/home/guest/'
		}

		this.pushMessageToStack = this.pushMessageToStack.bind(this)
	}

  public render() {
    const { classes } = this.props

    return (
      <div className={classes.rootContainer}>
				<Monitor history={this.state.history} />
	  	  <Input wdir={this.getWDir()} pushMessage={this.pushMessageToStack}/>
	    </div>
    )
	}
	
	private pushMessageToStack(message :string) :void {
		const command = `${this.getWDir()}%${message}`
		this.setState({history: this.state.history.push(command)})
	}

	private getWDir() :string {
		return this.state.user.homeDir === this.state.wdir ? '~' : this.state.wdir
	}
}

export default attachStyles({
  rootContainer: {
		display: 'inline-block',
		padding: 10
  },
})(Console)
