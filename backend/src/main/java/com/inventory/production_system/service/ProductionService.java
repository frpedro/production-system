package com.inventory.production_system.service;
import com.inventory.production_system.dto.ProductionItemDTO;
import com.inventory.production_system.dto.ProductionSuggestionDTO;
import com.inventory.production_system.entity.Product;
import com.inventory.production_system.entity.ProductRawMaterial;
import com.inventory.production_system.entity.RawMaterial;
import com.inventory.production_system.repository.ProductRepository;
import com.inventory.production_system.repository.ProductRawMaterialRepository;
import com.inventory.production_system.repository.RawMaterialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductionService {

    private final ProductRepository productRepository;
    private final RawMaterialRepository rawMaterialRepository;
    private final ProductRawMaterialRepository productRawMaterialRepository;

    @Transactional(readOnly = true)
    public ProductionSuggestionDTO suggestProduction() {
        // Buscar todos os produtos ordenados por valor (maior primeiro)
        List<Product> products = productRepository.findAll().stream()
                .sorted((p1, p2) -> p2.getValue().compareTo(p1.getValue()))
                .collect(Collectors.toList());

        // Criar mapa de estoque atual (será modificado durante o cálculo)
        Map<Long, Integer> availableStock = rawMaterialRepository.findAll().stream()
                .collect(Collectors.toMap(
                        RawMaterial::getId,
                        RawMaterial::getStockQuantity
                ));

        List<ProductionItemDTO> production = new ArrayList<>();

        // Para cada produto (do maior valor para o menor)
        for (Product product : products) {
            List<ProductRawMaterial> requiredMaterials =
                    productRawMaterialRepository.findByProductId(product.getId());

            if (requiredMaterials.isEmpty()) {
                continue; // Produto sem matérias-primas definidas
            }

            // Calcular quantas unidades podem ser produzidas
            int maxQuantity = calculateMaxProduction(requiredMaterials, availableStock);

            if (maxQuantity > 0) {
                // Descontar as matérias-primas usadas do estoque
                for (ProductRawMaterial prm : requiredMaterials) {
                    Long rmId = prm.getRawMaterial().getId();
                    int used = prm.getQuantityRequired() * maxQuantity;
                    availableStock.put(rmId, availableStock.get(rmId) - used);
                }

                // Adicionar à lista de produção
                BigDecimal totalValue = product.getValue()
                        .multiply(BigDecimal.valueOf(maxQuantity));

                production.add(new ProductionItemDTO(
                        product.getId(),
                        product.getName(),
                        maxQuantity,
                        product.getValue(),
                        totalValue
                ));
            }
        }

        // Calcular valor total
        BigDecimal totalValue = production.stream()
                .map(ProductionItemDTO::getTotalValue)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return new ProductionSuggestionDTO(production, totalValue);
    }

    private int calculateMaxProduction(
            List<ProductRawMaterial> requiredMaterials,
            Map<Long, Integer> availableStock) {

        int maxQuantity = Integer.MAX_VALUE;

        for (ProductRawMaterial prm : requiredMaterials) {
            Long rmId = prm.getRawMaterial().getId();
            Integer available = availableStock.getOrDefault(rmId, 0);
            int required = prm.getQuantityRequired();

            if (required == 0) {
                continue;
            }

            int possibleUnits = available / required;
            maxQuantity = Math.min(maxQuantity, possibleUnits);
        }

        return maxQuantity == Integer.MAX_VALUE ? 0 : maxQuantity;
    }
}