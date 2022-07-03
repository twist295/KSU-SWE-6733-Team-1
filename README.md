# KSU-SWE-6733-Team-1

## Team Roster:
Product Owner: Mohan Neupane

Scrum Master: Alvin Abia

Development Team:
- Aparna Sykam
- Ploynapas Pawachot
- Fremont Lowe

## Setup

Go through this documentation and set up your environment using the "Expo CLI" instructions where indicated:
[React Native](https://reactnative.dev/docs/getting-started)

Make sure you have Git set up:
[GitHub](https://docs.github.com/en/get-started/quickstart)

Make sure you have Node/NPM installed:
[NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

Clone the repository to your machine and navigate to it in your CLI, the repo will be named "KSU-SWE-6733-Team-1".

Once there navigate to the NextAdventure directory using `cd NextAdventure` (or whatever the Windows alternate is), and run `npm start`.

Follow the instructions and the app should start in an emulator on your machine!

## Product Vision:

### Short-Term:
Our Team Group 1 aims to build an app named NextAdventure for all those adventure seekers who wants to visit different adventurous locations for hiking and trekking. 

The NextAdventure is a user friendly website or mobile application for the purpose of meeting all potential members within a single online platform. 

It will allow all those enthusiasts to connect, discuss and plan for any outdoor activities. 

Unlike visiting personally or discuss over phone, this will let the users to post the activity, comment with their preferences, post any suggestions and decide a trip.

### Long-Term:
On a long run, this application will be extended with the features of different location specified so that people from different part of the country will customize as per their area and utilize the app. 

This app will also include cruise, kayaking and also other global tours.

## Project Management Board

Supporting artifacts, user stories, product backlog, and sprint artifacts can be found here!
[Trello Board](https://trello.com/b/nvydT0ke/ksu-swe6733-team-1-agile-board)

## Definitions of Ready
[Access to Application](https://trello.com/c/5jwLnLhH/22-r1-access-to-application)

[User Profile](https://trello.com/c/pMQnO7xr/23-r2-profile)

[Communication](https://trello.com/c/ypMOAoLj/24-r3-communicate-with-people)

[Connecting with Other Users](https://trello.com/c/UEtgC6DK/25-r4-connect-with-similar-interest-people)

[Notifications](https://trello.com/c/qT88fwBS/26-r5-get-similar-interest-notifications)

[Social App Integration](https://trello.com/c/svcvPfaf/27-r6-connect-to-social-apps)

[Location](https://trello.com/c/7Dy6Hf2B/28-r7-add-location)

[Create Activity](https://trello.com/c/EKJBTv5x/29-r8-create-adventure-activities)

[Add Interests](https://trello.com/c/PsFUApHr/30-r9-add-interested-activities)

[Group Activities](https://trello.com/c/8Rc0gPTh/31-r10-group-activity)

## Ordering of Product Backlog

(Priority based on importance to app, ordering to unblock dependent features, and optimizing for initial user feedback)

[Access to Application](https://trello.com/c/5jwLnLhH/22-r1-access-to-application) goes first because it is needed before user can do anything else.

[User Profile](https://trello.com/c/pMQnO7xr/23-r2-profile) is second because users will need to create profiles to share about themselves.

[Location](https://trello.com/c/7Dy6Hf2B/28-r7-add-location) comes next because location will play role in matching and will be displayed in the profile.

[Add Interests](https://trello.com/c/PsFUApHr/30-r9-add-interested-activities) comes after because interested activities should be in the existing profile.

[Connecting with Other Users](https://trello.com/c/UEtgC6DK/25-r4-connect-with-similar-interest-people) is after because now profiles exist for users to use when deciding when to match or not.

[Communication](https://trello.com/c/ypMOAoLj/24-r3-communicate-with-people) is next so those users that do connect can now communicate with each other.

[Create Activity](https://trello.com/c/EKJBTv5x/29-r8-create-adventure-activities) follows so users can set an activity with adventure partners they've chatted with.

[Notifications](https://trello.com/c/qT88fwBS/26-r5-get-similar-interest-notifications) is a "nice to have" since the initial version of the app can be mostly functional for gathering feedback without this feature.

[Group Activities](https://trello.com/c/8Rc0gPTh/31-r10-group-activity) is also a "nice to have"

[Social App Integration](https://trello.com/c/svcvPfaf/27-r6-connect-to-social-apps) is lowest priority since social integrations are not really needed for testing the core app.

## Sprint Story Points Forecast & Rationale

[Sprint Story Points Forecast & Rationale](https://trello.com/c/jRPklVqg/48-story-point-forecast-rationale)

## Sprint Burndown Chart

The burndown chart for our sprints can be accessed by pressing this button in the Trello board:

![Screen Shot 2022-07-03 at 7 14 54 AM](https://user-images.githubusercontent.com/10526932/177043789-eda31942-b99b-4f7a-a907-1eedc9876632.png)

## Mob Programming Session
![Hangout SS](https://user-images.githubusercontent.com/10526932/175825107-125c50d7-4074-4e29-be11-48846f0ee78b.png)

In our mob programming session on 6/26/22, we:
- Found two bugs with login.
    - the login password text field should have secure text enabled which was done during the call.
    - the login network request wasn't using the text input values and always failing.
- This led to us realizing that there were some areas to improve related to clearer error states for the user.
- Implemented signing out of an account together.
