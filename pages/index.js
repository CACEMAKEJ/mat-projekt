import Layout from '../components/Layout.js'
import Header from '../components/Header.js'
import About from '../components/About.js'
import Landing from '../components/Landing.js'
import { loadFirebase } from '../lib/db.js'

export default class Index extends React.Component {
    static async getInitialProps() {
            let firebase = await loadFirebase()
            let result = await new Promise ((resolve, reject) => {
            firebase.firestore().collection('licences')
            .limit(10)
            .get()
            .then(snapshot => {
                let data = []
                snapshot.forEach(doc =>{
                    data.push(Object.assign({
                        id: doc.id
                    }, doc.data()))
                })
                
                resolve(data)
            })
            .catch(error =>{
                reject([])
            })
            
        })
        return {licences: result}

    }
    
    render(){
        
        return <Layout>

            
        
        <div className='container'>
            <Header/>
            <Landing/>
            <About/>
        </div>

    </Layout>
        
    }
}

 