# Appwrite TypeScript Types Generator

Appwrite TypeScript Types Generator is a utility that automatically generates TypeScript types based on your Appwrite database schema. This ensures type safety and improves the developer experience when working with Appwrite databases.

## Features

- Automatically generates TypeScript types for your Appwrite database collections and attributes.
- Ensures type safety when interacting with Appwrite databases.
- Configurable via environment variables.

## Installation

Install the package via npm:

npm install appwrite-types-generator

## Configuration

Create a `.env` file in the root of your project to store your Appwrite configuration:

APPWRITE_ENDPOINT=https://your-appwrite-endpoint
APPWRITE_PROJECT_ID=your-project-id
APPWRITE_API_KEY=your-api-key

## Usage

### Generating Types

To generate TypeScript types based on your Appwrite database schema, run the following command:

npm run generate-types

This command will generate a `types.ts` file in the `src` directory containing TypeScript interfaces for your collections and a `DatabaseMap` type.

### Using the Generated Types

You can use the generated types in your project to ensure type safety when interacting with Appwrite databases.

### Example

Here's an example of how to use the generated types and the `TypedAppwriteClient` class:

import TypedAppwriteClient from 'appwrite-types-generator/dist/clientWrapper';
import dotenv from 'dotenv';

dotenv.config();

const endpoint = process.env.APPWRITE_ENDPOINT || '';
const projectId = process.env.APPWRITE_PROJECT_ID || '';
const apiKey = process.env.APPWRITE_API_KEY || '';

if (!endpoint || !projectId || !apiKey) {
  console.error('Please provide APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID, and APPWRITE_API_KEY as environment variables.');
  process.exit(1);
}

const typedClient = new TypedAppwriteClient(endpoint, projectId, apiKey);

async function main() {
  try {
    // Example usage of createDocument with database-specific types
    const document = await typedClient.createDocument(
      '24so', // Correct database ID
      'auth_tokens', // Correct collection ID
      { 
        token: 'test'
      } // Ensure this matches the generated interface
    );

    console.log('Document created:', document);
  } catch (error) {
    console.error('Error creating document:', error);
  }
}

main();

## Development

### Prerequisites

- Node.js
- npm
- Appwrite server

### Running Locally

1. Clone the repository:

   git clone https://github.com/your-username/appwrite-types-generator.git
   cd appwrite-types-generator

2. Install dependencies:

   npm install

3. Create a `.env` file with your Appwrite configuration:

   APPWRITE_ENDPOINT=https://your-appwrite-endpoint
   APPWRITE_PROJECT_ID=your-project-id
   APPWRITE_API_KEY=your-api-key

4. Generate TypeScript types:

   npm run generate-types

5. Build the project:

   npm run build

6. Run the example script:

   npm start

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
