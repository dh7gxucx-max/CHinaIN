// Demo accounts for testing (no real database)
export const demoAccounts = [
  {
    email: "demo@china2india.com",
    password: "demo123",
    firstName: "Demo",
    lastName: "User",
    phone: "+91 98765 43210",
    id: "demo-001",
  },
  {
    email: "test@example.com",
    password: "test123",
    firstName: "Test",
    lastName: "User",
    phone: "+91 98765 43211",
    id: "test-001",
  },
  {
    email: "john@example.com",
    password: "john123",
    firstName: "John",
    lastName: "Doe",
    phone: "+91 98765 43212",
    id: "john-001",
  },
];

export function validateLogin(email: string, password: string) {
  const account = demoAccounts.find(
    (acc) => acc.email === email && acc.password === password
  );
  return account || null;
}

export function isEmailRegistered(email: string) {
  return demoAccounts.some((acc) => acc.email === email);
}
