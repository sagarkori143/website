describe('Community Events Page - End-to-End Tests', function () {

    beforeEach(function () {
      cy.fixture('mockEvents.json').as('mockEvents');
      cy.visit('/community/events');
    });
  
  
    it('should load all events initially', function () {
      // Compare the number of rendered event items with the number in our fixture
      cy.get('@mockEvents').then((events) => {
        cy.get('[data-testid="EventPostItem"]').should('have.length', events.length);
      });
    });
  
    it('should filter upcoming events correctly', function () {
      cy.get('[data-testid="EventFilter-click"]').contains('Upcoming').click();
      cy.get('@mockEvents').then((events) => {
        const upcomingEvents = events.filter((event) => event.category === 'Upcoming');
        cy.get('[data-testid="EventPostItem"]').should('have.length', upcomingEvents.length);
        upcomingEvents.forEach((event) => {
          cy.contains(event.title).should('be.visible');
        });
        
      });
    });
  
    it('should filter recorded events correctly', function () {
      // Click on the "Recorded" filter button
      cy.get('[data-testid="EventFilter-click"]').contains('Recorded').click();
      cy.get('@mockEvents').then((events) => {
        const recordedEvents = events.filter((event) => event.category === 'Recorded');
        cy.get('[data-testid="EventPostItem"]').should('have.length', recordedEvents.length);
        recordedEvents.forEach((event) => {
          cy.contains(event.title).should('be.visible');
        });
        // Ensure no Upcoming events are shown
        events.filter((event) => event.category === 'Upcoming')
              .forEach((event) => {
          cy.contains(event.title).should('not.exist');
        });
      });
    });
  
    it('should show all events when "All" is clicked', function () {
      // Click on a different filter first
      cy.get('[data-testid="EventFilter-click"]').contains('Recorded').click();
      // Then click on "All" to reset the filter
      cy.get('[data-testid="EventFilter-click"]').contains('All').click();
      cy.get('@mockEvents').then((events) => {
        cy.get('[data-testid="EventPostItem"]').should('have.length', events.length);
      });
    });
  
    it('should display a "No Events" message when no events are found', function () {
      // For this test, simulate an empty events list.
      // One approach is to override the events state by stubbing the function that retrieves events.
      // Here, we can use cy.window() to modify the global state if your component supports it.
      // For example, if the component uses the imported "meetings" data,
      // you can set it to an empty array via local storage or a window property if implemented.
      //
      // For demonstration, assume our component uses a window property __events.
      cy.window().then((win) => {
        win.__events = []; // Simulate no events
      });
      cy.reload();
      cy.contains('No Events. Check back later!').should('be.visible');
    });
  
    it('should check if clicking an event navigates to the correct event page', function () {
      // Click the first event item and verify navigation
      cy.get('ul.grid li').first().within(() => {
        cy.get('a').click();
      });
      // Assuming the event URL contains a slug based on its title, e.g., "/events/AsyncAPI-Mentorship-Program-Kick-Off"
      cy.url().should('include', '/events/AsyncAPI-Mentorship-Program-Kick-Off');
    });
  });
  