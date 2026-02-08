package com.inventory.production_system.dto;
import lombok.*;
import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductionSuggestionDTO {
    private List<ProductionItemDTO> suggestedProduction;
    private BigDecimal totalValue;
}
