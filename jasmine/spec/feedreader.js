/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* A test suite just contains a related set of tests. This suite
    * is all about the RSS feeds definitions, the allFeeds variable
    * in our application.
    */
    describe('RSS Feeds', function() {

        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('are defined and not empty', function () {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).toBeTruthy();
            });
        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('names are defined and not empty', function () {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).toBeTruthy();
            });
        });
    });


    /* Test suite named "The menu" for testng the menu behavior*/

    describe('The menu', function() {
        /* Test that ensures the menu element is hidden by default. */

        it('is hidden by default', function () {
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });

        /* Test that ensures the menu changes visibility when the
         * menu icon is clicked.
         */

        it('changes visibility when the menu icon is clicked', function () {
            // Checks tha the menu is visible
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBeFalsy();

            // Checks that the menu is hidden
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });
    });

    /* Test suite named "Initial Entries" */

    describe('Initial Entries', function() {

        /* Test that ensures when the loadFeed function is called and
         * completes its work, there is at least a single .entry element
         * within the .feed container. loadFeed() is asynchronous so we use
         * beforeEach and asynchronous done() function.
         */

        /* Make sure the content loads with a short delay, 500ms is sufficient
        * time.
        */
        beforeEach(function(done) {
            setTimeout(function() {
                done();
            }, 500);
        });

        // Checks that there is an article element
        it('has at least an entry element on load', function() {
            expect($('article').get().length).toBeGreaterThan(0);
        });
    });

    /* Test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {

        /* Test that ensures when a new feed is loaded by the loadFeed
         * function that the content actually changes.
         */

        // Create variable to hold feeds and comparison
        var previousFeed, currentFeed;

        beforeEach(function(done){
            // Assign content of the first feed to previous feed variable
            loadFeed(0, function() {
                previousFeed = $('.feed').find("h2").text();
                console.log(previousFeed);
            });
            // Assign content of the second feed to current feed variable
            loadFeed(1, function() {
                currentFeed = $('.feed').find("h2").text();
                console.log(currentFeed);
                done();
            });
        });

        it('new feed content has been updated', function(done){
            //Check that the content is not the same
            expect(previousFeed).not.toEqual(currentFeed);
            done();
        });
    });
}());
