# linkee
clone of linktr.ee

Linkee
Linkee is a minimalist, self-hosted alternative to Linktree, allowing you to create a personalized landing page to showcase all your important links in one place. Built with modern web technologies and deployed via Firebase, Linkee offers a straightforward solution for managing your online presence.

🚀 Features
Customizable Link Page: Easily add, remove, or modify links to suit your needs.

Responsive Design: Ensures optimal viewing across devices.

Firebase Hosting: Simplifies deployment with scalable hosting solutions.

Modern Tech Stack: Utilizes JavaScript, CSS, and HTML for a seamless experience.

🛠️ Tech Stack
Frontend: JavaScript, CSS, HTML

Hosting: Firebase

Development Tools: Visual Studio Code configurations included

📁 Project Structure
perl
Copy code
linkee/
├── .firebase/           # Firebase configuration files
├── .vscode/             # VS Code workspace settings
├── public/              # Static assets served by Firebase
├── src/                 # Source code for the application
├── .firebaserc          # Firebase project aliases
├── firebase.json        # Firebase hosting configuration
├── package.json         # Project metadata and dependencies
├── package-lock.json    # Exact versions of installed packages
└── README.md            # Project documentation
🚀 Getting Started
Prerequisites
Node.js and npm installed on your machine

A Firebase account

Installation
Clone the repository:

bash
Copy code
git clone https://github.com/Prince2451/linkee.git
cd linkee
Install dependencies:

bash
Copy code
npm install
Set up Firebase:

Install the Firebase CLI if you haven't already:

bash
Copy code
npm install -g firebase-tools
Log in to Firebase:

bash
Copy code
firebase login
Initialize Firebase in the project directory:

bash
Copy code
firebase init
Select Hosting.

Choose your Firebase project.

Set public as the public directory.

Configure as a single-page app: Yes

Overwrite firebase.json and public/index.html if prompted: No

Deploy to Firebase:

bash
Copy code
firebase deploy
Your Linkee page will be live at the Firebase-provided URL.

🔧 Customization
Adding Links: Modify the public/index.html file to add your personal links.

Styling: Update the CSS in the public directory to change the appearance.

Functionality: Enhance interactivity by editing JavaScript files in the src directory.

🤝 Contributing
Contributions are welcome! If you have suggestions for improvements or encounter issues, please open an issue or submit a pull request.

📄 License
This project is open-source and available under the MIT License.
