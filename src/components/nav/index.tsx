import * as React from 'react'
import { Classes } from 'jss'
import attachStyles from 'react-jss'

import Item from './item'

export interface Props {
  classes: Classes,
}

class Nav extends React.Component<Props> {
  public render() {
    const { classes } = this.props

    return (
      <div className={classes.rootContainer}>
	  	  <Item name="Resume" link="/resume" />
		    <Item name="Projects" link="/projects" />
	    </div>
    )
  }
}

export default attachStyles({
  rootContainer: {
	  display: 'inline-block',
	  margin: '20px 0'
  },
})(Nav)
