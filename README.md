

## **Educplanner - Descripción del Proyecto**

### **Visión General**
Educplanner es una plataforma diseñada para gestionar de manera eficiente los horarios y eventos escolares, facilitando la administración y consulta de la programación de los estudiantes. Permite a los administradores gestionar cursos, horarios, eventos y estudiantes, mientras que los estudiantes pueden consultar su horario, eventos relevantes y mantener su perfil actualizado.

### **Roles y Funcionalidades Clave**

#### **Estudiante**
1. **Registro e Ingreso:**
   - Los estudiantes reciben una invitación por correo electrónico con una contraseña generada por el administrador para el primer acceso.
   - Tras el primer ingreso, pueden cambiar su contraseña y usarla para futuros inicios de sesión.

2. **Interfaz Estudiantil:**
   - Visualización del horario semanal con las materias asignadas.
   - Calendario mensual que muestra los eventos importantes, como exámenes y trabajos prácticos.
   - Al hacer clic en un evento, se abre un modal con los detalles del evento.
   - Acceso a la lista de eventos actualizados.
   - Acceso a la sección de perfil del estudiante, donde pueden actualizar datos básicos y cambiar su contraseña.

#### **Administrador**
1. **Acceso y Panel de Administración:**
   - El administrador inicia sesión con sus credenciales y accede a un panel con botones representando los cursos disponibles.
   - Elige un curso para gestionar y acceder a las funcionalidades correspondientes.

2. **Funcionalidades de Gestión (por orden de uso):**
   - **Gestión de Notificaciones y Eventos:** CRUD (Crear, Leer, Actualizar, Eliminar) de eventos escolares (exámenes, trabajos prácticos) y gestión de notificaciones para mantener informados a los estudiantes.
   - **Gestión de Materias:** Asignación de materias a los cursos y administración de los profesores asignados a cada materia.
   - **Gestión de Horarios:** Administración del horario de clases para los cursos, asignando materias a los días y horas correspondientes.
   - **Gestión de Estudiantes:** Administración de los estudiantes del curso, permitiendo agregar, editar o eliminar correos electrónicos y gestionar su asignación al curso.

3. **Perfil y Logout:**
   - El administrador tiene acceso a su perfil y puede cerrar sesión desde el panel de administración.

### **Flujo de Trabajo:**

1. **Creación de la Base de Datos de Estudiantes:**
   - El administrador registra a los estudiantes mediante sus correos electrónicos.
   - El sistema asigna automáticamente los estudiantes a un curso correspondiente.
   - Una vez registrados, el sistema envía a cada estudiante una invitación con una contraseña generada para el primer acceso.

2. **Acceso Inicial del Estudiante:**
   - El estudiante recibe la invitación por correo con la contraseña para el primer ingreso.
   - Inicia sesión usando su correo y la contraseña temporal.
   - El estudiante puede cambiar su contraseña y actualizar sus datos básicos al ingresar por primera vez.
   - El sistema asigna al estudiante al curso correspondiente basado en la base de datos de estudiantes del administrador.

3. **Acceso del Administrador:**
   - El administrador inicia sesión con sus credenciales.
   - Al ingresar, accede a un panel de administración con botones representando los cursos disponibles.
   - El administrador selecciona un curso para gestionarlo y realizar las siguientes acciones:  
     - Gestión de notificaciones y eventos: CRUD de eventos y notificaciones.
     - Gestión de materias y horarios: Asignación de materias y profesores, creación de horarios para el curso.
     - Gestión de estudiantes: Creación, edición y eliminación de estudiantes en el curso.
  
4. **Interacción con el Calendario (Estudiante):**
   - Los estudiantes pueden visualizar el calendario de eventos importantes, como exámenes o tareas.
   - Al hacer clic en un evento, se abre un modal con todos los detalles del evento (fecha, hora, descripción, etc.).

5. **Actualización y Gestión de Perfil (Estudiante):**
   - El estudiante tiene acceso a su perfil donde puede actualizar sus datos personales y cambiar su contraseña.
  
6. **Cierre de Sesión:**
   - Tanto el administrador como el estudiante tienen la opción de cerrar sesión cuando terminan de interactuar con la plataforma.

---

### **Tecnologías Utilizadas**
- **Frontend:** React.js (Interfaz de usuario dinámica y responsive), librerías de calendario, estilos CSS/SCSS.
- **Backend:** Java con Spring Boot para la API RESTful, PostgreSQL para la base de datos, JWT para la autenticación.

### **Visión Futura**
- **Eventos Recurrentes:** Implementación de eventos repetitivos.
- **Notificaciones Push:** Adición de notificaciones push para eventos y actualizaciones.
- **Interacción con el Calendario:** Posibilidad de permitir a los estudiantes interactuar y editar eventos dentro del calendario.
- **Gestión Multi-Curso:** Posibilidad de gestionar varios cursos al mismo tiempo.
- **Mejoras de Seguridad:** Autenticación avanzada como autenticación de dos factores.

---

