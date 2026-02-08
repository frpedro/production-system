package com.inventory.production_system.controller;
import com.inventory.production_system.dto.ProductionSuggestionDTO;
import com.inventory.production_system.service.ProductionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/production")
@RequiredArgsConstructor
public class ProductionController {

    private final ProductionService service;

    @GetMapping("/suggestions")
    public ResponseEntity<ProductionSuggestionDTO> getProductionSuggestions() {
        return ResponseEntity.ok(service.suggestProduction());
    }
}