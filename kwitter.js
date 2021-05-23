function save_name(){
    username = document.getElementById("name").value;
    localStorage.setItem("kwitter username", username);
    window.location="kwitter_room.html";
}