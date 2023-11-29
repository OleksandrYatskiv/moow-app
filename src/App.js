import { Provider } from 'react-redux';
import './App.sass';
import GoogleMapComponent from './components/Map/Map';
import Cargo from './components/cargo/cargo';
import ContactInfo from './components/contactInfo/contactInfo';
import Layout from './components/layout/layout';
import Payment from './components/payment/Payment';
import RouteSection from './components/routeCard/renderCards';
import store from './store/store';

function App() {

  return (
    <Provider store={store}>
      <div className="App">
        <Layout>
          <main>
            <h1>Замовити</h1>
            <GoogleMapComponent />
            <RouteSection />
            <Cargo />
            <ContactInfo />
            <Payment />
          </main>
        </Layout>
      </div>
    </Provider>
  );
}

export default App;
