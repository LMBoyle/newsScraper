// Vars =====================================================================

const
  baseURL = window.location.origin,
  newsURL = "/news",
  loadURL = "/news/loading";

let
  timeout;

// Functions ================================================================

loadNews = () => {
  // If on the loading pAGE
  if (window.location.pathname === "/news/loading") {
    console.log("Reloading")

    // Wait then...
    timeout = setTimeout(() => {
      console.log("Boo!");
      // Reload the news page
      window.location = baseURL + newsURL
    }, 10600);
  }
  // If not the loading page
  else {
    clearTimeout(timeout)
    console.log("Not going to reload")
  }
}

scrapeNewsBtn = () => {
  window.location = baseURL + loadURL
}

// Call =====================================================================

$("document").ready(() => {
  loadNews()
  
  // $(".scrapeBtn").on("click", scrapeNewsBtn())
})