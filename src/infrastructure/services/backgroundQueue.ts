import { MailPayload } from "@infrastructure/types/type";
import Queue from "bull";
import {setQueues,BullAdapter} from "bull-board"
export class BackgroundQueue {
  private backgroundQueue;
  constructor() {
    this.backgroundQueue = new Queue("backgroundTasks", {
      redis: {
        host: "127.0.0.1",
        port: 6379,
      },
    });

    setQueues([new BullAdapter(this.backgroundQueue)]);
  }
  private addToQueue(data:any):void{

      this.backgroundQueue.add(data, {
        attempts: 3,
        backoff: 5000,
      });
  }
  addEmailJobToQueue(data:{email:string|[string],payload:MailPayload}):void{
    this.addToQueue({...data,task:"email"})

  }


  addWebPushJobToQueue(data:{subscription:string|[string],payload:MailPayload}){
    this.addToQueue({...data,task:"webPush"})
  }



}
