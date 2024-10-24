# Teachers Portal

The Teachers Portal is a web application that allows teachers to manage student details efficiently. This application includes features for user registration and login, as well as the ability to add, edit, delete, and search student information based on their name or subject.

### Built Using
- **Ruby on Rails**: A powerful web application framework for building server-side applications.
- **SQLite3**: A lightweight database used for data storage and management.
- **HTML/CSS**: Markup and styling languages for creating the front-end user interface.
- **JavaScript**: A programming language for adding interactivity to the web application.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Starting the Server](#starting-the-server)
  - [Using bash file](#using-bash-file)
  - [Manual method](#manual-method)


## Features
- **User Registration and Login**: JWT authentication for secure access.
- **Add Student Details**: Easily input new student information.
- **Edit Student Details**: Update existing student records.
- **Delete Student Details**: Remove student information when necessary.
- **Search Student Details**: Find students based on their name or subject.

## Installation
Before you can run the application, you need to install the required gem files and set up the front end with npm.

 - **Clone the Repository**:
   First, clone the project repository to your local machine:

   ```bash
   git clone https://github.com/Vyshnav-KS/tailwebs.git
   ```
- Navigate to the Project Directory

    ```bash
    cd tailwebs
    ```
    
1. **Install Ruby and Rails**: Make sure you have Ruby and Rails installed on your system. You can download them from [Ruby's official site](https://www.ruby-lang.org/en/downloads/) and [Rails](https://rubyonrails.org/).

2. **Install Required Gems**:
   - Navigate to the `teachers_portal` directory.
     ```bash
     cd teachers_portal
     ```
   - Run the following command to install the necessary gem dependencies:
     ```bash
     bundle install
     ```
   - Run the following command for migrations:
     ```bash
     rake db:migrate
     ```

     - Navigate back to the Project Directory

3. **Install npm live-server**:
   - Navigate to the `front_end` directory.
     ```bash
     cd front_end
     ```
   - Run the following command to install `live-server`
     ```bash
     npm install live-server
     ```
   - Run the following command to install `live-server` globally:
     ```bash
     npm install -g live-server
     ```
    - Navigate back to the Project Directory

## Starting the Server
### Using bash file

To start the servers on Linux or macOS, follow these steps:

- Open your terminal.
- Navigate to the root project directory:

   ```bash
   cd tailwebs
   ```
- Make the script executable (if not already):

    ```bash
    chmod +x start_servers.sh
    ```
- Start the servers by running the script:
    ```bash
    ./start_servers.sh
    ```

### Manual Method
If you prefer to start the servers manually, follow these steps for each component:

- Start the Front-End Server.
  Open your terminal.

   Navigate to the front_end directory:

    ```bash
    cd tailwebs/front_end
    ```
    Start the live server:

    ```bash
    live-server
    ```
    The front-end application will be served at http://127.0.0.1:5500.

- Start the Rails Server.
Open another terminal window.

  Navigate to the teachers_portal directory:

    ```bash
    cd tailwebs/teachers_portal
    ```
    Start the Rails server:

    ```bash
    rails server
    ```
    The Rails application will be available at http://127.0.0.1:3000.

    Notes:

    Ensure that you have all necessary dependencies installed before starting the servers (refer to the [Installation section](#installation)).

