USE MPCasosDB;
GO

-- Procedimientos para Fiscalia
-- Inserción
CREATE PROCEDURE InsertarFiscalia
    @nombre VARCHAR(100),
    @ubicacion VARCHAR(200)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        INSERT INTO Fiscalia (nombre, ubicacion)
        VALUES (@nombre, @ubicacion);
        SELECT SCOPE_IDENTITY() AS id_fiscalia;
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR (@ErrorMessage, 16, 1);
    END CATCH
END;
GO

-- Actualización
CREATE PROCEDURE ActualizarFiscalia
    @id_fiscalia INT,
    @nombre VARCHAR(100),
    @ubicacion VARCHAR(200)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        IF NOT EXISTS (SELECT 1 FROM Fiscalia WHERE id_fiscalia = @id_fiscalia)
            RAISERROR ('Fiscalía no encontrada', 16, 1);
        ELSE
            UPDATE Fiscalia
            SET nombre = @nombre, ubicacion = @ubicacion
            WHERE id_fiscalia = @id_fiscalia;
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR (@ErrorMessage, 16, 1);
    END CATCH
END;
GO

-- Consulta por ID
CREATE PROCEDURE ConsultarFiscalia
    @id_fiscalia INT
AS
BEGIN
    SET NOCOUNT ON;
    SELECT id_fiscalia, nombre, ubicacion
    FROM Fiscalia
    WHERE id_fiscalia = @id_fiscalia;
END;
GO

-- Consulta de todas las fiscalías
CREATE PROCEDURE ListarFiscalias
AS
BEGIN
    SET NOCOUNT ON;
    SELECT id_fiscalia, nombre, ubicacion
    FROM Fiscalia;
END;
GO

-- Eliminación
CREATE PROCEDURE EliminarFiscalia
    @id_fiscalia INT
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM Fiscal WHERE id_fiscalia = @id_fiscalia)
            RAISERROR ('No se puede eliminar la fiscalía porque tiene fiscales asociados', 16, 1);
        ELSE IF EXISTS (SELECT 1 FROM Caso WHERE id_fiscalia = @id_fiscalia)
            RAISERROR ('No se puede eliminar la fiscalía porque tiene casos asociados', 16, 1);
        ELSE
            DELETE FROM Fiscalia WHERE id_fiscalia = @id_fiscalia;
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR (@ErrorMessage, 16, 1);
    END CATCH
END;
GO

-- Procedimientos para EstadoCaso
-- Inserción
CREATE PROCEDURE InsertarEstadoCaso
    @nombre_estado VARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        INSERT INTO EstadoCaso (nombre_estado)
        VALUES (@nombre_estado);
        SELECT SCOPE_IDENTITY() AS id_estado;
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR (@ErrorMessage, 16, 1);
    END CATCH
END;
GO

-- Actualización
CREATE PROCEDURE ActualizarEstadoCaso
    @id_estado INT,
    @nombre_estado VARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        IF NOT EXISTS (SELECT 1 FROM EstadoCaso WHERE id_estado = @id_estado)
            RAISERROR ('Estado no encontrado', 16, 1);
        ELSE
            UPDATE EstadoCaso
            SET nombre_estado = @nombre_estado
            WHERE id_estado = @id_estado;
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR (@ErrorMessage, 16, 1);
    END CATCH
END;
GO

-- Consulta por ID
CREATE PROCEDURE ConsultarEstadoCaso
    @id_estado INT
AS
BEGIN
    SET NOCOUNT ON;
    SELECT id_estado, nombre_estado
    FROM EstadoCaso
    WHERE id_estado = @id_estado;
END;
GO

-- Consulta de todos los estados
CREATE PROCEDURE ListarEstadosCaso
AS
BEGIN
    SET NOCOUNT ON;
    SELECT id_estado, nombre_estado
    FROM EstadoCaso;
END;
GO

