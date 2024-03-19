import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  currentSection: string | null = null; // Ahora permite valores de string o null
  rol: string = 'Administrador'; // Simula el rol del usuario
  showMenu: boolean = false; // Variable para controlar la visibilidad del menú desplegable

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const sections = document.querySelectorAll('section');

    sections.forEach(sec => {
      const top = window.scrollY;
      const offset = sec.offsetTop - 150;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (top >= offset && top < offset + height) {
        this.currentSection = id || null; // Usamos null si id es null
      }
    });
  }

  // Manejar clic en los enlaces de navegación
  handleClick(id: string | null) {
    this.currentSection = id;
    this.closeMenu(); // Llamar al método closeMenu() al hacer clic en un enlace del menú
  }

  // Método para alternar la visibilidad del menú desplegable
  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  // Método para cerrar el menú desplegable
  closeMenu() {
    this.showMenu = false;
  }
}
