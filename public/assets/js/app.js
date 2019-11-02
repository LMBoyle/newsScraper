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
  savedTab,
  noteText,
  noteDiv;

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
    url: "/api/saved",
    data: {
      title: saveTitle,
      link: saveLink
    }
  })
  .then(data => console.log("Saved: ", data));
  location.reload()
}

// Save a note
postNewNote = function() {
  thisId = $(this).attr("data-id")
  noteText = $("#articleNote").val()

  $.ajax({
    method: "POST",
    url: "/api/saved/note/" + thisId,
    data: {
      body: noteText
    }
  })
  .then(data => console.log("Saved Note: ", data));
  // location.reload()
}

// Get Notes
getNotes = function() {
  thisId = $(this).attr("data-id")

  $.ajax({
    method: "GET",
    url: "/api/saved/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      noteDiv = $(".noteText[data-id='" + thisId + "']")
      // noteDiv.empty()

      if (data.note === undefined || data.note === null || data.note === ""){
        noteDiv.append("<p>" + "No note(s) yet" + "<p>")
      }
      else {
        noteDiv.append("<p>" + data.note.body + "</p>")
      }
    });
}

// Delete a saved article
deleteSaved = function() {
  thisId = $(this).attr("data-id")
  console.log(thisId)

  $.ajax({
    method: "POST",
    url: "/api/saved/delete/" + thisId,
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
    url: "/api/saved/" + thisId,
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
  // When note button is clicked
  $(".noteBtn").on("click", getNotes)
  // When trash button is clicked
  $(".trashBtn").on("click", deleteSaved)
  // When link button is clicked
  $(".savedLinkBtn").on("click", changeSeen)
  // Get tab
  $(".nav-item").on("click", getTab)
  // Set Tab
  setTab();
})