import { BrowserRouter, Route } from 'react-router-dom';
import PostMain from './page/post/PostMain';
import PostView from './page/post/PostView';
import Register from './page/Register'
import Loign from './page/Login'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route  path='/postView/:no' component={PostView} />
        <Route  path='/board' component={PostMain} />
        <Route  path='/register' component={Register} />
        <Route exact path='/' component={Loign} />
      </BrowserRouter>
    </div>
  );
}

export default App;
