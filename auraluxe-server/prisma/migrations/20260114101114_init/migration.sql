/*
  Warnings:

  - A unique constraint covering the columns `[order,isDeleted]` on the table `home_banner` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "home_banner_order_key";

-- CreateIndex
CREATE UNIQUE INDEX "home_banner_order_isDeleted_key" ON "home_banner"("order", "isDeleted");
