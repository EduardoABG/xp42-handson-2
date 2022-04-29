const main = async () =>{
    const getEventos = document.querySelector("#eventos");
    getEventos.innerHTML = "";

    const dataEventos = await fetch(`${BASE_URL}/events`).then((response) => response.json());

    dataEventos.filter((evento) => new Date(evento.scheduled) > new Date()).sort((a,b) => new Date(a.scheduled) - new Date(b.scheduled))
        .slice(0, 3).forEach((evento) => {
            const articleReservas = document.createElement("article");
            articleReservas.setAttribute("class", "evento card p-5 m-3");

            const tituloEvento = document.createElement("h2");
            const date = new Date(evento.scheduled).toLocaleString("pt-br");
            tituloEvento.innerText = `${evento.name} - ${date}`;

            const atracoesEvento = document.createElement("h4");
            atracoesEvento.innerText = `${evento.attractions.join(", ")}`;

            const descricaoEvento = document.createElement("p");
            descricaoEvento.innerText = `${evento.description}`;

            articleReservas.innerHTML = `
            <a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addReserva" 
            data-bs-id="${evento._id}" data-bs-name="${evento.name}">reservar ingresso</a>`;

  
            getEventos.appendChild(articleReservas);
        });
        
    const addReserva = document.getElementById('addReserva')
    const addReservaInput = new bootstrap.Modal(addReserva);
    addReserva.addEventListener('shown.bs.modal', function (evento) {
        const botaoReserva = evento.relatedTarget;
        const idReserva = botaoReserva.getAttribute("data-bs-id");
        const nomeReserva = botaoReserva.getAttribute("data-bs-name");
        
        addReserva.querySelector("#title-booking").textContent = nomeReserva;
        addReserva.querySelector("#id").value = idReserva;
    });

    addReserva.addEventListener("hide.bs.modal", function () {
        addReserva.querySelector(".modal-title").textContent = "";
        addReserva.querySelector("#id").value = "";
        addReserva.querySelector("#input-name").value = "";
        addReserva.querySelector("#input-email").value = "";
    });

    const formulario = addReserva.querySelector("form");
    formulario.addEventListener("submit", (evento) =>{
        evento.preventDefault();
        //const formObject = new FormData(formulario);
        const body ={};

        for (let i = 0; i < formulario.elements.length - 1; i++) {
            const element = formulario.elements[i];
            body[element.name] = element.value;
        }
 

        fetch(`${BASE_URL}/bookings`, {
            method: "POST",
            headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
            .then(() => {
            alert("Reserva feita com sucesso");
    
            addReservaInput.hide();
            })
            .catch((error) => console.log(error.message));
    });
};

main();

// const main = async () => {
//     const divEventos = document.querySelector("#eventos");
//     divEventos.innerHTML = "";
  
//     const data = await fetch(`${BASE_URL}/events`).then((response) =>
//       response.json()
//     );
  
//     data
//       .filter((evento) => new Date(evento.scheduled) > new Date())
//       .sort((a, b) => new Date(a.scheduled) - new Date(b.scheduled))
//       .slice(0, 3)
//       .forEach((evento) => {
//         const article = document.createElement("article");
//         article.setAttribute("class", "evento card p-5 m-3");
  
//         article.innerHTML = `
//           <h2>${evento.name} - ${new Date(evento.scheduled).toLocaleString(
//           "pt-br"
//         )}</h2>
//           <h4>${evento.attractions.join(", ")}</h4>
//           <p>
//             ${evento.description}
//           </p>
//           <a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalReserva" data-bs-id="${
//             evento._id
//           }" data-bs-name="${evento.name}">reservar ingresso</a>
//         `;
  
//         divEventos.appendChild(article);
//       });
  
//     const modalReserva = document.getElementById("modalReserva");
//     const modalReservaObj = new bootstrap.Modal(modalReserva);
  
//     modalReserva.addEventListener("show.bs.modal", function (event) {
//       const button = event.relatedTarget;
//       const id = button.getAttribute("data-bs-id");
//       const name = button.getAttribute("data-bs-name");
  
//       modalReserva.querySelector("#title").textContent = name;
//       modalReserva.querySelector("#id").value = id;
//     });
  
//     modalReserva.addEventListener("hide.bs.modal", function () {
//       modalReserva.querySelector(".modal-title").textContent = "";
//       modalReserva.querySelector("#id").value = "";
//       modalReserva.querySelector("#name").value = "";
//       modalReserva.querySelector("#email").value = "";
//     });
  
//     const formReserva = modalReserva.querySelector("form");
  
//     formReserva.addEventListener("submit", (event) => {
//       event.preventDefault();
  
//       const body = {};
  
//       for (i = 0; i < formReserva.elements.length - 1; i++) {
//         const item = formReserva.elements[i];
  
//         body[item.name] = item.value;
//       }
  
//       fetch(`${BASE_URL}/bookings`, {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(body),
//       })
//         .then(() => {
//           alert("Reserva feita com sucesso");
  
//           modalReservaObj.hide();
//         })
//         .catch((error) => console.log(error.message));
//     });
// };
  
// main();