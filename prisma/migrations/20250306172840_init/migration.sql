BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[cities] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [plate_code] INT NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [cities_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2,
    [deleted_at] DATETIME2,
    CONSTRAINT [cities_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [cities_name_key] UNIQUE NONCLUSTERED ([name]),
    CONSTRAINT [cities_plate_code_key] UNIQUE NONCLUSTERED ([plate_code])
);

-- CreateTable
CREATE TABLE [dbo].[districts] (
    [id] INT NOT NULL IDENTITY(1,1),
    [city_id] INT NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [districts_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2,
    [deleted_at] DATETIME2,
    CONSTRAINT [districts_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [districts_name_city_id_key] UNIQUE NONCLUSTERED ([name],[city_id])
);

-- AddForeignKey
ALTER TABLE [dbo].[districts] ADD CONSTRAINT [districts_city_id_fkey] FOREIGN KEY ([city_id]) REFERENCES [dbo].[cities]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
