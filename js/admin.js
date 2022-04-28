const getEvents = async() =>{
    try{
        const response = await fetch(`${BASE_URL}/events`);
        const data = await response.json();
        return data;
    } catch(error){
        console.log(error);
    }
}
const renderElements = (eventArray) => {
    const tableBodySelector = document.querySelector('#table-body');
    eventArray.forEach((event, index) => {
        const trElement = document.createElement('tr');
        const thElement = document.createElement('th');
        thElement.innerText = index + 1;

        const firstTdElement = document.createElement('td');
        const date = event.scheduled.slice(0, 10);
        const dataBr = date.split('-').reverse().join('/');
        const time = event.scheduled.substring(11,16);
        firstTdElement.innerText = `${dataBr} ${time}`;
       
        const secondTdElement = document.createElement('td');
        secondTdElement.innerText = event.name;

        const thirdTdElement = document.createElement('td');
        thirdTdElement.innerText = event.attractions.join(', ');
        
        const forthTdElement = document.createElement('td');

        const firstAElement = document.createElement('a');
        firstAElement.innerText = "Ver Reservas";
        firstAElement.classList.add('btn');
        firstAElement.classList.add('btn-dark');
        firstAElement.setAttribute('href', ('editar-reservas.html?id=' + event._id));

        const secondAElement = document.createElement('a');
        secondAElement.innerText = "Editar";
        secondAElement.classList.add('btn');
        secondAElement.classList.add('btn-secondary');
        secondAElement.setAttribute('href', ('editar-evento.html?id=' + event._id));

        const thirdAElement = document.createElement('a');
        thirdAElement.innerText = "Excluir";
        thirdAElement.classList.add('btn');
        thirdAElement.classList.add('btn-danger');
        thirdAElement.setAttribute('href', ('excluir-evento.html?id=' +event._id));
        
        forthTdElement.append(firstAElement, secondAElement, thirdAElement);
        trElement.append(thElement, firstTdElement, secondTdElement, thirdTdElement, forthTdElement);
        tableBodySelector.appendChild(trElement);
    });
}

async  function main() {
    try{
        const eventArray = await getEvents();
        console.log(eventArray);
        renderElements(eventArray);
    } catch (error) {
        console.log(error);
    }
}

main();
