import * as React from 'react'
import { Classes } from 'jss'
import attachStyles from 'react-jss'

import Cursor from './cursor'

export interface Props {
  classes: Classes,
  pushMessage: Function,
  wdir: string
}

export interface State {
  command: string
}


class Input extends React.Component<Props, State> {

  public constructor(props :Props) {
    super(props)

    this.state = {
      command: ''
    }
  }

  public render() {
    const { classes, wdir } = this.props

    return (
      <div className={classes.rootContainer}>
        <p className={classes.text}>{wdir}%{this.state.command}</p><Cursor />
		  </div>
    )
  }

  public componentDidMount() {
    document.addEventListener('keypress', (event :KeyboardEvent) => {
      if (event.key === 'Enter') {
        const value = this.state.command
        this.props.pushMessage(value || ' ')
        this.setState({command: ''})
      } else {
        const value = event.shiftKey ? event.key.toUpperCase() : event.key
        this.setState({command: this.state.command + value})
      }
    })
    document.addEventListener('keydown', (event :KeyboardEvent) => {
      if (event.key === 'Backspace') {
        this.setState({command: this.state.command.slice(0, -1)})
      }
    })
  }
}

export default attachStyles({
  rootContainer: {
    display: 'block',
    fontSize: 20,
    paddingTop: 10
  },
  text: {
    display: 'inline-block'
  }
})(Input)
