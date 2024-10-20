/*
  Warnings:

  - You are about to drop the column `image_path` on the `products` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[products] DROP COLUMN [image_path];
ALTER TABLE [dbo].[products] ADD [image] NVARCHAR(1000);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
