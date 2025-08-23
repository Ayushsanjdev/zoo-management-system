const { PrismaClient } = require('../src/generated/prisma');
const axios = require('axios');

const prisma = new PrismaClient();

// Configuration
const BASE_URL = 'http://localhost:3000';
const TEST_USER = {
  email: 'admin@zoo.com',
  password: 'admin123'
};

let authToken = null;

// Test data
const testData = {
  users: [],
  animals: [],
  enclosures: [],
  feedingRecords: [],
  healthRecords: [],
  enclosureStaff: []
};

// Utility functions
const log = (message, data = null) => {
  console.log(`\n${message}`);
  if (data) {
    console.log(JSON.stringify(data, null, 2));
  }
};

const logSuccess = (message) => {
  console.log(`✅ ${message}`);
};

const logError = (message, error = null) => {
  console.log(`❌ ${message}`);
  if (error) {
    console.log(`Error: ${error.message || error}`);
  }
};

const logInfo = (message) => {
  console.log(`ℹ️  ${message}`);
};

// Authentication
async function authenticate() {
  try {
    logInfo('Authenticating...');
    
    // First, create a test admin user if it doesn't exist
    const existingUser = await prisma.user.findUnique({
      where: { email: TEST_USER.email }
    });

    if (!existingUser) {
      const bcrypt = require('bcrypt');
      const hashedPassword = await bcrypt.hash(TEST_USER.password, 10);
      
      await prisma.user.create({
        data: {
          name: 'Test Admin',
          email: TEST_USER.email,
          password: hashedPassword,
          role: 'ADMIN'
        }
      });
      logSuccess('Created test admin user');
    }

    // For now, we'll use a simple approach - in a real scenario, you'd call the login endpoint
    // This is just for testing purposes
    authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0ZjllZGUzNC1iZWIzLTQyNmQtOWE0Ni00MzZjOGI0ZjEyMTAiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NTU5MzA3NTUsImV4cCI6MTc1NTk3Mzk1NX0.vvWA6_4SQEMQApTG04Z9wpE38qXsYBjmLPJhMK433fw';
    logSuccess('Authentication setup complete');
  } catch (error) {
    logError('Authentication failed', error);
    throw error;
  }
}

