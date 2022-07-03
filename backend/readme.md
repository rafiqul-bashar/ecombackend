.env file should contain

MONGO_URI = "Database Link"

# These are the Endpoints for

## Product

Get all products = /api/products [Get]
Get single product = /api/product/:id [Get]
Add new product = /api/product/new [Post] - AdminRoute
Update product = /api/product/:id [Put] - AdminRoute
Delte product = /api/product/:id [Delete] - AdminRoute
Review product = /api/product/review/:id [Put]

## User

Register User = /api/register [Post]
Login User = /api/login [Post]
Logout = /api/logout [Get]
Update Profle = /api/profile/update [Put]
Get All Users - /api/admin/users [Get]
Get Single User - /api/admin/user/:id [Get]
