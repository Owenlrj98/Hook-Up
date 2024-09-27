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



