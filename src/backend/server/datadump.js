import prisma from './lib/prisma.js';

async function main() {
  // Create a new user with a post
  const user = await prisma.users.create({
    data: {
      firstName: "Dylan",
	  lastName: "Knapp",
      email: "dylan@prisma.io",
      grinder: {
        create: {
          grinderName: "Baratza Sette 270",
          minSettingFine: 0,
          maxSettingCoarse: 100,
        },
      },
    },
    include: {
      grinder: true,
    },
  });
  console.log("Created user:", user);

  // Fetch all users with their posts
  const allUsers = await prisma.users.findMany({
    include: {
      grinder: true,
    },
  });
  console.log("All users:", JSON.stringify(allUsers, null, 2));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });