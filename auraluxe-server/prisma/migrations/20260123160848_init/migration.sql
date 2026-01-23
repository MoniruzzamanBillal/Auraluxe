/*
  Warnings:

  - A unique constraint covering the columns `[cartId,productId,isDeleted]` on the table `CartItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CartItem_cartId_productId_isDeleted_key" ON "CartItem"("cartId", "productId", "isDeleted");
