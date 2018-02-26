(function() {
  //  Initialize Firebase
  
  var config = {
    apiKey: "AIzaSyCSDyANTievIdqXl5-_akHROQl6rTyr5rg",
    authDomain: "stock-frontend-dc995.firebaseapp.com",
    databaseURL: "https://stock-frontend-dc995.firebaseio.com/",
    storageBucket: "stock-frontend.appspot.com",
    projectId:"stock-frontend",
    messagingSenderId: "738862320528"
  };
  var app=firebase.initializeApp(config);

  var db = firebase.firestore(app);

  // Get elements
  const txtEmail = document.getElementById('txtEmail');
  const txtPassword = document.getElementById('txtPassword');
  const btnLogin = document.getElementById('btnLogin');
  const btnSignup = document.getElementById('btnSignup');
  const bthLogout = document.getElementById('btnLogout');

  // Add login Event
  btnLogin.addEventListener('click', e => {
    // Get email and password
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    // Sign in
    const promise = auth.signInWithEmailAndPassword(email,pass);
    promise.catch(e => console.log(e.message));
  });

    // Add Signup Event
    btnSignup.addEventListener('click', e => {
      // Get email and password

      const email = txtEmail.value;
      const pass = txtPassword.value;
      const auth = firebase.auth();
      var user = firebase.auth().currentUser;

      user.sendEmailVerification().then(function() {
        user.sendEmailVerification();
       // Email sent.
        }).catch(function(error) {
       // An error happened.
        });

      // Sign in
      const promise = auth.createUserWithEmailAndPassword(email,pass).then(function(user) {
        return user.updateProfile({'displayName': document.getElementById("txtName").value});
      });
      promise.catch(e => console.log(e.message));
    });

    // Add Logout Event
    btnLogout.addEventListener('click', e => {
      firebase.auth().signOut();
    });

    // Add a realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
	    var user = firebase.auth().currentUser;
      if(firebaseUser){
        console.log(firebaseUser);
        document.getElementById("btnLogin").style.display = "none";
        document.getElementById("btnLogout").style.display = "block";

	    //db.collection("PortfolioDetails").where("UID", "==", "YsaBhjl4lLZsSU0PyNNiCa4LO9q1")
	    db.collection("PortfolioDetails").where("UID", "==", user.uid)
        .get()
        .then(function(querySnapshot){
			querySnapshot.forEach(function(doc) {
				if (doc.exists) {
					console.log("Document data:", doc.data());
				} else {
					// doc.data() will be undefined in this case
					console.log("No such document!");
				}

			});
        }).catch(function(error) {
		    console.log("Error getting document:", error);
		});

        console.log(" RAVI 3");

      }else {
        console.log('not logged in');
        document.getElementById("btnLogin").style.display = "block";
        document.getElementById("btnLogout").style.display = "none";

      }
    });
}());
