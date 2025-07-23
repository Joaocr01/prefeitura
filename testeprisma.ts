// teste-prisma.ts
import prisma from './src/lib/prisma'

async function main() {
  console.log(Object.keys(prisma))
}

main().catch(console.error)
