import next from 'next';
import { Form, Button } from 'semantic-ui-react';
import { useState} from 'react';
import UserProvider, { UserContext } from '../components/UserContext';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return(
        <UserContext.Consumer>
            {value=>
                <div className='login-container'>
                    <Form>
                        <Form.Field>
                            <label>Email</label>
                            <input onChange={e => setEmail(e.target.value)} placeholder='example@example.com' />
                        </Form.Field>
                        <Form.Field>
                            <label>Heslo</label>
                            <input onChange={e => setPassword(e.target.value)} type='password' />
                        </Form.Field>
                        <Button onClick={()=>value.emailLogin(email, password, '/profile')} type='submit'>Přihlásit</Button>
                        <Button onClick={()=>value.logout('/')}>Odhlásit</Button>
                    </Form>
                </div>
            }
            
        </UserContext.Consumer>
    )

}

export default Login