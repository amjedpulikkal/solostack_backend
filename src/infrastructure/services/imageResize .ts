
import { ISharp } from "@interfaces/services/interface"
import sharp from "sharp"

export class Sharp implements ISharp{



   async resizeImage(input:Buffer,width:number,hight:number):Promise<Buffer>{

      return sharp(input).resize(width,hight).toBuffer()

    }

}