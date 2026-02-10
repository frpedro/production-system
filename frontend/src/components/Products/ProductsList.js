import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProductsAsync,
  createProductAsync,
  updateProductAsync,
  deleteProductAsync,
} from '../../store/slices/productsSlice';
import { fetchRawMaterialsAsync } from '../../store/slices/rawMaterialsSlice';
import Toast from '../Toast/Toast';
import './Products.css';

function ProductsList() {
  const dispatch = useDispatch();
  const { items: products, loading } = useSelector((state) => state.products);
  const { items: rawMaterials } = useSelector((state) => state.rawMaterials);
  
  const formatBRL = (v) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v ?? 0);
  const parseBRLToNumber = (s) => {
    if (s === undefined || s === null) return 0;
    let str = String(s).replace(/[^0-9,.-]/g, '').trim();
    if (!str) return 0;
    if (str.indexOf(',') > -1 && str.indexOf('.') > -1) {
      str = str.replace(/\./g, '').replace(',', '.');
    } else if (str.indexOf(',') > -1 && str.indexOf('.') === -1) {
      str = str.replace(',', '.');
    }
    const n = parseFloat(str);
    return Number.isNaN(n) ? 0 : n;
  };
  
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    value: 0,
    rawMaterials: [],
  });
  const [valueInput, setValueInput] = useState(formatBRL(0));
  
  const [selectedRM, setSelectedRM] = useState({
    rawMaterialId: '',
    quantityRequired: 1,
  });

  // Toast e Modal states
  const [toast, setToast] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchProductsAsync());
    dispatch(fetchRawMaterialsAsync());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsed = parseBRLToNumber(valueInput);
    const dataToSend = { ...formData, value: parsed };
    
    if (editingId) {
      dispatch(updateProductAsync({ id: editingId, data: dataToSend }))
        .unwrap()
        .then(() => {
          setToast({ message: 'Produto atualizado com sucesso!', type: 'success' });
          resetForm();
        })
        .catch(() => {
          setToast({ message: 'Erro ao atualizar produto.', type: 'error' });
        });
    } else {
      dispatch(createProductAsync(dataToSend))
        .unwrap()
        .then(() => {
          setToast({ message: 'Produto criado com sucesso!', type: 'success' });
          resetForm();
        })
        .catch(() => {
          setToast({ message: 'Erro ao criar produto.', type: 'error' });
        });
    }
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      value: item.value,
      rawMaterials: item.rawMaterials || [],
    });
    setValueInput(formatBRL(item.value));
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    if (!itemToDelete) return;
    
    dispatch(deleteProductAsync(itemToDelete.id))
      .unwrap()
      .then(() => {
        setToast({ message: 'Produto excluído com sucesso!', type: 'success' });
        setShowConfirm(false);
        setItemToDelete(null);
      })
      .catch(() => {
        setShowConfirm(false);
        setItemToDelete(null);
        setToast({ message: 'Erro ao excluir produto.', type: 'error' });
      });
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setItemToDelete(null);
  };

  const addRawMaterial = () => {
    if (!selectedRM.rawMaterialId) {
      setToast({ message: 'Selecione uma matéria-prima.', type: 'error' });
      return;
    }
    
    const exists = formData.rawMaterials.find(
      rm => rm.rawMaterialId === parseInt(selectedRM.rawMaterialId)
    );
    
    if (exists) {
      setToast({ message: 'Esta matéria-prima já foi adicionada!', type: 'error' });
      return;
    }
    
    const rmName = rawMaterials.find(
      rm => rm.id === parseInt(selectedRM.rawMaterialId)
    )?.name;
    
    setFormData({
      ...formData,
      rawMaterials: [
        ...formData.rawMaterials,
        {
          rawMaterialId: parseInt(selectedRM.rawMaterialId),
          rawMaterialName: rmName,
          quantityRequired: parseInt(selectedRM.quantityRequired),
        },
      ],
    });
    
    setSelectedRM({ rawMaterialId: '', quantityRequired: 1 });
  };

  const removeRawMaterial = (index) => {
    setFormData({
      ...formData,
      rawMaterials: formData.rawMaterials.filter((_, i) => i !== index),
    });
  };

  const resetForm = () => {
    setFormData({ name: '', value: 0, rawMaterials: [] });
    setValueInput(formatBRL(0));
    setEditingId(null);
    setShowForm(false);
  };

  if (loading) return (
    <div className="loading">
      <div className="spinner"></div>
      <p>Carregando...</p>
    </div>
  );

  return (
    <div className="products">
      <div className="header">
        <h2>Produtos</h2>
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancelar' : 'Adicionar novo'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="form">
          <label>
            Nome do produto
            <input
              type="text"
              placeholder="Nome"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </label>
          <label>
            Valor do produto
            <input
              type="text"
              placeholder="R$ 0,00"
              value={valueInput}
              onFocus={() => setValueInput(String(formData.value || ''))}
              onChange={(e) => setValueInput(e.target.value)}
              onBlur={() => {
                const parsed = parseBRLToNumber(valueInput);
                setFormData({ ...formData, value: parsed });
                setValueInput(formatBRL(parsed));
              }}
              required
            />
          </label>
          
          <div className="raw-materials-section">
            <h4>Matérias-primas necessárias</h4>
            <div className="add-rm">
              <div className="add-rm-field">
                <label>Matéria-prima</label>
                <select
                  value={selectedRM.rawMaterialId}
                  onChange={(e) => setSelectedRM({ ...selectedRM, rawMaterialId: e.target.value })}
                >
                  <option value="">Selecione matéria-prima</option>
                  {rawMaterials.map((rm) => (
                    <option key={rm.id} value={rm.id}>{rm.name}</option>
                  ))}
                </select>
              </div>
              <div className="add-rm-field">
                <label>Quantidade</label>
                <input
                  type="number"
                  placeholder="Quantidade"
                  value={selectedRM.quantityRequired}
                  onChange={(e) => setSelectedRM({ ...selectedRM, quantityRequired: e.target.value })}
                  min="1"
                />
              </div>
              <button type="button" onClick={addRawMaterial}>Adicionar</button>
            </div>
            
            <ul className="rm-list">
              {formData.rawMaterials.map((rm, index) => (
                <li key={index}>
                  {rm.rawMaterialName} - Qtd: {rm.quantityRequired}
                  <button type="button" onClick={() => removeRawMaterial(index)}>Remover</button>
                </li>
              ))}
            </ul>
          </div>
          
          <button type="submit">{editingId ? 'Atualizar' : 'Criar'}</button>
        </form>
      )}

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Valor</th>
            <th>Matérias-primas</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{formatBRL(product.value)}</td>
              <td>
                {product.rawMaterials?.map((rm) => (
                  <div key={rm.id}>{rm.rawMaterialName} ({rm.quantityRequired})</div>
                ))}
              </td>
              <td>
                <div className="actions">
                  <button onClick={() => handleEdit(product)}>Editar</button>
                  <button onClick={() => handleDeleteClick(product)}>Excluir</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de Confirmação */}
      {showConfirm && (
        <div className="modal-overlay" onClick={cancelDelete}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Confirmar Exclusão</h3>
            <p>Tem certeza que deseja excluir o produto <strong>{itemToDelete?.name}</strong>?</p>
            <div className="modal-actions">
              <button onClick={cancelDelete} className="btn-cancel">Cancelar</button>
              <button onClick={confirmDelete} className="btn-confirm">Sim, excluir</button>
            </div>
          </div>
        </div>
      )}

      {/* Toast de Notificação */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </div>
  );
}

export default ProductsList;