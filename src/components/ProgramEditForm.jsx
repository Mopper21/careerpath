import React, { useState, useEffect } from 'react';

const ProgramEditForm = ({ program, onSave, onCancel }) => {
  const [updatedProgram, setUpdatedProgram] = useState({});

  useEffect(() => {
    if (program) {
      setUpdatedProgram(program);
    }
  }, [program]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProgram({ ...updatedProgram, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(updatedProgram);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="programName" className="form-label">Program Name</label>
        <input
          type="text"
          id="programName"
          name="programName"
          className="form-control"
          value={updatedProgram.programName || ''}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea
          id="description"
          name="description"
          className="form-control"
          value={updatedProgram.description || ''}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="deadline" className="form-label">Application Deadline</label>
        <input
          type="date"
          id="deadline"
          name="deadline"
          className="form-control"
          value={updatedProgram.deadline || ''}
          onChange={handleChange}
        />
      </div>
      <div className="d-flex justify-content-between">
        <button type="submit" className="btn btn-primary">Save</button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default ProgramEditForm;