-- Eliminación
CREATE PROCEDURE EliminarEstadoCaso
    @id_estado INT
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM Caso WHERE id_estado = @id_estado)
            RAISERROR ('No se puede eliminar el estado porque tiene casos asociados', 16, 1);
        ELSE
            DELETE FROM EstadoCaso WHERE id_estado = @id_estado;
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR (@ErrorMessage, 16, 1);
    END CATCH
END;
GO

-- Procedimientos para Usuario
-- Inserción
CREATE PROCEDURE InsertarUsuario
    @nombre_usuario VARCHAR(50),
    @contrasena VARCHAR(100),
    @rol VARCHAR(50),
    @email VARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        INSERT INTO Usuario (nombre_usuario, contrasena, rol, email)
        VALUES (@nombre_usuario, @contrasena, @rol, @email);
        SELECT SCOPE_IDENTITY() AS id_usuario;
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR (@ErrorMessage, 16, 1);
    END CATCH
END;
GO

-- Actualización
CREATE PROCEDURE ActualizarUsuario
    @id_usuario INT,
    @nombre_usuario VARCHAR(50),
    @contrasena VARCHAR(100),
    @rol VARCHAR(50),
    @email VARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        IF NOT EXISTS (SELECT 1 FROM Usuario WHERE id_usuario = @id_usuario)
            RAISERROR ('Usuario no encontrado', 16, 1);
        ELSE
            UPDATE Usuario
            SET nombre_usuario = @nombre_usuario,
                contrasena = @contrasena,
                rol = @rol,
                email = @email
            WHERE id_usuario = @id_usuario;
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR (@ErrorMessage, 16, 1);
    END CATCH
END;
GO

-- Consulta por ID
CREATE PROCEDURE ConsultarUsuario
    @id_usuario INT
AS
BEGIN
    SET NOCOUNT ON;
    SELECT id_usuario, nombre_usuario, rol, email
    FROM Usuario
    WHERE id_usuario = @id_usuario;
END;
GO

-- Consulta de todos los usuarios
CREATE PROCEDURE ListarUsuarios
AS
BEGIN
    SET NOCOUNT ON;
    SELECT id_usuario, nombre_usuario, rol, email
    FROM Usuario;
END;
GO

-- Eliminación
CREATE PROCEDURE EliminarUsuario
    @id_usuario INT
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM Fiscal WHERE id_usuario = @id_usuario)
            RAISERROR ('No se puede eliminar el usuario porque está asociado a un fiscal', 16, 1);
        ELSE
            DELETE FROM Usuario WHERE id_usuario = @id_usuario;
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR (@ErrorMessage, 16, 1);
    END CATCH
END;
GO

-- Procedimientos para Fiscal
-- Inserción
CREATE PROCEDURE InsertarFiscal
    @nombre VARCHAR(100),
    @id_fiscalia INT,
    @id_usuario INT
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        IF NOT EXISTS (SELECT 1 FROM Fiscalia WHERE id_fiscalia = @id_fiscalia)
            RAISERROR ('Fiscalía no encontrada', 16, 1);
        ELSE IF NOT EXISTS (SELECT 1 FROM Usuario WHERE id_usuario = @id_usuario)
            RAISERROR ('Usuario no encontrado', 16, 1);
        ELSE
            INSERT INTO Fiscal (nombre, id_fiscalia, id_usuario)
            VALUES (@nombre, @id_fiscalia, @id_usuario);
            SELECT SCOPE_IDENTITY() AS id_fiscal;
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR (@ErrorMessage, 16, 1);
    END CATCH
END;
GO

-- Actualización
CREATE PROCEDURE ActualizarFiscal
    @id_fiscal INT,
    @nombre VARCHAR(100),
    @id_fiscalia INT,
    @id_usuario INT
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        IF NOT EXISTS (SELECT 1 FROM Fiscal WHERE id_fiscal = @id_fiscal)
            RAISERROR ('Fiscal no encontrado', 16, 1);
        ELSE IF NOT EXISTS (SELECT 1 FROM Fiscalia WHERE id_fiscalia = @id_fiscalia)
            RAISERROR ('Fiscalía no encontrada', 16, 1);
        ELSE IF NOT EXISTS (SELECT 1 FROM Usuario WHERE id_usuario = @id_usuario)
            RAISERROR ('Usuario no encontrado', 16, 1);
        ELSE
            UPDATE Fiscal
            SET nombre = @nombre,
                id_fiscalia = @id_fiscalia,
                id_usuario = @id_usuario
            WHERE id_fiscal = @id_fiscal;
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR (@ErrorMessage, 16, 1);
    END CATCH
