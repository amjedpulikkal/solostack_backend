import {Client} from "@elastic/elasticsearch";

import fs  from 'fs'

import path from 'path';
const caCertPath = path.join(__dirname, '../../../../http_ca.crt');
const caCert = fs.readFileSync(caCertPath);

let esClient:Client

export async function esClientConnection() {
   esClient = new Client({
    node: "https://127.0.0.1:9200",
    auth: {
      username: "elastic",
      password: "xixV+TAKHjjcV-3cPS8M",
    },
    tls:{
      ca:caCert
    }
  });

  try {
    await checkConnection();
  } catch (error) {
    console.error("Error setting up Elasticsearch client:", error);
  } 
}

async function checkConnection() {
  try {
    const isConnected = await esClient.info();
    console.log(isConnected)
    if (isConnected) {
      console.log("Elasticsearch cluster is connected!");
    } else {
      console.log("Elasticsearch cluster is not connected.");
    }
  } catch (error) {
    console.error("Error connecting to Elasticsearch:", error);
  }
}


