import Products from '../components/Products.js';
import Layout from '../components/Layout.js';

export default class Produkty extends React.Component {
  render() {
    return (
      <Layout>
        <div className='container'>
          <Products />
        </div>
      </Layout>
    );
  }
}
