insert into users (userlogin, facebookId) values ($1, $2) returning userlogin, userid;
