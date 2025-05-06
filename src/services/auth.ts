// Mock user data - in a real application, this would be stored in a database
const mockUsers = [
  {
    username: "admin@example.com",
    password: "admin123",
    name: "Admin User",
    role: "admin",
  },
];

// Mock authentication state
let currentUser: { username: string; name: string; role: string } | null = null;

/**
 * Attempts to log in a user with the provided credentials
 * @param username The user's username or email
 * @param password The user's password
 * @returns A promise that resolves to true if login is successful, false otherwise
 */
export const login = async (
  username: string,
  password: string,
): Promise<boolean> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  const user = mockUsers.find(
    (user) => user.username === username && user.password === password,
  );

  if (user) {
    // Store user info (except password) in the auth state
    currentUser = {
      username: user.username,
      name: user.name,
      role: user.role,
    };

    // Store auth token in localStorage (in a real app, use secure HTTP-only cookies)
    localStorage.setItem("authToken", "mock-jwt-token");
    return true;
  }

  return false;
};

/**
 * Logs out the current user
 */
export const logout = (): void => {
  currentUser = null;
  localStorage.removeItem("authToken");
};

/**
 * Checks if a user is currently logged in
 * @returns True if a user is logged in, false otherwise
 */
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem("authToken");
};

/**
 * Gets the current logged in user
 * @returns The current user object or null if no user is logged in
 */
export const getCurrentUser = () => {
  return currentUser;
};
