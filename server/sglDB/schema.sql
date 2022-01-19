-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'products'
-- Retrieves the list of products
-- ---

DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `related` SET NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) COMMENT 'Retrieves the list of products';

-- ---
-- Table 'product_info'
-- Returns all product level information for a specified product id
-- ---

DROP TABLE IF EXISTS `product_info`;

CREATE TABLE `product_info` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `name` CHAR NULL DEFAULT NULL,
  `slogan` CHAR NULL DEFAULT NULL,
  `description` VARCHAR NULL DEFAULT NULL,
  `category` CHAR NULL DEFAULT NULL,
  `default_price` CHAR NULL DEFAULT NULL,
  `id_features` SET NULL DEFAULT NULL,
  `id_styles` SET NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) COMMENT 'Returns all product level information for a specified produc';

-- ---
-- Table 'features'
--
-- ---

DROP TABLE IF EXISTS `features`;

CREATE TABLE `features` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `feature` CHAR NULL DEFAULT NULL,
  `value` CHAR NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'styles'
-- Returns the all styles available for the given product.
-- ---

DROP TABLE IF EXISTS `styles`;

CREATE TABLE `styles` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `name` CHAR NULL DEFAULT NULL,
  `original_price` CHAR NULL DEFAULT NULL,
  `sale_price` CHAR NULL DEFAULT NULL,
  `default?` bit NULL DEFAULT NULL,
  `id_styles_photos` SET NULL DEFAULT NULL,
  `id_skus` SET NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) COMMENT 'Returns the all styles available for the given product.';

-- ---
-- Table 'styles_photos'
--
-- ---

DROP TABLE IF EXISTS `styles_photos`;

CREATE TABLE `styles_photos` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `thumbnail_url` CHAR NULL DEFAULT NULL,
  `url` CHAR NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'skus'
--
-- ---

DROP TABLE IF EXISTS `skus`;

CREATE TABLE `skus` (
  `id` CHAR NULL AUTO_INCREMENT DEFAULT NULL,
  `quantity` INTEGER NULL DEFAULT NULL,
  `size` CHAR NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `product_info` ADD FOREIGN KEY (id) REFERENCES `products` (`id`);
ALTER TABLE `product_info` ADD FOREIGN KEY (id_features) REFERENCES `features` (`id`);
ALTER TABLE `product_info` ADD FOREIGN KEY (id_styles) REFERENCES `styles` (`id`);
ALTER TABLE `styles` ADD FOREIGN KEY (id_styles_photos) REFERENCES `styles_photos` (`id`);
ALTER TABLE `styles` ADD FOREIGN KEY (id_skus) REFERENCES `skus` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `products` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `product_info` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `features` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `styles` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `styles_photos` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `skus` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `products` (`id`,`related`) VALUES
-- ('','');
-- INSERT INTO `product_info` (`id`,`name`,`slogan`,`description`,`category`,`default_price`,`id_features`,`id_styles`) VALUES
-- ('','','','','','','','');
-- INSERT INTO `features` (`id`,`feature`,`value`) VALUES
-- ('','','');
-- INSERT INTO `styles` (`id`,`name`,`original_price`,`sale_price`,`default?`,`id_styles_photos`,`id_skus`) VALUES
-- ('','','','','','','');
-- INSERT INTO `styles_photos` (`id`,`thumbnail_url`,`url`) VALUES
-- ('','','');
-- INSERT INTO `skus` (`id`,`quantity`,`size`) VALUES
-- ('','','');