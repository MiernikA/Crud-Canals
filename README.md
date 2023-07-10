# CRUD Canals Management

This project is a CRUD (Create, Read, Update, Delete) application for managing canals and their corresponding amounts. It consists of a Laravel backend and a Vite+React+TypeScript frontend.

## Project Structure

The project is structured as follows:

- `backend`: Contains the Laravel backend code.
- `frontend`: Contains the Vite+React+TypeScript frontend code.
- `tests`: Contains tests for both the backend and frontend.

## Installation

To run the project locally, follow these steps:

### Backend

1. Navigate to the `root of the project` (backend) directory.
2. Install dependencies by running `composer install`.
3. Run database migrations using `php artisan migrate` (If you encounter an issue with migration, please refer to the section titled 'Database').
4. Start the Laravel server with `php artisan serve`. 

### Frontend

1. Navigate to the `../react` (frontend) directory.
2. Install dependencies by running `npm install`.
3. Start the development server with `npm run dev`.
4. Once the servers are running, you can access the application by opening your web browser and visiting `http://localhost:3000`.

## Testing

Both the backend and frontend have tests in place.

### Backend Tests

1. Navigate to the `backend` directory.
2. Run the tests using `php artisan test`.

### Frontend Tests

1. Navigate to the `frontend` directory.
2. Run the tests using `npm test`.

## Usage

Once the project is up and running, you can access the application in your web browser. The application allows you to perform the following actions:

- View the list of canals and their corresponding amounts.
- Add a new canal with its amount.
- Edit the amount of an existing canal.
- Remove a canal from the list.

## Technologies Used

- Laravel (PHP) for the backend API.
- Vite, React, and TypeScript for the frontend.
- Axios for handling API requests.
- Recharts for creating the pie chart.
- PHPUnit for backend testing.
- Vitest and React Testing Library for frontend testing.

## Database

The project uses a MySQL database. The migration file is included in the project, which creates a `clients` table with columns for `canal` (string) and `amount` (integer).

Larvael uses the .env `root` username, but sometimes it is necessary to edit the username in the configuration file because the back-end may make errors when trying to migrate.



