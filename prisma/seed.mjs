import { PrismaClient } from "@prisma/client";
const db=new PrismaClient();
try{const now=new Date();const endsAt=new Date(now.getTime()+30*86400000);const votingEndsAt=new Date(endsAt.getTime()+7*86400000);await db.contest.upsert({where:{slug:"cielo-profondo-2026"},update:{},create:{slug:"cielo-profondo-2026",title:"Cielo profondo 2026",description:"Nebulose, galassie e ammassi: racconta il cielo profondo con la tua migliore elaborazione.",startsAt:now,endsAt,votingEndsAt}})}finally{await db.$disconnect()}
