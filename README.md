Entry Management Software – SDE intern assignment

An angular web app designed to manage entry in an office.

Approach:

I have assumed that the software will be used at the reception. Web interface is comfortable and versatile for use from reception standpoint. The web interface has a form at the top for quick access and a list of all visitors who have previously checked-in is displayed. The members that have not checked in is displayed with a check-out button. 

Features:

    • Captures the name, email address, phone no of the visitor and same information is captured for the host.
    • Once the data is captured, it is stored in the backend.
    • Visitor details are sent to host via SMS and email.
    • On check-out, the details of the meeting are emailed to the visitor.
	(Email and SMS functionality doesn’t work because it needs premium services. The 	mock API call has been indicated in code)

    • Check-in time and check-out time are  automatically captured and are not required for input.

Technologies Used:

Angular Framework, Firebase Firestore

Supported Platforms:

It should work on all web browsers.

How to run?

    • Firebase projects needs to be linked with the app to get the API key.
    • The obtained API key and other details need to be updated in environment.ts file
    • Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. 

How does it work?

The visitor and host details are stored in the firebase firestore NoSQL database. The check-in time is not shown as field and is captured using the system time. As the details is pushed to the database, the list is automatically updated with a check-out button. When the check-out button is pressed the time is automatically captured and pushed to the database. Mock API calls for SMS and email have been indicated and they are needed to be implemented.
