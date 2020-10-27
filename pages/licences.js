export default class Index{
    static async getInitialProps(){
        let firebase = await loadFirebase()
        let result = await new Promise((resolve, reject) => {
            firebase.firestore().collection('licences')
                .limit(10)
                .get().
                then(snapshot => {
                    let data = []
                    snpashot.forEach(doc =>{
                        data.push(Object.assign({
                            id: doc.id
                        }, doc.data))
                    })
                    resolve(data)
                }).catch(error =>{
                    reject([])
                })
        })
        return {licences: result}
    }
}