insert into users (username, password, email) values ($1, $2, $3)
  returning username, password , email;
