var input = document.getElementById("search");

input.addEventListener("keyup", function(e) {
  e.preventDefault();
  var key = e.which || e.keyCode;
  if (key === 13) {
    fetchData(input.value.toUpperCase());
  }
});

function fetchData(str) {
  fetch("/convert?cur=" + str)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
    })
    .catch(function(err) {
      console.log(err);
    });
}
