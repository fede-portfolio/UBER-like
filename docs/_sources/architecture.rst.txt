Architecture
============

Here we give a brief description of the underlying infrastructure of the
application. Five microservices were implemented, one of them being the 
API Gateway.

Microservices
-------------

API Gateway
~~~~~~~~~~~

In the API Gateway, all microservices are coordinated to provide a single access 
to the application. Users and admins consume the Gateway's API using the mobile
app and the backoffice.

Having a gateway opens the possibility of replicating multiple instances for
load balancing (*stateless* is key here). Besides, the average *round trip
time* can be significantly reduced.

Users
~~~~~

All users, be admins, drivers or riders, are managed here. Data such as:

- Usernames
- Preferred location addresses
- Car manufacturers, colors and models 

is stored using a relational database.


Trips
~~~~~

Here we orchestrate trips between drivers and riders. A rider requests a trip, and
a driver takes it. Real time information such as driver's current location and trip
state is provided to ensure a seamless user experience.

Other functionality related to trips, for example *geocoding*, is handled here.
What's more, the *polylines* to be drawn both in the rider and the driver's map
is generated in this microservice.

Pricing
~~~~~~~

Trip prices are calculated using a set of configurable rules. These rules can also
be evaluated before activation. Currently, 4 parameters are taken into account:

- Total trip distance
- Trip time
- The driver's rating
- The completed trips in the last 30 minutes for the driver

For price estimation, the las two metrics are considered to be 3.5 stars and 0
respectively.

Payments
~~~~~~~~
