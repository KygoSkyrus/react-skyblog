### things could be better

- in USERSUBMITED BLOGS ::: //in this add a add button for blogs,,it will be like visiblity switch,,,when on it means it will be added to the adminb blogs
  //add the deleted and add api to backend and think about edit,,,not a good idea to edit the blog,,,leave it



- blogs will be added to admin blog section with visibuiluty off initially,,

- and on switch off it will be removed from blogs


# could be better?

- instead of reloading the page on admin action, just re-fetch the api to show updated data
- instead of fetching all the data at once at top level, fetch whereever necessary only
- setup redux

- also there should be a way to delete cloud images when a blog is deleted (for this we need to store the image name while uploading in the db so on delete we can create the refenrece of that iamge by the image name and delete it)
- blogs forms are at 3 place, at blog-management, and on edit, and the userblog, all three of them are same,,,a common component can be used here

- add the comment fetaure on blog,,can add a field in blog collection ,this will be a array of object holding all the comments