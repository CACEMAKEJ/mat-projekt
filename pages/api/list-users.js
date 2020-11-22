import admin from 'firebase-admin';

var serviceAccount = require('../../rehamza-mprj-firebase-adminsdk-iiyyz-99cc921c51.json');
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const listUsers = async (token) => {
  const decodedToken = await admin.auth().verifyIdToken(token, true);

  if (decodedToken.admin) {
    const users = [];
    const listAllUsers = async (nextPageToken) => {
      const result = await admin.auth().listUsers(1000, nextPageToken);
      users.push(...result.users);
      if (result.pageToken) {
        await listAllUsers(result.pageToken);
      }
    };
    await listAllUsers();
    return users.map((user) => {
      return {
        email: user.email,
        uid: user.uid,
        lastSignIn: user.metadata.lastSignInTime,
        isAdmin: !!user.customClaims?.admin,
      };
    });
  } else {
    throw new Error('ehe');
  }
};

export default async (req, res) => {
  if (req.method === 'GET') {
    try {
      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
        return res.status(403).send({
          errorCode: 403,
          message: 'Auth token missing.',
        });
      }
      const users = await listUsers(token);
      res.json(users);
      res.statusCode = 200;
      res.end();
    } catch (err) {
      console.log(err);
      res.statusCode = 400;
      res.end();
    }
  }
};
