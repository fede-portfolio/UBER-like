Feature: IV3 Cotización del viaje
  Como pasajero quiero poder saber previamente cual es el precio estimado del viaje a realizar,
  sabiendo el destino seleccionado y la modalidad de viaje.

  Scenario: IV3.1 Cotización de un viaje
    Given Quiero registrarme como pasajero con usuario 'mateo'
      And quiero registrarme como pasajero con email 'mateo@mateo.com'
      And quiero registrarme como pasajero con nombre 'Mateo'
      And quiero registrarme como pasajero con apellido 'Calvo'
      And quiero registrarme como pasajero con telefono '+54111555555555'
      And quiero registrarme como pasajero con ubicacion preferida 'Av. Paseo Colón 850, Buenos Aires'
      And me registro como pasajero
    When solicito cotizar un viaje 'regular' hacia 'Gral. Las Heras 2214, Buenos Aires'
    Then se devuelve el precio para el viaje
      And se devuelve como nombre de origen 'Av. Paseo Colón 850, Buenos Aires'
      And se devuelve como latitud de origen aproximadamente -34.6174679
      And se devuelve como longitud de origen aproximadamente -58.36779029999999
      And se devuelve como nombre de destino 'Gral. Las Heras 2214, Buenos Aires'
      And se devuelve como latitud de destino aproximadamente -34.5885498
      And se devuelve como longitud de destino aproximadamente -58.3962364
      And se devuelve un tiempo estimado
      And se devuelve una distancia
