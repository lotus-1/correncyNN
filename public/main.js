var input = document.getElementById("search");
var span = document.getElementById("outcome");
var title= document.createElement("h3");

input.addEventListener('keyup', function(e) {
  e.preventDefault();
  var key = e.which || e.keyCode;
  if (key === 13) {
   fetchData(input.value.toUpperCase());
   resetData();
  }
});

function fetchData(str) {
  fetch("/convert?cur=" + str)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      text = document.createTextNode(data);
      title.appendChild(text);
      span.appendChild(title);
    })
    .catch(function(err) {
      console.log("No such currency");
      text = document.createTextNode("Type the right Currency Letters please");
      title.appendChild(text);
      span.appendChild(title);
    })
}

function resetData(){
  input.value="";
  title.textContent="";
}
