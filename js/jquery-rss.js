// We will be using the google feeds api to get our rss feeds
// More details here: https://developers.google.com/feed/
google.load("feeds", "1");

// Our jQuery Code follows
$(document).ready(function() {
    // We store our pane titles in case of conflicts of names
    var paneTitles = {};

    // This function adds a tab for the new feed 
    //
    // Parameters:
    //          feedTitle: This is the title of the feed        
    function addTabControlForFeed(feedTitle) {
        var feedControl = $(document.createElement("li"));

        var feedControlLink = $(document.createElement("a"));
        feedControlLink.attr("href", "#" + feedTitle);
        feedControlLink.attr("data-toggle", "tab");
        feedControlLink.append(feedTitle);

        feedControl.append(feedControlLink);

        $("#feedMasterPanel ul").append(feedControl);
    }

    // This function adds a tab pane for the new feed
    // with a given title
    // Parameters:
    //          feedTitle: This is the title of the feed        
    function addTabPaneForFeed(feedTitle) {
        var feedPane = $(document.createElement("div"));
        feedPane.addClass("tab-pane");
        feedPane.attr("id", feedTitle);
        $("#feedDetailContainer").append(feedPane);
    }

    // This function adds an entry for a feed
    // with a given title
    //
    // Parameters:
    //          paneTitle: This is the id of the feed
    //                  pane
    //          entry: This is the feed entry to be added
    function addEntryToPage(entry, paneTitle) {

        var feedDiv = $(document.createElement("div"));
        feedDiv.addClass("row right-divided");

        var feedTitle = $(document.createElement("h2"));
        feedTitle.append(entry.title);

        var feedLink = $(document.createElement("a"));
        feedLink.attr("href", entry.link);
        feedLink.append(feedTitle);
        feedDiv.append(feedLink);

        var feedDate = $(document.createElement("small"));
        feedDate.append(entry.publishedDate);
        feedDiv.append(feedDate);


        var feedContent = $(document.createElement("p"));
        feedContent.append(entry.content);
        feedDiv.append(feedContent);

        var feedPaneDiv = $("#" + paneTitle);
        $(feedPaneDiv).append(feedDiv);
    }

    // This function shows and activates the progress bar
    function activateProgressBar() {
        $('.progress-bar').show();
        $('.progress-bar').progressbar();
    }

    // This function fades and resets the progress bar
    function dismissProgressBar() {
        $.when($('.progress-bar').fadeOut(2000)).done(function() {
            $('.progress .progress-bar').css('width', 0);
            $('.progress .progress-bar').attr('aria-valuenow', "0");
        });
    }

    // This function breaks the feed title when a 
    // special character is met.
    //
    // For more information on why we do this, refer to
    // http://learn.jquery.com/using-jquery-core/faq/how-do-i-select-an-element-by-an-id-that-has-characters-used-in-css-notation/
    //
    // Parameters:
    //          feedTitle: This is the initial title
    function getSanitizedPaneTitle(feedTitle) {
        var re = /(\s|-|\.|\*|\\|:|\[|\]).*/;
        var paneTitle = feedTitle.replace(re, "");

        return paneTitle;
    }

    // This function checks and returns a non duplicate
    // version of a pane title
    //
    // Parameters:
    //          paneTitle: This is the title of the pane after
    //                  sanitization.
    function getNonDuplicatePaneTitle(paneTitle) {
        if (paneTitles[paneTitle] !== undefined) {
            paneTitles[paneTitle] = paneTitles[paneTitle] + 1;
            paneTitle = paneTitle + "_" + (paneTitles[paneTitle]);
        } else {
            paneTitles[paneTitle] = 1;
        }

        return paneTitle;
    }

    // This function gets the feedObject for a given url
    // and adds it to the page
    // 
    // Parameters:
    //          feedUrl: This is the url entered by the user 
    function getFeedWithURL(feedUrl) {
        var feed = new google.feeds.Feed(feedUrl);

        activateProgressBar();

        feed.load(function(result) {
            if (!result.error) {

                var paneTitle = getSanitizedPaneTitle(result.feed.title);

                paneTitle = getNonDuplicatePaneTitle(paneTitle);

                addTabControlForFeed(paneTitle);
                addTabPaneForFeed(paneTitle);

                $(result.feed.entries).each(function(index) {
                    addEntryToPage(this, paneTitle);
                });
            }

            dismissProgressBar();
        });
    }

    // This is a handler for the submit button for the feed url
    // It extracts the value of the url, and calls getFeedWithUrl
    // if it is non null
    $("#rssLinkForm").submit(function(event) {
        event.preventDefault();

        feedUrl = $("#feedURL").val();

        if (feedUrl !== "") {
            getFeedWithURL(feedUrl);
        } else {
            console.log("Null Input");
        }
    });

    // This is the click handler for the hide paragraphs button
    // It checks the current state of the displayed paragraphs
    // and:
    // Slides them down if they were hidden
    // OR
    // Slides them up if they were visible
    $("#hideParagraphsButton").click(function(event) {
        event.preventDefault();
        if ($("#feedDetailContainer .active p").is(":hidden")) {
            $("#feedDetailContainer .active p").slideDown(400);
        } else {
            $("#feedDetailContainer .active p").slideUp(400);
        }
    });
});