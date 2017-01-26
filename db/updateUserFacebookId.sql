UPDATE users
SET facebookid = $1
WHERE email = $2
returning userlogin, facebookId , email;
