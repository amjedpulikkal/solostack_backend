import axios from "axios";

export class ExchangeRate {
  async getUsdRate(): Promise<number> {
    const response = await axios.get(
      `https://v6.exchangerate-api.com/v6/${process.env.exchangerate_api_key}/latest/INR`
    );
    return response.data.conversion_rates.USD;
  }

  async convertInrToUsd(inr: number): Promise<number> {
    const usdRate = await this.getUsdRate();
    console.log(usdRate,"res---------------req");
    return inr * usdRate;
  }
}
