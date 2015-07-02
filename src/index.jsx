let React = require("react"),
    Grid  = require("./components/grid");

require("./style/game-of-life");

React.render(
  <Grid />,
  document.getElementById('content')
);
