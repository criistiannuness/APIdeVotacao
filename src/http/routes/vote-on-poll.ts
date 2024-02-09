import { z } from "zod"
import { randomUUID } from 'node:crypto'
import { PrismaClient } from "@prisma/client"
import fastify, { FastifyInstance } from "fastify"

export async function voteOnPoll (app: FastifyInstance){
    const prisma = new PrismaClient()

    app.post('/polls/:pollId/votes', async (request, reply) => {
        const voteOnPollBody = z.object({
            pollOptionId: z.string().uuid()
        })

        const voteOnPollParams = z.object({
            pollId: z.string().uuid(),
        })
    
        const { pollId } = voteOnPollParams.parse(request.params)
        const { pollOptionId } = voteOnPollBody.parse(request.body)

        let { sessionId } = request.cookies

        if( sessionId ) {
             

        }

        if (sessionId) {
            const userPreviousVoteOnPoll = await prisma.vote.findUnique
        }
        
        sessionId = randomUUID()

        reply.setCookie('sessionId', sessionId, {
            path: '/',
            maxAge: 60 * 60 * 24* 30, // 30 days
            signed: true,
            httpOnly: true,
        })

        await prisma.vote.create({
            data:{
                sessionId,
                
                pollOptionId,
            }
        })

        await prisma.vote.create({
            data: {
                sessionId,
                pollId,
                pollOptionId,
            }
        })
    
         return reply.status(201).send({sessionId})
    })    
}