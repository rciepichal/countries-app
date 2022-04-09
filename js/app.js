// Variables

const apiSearch = 'https://restcountries.com/v3.1/name/';
const countriesWrapper = document.querySelector('#countries-wrapper');
const searchButton = document.querySelector('#search-country');
const form = document.querySelector('form');
const button = document.querySelector('#input-submit');
const modalDiv = document.querySelector('.modal');
const modalDivX = document.querySelector('.modal i');

// Class

class newEntry {
  constructor(flags, name, coatOfArms, region, subregion, area, maps, currencies, population, tld, capital, languages) {
    this.flags = flags.svg;
    this.name = name;
    this.coatOfArms = coatOfArms.svg;
    this.region = region;
    this.subregion = subregion;
    this.area = area;
    this.maps = maps.googleMaps;
    this.currencies = currencies;
    this.population = population;
    this.tld = tld;
    this.capital = capital;
    this.languages = languages;
  }
  getArea() {
    return this.area.toLocaleString();
  }
  getNativeName() {
    return Object.values(this.name.nativeName)[0].official;
  }
  getPopulation() {
    return this.population.toLocaleString();
  }
  getCurrencies() {
    for (const currency in this.currencies) {
      return `${this.currencies[currency].name} (${this.currencies[currency].symbol})`;
    }
  }
}

// Event listeners

form.addEventListener('submit', (e) => e.preventDefault());

modalDivX.addEventListener('click', () => {
  modalDiv.classList.remove('visible');
});

searchButton.addEventListener('keypress', (e) => {
  if (e.keyCode === 13) {
    modalDiv.classList.remove('visible');
    const query = searchButton.value;
    downloadCountryAPI(query);
    searchButton.value = '';
  }
});
button.addEventListener('click', () => {
  modalDiv.classList.remove('visible');
  const query = searchButton.value;
  downloadCountryAPI(query);
  searchButton.value = '';
});
// Functions
const countryNotFound = () => {
  eraseData();
  modalDiv.classList.add('visible');
  // const noText = document.createElement('h2');
  // noText.innerText = 'Country not found, try again!';
  // countriesWrapper.append(noText);
};

const downloadCountryAPI = (query) => {
  fetch(apiSearch + query)
    .then((res) => res.json())
    .then((data) => {
      createCountryData(data);
    })
    .catch(() => countryNotFound());
};

const eraseData = () => (countriesWrapper.innerHTML = '');

const createCountryData = (countries) => {
  eraseData();
  for (const el of countries) {
    const { flags, name, coatOfArms, region, subregion, area, maps, currencies, population, tld, capital, languages } =
      el;
    const newCountry = new newEntry(
      flags,
      name,
      coatOfArms,
      region,
      subregion,
      area,
      maps,
      currencies,
      population,
      tld,
      capital,
      languages
    );
    // console.log(newCountry);
    createCountryView(newCountry);
  }
};

const createCountryView = (element) => {
  const countryWrapper = document.createElement('div');
  countryWrapper.classList.add('country');
  // console.log(Object.values(name.nativeName)[0].official);
  countryWrapper.innerHTML = `
            <div class="flag-wrapper"><img src="${element.flags}" alt="" /></div>
            <div class="country-name">
              <h3 id="country-name">${element.name.official}</h3>
              <p id="country-fullname">${element.getNativeName()}</p>
            </div>
            <div class="coa"><img src="${element.coatOfArms}" alt="" /></div>
            <p id="geo">
              Region: ${element.region}<br />
              Subregion: ${element.subregion} <br />
              Area: ${element.getArea()} km<sup>2</sup><br />
              <a href="${element.maps}" target="_blank" rel="noopener noreferrer">Google Maps</a>
            </p>
            <p id="all">
              Currency: ${element.getCurrencies()} <br />
              Population: ${element.getPopulation()}<br />
              WebDomain:  *${element.tld} <br />
              Capital: ${element.capital} <br />
              Language: ${Object.values(element.languages)}
            </p>
  
      `;
  countriesWrapper.append(countryWrapper);
};
