Feature: Registracion com ambos perfiles
  Como usuario quiero poder registrarme
  tanto sea en condición de pasajero como de chofer
  para usar la aplicacion
  @now
  Scenario: 1 Registrarse como chofer y pasajero
    Given No hay usuarios registrados
      And Quiero registrarme como chofer con usuario 'mateo'
      And quiero registrarme como chofer con email 'mateo@mateo.com'
      And quiero registrarme como chofer con nombre 'Mateo'
      And quiero registrarme como chofer con apellido 'Calvo'
      And quiero registrarme como chofer con telefono '+54111555555555'
      And quiero registrarme como chofer con ubicacion preferida 'Av. Paseo Colón 850, Buenos Aires'
      And quiero registrar patente del auto "AAA 123"
      And quiero registrar fabricante del auto "Audi"
      And quiero registrar modelo del auto "TT"
      And quiero registrar año de fabricación del auto 2022
      And quiero registrar color del auto "Negro"
      
    When me registro como chofer 'mateo'

    Then el usuario 'mateo' tiene tanto datos de chofer como de pasajero
