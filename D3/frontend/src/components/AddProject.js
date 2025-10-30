// Amadeus Fidos u22526162
import React, { useState } from "react";
import "../styles/addProject.css";

export default function AddProject({ isOpen, onClose, onAddProject }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    version: "1.0.0"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim() && formData.description.trim()) {
      onAddProject(formData);
      setFormData({ name: "", description: "", version: "1.0.0" });
      onClose();
    }
  };

  const handleClose = () => {
    setFormData({ name: "", description: "", version: "1.0.0" });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-root">
      <div 
        onClick={handleClose}
        className="modal-overlay"
      />
      
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">Add New Project</h2>
          <button
            onClick={handleClose}
            aria-label="Close modal"
            className="modal-close-btn"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div>
            <label htmlFor="name" className="modal-label">
              Project Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="modal-input"
              placeholder="Enter project name"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="modal-label">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="modal-textarea"
              placeholder="Describe your project"
              required
            />
          </div>

          <div>
            <label htmlFor="version" className="modal-label">
              Initial Version
            </label>
            <input
              type="text"
              id="version"
              name="version"
              value={formData.version}
              onChange={handleInputChange}
              className="modal-input"
              placeholder="1.0.0"
            />
          </div>

          <div className="modal-actions">
            <button
              type="button"
              onClick={handleClose}
              className="btn-cancel-modal"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary-modal"
            >
              Add Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
