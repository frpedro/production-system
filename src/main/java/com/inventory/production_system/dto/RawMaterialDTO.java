package com.inventory.production_system.dto;
import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RawMaterialDTO {
    private Long id;

    @NotBlank(message = "Name is required")
    private String name;

    @NotNull(message = "Stock quantity is required")
    @Min(value = 0)
    private Integer stockQuantity;
}