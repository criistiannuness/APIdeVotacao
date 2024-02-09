import { z } from "zod"
import { PrismaClient } from "@prisma/client"
import fastify, { FastifyInstance } from "fastify"



export async function getPoll (app: FastifyInstance){
    const prisma = new PrismaClient()

    app.get('/polls/:pollId', async (request, reply) => {
        const getPOllsParams = z.object({
            pollId: z.string().uuid(),
            
        })
    
        const { pollId } = getPOllsParams.parse(request.params)
    
        const poll = await prisma.poll.findUnique({
            where:{
                id: pollId,
            },
            include: {
                Opitons: {
                    select:{
                        id: true,
                        title: true,
                    }
                }
            }
        })

        
    
        return reply.send({ poll })
    })    

}