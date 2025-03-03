BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[cart_items] DROP CONSTRAINT [cart_items_product_variant_id_fkey];

-- AlterTable
ALTER TABLE [dbo].[cart_items] ALTER COLUMN [product_variant_id] INT NULL;

-- AddForeignKey
ALTER TABLE [dbo].[cart_items] ADD CONSTRAINT [cart_items_product_variant_id_fkey] FOREIGN KEY ([product_variant_id]) REFERENCES [dbo].[product_variant]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
