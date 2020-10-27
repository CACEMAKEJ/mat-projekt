import firebase from 'firebase/app';
import 'firebase/auth';
import UserProvider, { UserContext } from '../components/UserContext';

const Profile = (user) => {

    return (
        <UserContext.Consumer>
            {value=>
                <div className='user-container'>
                    <h1>{value.user.email}</h1>
                </div>
            }
        </UserContext.Consumer>     
    )


}


export default Profile
            