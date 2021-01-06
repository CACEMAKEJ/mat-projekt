import Layout from '../components/Layout.js';
import Header from '../components/Header.js';
import About from '../components/About.js';
import Landing from '../components/Landing.js';
import Team from '../components/Team.js';

export default class Index extends React.Component {
  render() {
    return (
      <Layout>
        <div className='container'>
          <Landing />
          <About />
          <Team />
        </div>
      </Layout>
    );
  }
}
