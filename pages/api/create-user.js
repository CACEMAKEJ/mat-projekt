import admin from 'firebase-admin';

var serviceAccount = require('../../rehamza-mprj-firebase-adminsdk-iiyyz-99cc921c51.json');
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const createUser = async (token, email, password) => {
  const decodedToken = await admin.auth().verifyIdToken(token, true);
  console.log(email);
  console.log(password);

  if (decodedToken.admin) {
    await admin.auth().createUser({
      email,
      password,
    });
  } else {
    throw new Error('ehe');
  }
};

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
        return res.status(403).send({
          errorCode: 403,
          message: 'Auth token missing.',
        });
      }
      await createUser(token, req.body.email, req.body.password);
      res.statusCode = 200;
      res.end();
    } catch (err) {
      console.log(err);
      res.statusCode = 400;
      res.end();
    }
  }
};
