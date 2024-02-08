### things could be better

- IMPORTNAT ::::THERE IS prop drilling ...use redux and fix
- in USERSUBMITED BLOGS ::: //in this add a add button for blogs,,it will be like visiblity switch,,,when on it means it will be added to the adminb blogs
  //add the deleted and add api to backend and think about edit,,,not a good idea to edit the blog,,,leave it
- add share blog option like faceboook insta and twitter linkend ,
- on hover add images zoom or something on blogs
- add the comment fetaure on blog,,can add a field in blog collection ,this will be a array of object holding all the comments

## defects

- also there should be a way to delet cloud images when a blog is deleted (for this we need to store the image name while uploading in the db so on delete we can create the refenrece of that iamge by the image name and delete it)
- blogs forms are at 3 place, at blg-management, and on edit, and the userblog, all tgree of them are safe,,,a common componend can be used here

# new
- WHY sidebar and header needed to be inside route? bcz when user is not logged in and he tries to access a route than behind the loader the sidebar and header keep showing

- the progress loader is not good enough, the animation takes time to start and till thne the process gets completed

- show the content in user submitted blogs in admin not the html
- cookie should be set at admin
- format all the apis
- create middleware for access right
- put the blogs in differnt route
- postablog compo need to be checked as js-cookie removed
- on login, its not redirecting to dashboard route
- add loader on every action

- admin panel / api routes not secure
- admin name of sidebar is not working due to cookie
- add status code in every route

- check why get requests are not working
