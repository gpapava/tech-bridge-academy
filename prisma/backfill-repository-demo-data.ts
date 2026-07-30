import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * One-off backfill for local dev: contact/web-link/annex fields on repository
 * entries were added after the original seed data, so none of the seeded
 * "Good Practice" entries had them. Populates them on the Skills Foresight
 * Observatory entry so it has a complete example to demo locally, matching
 * the sample entry submitted to production via the Submit-a-Good-Practice form.
 */
async function main() {
  console.log("🌱 Backfilling repository demo data...");

  const initiatives = await prisma.repositoryInitiative.findMany({
    where: { title: "Skills Foresight Observatory: Mechanical Sector Trends in Greece" },
  });

  for (const initiative of initiatives) {
    await prisma.repositoryInitiative.update({
      where: { id: initiative.id },
      data: {
        contactEmail: "observatory@iis-volta.edu.it",
        externalLinks: ["https://www.eduskills-observatory.gr", "https://www.cedefop.europa.eu"],
      },
    });

    const existingDoc = await prisma.repositoryDocument.findFirst({
      where: { initiativeId: initiative.id, name: "Skills Foresight Observatory — Annual Report 2025" },
    });
    if (!existingDoc) {
      await prisma.repositoryDocument.create({
        data: {
          initiativeId: initiative.id,
          name: "Skills Foresight Observatory — Annual Report 2025",
          url: "https://www.cedefop.europa.eu/en/publications",
          fileType: "PDF",
        },
      });
    }

    console.log(`✅ Backfilled contact/links/annex for "${initiative.title}" (${initiative.id})`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
