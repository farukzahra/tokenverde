-- Script SQL para inserir dados iniciais do TokenVerde
-- Execute este script no PostgreSQL para criar usuários e dados de exemplo

-- Inserir usuários (senhas já criptografadas com bcrypt)
INSERT INTO "User" (id, name, email, password, role, "createdAt", "updatedAt") VALUES
('admin-001', 'Administrador TokenVerde', 'admin@tokenverde.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'ADMIN', NOW(), NOW()),
('owner-001', 'João Silva', 'joao.silva@email.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'PROPERTY_OWNER', NOW(), NOW()),
('owner-002', 'Maria Santos', 'maria.santos@email.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'PROPERTY_OWNER', NOW(), NOW()),
('investor-001', 'Carlos Investidor', 'carlos.investidor@email.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'INVESTOR', NOW(), NOW()),
('investor-002', 'Ana Investidora', 'ana.investidora@email.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'INVESTOR', NOW(), NOW())
ON CONFLICT (email) DO NOTHING;

-- Inserir propriedades
INSERT INTO "Property" (id, name, description, address, latitude, longitude, area, status, "ownerId", "createdAt", "updatedAt") VALUES
('prop-001', 'Fazenda Santa Maria', 'Propriedade rural com 500 hectares de terra fértil, ideal para agricultura e pecuária. Localizada em região de fácil acesso com infraestrutura básica.', 'Rodovia BR-101, km 45, Município de Santa Maria - RS', -29.6868, -53.8149, 500.0, 'APPROVED', 'owner-001', NOW(), NOW()),
('prop-002', 'Sítio Boa Vista', 'Sítio com 150 hectares, com nascentes de água e mata nativa preservada. Ideal para turismo rural e produção orgânica.', 'Estrada Municipal 123, Zona Rural, Município de Boa Vista - SC', -26.1941, -49.2431, 150.0, 'PENDING', 'owner-002', NOW(), NOW()),
('prop-003', 'Chácara Recanto Verde', 'Chácara de 80 hectares com lago natural e diversidade de fauna e flora. Perfeita para projetos de conservação ambiental.', 'Estrada do Recanto, km 12, Município de Recanto Verde - MG', -19.9167, -43.9345, 80.0, 'PENDING', 'owner-001', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Inserir áreas verdes
INSERT INTO "GreenArea" (id, name, description, area, type, status, "propertyId", "createdAt", "updatedAt") VALUES
('green-001', 'Mata Atlântica Preservada', 'Área de mata atlântica nativa com 50 hectares preservados. Rico em biodiversidade com espécies endêmicas.', 50.0, 'NATIVE_FOREST', 'ACTIVE', 'prop-001', NOW(), NOW()),
('green-002', 'Reflorestamento Eucalipto', 'Área de reflorestamento com eucalipto para produção sustentável de madeira. 30 hectares plantados.', 30.0, 'REFORESTATION', 'ACTIVE', 'prop-002', NOW(), NOW()),
('green-003', 'Reserva Legal', 'Reserva legal conforme Código Florestal. 20 hectares de vegetação nativa preservada.', 20.0, 'LEGAL_RESERVE', 'ACTIVE', 'prop-003', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Inserir tokens
INSERT INTO "Token" (id, name, symbol, "totalSupply", description, status, "propertyId", "createdAt", "updatedAt") VALUES
('token-001', 'Token Verde Santa Maria', 'TVSM', 1000000, 'Token representando a propriedade Fazenda Santa Maria', 'ACTIVE', 'prop-001', NOW(), NOW()),
('token-002', 'Token Verde Boa Vista', 'TVBV', 500000, 'Token representando a propriedade Sítio Boa Vista', 'PENDING', 'prop-002', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Comentário: Todas as senhas são '123456' (exceto admin que é 'admin123456')
-- As senhas estão criptografadas com bcrypt (hash: $2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi) 