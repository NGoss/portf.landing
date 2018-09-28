import * as React from 'react'
import { Classes } from 'jss'
import attachStyles from 'react-jss'
import { List } from 'immutable'

export interface Props {
	classes: Classes,
	history: List<string>
}

class Monitor extends React.Component<Props> {

  public render() {
    const { classes, history } = this.props

    return (
      <div className={classes.rootContainer}>
        {history.map((command :string, key :number) => <p key={key} className={classes.text}>{command}</p>)}
		  </div>
    )
	}
}

export default attachStyles({
  rootContainer: {
    display: 'block',
		fontSize: 20,
  },
  text: {
		display: 'block',
		paddingTop: 14
  }
})(Monitor)
