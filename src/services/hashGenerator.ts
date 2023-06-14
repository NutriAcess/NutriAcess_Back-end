import bcrypt from "bcryptjs";
import dotenv from "dotenv";



dotenv.config()
export class HashGenerator {
   public hash = async (s: string): Promise<any> => {
      const rounds:number = Number(process.env.BCRYPT_COST )
      const salt = await bcrypt.genSalt(rounds)
      const result = await bcrypt.hash(s, salt)
      return result
   }

   public compareHash = async (s: string, hash: string): Promise<boolean> => {
      return bcrypt.compare(s, hash)
   }
}

export default new HashGenerator()