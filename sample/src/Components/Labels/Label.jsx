import React, { useState, useEffect } from 'react';
import { X, Check, Tag, Pencil } from 'lucide-react';
import './Label.scss';

const Label = ({ onClose, onSave, existingLabels }) => {
  const [labels, setLabels] = useState(existingLabels || []);
  const [newLabel, setNewLabel] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingLabel, setEditingLabel] = useState(null);

  useEffect(() => {
    setLabels(existingLabels || []);
  }, [existingLabels]);

  const handleCreateLabel = () => {
    if (newLabel.trim()) {
      const updatedLabels = [...labels, { id: Date.now().toString(), name: newLabel }];
      setLabels(updatedLabels);
      setNewLabel('');
      setIsEditing(false);
      onSave(updatedLabels);
    }
  };

  const handleUpdateLabel = (id, newName) => {
    const updatedLabels = labels.map(label => 
      label.id === id ? { ...label, name: newName } : label
    );
    setLabels(updatedLabels);
    setEditingLabel(null);
    onSave(updatedLabels);
  };

  const handleDeleteLabel = (id) => {
    const updatedLabels = labels.filter(label => label.id !== id);
    setLabels(updatedLabels);
    onSave(updatedLabels);
  };

  const handleKeyPress = (e, action) => {
    if (e.key === 'Enter') {
      action();
    }
  };

  return (
    <div className="label-modal-overlay">
      <div className="label-modal">
        <h2 className="label-modal__title">Edit labels</h2>
        
        <div className="label-modal__create">
          <X 
            size={20} 
            className="label-modal__icon" 
            onClick={() => {
              setNewLabel('');
              setIsEditing(false);
            }}
          />
          <input
            type="text"
            placeholder="Create new label"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            onFocus={() => setIsEditing(true)}
            onKeyPress={(e) => handleKeyPress(e, handleCreateLabel)}
            className="label-modal__input"
          />
          {isEditing && newLabel && (
            <Check 
              size={20} 
              className="label-modal__icon label-modal__icon--active" 
              onClick={handleCreateLabel}
            />
          )}
        </div>

        <div className="label-modal__list">
          {labels.map(label => (
            <div key={label.id} className="label-modal__item">
              {editingLabel === label.id ? (
                <>
                  <X 
                    size={20} 
                    className="label-modal__icon" 
                    onClick={() => setEditingLabel(null)}
                  />
                  <input
                    type="text"
                    value={label.name}
                    onChange={(e) => handleUpdateLabel(label.id, e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, () => handleUpdateLabel(label.id, label.name))}
                    className="label-modal__input"
                    autoFocus
                  />
                  <Check 
                    size={20} 
                    className="label-modal__icon label-modal__icon--active" 
                    onClick={() => handleUpdateLabel(label.id, label.name)}
                  />
                </>
              ) : (
                <>
                  <Tag size={20} className="label-modal__icon" />
                  <span className="label-modal__text">{label.name}</span>
                  <Pencil 
                    size={20} 
                    className="label-modal__icon label-modal__icon--edit" 
                    onClick={() => setEditingLabel(label.id)}
                  />
                  <X
                    size={20}
                    className="label-modal__icon label-modal__icon--delete"
                    onClick={() => handleDeleteLabel(label.id)}
                  />
                </>
              )}
            </div>
          ))}
        </div>

        <button className="label-modal__done" onClick={onClose}>
          Done
        </button>
      </div>
    </div>
  );
};

export default Label;

