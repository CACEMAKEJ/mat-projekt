import firebase from 'firebase/app';
import 'firebase/auth';
import UserProvider, { UserContext } from '../components/UserContext';
import Layout from '../components/Layout.js'
import Header from '../components/Header.js'

const Profile = (user) => {

    return (
         <Layout>
            <div className='profile-container'>
                <Header/>
                <div className='profile-body'>
                    <UserContext.Consumer>{value=><h2>{value.user.email}</h2>}</UserContext.Consumer>
                    <UserContext.Consumer>{value=><p>{value.user.uid}</p>}</UserContext.Consumer>   
                </div>
            </div>
            
         </Layout>
    )


}

export default Profile
            