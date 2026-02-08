package com.inventory.production_system.dto;
import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductRawMaterialDTO {
    private Long id;
    private Long productId;

    @NotNull(message = "Raw material ID is required")
    private Long rawMaterialId;

    private String rawMaterialName;

    @NotNull(message = "Quantity required is required")
    @Min(value = 1)
    private Integer quantityRequired;
}
