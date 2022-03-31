const apiSearch = 'https://restcountries.com/v3.1/name/';
const countriesWrapper = document.querySelector('#countries-wrapper');
const searchButton = document.querySelector('#search-country');
const form = document.querySelector('form');
form.addEventListener('submit', (e) => e.preventDefault());

searchButton.addEventListener('keypress', (e) => {
  if (e.keyCode === 13) {
    const query = searchButton.value;
    downloadCountryAPI(query);
    searchButton.value = '';
  }
});

const downloadCountryAPI = (query) => {
  fetch(apiSearch + query)
    .then((res) => res.json())
    .then((data) => {
      createCountryData(data);
    });
};

async function getCountry(country) {
  const res = await fetch(apiSearch + country);
  const data = await res.json();
  //   console.log(data);
  //   createCountry(data);
  createCountryData(data);
}

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
  getNativeName() {
    return Object.values(this.name.nativeName)[0].official;
  }
}
function eraseData() {
  countriesWrapper.innerHTML = '';
}

function createCountryData(countries) {
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
}

function createCountryView(element) {
  eraseData();

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
              Area: ${element.area} km<sup>2</sup><br />
              <a href="${element.maps}" target="_blank" rel="noopener noreferrer">Google Maps</a>
            </p>
            <p id="all">
              Currency: ${Object.values(element.currencies)} <br />
              Population: ${element.population}<br />
              WebDomain: ${element.tld} <br />
              Capital: ${element.capital} <br />
              Language: ${Object.values(element.languages)}
            </p>
  
      `;
  countriesWrapper.append(countryWrapper);
}
