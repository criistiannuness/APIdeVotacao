import { z } from "zod"
import { PrismaClient } from "@prisma/client"
import fastify, { FastifyInstance } from "fastify"



export async function createPoll (app: FastifyInstance){
    const prisma = new PrismaClient()

    app.post('/polls', async (request, reply) => {
        const createPollBody = z.object({
            title: z.string(),
            options: z.array(z.string()),
        })
    
        const {title, options } = createPollBody.parse(request.body)
    
        const poll = await prisma.poll.create({
            data: {
                title,
                Opitons: {
                    createMany:{
                        data: options.map(option => {
                            return { title: option}
                        }),
                    }
                }
            }
        })

        await prisma.pollOption.createMany({
            data: options.map(option => {
                return { title: option, pollId: poll.id }
            }),
        })
    
        return reply.status(201).send({ pollId: poll.id})
    })    

}