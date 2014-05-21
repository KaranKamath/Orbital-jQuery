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

        // TODO: create a li jQuery object
        
        // TODO: create an a jQuery object
        
        // TODO: give the "a" object an href attribute of "#" + feedTitle
        // TODO: give the "a" object a data-toggle attribute of "tab"
        

        // TODO: add the title within the <a></a>
        
        // TODO: add the a object to the li object
        
        // TODO: add the li object to the ul in feedMasterPanel
        
        // Hints: Use document.createElement/jQuery alternative, .append, .attr
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
        // TODO: Look up documentation for bootstrap-progressbar plugin
        // TODO: Show the element with the progress-bar class
        // TODO: Make the Bar Progress

        // Hints: Look up .show, and find the relevant call for progressing the bar
    }

    // This function fades and resets the progress bar
    function dismissProgressBar() {
        // TODO: First, fade out the element with the progress-bar class
        // over 2 seconds. When that is done:
        // 1. set the width css attribute of the progress bar to 0
        // 2. set the aria-value now attribute of the progress bar to 0
        
        // Hints: Look up $.when, and it's chained done call
        // Also useful here are .css, and .attr
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
        //TODO: Extract the value of the input, and pass it to 
        //      getFeedWithUrl if non-null

        // Hints: Look up .val
    });

    // This is the click handler for the hide paragraphs button
    // It checks the current state of the displayed paragraphs
    // and:
    // Slides them down if they were hidden
    // OR
    // Slides them up if they were visible
    $("#hideParagraphsButton").click(function(event) {
        event.preventDefault();
        
        // TODO: Implement the logic here

        // Hints: Use .is, .slideDown, .slideUp 
    });
});