import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
    }
  }
  render() {

    return (
      <Router>
        <Route path="/" component={ERS_DispatchDetails} />
      </Router>
    )
  }
}

export default App;
window.App = App;