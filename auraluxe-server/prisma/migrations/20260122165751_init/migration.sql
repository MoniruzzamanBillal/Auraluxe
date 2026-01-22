/*
  Warnings:

  - You are about to drop the column `order` on the `home_banner` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `home_our_featured` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `home_our_product` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `our_featured_product` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "home_banner_order_isDeleted_key";

-- DropIndex
DROP INDEX "home_our_featured_order_isDeleted_key";

-- DropIndex
DROP INDEX "home_our_product_order_isDeleted_key";

-- DropIndex
DROP INDEX "our_featured_product_order_isDeleted_key";

-- AlterTable
ALTER TABLE "home_banner" DROP COLUMN "order";

-- AlterTable
ALTER TABLE "home_our_featured" DROP COLUMN "order";

-- AlterTable
ALTER TABLE "home_our_product" DROP COLUMN "order";

-- AlterTable
ALTER TABLE "our_featured_product" DROP COLUMN "order";
