### todo
- add share blog option like faceboook insta and twitter linkend ,

- add the comment fetaure on blog,,can add a field in blog collection ,this will be a array of object holding all the comments 

- IMPORTANT:::: have to add redirect things in server,,,bcz eralier the routes were macd in sevrer but now on client they are,,so we know the route,,,so now we need pt redirect ...for example to error page and login


- IMPORTNAT ::::THERE IS prop drilling ,,very deep...use redux and fix

    //in this add a add button for blogs,,it will be like visiblity switch,,,when ne it means it will be added to the adminb blogs
    //add the deleted and add api to backend and think about edit,,,not a good idea to edit the blog,,,leave it


- categories and count is not working count is wrong


## defects
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
-in mobile view hide clock from admin panel
- in mobile view in panel do something like thesidebar tottally hides away just leave the ham there to bring it back
- even for a sec its still showing a dashboard before redirecting to login page when admin not logged in
- on hover add images zoom or something on blogs
- not just put the detail in frontend,,you have to append it to the element so that it does not show the tags as text
-timer is incorrect,,at 12 am its showing pm


### things could be better
- in single blog...in react the single blog api is not used,,as i hlready have lsit of all blogs,,so avoilding calling this api and looping pver the already fetched all blogs to find the single blog and alos the previous and next blog,,,[avoiding calling the next prev api too ]---------but later if the number of blogs are too much to afford a loop over them then api should be called...









### forever notes
-[new finding on cookies and securing info in cookies]--so there is a flag "HttpOnly" which is used while setting a cookie and  if its true then you cant acces that cookie from any scripting language or browser which menas not accessible by frontend,,,it can only be accessed by backend in the response object,,,only seever can access and validate that,, thhis can be used to see if one is logged in or any authentication etc,,,bcz having cookie accessible in frontend then anyone can see cookie value and have access,,,that's why alway use httponly AND do the validation work at server

- whenever there is an warning bcz of key and you dont have uniqe values evertime then know that there is a second paramter in map function whcih can be index and it increment ..like a counter ...arr.map((x,index)=>{console.log(index)})

- when you have html content in form of string then sometimes maybe it wont act as html even if you put it as innerHtml of an element.. so in that case you should use "dangerouslySetInnerHTML={{ __html: theHTMLstring }}"




### magento 
Consumer Key: oss8zd78nlg78i4w1k2s0sknv26hnoyd
Consumer Secret: r1mul7xs4bj3kn80diin9l5epaax1f0n
Access Token: fy1plwmgrw4tg03mbdmd6qrowiylfxio
Access Token Secret: g58w2qwvdvzvn9j22ld2hv00hszn09ft
https://mcstaging.charbroil.com/