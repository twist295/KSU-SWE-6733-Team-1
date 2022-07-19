# Sprint 2

## Sprint Story Points Forecast & Rationale
[Sprint Story Points Forecast & Rationale](https://trello.com/c/xZDQ3x5L/79-sprint-2-story-point-forecast-rationale)

## Sprint Burndown Chart

The burndown chart for our sprints can be accessed by pressing this button in the Trello board:

![Screen Shot 2022-07-03 at 7 14 54 AM](https://user-images.githubusercontent.com/10526932/177043789-eda31942-b99b-4f7a-a907-1eedc9876632.png)

## Mob Programming Session
<img width="1170" alt="Screen Shot 2022-07-12 at 2 51 32 PM" src="https://user-images.githubusercontent.com/10526932/179400100-097a643a-62ab-4c6d-8c27-408b7d81b696.png">

In our mob programming session on 7/12/22, we:
- reviewed our first batch of major styling improvements to the authentication screen.
- reviewed how to best structure our git workflow for collaborative development
- we also resolved issues getting the app working on various team members' machines due to environment differences in the operating system.

## Test Suite

// TODO

## CI System

The CI System we chose to use was [Codemage](https://codemagic.io/start/). The reason we chose this is because the core stack of our application is React Native to support Android/iOS/web in as reusable way as possible. Because of that we needed a CI tool that supported this in a first-class manner, which Codemagic supported out of the box. We also went with a managed solution because the effort in putting together an in-house CI system like with Jenkins would be better spent in getting the application ready for customer review.

 Your rationale for the CI tool used (i.e., why did you use this CI tool?) is clearly documented in your git repo, plus the evidence/link is included in your git’s repo.
 
 <img width="853" alt="Screen Shot 2022-07-19 at 8 23 09 AM" src="https://user-images.githubusercontent.com/10526932/179788202-cc09acd4-3fa0-4dff-9277-cb76f8bab6bd.png">

<img width="523" alt="Screen Shot 2022-07-19 at 8 22 56 AM" src="https://user-images.githubusercontent.com/10526932/179788223-0a1d2e2d-c15e-46b0-b112-f39720c6606f.png">


## Daily Scrum (From July 12, 2022)

Alvin Abia
- I set up the initial CI integration for our app using CodeMagic
- I am adding test coverage to make our CI workflow more effective and fixing bugs with the CI scripts
- Blocker: Came back from vacation and getting caught up with all the stuff we've done int he past week

Aparna Sykam
- Worked on profile screen styling
- Continuing to style profile screen children components
- Blockers: none

Mohan Neupane
- I did code reviews for Login page, AuthPage and match screen 
- I will run the code again see if the agreed upon changes are working as expected based on product requirements.
- No blockers

Ploynapas Pawachot
- I added styles to the login page and match screen.
- I am trying to fix an error that was found by CI and pushing code to GitHub.
- I am facing failing check by CI.

## Sprint Review (From July 17, 2022)

- We also made some progress in the app development by mob programming (See the "Mob Programming Session" section above)!

- We set up our CI system

<img width="1471" alt="Screen Shot 2022-07-19 at 8 23 20 AM" src="https://user-images.githubusercontent.com/10526932/179788137-2fe6f42f-fa11-4cae-8554-1f9725b8b470.png">



- We doubled our test suite cases

// TODO: image

- We added an initial version of matching to the application

- We also added a working chat interface

<img width="370" alt="Screen Shot 2022-07-17 at 6 39 29 AM" src="https://user-images.githubusercontent.com/10526932/179401114-17251a22-ab21-4fee-b7aa-baac06087456.png">

- We added new styling to many parts of the application

<img width="1440" alt="MicrosoftTeams-image (1)" src="https://user-images.githubusercontent.com/10526932/179401044-5154e5c9-b328-4d37-830d-b072dbe5da8b.png">

<img width="1440" alt="MicrosoftTeams-image (2)" src="https://user-images.githubusercontent.com/10526932/179401065-7fb5be4a-f9b2-4abe-b28d-a798bfcae62d.png">

![MicrosoftTeams-image (3)](https://user-images.githubusercontent.com/10526932/179401136-f70a1fe9-9394-414b-99cf-724a8ff1f4f6.png)
