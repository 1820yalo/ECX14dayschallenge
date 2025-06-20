// Task 1: Create a function that accepts an array of objects with properties: name, age, and level. The function should return an array of strings where each string is a concatenation of the object’s values, separated by slashes.

// Example: [{name: 'Seun', age: 23, level: '100 level'}] => ['Seun/23/100 level']

function formatStudentInfo(students) {
  if (!Array.isArray(students)) {
    throw new Error('Input must be an array');
  }

  return students.map(({ name, age, level }) => {
    // Validate required properties
    if (!name || !age || !level) {
      throw new Error('Each student must have name, age, and level properties');
    }

    // Validate data types
    if (typeof name !== 'string' || typeof level !== 'string' || typeof age !== 'number') {
      throw new Error('Invalid data types: name and level should be strings, age should be a number');
    }

    // Validate age range
    if (age < 0 || age > 150) {
      throw new Error('Invalid age range');
    }

    return `${name.trim()}/${age}/${level.trim()}`;
  });
}

// Example usage with error handling
try {
  const students = [
    { name: 'Seun', age: 23, level: '100 level' },
    { name: 'John', age: 21, level: '200 level' }
  ];
  console.log(formatStudentInfo(students));

  // Test with invalid data
  // const invalidStudents = [{ name: 'Invalid', age: -1, level: '100 level' }];
  // console.log(formatStudentInfo(invalidStudents));
} catch (error) {
  console.error('Error:', error.message);
}

// Output: ["Seun/23/100 level"]


// Task 2: Write a script to clean a string of text — remove punctuation, convert to lowercase, and extract individual words into an array.

// Example: Input: "This is a String! With, Punctuation?" Output: ["this", "is", "a", "string", "with", "punctuation"]

function cleanText(text) {
  // Input validation
  if (typeof text !== 'string') {
    throw new Error('Input must be a string');
  }

  if (text.trim() === '') {
    return [];
  }

  return text
    // Convert to lowercase first for consistent handling
    .toLowerCase()
    // Replace all punctuation and special characters
    .replace(/[^\w\s-]/g, '')
    // Replace multiple spaces/newlines with single space
    .replace(/\s+/g, ' ')
    // Trim spaces from start and end
    .trim()
    // Split into words, filtering out empty strings
    .split(' ')
    // Remove any remaining empty strings or pure whitespace
    .filter(word => word.trim().length > 0)
    // Optional: Remove any numeric values if needed
    // .filter(word => !/^\d+$/.test(word))
    ;
}

// Example usage with error handling
try {
  // Test cases
  const testCases = [
    "This is a String! With, Punctuation?",
    "   Multiple    Spaces   and\nNewlines\t!   ",
    "Special ch@r#ct&rs and numbers 123",
    "", // Empty string
    "One-word-with-hyphens",
    "Mixed CASE tExt"
  ];

  testCases.forEach(test => {
    console.log(`Input: "${test}"`);
    console.log('Output:', cleanText(test));
    console.log('---');
  });

  // Test with invalid input
  // console.log(cleanText(123)); // Should throw error
} catch (error) {
  console.error('Error:', error.message);
}

// Output: ["this", "is", "a", "string", "with", "punctuation"]
