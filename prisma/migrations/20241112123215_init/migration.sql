BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[favorites] (
    [id] INT NOT NULL IDENTITY(1,1),
    [user_id] INT NOT NULL,
    [product_id] INT NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [favorites_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2,
    [deleted_at] DATETIME2,
    CONSTRAINT [favorites_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [favorites_user_id_product_id_key] UNIQUE NONCLUSTERED ([user_id],[product_id])
);

-- AddForeignKey
ALTER TABLE [dbo].[favorites] ADD CONSTRAINT [favorites_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[favorites] ADD CONSTRAINT [favorites_product_id_fkey] FOREIGN KEY ([product_id]) REFERENCES [dbo].[products]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
