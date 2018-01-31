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

       // sqlite3 database connection
        const sqlite3 = require('sqlite3').verbose();

        var db = new sqlite3.Database('C:\\\\Users\\Ravi\\Downloads\\stock_backend\\stocksqlite.db')
        console.log('Connected to the stocksqlite database.');


          // insert one row into the registeredownerstable
          db.all("SELECT firebaseID FROM registeredowners where firebaseID=?",[userRecord.uid], function(err, rows) {
            if(rows.length == 0){
                db.run('INSERT INTO registeredowners(firebaseID,registeredowneremail,newuser) VALUES(?,?,?)', [userRecord.uid,userRecord.email,0])
                console.log('A row has been inserted');
              } else {
                    db.run('UPDATE registeredowners SET firebaseID=?, registeredowneremail=?,newuser=? where firebaseID =?',[userRecord.uid,userRecord.email,0,userRecord.uid])
                    console.log('A row has been updated');
                  }

          });


            // select all row in registeredowners
            db.all("SELECT * FROM registeredowners", function(err, rows) {
              rows.forEach(function (row) {
                console.log(row.registeredownerid, row.firebaseID,row.registeredowneremail,row.newuser);

              })
            });


          // close the database connection
          db.close();


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
