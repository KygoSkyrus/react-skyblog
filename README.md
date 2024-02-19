# SKYBLOG

> Skyblog is a blogging platform where you can share your thoughts and ideas with the world.



### Description

SKYBLOG is a fullstack application built with *MERN* stack that allows users to post their blogs. The app follows a review and approval process where submitted blogs are sent to the admin for review before being published. Additionally, SKYBLOG includes a comprehensive admin panel with various features for managing the application effectively.

[comment]: add_badges,_screenshots_gifs_details_about_app__THINGS_THAT_CAN_BEIMPLEMENTED_WRITE_THE_IN_CONTRIBUTE_LIKE_COMMENT_FEATURE

### Features

- **User Blog Submission**: Users can submit their blogs through the app.
- **Admin Review and Publish**: Admins can review submitted blogs and choose to publish them.
- **Admin Panel**: The admin panel provides facilities for:

  - Creating and deleting categories.
  - Managing blogs, including editing and deleting.
  - Handling user feedback.
  - Exploring the admin panel in guest mode.

- Component reusability

### Installation

Follow these steps to set up SKYBLOG locally:

1. Clone or download the repository and go to the root folder
2. Install dependencies for the server and client:

- for server run this command from the _root_ folder and for client run the command from the _client_ folder

```bash
npm install
```

3. Set up the MongoDB database. Update the connection string in `env/config.env`
4. Set environment variables for sensitive information such as API keys or database credentials.
5. Start the server and client:

```bash
cd server
npm run dev

cd ../client
npm run start
```

### Usage

1. Visit http://localhost:3000 in your browser.
2. Users can sign up, submit blogs, and view their submitted blogs.
3. Admins can access the admin panel by navigating to http://localhost:3000/admin/dashboard. The default admin credentials are provided in the admin panel login.

### Contributing 🤝

Contributions to SKYBLOG are welcome! Please follow the guidelines in the [CONTRIBUTING.md](https://github.com/KygoSkyrus/react-skyblog/blob/master/CONTRIBUTING.md) file.
Feel free to check [issue page](https://github.com/KygoSkyrus/react-skyblog/issues)

### Show your support

Give a ⭐ if this project helped you!

### Acknowledgments

- SKYBLOG utilizes the MERN stack and various open-source libraries. See the package.json files for details.

### Demo

> Live at [SKYBLOG by Dheeraj Gupta](https://skyblog-dg.onrender.com)
