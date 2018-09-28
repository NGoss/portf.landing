import * as React from 'react'
import { Classes } from 'jss'
import attachStyles from 'react-jss'

export interface Props {
  classes: Classes,
  name: string,
  link: string
}

class App extends React.Component<Props> {
  public render() {
    const { classes, name, link } = this.props

    return (
      <a href={link} className={classes.link}>
		{name}
      </a>
    )
  }
} 

export default attachStyles({
	link: {
		color: 'inherit',
		fontSize: 24,
		padding: 10,
		marginRight: 20,
		border: '2px solid #008000',
		'&:hover': {
			backgroundColor: '#004400'
		},
		'&:visited': {
			color: 'inherit'
		}
	},
  })(App)
