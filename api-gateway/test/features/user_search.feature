Feature: Busqueda de usuarios

  Scenario: Busqueda por email
    Given No hay usuarios registrados
      And Me registro como pasajero con email "mateoicalvo@mateo.com"
    When Realizo una busqueda por email con "mateoicalvo@mateo.com"
    Then Obtengo un pasajero con email "mateoicalvo@mateo.com"

  Scenario: Busqueda por email devuelve unico resultado
    Given Me registro como pasajero con email "mateo@calvo.com" y usuario "mateo"
      And Me registro como pasajero con email "mateo2@calvo.com" y usuario "mateo2"
    When Realizo una busqueda por email con "mateo@calvo.com"
    Then Obtengo un pasajero con email "mateo@calvo.com"
      And No obtengo un pasajero con email "mateo2@calvo.com"

  Scenario: Busqueda por username
    Given No hay usuarios registrados
      And Me registro como pasajero con email "mateo@calvo.com" y usuario "mateo"
      And Me registro como pasajero con email "mateo@otroapellido.com" y usuario "mateo_37"
    When Realizo una busqueda por username con "mateo"
    Then Obtengo 2 pasajeros cuyo username incluye "mateo"
