DROP TABLE IF EXISTS `PostLikes`;
DROP TABLE IF EXISTS `Comments`;
DROP TABLE IF EXISTS `Posts`;
DROP TABLE IF EXISTS `Users`;
CREATE TABLE IF NOT EXISTS `Users` (`id` INTEGER NOT NULL auto_increment , `username` VARCHAR(255), `firstname` VARCHAR(255), `lastname` VARCHAR(255), `email` VARCHAR(255), `password` VARCHAR(255), `source` VARCHAR(255), `description` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS `Posts` (`id` INTEGER NOT NULL auto_increment , `source` VARCHAR(255), `description` VARCHAR(255), `visibility` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `userId` INTEGER NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS `Comments` (`id` INTEGER NOT NULL auto_increment , `content` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `postId` INTEGER NOT NULL, `userId` INTEGER NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`postId`) REFERENCES `Posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS `PostLikes` (`id` INTEGER NOT NULL auto_increment , `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `userId` INTEGER NOT NULL, `postId` INTEGER NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (`postId`) REFERENCES `Posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB;

insert into users(id, username, firstname, lastname, email, password, source, description, createdAt, updatedAt) values
(1,'johndoe','John','Doe','johndoe@gmail.com','password12345','https://via.placeholder.com/50','first user','2019-12-31','2019-12-31'),
(2,'janedoe','Jane','Doe','janedoe@gmail.com','password12345','https://via.placeholder.com/50','second user','2010-12-10','2013-12-31'),
(3,'janetdoe','Janet','Doe','janetdoe@gmail.com','password12345','https://via.placeholder.com/50','third user','2012-6-2','2012-12-31')
;

insert into posts(id, source, description, visibility, createdAt, updatedAt, userId) values
(1,'https://via.placeholder.com/650','first post','Public','2019-12-31','2019-12-31',1),
(2,'https://via.placeholder.com/650','2nd post','Public','2010-12-10','2013-12-31',1),
(3,'https://via.placeholder.com/650','third post','Public','2012-6-2','2012-12-31',2),
(4,'https://via.placeholder.com/650','fourth','Public','2012-6-2','2012-12-31',3)
;

insert into comments(id, content, createdAt, updatedAt, postId, userId) values
(1,'aaaaaaaaa','2019-12-31','2019-12-31',1,1),
(2,'bbbbbbbb','2010-12-10','2013-12-31',2,2),
(3,'ccccccccccc','2012-6-2','2012-12-31',3,3),
(4,'ddddddddddd','2012-6-2','2012-12-31',4,3),
(5,'cwecccccqweccccc','2012-6-2','2012-12-31',1,1),
(6,'cccasdeqwsadacccc','2012-6-2','2012-12-31',2,2),
(7,'cccccqweasdacccccc','2012-6-2','2012-12-31',3,3),
(8,'ccccccwwqdccccc','2012-6-2','2012-12-31',3,1)
;