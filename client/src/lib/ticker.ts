// Utility to manage dynamic ticker tape data
// Updates once per day with random flight date and exchange rate

interface TickerData {
  exchangeRate: number;
  nextFlightDay: string;
  lastUpdate: string;
}

const STORAGE_KEY = 'ticker_data';

// Generate a random exchange rate between 11.0 and 12.0
function generateExchangeRate(): number {
  return parseFloat((Math.random() * (12.0 - 11.0) + 11.0).toFixed(2));
}

// Generate next flight day (random weekday)
function generateNextFlightDay(): string {
  const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
  const randomIndex = Math.floor(Math.random() * days.length);
  return days[randomIndex];
}

// Check if data needs to be updated (once per day)
function needsUpdate(lastUpdate: string): boolean {
  const lastUpdateDate = new Date(lastUpdate);
  const today = new Date();

  // Reset at midnight
  lastUpdateDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return today.getTime() > lastUpdateDate.getTime();
}

// Get or generate ticker data
export function getTickerData(): TickerData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      const data: TickerData = JSON.parse(stored);

      // Check if we need to update
      if (!needsUpdate(data.lastUpdate)) {
        return data;
      }
    }
  } catch (error) {
    console.error('Error reading ticker data:', error);
  }

  // Generate new data
  const newData: TickerData = {
    exchangeRate: generateExchangeRate(),
    nextFlightDay: generateNextFlightDay(),
    lastUpdate: new Date().toISOString(),
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  } catch (error) {
    console.error('Error saving ticker data:', error);
  }

  return newData;
}
