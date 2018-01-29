(function() {

  //  Initialize Firebase

  var config = {
    apiKey: "AIzaSyCSDyANTievIdqXl5-_akHROQl6rTyr5rg",
    authDomain: "stock-frontend.firebaseapp.com",
    databaseURL: "https://stock-frontend-dc995.firebaseio.com/",
    storageBucket: "gs://stock-frontend.appspot.com",

  };
  firebase.initializeApp(config);

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
      // Sign in
      const promise = auth.createUserWithEmailAndPassword(email,pass);
      promise.catch(e => console.log(e.message));
    });

    // Add Logout Event
    btnLogout.addEventListener('click', e => {
      $('#txtEmail').text("");
      document.getElementById('txtEmail').innerHTTML ='';
      document.getElementById('txtPassword').innerHTTML ='';
      firebase.auth().signOut();
    });


    // Add a realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser){
        console.log(firebaseUser);
        btnLogout.classList.remove('hide');
      }else {
        console.log('not logged in');
        btnLogout.classList.add('hide');
      }
    });

}());