END;
GO

-- Consulta por ID
CREATE PROCEDURE ConsultarFiscal
    @id_fiscal INT
AS
BEGIN
    SET NOCOUNT ON;
    SELECT f.id_fiscal, f.nombre, f.id_fiscalia, fi.nombre AS nombre_fiscalia, f.id_usuario
    FROM Fiscal f
    JOIN Fiscalia fi ON f.id_fiscalia = fi.id_fiscalia
    WHERE f.id_fiscal = @id_fiscal;
END;
GO

-- Consulta de todos los fiscales
CREATE PROCEDURE ListarFiscales
AS
BEGIN
    SET NOCOUNT ON;
    SELECT f.id_fiscal, f.nombre, f.id_fiscalia, fi.nombre AS nombre_fiscalia, f.id_usuario
    FROM Fiscal f
    JOIN Fiscalia fi ON f.id_fiscalia = fi.id_fiscalia;
END;
GO

-- Eliminación
CREATE PROCEDURE EliminarFiscal
    @id_fiscal INT
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM Caso WHERE id_fiscal = @id_fiscal)
            RAISERROR ('No se puede eliminar el fiscal porque tiene casos asociados', 16, 1);
        ELSE IF EXISTS (SELECT 1 FROM LogReasignacion WHERE id_fiscal_anterior = @id_fiscal OR id_fiscal_nuevo = @id_fiscal)
            RAISERROR ('No se puede eliminar el fiscal porque está en logs de reasignación', 16, 1);
        ELSE
            DELETE FROM Fiscal WHERE id_fiscal = @id_fiscal;
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR (@ErrorMessage, 16, 1);
    END CATCH
END;
GO

-- Procedimientos para Caso
-- Inserción
CREATE PROCEDURE InsertarCaso
    @descripcion TEXT,
    @id_estado INT,
    @id_fiscalia INT
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        IF NOT EXISTS (SELECT 1 FROM EstadoCaso WHERE id_estado = @id_estado)
            RAISERROR ('Estado no encontrado', 16, 1);
        ELSE IF NOT EXISTS (SELECT 1 FROM Fiscalia WHERE id_fiscalia = @id_fiscalia)
            RAISERROR ('Fiscalía no encontrada', 16, 1);
        ELSE
            INSERT INTO Caso (descripcion, fecha_creacion, id_estado, id_fiscalia)
            VALUES (@descripcion, GETDATE(), @id_estado, @id_fiscalia);
            SELECT SCOPE_IDENTITY() AS id_caso;
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR (@ErrorMessage, 16, 1);
    END CATCH
END;
GO

-- Actualización
CREATE PROCEDURE ActualizarCaso 
    @id_caso INT,
    @descripcion TEXT,
    @id_estado INT,
    @id_fiscalia INT,
    @id_fiscal INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        -- Validaciones
        IF NOT EXISTS (SELECT 1 FROM Caso WHERE id_caso = @id_caso)
            RAISERROR ('Caso no encontrado', 16, 1);
        ELSE IF NOT EXISTS (SELECT 1 FROM EstadoCaso WHERE id_estado = @id_estado)
            RAISERROR ('Estado no encontrado', 16, 1);
        ELSE IF NOT EXISTS (SELECT 1 FROM Fiscalia WHERE id_fiscalia = @id_fiscalia)
            RAISERROR ('Fiscalía no encontrada', 16, 1);
        ELSE IF NOT EXISTS (SELECT 1 FROM Fiscal WHERE id_fiscal = @id_fiscal)
            RAISERROR ('Fiscal no encontrado', 16, 1);
        ELSE
            -- Actualización
            UPDATE Caso
            SET descripcion = @descripcion,
                id_estado = @id_estado,
                id_fiscalia = @id_fiscalia,
                id_fiscal = @id_fiscal
            WHERE id_caso = @id_caso;
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR (@ErrorMessage, 16, 1);
    END CATCH
