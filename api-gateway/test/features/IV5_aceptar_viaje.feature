Feature: IV5 Aceptar o rechazar viajes
  Como chofer quiero poder aceptar o rechazar
  la realización de un viaje
    
  Scenario: IV5.1 Aceptar un viaje
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
 
    When como usuario 'mateo' solicito los viajes disponibles con offset 0 limit 5
      And como usuario 'mateo' acepto tomar el viaje del usuario 'lazaro'

    Then el estado del viaje del usuario 'lazaro' es 'accepted_by_driver'
      And el chofer asignado en el viaje del usuario 'lazaro' es 'mateo'
      And el nombre del chofer asignado en el viaje del usuario 'lazaro' es 'Mateo'
      And el apellido del chofer asignado en el viaje del usuario 'lazaro' es 'Calvo'
      And la patente del chofer asignado en el viaje del usuario 'lazaro' es 'AAA 123'
      And el fabricande del auto del chofer asignado en el viaje del usuario 'lazaro' es 'Audi'
      And el modelo del auto del chofer asignado en el viaje del usuario 'lazaro' es 'TT'
      And el color del auto del chofer asignado en el viaje del usuario 'lazaro' es 'Negro'
