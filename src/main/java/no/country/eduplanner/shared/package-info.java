/**
 * Módulo compartido que contiene código reutilizable entre los diferentes módulos de la aplicación.
 * Este es el único módulo que permite interdependencias, actuando como una biblioteca común
 * de utilidades, modelos y servicios compartidos.
 *
 * Las clases en este módulo deben ser agnósticas al dominio específico y enfocarse en
 * funcionalidad transversal que beneficie a múltiples módulos.
 */

@ApplicationModule(type = ApplicationModule.Type.OPEN)
package no.country.eduplanner.shared;

import org.springframework.modulith.ApplicationModule;