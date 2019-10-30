// Vars =====================================================================

const
  baseURL = window.location.origin,
  newsURL = "/news",
  loadURL = "/news/loading";

var
  timeout;

// Functions ================================================================

loadNews = () => {
  if (window.location.pathname === "/news/loading") {
    console.log("Reloading")

    timeout = setTimeout(() => {
      console.log("Boo!");
      window.location = baseURL + newsURL
    }, 6000);
  }
  else {
    clearTimeout(timeout)
    console.log("Not going to reload")
  }
}

scrapeNewsBtn = () => {
  // window.location = baseURL + loadURL
}

// Call =====================================================================

$("document").ready(() => {
  loadNews()
  
  $(".scrapeBtn").on("click", scrapeNewsBtn())
})