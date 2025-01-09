/*
  Warnings:

  - You are about to drop the column `reset_password_expires` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `reset_password_token` on the `users` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[users] DROP COLUMN [reset_password_expires],
[reset_password_token];

-- CreateTable
CREATE TABLE [dbo].[carts] (
    [id] INT NOT NULL IDENTITY(1,1),
    [userId] INT,
    [productId] INT NOT NULL,
    [quantity] INT NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [carts_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2,
    [deleted_at] DATETIME2,
    CONSTRAINT [carts_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[carts] ADD CONSTRAINT [carts_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[users]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[carts] ADD CONSTRAINT [carts_productId_fkey] FOREIGN KEY ([productId]) REFERENCES [dbo].[products]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
