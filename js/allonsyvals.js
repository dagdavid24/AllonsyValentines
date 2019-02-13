var config = {
  apiKey: 'AIzaSyBGcQ4YvNxY7CUkcu9IMx_viqNnNRRcOr8',
  authDomain: 'allonsyvalentines.firebaseapp.com',
  databaseURL: 'https://allonsyvalentines.firebaseio.com',
  projectId: 'allonsyvalentines',
  storageBucket: '',
  messagingSenderId: '58441954158'
};
firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

// get current year for the copyright
$('#year').text(new Date().getFullYear());

let name, email, userId;

// Submit to firebase
const submitBI = () => {
  // Get the input values
  name = $('#name')
    .val()
    .trim();
  email = $('#email')
    .val()
    .trim();
  console.log(name, email);

  // store them to firebase
  db.collection('submissions')
    .add({
      name: name,
      email: email
    })
    .then(docRef => {
      userId = docRef.id;
      console.log('Document written with ID: ', userId);
    })
    .catch(error => {
      console.error('Error adding document: ', error);
    });
};

const displayEmails = () => {
  // collect constantly reloading snapshot from firebase
  db.collection('submissions').onSnapshot(function(doc) {
    const submissions = {
      names: [],
      emails: []
    };
    const names = submissions.names,
      emails = submissions.emails;

    doc.forEach(document => {
      names.push(document.data().name);
      emails.push(document.data().email);
    });
    console.log('all submissions: ', submissions);

    // display submission
    names.forEach(name => {
      // target the html space youll create this shit in
      let div = document.createElement('div');
      // create a two col-md-6 row in the html with the name in first col and email in second col
      div.setAttribute('class', 'row');
      div.innerHTML = name;
    });
    emails.forEach(email => {
      console.log(email);
    });
  });
};

$('#basic_info').submit(function(e) {
  e.preventDefault();
});
