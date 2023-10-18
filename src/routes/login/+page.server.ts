import {redirect, fail, type Actions} from "@sveltejs/kit" 

import {PrismaClient} from "@prisma/client";
import type { PageServerLoad } from "../$types";

const prisma = new PrismaClient();

export const load : PageServerLoad = async ({ cookies }) => {
    let username = cookies.get("username")
    if (username){
        throw redirect(303, "/")
    }
}


export const actions: Actions = {
    login: async ({ request, cookies}) => {
        let data = await request.formData();
        let username = data.get("username")?.toString();
        let password = data.get("password")?.toString();


        if (username && password) {
            const existingUser = await prisma.user.findUnique({
                where: { name: username}, 
            });

            if (existingUser) {
                if(existingUser.password==password){
                    cookies.set("username", username, {secure: false});
                    throw redirect(307, "/")

                } else {
                return fail(400, {password: "wrong password"})
                }
            } else {
                await prisma.user.create({
                    data: {
                        name: username,
                        password,
                    },
                });

                cookies.set("username", username, {secure: false});
                console.log(username + "logged in")
                throw redirect(307, "/")
            }
        } else {
            // todo: handle
            return fail(400, {username: "no username detected"})

        }
        console.log(username);
    },
    logout: async ({request, cookies}) => {
        let username = cookies.get("username");
        if(!username) {
            return fail(400, { username: "no username detected"});
        }

        
        cookies.delete("username")
    
        
    },
};



  

