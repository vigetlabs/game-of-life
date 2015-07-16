import React  from 'react'
import Router from 'react-router'

let Layout = React.createClass({

  propTypes: {
    app: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return this.props.app.valueOf()
  },

  updateState() {
    this.setState(this.props.app.valueOf())
  },

  componentDidMount() {
    this.props.app.listen(this.updateState)
  },

  componentWillUnmount() {
    this.props.app.ignore(this.updateState)
  },

  render() {
    return (
      <main role="main" className="page-wrapper">
        <Router.RouteHandler { ...this.props } { ...this.state } />
      </main>
    )
  }

})

export default Layout
