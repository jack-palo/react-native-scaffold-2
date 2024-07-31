Feature: Login and Landing Screen
    As a user
    I want to be able to login with my username and password
    So that I can access the landing screen

    Scenario: Successful login and redirect to landing screen
        Given I am on "sign-in" screen
        Then I see "emailInput"
        And I type "sample@email" into "emailInput"
        And I type "xxxxx" into "passwordInput"
        And I tap "signInButton"

        Then I should see "home-screen"