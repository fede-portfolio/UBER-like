Feature: U1 Registro de usuarios

  Scenario: U1.1 Registro exitoso como conductor
    Given No hay usuarios registrados
    When Me registro como pasajero con email "mateo@mateo.com"
    Then Un pasajero con email "mateo@mateo.com" es creado

  Scenario: U1.2 Obtención de ubicación
    Given No hay usuarios registrados
    When Me registro como pasajero con email "mateo@mateo.com" y ubicación preferida "Av. Paseo Colón 850"
    Then La ubicación preferida para el pasajero con email "mateo@mateo.com" es "Av. Paseo Colón 850"

  Scenario: U1.3 Obtenció de perfil para choferes
    Given No hay usuarios registrados
    When Quiero registrarme como chofer con email "mateo@mateo.com"
      And quiero registrar patente del auto "AAA 123"
      And quiero registrar fabricante del auto "Audi"
      And quiero registrar modelo del auto "TT"
      And quiero registrar año de fabricación del auto 2022
      And quiero registrar color del auto "Negro"
      And me registro como chofer
    Then La patente del auto registrado es "AAA 123"
      And el fabricante del auto es "Audi"
      And el modelo del auto es "TT"
      And el año de fabricación del auto es 2022
      And el color del auto es "Negro"
  
  Scenario: U1.5 Registro fallido
    Given No hay usuarios registrados
    And el registro fallara por un error del servicio
    When Quiero registrarme como chofer con email "mateo@mateo.com"
      And me registro como chofer
    Then se devuelve un mensaje de error "Servicio no disponible"

  Scenario: U1.6 Obtención de chofer registrado
    Given No hay usuarios registrados
    When Quiero registrarme como chofer con email "mateo@mateo.com"
      And quiero registrar patente del auto "AAA 123"
      And quiero registrar fabricante del auto "Audi"
      And quiero registrar modelo del auto "TT"
      And quiero registrar año de fabricación del auto 2022
      And quiero registrar color del auto "Negro"
      And me registro como chofer
      And Realizo una busqueda por email con "mateo@mateo.com"
    Then obtengo un chofer con email "mateo@mateo.com"
      And obtengo un chofer con patente del auto "AAA 123"
      And obtengo un chofer con fabricante del auto "Audi"
      And obtengo un chofer con color de auto "Negro"