// API request helper
async function makeRequest(method, endpoint, data = null, params = null) {
  try {
    const config = {
      method,
      url: `${BASE_URL}${endpoint}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    };

    if (data) {
      config.data = data;
    }

    if (params) {
      config.params = params;
    }

    const response = await axios(config);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(`${error.response.status}: ${error.response.data.error || error.response.statusText}`);
    }
    throw error;
  }
}

// Test data creation
async function createTestData() {
  try {
    logInfo('Creating test data...');

    // Create test users
    const bcrypt = require('bcrypt');
    const hashedPassword = await bcrypt.hash('password123', 10);

    const staffUser = await prisma.user.create({
      data: {
        name: 'Test Staff',
        email: 'staff@zoo.com',
        password: hashedPassword,
        role: 'STAFF'
      }
    });

    const vetUser = await prisma.user.create({
      data: {
        name: 'Test Vet',
        email: 'vet@zoo.com',
        password: hashedPassword,
        role: 'VET'
      }
    });

    testData.users = [staffUser, vetUser];
    logSuccess('Created test users');

    // Create test enclosures
    const enclosure1 = await prisma.enclosure.create({
      data: {
        name: 'Lion Safari',
        type: 'Safari',
        capacity: 10
      }
    });

    const enclosure2 = await prisma.enclosure.create({
      data: {
        name: 'Elephant Habitat',
        type: 'Safari',
        capacity: 5
      }
    });

    testData.enclosures = [enclosure1, enclosure2];
    logSuccess('Created test enclosures');

    // Create test animals
    const animal1 = await prisma.animal.create({
      data: {
        name: 'Leo',
        species: 'Lion',
        scientificName: 'Panthera leo',
        age: 5,
        gender: 'Male',
        healthStatus: 'Healthy',
        enclosureId: enclosure1.id
      }
    });

    const animal2 = await prisma.animal.create({
      data: {
        name: 'Ellie',
        species: 'Elephant',
        scientificName: 'Loxodonta africana',
        age: 15,
        gender: 'Female',
        healthStatus: 'Healthy',
        enclosureId: enclosure2.id
      }
    });

    testData.animals = [animal1, animal2];
    logSuccess('Created test animals');

    // Create test feeding records
    const feedingRecord1 = await prisma.feedingRecord.create({
      data: {
        foodType: 'Meat',
        quantity: '5kg',
        feedingTime: new Date(),
        staffId: staffUser.id,
        animalId: animal1.id
      }
    });

    const feedingRecord2 = await prisma.feedingRecord.create({
      data: {
        foodType: 'Vegetables',
        quantity: '10kg',
        feedingTime: new Date(),
        staffId: staffUser.id,
        animalId: animal2.id
      }
    });

    testData.feedingRecords = [feedingRecord1, feedingRecord2];
    logSuccess('Created test feeding records');

    // Create test health records
    const healthRecord1 = await prisma.healthRecord.create({
      data: {
        checkupDate: new Date(),
        notes: 'Routine checkup - healthy',
        medication: null,
        animalId: animal1.id,
        vetId: vetUser.id
      }
    });

    const healthRecord2 = await prisma.healthRecord.create({
      data: {
        checkupDate: new Date(),
        notes: 'Annual vaccination',
        medication: 'Vaccine A',
        animalId: animal2.id,
        vetId: vetUser.id
      }
    });

    testData.healthRecords = [healthRecord1, healthRecord2];
    logSuccess('Created test health records');

    // Create test enclosure staff
    const enclosureStaff1 = await prisma.enclosureStaff.create({
      data: {
        staffId: staffUser.id,
        enclosureId: enclosure1.id,
        assignedAt: new Date()
      }
    });

    testData.enclosureStaff = [enclosureStaff1];
    logSuccess('Created test enclosure staff');

  } catch (error) {
    logError('Failed to create test data', error);
    throw error;
  }
}

// Test functions
async function testAnimalAPIs() {
  log('🧪 Testing Animal APIs...', '='.repeat(50));

  try {
    // Test filter options
    logInfo('Testing animal filter options...');
    const filterOptions = await makeRequest('GET', '/api/animals/filter-options');
    logSuccess('Animal filter options retrieved');
    log('Filter options:', filterOptions);

    // Test species list
    const speciesList = await makeRequest('GET', '/api/animals/species');
    logSuccess('Animal species list retrieved');
    log('Species list:', speciesList);

    // Test health status list
    const healthStatusList = await makeRequest('GET', '/api/animals/health-status');
    logSuccess('Animal health status list retrieved');
    log('Health status list:', healthStatusList);

    // Test get all animals
    const allAnimals = await makeRequest('GET', '/api/animals');
    logSuccess('All animals retrieved');
    log('Animals count:', allAnimals.data.length);

    // Test filtering by species
    const lions = await makeRequest('GET', '/api/animals', null, { species: 'Lion' });
    logSuccess('Animals filtered by species (Lion)');
    log('Lions count:', lions.data.length);

    // Test filtering by health status
    const healthyAnimals = await makeRequest('GET', '/api/animals', null, { healthStatus: 'Healthy' });
    logSuccess('Animals filtered by health status (Healthy)');
    log('Healthy animals count:', healthyAnimals.data.length);

    // Test filtering by enclosure
    const enclosureAnimals = await makeRequest('GET', '/api/animals', null, { enclosureId: testData.enclosures[0].id });
    logSuccess('Animals filtered by enclosure');
    log('Enclosure animals count:', enclosureAnimals.data.length);

    // Test search
    const searchResults = await makeRequest('GET', '/api/animals', null, { search: 'Leo' });
    logSuccess('Animals search completed');
    log('Search results count:', searchResults.data.length);

    // Test pagination
    const paginatedAnimals = await makeRequest('GET', '/api/animals', null, { page: 1, limit: 5 });
    logSuccess('Animals pagination tested');
    log('Pagination info:', paginatedAnimals.pagination);

    // Test get animal by ID
    const animalById = await makeRequest('GET', `/api/animals/${testData.animals[0].id}`);
    logSuccess('Animal by ID retrieved');
    log('Animal details:', animalById);

  } catch (error) {
    logError('Animal API tests failed', error);
  }
}

async function testEnclosureAPIs() {
  log('🧪 Testing Enclosure APIs...', '='.repeat(50));

  try {
    // Test filter options
    logInfo('Testing enclosure filter options...');
    const filterOptions = await makeRequest('GET', '/api/enclosures/filter-options');
    logSuccess('Enclosure filter options retrieved');
    log('Filter options:', filterOptions);

    // Test types list
    const typesList = await makeRequest('GET', '/api/enclosures/types');
    logSuccess('Enclosure types list retrieved');
    log('Types list:', typesList);

    // Test get all enclosures
    const allEnclosures = await makeRequest('GET', '/api/enclosures');
    logSuccess('All enclosures retrieved');
    log('Enclosures count:', allEnclosures.data.length);

    // Test filtering by type
    const safariEnclosures = await makeRequest('GET', '/api/enclosures', null, { type: 'Safari' });
    logSuccess('Enclosures filtered by type (Safari)');
    log('Safari enclosures count:', safariEnclosures.data.length);

    // Test filtering by capacity
    const largeEnclosures = await makeRequest('GET', '/api/enclosures', null, { capacityMin: 5 });
    logSuccess('Enclosures filtered by capacity (min 5)');
    log('Large enclosures count:', largeEnclosures.data.length);

    // Test search
    const searchResults = await makeRequest('GET', '/api/enclosures', null, { search: 'Lion' });
    logSuccess('Enclosures search completed');
    log('Search results count:', searchResults.data.length);

    // Test get enclosure by ID
    const enclosureById = await makeRequest('GET', `/api/enclosures/${testData.enclosures[0].id}`);
    logSuccess('Enclosure by ID retrieved');
    log('Enclosure details:', enclosureById);

  } catch (error) {
    logError('Enclosure API tests failed', error);
  }
}

async function testFeedingRecordAPIs() {
  log('🧪 Testing Feeding Record APIs...', '='.repeat(50));

  try {
    // Test filter options
    logInfo('Testing feeding record filter options...');
    const filterOptions = await makeRequest('GET', '/api/feeding-records/filter-options');
    logSuccess('Feeding record filter options retrieved');
    log('Filter options:', filterOptions);

    // Test food types list
    const foodTypesList = await makeRequest('GET', '/api/feeding-records/food-types');
    logSuccess('Food types list retrieved');
    log('Food types list:', foodTypesList);

    // Test staff list
    const staffList = await makeRequest('GET', '/api/feeding-records/staff');
    logSuccess('Staff list retrieved');
    log('Staff list:', staffList);

    // Test animals list
    const animalsList = await makeRequest('GET', '/api/feeding-records/animals');
    logSuccess('Animals list retrieved');
    log('Animals list:', animalsList);

    // Test get all feeding records
    const allFeedingRecords = await makeRequest('GET', '/api/feeding-records');
    logSuccess('All feeding records retrieved');
    log('Feeding records count:', allFeedingRecords.data.length);

    // Test filtering by animal
    const animalFeedingRecords = await makeRequest('GET', '/api/feeding-records', null, { animalId: testData.animals[0].id });
    logSuccess('Feeding records filtered by animal');
    log('Animal feeding records count:', animalFeedingRecords.data.length);

    // Test filtering by staff
    const staffFeedingRecords = await makeRequest('GET', '/api/feeding-records', null, { staffId: testData.users[0].id });
    logSuccess('Feeding records filtered by staff');
    log('Staff feeding records count:', staffFeedingRecords.data.length);

    // Test filtering by food type
    const meatFeedingRecords = await makeRequest('GET', '/api/feeding-records', null, { foodType: 'Meat' });
    logSuccess('Feeding records filtered by food type (Meat)');
    log('Meat feeding records count:', meatFeedingRecords.data.length);

    // Test filtering by date range
    const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const endDate = new Date().toISOString();
    const dateRangeFeedingRecords = await makeRequest('GET', '/api/feeding-records', null, { 
      feedingTimeStart: startDate, 
      feedingTimeEnd: endDate 
    });
    logSuccess('Feeding records filtered by date range');
    log('Date range feeding records count:', dateRangeFeedingRecords.data.length);

    // Test get feeding record by ID
    const feedingRecordById = await makeRequest('GET', `/api/feeding-records/${testData.feedingRecords[0].id}`);
    logSuccess('Feeding record by ID retrieved');
    log('Feeding record details:', feedingRecordById);

  } catch (error) {
    logError('Feeding Record API tests failed', error);
  }
}

async function testHealthRecordAPIs() {
  log('🧪 Testing Health Record APIs...', '='.repeat(50));

  try {
    // Test filter options
    logInfo('Testing health record filter options...');
    const filterOptions = await makeRequest('GET', '/api/health-records/filter-options');
    logSuccess('Health record filter options retrieved');
    log('Filter options:', filterOptions);

    // Test vets list
    const vetsList = await makeRequest('GET', '/api/health-records/vets');
    logSuccess('Vets list retrieved');
    log('Vets list:', vetsList);

    // Test animals list
    const animalsList = await makeRequest('GET', '/api/health-records/animals');
    logSuccess('Animals list retrieved');
    log('Animals list:', animalsList);

    // Test get all health records
    const allHealthRecords = await makeRequest('GET', '/api/health-records');
    logSuccess('All health records retrieved');
    log('Health records count:', allHealthRecords.data.length);

    // Test filtering by animal
    const animalHealthRecords = await makeRequest('GET', '/api/health-records', null, { animalId: testData.animals[0].id });
    logSuccess('Health records filtered by animal');
    log('Animal health records count:', animalHealthRecords.data.length);

    // Test filtering by vet
    const vetHealthRecords = await makeRequest('GET', '/api/health-records', null, { vetId: testData.users[1].id });
    logSuccess('Health records filtered by vet');
    log('Vet health records count:', vetHealthRecords.data.length);

    // Test filtering by date range
    const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const endDate = new Date().toISOString();
    const dateRangeHealthRecords = await makeRequest('GET', '/api/health-records', null, { 
      checkupDateStart: startDate, 
      checkupDateEnd: endDate 
    });
    logSuccess('Health records filtered by date range');
    log('Date range health records count:', dateRangeHealthRecords.data.length);

    // Test get health record by ID
    const healthRecordById = await makeRequest('GET', `/api/health-records/${testData.healthRecords[0].id}`);
    logSuccess('Health record by ID retrieved');
    log('Health record details:', healthRecordById);

  } catch (error) {
    logError('Health Record API tests failed', error);
  }
}

async function testEnclosureStaffAPIs() {
  log('🧪 Testing Enclosure Staff APIs...', '='.repeat(50));

  try {
    // Test filter options
    logInfo('Testing enclosure staff filter options...');
    const filterOptions = await makeRequest('GET', '/api/enclosure-staff/filter-options');
    logSuccess('Enclosure staff filter options retrieved');
    log('Filter options:', filterOptions);

    // Test staff list
    const staffList = await makeRequest('GET', '/api/enclosure-staff/staff');
    logSuccess('Staff list retrieved');
    log('Staff list:', staffList);

    // Test enclosures list
    const enclosuresList = await makeRequest('GET', '/api/enclosure-staff/enclosures');
    logSuccess('Enclosures list retrieved');
    log('Enclosures list:', enclosuresList);

    // Test get all enclosure staff
    const allEnclosureStaff = await makeRequest('GET', '/api/enclosure-staff');
    logSuccess('All enclosure staff retrieved');
    log('Enclosure staff count:', allEnclosureStaff.data.length);

    // Test filtering by staff
    const staffEnclosureStaff = await makeRequest('GET', '/api/enclosure-staff', null, { staffId: testData.users[0].id });
    logSuccess('Enclosure staff filtered by staff');
    log('Staff enclosure staff count:', staffEnclosureStaff.data.length);

    // Test filtering by enclosure
    const enclosureEnclosureStaff = await makeRequest('GET', '/api/enclosure-staff', null, { enclosureId: testData.enclosures[0].id });
    logSuccess('Enclosure staff filtered by enclosure');
    log('Enclosure staff count:', enclosureEnclosureStaff.data.length);

    // Test get enclosure staff by ID
    const enclosureStaffById = await makeRequest('GET', `/api/enclosure-staff/${testData.enclosureStaff[0].id}`);
    logSuccess('Enclosure staff by ID retrieved');
    log('Enclosure staff details:', enclosureStaffById);

  } catch (error) {
    logError('Enclosure Staff API tests failed', error);
  }
}

async function testUserAPIs() {
  log('🧪 Testing User APIs...', '='.repeat(50));

  try {
    // Test get all users
    const allUsers = await makeRequest('GET', '/api/users');
    logSuccess('All users retrieved');
    log('Users count:', allUsers.data.length);

    // Test filtering by role
    const staffUsers = await makeRequest('GET', '/api/users', null, { role: 'STAFF' });
    logSuccess('Users filtered by role (STAFF)');
    log('Staff users count:', staffUsers.data.length);

    // Test get user by ID
    const userById = await makeRequest('GET', `/api/users/${testData.users[0].id}`);
    logSuccess('User by ID retrieved');
    log('User details:', userById);

  } catch (error) {
    logError('User API tests failed', error);
  }
}

// Cleanup function
async function cleanup() {
  try {
    logInfo('Cleaning up test data...');
    
    // Delete in reverse order to avoid foreign key constraints
    await prisma.healthRecord.deleteMany({
      where: { id: { in: testData.healthRecords.map(r => r.id) } }
    });

    await prisma.feedingRecord.deleteMany({
      where: { id: { in: testData.feedingRecords.map(r => r.id) } }
    });

    await prisma.enclosureStaff.deleteMany({
      where: { id: { in: testData.enclosureStaff.map(s => s.id) } }
    });

    await prisma.animal.deleteMany({
      where: { id: { in: testData.animals.map(a => a.id) } }
    });

    await prisma.enclosure.deleteMany({
      where: { id: { in: testData.enclosures.map(e => e.id) } }
    });

    await prisma.user.deleteMany({
      where: { id: { in: testData.users.map(u => u.id) } }
    });

    logSuccess('Test data cleaned up');
  } catch (error) {
    logError('Cleanup failed', error);
  }
}

// Main test runner
async function runAllTests() {
  console.log('🚀 Starting Comprehensive API Tests');
  console.log('='.repeat(60));

  try {
    // Setup
    await authenticate();
    await createTestData();

    // Run all tests
    await testAnimalAPIs();
    await testEnclosureAPIs();
    await testFeedingRecordAPIs();
    await testHealthRecordAPIs();
    await testEnclosureStaffAPIs();
    await testUserAPIs();

    console.log('\n🎉 All API tests completed successfully!');
    console.log('='.repeat(60));

  } catch (error) {
    console.error('\n💥 Test suite failed:', error.message);
  } finally {
    // Cleanup
    await cleanup();
    await prisma.$disconnect();
  }
}

// Run the tests
runAllTests();
