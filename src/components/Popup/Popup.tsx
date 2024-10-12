import './Popup.css'
interface ConfirmPopupProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
  }
function Popup({ message, onConfirm, onCancel }:ConfirmPopupProps) {
  return (
    <div className="popup-overlay">
    <div className="popup">
      <p>{message}</p>
      <div className="popup-buttons">
        <button onClick={onConfirm} className="popup-confirm">Yes</button>
        <button onClick={onCancel} className="popup-cancel">No</button>
      </div>
    </div>
  </div>
  )
}

export default Popup