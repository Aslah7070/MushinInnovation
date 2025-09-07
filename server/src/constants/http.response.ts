export const HttpResponse = {
  //  Authentication
  INVALID_CREDENTIALS: "Invalid email or password!",
  UNAUTHORIZED: "Unauthorized access!",
  FORBIDDEN: "You do not have permission to perform this action!",
  TOKEN_MISSING: "Authentication token missing!",
  TOKEN_INVALID: "Invalid or expired token!",
  LOGIN_SUCCESS: "Login successful!",
  LOGOUT_SUCCESS: "Logout successful!",

  //  User CRUD
  USER_CREATED: "User created successfully!",
  USER_FETCHED: "User fetched successfully!",
  USER_UPDATED: "User updated successfully!",
  USER_DELETED: "User deleted successfully!",
  USER_NOT_FOUND: "User not found!",

  //  Generic CRUD (for other entities like Task, Product, etc.)
  ITEM_CREATED: "Item created successfully!",
  ITEM_FETCHED: "Item fetched successfully!",
  ITEM_UPDATED: "Item updated successfully!",
  ITEM_DELETED: "Item deleted successfully!",
  ITEM_NOT_FOUND: "Item not found!",

  //  Validation
  VALIDATION_ERROR: "Validation error! Please check your input.",
  MISSING_FIELDS: "Required fields are missing!",
  DUPLICATE_ENTRY: "This record already exists!",

  //  Server & DB
  SERVER_ERROR: "Something went wrong, please try again later.",
  DATABASE_ERROR: "Database error occurred!",
};
