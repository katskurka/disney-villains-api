CREATE DATABASE disney_villains;

DROP USER IF EXISTS 'disneyVillains'@'localhost';
CREATE USER 'disneyVillains'@'localhost' IDENTIFIED BY 'fOoL$!';

GRANT ALL PRIVILEGES ON disney_villains.* to 'disneyVillains'@'localhost';
FLUSH PRIVILEGES;

USE disney_villains;

CREATE TABLE villains (
  ID INT auto_increment,
  name varchar(50),
  movie varchar(50),
  slug varchar(50),
  updatedAt DATETIME DEFAULT NOW(),
  createdAt DATETIME DEFAULT NOW(),
  PRIMARY KEY (ID)
);

INSERT INTO villains (name, movie, slug)
VALUES ('Captain Hook', 'Peter Pan', 'captain-hook'),
  ('Cruella de Vil', 'One Hundred and One Dalmatians', 'cruella-de-vil'),
  ('Gaston', 'Beauty and the Beast', 'gaston'),
  ('Hades', 'Hercules', 'hades'),
  ('Horned King', 'The Black Cauldron', 'horned-king'),
  ('Jafar', 'Aladdin', 'jafar'),
  ('Lady Tremaine', 'Cinderella', 'lady-tremaine'),
  ('Madame Medusa', 'The Rescuers', 'madame-medusa'),
  ('Madam Mim', 'The Sword in the Stone', 'madam-mim'),
  ('Maleficent', 'Sleeping Beauty', 'maleficent'),
  ('Prince John', 'Robin Hood', 'prince-john'),
  ('Sir Hiss', 'Robin Hood', 'sir-hiss'),
  ('Queen Grimhilde', 'Snow White and the Seven Dwarfs', 'queen-grimhilde'),
  ('Queen of Hearts', 'Alice in Wonderland', 'queen-of-hearts'),
  ('Scar', 'The Lion King', 'scar'),
  ('Shan Yu', 'Mulan', 'shan-yu'),
  ('Shere Khan', 'The Jungle Book', 'shere-khan'),
  ('Ursula', 'The Little Mermaid', 'ursula');

SELECT *
FROM villains;