let React = require("react");

module.exports = React.createClass({
  clickHandler() {
    this.props.clickHandler(this.props.row, this.props.col);
  },

  render() {
    return (
      <td className={ this.props.alive ? "alive" : "dead"} onClick={ this.clickHandler } />
    );
  }
});
