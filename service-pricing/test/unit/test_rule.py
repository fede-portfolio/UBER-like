from src.domain.rule import Rule


def test_rule_coefficients():
    c_km = '1.23'
    c_trips_last_30m = '2.34'
    c_rating = '3.45'
    c_min = '4.56'
    rule: Rule = Rule(
        'fake_id',
        c_km,
        c_trips_last_30m,
        c_rating,
        c_min
    )

    assert rule.price_for('1', '1', '1') == '7.02'


def test_rule_activation():
    c_km = '1.23'
    c_trips_last_30m = '2.34'
    c_rating = '3.45'
    c_min = '4.56'
    rule: Rule = Rule(
        'fake_id',
        c_km,
        c_trips_last_30m,
        c_rating,
        c_min
    )
    assert rule.is_active() is False
    rule.activate()
    assert rule.is_active() is True
