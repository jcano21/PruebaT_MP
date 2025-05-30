
USE MPCasosDB;
GO

-- Fiscalia

CREATE TABLE Fiscalia (
    id_fiscalia INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(100) NOT NULL,
    ubicacion VARCHAR(200)
);
GO

-- Estado del Caso

CREATE TABLE EstadoCaso (
    id_estado INT PRIMARY KEY IDENTITY(1,1),
    nombre_estado VARCHAR(50) NOT NULL
);
GO

-- Usuario
CREATE TABLE Usuario (
    id_usuario INT PRIMARY KEY IDENTITY(1,1),
    nombre_usuario VARCHAR(50) NOT NULL UNIQUE,
    contrasena VARCHAR(100) NOT NULL,
    rol VARCHAR(50) NOT NULL,
    email VARCHAR(100)
);
GO

-- Fiscal
CREATE TABLE Fiscal (
    id_fiscal INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(100) NOT NULL,
    id_fiscalia INT NOT NULL,
    id_usuario INT NOT NULL,
    FOREIGN KEY (id_fiscalia) REFERENCES Fiscalia(id_fiscalia),
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario),
    CONSTRAINT UK_Fiscal_Usuario UNIQUE (id_usuario)
);
GO

-- Caso

CREATE TABLE Caso (
    id_caso INT PRIMARY KEY IDENTITY(1,1),
    descripcion TEXT,
    fecha_creacion DATE NOT NULL DEFAULT GETDATE(),
    id_fiscal INT NOT NULL,
    id_estado INT NOT NULL,
    id_fiscalia INT NOT NULL,
    FOREIGN KEY (id_fiscal) REFERENCES Fiscal(id_fiscal),
    FOREIGN KEY (id_estado) REFERENCES EstadoCaso(id_estado),
    FOREIGN KEY (id_fiscalia) REFERENCES Fiscalia(id_fiscalia)
);
GO

-- LogReasignacion


CREATE TABLE LogReasignacion (
    id_log INT PRIMARY KEY IDENTITY(1,1),
    id_caso INT NOT NULL,
    id_fiscal_anterior INT NOT NULL,
    id_fiscal_nuevo INT NOT NULL,
    fecha_intento DATETIME NOT NULL DEFAULT GETDATE(),
    motivo TEXT,
    FOREIGN KEY (id_caso) REFERENCES Caso(id_caso),
    FOREIGN KEY (id_fiscal_anterior) REFERENCES Fiscal(id_fiscal),
    FOREIGN KEY (id_fiscal_nuevo) REFERENCES Fiscal(id_fiscal)
);



