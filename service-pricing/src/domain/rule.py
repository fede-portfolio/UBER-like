from decimal import getcontext, Decimal

PRECISION = 5
getcontext().prec = PRECISION


class Rule:
    def __init__(self, id, c_km, c_trips_last_30m,
                 c_rating, c_min_price, events=None):
        self.id = id
        self.c_km = Decimal(c_km)
        self.c_trips_last_30m = Decimal(c_trips_last_30m)
        self.c_rating = Decimal(c_rating)
        self.c_min_price = Decimal(c_min_price)
        self.active = False
        self.events = [] if not events else events

    def price_for(self, n_km, n_trips_last_30m, n_rating):
        result = Decimal('0')
        result += Decimal(n_km) * self.c_km
        result += Decimal(n_trips_last_30m) * self.c_trips_last_30m
        result += Decimal(n_rating) * self.c_rating
        if result < self.c_min_price:
            result = self.c_min_price
        # FIXME: Sería mejor modelado como una clase Price o similar
        return str(result)

    def activate(self):
        self.active = True

    def is_active(self):
        return self.active
