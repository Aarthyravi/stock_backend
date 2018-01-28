//http://www.sqlitetutorial.net/sqlite-nodejs/connect/
var admin = require('firebase-admin');

var serviceAccount = require('C:\\\\Users\\Ravi\\Downloads\\stock frontend\\key\\stockfrontend.json');

var my_app=admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://stock-frontend-dc995.firebaseio.com'
},name='stockfrontend');

my_app.delete()
  .then(function() {
    console.log("App deleted successfully");
  })
  .catch(function(error) {
    console.log("Error deleting app:", error);
  });

my_auth=admin.auth(my_app);
function listAllUsers(nextPageToken) {
  // List batch of users, 1000 at a time.
    my_auth.listUsers(1000, nextPageToken)
    .then(function(listUsersResult) {
      listUsersResult.users.forEach(function(userRecord) {
        console.log("user", userRecord.toJSON());
      });
      if (listUsersResult.pageToken) {
        // List next batch of users.
        listAllUsers(listUsersResult.pageToken)
      }
    })
    .catch(function(error) {
      console.log("Error listing users:", error);
    });

}
// Start listing users from the beginning, 1000 at a time.
listAllUsers();
