Feature: AS1 Modificación de reglas de cotización
      Como administrador del sistema quiero poder tener flexibilidad a la hora de establecer los precios.
      Para esto se exige que el cálculo del precio sea realizado utilizando un sistema de reglas.
  
  Scenario: AS1.1 Obtener coeficientes de reglas
    Given No hay usuarios registrados
      And Me registro como pasajero con nombre de usuario 'mateo'
      And El administrador por defecto registra al usuario con nombre de usuario 'mateo' como administrador
    When como usuario 'mateo' obtengo los coeficientes de cotizacion
    Then el coeficiente 'costo por kilometro' llamado 'c_km' es '1.23'
      And el coeficiente 'modificador viajes en los ultimos 30 minutos' llamado 'c_trips_last_30m' es '2.34'
      And el coeficiente 'modificador rating' llamado 'c_rating' es '3.45'
      And el coeficiente 'precio minimo' llamado 'c_min_price' es '4.56'

  Scenario: AS1.2 Crear regla de cotización
    Given No hay usuarios registrados
      And Me registro como pasajero con nombre de usuario 'mateo'
      And El administrador por defecto registra al usuario con nombre de usuario 'mateo' como administrador

    When quiero utilizar valor '1.11' para el coeficiente 'c_km'
      And quiero utilizar valor '2.22' para el coeficiente 'c_trips_last_30m'
      And quiero utilizar valor '3.33' para el coeficiente 'c_rating'
      And quiero utilizar valor '4.44' para el coeficiente 'c_min_price'
      And creo una regla de cotizacion

    Then el coeficiente 'costo por kilometro' llamado 'c_km' es '1.11'
      And el coeficiente 'modificador viajes en los ultimos 30 minutos' llamado 'c_trips_last_30m' es '2.22'
      And el coeficiente 'modificador rating' llamado 'c_rating' es '3.33'
      And el coeficiente 'precio minimo' llamado 'c_min_price' es '4.44'
  
  Scenario: AS1.3 Actualizar regla de cotización
    Given No hay usuarios registrados
      And Me registro como pasajero con nombre de usuario 'mateo'
      And El administrador por defecto registra al usuario con nombre de usuario 'mateo' como administrador
      And quiero utilizar valor '99.11' para el coeficiente 'c_km'
      And quiero utilizar valor '99.22' para el coeficiente 'c_trips_last_30m'
      And quiero utilizar valor '99.33' para el coeficiente 'c_rating'
      And quiero utilizar valor '99.44' para el coeficiente 'c_min_price'
      And creo una regla de cotizacion

    When quiero utilizar valor '1.11' para el coeficiente 'c_km'
      And quiero utilizar valor '2.22' para el coeficiente 'c_trips_last_30m'
      And quiero utilizar valor '3.33' para el coeficiente 'c_rating'
      And quiero utilizar valor '4.44' para el coeficiente 'c_min_price'
      And modifico la regla de cotizacion

    Then el coeficiente 'costo por kilometro' llamado 'c_km' es '1.11'
      And el coeficiente 'modificador viajes en los ultimos 30 minutos' llamado 'c_trips_last_30m' es '2.22'
      And el coeficiente 'modificador rating' llamado 'c_rating' es '3.33'
      And el coeficiente 'precio minimo' llamado 'c_min_price' es '4.44'

  Scenario: AS1.4 Evaluar regla de cotización
    Given No hay usuarios registrados
      And Me registro como pasajero con nombre de usuario 'mateo'
      And El administrador por defecto registra al usuario con nombre de usuario 'mateo' como administrador

    When quiero utilizar valor '0.1' para el coeficiente 'c_km'
      And quiero utilizar valor '0.1' para el coeficiente 'c_trips_last_30m'
      And quiero utilizar valor '0.1' para el coeficiente 'c_rating'
      And quiero utilizar valor '0.5' para el coeficiente 'c_min_price'
      And creo una regla de cotizacion
      And quiero utilizar valor '2.7' para el parametro 'c_km'
      And quiero utilizar valor '2' para el parametro 'c_trips_last_30m'
      And quiero utilizar valor '3.45' para el parametro 'c_rating'
      And evaluo la regla de cotizacion
    
    Then el precio calculado para la regla de cotizacion es '0.815'
  
  Scenario: AS1.5 Activar regla de cotización
    Given No hay usuarios registrados
      And Me registro como pasajero con nombre de usuario 'juan'
      And El administrador por defecto registra al usuario con nombre de usuario 'juan' como administrador
      And Quiero registrarme como pasajero con usuario 'mateo'
      And quiero registrarme como pasajero con email 'mateo@mateo.com'
      And quiero registrarme como pasajero con nombre 'Mateo'
      And quiero registrarme como pasajero con apellido 'Calvo'
      And quiero registrarme como pasajero con telefono '+54111555555555'
      And quiero registrarme como pasajero con ubicacion preferida 'Av. Paseo Colón 850, Buenos Aires'
      And me registro como pasajero
      And quiero utilizar valor '0.2' para el coeficiente 'c_km'
      And quiero utilizar valor '0.2' para el coeficiente 'c_trips_last_30m'
      And quiero utilizar valor '0.2' para el coeficiente 'c_rating'
      And quiero utilizar valor '0.4' para el coeficiente 'c_min_price'
      And desactivo la regla de cotizacion por defecto
      And creo una regla de cotizacion
      And quiero utilizar valor '5.7' para el parametro 'c_km'
      And quiero utilizar valor '0' para el parametro 'c_trips_last_30m'
      And quiero utilizar valor '3.5' para el parametro 'c_rating'

    When activo la regla de cotizacion
      And solicito cotizar un viaje 'regular' hacia 'Gral. Las Heras 2214, Buenos Aires'
    
    Then el precio calculado para el viaje es '1.8408'
  
  Scenario: AS1.6 Obtener una regla de cotización
    Given No hay usuarios registrados
      And Me registro como pasajero con nombre de usuario 'mateo'
      And El administrador por defecto registra al usuario con nombre de usuario 'mateo' como administrador

    When quiero utilizar valor '1.11' para el coeficiente 'c_km'
      And quiero utilizar valor '2.22' para el coeficiente 'c_trips_last_30m'
      And quiero utilizar valor '3.33' para el coeficiente 'c_rating'
      And quiero utilizar valor '4.44' para el coeficiente 'c_min_price'
      And creo una regla de cotizacion
      And obtengo la regla de cotizacion

    Then el coeficiente 'costo por kilometro' llamado 'c_km' es '1.11'
      And el coeficiente 'modificador viajes en los ultimos 30 minutos' llamado 'c_trips_last_30m' es '2.22'
      And el coeficiente 'modificador rating' llamado 'c_rating' es '3.33'
      And el coeficiente 'precio minimo' llamado 'c_min_price' es '4.44'
