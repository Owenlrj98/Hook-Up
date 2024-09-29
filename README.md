This app aims to connect people with interest in climbing together. User will be able to send invitations to other users in the app.  

User: 
1. Sign up page: User will sign up for an account with username, password and email, authenticated with JWT token.
2. Log in page: User will log in with username and password on this page, authenticated by JWT token.
3. Navigations Bar: Consist of homepage, profile page, invitations page, and pending page, appointments page, gyms page and logout.
4. Homepage: After login, user will be navigated to the homepage. The main feature on this page is that a random user from the database will be shown on this page, excluding the user itself. The user will then be able to click “Hook Up” if they want to send an invitation to the person, or “Another” to switch to the next profile. 
5. Invite: Upon clicking "hook up", user will navigate to the invite form, where they can fill in details to invite the other user.
6. Invitation Page: Outgoing invites will be rendered here.
7. Pending Page: Pending invites from other users will be rendered here.
8. Profile Page: User will be able to edit their profile: name, age, select their experience level: “Beginner, Intermediate and Advanced”, picture, preference for climbing: Top Rope, Lead Climbing, Bouldering, and description.
9. Appointments Page: Users will see a list of accepted invites as well as its own invites.
10. Gyms Page: Users will see a list of gyms
11. Log Out: Log out removes the user token.

Admin:
1. Log in page: Admin log in here with adminToken
2. Navigations Bar: Consist of homepage, locations, new location and logout.
3. HomePage: Shows total user count
4. Locations: List of gyms
5. New location: Create new location which will be rendered in locations page.

Deployment issue, to be fixed 
Here's how the website looks on localhost for now:
Website Start Page
<img width="953" alt="image" src="https://github.com/user-attachments/assets/41d8e1a9-72a9-4861-b674-cd406d93a69f">
Website User Log in / Sign Up
<img width="953" alt="image" src="https://github.com/user-attachments/assets/458b3968-97b3-405b-9584-706d90b3533c">
<img width="953" alt="image" src="https://github.com/user-attachments/assets/c809ff87-da62-42d4-9899-240fa8deb6d5">
Website Home Page
<img width="953" alt="image" src="https://github.com/user-attachments/assets/3e66fba9-8a5a-42f9-a2c1-f25938f97382">
Website Profile Page
<img width="953" alt="image" src="https://github.com/user-attachments/assets/e6109867-ee76-469d-92e4-5a4cdbeb7e99">
<img width="953" alt="image" src="https://github.com/user-attachments/assets/302e7f77-8386-4c3b-903b-1b8fcc3fbba1">
Website Invitations Page
<img width="953" alt="image" src="https://github.com/user-attachments/assets/8efed1e5-a233-4299-94d8-241356bd7856">
Website Pending Invitations Page
<img width="953" alt="image" src="https://github.com/user-attachments/assets/47fa4ead-11e0-4334-9f3c-9c73e3599170">
Website Accepted Appointments Page
<img width="953" alt="image" src="https://github.com/user-attachments/assets/752438b8-c8bd-4ebf-bb59-f0f860b92af1">
Website List of Gyms Page
<img width="953" alt="image" src="https://github.com/user-attachments/assets/812e5601-2133-4092-b09f-6504b6ed9ab1">

Admin Pages
Home Page
<img width="953" alt="image" src="https://github.com/user-attachments/assets/30457746-430b-4467-8954-1e6f86f3d146">
List of locations page
<img width="953" alt="image" src="https://github.com/user-attachments/assets/12611ff2-f3c4-4cb4-bd60-ca4e174d699c">
Add Location Page
<img width="953" alt="image" src="https://github.com/user-attachments/assets/49544707-e160-4749-a5d2-38e7a3fa0617">


Initial WireFrame (Changed along the way)
<img width="953" alt="image" src="https://github.com/user-attachments/assets/ea620bb3-3fd5-4f99-aced-c2f7da3201a5">

<img width="953" alt="image" src="https://github.com/user-attachments/assets/e7af1dba-ecbf-4a62-b1e4-4ddea6bf617b">

<img width="868" alt="image" src="https://github.com/user-attachments/assets/9d1db6e2-9b3b-4b7d-930d-61c3c7eb01bb">

Technology Used:
MERN Stack
MongoDB
Express
React
Node.js

Additional Libraries:
React-bootstrap
React Select
Date Fns
AWS S3
Multer
