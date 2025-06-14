https://sdmntprwestus3.oaiusercontent.com/files/00000000-ab88-61fd-81e3-31c657be45d8/raw?se=2025-06-14T15%3A38%3A24Z&sp=r&sv=2024-08-04&sr=b&scid=3cf1eeed-4824-5758-84f4-b6305d735d71&skoid=71e8fa5c-90a9-4c17-827b-14c3005164d6&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-06-13T22%3A57%3A17Z&ske=2025-06-14T22%3A57%3A17Z&sks=b&skv=2024-08-04&sig=pUi5A0a9%2Bf%2BgMH5ra0h5gD%2BACn0LpBUB%2B10qO/iGkPQ%3D

### Master Tables

```sql
CREATE TABLE FrameType (
    FrameTypeID INT IDENTITY PRIMARY KEY,
    Name NVARCHAR(100),
    WidthInches DECIMAL(5,2),
    Description NVARCHAR(255),
    CostPerInch DECIMAL(10,2)
);

CREATE TABLE GlassType (
    GlassTypeID INT IDENTITY PRIMARY KEY,
    Name NVARCHAR(100),
    CostPerSqInch DECIMAL(10,4)
);

CREATE TABLE MountType (
    MountTypeID INT IDENTITY PRIMARY KEY,
    Name NVARCHAR(100),
    ThicknessMM DECIMAL(5,2),
    CostPerUnit DECIMAL(10,2)
);

CREATE TABLE Material (
    MaterialID INT IDENTITY PRIMARY KEY,
    Name NVARCHAR(100),
    Type NVARCHAR(50), -- e.g., 'Paper', 'Acrylic', etc.
    CostPerSqInch DECIMAL(10,4)
);


```

### Transactional Tables

```sql
CREATE TABLE Customer (
    CustomerID INT IDENTITY PRIMARY KEY,
    Name NVARCHAR(100),
    Contact NVARCHAR(100),
    LoyaltyTier NVARCHAR(50),         -- e.g., 'Silver', 'Gold', 'Platinum'
    LoyaltyDiscountPct DECIMAL(5,2)   -- e.g., 5.00 for 5% discount
);

CREATE TABLE Estimate (
    EstimateID INT IDENTITY PRIMARY KEY,
    CustomerID INT FOREIGN KEY REFERENCES Customer(CustomerID),
    EstimateDate DATE,
    ValidTill DATE,
    PreparedBy NVARCHAR(100),
    CheckedBy NVARCHAR(100)
);

CREATE TABLE EstimateItem (
    EstimateItemID INT IDENTITY PRIMARY KEY,
    EstimateID INT FOREIGN KEY REFERENCES Estimate(EstimateID),
    Description NVARCHAR(255),
    FrameTypeID INT FOREIGN KEY REFERENCES FrameType(FrameTypeID),
    GlassTypeID INT FOREIGN KEY REFERENCES GlassType(GlassTypeID),
    MountTypeID INT FOREIGN KEY REFERENCES MountType(MountTypeID),
    WidthInches DECIMAL(5,2),
    HeightInches DECIMAL(5,2),
    Quantity INT,
    UnitCost DECIMAL(10,2),
    TotalCost AS (Quantity * UnitCost) PERSISTED
);

```

### Billing table

```sql

CREATE TABLE Bill (
    BillID INT IDENTITY PRIMARY KEY,
    CustomerID INT FOREIGN KEY REFERENCES Customer(CustomerID),
    BillDate DATE,
    Subtotal DECIMAL(12,2),              -- Sum of all item totals before discount
    LoyaltyDiscountPct DECIMAL(5,2),     -- Applied % at time of billing (copied from Customer)
    LoyaltyDiscountAmt AS (Subtotal * LoyaltyDiscountPct / 100.0) PERSISTED,
    GrandTotal AS (Subtotal - LoyaltyDiscountAmt) PERSISTED
);

CREATE TABLE BillItem (
    BillItemID INT IDENTITY PRIMARY KEY,
    BillID INT FOREIGN KEY REFERENCES Bill(BillID),
    ArtName NVARCHAR(100),
    FrameTypeID INT FOREIGN KEY REFERENCES FrameType(FrameTypeID),
    GlassTypeID INT FOREIGN KEY REFERENCES GlassType(GlassTypeID),
    MountTypeID INT FOREIGN KEY REFERENCES MountType(MountTypeID),
    WidthInches DECIMAL(5,2),
    HeightInches DECIMAL(5,2),
    FrameColor NVARCHAR(50),
    Quantity INT,
    UnitCost DECIMAL(10,2),
    TotalCost AS (Quantity * UnitCost) PERSISTED
);


```
