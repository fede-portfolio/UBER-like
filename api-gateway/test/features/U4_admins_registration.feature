Feature: U4 Registro de administradores
  Como administrador quiero poder dar de alta a otros administradores
  en la plataforma para acceder a las funcionalidades del sistema.

  Scenario: U4.1 Registro exitoso de administrador
    Given No hay usuarios registrados
      And Me registro como pasajero con nombre de usuario "mateo"
    When El administrador por defecto registra al usuario con nombre de usuario "mateo" como administrador
    Then Existe un administrador con nombre de usuario "mateo"

  Scenario: U4.2 Registro fallido de administrador falta nombre de usuario
    When El administrador por defecto registra un administrador sin nombre de usuario
    Then El sistema indicará que falta el nombre de usuario con mensaje "Error: Missing username"
      And el sistema no permitirá el registro

  Scenario: U4.3 Registro fallido de administrador error de servicio
    Given No hay usuarios registrados
      And Me registro como pasajero con nombre de usuario "mateo"
      And El registro de administrador fallará por un error de servicio
    When El administrador por defecto registra al usuario con nombre de usuario "mateo" como administrador
    Then se devuelve un mensaje de error "Servicio no disponible"
