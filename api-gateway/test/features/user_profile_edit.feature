Feature: P1 Edicion de perfil
  Como usuario quiero poder editar los datos de mi perfil de usuario
  para mantener actualizada mi información personal.

  Scenario: P1.1 Edición de nombre exitosa para pasajero
    Given No hay usuarios registrados
    When Quiero registrarme como pasajero con usuario 'mateo'
      And quiero registrarme como pasajero con email 'mateo@mateo.com'
      And quiero registrarme como pasajero con nombre 'mATEO'
      And quiero registrarme como pasajero con apellido 'Calvo'
      And quiero registrarme como pasajero con telefono '+54111555555555'
      And quiero registrarme como pasajero con ubicacion preferida 'Av. Paseo Colón 850'
      And me registro como pasajero
      And como pasajero con email 'mateo@mateo.com' cambio mi nombre a 'Mateo'
    Then El nombre del pasajero con email 'mateo@mateo.com' cambio a 'Mateo'

  Scenario: P1.2 Edición de apellido exitosa para pasajero
    Given No hay usuarios registrados
    When Quiero registrarme como pasajero con usuario 'mateo'
      And quiero registrarme como pasajero con email 'mateo@mateo.com'
      And quiero registrarme como pasajero con nombre 'Mateo'
      And quiero registrarme como pasajero con apellido 'cALVO'
      And quiero registrarme como pasajero con telefono '+54111555555555'
      And quiero registrarme como pasajero con ubicacion preferida 'Av. Paseo Colón 850'
      And me registro como pasajero
      And como pasajero con email 'mateo@mateo.com' cambio mi apellido a 'Calvo'
    Then El apellido del pasajero con email 'mateo@mateo.com' cambio a 'Calvo'

  Scenario: P1.3 Edición de telefono exitosa para pasajero
    Given No hay usuarios registrados
    When Quiero registrarme como pasajero con usuario 'mateo'
      And quiero registrarme como pasajero con email 'mateo@mateo.com'
      And quiero registrarme como pasajero con nombre 'Mateo'
      And quiero registrarme como pasajero con apellido 'Calvo'
      And quiero registrarme como pasajero con telefono '+54111555555555'
      And quiero registrarme como pasajero con ubicacion preferida 'Av. Paseo Colón 850'
      And me registro como pasajero
      And como pasajero con email 'mateo@mateo.com' cambio mi telefono a '+54111522222222'
    Then El telefono del pasajero con email 'mateo@mateo.com' cambio a '+54111522222222'

  Scenario: P1.5 Edición de ubicacion preferida exitosa para pasajero
    Given No hay usuarios registrados
    When Quiero registrarme como pasajero con usuario 'mateo'
      And quiero registrarme como pasajero con email 'mateo@mateo.com'
      And quiero registrarme como pasajero con nombre 'Mateo'
      And quiero registrarme como pasajero con apellido 'Calvo'
      And quiero registrarme como pasajero con telefono '+54111555555555'
      And quiero registrarme como pasajero con ubicacion preferida 'Av. Paseo Colón 850'
      And me registro como pasajero
      And como pasajero con email 'mateo@mateo.com' cambio mi ubicacion preferida a 'Av. Las Heras 2214'
    Then La ubicacion preferida del pasajero con email 'mateo@mateo.com' cambio a 'Av. Las Heras 2214'

  Scenario: P1.6 Edición de nombre exitosa para chofer
    Given No hay usuarios registrados
    When Quiero registrarme como chofer con usuario 'mateo'
      And quiero registrarme como chofer con email 'mateo@mateo.com'
      And quiero registrarme como chofer con nombre 'mATEO'
      And quiero registrarme como chofer con apellido 'Calvo'
      And quiero registrarme como chofer con telefono '+54111555555555'
      And quiero registrarme como chofer con ubicacion preferida 'Av. Paseo Colón 850'
      And quiero registrar patente del auto "AAA 123"
      And quiero registrar fabricante del auto "Audi"
      And quiero registrar modelo del auto "TT"
      And quiero registrar año de fabricación del auto 2022
      And quiero registrar color del auto "Negro"
      And me registro como chofer
      And como chofer con email 'mateo@mateo.com' cambio mi nombre a 'Mateo'
    Then El nombre del chofer con email 'mateo@mateo.com' cambio a 'Mateo'

  Scenario: P1.7 Edición de apellido exitosa para chofer
    Given No hay usuarios registrados
    When Quiero registrarme como chofer con usuario 'mateo'
      And quiero registrarme como chofer con email 'mateo@mateo.com'
      And quiero registrarme como chofer con nombre 'Mateo'
      And quiero registrarme como chofer con apellido 'cALVO'
      And quiero registrarme como chofer con telefono '+54111555555555'
      And quiero registrarme como chofer con ubicacion preferida 'Av. Paseo Colón 850'
      And quiero registrar patente del auto "AAA 123"
      And quiero registrar fabricante del auto "Audi"
      And quiero registrar modelo del auto "TT"
      And quiero registrar año de fabricación del auto 2022
      And quiero registrar color del auto "Negro"
      And me registro como chofer
      And como chofer con email 'mateo@mateo.com' cambio mi apellido a 'Calvo'
    Then El apellido del chofer con email 'mateo@mateo.com' cambio a 'Calvo'

  Scenario: P1.8 Edición de telefono exitosa para chofer
    Given No hay usuarios registrados
    When Quiero registrarme como chofer con usuario 'mateo'
      And quiero registrarme como chofer con email 'mateo@mateo.com'
      And quiero registrarme como chofer con nombre 'Mateo'
      And quiero registrarme como chofer con apellido 'Calvo'
      And quiero registrarme como chofer con telefono '+54111555555555'
      And quiero registrarme como chofer con ubicacion preferida 'Av. Paseo Colón 850'
      And quiero registrar patente del auto "AAA 123"
      And quiero registrar fabricante del auto "Audi"
      And quiero registrar modelo del auto "TT"
      And quiero registrar año de fabricación del auto 2022
      And quiero registrar color del auto "Negro"
      And me registro como chofer
      And como chofer con email 'mateo@mateo.com' cambio mi telefono a '+54111522222222'
    Then El telefono del chofer con email 'mateo@mateo.com' cambio a '+54111522222222'

  Scenario: P1.10 Edición de ubicacion preferida exitosa para chofer
    Given No hay usuarios registrados
    When Quiero registrarme como chofer con usuario 'mateo'
      And quiero registrarme como chofer con email 'mateo@mateo.com'
      And quiero registrarme como chofer con nombre 'Mateo'
      And quiero registrarme como chofer con apellido 'Calvo'
      And quiero registrarme como chofer con telefono '+54111555555555'
      And quiero registrarme como chofer con ubicacion preferida 'Av. Paseo Colón 850'
      And quiero registrar patente del auto "AAA 123"
      And quiero registrar fabricante del auto "Audi"
      And quiero registrar modelo del auto "TT"
      And quiero registrar año de fabricación del auto 2022
      And quiero registrar color del auto "Negro"
      And me registro como chofer
      And como chofer con email 'mateo@mateo.com' cambio mi ubicacion preferida a 'Av. Las Heras 2214'
    Then La ubicacion preferida del chofer con email 'mateo@mateo.com' cambio a 'Av. Las Heras 2214'
