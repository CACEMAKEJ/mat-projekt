import Header from '../components/Header.js';

const Layout = (props) => (
  <div id='App'>
    <Header />
    <div className='rehamza-content'>{props.children}</div>
  </div>
);

export default Layout;
