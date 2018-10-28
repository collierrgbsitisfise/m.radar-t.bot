import * as rp from "request-promise";
class CacheService {
  private cacheHost: string = "http://localhost:7777";
  public async setValue(key: string, data: any): Promise<any> {
    const options = {
      method: "POST",
      uri: `${this.cacheHost}/cache/set-data`,
      body: {
        key,
        data
      },
      json: true
    };

    try {
      await rp(options);
      return {
        error: false,
        data: true
      };
    } catch (err) {
      return {
        error: true,
        data: err
      };
    }
  }
  public async getValue(key: string): Promise<any> {
    const options = {
      method: "GET",
      uri: `${this.cacheHost}/cache/get-data/${key}`,
      json: true
    };

    try {
      const data = await rp(options);
      return { error: false, data: data };
    } catch (err) {
      return {
        error: true,
        data: err
      };
    }
  }
}

export default CacheService;
