const searchBtn = document.getElementById("search");
const clearBtn = document.getElementById("clear");

function jsonSearch() {
  const destination = document
    .getElementById("destination")
    .value.toLowerCase();
  const emptyDiv = document.getElementById("emptyDiv");

  emptyDiv.innerHTML = "";

  fetch("travel_recommendation_api.json")
    .then((response) => response.json())
    .then((data) => {
      if (destination === "beach" || destination === "beaches") {
        emptyDiv.style.visibility = "visible";
        const beaches = data.beaches;
        beaches.forEach((beach) => {
          emptyDiv.innerHTML += `<div class="item">
                                    <img src="${beach.imageUrl}" alt="${beach.name}">
                                    <h2>${beach.name}</h2>
                                    <p>${beach.description}</p>
                                    <button id="visit" >Visit</button>
                                  </div>`;
        });
      }

      if (destination === "country" || destination === "countries") {
        emptyDiv.style.visibility = "visible";
        const countries = data.countries;

        countries.forEach((country) => {
          emptyDiv.innerHTML += `<h2>Country: ${country.name}<h2>`;

          country.cities.forEach((city) => {
            emptyDiv.innerHTML += `<div class="city-item">
                                  <img src="${city.imageUrl}" alt="${city.name}">
                                  <h3>${city.name}</h3>
                                  <p>${city.description}</p>
                                  <button id="visit">Visit</button>
                                </div>`;
          });
        });
      }

      if (destination === "temple" || destination === "temples") {
        emptyDiv.style.visibility = "visible";
        const temples = data.temples;
        temples.forEach((temple) => {
          emptyDiv.innerHTML += `<div class="item">
                                    <img src="${temple.imageUrl}" alt="${temple.name}">
                                    <h2>${temple.name}</h2>
                                    <p>${temple.description}</p>
                                    <button id="visit">Visit</button>
                                  </div>`;
        });
      }
    })
    .catch((error) => console.error("Error fetching JSON data:", error));
}

searchBtn.addEventListener("click", jsonSearch);

function clearResults() {
  document.getElementById("destination").value = "";
  const emptyDiv = document.getElementById("emptyDiv");
  emptyDiv.innerHTML = "";
  emptyDiv.style.visibility = "hidden";
}

clearBtn.addEventListener("click", clearResults);
