import { useNavigate } from 'react-router-dom';
import './logoutConfirmModal.css';

function LogoutConfirmModal({ isOpen, onClose, onConfirm }) {
  const navigate = useNavigate();

  const handleConfirmLogout = () => {
    if (onConfirm) {
      onConfirm();
      return;
    }

    sessionStorage.removeItem('hrme_currentUser');
    navigate('/login');
  };

  if (!isOpen) return null;

  return (
    <div className="logout-modal-overlay" onClick={onClose}>
      <div
        className="logout-confirmation-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-confirmation-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="logout-confirmation-title" className="logout-confirmation-title">
          Are you sure you want to log out?
        </h2>

        <div className="logout-confirmation-actions">
          <button
            type="button"
            className="logout-confirmation-cancel"
            onClick={onClose}
          >
            CANCEL
          </button>
          <button
            type="button"
            className="logout-confirmation-confirm"
            onClick={handleConfirmLogout}
          >
            LOG OUT
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutConfirmModal;
