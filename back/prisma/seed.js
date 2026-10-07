const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // 1. Create Default Users
  const juan = await prisma.user.upsert({
    where: { email: 'student@bulsu.edu.ph' },
    update: {},
    create: {
      supabaseId: '00000000-0000-0000-0000-000000000001',
      name: 'Juan Dela Cruz',
      email: 'student@bulsu.edu.ph',
      studentId: '2022-108249',
      college: 'CIT / Engineering',
      course: 'BS Information Technology',
      year: '3rd Year',
      campus: 'Meneses Campus',
      bio: 'BulSU Meneses IT student. Selling past semester textbooks, engineering calculators, and uniform items.',
      phone: '0917-123-4567',
    },
  });

  const maria = await prisma.user.upsert({
    where: { email: 'maria.santos@bulsu.edu.ph' },
    update: {},
    create: {
      supabaseId: '00000000-0000-0000-0000-000000000002',
      name: 'Maria Santos',
      email: 'maria.santos@bulsu.edu.ph',
      studentId: '2023-104521',
      college: 'College of Education',
      course: 'BSEd English',
      year: '2nd Year',
      campus: 'Meneses Campus',
      bio: 'Education student at BulSU Meneses.',
      phone: '0918-234-5678',
    },
  });

  console.log('✅ Users seeded');

  // 2. Create Sample Listings
  const listing1 = await prisma.listing.create({
    data: {
      title: 'Engineering Mechanics Reviewer & Formula Sheet',
      category: 'Books and Notes',
      college: 'CIT / Engineering',
      campus: 'Meneses Campus',
      condition: 'Like New',
      description: 'Complete compiled notes for Statics & Dynamics with solved practice problems. Perfect for 2nd and 3rd year engineering students taking midterms.',
      type: 'For Sale',
      price: 180,
      images: ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80'],
      status: 'active',
      sellerId: juan.id,
    },
  });

  const listing2 = await prisma.listing.create({
    data: {
      title: 'BulSU Meneses Official White Polo Uniform (Medium)',
      category: 'School Supplies',
      college: 'All Colleges',
      campus: 'Meneses Campus',
      condition: 'Good',
      description: 'Original campus polo uniform with crisp embroidered BulSU seal. Clean, no stains or tears. Freshly laundered and ready to wear.',
      type: 'For Sale',
      price: 250,
      images: ['https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80'],
      status: 'active',
      sellerId: maria.id,
    },
  });

  const listing3 = await prisma.listing.create({
    data: {
      title: 'Casio FX-991EX ClassWiz Scientific Calculator',
      category: 'School Supplies',
      college: 'CIT / Engineering',
      campus: 'Meneses Campus',
      condition: 'Like New',
      description: 'Original authentic Casio ClassWiz in pristine condition. Solar + battery, complete with hard slide cover. Allowed for board examinations.',
      type: 'For Sale',
      price: 850,
      images: ['https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?w=600&auto=format&fit=crop&q=80'],
      status: 'active',
      sellerId: juan.id,
    },
  });

  console.log('✅ Listings seeded');

  // 3. Create Sample Claim
  await prisma.claim.create({
    data: {
      listingId: listing2.id,
      claimantId: juan.id,
      status: 'pending',
      notes: 'Hi! Can we meet at the campus gazebo tomorrow at 10:00 AM? Ready with exact cash.',
    },
  });

  console.log('✅ Claims seeded');
  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
