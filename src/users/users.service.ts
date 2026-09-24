import { Injectable } from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto.js'
import {UpdateUserDto} from './dto/update-user.dto.js'
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception.js';

@Injectable()
export class UsersService {
    private users = [
        {
    "id": 1 ,    
  "name": "Mary",
  "email": "mary@gmail.com",
  "role":  "ENGINEER"
},
 {
    "id": 2  ,    
  "name": "Glory",
  "email": "glorykuria@gmail.com",
  "role":  "ADMIN"
},
{
   "id": 3  ,    
  "name": "Paul",
  "email": "paul.kimathi@gmail.com",
  "role":  "ENGINEER"
},
{
   "id": 4  ,    
  "name": "Grace",
  "email": "grace.tech@teach.org",
  "role":  "ENGINEER"
},
{
   "id": 5  ,    
  "name": "Faith",
  "email": "faith_gathoni@intern.org",
  "role":  "INTERN"
}
    ]

    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if (role) {
            const rolesArray = this.users.filter(user => user.role === role)
            if (rolesArray.length === 0) throw new NotFoundException('User not found')
            return rolesArray
        }
        return this.users
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id)
        if(!user)  throw new NotFoundException('User not found')
        return user
    }

    create(createUserDto: CreateUserDto) {
        const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id)

        const newUser = {
            id: usersByHighestId[0] ? usersByHighestId[0].id + 1 : 1,
            ...createUserDto
        }

        this.users.push(newUser)
        return newUser

}

update(id: number, updateUserDto: UpdateUserDto){
            this.users = this.users.map(user => {
                if(user.id === id){
                    return {...user, ...updateUserDto}
                }
                return user
            })
            return this.findOne(id)
         }

         delete(id:number){
            const removeUser = this.findOne(id)

            this.users = this.users.filter(user => user.id !== id)

            return removeUser
         }
}
