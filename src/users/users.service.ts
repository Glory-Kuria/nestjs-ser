import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {
    "id": "1"   ,    
  "name": "Mary",
  "email": "mary@gmail.com",
  "role":  "ENGINEER"
},
 {
    "id": "2"   ,    
  "name": "Glory",
  "email": "glorykuria@gmail.com",
  "role":  "ADMIN"
},
{
   "id": "3"   ,    
  "name": "Paul",
  "email": "paul.kimathi@gmail.com",
  "role":  "ENGINEER"
},
{
   "id": "4"   ,    
  "name": "Grace",
  "email": "grace.tech@teach.org",
  "role":  "ENGINEER"
},
{
   "id": "5"   ,    
  "name": "Faith",
  "email": "faith_gathoni@intern.org",
  "role":  "INTERN"
}
    ]

    findAll(role?: 'INTERN' | 'ENGINEER' |'ADMIN') {
        if(role) {
return this.users.filter(user => user.role === role)
        }
        return this.users
    }

    findOne(id: string) {
        const user = this.users.find(user => user.id === id)
        return user
    }

    create(user: { name: string, email: string, role: 'INTERN'
         | 'ENGINEER'| 'ADMIN'}) {
        const usersByHighestId = [...this.users].sort((a,b) => b.
        id.localeCompare(a.id))

        const newUser = {
            id: (+usersByHighestId[0].id + 1).toString(),
        ...user     }
    this.users.push(newUser)
    
     const newId = this.users.length > 0
    ? (+usersByHighestId[0].id + 1).toString()
    : "1"
    return newUser


}

update(id: string, updateUser: { name?: string, email?: string, role?: 'INTERN'
         | 'ENGINEER'| 'ADMIN'}){
            this.users = this.users.map(user => {
                if(user.id === id){
                    return {...user, ...updateUser}
                }
                return user
            })
            return this.findOne(id)
         }

         delete(id:string){
            const removeUser = this.findOne(id)

            this.users = this.users.filter(user => user.id !== id)

            return removeUser
         }
}
