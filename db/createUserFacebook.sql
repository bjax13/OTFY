insert into users (userlogin, facebookId, email) values ($1, $2, $3) returning userlogin, facebookId , email;
