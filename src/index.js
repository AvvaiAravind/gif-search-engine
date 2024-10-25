import "./style.css"; /*  for importing style.css */

const searchBtn = document.querySelector("button");
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const figure = document.querySelector("figure");
  const form = document.querySelector("form");
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  console.log(figure.firstElementChild.firstElementChild);

  if (figure.firstElementChild.firstElementChild) {
    figure.firstElementChild.firstElementChild.remove();
  }

  searchFunc();
  searchBtn.setAttribute("disabled", "");
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    searchBtn.click();
  }
});

async function searchFunc() {
  const API = `5HYMfAaVa6O12VZ6di8nQx7Fj1fKqZVn`;
  const input = document.querySelector("input").value.trim();
  const img = document.createElement("img");
  const caption = document.querySelector("figcaption");
  const imgAttibtues = {
    width: 500,
    height: 400,
  };
  setMultipleAttribute(img, imgAttibtues);
  let url = `https://api.giphy.com/v1/gifs/search?api_key=${API}&limit=1&q=`;
  url = url.concat(input);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `There was an issue with your request (Status: ${response.status}). Please try again.`
      );
    }

    const responseDetails = await response.json();

    if (responseDetails.data.length === 0) {
      throw new Error(
        `No GIFs found for the entered search term. Please try something else `
      );
    }
    console.log(responseDetails.data[0].images);

    img.src = responseDetails.data[0].images.original.url;
    img.src = responseDetails.data[0].images.original.url;
    img.title = responseDetails.data[0].alt_text;
    caption.textContent = responseDetails.data[0].title;
    img.alt = responseDetails.data[0].title;
    searchBtn.removeAttribute("disabled");
    document.querySelector("input").value = "";
  } catch (error) {
    alert(error);
    searchBtn.removeAttribute("disabled");
    document.querySelector("input").value = "";
    caption.textContent = "";
  }
  appendElement(".image-section", img);
}

function appendElement(parent, child) {
  const parentElement = document.querySelector(parent);

  if (parentElement) {
    parentElement.append(child);
    // return appendedElement;
  } else {
    console.warn(`Parent element ${parent} not found`);
    return null;
  }
}

function setMultipleAttribute(element, attributesObj) {
  for (let key in attributesObj) {
    element.setAttribute(key, attributesObj[key]);
  }
}
