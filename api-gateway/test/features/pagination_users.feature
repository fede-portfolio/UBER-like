
Feature: Pagination for users endpoint

  Scenario: Pagination with offset 1 limit 3
    Given No hay usuarios registrados
    When Quiero registrarme como pasajero con usuario 'mateo'
      And quiero registrarme como pasajero con email 'mateo@mateo.com'
      And quiero registrarme como pasajero con nombre 'Mateo'
      And quiero registrarme como pasajero con apellido 'Calvo'
      And quiero registrarme como pasajero con telefono '+54111555555555'
      And quiero registrarme como pasajero con ubicacion preferida 'Av. Paseo Colón 850'
      And me registro como pasajero

      And Quiero registrarme como pasajero con usuario 'mateo_sleep'
      And quiero registrarme como pasajero con email 'mateo@sleep.com'
      And quiero registrarme como pasajero con nombre 'Mateo'
      And quiero registrarme como pasajero con apellido 'Calvo'
      And quiero registrarme como pasajero con telefono '+54111555555555'
      And quiero registrarme como pasajero con ubicacion preferida 'Av. Paseo Colón 850'
      And me registro como pasajero

      And Quiero registrarme como pasajero con usuario 'lazaro'
      And quiero registrarme como pasajero con email 'lazaro@crack.com'
      And quiero registrarme como pasajero con nombre 'Lazaro'
      And quiero registrarme como pasajero con apellido 'Calvo'
      And quiero registrarme como pasajero con telefono '+54111555555555'
      And quiero registrarme como pasajero con ubicacion preferida 'Av. Paseo Colón 850'
      And me registro como pasajero      

      And Quiero registrarme como pasajero con usuario 'mateo_zzz'
      And quiero registrarme como pasajero con email 'mateo@zzz.com'
      And quiero registrarme como pasajero con nombre 'Mateo'
      And quiero registrarme como pasajero con apellido 'Calvo'
      And quiero registrarme como pasajero con telefono '+54111555555555'
      And quiero registrarme como pasajero con ubicacion preferida 'Av. Paseo Colón 850'
      And me registro como pasajero

      And obtengo los usuarios con username_like 'mateo' offset 1 limit 3

    Then Obtengo 2 pasajeros cuyo username incluye "mateo"