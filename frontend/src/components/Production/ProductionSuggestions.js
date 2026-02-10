import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductionSuggestionsAsync } from '../../store/slices/productionSlice';
import './Production.css';

function ProductionSuggestions() {
  const dispatch = useDispatch();
  const { suggestions, loading } = useSelector((state) => state.production);

  const formatBRL = (v) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v ?? 0);

  useEffect(() => {
    dispatch(fetchProductionSuggestionsAsync());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchProductionSuggestionsAsync());
  };

  if (loading) return (
  <div className="loading">
    <div className="spinner"></div>
    <p>Carregando...</p>
  </div>
  );

  return (
    <div className="production">
      <div className="header">
        <h2>Sugestões de Produção</h2>
        <button onClick={handleRefresh}>Atualizar</button>
      </div>

      {suggestions && (
        <>
          <div className="production-total-highlight">
            Valor total de produção: {formatBRL(suggestions.totalValue)}
          </div>

          {suggestions.suggestedProduction?.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Quantidade a produzir</th>
                  <th>Valor unitário</th>
                  <th>Valor total</th>
                </tr>
              </thead>
              <tbody>
                {suggestions.suggestedProduction.map((item) => (
                  <tr key={item.productId}>
                    <td>{item.productName}</td>
                    <td>{item.quantityToProduce}</td>
                    <td>{formatBRL(item.unitValue)}</td>
                    <td>{formatBRL(item.totalValue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-data">
              <p>Nenhum produto pode ser produzido com o estoque atual.</p>
              <p>Por favor, adicione mais matérias-primas ao estoque.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ProductionSuggestions;