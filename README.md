# Eventify
A social app to create and discuss events. See [demo](https://the-eventify.herokuapp.com/)
## Clean Architecture
Backend of the app is built using .NET 6

This application attempts to conform to the [clean architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) guidelines in order to make it:
- independent of UI
- independent of database
- independent of frameworks
- independent of external API implementations
- testable

The **Domain layer** contains application entities (e.g. Activity, ActivityAttendee, AppUser, Comment, Photo, UserFollowing). This layer is the core of the application and is completely 
unaware of other parts of the application, it does need to know anything about other layers. The domain layer is meant to be the least likely to change layer, so that 
other layers that depend on it don't break.

The **Application layer** contains business logic of the application. In other words, this layer handles application use cases (e.g. List activities). This layer is fully encapsulated 
from the outer API layer, UI, database, domain entities. Changes to this layer does not affect other parts of the application.
This encapsulation is achieved thanks to **Mediator** with **CQRS** patterns. Dispatching commands and queries from controllers in the
API level is offloaded to the Mediator (Mediator.Send() method), and then Mediator Handler processes the logic in the Application layer 
and returns a Result object to the API controller, which then returns an HTTP response back.

The **API layer** contains web API controllers, and acts as an interface adapter by handling HTTP requests. Controllers are intentionally made to be
dumb to carry zero logic, since processing logic is handled in the Application layer.

The **Persistence** layer is only concerned with connecting to database and making SQL queries. It contains a database context (of type IdentityDbContext) and migrations.

The **Infrastructure** layer contains implementation details of services used by Application layer (e.g. UserAccesor service to
get the username authentication claim from HTTP context, or PhotoAccessor service to upload/delete images through external Cloudinary API). The idea is to 
make sure the Application layer logic does not change if we change the method of authentication, or image upload APIs.


![Untitled Diagram drawio](https://user-images.githubusercontent.com/98405994/172547111-c901e640-2e28-4432-92c1-683113ecbe17.png)
 
## Database
During development SQLite database engine used, then switched to PostgreSQL for deployment. For database relationships see diagram (generated using [Vertabelo](https://vertabelo.com/)) as shown below:
![Eventify-2022-06-07_06-06](https://user-images.githubusercontent.com/98405994/172300356-46d0229e-bf9e-4563-b66f-513731f2d1aa.png)

To query and update database entities used EntityFrameworkCore ORM, and also used [AutoMapper](https://docs.automapper.org/en/stable/) as a helper tool for mapping objects to DTO objects to reduce query complexity.
## ASP.NET Core Identity
User entitiy created based on Identity framework and extended to suit application requirements. 
For claim-based authentication used JWT tokens.
## Frontend
The client app was built using following:
- **React** using **Typescript** for client app.
-  [**MobX**](https://mobx.js.org/README.html) for state management (automatically track state changes through implicit subscriptions).
-  [**Semantic UI React**](https://react.semantic-ui.com/) for out-of-the-box styled React components.
-  [**Axios**](https://axios-http.com/) for HTTP connections to API.
## Other features
- [**Cloudinary**](https://cloudinary.com/) API image upload for user profile pics (free plan allows 10GB storage, 20K image transformations, 20GB bandwidth). 
- **SignalR** for real-time comments in Activity Chat area.
