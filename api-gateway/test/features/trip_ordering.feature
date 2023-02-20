@now
Feature: Ordenamiento por fecha y hora al obtener los viajes disponibles
  
  Background: Pasajeros y chofer registrados
    Given No hay usuarios registrados
      And registro un pasajero con usuario 'mateo1' y ubicacion preferida 'Av. Paseo Colón 850, Buenos Aires'
      And registro un pasajero con usuario 'mateo2' y ubicacion preferida 'Av. Paseo Colón 850, Buenos Aires'
      And registro un pasajero con usuario 'mateo3' y ubicacion preferida 'Av. Paseo Colón 850, Buenos Aires'
      And registro un pasajero con usuario 'mateo4' y ubicacion preferida 'Av. Paseo Colón 850, Buenos Aires'
      And registro un pasajero con usuario 'mateo5' y ubicacion preferida 'Av. Paseo Colón 850, Buenos Aires'
      And registro un chofer con usuario 'lazaro'
      And registro un chofer con usuario 'matias'

  Scenario: Obtencion de viajes disponibles
    Given como pasajero 'mateo1' solicito iniciar un viaje normal hacia 'Gral. Las Heras 2214, Buenos Aires'
      And como pasajero 'mateo2' solicito iniciar un viaje normal hacia 'Gral. Las Heras 2214, Buenos Aires'
      And como pasajero 'mateo3' solicito iniciar un viaje normal hacia 'Gral. Las Heras 2214, Buenos Aires'
      And como pasajero 'mateo4' solicito iniciar un viaje normal hacia 'Gral. Las Heras 2214, Buenos Aires'
      And como pasajero 'mateo5' solicito iniciar un viaje normal hacia 'Gral. Las Heras 2214, Buenos Aires'

    When como usuario 'lazaro' solicito los viajes disponibles con offset 0 limit 5

    Then obtengo 5 viajes disponibles para 'lazaro'
      And uno de los viajes es del usuario 'mateo1'
      And uno de los viajes es del usuario 'mateo2'
      And uno de los viajes es del usuario 'mateo3'
      And uno de los viajes es del usuario 'mateo4'
      And uno de los viajes es del usuario 'mateo5'

  Scenario: Obtencion de viajes disponibles de forma ordenada
    Given como pasajero 'mateo1' solicito iniciar un viaje normal hacia 'Gral. Las Heras 2214, Buenos Aires'
      And como pasajero 'mateo2' solicito iniciar un viaje normal hacia 'Gral. Las Heras 2214, Buenos Aires'
      And como pasajero 'mateo3' solicito iniciar un viaje normal hacia 'Gral. Las Heras 2214, Buenos Aires'
      And como pasajero 'mateo4' solicito iniciar un viaje normal hacia 'Gral. Las Heras 2214, Buenos Aires'
      And como pasajero 'mateo5' solicito iniciar un viaje normal hacia 'Gral. Las Heras 2214, Buenos Aires'
      And como usuario 'matias' acepto tomar el viaje del usuario 'mateo3'

    When como usuario 'lazaro' solicito los viajes disponibles con offset 0 limit 5

    Then obtengo 4 viajes disponibles para 'lazaro'
      And el viaje 1 es del usuario 'mateo1'
      And el viaje 2 es del usuario 'mateo2'
      And el viaje 3 es del usuario 'mateo4'
      And el viaje 4 es del usuario 'mateo5'

  Scenario: Obtencion de viajes disponibles de forma ordenada con limit
    Given como pasajero 'mateo1' solicito iniciar un viaje normal hacia 'Gral. Las Heras 2214, Buenos Aires'
      And como pasajero 'mateo2' solicito iniciar un viaje normal hacia 'Gral. Las Heras 2214, Buenos Aires'
      And como pasajero 'mateo3' solicito iniciar un viaje normal hacia 'Gral. Las Heras 2214, Buenos Aires'
      And como pasajero 'mateo4' solicito iniciar un viaje normal hacia 'Gral. Las Heras 2214, Buenos Aires'
      And como pasajero 'mateo5' solicito iniciar un viaje normal hacia 'Gral. Las Heras 2214, Buenos Aires'

    When como usuario 'lazaro' solicito los viajes disponibles con offset 3 limit 10

    Then obtengo 2 viajes disponibles para 'lazaro'
      And el viaje 1 es del usuario 'mateo4'
      And el viaje 2 es del usuario 'mateo5'

  Scenario: Obtencion de viajes disponibles de forma ordenada con un viaje tomado
    Given como pasajero 'mateo1' solicito iniciar un viaje normal hacia 'Gral. Las Heras 2214, Buenos Aires'
      And como pasajero 'mateo2' solicito iniciar un viaje normal hacia 'Gral. Las Heras 2214, Buenos Aires'
      And como pasajero 'mateo3' solicito iniciar un viaje normal hacia 'Gral. Las Heras 2214, Buenos Aires'
      And como pasajero 'mateo4' solicito iniciar un viaje normal hacia 'Gral. Las Heras 2214, Buenos Aires'
      And como pasajero 'mateo5' solicito iniciar un viaje normal hacia 'Gral. Las Heras 2214, Buenos Aires'

    When como usuario 'lazaro' solicito los viajes disponibles con offset 0 limit 5

    Then obtengo 5 viajes disponibles para 'lazaro'
      And el viaje 1 es del usuario 'mateo1'
      And el viaje 2 es del usuario 'mateo2'
      And el viaje 3 es del usuario 'mateo3'
      And el viaje 4 es del usuario 'mateo4'
      And el viaje 5 es del usuario 'mateo5'
