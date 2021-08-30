import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Footer, Login, Header, Posts, Profile, Register } from './components';

const App = () => {
  const [posts, setPosts] = useState([]);

  return  (
    <Router>

      <Header posts={posts} setPosts={setPosts}/>
      
      <main>
        <Switch>
          <Route path="/posts" render={ () => {return <Posts posts={posts} setPosts={setPosts} />} }/>
          <Route path="/profile" render={ () => {return <Profile posts={posts} setPosts={setPosts} />} }/>
          <Route path="/register" component={Register} />
          <Route path="/" component={Login} />
        </Switch>
      </main>

      <Footer />

    </Router> );
};

ReactDOM.render(<App />, document.getElementById('app'));
