/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `material` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `projectType` on the `Project` table. All the data in the column will be lost.
  - Added the required column `brandId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `keyFeatures` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productDes` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specifications` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `materialId` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectImg` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectTypeId` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "imageUrl",
DROP COLUMN "isDeleted",
ADD COLUMN     "brandId" TEXT NOT NULL,
ADD COLUMN     "categoryId" TEXT NOT NULL,
ADD COLUMN     "keyFeatures" TEXT NOT NULL,
ADD COLUMN     "productCode" TEXT,
ADD COLUMN     "productDes" TEXT NOT NULL,
ADD COLUMN     "productImages" TEXT[],
ADD COLUMN     "shippingDelivery" TEXT,
ADD COLUMN     "specifications" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "isDeleted",
DROP COLUMN "material",
DROP COLUMN "projectType",
ADD COLUMN     "materialId" TEXT NOT NULL,
ADD COLUMN     "projectImg" TEXT NOT NULL,
ADD COLUMN     "projectTypeId" TEXT NOT NULL,
ALTER COLUMN "projectName" SET DATA TYPE TEXT,
ALTER COLUMN "location" SET DATA TYPE TEXT,
ALTER COLUMN "client" SET DATA TYPE TEXT,
ALTER COLUMN "architects" SET DATA TYPE TEXT,
ALTER COLUMN "website" SET DATA TYPE TEXT,
ALTER COLUMN "facebookLink" SET DATA TYPE TEXT,
ALTER COLUMN "instagramLink" SET DATA TYPE TEXT,
ALTER COLUMN "linkedinLink" SET DATA TYPE TEXT,
ALTER COLUMN "xLink" SET DATA TYPE TEXT,
ALTER COLUMN "description" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Brand" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "brandTypeId" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "material" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "material_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "keyBrands" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "keyBrands_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "category_name_key" ON "category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Brand_name_key" ON "Brand"("name");

-- CreateIndex
CREATE UNIQUE INDEX "material_name_key" ON "material"("name");

-- CreateIndex
CREATE UNIQUE INDEX "keyBrands_name_key" ON "keyBrands"("name");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Brand" ADD CONSTRAINT "Brand_brandTypeId_fkey" FOREIGN KEY ("brandTypeId") REFERENCES "brandType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_projectTypeId_fkey" FOREIGN KEY ("projectTypeId") REFERENCES "projectType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "material"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
