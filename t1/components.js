'use strict';

// tehdään oma komponentti(nuolifunktio), joka rakentaa rivit ravintolalle -> rakentaa html rivin yhtä ravintolaa varten
// ---->
// define arrow function named restaurantRow that takes a single parameter restaurant (yksittäinen ravintola for of loopista)
const restaurantRow = (restaurant) => {
  const {name, company, address} = restaurant; // use destructuring to extract the name and company properties from the restaurant object./restaurantista haetaan nimi ja company
  const rivi = document.createElement('tr'); // luodaan rivit

  // ravintolan nimi
  const nimi = document.createElement('td');
  nimi.innerText = name;

  // company
  const firma = document.createElement('td');
  firma.innerText = company;

  // ravintolan osoite data
  const osoite = document.createElement('td');
  osoite.innerText = address;

  rivi.append(nimi, firma, osoite);
  return rivi; // return tr element
};

// restaurantModal (dialogi)
const restaurantModal = (restaurant, menu) => {
  const {name, company, address, city, postalCode, phone} = restaurant;

  // rakennetaan koko listan HTML
  let listaHTML = '';

  // haetaan menun ruokalajit (course)
  menu.forEach((course) => {
    // destrukturointi
    const {name, price, diets} = course;
    //  listaHTML = `<li>${course.name}, hinta, allergiat</li>`
    listaHTML += `
    <li>
      <h4>${name}</h4>
      <p>Hinta: ${price || 'ei ilmoitettu'} €</p>
      <p>Allergeenit: ${diets || 'ei ilmoitettu'}</p>
    </li>`;
  });

  // rakennetaan modaalin HTML
  const ravintolaHTML = `
          <header>
            <h3>${name}<h3>
            <p>${company}
            </p>
          </header>
          <address>
            ${address}<br>
            ${postalCode} ${city}<br>
            ${phone || ''}<br>
          </address>
          <div>
            <h3>Päivän ruokalista</h3>
            <ul>
              ${listaHTML}
            </ul>
          </div>
      `;

  return ravintolaHTML;
};

export {restaurantRow, restaurantModal};
