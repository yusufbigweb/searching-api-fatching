const apikey = "03be6bc5ea174e35bf51f4b551c695a1";

const blogContainer = document.getElementById("blog-container");

const searchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

async function fatchApi() {
  try {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apikey=${apikey}`;

    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error("Error of Random News Fatching error", error);
    return [];
  }
}

searchButton.addEventListener("click", async () => {
  const query = searchField.value.trim();
  if (query !== "") {
    try {
      const articles = await fatchNewsQuery(query);
      displayBlogs(articles);
    } catch (error) {
      console.error(`Error of Random News Fatching error`, error);
    }
  }
});

searchField.addEventListener("keydown", async (event) => {
  const query = searchField.value.trim();
  if (event.key === "Enter") {
    try {
      const articles = await fatchNewsQuery(query);
      displayBlogs(articles);
    } catch (error) {
      console.error(`Error of Random News Fatching error`, error);
    }
  }
});

async function fatchNewsQuery(query) {
  try {
    const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apikey=${apikey}`;

    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error("Error of Random News Fatching error", error);
    return [];
  }
}

function displayBlogs(articles) {
  blogContainer.innerHTML = "";

  articles.forEach((article) => {
    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card");

    const img = document.createElement("img");

    img.src = article.urlToImage;
    img.alt = article.title;

    const title = document.createElement("h2");
    const truncatedTtile =
      article.title.length > 30
        ? article.title.slice(0, 30) + "...."
        : article.title;
    title.textContent = truncatedTtile;

    const description = document.createElement("p");
    // const truncatedDes = article.description.length > 125 ? article.description.slice(0, 125) + "...." : article.description;
    // description.textContent = truncatedDes;
    description.textContent = article.description;

    blogCard.appendChild(img);
    blogCard.appendChild(title);
    blogCard.appendChild(description);

    blogCard.addEventListener("click", () => {
      window.open(article.url, "_blank");
    });

    blogContainer.appendChild(blogCard);
  });
}

(async () => {
  try {
    const articles = await fatchApi();
    displayBlogs(articles);
  } catch (error) {
    console.error("Error of Random News Fatching error", error);
  }
})();
