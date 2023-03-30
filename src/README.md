# HvZ

 Human vs Zombie (HvZ) is a full-stack tag game that simulates a zombie infestation through a population. The game is built using Java with the Spring framework, along with the Lombok and JPA libraries, and Spring Security for authentication. HvZ involves creating games that players can join and play tag in, with options for players to form squads and complete missions. The backend provides API endpoints for handling user and game management, including creating, updating, and deleting games, squads, and kills, as well as retrieving information on players and games.

 Team members:
  * Adam Miron Krason
  * David Do Dai
  * Fatima Yari
  * Khoi Le
  * Mostafa Mohammedi

## Setup
Clone the project from the git repository. You can do this by running the command git clone and add the url from the repo in the terminal.

Modify the keycloak.json file in the project to the configuration created in your Keycloak to authenticate and authorize your client. This involves changing the values for attributes such as realm, auth-server-url, ssl-required, resource, public-client, and confidential-port to match your client configuration in Keycloak.

Change the URL link in the .env file to connect to the base URL for your endpoints in the project. This means changing the value of REACT_APP_AZURE_APP_API to match the URL of your server/swagger endpoints.

Once you have made these changes, you can start the project by running the command npm start in the terminal, and you should be ready to run and test your application.
