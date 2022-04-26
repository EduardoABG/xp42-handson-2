const formulario = document.querySelector('main div form');

formulario.addEventListener("submit", (event) =>{
  event.preventDefault();

  const formObject = new FormData(formulario);
  const body = {
    "name": formObject.get('name'),
    "poster": "N/D",
    "attractions": formObject.get('attractions').split(', '),
    "description": formObject.get('description'),
    "scheduled": formObject.get('scheduled'),
    "number_tickets": Number(formObject.get('capacity'))
  };
  console.log(body)

  fetch(`${BASE_URL}/events`, {
    "method": "POST",
    "headers": {
      'accept': 'application/json',
      "content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
    .then((response) =>  { 
      console.log(response);
      alert("Evento criado com sucesso");
      window.location.replace("admin.html");
    })
    .catch(error => console.error(error));
})