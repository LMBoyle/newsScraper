// Vars =====================================================================

const
  baseURL = window.location.origin,
  newsURL = "/news",
  loadURL = "/news/loading";

let
  timeout,
  saveTitle,
  saveLink,
  thisId;

// Functions ================================================================

// Loading page
loadNews = () => {
  // If on the loading page
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

// Force scrape news
scrapeNewsBtn = () => {
  window.location = baseURL + loadURL
}

// Save an article
saveArticle = function() {
  saveTitle = $(this).attr("data-title")
  saveLink = $(this).attr("data-link")

  $.ajax({
    method: "POST",
    url: "/api/articles/saved",
    data: {
      title: saveTitle,
      link: saveLink
    }
  })
  .then(data => console.log(data))
}

// Save a note
postNewNote = () => {

}

// Delete a saved article
deleteSaved = () => {

}

// Change eye icon
changeSeen = function() {
  thisId = $(this).attr("data-id")
  console.log(thisId)

  $.ajax({
    method: "POST",
    url: "/api/articles/saved/" + thisId,
    data: {
      isRead: true
    }
  })
  .then(data => console.log(data))
}


// Call =====================================================================

$("document").ready(() => {
  // When page loads, run the loadNews function
  loadNews();
  // When save button is clicked
  $(".saveBtn").on("click", saveArticle)
  // When note button is clicked
  $(".noteBtn").on("click", postNewNote)
  // When trash button is clicked
  $(".trashBtn").on("click", deleteSaved)
  // When link button is clicked
  $(".savedLinkBtn").on("click", changeSeen)
})