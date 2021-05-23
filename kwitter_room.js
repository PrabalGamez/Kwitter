var firebaseConfig = {
      apiKey: "AIzaSyAEp0lB8fHpBclTbsOunmH2aRDNuHv1Jes",
      authDomain: "kwitter-f5499.firebaseapp.com",
      databaseURL: "https://kwitter-f5499-default-rtdb.firebaseio.com",
      projectId: "kwitter-f5499",
      storageBucket: "kwitter-f5499.appspot.com",
      messagingSenderId: "268553191178",
      appId: "1:268553191178:web:2760cd2b2b4579739444f3",
      measurementId: "G-91M6VCFQFS"
};
firebase.initializeApp(firebaseConfig);

username = localStorage.getItem("kwitter username");

document.getElementById("username").innerHTML = username;

function add_room() {
      room_name = document.getElementById("room_name").value;
      localStorage.setItem("Roomname", room_name);
      firebase.database().ref("/").child(room_name).update({
            purpose: "making room"
      });
      window.location="kwitter_page.html";
}

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                 console.log("roomnames="+Room_names);
                 row="<div class='room_name' id="+Room_names+" onclick='redirectToRoom(this.id)'>"+Room_names+"</div><hr>";
                 document.getElementById("output").innerHTML+=row;
            });
      });
}
getData();

function redirectToRoom(name){
      console.log(name);
      localStorage.setItem("Roomname", name);
      window.location="kwitter_page.html";
}

function logout(){
      window.location="index.html";
      localStorage.removeItem("Roomname");
      localStorage.removeItem("kwitter username");
}