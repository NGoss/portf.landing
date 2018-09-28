import * as React from 'react'
import { Classes } from 'jss'
import attachStyles from 'react-jss'

import NavBlock from './nav'
import Console from './console'

export interface Props {
  classes: Classes
}

class App extends React.Component<Props> {
  public render() {
    const { classes } = this.props

    return (
      <div className={classes.rootContainer}>
        <NavBlock />
        <div className={classes.consoleContainer}>
          <Console />
        </div>
        <div className={classes.footerContainer}>
          Portfolio v0.1 © nate goss
        </div>
      </div>
    )
  }
}

export default attachStyles({
  rootContainer: {
    backgroundColor: '#000',
    color: '#008000',
    padding: 10,
    height: 'Calc(100% - 20px)',
    width: 'Calc(100% - 20px)'
  },
  consoleContainer: {
    height: '80%',
    overflow: 'auto'
  },
  footerContainer: {
    bottom: 50,
    position: 'absolute'
  }
})(App)
