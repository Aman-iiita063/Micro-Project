# Micro-Project

Project Title: Student Enrollment Form

Description:

This project implements a web-based student enrollment form using HTML, CSS, and JavaScript. It allows users to input student details such as roll number, full name, class, birth date, address, and enrollment date, and either save or update this information into a database using JsPowerDB.

Features:
Form Input Validation: Ensures all required fields are filled before submission.
Dynamic Data Fetching: Automatically fills the form if the student with the given roll number already exists.
Responsive Design: Adapts to different screen sizes for a wide range of devices.
Technology Stack
HTML: For structuring the web page.
CSS: For styling the web page.
JavaScript (jQuery): For handling browser events and AJAX requests.
JsPowerDB: For database operations.
File Structure
bash
Copy code
/
│── index.html       # Main page with the form
│── README.md        # Documentation file

Setup Instructions-
Prerequisites:

Ensure you have a modern web browser installed (e.g., Chrome, Firefox).
Internet access for jQuery CDN.
Running the Project:

Download the project files to a local directory.
Open index.html in your web browser to start using the form.
Usage
Adding a Student:
Fill out all fields in the form.
Click the 'Save' button to store the data.
Updating a Student:
Enter the roll number and allow the form to auto-fill.
Modify the necessary fields.
Click the 'Update' button to save changes.
How It Works
The form connects to a JsPowerDB database where student data is stored.
When a roll number is entered, an AJAX request checks if the student already exists:
If yes, it auto-fills the form, allowing for data updates.
If no, it clears the form for new entry.
Data validation is performed before sending any PUT requests to the database to ensure data integrity.
