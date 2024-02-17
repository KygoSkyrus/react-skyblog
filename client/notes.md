### things could be better
- instead of reloading the page on admin action, just re-fetch the api to show updated data
- instead of fetching all the data at once at top level, fetch whereever necessary only
- setup redux
- also there should be a way to delete cloud images when a blog is deleted (for this we need to store the image name while uploading in the db, so on delete we can create the reference of that image by the image name and delete it)
- add the comment fetaure on blog,,can add a field in blog collection ,this will be a array of object holding all the comments