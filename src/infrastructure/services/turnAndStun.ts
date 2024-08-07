import axios, { AxiosResponse } from "axios";
require("dotenv").config();

export class TurnStunServer {
  async getIceServer(): Promise<AxiosResponse<any, any>> {
    const data = {
      format: "urls",
    };

    const options = {
      method: "PUT",
      url: "https://global.xirsys.net/_turn/MyFirstApp",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(`${process.env.ice_servers_token}`).toString("base64"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    try {
        const response = await axios(options);
        console.log(response.data);
        return response.data; 
      } catch (error) {
        console.error("Error fetching ICE servers:", error.message || error);
        // return "Error fetching ICE servers"; 
      }
  }
}
