import admin from 'firebase-admin';

var serviceAccount = require('../../rehamza-mprj-firebase-adminsdk-iiyyz-99cc921c51.json');
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const validate = async (token) => {
  const decodedToken = await admin.auth().verifyIdToken(token, true);
  const user = await admin.auth().getUser(decodedToken.uid);
  const result = {
    user: {
      uid: user.uid,
      email: user.email,
    },
  };
  return result;
};

export default async (req, res) => {
  try {
    const { token } = JSON.parse(req.headers.authorization || '{}');
    if (!token) {
      return res.status(403).send({
        errorCode: 403,
        message: 'Auth token missing.',
      });
    }
    const result = await validate(token);
    return res.status(200).send(result);
  } catch (err) {
    console.log(err);
    const result = undefined;
    return res.status(200).send(result);
  }
};