END;
GO

-- Consulta por ID
CREATE PROCEDURE ConsultarCaso
    @id_caso INT
AS
BEGIN
    SET NOCOUNT ON;
    SELECT c.id_caso, c.descripcion, c.fecha_creacion, c.id_fiscal, f.nombre AS nombre_fiscal,
           c.id_estado, e.nombre_estado, c.id_fiscalia, fi.nombre AS nombre_fiscalia
    FROM Caso c
    LEFT JOIN Fiscal f ON c.id_fiscal = f.id_fiscal
    JOIN EstadoCaso e ON c.id_estado = e.id_estado
    JOIN Fiscalia fi ON c.id_fiscalia = fi.id_fiscalia
    WHERE c.id_caso = @id_caso;
END;
GO

-- Consulta de todos los casos
CREATE PROCEDURE ListarCasos
AS
BEGIN
    SET NOCOUNT ON;
    SELECT c.id_caso, c.descripcion, c.fecha_creacion, c.id_fiscal, f.nombre AS nombre_fiscal,
           c.id_estado, e.nombre_estado, c.id_fiscalia, fi.nombre AS nombre_fiscalia
    FROM Caso c
    LEFT JOIN Fiscal f ON c.id_fiscal = f.id_fiscal
    JOIN EstadoCaso e ON c.id_estado = e.id_estado
    JOIN Fiscalia fi ON c.id_fiscalia = fi.id_fiscalia;
END;
GO

-- Eliminación
CREATE PROCEDURE EliminarCaso
    @id_caso INT
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM LogReasignacion WHERE id_caso = @id_caso)
            RAISERROR ('No se puede eliminar el caso porque tiene logs de reasignación asociados', 16, 1);
        ELSE
            DELETE FROM Caso WHERE id_caso = @id_caso;
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR (@ErrorMessage, 16, 1);
    END CATCH
END;
GO

-- Procedimientos para LogReasignacion
-- Inserción
CREATE PROCEDURE InsertarLogReasignacion
    @id_caso INT,
    @id_fiscal_anterior INT = NULL,
    @id_fiscal_nuevo INT,
    @motivo TEXT
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        IF NOT EXISTS (SELECT 1 FROM Caso WHERE id_caso = @id_caso)
            RAISERROR ('Caso no encontrado', 16, 1);
        ELSE IF @id_fiscal_anterior IS NOT NULL AND NOT EXISTS (SELECT 1 FROM Fiscal WHERE id_fiscal = @id_fiscal_anterior)
            RAISERROR ('Fiscal anterior no encontrado', 16, 1);
        ELSE IF NOT EXISTS (SELECT 1 FROM Fiscal WHERE id_fiscal = @id_fiscal_nuevo)
            RAISERROR ('Fiscal nuevo no encontrado', 16, 1);
        ELSE
            INSERT INTO LogReasignacion (id_caso, id_fiscal_anterior, id_fiscal_nuevo, fecha_intento, motivo)
            VALUES (@id_caso, @id_fiscal_anterior, @id_fiscal_nuevo, GETDATE(), @motivo);
            SELECT SCOPE_IDENTITY() AS id_log;
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR (@ErrorMessage, 16, 1);
    END CATCH
END;
GO

-- Consulta por ID
CREATE PROCEDURE ConsultarLogReasignacion
    @id_log INT
AS
BEGIN
    SET NOCOUNT ON;
    SELECT l.id_log, l.id_caso, l.id_fiscal_anterior, fa.nombre AS nombre_fiscal_anterior,
           l.id_fiscal_nuevo, fn.nombre AS nombre_fiscal_nuevo, l.fecha_intento, l.motivo
    FROM LogReasignacion l
    LEFT JOIN Fiscal fa ON l.id_fiscal_anterior = fa.id_fiscal
    JOIN Fiscal fn ON l.id_fiscal_nuevo = fn.id_fiscal
    WHERE l.id_log = @id_log;
