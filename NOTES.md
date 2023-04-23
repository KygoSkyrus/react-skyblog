### todo
- add share blog option like faceboook insta and twitter linkend ,

- add the comment fetaure on blog,,can add a field in blog collection ,this will be a array of object holding all the comments 

- IMPORTANT:::: have to add redirect things in server,,,bcz eralier the routes were macd in sevrer but now on client they are,,so we know the route,,,so now we need pt redirect ...for example to error page and login


- IMPORTNAT ::::THERE IS prop drilling ,,very deep...use redux and fix

    //in this add a add button for blogs,,it will be like visiblity switch,,,when ne it means it will be added to the adminb blogs
    //add the deleted and add api to backend and think about edit,,,not a good idea to edit the blog,,,leave it


- categories and count is not working count is wrong


## defects
- use reactdraftwyswyg summernot is creating a lot of problems
- blogsmanangement,editblog,post a blog needs attentions after new wyswyg is  added,also usersub,ittedblogs
- [Fixed] where ever there is a category link,,its needs to be pass with state
- [fixed](just a minute after logging rhis issue)A BIG PROBLEM,,,,ON REFRESING A CATEGORY PAGE <<ITS NOT LOADING TGHE BLOG>>
- convert all the anchor tag in the not admin componeddnts to link in order to avoid page reload when redirecting to another page
- also there should be a way to delet cloud images when a blog is deleted
- write the logic to check in url that the asked blog even exists or not,if not then redirect  to error page {i think this can be solved if the page loads oonly after the respnose is recived from the server,,only then move forward to redirect to any route}
- visibility [button] is not workinnh
- summernote is not working ...unanle to get the inner html i think..
- routes are fucked up
- homepage is not looking good
- on admin side,,,a olots of components are repeting for instance the inputs for blogs,,,afe used in blog eidit ,post blog 
- change every anchor tag to Link to avoid page reload
- search in navbar is not working 
- what is someone delets the 4 category that ypou have hardcoded in navbar
- navbar is not looking good
- usersubmitted blogs has a lots of error bcz it has unfinished things,,like to add them to admin blogs and delete butons,,on click are not active 
- on admin side problem  exists in blogsmanagemnet(have to add image cloud and fix api) edit and user blogs(above mentioned)
- have to fix navbar on mobile view
- add a loader untill server connects to db
- in mobile view hide clock from admin panel
- in mobile view in panel do something like thesidebar tottally hides away just leave the ham there to bring it back
- even for a sec its still showing a dashboard before redirecting to login page when admin not logged in
- on hover add images zoom or something on blogs
- not just put the detail in frontend,,you have to append it to the element so that it does not show the tags as text
-timer is incorrect,,at 12 am its showing pm
- should add some Toast for acknowledging the response from server, like when blog visiblity is set, password chnaged etc [for blogvisibilty use like on full page a text just fades in out]

## NOTE::::: two apis are calling when blogs managemnet is loaded,,one in  app.js and other in itself...the second one is not needed if you remove the status filter and move that filter to lowwerr level to the notadmin section.

### things could be better
- on deleting blog,,no response is recueved from server,,admin has to refresh in order to see the changes,,
- try putting a loader when an action is in progress,,like deleting a blog,,while posting etc
- in USERSUBMITED BLOGS  :::  //in this add a add button for blogs,,it will be like visiblity switch,,,when on it means it will be added to the adminb blogs
    //add the deleted and add api to backend and think about edit,,,not a good idea to edit the blog,,,leave it

- in single blog...in react the single blog api is not used,,as i hlready have lsit of all blogs,,so avoilding calling this api and looping pver the already fetched all blogs to find the single blog and alos the previous and next blog,,,[avoiding calling the next prev api too ]---------but later if the number of blogs are too much to afford a loop over them then api should be called...

- when an image of same name is uploaded in firebase storage then the older image is replcaed by new one,,,leaving this as it as but it can be fixed by using an unique name while uploading image like uuid-v4

- blogs forms are at 3 place, at blg-management, and on edit, and the userblog, all tgree of them are safe,,,a common componend can be used here

-to redirect to edit blog page and for blogsmanagement i sidebar i have used anchor tag instaed of the Link bcz we need to refecresh these pages as they have summernote and summernote only loads when page is refreshed

-summernote is a problem,,there is a wysiwyg react-draft-wysiwyg,,try using this instead

-redux is needed 






### forever notes
-[new finding on cookies and securing info in cookies]--so there is a flag "HttpOnly" which is used while setting a cookie and  if its true then you cant acces that cookie from any scripting language or browser which menas not accessible by frontend,,,it can only be accessed by backend in the response object,,,only seever can access and validate that,, thhis can be used to see if one is logged in or any authentication etc,,,bcz having cookie accessible in frontend then anyone can see cookie value and have access,,,that's why alway use httponly AND do the validation work at server

- whenever there is an warning bcz of key and you dont have uniqe values evertime then know that there is a second paramter in map function whcih can be index and it increment ..like a counter ...arr.map((x,index)=>{console.log(index)})

- when you have html content in form of string then sometimes maybe it wont act as html even if you put it as innerHtml of an element.. so in that case you should use "dangerouslySetInnerHTML={{ __html: theHTMLstring }}"

- wehne we submit forms with button as of type submit then the page referesh after submmiting,,there mayeb e sometime that you may need the response from server when the form submits,,in that case you can use
//you can call a function onsubmit event in form tag,,why this?bcz it does the work of bpth your  own function and form validation,,it checks for required field and othe rvalidation
"e.preventDefault()"  //this stops page to refresh 
    //or you could have used return false at the bottom of the function which would have stopped refreshing page

- in react router Link you can pass the state as well while redirecting to a page 
```
<Link to="/category/tech" state={{ some: "value1" }}/>
```
and you can get this state from the compeonet by "props.state"

- if you are using conditional redering on a based on a state then do not initialise the state while creating as it would be true all the time bcz you initialized it will not be undefined


-whne you are in production, whihc measn your are using build of react and in thtabu has usedf react router.,,then it will only worek when u route from default pagebusing the onpage link, but if you type and try to open it then it wont be able to get that page,, this is bcz then it willg  try to get the page 'build/cart' and it wont be able to find it,,, so you have to set the index.html as the static 

app.use(express.static(path.join(__dirname, 'client/build')));
app.get('/*', function(req,res) {
		res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});


- on render uou can do this by
In your case render.com has a simple solution for that. On the dashboard for your app, click the Redirects/Rewrites tab and add the following:
# Source: /*
# Destination: /index.html
# Action: Rewrite
