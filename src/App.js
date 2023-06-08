import styles from './App.module.css';
import NavBar from './components/NavBar';
import { Container } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';
import './api/axiosDefault';
import SignUpForm from './pages/auth/SignUpForm'



function App() {
  return (
    <div className={styles.App}>
      <NavBar />
        <Container className={styles.Main}>
          <Switch>
            <Route exact path="/" render={() => <h1>Home Page</h1>} />
            <Route exact path="/signin" render={() => <h1>Sign in</h1>} />
            <Route exact path="/register" render={() => <SignUpForm />} />
            <Route render={() => <p>Page not found!</p>} />
          </Switch>
        </Container>
    </div>
  );
}

export default App;