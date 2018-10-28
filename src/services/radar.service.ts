import * as rp from "request-promise";

class RadarService {
  private radarHost: string = "http://localhost:5525";

  public async createRadarPoint(
    latitude: string | number,
    longitude: string | number,
    informator: string = "anonim"
  ) {
    const options = {
      method: "POST",
      uri: `${this.radarHost}/radar-point`,
      body: { latitude, longitude, informator },
      json: true
    };

    const result = await rp(options);
    return result;
  }

  public async getRadarPoint(
    latitude: string | number,
    longitude: string | number,
    radius: string | number
  ) {
    const options = {
      method: "GET",
      uri: `${
        this.radarHost
      }/radar-point/g-link?radius=${radius}&latitude=${latitude}&longitude=${longitude}`,
      json: true
    };

    const result = await rp(options);
    return result;
  }
}

export default RadarService;
