
import "../css/errorMessage.css"

// se define el contrato con TypeScript para las propiedades (Props)
interface ErrorMessageProps {
  message: string;
  onRetry?: () => void; // Función opcional para el botón de reintentar
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="error-container">
      <h2 className="error-title">Connection Error</h2>
      <p className="error-text">{message}</p>
      
      {/* Si se pasa la función onRetry, se dibuja el botón */}
      {onRetry && (
        <button className="retry-button" onClick={onRetry}>
          Try Again / Reintentar
        </button>
      )}
    </div>
  );
}
