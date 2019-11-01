// Vars =====================================================================

const
  baseURL = window.location.origin,
  newsURL = "/news",
  loadURL = "/news/loading";

let
  timeout,
  saveTitle,
  saveLink,
  thisId,
  selectedTab,
  savedTab;

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
  .then(data => console.log("Saved: ", data));
  location.reload()
}

// Save a note
postNewNote = () => {

}

// Delete a saved article
deleteSaved = function() {
  thisId = $(this).attr("data-id")
  console.log(thisId)

  $.ajax({
    method: "POST",
    url: "/api/articles/saved/delete/" + thisId,
  })
  .then(data => console.log("Deleted: ", data));
  location.reload()
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
  .then(data => console.log("Looked At: ", data));
  location.reload()
}

// Get Tab
getTab = function() {
  selectedTab = $(this)[0].text.trim()
  sessionStorage.clear();
  sessionStorage.setItem("tab", selectedTab)
}

// Set tab on reload
setTab = () => {
  savedTab = sessionStorage.getItem("tab")
  console.log("saved tab: ", savedTab)
  if ($("#articleTab").hasClass("active") && savedTab === "Saved Articles") {
    $("#articleTab").toggleClass("active")
    $("#savedTab").toggleClass("active")
    $("#articles").toggleClass("active").toggleClass("show")
    $("#saved").toggleClass("active").toggleClass("show")
  }
  else if ($("#savedTab").hasClass("active") && savedTab === "Articles") {
    $("#articleTab").toggleClass("active")
    $("#savedTab").toggleClass("active")
    $("#articles").toggleClass("active").toggleClass("show")
    $("#saved").toggleClass("active").toggleClass("show")
  }
}

// Call =====================================================================

$("document").ready(() => {
  // When page loads, run the loadNews function
  loadNews();
  // When save button is clicked
  $(".saveBtn").on("click", saveArticle)
  // When note save button is clicked
  $(".noteSaveBtn").on("click", postNewNote)
  // When trash button is clicked
  $(".trashBtn").on("click", deleteSaved)
  // When link button is clicked
  $(".savedLinkBtn").on("click", changeSeen)
  // Get tab
  $(".nav-item").on("click", getTab)
  // Set Tab
  setTab();
})