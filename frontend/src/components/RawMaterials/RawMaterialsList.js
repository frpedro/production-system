import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchRawMaterialsAsync,
  createRawMaterialAsync,
  updateRawMaterialAsync,
  deleteRawMaterialAsync,
} from '../../store/slices/rawMaterialsSlice';
import Toast from '../Toast/Toast';
import './RawMaterials.css';

function RawMaterialsList() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.rawMaterials);
  
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    stockQuantity: 0,
  });

  // Toast e Modal states
  const [toast, setToast] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchRawMaterialsAsync());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingId) {
      dispatch(updateRawMaterialAsync({ id: editingId, data: formData }))
        .unwrap()
        .then(() => {
          setToast({ message: 'Matéria-prima atualizada com sucesso!', type: 'success' });
          resetForm();
        })
        .catch(() => {
          setToast({ message: 'Erro ao atualizar matéria-prima.', type: 'error' });
        });
    } else {
      dispatch(createRawMaterialAsync(formData))
        .unwrap()
        .then(() => {
          setToast({ message: 'Matéria-prima criada com sucesso!', type: 'success' });
          resetForm();
        })
        .catch(() => {
          setToast({ message: 'Erro ao criar matéria-prima.', type: 'error' });
        });
    }
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      stockQuantity: item.stockQuantity,
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    if (!itemToDelete) return;
    
    dispatch(deleteRawMaterialAsync(itemToDelete.id))
      .unwrap()
      .then(() => {
        setToast({ message: 'Matéria-prima excluída com sucesso!', type: 'success' });
        setShowConfirm(false);
        setItemToDelete(null);
      })
      .catch((err) => {
        setShowConfirm(false);
        setItemToDelete(null);
        
        const errorMsg = err.message || String(err);
        if (errorMsg.includes('violates foreign key constraint') || errorMsg.includes('referenced')) {
          setToast({ 
            message: 'Você não pode excluir esta matéria-prima, ela já está sendo usada em um produto.', 
            type: 'error' 
          });
        } else {
          setToast({ message: 'Você não pode excluir esta matéria-prima, ela está sendo utilizada em um produto.', type: 'error' });
        }
      });
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setItemToDelete(null);
  };

  const resetForm = () => {
    setFormData({ name: '', stockQuantity: 0 });
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
    <div className="raw-materials">
      <div className="header">
        <h2>Matérias-primas</h2>
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancelar' : 'Adicionar novo'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="form">
          <label>
            Nome da matéria-prima
            <input
              type="text"
              placeholder="Nome"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </label>
          <label>
            Quantidade em estoque
            <input
              type="number"
              placeholder="Quantidade em estoque"
              value={formData.stockQuantity}
              onChange={(e) => setFormData({ ...formData, stockQuantity: parseInt(e.target.value) })}
              required
              min="0"
            />
          </label>
          <button type="submit">{editingId ? 'Atualizar' : 'Criar'}</button>
        </form>
      )}

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Quantidade em estoque</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.stockQuantity}</td>
              <td>
                <button onClick={() => handleEdit(item)}>Editar</button>
                <button onClick={() => handleDeleteClick(item)}>Excluir</button>
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
            <p>Tem certeza que deseja excluir a matéria-prima <strong>{itemToDelete?.name}</strong>?</p>
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

export default RawMaterialsList;