import type { NextAuthOptions } from "next-auth";
import CredendialsProvider from "next-auth/providers/credentials"

export const options: NextAuthOptions = {
    providers: [
        CredendialsProvider({
            name: "Credendials", 
            credentials: {
                username: {
                    label: "Username: ",
                    type: "text",
                },
                password: {
                    label: "Password: ",
                    type: "password"
                }
            },
            async authorize(credentials, req) {
                // retrieve credentials from database and compare it
                if (credentials === undefined) {
                    return null
                }

                const res = await fetch(req.headers?.origin + "/api/getUser", {
                    method: 'POST', 
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                })
                const result = await res.json()

                if (result.success === false) {
                    console.log(result.message)
                    return null
                } else {
                    return result.user
                }
            }
        })
    ],
}

