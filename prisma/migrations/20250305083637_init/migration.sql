/*
  Warnings:

  - You are about to drop the column `userId` on the `carts` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `favorites` table. All the data in the column will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[customerId]` on the table `carts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[customer_id,product_id]` on the table `favorites` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `customer_id` to the `favorites` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[carts] DROP CONSTRAINT [carts_userId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[favorites] DROP CONSTRAINT [favorites_user_id_fkey];

-- DropIndex
ALTER TABLE [dbo].[carts] DROP CONSTRAINT [carts_userId_key];

-- DropIndex
ALTER TABLE [dbo].[favorites] DROP CONSTRAINT [favorites_user_id_product_id_key];

-- AlterTable
ALTER TABLE [dbo].[carts] DROP COLUMN [userId];
ALTER TABLE [dbo].[carts] ADD [customerId] INT;

-- AlterTable
ALTER TABLE [dbo].[favorites] DROP COLUMN [user_id];
ALTER TABLE [dbo].[favorites] ADD [customer_id] INT NOT NULL;

-- DropTable
DROP TABLE [dbo].[users];

-- CreateTable
CREATE TABLE [dbo].[customers] (
    [id] INT NOT NULL IDENTITY(1,1),
    [email] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [surname] NVARCHAR(1000) NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [customers_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2,
    [deleted_at] DATETIME2,
    CONSTRAINT [customers_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [customers_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[orders] (
    [id] INT NOT NULL IDENTITY(1,1),
    [customer_id] INT,
    [total_amount] FLOAT(53) NOT NULL,
    [status] NVARCHAR(1000) NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [orders_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2,
    [deleted_at] DATETIME2,
    CONSTRAINT [orders_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateIndex
ALTER TABLE [dbo].[carts] ADD CONSTRAINT [carts_customerId_key] UNIQUE NONCLUSTERED ([customerId]);

-- CreateIndex
ALTER TABLE [dbo].[favorites] ADD CONSTRAINT [favorites_customer_id_product_id_key] UNIQUE NONCLUSTERED ([customer_id], [product_id]);

-- AddForeignKey
ALTER TABLE [dbo].[carts] ADD CONSTRAINT [carts_customerId_fkey] FOREIGN KEY ([customerId]) REFERENCES [dbo].[customers]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[orders] ADD CONSTRAINT [orders_customer_id_fkey] FOREIGN KEY ([customer_id]) REFERENCES [dbo].[customers]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[favorites] ADD CONSTRAINT [favorites_customer_id_fkey] FOREIGN KEY ([customer_id]) REFERENCES [dbo].[customers]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
