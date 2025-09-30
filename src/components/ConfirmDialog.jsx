/* eslint-disable react/prop-types */
export default function ConfirmDialog({ isOpen, onConfirm, onCancel, message, title }) {
  if (!isOpen) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <h3>{title || "Bekræft handling"}</h3>
        <p>{message}</p>
        <div className="dialog-buttons">
          <button onClick={onCancel} className="btn-outline">
            Annuller
          </button>
          <button onClick={onConfirm} className="btn-delete">
            Slet
          </button>
        </div>
      </div>
    </div>
  );
}