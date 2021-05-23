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
room_name = localStorage.getItem("Roomname");

function send() {
      kweet = document.getElementById("kweet").value;
      firebase.database().ref(room_name).push({
            kweeter: username,
            kweet: kweet,
            likes: 0
      });
}

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        console.log(message_data);
                        console.log(firebase_message_id);
                        username=message_data["kweeter"];
                        kweet2=message_data["kweet"];
                        like=message_data["likes"];
                        name_with_tag="<h4>"+username+"<img src='tick.png' class='user_tick'></h4>";
                        message_with_tag="<h4>"+kweet2+"</h4>";
                        like_btn="<button class='btn btn-info' id="+firebase_message_id+" value="+like+" onclick='update_like(this.id)'>";
                        span_with_tag="<span class='glyphicon glyphicon-thumbs-up'>Likes:"+like+"</span></button><hr>";
                        row=name_with_tag+message_with_tag+like_btn+span_with_tag;
                        document.getElementById("output").innerHTML+=row;
                  }
            });
      });
}
getData();
function update_like(message_id){
      console.log("click on like button!"+message_id);
      button_id=message_id;
      likes=document.getElementById(button_id).value;
      updated_likes=Number(likes)+1;
      console.log(updated_likes);
      firebase.database().ref(room_name).child(message_id).update({
            likes: updated_likes
      });
}

function logout(){
      window.location="index.html";
      localStorage.removeItem("Roomname");
      localStorage.removeItem("kwitter username");
}