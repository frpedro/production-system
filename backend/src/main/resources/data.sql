INSERT INTO raw_materials (name, stock_quantity)
SELECT * FROM (VALUES
    ('Madeira', 500),
    ('Aço', 300),
    ('Tecido', 200),
    ('Parafusos', 1000),
    ('Tinta', 150)
) AS seed(name, stock_quantity)
WHERE NOT EXISTS (SELECT 1 FROM raw_materials);

INSERT INTO products (name, value)
SELECT * FROM (VALUES
    ('Cadeira de Madeira', 150.00),
    ('Mesa de Madeira', 400.00),
    ('Estante de Aço', 250.00)
) AS seed(name, value)
WHERE NOT EXISTS (SELECT 1 FROM products);

INSERT INTO product_raw_materials (product_id, raw_material_id, quantity_required)
SELECT p.id, r.id, seed.quantity_required
FROM (VALUES
    ('Cadeira de Madeira', 'Madeira', 5),
    ('Cadeira de Madeira', 'Parafusos', 10),
    ('Cadeira de Madeira', 'Tinta', 1),
    ('Mesa de Madeira', 'Madeira', 10),
    ('Mesa de Madeira', 'Parafusos', 20),
    ('Mesa de Madeira', 'Tinta', 2),
    ('Estante de Aço', 'Aço', 8),
    ('Estante de Aço', 'Parafusos', 15),
    ('Estante de Aço', 'Tinta', 1)
) AS seed(product_name, raw_material_name, quantity_required)
JOIN products p ON p.name = seed.product_name
JOIN raw_materials r ON r.name = seed.raw_material_name
WHERE NOT EXISTS (SELECT 1 FROM product_raw_materials);
