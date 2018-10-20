# Working with Billys free API

**Demo: http://gfa-billy-contacts.s3-website.eu-central-1.amazonaws.com/**

<br>

## 1. Initialization

I decided to use create-react-app to jumpstart the development of the app.

As the time is limited, I will be using React-Bootstrap for the UI in order to spend more time working with the functionality of the app instead of the styling.

In other circumstances, I would prefer to work with custom components styling, maybe with styled-components for some css-in-js goodness.
<br>

---
## 2. Other libraries

- **React-router-dom:** For managing routing
- **React-table:** For listing the contacts
- **Jest/Enxyme:** For testing the app

<br>

---
## 3. Folder Structure

For structuring the project, I decided to go with a pages/components split. 

The pages correspond to the first components that get rendered when visting a route.

The components are mostly pieces of code that will be reused in different places.

Moreover, I created folders for Routes, High Order Components, Providers and Utilities.

This folder structure might be "too much" for a small project, but it scales great when the app gets bigger.

---
## 4. To Redux or not to Redux? 
(Spoiler: Not this time)

I wanted to use Redux for managing the state of the app, but the time was limiting so I decided against it.

Instead, I am using the new ContextAPI that came with React 16. It doesn't have much of the functionality of Redux, but it's great for having a common state that the entire app can interact with, while avoiding the prop-drilling.
For easier development, I built a HOC that can wrap around any component that might need the common state.

--
## 5. Components

**Home** Is the landing page of the app. It fetches the contacts list and passes it to the **ContactsTable** for presenting it.

The **Contacts** component is in charge of creating new or editing existing components. I decided to use the same component for both situations, to avoid rewriting very similar code.

Both when we fetch the contacts and when we create/edit/delete a contact, I am updating the contacts from the common state instead of refetching them from the backend. That way we avoid unnecessary API requests.

A similar check is happening for the countries list. In general, unless the user refreshes the page, the contacts/countries fetching is happening only once.

A **confirmationModal** has been created for managing various user actions that need a confirmation. It is omnly used for the "delete" functionality, but it is adaptable enough to be used in different places.

Same goes with the **LoadingIndicator** that can be used as is, or by taking advantage of the **WithLoading" High Order Component. All async actions and API calls have a loading indicator.

---
## What's next

If I had more time, I would like to refactor some places in the code and add many more tests. I chose to complete all the functionality first.

Moreover, I would prefer to ditch bootstrap for either a newer library or custom UI with styled-components. As I imagine, the app must be form-heavy, so I would like to investigate Formik, which is supposed to be one of the best form management libraries for React.

---
## Bugs?

While playing with the free trial, I created some contacts and noticed I was never getting back email and contactNo, even though I was saving them. Are these saved somewhere else?

---
## The end!

Had a great time working with the API, it is very nicely documented and easy to use. Any feedback will be appreciated!




