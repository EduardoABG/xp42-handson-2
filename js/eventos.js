const main = async () =>{
    const getEventos = document.querySelector("#eventos");
    getEventos.innerHTML = "";

    const dataEventos = await fetch(`${BASE_URL}/events`).then((response) => response.json());

    dataEventos.filter((evento) => new Date(evento.scheduled) > new Date()).sort((a,b) => new Date(a.scheduled) - new Date(b.scheduled))
        .forEach((evento) => {
            const articleReservas = document.createElement("article");
            articleReservas.setAttribute("class", "evento card p-5 m-3");

            const tituloEvento = document.createElement("h2");
            const date = new Date(evento.scheduled).toLocaleString("pt-br");
            tituloEvento.innerText = `${evento.name} - ${date}`;

            const atracoesEvento = document.createElement("h4");
            atracoesEvento.innerText = `${evento.attractions.join(", ")}`;

            const descricaoEvento = document.createElement("p");
            descricaoEvento.innerText = `${evento.description}`;

            const botao = document.createElement("a");
            botao.setAttribute("href","#");
            botao.setAttribute("class","btn btn-primary");
            botao.setAttribute("data-bs-toggle","modal");
            botao.setAttribute("data-bs-target","#addReserva");
            botao.setAttribute("data-bs-id",evento._id);
            botao.setAttribute("data-bs-name",evento.name);
            botao.innerText = "reservar ingresso";

            articleReservas.append(tituloEvento,atracoesEvento,descricaoEvento,botao)
            getEventos.appendChild(articleReservas);
            
            getEventos.appendChild(articleReservas);
        });
        
    const addReserva = document.getElementById("addReserva")
    const addReservaInput = new bootstrap.Modal(addReserva);
    addReserva.addEventListener("show.bs.modal", function (evento) {
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