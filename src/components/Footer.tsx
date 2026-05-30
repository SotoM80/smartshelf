import "../css/Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        
        
        <div className="footer-info">
          <h4>SmartShelf — Inventory Manager</h4>
          <p>© {currentYear} Created by <strong>Christian Soto Muñoz</strong></p>
          <p style={{ fontSize: '0.75rem', marginTop: '3px' }}>Final Project Evaluation</p>
        </div>

        

      </div>
    </footer>
  );
}

