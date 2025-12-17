const firebaseConfig = {
  apiKey: "AIzaSyCBE9DGl9eKtwJVd4zPC0YnO57f-Hw988", 
  authDomain: "turnaments-pro.firebaseapp.com",
  projectId: "turnaments-pro",
  storageBucket: "turnaments-pro.appspot.com",
  messagingSenderId: "792937340784",
  appId: "1:792937340784:web:8677f5979c55060867828c",
  databaseURL: "https://turnaments-pro-default-rtdb.firebaseio.com"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

function register() {
    const name = document.getElementById('pName').value;
    const id = document.getElementById('pID').value;
    const phone = document.getElementById('pPhone').value;
    const agree = document.getElementById('agree').checked;

    if(!agree) { alert("Niyam aur shartein manna zaruri hai!"); return; }

    if(name && id && phone) {
        database.ref('players/' + id).set({
            playerName: name,
            whatsapp: phone,
            status: "Pending"
        }).then(() => {
            alert("Registration ho gaya! Ab admin ko payment ka screenshot bhejein.");
            document.getElementById('regForm').style.display = 'none';
            document.getElementById('roomSection').style.display = 'block';
            loadRoomDetails(); 
        });
    } else { alert("Sari khali jagah bhariye!"); }
}

function loadRoomDetails() {
    database.ref('room_details').on('value', (snapshot) => {
        const data = snapshot.val();
        if(data) {
            document.getElementById('rID').innerText = data.id;
            document.getElementById('rPass').innerText = data.pass;
        }
    });
}
