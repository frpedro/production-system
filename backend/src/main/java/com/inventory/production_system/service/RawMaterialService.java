package com.inventory.production_system.service;
import com.inventory.production_system.dto.RawMaterialDTO;
import com.inventory.production_system.entity.RawMaterial;
import com.inventory.production_system.repository.RawMaterialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RawMaterialService {

    private final RawMaterialRepository repository;

    @Transactional(readOnly = true)
    public List<RawMaterialDTO> findAll() {
        return repository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public RawMaterialDTO findById(Long id) {
        RawMaterial entity = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Raw material not found with id: " + id));
        return toDTO(entity);
    }

    @Transactional
    public RawMaterialDTO create(RawMaterialDTO dto) {
        RawMaterial entity = toEntity(dto);
        entity = repository.save(entity);
        return toDTO(entity);
    }

    @Transactional
    public RawMaterialDTO update(Long id, RawMaterialDTO dto) {
        RawMaterial entity = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Raw material not found with id: " + id));

        entity.setName(dto.getName());
        entity.setStockQuantity(dto.getStockQuantity());

        entity = repository.save(entity);
        return toDTO(entity);
    }

    @Transactional
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Raw material not found with id: " + id);
        }
        repository.deleteById(id);
    }

    private RawMaterialDTO toDTO(RawMaterial entity) {
        return new RawMaterialDTO(
                entity.getId(),
                entity.getName(),
                entity.getStockQuantity()
        );
    }

    private RawMaterial toEntity(RawMaterialDTO dto) {
        RawMaterial entity = new RawMaterial();
        entity.setName(dto.getName());
        entity.setStockQuantity(dto.getStockQuantity());
        return entity;
    }
}