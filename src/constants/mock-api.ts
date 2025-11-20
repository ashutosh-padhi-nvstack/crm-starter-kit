////////////////////////////////////////////////////////////////////////////////
// 🛑 Nothing in here has anything to do with Nextjs, it's just a fake database
// CRM: Mock Visa Application Data Store
////////////////////////////////////////////////////////////////////////////////

import { faker } from '@faker-js/faker';
import { matchSorter } from 'match-sorter'; // For filtering

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Define the shape of Visa Application data
export type VisaApplication = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

// Mock visa application data store
export const fakeApplications = {
  records: [] as VisaApplication[], // Holds the list of application objects

  // Initialize with sample data
  initialize() {
    const sampleApplications: VisaApplication[] = [];
    function generateRandomApplicationData(id: number): VisaApplication {
      const countries = [
        'Dubai',
        'Saudi Arabia',
        'Qatar',
        'Kuwait',
        'Oman',
        'Bahrain',
        'UAE',
        'Abu Dhabi'
      ];

      const journeyTypes = ['DIY', 'Assisted'];
      const statuses = ['Draft', 'Submitted', 'QC Pending', 'Payment Pending', 'Ops Processing', 'Posted', 'Visa Ready', 'Completed'];

      return {
        id,
        name: `VISA-${faker.string.alphanumeric(8).toUpperCase()}`,
        description: `${faker.helpers.arrayElement(journeyTypes)} journey visa application for ${faker.helpers.arrayElement(countries)} - Status: ${faker.helpers.arrayElement(statuses)}`,
        created_at: faker.date
          .between({ from: '2024-01-01', to: '2024-12-31' })
          .toISOString(),
        price: parseFloat(faker.commerce.price({ min: 100, max: 500, dec: 2 })),
        photo_url: `https://api.slingacademy.com/public/sample-products/${id}.png`,
        category: faker.helpers.arrayElement(countries),
        updated_at: faker.date.recent().toISOString()
      };
    }

    // Generate remaining records
    for (let i = 1; i <= 20; i++) {
      sampleApplications.push(generateRandomApplicationData(i));
    }

    this.records = sampleApplications;
  },

  // Get all applications with optional category filtering and search
  async getAll({
    categories = [],
    search
  }: {
    categories?: string[];
    search?: string;
  }) {
    let applications = [...this.records];

    // Filter applications based on selected categories (countries)
    if (categories.length > 0) {
      applications = applications.filter((application) =>
        categories.includes(application.category)
      );
    }

    // Search functionality across multiple fields
    if (search) {
      applications = matchSorter(applications, search, {
        keys: ['name', 'description', 'category']
      });
    }

    return applications;
  },

  // Get paginated results with optional category filtering and search
  async getApplications({
    page = 1,
    limit = 10,
    categories,
    search
  }: {
    page?: number;
    limit?: number;
    categories?: string;
    search?: string;
  }) {
    await delay(1000);
    const categoriesArray = categories ? categories.split('.') : [];
    const allApplications = await this.getAll({
      categories: categoriesArray,
      search
    });
    const totalApplications = allApplications.length;

    // Pagination logic
    const offset = (page - 1) * limit;
    const paginatedApplications = allApplications.slice(offset, offset + limit);

    // Mock current time
    const currentTime = new Date().toISOString();

    // Return paginated response
    return {
      success: true,
      time: currentTime,
      message: 'CRM visa application data',
      total_products: totalApplications,
      offset,
      limit,
      products: paginatedApplications
    };
  },

  // Get a specific application by its ID
  async getApplicationById(id: number) {
    await delay(1000); // Simulate a delay

    // Find the application by its ID
    const application = this.records.find((application) => application.id === id);

    if (!application) {
      return {
        success: false,
        message: `Application with ID ${id} not found`
      };
    }

    // Mock current time
    const currentTime = new Date().toISOString();

    return {
      success: true,
      time: currentTime,
      message: `Application with ID ${id} found`,
      product: application
    };
  },

  // Legacy methods for backward compatibility
  async getProducts(params: any) {
    return this.getApplications(params);
  },

  async getProductById(id: number) {
    return this.getApplicationById(id);
  }
};

// Initialize sample applications
fakeApplications.initialize();
