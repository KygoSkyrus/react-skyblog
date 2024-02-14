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
- format all the apis
- postablog compo need to be checked as js-cookie removed
- on login, its not redirecting to dashboard route
- add loader on every action

- admin panel / api routes not secure
- admin name of sidebar is not working due to cookie
- add status code in every route
- show guest mode badge
- show guest/admin name next to logout btn
- check why get requests are not working
- before pushing to prod ,, add secure true in session
- few blogs are deleted. add them back

# done

# could be better?

- isntead of reloading the page on admin action, just re-fetch the api to show updated data
- instead of fetching all the data at once at top level, fetch whereever necessary only
- setup redux
