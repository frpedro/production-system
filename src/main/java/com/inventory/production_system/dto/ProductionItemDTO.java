package com.inventory.production_system.dto;
import lombok.*;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductionItemDTO {
    private Long productId;
    private String productName;
    private Integer quantityToProduce;
    private BigDecimal unitValue;
    private BigDecimal totalValue;
}