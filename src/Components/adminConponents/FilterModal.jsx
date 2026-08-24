import { useState } from 'react';
import { FiFilter, FiX, FiChevronDown, FiSearch } from 'react-icons/fi';

export default function FilterModal({
  isOpen,
  onClose,
  selectedStatuses,
  onStatusChange,
  selectedJob,
  setSelectedJob,
  selectedStage,
  setSelectedStage,
  selectedExperience,
  setSelectedExperience,
  selectedSource,
  setSelectedSource,
  candidateData = [],
  onClear,
}) {
  const [openField, setOpenField] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  // Status counts
  const getStatus = (candidate) => {
    if (candidate.status) return candidate.status;
    if (candidate.category === 'qualified') return 'Qualified';
    if (candidate.category === 'rejected') return 'Disqualified';
    if (candidate.stage === 'New Applied') return 'New';
    return 'Overdue';
  };

  const getOptions = (property) => [...new Set(
    candidateData.flatMap((candidate) => {
      const value = candidate[property];
      return Array.isArray(value) ? value : value ? [value] : [];
    })
  )];

  const statusCounts = ['Qualified', 'Disqualified', 'New', 'Overdue'].reduce((counts, status) => {
    counts[status] = candidateData.filter((candidate) => getStatus(candidate) === status).length;
    return counts;
  }, {});

  const optionCounts = (property, option) => candidateData.filter((candidate) => {
    const value = candidate[property];
    return Array.isArray(value) ? value.includes(option) : value === option;
  }).length;

  const jobOptions = getOptions('jobApplied');
  const stageOptions = getOptions('stage');
  const experienceOptions = getOptions('experience');
  const sourceOptions = getOptions('source');

  const fields = [
    { id: 'job', label: 'Jobs', value: selectedJob, placeholder: 'Add job', setValue: setSelectedJob, property: 'jobApplied', options: jobOptions },
    { id: 'stage', label: 'Stage', value: selectedStage, placeholder: 'Add stage', setValue: setSelectedStage, property: 'stage', options: stageOptions },
    { id: 'experience', label: 'Experience', value: selectedExperience, placeholder: 'Add experience', setValue: setSelectedExperience, property: 'experience', options: experienceOptions },
    { id: 'source', label: 'Source', value: selectedSource, placeholder: 'Add source', setValue: setSelectedSource, property: 'source', options: sourceOptions },
  ];

  const toggleField = (fieldId) => {
    setOpenField((current) => (current === fieldId ? null : fieldId));
    setSearchTerm('');
  };

  const handleOptionSelect = (field, option) => {
    field.setValue(option);
    setOpenField(null);
    setSearchTerm('');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="filter-modal" onClick={(e) => e.stopPropagation()}>
        {/* Candidates Status Section */}
        <div className="filter-group">
          <label className="filter-group-title">Candidates Status</label>
          <div className="status-checkboxes">
            {['Qualified', 'Disqualified', 'New', 'Overdue'].map((status) => (
              <label key={status} className="status-checkbox-item">
                <input
                  type="checkbox"
                  checked={selectedStatuses.includes(status)}
                  onChange={() => onStatusChange(status)}
                />
                <span className="status-name">{status}</span>
                <span className="status-count">{statusCounts[status]}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Dropdown Filters */}
        <div className="filter-selects">
          {fields.map((field) => {
            const isOpen = openField === field.id;
            const filteredOptions = field.options.filter((option) => option.toLowerCase().includes(searchTerm.toLowerCase()));

            return (
              <div className={`select-field ${isOpen ? 'is-open' : ''}`} key={field.id}>
                <div className="select-header">
                  <label htmlFor={`${field.id}-filter`}>{field.label}</label>
                  {field.value && (
                    <button type="button" className="clear-icon" aria-label={`Clear ${field.label}`} onClick={() => field.setValue('')}>
                      <FiX />
                    </button>
                  )}
                </div>
                <button type="button" id={`${field.id}-filter`} className="select-trigger" aria-expanded={isOpen} onClick={() => toggleField(field.id)}>
                  <span className={field.value ? 'selected-value' : 'placeholder-value'}>{field.value || field.placeholder}</span>
                  <FiChevronDown className={isOpen ? 'dropdown-arrow rotated' : 'dropdown-arrow'} />
                </button>
                {isOpen && (
                  <div className="filter-dropdown">
                    <div className="filter-dropdown-search">
                      <FiSearch />
                      <input autoFocus type="search" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder={`Search ${field.label.toLowerCase()}`} aria-label={`Search ${field.label.toLowerCase()}`} />
                    </div>
                    <div className="filter-dropdown-options">
                      {filteredOptions.length > 0 ? filteredOptions.map((option) => (
                        <button type="button" className={field.value === option ? 'filter-option active' : 'filter-option'} key={option} onClick={() => handleOptionSelect(field, option)}>
                          <span>{option}</span>
                          <span className="option-count">{optionCounts(field.property, option)}</span>
                        </button>
                      )) : <span className="no-filter-results">No results found</span>}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Modal Actions */}
        <div className="filter-modal-actions">
          <button type="button" className="btn-add-filter" onClick={onClose}>
            <FiFilter /> Add Filter
          </button>
          <button type="button" className="btn-clear-filter" onClick={onClear}>
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}