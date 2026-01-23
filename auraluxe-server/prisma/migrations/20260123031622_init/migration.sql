/*
  Warnings:

  - You are about to drop the column `status` on the `Brand` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `brandType` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `home_banner` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `home_our_featured` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `home_our_product` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `keyBrands` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `material` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `our_featured_product` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `projectType` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `brandId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `materialId` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Product_isDeleted_status_idx";

-- AlterTable
ALTER TABLE "Brand" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "status",
ADD COLUMN     "brandId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "status",
ADD COLUMN     "materialId" TEXT NOT NULL,
ALTER COLUMN "description" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "brandType" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "category" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "home_banner" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "home_our_featured" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "home_our_product" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "keyBrands" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "material" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "our_featured_product" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "projectType" DROP COLUMN "status";

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "material"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
