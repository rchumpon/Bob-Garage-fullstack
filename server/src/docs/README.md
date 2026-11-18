Bob's Garage – API Documentation

1. API Overview:
   Bob's Garage uses a RESTful API developed with Node.js and Express.js.
   The backend communicates with a MySQL database using Sequelize ORM.

The API manages user authentication, automotive services, customer bookings and administrator operations.
Base URL: http://localhost:3001
Response Format: JSON

2. User API Endpoints
   Base route: /api/user

Method: GET
Endpoint: /data
Description: Retrieve authenticated user information
Access: Authenticated

Method: POST
Endpoint: /register
Description: Register a new user
Access: Public

Method: POST
Endpoint: /login
Description: Authenticate an existing user
Access: Public

Method: POST
Endpoint: /update-image
Description: Update user profile image
Access: Admin

The /update-image endpoint accepts an uploaded image using Multer's upload.single("image").

3. Service API Endpoints
   Base route: /api/service

Method: GET
Endpoint: /list
Description: Retrieve all automotive services
Access: Public

Method: GET
Endpoint: /dashboard
Description: Retrieve administrator dashboard data
Access: Admin

Method: POST
Endpoint: /add
Description: Create a new automotive service
Access: Admin

Method: PUT
Endpoint: /update/:serviceId
Description: Update an existing service
Access: Admin

Method: DELETE
Endpoint: /delete/:serviceId
Description: Delete an existing service
Access: Admin

Method: POST
Endpoint: /toggle/:serviceId
Description: Toggle service availability
Access: Admin

Service image uploads use Multer's upload.single("image").
The serviceId parameter identifies the service being updated, deleted or toggled.

4. Booking API Endpoints
   Base route: /api/booking

Method: GET
Endpoint: /user
Description: Retrieve bookings belonging to the logged-in user
Access: Authenticated

Method: GET
Endpoint: /list
Description: Retrieve all customer bookings
Access: Admin

Method: POST
Endpoint: /check-availability
Description: Check available services for a selected appointment time
Access: Authenticated

Method: POST
Endpoint: /create
Description: Create a new customer booking
Access: Authenticated

Method: POST
Endpoint: /change-status
Description: Update booking status
Access: Admin

Booking requests are validated using Joi schemas before reaching the controllers.

5. Site Settings API Endpoints
   Base route: /api/settings

Method: GET
Endpoint: /hero
Description: Retrieve the saved homepage background and right-side hero image.
Access: Public

Method: PUT
Endpoint: /hero/background
Description: Upload and update the homepage background image.
Access: Admin

Method: PUT
Endpoint: /hero/image
Description: Upload and update the right-side hero image.
Access: Admin

Images are uploaded to ImageKit and optimized using WebP formatting, automatic quality adjustment and image resizing.

- heroBackground: Homepage background image, optimized to a width of 1920 pixels.
- heroImage: Right-side hero image, optimized to a width of 800 pixels.

The image URLs are stored in the sitesettings table.
Temporary uploaded files are deleted after processing.

The GET endpoint is publicly accessible. The update endpoints are intended for administrators only, subject to the authentication and authorization middleware configured in the settings route file.

6. Favourite API Endpoints
   Base route: /api/favourite

Method: GET
Endpoint: /list
Description: Retrieve the logged-in customer's favourite services.
Access: Authenticated

Method: POST
Endpoint: /add
Description: Add a service to the customer's favourites.
Access: Authenticated

Method: DELETE
Endpoint: /remove/:serviceId
Description: Remove a service from the customer's favourites.
Access: Authenticated

The favouriteController.js handles adding, retrieving and removing favourite services.

All favourite endpoints use the protect authentication middleware to ensure that only authenticated users can access these operations.

The serviceId parameter identifies the service to remove from the customer's favourites.

7. Authentication and Authorization
   The API uses JWT authentication and role-based access control.

- Public: No authentication required.
- Authenticated: Requires a valid JWT token, verified by the protect middleware.
- Admin: Required authentication and administrator permission, verified by protect and adminOnly.

8. Request Validation
   The API uses Joi validation middleware to check incoming request data.

User Validation

- registerSchema
- loginSchema

Service Validation

- addServiceSchema
- updateServiceSchema
- serviceIdSchema

Booking Validation

- checkAvailableSlotsSchema
- createBookingSchema
- updateBookingStatusSchema

Invalid requests are rejected before the controller executes.

9. Database Operations
   The API uses Sequelize ORM to interact with MySQL.

Database: bobs_garage
Database Tables:
Users - Stores registered user accounts and authentication information.
Services - Stores automotive services, descriptions, prices and availability.
Bookings - Stores customer bookings and booking statuses.
SiteSettings - Stores homepage background and right-side hero image URLs.
Favourite - Stores customer favourite service information.
The exact table or model structure should be confirmed from the favourite controller and model.

Database queries support creating, retrieving, updating and deleting application records.

10. Error Handling
    The API uses error-handling mechanisms to manage exceptions and return appropriate HTTP responses.

Common status codes include:
HTTP Status: 200
Description: Request successful

HTTP Status: 201
Description: Resource created

HTTP Status: 400
Description: Invalid request

HTTP Status: 401
Description: Authentication required

HTTP Status: 403
Description: Access denied

HTTP Status: 404
Description: Resource not found

HTTP Status: 500
Description: Internal server error

11. API Testing
    Postman is used to test the API endpoints.
    Testing includes:

- Verifying successful JSON responses.
- Testing user registration and login.
- Testing service CRUD operations.
- Testing booking creation and status updates.
- Testing homepage hero settings retrieval.
- Testing administrator uploads of background and hero images.
- Verify image URLs are saved in MySQL.
- Testing the addition, retrieval and removal of favourite services.
- Testing JWT authentication and administrator permissions.
- Confirming database changes in MySQL.

12. API Route Files

- src/routes/userRoutes.js
- src/routes/serviceRoutes.js
- src/routes/bookingRoutes.js
- src/routes/siteSettingsRoutes.js
- src/routes/favouriteRoutes.js

These files define the API endpoints and connect requests to their corresponding controller functions.
