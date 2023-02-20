class Settings {
  constructor() {
    this.SERVICE_USERS_URL = process.env.SERVICE_USERS_URL;
    this.SERVICE_TRIPS_URL = process.env.SERVICE_TRIPS_URL;
    this.SERVICE_PRICING_URL = process.env.SERVICE_PRICING_URL;
    this.SERVICE_PAYMENTS_URL = process.env.SERVICE_PAYMENTS_URL;
    this.version = 'v1';
  }

  serviceUsersURL() {
    return this.SERVICE_USERS_URL;
  }

  serviceTripsURL() {
    return this.SERVICE_TRIPS_URL;
  }

  servicePricingURL() {
    return this.SERVICE_PRICING_URL;
  }

  servicePaymentsURL() {
    return this.SERVICE_PAYMENTS_URL;
  }

  // FIXME: move to env var
  apiGatewayVersion() {
    return this.version;
  }

  changeServiceURL(service, url) {
    switch (service) {
      case 'users':
        this.SERVICE_USERS_URL = url;
        break;

      case 'trips':
        this.SERVICE_TRIPS_URL = url;
        break;

      case 'pricing':
        this.SERVICE_PRICING_URL = url;
        break;

      default:
        break;
    }
  }

  reset() {
    this.SERVICE_USERS_URL = process.env.SERVICE_USERS_URL;
    this.SERVICE_TRIPS_URL = process.env.SERVICE_TRIPS_URL;
    this.SERVICE_PRICING_URL = process.env.SERVICE_PRICING_URL;
    this.version = 'v1';
  }
}

const config = new Settings();

module.exports = config;
