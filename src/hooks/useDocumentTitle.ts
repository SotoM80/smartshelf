
import { useEffect } from "react";

export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = `SmartShelf | ${title}`;
  }, [title]); // Se ejecuta cada vez que el título cambia
}