END;
GO

-- Consulta de todos los logs
CREATE PROCEDURE ListarLogsReasignacion
AS
BEGIN
    SET NOCOUNT ON;
    SELECT l.id_log, l.id_caso, l.id_fiscal_anterior, fa.nombre AS nombre_fiscal_anterior,
           l.id_fiscal_nuevo, fn.nombre AS nombre_fiscal_nuevo, l.fecha_intento, l.motivo
    FROM LogReasignacion l
    LEFT JOIN Fiscal fa ON l.id_fiscal_anterior = fa.id_fiscal
    JOIN Fiscal fn ON l.id_fiscal_nuevo = fn.id_fiscal;
END;
GO


-- Procedimiento ReasignarCaso
CREATE PROCEDURE ReasignarCaso
    @id_caso INT,
    @id_fiscal_nuevo INT
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @id_fiscal_actual INT, @id_fiscalia_caso INT, @id_fiscalia_nuevo INT, @id_estado INT;
    
    SELECT @id_fiscal_actual = id_fiscal, 
           @id_fiscalia_caso = id_fiscalia, 
           @id_estado = id_estado
    FROM Caso
    WHERE id_caso = @id_caso;
    
    IF @@ROWCOUNT = 0
    BEGIN
        INSERT INTO LogReasignacion (id_caso, id_fiscal_anterior, id_fiscal_nuevo, fecha_intento, motivo)
        VALUES (@id_caso, @id_fiscal_actual, @id_fiscal_nuevo, GETDATE(), 'Error: El caso no existe');
        RETURN;
    END
    
    IF @id_fiscal_actual IS NULL
    BEGIN
        INSERT INTO LogReasignacion (id_caso, id_fiscal_anterior, id_fiscal_nuevo, fecha_intento, motivo)
        VALUES (@id_caso, NULL, @id_fiscal_nuevo, GETDATE(), 'Error: El caso no tiene un fiscal asignado, use AsignarFiscalCaso');
        RETURN;
    END
    
    SELECT @id_fiscalia_nuevo = id_fiscalia
    FROM Fiscal
    WHERE id_fiscal = @id_fiscal_nuevo;
    
    IF @@ROWCOUNT = 0
    BEGIN
        INSERT INTO LogReasignacion (id_caso, id_fiscal_anterior, id_fiscal_nuevo, fecha_intento, motivo)
        VALUES (@id_caso, @id_fiscal_actual, @id_fiscal_nuevo, GETDATE(), 'Error: El fiscal nuevo no existe');
        RETURN;
    END
    
    IF EXISTS (SELECT 1 FROM EstadoCaso WHERE id_estado = @id_estado AND nombre_estado = 'Pendiente')
        AND @id_fiscalia_caso = @id_fiscalia_nuevo
    BEGIN
        UPDATE Caso
        SET id_fiscal = @id_fiscal_nuevo
        WHERE id_caso = @id_caso;
    END
    ELSE
    BEGIN
        DECLARE @motivo VARCHAR(200);
        SET @motivo = CASE 
            WHEN NOT EXISTS (SELECT 1 FROM EstadoCaso WHERE id_estado = @id_estado AND nombre_estado = 'Pendiente')
                THEN 'Error: El caso no está en estado Pendiente'
            ELSE 'Error: El nuevo fiscal no pertenece a la misma fiscalía'
        END;
        
        INSERT INTO LogReasignacion (id_caso, id_fiscal_anterior, id_fiscal_nuevo, fecha_intento, motivo)
        VALUES (@id_caso, @id_fiscal_actual, @id_fiscal_nuevo, GETDATE(), @motivo);
    END
END;
GO

CREATE PROCEDURE AutenticarUsuario
    @nombre_usuario VARCHAR(50),
    @contrasena VARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;
    SELECT id_usuario, nombre_usuario, rol, email
    FROM Usuario
    WHERE nombre_usuario = @nombre_usuario
    AND contrasena = @contrasena;
END;
GO

