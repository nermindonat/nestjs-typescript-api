import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "../user/entity/user.entity";
import { UserService } from "../user/user.service";

@Injectable() 
export class AuthService {
    constructor (private userSevice: UserService, private jwtService: JwtService) {}

    async validateUser(email: string, password: string): Promise<Partial<User>> {
        const user = await this.userSevice.findOne(email)
        console.log("User:", user)
        if (!user) {
            throw new NotFoundException('User not found')
        } 

        if (user && user.password !== password) {
            throw new BadRequestException('Invalid credentials');
        }
        if (user && user.password === password) {
            const { password, ...result} = user
            return result
        }
        return null
    }
   
    async login(user: any) {
        // Jwt oluştururken payload verisi gerekiyor. 
        // Bunu da kullanıcıya özel yapabilmek adına username ve userId verilerini kullandık.
        const payload = { email: user.email, sub: user.id };
    
        return {
          access_token: this.jwtService.sign(payload)
        };
      }
}