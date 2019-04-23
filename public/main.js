const input = document.getElementById('search');

input.addEventListener('keyup', (e) => {
  e.preventDefault();
  const key = e.which || e.keyCode;
  if (key === 13) {
   fetchData(input.value.toUpperCase());
  }
});

const fetchData = (str) => {
  fetch(`/convert?cur=${str}`)
    .then((response)=> {
      return response.json();
    })
    .then((data)=> {
      console.log(data);
    })
    .catch((err)=> {
      console.log(err);
    })
};
