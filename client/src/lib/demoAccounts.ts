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

// Get all registered accounts from localStorage
function getRegisteredAccounts() {
  try {
    const accounts = localStorage.getItem('registeredAccounts');
    return accounts ? JSON.parse(accounts) : [];
  } catch {
    return [];
  }
}

// Save new account to localStorage
export function registerNewAccount(account: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
}) {
  const accounts = getRegisteredAccounts();
  const newAccount = {
    ...account,
    id: `user-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  accounts.push(newAccount);
  localStorage.setItem('registeredAccounts', JSON.stringify(accounts));
  return newAccount;
}

// Check login against both demo accounts and registered accounts
export function validateLogin(email: string, password: string) {
  // First check demo accounts
  const demoAccount = demoAccounts.find(
    (acc) => acc.email === email && acc.password === password
  );
  if (demoAccount) return demoAccount;

  // Then check registered accounts
  const registeredAccounts = getRegisteredAccounts();
  const registeredAccount = registeredAccounts.find(
    (acc: any) => acc.email === email && acc.password === password
  );
  return registeredAccount || null;
}

// Check if email is registered in either demo or registered accounts
export function isEmailRegistered(email: string) {
  // Check demo accounts
  const isDemoEmail = demoAccounts.some((acc) => acc.email === email);
  if (isDemoEmail) return true;

  // Check registered accounts
  const registeredAccounts = getRegisteredAccounts();
  return registeredAccounts.some((acc: any) => acc.email === email);
}
