Feature: IV7 Inicio del viaje
  Como usuario quiero iniciar un viaje
  tanto sea en condición de pasajero como de chofer

  Scenario: IV7.1 Chofer en destino
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
      And me registro como chofer 'mateo'
      
      And Quiero registrarme como pasajero con usuario 'lazaro'
      And quiero registrarme como pasajero con email 'lazaro@lazaro.com'
      And quiero registrarme como pasajero con nombre 'Lazaro'
      And quiero registrarme como pasajero con apellido 'Calvo'
      And quiero registrarme como pasajero con telefono '+54111555555555'
      And quiero registrarme como pasajero con ubicacion preferida 'Gral. Las Heras 2214, Buenos Aires'
      And me registro como pasajero 'lazaro'
      And como usuario 'lazaro' solicito iniciar un viaje normal hacia 'Av. Paseo Colón 850, Buenos Aires'

      And como usuario 'mateo' solicito los viajes disponibles con offset 0 limit 5 
      And como usuario 'mateo' acepto tomar el viaje del usuario 'lazaro'

    When como usuario 'mateo' actualizo mi ubicacion a 'Av. Paseo Colón 850, Buenos Aires'
      And como usuario 'mateo' indico que estoy en espera para el viaje del usuario 'lazaro'

    Then el estado del viaje del usuario 'lazaro' es 'driver_arrived'
  
  
  Scenario: IV7.2 Viaje iniciado
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
      And me registro como chofer 'mateo'
      
      And Quiero registrarme como pasajero con usuario 'lazaro'
      And quiero registrarme como pasajero con email 'lazaro@lazaro.com'
      And quiero registrarme como pasajero con nombre 'Lazaro'
      And quiero registrarme como pasajero con apellido 'Calvo'
      And quiero registrarme como pasajero con telefono '+54111555555555'
      And quiero registrarme como pasajero con ubicacion preferida 'Gral. Las Heras 2214, Buenos Aires'
      And me registro como pasajero 'lazaro'
      And como usuario 'lazaro' solicito iniciar un viaje normal hacia 'Av. Paseo Colón 850, Buenos Aires'

      And como usuario 'mateo' solicito los viajes disponibles con offset 0 limit 5 
      And como usuario 'mateo' acepto tomar el viaje del usuario 'lazaro'
      And como usuario 'mateo' actualizo mi ubicacion a 'Av. Paseo Colón 850, Buenos Aires'
      And como usuario 'mateo' indico que estoy en espera para el viaje del usuario 'lazaro'
    
    When como usuario 'mateo' inicio el viaje del usuario 'lazaro'

    Then el estado del viaje del usuario 'lazaro' es 'start_confirmed_by_driver'

  Scenario: IV7.3 Viaje finalizado
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
      And me registro como chofer 'mateo'
      
      And Quiero registrarme como pasajero con usuario 'lazaro'
      And quiero registrarme como pasajero con email 'lazaro@lazaro.com'
      And quiero registrarme como pasajero con nombre 'Lazaro'
      And quiero registrarme como pasajero con apellido 'Calvo'
      And quiero registrarme como pasajero con telefono '+54111555555555'
      And quiero registrarme como pasajero con ubicacion preferida 'Gral. Las Heras 2214, Buenos Aires'
      And me registro como pasajero 'lazaro'
      And como usuario 'lazaro' solicito iniciar un viaje normal hacia 'Av. Paseo Colón 850, Buenos Aires'

      And como usuario 'mateo' solicito los viajes disponibles con offset 0 limit 5 
      And como usuario 'mateo' acepto tomar el viaje del usuario 'lazaro'
      And como usuario 'mateo' actualizo mi ubicacion a 'Av. Paseo Colón 850, Buenos Aires'
      And como usuario 'mateo' indico que estoy en espera para el viaje del usuario 'lazaro'
      And como usuario 'mateo' indico que he finalizado el viaje del usuario 'lazaro'
    
    When como usuario 'mateo' inicio el viaje del usuario 'lazaro'

    Then el estado del viaje del usuario 'lazaro' es 'finished_confirmed_by_driver'
