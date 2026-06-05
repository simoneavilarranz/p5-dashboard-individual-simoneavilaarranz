# Individual - Dashboard administrativo de empleados

Simone Ávila Arranz - P5 Factoría F5

## Descripción

Este trabajo consistía en la creación de una aplicación web de tipo dashboard de empleados al que acceder a través de un login. Los principales requisitos a tener en cuenta eran los siguientes:

- Permitir el acceso al dashboard a través del login introduciendo un email válido y una contraseña de al menos 8 caracteres y con 1 número.
- Mostrar una galería de empleados obtenidos desde una API externa.
- Permitir el filtrado de empleados mediante la primera letra del nombre.
- Gestionar la sesión de usuario usando localStorage.
- Ser responsive para mobile y desktop.

## Planificación

La planificación del trabajo a realizar fue gestionada a través de Jira. Se crearon las siguientes épicas subdivididas en tareas e historias de usuario:

🟣 **Épica 1: Estructura HTML Semántica**  
🔵 Crear index.html con estructura base  
🔵 Maquetar sección de login con etiquetas semánticas  
🔵 Maquetar layout del dashboard  
🔵 Crear componente tarjeta de empleado reutilizable  
🔵 Maquetar panel de filtro alfabético  

🟣 **Épica 2: Estilos CSS3 Modulares y Responsivos**  
🔵 Crear base.css con variables y reset  
🔵 Crear login.css con estilos del formulario  
🔵 Crear dashboard.css con layout Grid  
🔵 Crear components.css para tarjetas de empleado  
🔵 Añadir media queries responsive  
🔵 Estilizar barra de navegación superior y panel de filtro alfabético  

🟣 **Épica 3: JavaScript Modular por Funcionalidad**  
🔵 Crear validators.js con funciones de validación  
🔵 Crear auth.js para gestión de sesión  
🔵 Implementar lógica de login en app.js  
🔵 Crear api.js para consumo de empleados  
🔵 Implementar filtrado por primera letra del nombre  
🔵 Escribir test unitario con Vitest  
🟢 Acceso al dashboard administrativo  
🟢 Listado de empleados  
🟢 Filtrado de seguridad por la primera letra del nombre  
🟢 Logout del dashboard  
🟢 Validación de credenciales en el formulario del login  

🟣 **Épica 4: Organización del Proyecto en Carpetas y Archivos**  
🔵 Crear carpeta /src en la raíz del proyecto  
🔵 Crear subcarpeta /src/assets para recursos estáticos  
🔵 Crear subcarpeta /src/styles para hojas CSS  
🔵 Crear subcarpeta /src/scripts para archivos JavaScript  
🔵 Ubicar index.html en la raíz del proyecto  
🔵 Verificar que no existen archivos sueltos fuera de la estructura  
🔵 Configurar .gitignore con exclusiones necesarias  

🟣 **Épica 5: Documentación y Gestión del Proyecto**  
🔵 Redactar README  
🔵 Diseño de prototipo y userflow  
🔵 Configurar Jira con épicas e historias de usuario  
🔵 Documentar los commits  


## Prototipo

Los prototipos de las páginas fueron creados inicialmente mediante el uso de Stitch, para, a continuación, configurar los resultados utilizando Figma para obtener un sketch más unitario y fiel al resultado que buscábamos. También se tomó como referencia el moodboard generado por Stitch para dar con un diseño limpio y coherente.

<img src="./src/assets/moodboard-stitch.jpg">
<img src="./src/assets/sketch-dashboard-desktop.jpg">
<img src="./src/assets/sketch-dashboard-mobile.jpg">
<img src="./src/assets/sketch-login-desktop.jpg">
<img src="./src/assets/sketch-login-mobile.jpg">

## Userflow

En base al sketch se creó el userflow definiendo los pasos que seguiría el usuario en caso de utilizar la aplicación, utilizando Figma. El resultado fue el siguiente:  

<img src="./src/assets/userflow.jpg">

## Historias de usuario y criterios de aceptación



## Instalación



## Resultado final