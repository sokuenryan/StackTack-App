# Welcome to StackTack!!
## Overview
StackTack is a financial management application built with React.js.<br>
It helps users effectively manage their financial bill tracking, monitor due dates, and contributions made towards their credit and investment goals using an easy, clean, and simplistic visual interface.<br> 

## Inspiration
The app's inspiration came about as a showcase for a problem solving solution when I realized it would be much easier to log into one app instead of many when needing to check my financial due dates.<br>
When moving my financial apps to one area of my phone for ease of access I realized I had to sign into more than one. 

## StackTack's Benefit to My Life
This app not only has helped me stay on time with credit due dates increasing my credit, but also has become a synergetic tool when budgeting and calculating my finances for the week allowing me to easily see where I need to cut or contribute spending. 

**For a full live view look at this app - check out StackTack at:** <br>
**LIVE VIEW** : [link to Netlify!] (http://www.netlify.com)

## Features
**Bill Tracking**
  - Create, read, update, and delete bills with ease.
  - Easy visualization of bills, amount, week they are due, and date due.
  - View a summary of all outstanding and paid bills.

**Calendar Visual**
  - Uses react-calendar.
  - All bills get their name and amount printed to the designated tile per selected date by the user.

**Investment and Credit Tracking and Contribution**
  - Create, read, update and delete listed items
  - Add contribution amounts
  - Banner feature pop up will appear when contributions suprass the initial credit or investment amount placed
  - Congratulations feature will pop up when you complete your goal using Toastify

**Authentication**
   - Uses private routers run through Firebase Authentication system.
   - requires email and password registration.
   - Contains a Google Provider sign-in option from Firebase Auth. 
---
## Running This Project Locally
***NOTE: This project was created with Vite so you will have to run it in order to work this app***

**From the Repo
 1. Click on {<> Code} dropdown menu
 2. select Download ZIP
 3. Open the zip file in the designated folder app
 4. right click and select 'Extract All'
 5. Save the unzipped file to your directory
 6. Open folder in your code editor
 7. Open terminal in the selected folder
 8. Type "npm install Vite@latest"
 9. Type "npm run dev"

**With the Terminal Link
  1. First clone the repository, run the following command
     ```bash
      git clone https://github.com/sokuenryan/StackTack-App.git
  2. CD into the file location './StackTack-App'
  3. Open Terminal and run 'npm install vite@latest'
  4. Run 'npm run dev' to start up the application.

## Dependencies 
    "@heroicons/react": "^2.1.3",
    "firebase": "^10.12.5",
    "react": "^18.2.0",
    "react-calendar": "^5.0.0",
    "react-dom": "^18.2.0",
    "react-icons": "^5.2.1",
    "react-router-dom": "^6.23.1",
    "react-toastify": "^10.0.5",
    "sass": "^1.77.4"

## DevDependencies 
    "@vitejs/plugin-react-swc": "^3.5.0",
    "eslint": "^8.57.0",
    "eslint-plugin-react": "^7.34.1",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.6",
    "vite": "^5.2.0"

# Planned Upcoming Features
## Backend Work
At the moment all user data gets saved to the local storage.<br>
### Note <br>
***All data input areas are intended for ***basic info only*** and **NOT** for the user to create or generate ANY sensative or confidential information***<br>
However, backend is needed so that muliple users ***can*** use the application on more than one browser 
due to the fact that it's client-side only at the moment. The app is intended for personal use, but for 
cleanliness and proficiency for the app a small storage working the non-complex data would make this app 
both clean of duplication and feel more complete. 

## Contributing
### We welcome contributions from the community! Here’s how you can get involved:###

1. Fork the Repository:
    - Click the "Fork" button on the top-right corner of this repository to create your own copy.
2.  Clone Your Fork:
    - Clone your forked repository to your local machine:
    ``` bash
    git clone https://github.com/yourusername/StackTack-App.git
    cd StackTack-App
3. Create a Branch
   - Create a new branch for your changes:
   ``` bash
   git checkout -b feature/your-feature-name
4. Make Changes
   - Make your changes or additions to the codebase.
5. Commit Your Changes
   - Commit your changes with a descriptive message:
     ```bash
     git add .
     git commit -m "Add a brief description of your changes"
6. Push to Fork:
   - Push changes to your forked repo
   ```bash
   git push origin feature/your -feature-name
7. Create a Pull Request:
   - Go to the origional repo and open a pull request from your branch to the  `main` branch of the origional repository.
     - Include a clear description of the task you chose and a brief description of your changes or feature.
8. Review and Feedback:
  - The project maintainer will review your pull request and get back to you shortly.
**Additional Notes:**

- **[Issues](https://github.com/sokuenryan/StackTack-App/issues)**: If you encounter any bugs or have suggestions for improvements, please open an issue in the Issues section of the repository.
- **Documentation**: Contributions to improve documentation are also welcome!

Thank you for your interest in contributing to StackTack!
