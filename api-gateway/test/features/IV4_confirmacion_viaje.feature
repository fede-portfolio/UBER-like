Feature: IV4 Confirmación de viaje
  Como pasajero quiero poder confirmar la realización del viaje
  
  Scenario: IV4.1 Confirmación del viaje
    Given Quiero registrarme como pasajero con usuario 'mateo'
      And quiero registrarme como pasajero con email 'mateo@mateo.com'
      And quiero registrarme como pasajero con nombre 'Mateo'
      And quiero registrarme como pasajero con apellido 'Calvo'
      And quiero registrarme como pasajero con telefono '+54111555555555'
      And quiero registrarme como pasajero con ubicacion preferida 'Av. Paseo Colón 850, Buenos Aires'
      And me registro como pasajero
    When solicito iniciar un viaje normal hacia 'Gral. Las Heras 2214, Buenos Aires'
    Then se inicia la solicitud de búsqueda de chofer para iniciar el viaje desde 'Av. Paseo Colón 850, Buenos Aires' hasta 'Gral. Las Heras 2214, Buenos Aires'
  
  Scenario: IV4.2 Obtener viajes disponibles
    Given No hay usuarios registrados
      And Quiero registrarme como pasajero con usuario 'lazaro'
      And quiero registrarme como pasajero con email 'lazaro@lazaro.com'
      And quiero registrarme como pasajero con nombre 'Lazaro'
      And quiero registrarme como pasajero con apellido 'Calvo'
      And quiero registrarme como pasajero con telefono '+54111555555555'
      And quiero registrarme como pasajero con ubicacion preferida 'Gral. Las Heras 2214, Buenos Aires'
      And me registro como pasajero 'lazaro'
      And como usuario 'lazaro' solicito iniciar un viaje normal hacia 'Av. Paseo Colón 850, Buenos Aires'
    
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
    
    When como usuario 'mateo' solicito los viajes disponibles con offset 0 limit 5
    
    Then obtengo 1 viajes disponibles para 'mateo'
      And la direccion de origen del viaje es 'Gral. Las Heras 2214, Buenos Aires'
      And la direccion de destino del viaje es 'Av. Paseo Colón 850, Buenos Aires'
      And el tipo de viaje es 'regular'
      And el usuario que solicito el viaje es 'lazaro'
      And obtengo un monto a cobrar
      And obtengo el tiempo estimado
