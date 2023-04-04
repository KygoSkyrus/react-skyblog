### todo
- add share blog option like faceboook insta and twitter linkend ,

- add the comment fetaure on blog,,can add a field in blog collection ,this will be a array of object holding all the comments 

- IMPORTANT:::: have to add redirect things in server,,,bcz eralier the routes were macd in sevrer but now on client they are,,so we know the route,,,so now we need pt redirect ...for example to error page and login


- IMPORTNAT ::::THERE IS prop drilling ,,very deep...use redux and fix



### things could be better
- in single blog...in react the single blog api is not used,,as i hlready have lsit of all blogs,,so avoilding calling this api and looping pver the already fetched all blogs to find the single blog and alos the previous and next blog,,,[avoiding calling the next prev api too ]---------but later if the number of blogs are too much to afford a loop over them then api should be called...