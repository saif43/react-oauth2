import './App.css';
import FacebookLoginButton from './FacebookAuth';
import GoogleLoginButton from './GoogleAuth';

function App() {
  return (
    <div className="App" style={{marginTop: '10em', marginLeft: '10em'}}>
      <div style={{width: '15em'}}>
        <GoogleLoginButton />
      </div>
      <div style={{width: '15em', marginTop: '5em'}}>
        <FacebookLoginButton />
      </div>
    </div>
  );
}

export default App;
