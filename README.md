# ChatSystem
### Chat System Repository for Assignment 1 and 2 of 3813ICT

### Applications
#### Login
Provides login functionality for the user.
Uses the provided email and password and passes them to the DataManager service that communicates with the backend.
Upon correct credentials, the user's information is stored locally and they are redirected to the Account page.
If the user navigates to this page while already logged in, they are redirected to the Account page.

#### Account
Shows personalised information to the user as well as user/group permission modifiers if applicable
User is displayed their email address, the groups/channels they are a part of and the ability to enter the chat room.

#### Chat
Lists the users groups and channels they are a member of, the chat history of the active channel and an input bar to post messages to the active channel.

### Services
#### Front End
##### DataManager
Provides functions that allow for front and back end data communication.
###### userValid
Used to prevent the user from accessing certain pages/functions depending on their login status.
###### loginParse
Exchanges information with the DataModifier on behalf of the Login page

#### Back End
##### DataModifier
Interacts with the .json data files that contains the users information
###### loginParse
Uses information provided by DataManager's loginParse function and compares it against the user_list.json. If it finds a match, returns that user's data (exclusing the password) as an object, otherwise returns false.
