const params = parseQueryString(window.location.search);
  
if (!params.id) {
    window.location.replace("admin.html");
}
const tableBodySelector = document.querySelector('#table-body');
    
const main = async () => {
    tableBodySelector.innerHTML = "";
  
    const trLoadingElement = document.createElement("tr");
    const tdLoadingElement = document.createElement("td");
    tdLoadingElement.setAttribute("colspan", 5);
    tdLoadingElement.setAttribute("align", "center");
    tdLoadingElement.append("Carregando reservas...");
  
    trLoadingElement.appendChild(tdLoadingElement);
    tableBodySelector.appendChild(trLoadingElement);
  
    const [dEvent, dBookings] = await Promise.all([
      fetch(`${BASE_URL}/events/${params.id}`).then((response) =>
        response.json()
      ),
      fetch(`${BASE_URL}/bookings/event/${params.id}`).then((response) =>
        response.json()
      ),
    ]);
  
    tableBodySelector.innerHTML = "";
  
    document.querySelector("#event-name").innerHTML = dEvent?.name;
  
    if (dBookings.length === 0) {
        const noBookingTr = document.createElement("tr");
        const noBookingTd = document.createElement("td");
        noBookingTd.setAttribute("colspan", 5);
        noBookingTd.setAttribute("align", "center");
        noBookingTd.append("NENHUMA RESERVA!");

        noBookingTr.appendChild(noBookingTd);
        tableBodySelector.appendChild(noBookingTr);
        setTimeout(() => {
            alert("Nenhuma reserva encontrada");
            window.location.replace("admin.html");
        }, 1000);
        
    }
  
  
    dBookings.forEach((event, index) => {
        const trElement = document.createElement('tr');
        const thElement = document.createElement('th');
        thElement.innerText = index + 1;
        console.log(event.scheduled);

        const firstTdElement = document.createElement('td');
        const date = new Date(event.created_at).toLocaleString("pt-br");
        firstTdElement.innerText = `${date}`;

        const secondTdElement = document.createElement('td');
        secondTdElement.innerText = event.owner_name;

        const thirdTdElement = document.createElement('td');
        thirdTdElement.innerText = event.owner_email;

        const forthTdElement = document.createElement('td');
        forthTdElement.innerText = event.number_tickets;
    

        trElement.append(thElement, firstTdElement, secondTdElement, thirdTdElement, forthTdElement);
        tableBodySelector.appendChild(trElement);
    });
  };
  
  main();