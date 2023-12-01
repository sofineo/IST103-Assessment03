// JS Script File

window.addEventListener('load', () => {

  // SignIn with Google
  document.getElementById('sign-in-google').addEventListener('click', function() {

    const provider = new firebase.auth.GoogleAuthProvider();

    provider.addScope('email')
    firebase.auth().signInWithPopup(provider)
      .then(function(result) {
          console.log('Logging successfully', result.user)
      })
      .catch(function(error) {
        console.log('Logging fail', error)
      });

  });

  // SignIn with Email
  document.getElementById('sign-in-traditional').addEventListener('click', () => {

    const emailTxt = document.getElementById('email').value;
    const passTxt = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(emailTxt, passTxt)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      // ...
      console.log('Logging successfully')
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log('Logging fail', error)
  });
  })

  // SignIn by Phone
  function getPhoneNumberFromUserInput() {
    //no space in the phone number
    return "+16043135373"
  };

  function getCodeFromUserInput() {
    const code = prompt('Type the code here:')
    return (code)
  }
  document.getElementById('sign-in-phone').addEventListener('click', () => {

    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');

    const phoneNumber = getPhoneNumberFromUserInput();
    const appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;

          const code = getCodeFromUserInput();
          // const code = '123456';
          confirmationResult.confirm(code).then((result) => {
            // User signed in successfully.
            const user = result.user;
            // ...
          }).catch((error) => {
            // User couldn't sign in (bad verification code?)
            // ...
          });

          
          alert(window.confirmationResult)
          // ...
          console.log('Logging successfully')
        }).catch((error) => {
          // Error; SMS not sent
          // ...
          alert(error)
          console.log('Logging fail', error)
        });

  })

});
