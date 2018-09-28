import * as React from 'react'
import { Classes } from 'jss'
import attachStyles from 'react-jss'

export interface Props {
  classes: Classes,
}

class Cursor extends React.Component<Props> {
  public render() {
    const { classes } = this.props

    return (
      <div className={classes.cursor} />
    )
  }
}

export default attachStyles({
	cursor: {
		height: '1em',
		width: '0.5em',
    backgroundColor: '#00ff0060',
    display: 'inline-block'
	},
})(Cursor)
