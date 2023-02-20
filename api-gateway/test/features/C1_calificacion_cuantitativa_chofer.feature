@now
Feature: C1 Calificación cuantitativa de un chofer
      Como pasajero quiero poder realizar una calificación cuantitativa
      de un chofer para así poder brindar mi opinión de este.
  
  Scenario: C1.1 Calificacion de un chofer por un pasajero
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

    When como pasajero 'lazaro' califico al chofer 'mateo' con 3 estrellas
    
    Then la calificacion promedio del chofer 'mateo' es 3.0
  
  Scenario: C1.2 Calificacion de un chofer por dos pasajeros
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

      And Quiero registrarme como pasajero con usuario 'joaquin'
      And quiero registrarme como pasajero con email 'joaquin@joaquin.com'
      And quiero registrarme como pasajero con nombre 'Joaquin'
      And quiero registrarme como pasajero con apellido 'Calvo'
      And quiero registrarme como pasajero con telefono '+54111555555555'
      And quiero registrarme como pasajero con ubicacion preferida 'Gral. Las Heras 2214, Buenos Aires'
      And me registro como pasajero 'joaquin'
    
    When como pasajero 'lazaro' califico al chofer 'mateo' con 3 estrellas
      And como pasajero 'joaquin' califico al chofer 'mateo' con 4 estrellas
    
    Then la calificacion promedio del chofer 'mateo' es 3.5 

  