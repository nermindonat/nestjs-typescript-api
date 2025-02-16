/*
  Warnings:

  - Added the required column `product_variant_id` to the `cart_items` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[cart_items] DROP CONSTRAINT [cart_items_productId_fkey];

-- AlterTable
ALTER TABLE [dbo].[cart_items] ADD [product_variant_id] INT NOT NULL;

-- AddForeignKey
ALTER TABLE [dbo].[cart_items] ADD CONSTRAINT [cart_items_productId_fkey] FOREIGN KEY ([productId]) REFERENCES [dbo].[products]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[cart_items] ADD CONSTRAINT [cart_items_product_variant_id_fkey] FOREIGN KEY ([product_variant_id]) REFERENCES [dbo].[product_variant]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
