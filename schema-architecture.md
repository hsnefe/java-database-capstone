The application uses both MVC and REST controllers in the user interface layer. Thymeleaf templates are used for the Admin and Doctor dashboards, while REST APIs serve all other modules using JSON API. The application interacts with two databases—MySQL (for patient, doctor, appointment, and admin data) and MongoDB (for prescriptions). All controllers route requests through single shared service layer, which in turn delegates to the appropriate repositories due to their needs. MySQL uses JPA entities for Patient, Doctor, Appointment and Admin. while MongoDB uses document models for prescriptions.
1. User accesses AdminDashboard or Appointment pages.
2. The action is routed to the appropriate Thymeleaf or REST controller.
3. The controller calls the service layer
4. The service layer handles the requests and uses appropriate repositories due to their needs. In this case; MySQLRepository
5. The repository uses the model to get acces to the database.
6. The model provides access to the database
7. The data returns answers as JPA entities 
