package com.inventory.production_system.dto;
import jakarta.validation.constraints.*;
import lombok.*;
import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {
    private Long id;

    @NotBlank(message = "Name is required")
    private String name;

    @NotNull(message = "Value is required")
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal value;

    private List<ProductRawMaterialDTO> rawMaterials;
}
