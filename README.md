
# **EduPlanner MVP**

## **1. Objetivo Principal**  
EduPlanner es una plataforma para facilitar la gestión y visualización de horarios y eventos escolares. 
Su MVP se enfoca en brindar funcionalidades clave para coordinadores y estudiantes de manera eficiente y simple.

---

## **2. Funcionalidades Clave del MVP**  

### **A. Rol del Coordinador EduPlanner**  
1. **Gestión de Horarios:**  
   - Carga inicial de horarios.  
   - Modificación de horarios existentes.  
   - Asignación automática de colores a materias.  
   - Registro de profesores y su asignación a materias.  

2. **Gestión de Eventos Escolares:**  
   - Creación y edición de eventos escolares.  
   - Registro de fechas clave (exámenes, feriados).  
   - Actualización del calendario institucional.  

3. **Registro de Cambios:**  
   - Cada modificación (horarios, eventos, asignaciones) se registra en el sistema y se refleja en el feed de actualizaciones.

---

### **B. Módulo Administrativo**  
1. **Panel de Gestión:**  
   - Carga inicial y actualizaciones dinámicas de horarios.  
   - CRUD para eventos escolares.  
   - Vista de calendario mensual con eventos destacados.  

2. **Feed de Actualizaciones:**  
   - Muestra cambios recientes (horarios, eventos, asignaciones).  
   - Actualización manual mediante botón "ACTUALIZAR".  

---

### **C. Acceso de Estudiantes**  
1. **Autenticación:**  
   - Registro y login seguros.  
   - Gestión básica de perfil.  

2. **Dashboard Principal:**  
   - Visualización clara del horario semanal con diferenciación por colores.  
   - Calendario mensual para eventos especiales.  
   - Feed de actualizaciones recientes.  

---

### **D. Funcionalidades Técnicas**  
1. **Horario Semanal:**  
   - Vista clara del horario actual con colores predefinidos por materia.  
   - Información adicional: profesor asignado a cada materia.  
   - Actualización manual del horario mediante botón.  

2. **Calendario Escolar:**  
   - Vista mensual de eventos escolares (exámenes, días festivos, actividades).  
   - Diferenciación clara entre eventos y horarios regulares.  

3. **Sistema de Actualizaciones:**  
   - Botón "ACTUALIZAR" que sincroniza cambios manualmente.  
   - Feed de cambios recientes (horarios, eventos, asignaciones).  
   - Indicador de última actualización realizada.  

4. **Diferenciación Visual:**  
   - Paleta de colores predefinida (8-10 colores).  
   - Asignación automática de colores a materias.  

---

## **3. Aspectos Técnicos del Desarrollo**  

### **A. Backend:**  
- API RESTful para operaciones CRUD.  
- Gestión de autenticación y seguridad.  
- Procesamiento de cambios en horarios y eventos.  

### **B. Frontend:**  
- Interfaz responsive y fácil de usar.  
- Componentes reutilizables (horarios, feed, calendario).  
- Implementación de librerías para calendario y visualización.  

### **C. Base de Datos:**  
- Diseño optimizado para horarios, eventos y usuarios.  
- Relaciones claras entre materias, profesores y horarios.  
- Sistema de registro de cambios para mantener actualizaciones consistentes.  

---

## **4. Criterios de Calidad del MVP**  
1. **Rendimiento:** Tiempos de respuesta rápidos.  
2. **Interfaz:** Intuitiva, clara y consistente visualmente.  
3. **Actualizaciones:** Sincronización confiable mediante el botón "ACTUALIZAR".  
4. **Seguridad:** Gestión segura de datos y autenticación.  
5. **Estabilidad:** Sin errores críticos en funcionalidades principales.  

---
