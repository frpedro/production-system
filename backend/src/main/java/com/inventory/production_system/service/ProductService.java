package com.inventory.production_system.service;
import com.inventory.production_system.dto.ProductDTO;
import com.inventory.production_system.dto.ProductRawMaterialDTO;
import com.inventory.production_system.entity.Product;
import com.inventory.production_system.entity.ProductRawMaterial;
import com.inventory.production_system.entity.RawMaterial;
import com.inventory.production_system.repository.ProductRepository;
import com.inventory.production_system.repository.ProductRawMaterialRepository;
import com.inventory.production_system.repository.RawMaterialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final RawMaterialRepository rawMaterialRepository;
    private final ProductRawMaterialRepository productRawMaterialRepository;

    @Transactional(readOnly = true)
    public List<ProductDTO> findAll() {
        return productRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ProductDTO findById(Long id) {
        Product entity = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        return toDTO(entity);
    }

    @Transactional
    public ProductDTO create(ProductDTO dto) {
        Product entity = new Product();
        entity.setName(dto.getName());
        entity.setValue(dto.getValue());

        entity = productRepository.save(entity);

        // Salvar matérias-primas associadas
        if (dto.getRawMaterials() != null && !dto.getRawMaterials().isEmpty()) {
            for (ProductRawMaterialDTO rmDTO : dto.getRawMaterials()) {
                addRawMaterialToProduct(entity.getId(), rmDTO);
            }
        }

        return findById(entity.getId());
    }

    @Transactional
    public ProductDTO update(Long id, ProductDTO dto) {
        Product entity = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

        entity.setName(dto.getName());
        entity.setValue(dto.getValue());

        productRepository.save(entity);

        // Atualizar matérias-primas
        productRawMaterialRepository.deleteByProductId(id);

        if (dto.getRawMaterials() != null && !dto.getRawMaterials().isEmpty()) {
            for (ProductRawMaterialDTO rmDTO : dto.getRawMaterials()) {
                addRawMaterialToProduct(id, rmDTO);
            }
        }

        return findById(id);
    }

    @Transactional
    public void delete(Long id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Product not found with id: " + id);
        }
        productRepository.deleteById(id);
    }

    @Transactional
    public void addRawMaterialToProduct(Long productId, ProductRawMaterialDTO dto) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        RawMaterial rawMaterial = rawMaterialRepository.findById(dto.getRawMaterialId())
                .orElseThrow(() -> new RuntimeException("Raw material not found"));

        ProductRawMaterial prm = new ProductRawMaterial();
        prm.setProduct(product);
        prm.setRawMaterial(rawMaterial);
        prm.setQuantityRequired(dto.getQuantityRequired());

        productRawMaterialRepository.save(prm);
    }

    private ProductDTO toDTO(Product entity) {
        ProductDTO dto = new ProductDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setValue(entity.getValue());

        List<ProductRawMaterialDTO> rawMaterials = productRawMaterialRepository
                .findByProductId(entity.getId()).stream()
                .map(prm -> new ProductRawMaterialDTO(
                        prm.getId(),
                        prm.getProduct().getId(),
                        prm.getRawMaterial().getId(),
                        prm.getRawMaterial().getName(),
                        prm.getQuantityRequired()
                ))
                .collect(Collectors.toList());

        dto.setRawMaterials(rawMaterials);
        return dto;
    }
}