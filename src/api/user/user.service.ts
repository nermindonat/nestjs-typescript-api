import { Injectable } from "@nestjs/common";
import { DBService } from "src/database/DB.service";
import { CreateUserDto } from "./dto/createUser.dto";

@Injectable()
export class UserService {
    constructor (private readonly DBService: DBService) {}

    async create(payload: CreateUserDto) {
        return await this.DBService.user.create({
            data: payload
        })
    }
}