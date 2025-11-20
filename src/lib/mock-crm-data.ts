/**
 * Mock CRM Data Store
 * Provides mock data for CRM modules: Applications, Partners, Visas, Wallet, OCR, etc.
 */

import { faker } from '@faker-js/faker';

// CRM-specific status buckets
export type StatusBucket = 'green' | 'yellow' | 'red';
export type ApplicationStatus = 'draft' | 'submitted' | 'qc-pending' | 'payment-pending' | 'ops-processing' | 'posted' | 'visa-ready' | 'completed' | 'rejected';
export type JourneyType = 'diy' | 'assisted';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';
export type OCRStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'manual-review';

export interface VisaApplication {
  id: string;
  applicationNumber: string;
  partnerId: string;
  partnerName: string;
  country: string; // Dubai initially, extensible
  journeyType: JourneyType;
  status: ApplicationStatus;
  bucket: StatusBucket; // Green/Yellow/Red categorization
  ocrStatus: OCRStatus;
  ocrCompletionPercent: number;
  tatDays: number; // Turnaround time in days
  expectedTatDays: number;
  fee: number;
  paymentStatus: PaymentStatus;
  assignedTo?: string; // Round-robin assignment
  submittedAt?: string;
  qcCompletedAt?: string;
  paymentReceivedAt?: string;
  opsProcessedAt?: string;
  visaPostedAt?: string;
  visaReadyAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Partner {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone?: string;
  kycStatus: 'pending' | 'verified' | 'rejected';
  kycVerifiedAt?: string;
  walletBalance: number;
  totalApplications: number;
  activeApplications: number;
  country: string;
  status: 'active' | 'inactive' | 'suspended';
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface WalletTransaction {
  id: string;
  partnerId: string;
  type: 'top-up' | 'payment' | 'refund';
  amount: number;
  status: PaymentStatus;
  method: 'gateway' | 'bank-transfer' | 'offline';
  reference?: string;
  description: string;
  createdAt: string;
}

export interface OCRResult {
  id: string;
  applicationId: string;
  documentType: 'passport' | 'photo' | 'form' | 'other';
  status: OCRStatus;
  extractedData?: Record<string, any>;
  confidence: number; // 0-100
  processedAt?: string;
  createdAt: string;
}

export interface CountryConfig {
  id: string;
  name: string;
  code: string;
  visaTypes: string[];
  requiredDocuments: string[];
  baseFee: number;
  tatDays: number;
  isActive: boolean;
}

// Mock data stores
class MockCRMStore {
  applications: VisaApplication[] = [];
  partners: Partner[] = [];
  walletTransactions: WalletTransaction[] = [];
  ocrResults: OCRResult[] = [];
  countryConfigs: CountryConfig[] = [];

  constructor() {
    this.initialize();
  }

  initialize() {
    // Initialize country configs (Dubai initially)
    this.countryConfigs = [
      {
        id: 'dubai',
        name: 'Dubai',
        code: 'AE',
        visaTypes: ['Tourist', 'Business', 'Transit'],
        requiredDocuments: ['Passport', 'Photo', 'Application Form'],
        baseFee: 150,
        tatDays: 3,
        isActive: true
      }
    ];

    // Generate mock partners
    const partnerNames = [
      'Travel Hub India', 'Global Tours Ltd', 'Desert Adventures', 'Emirates Travel Co',
      'Arabian Journeys', 'Dubai Express Tours', 'Middle East Travel', 'Luxury Travel Partners',
      'Desert Safari Tours', 'Gulf Travel Services', 'Oasis Travel', 'Camel Tours',
      'Desert Dreams', 'Arabian Nights Travel', 'Gulf Gateway Tours'
    ];

    for (let i = 0; i < 15; i++) {
      const partner: Partner = {
        id: `partner_${i + 1}`,
        companyName: partnerNames[i] || faker.company.name(),
        contactName: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        kycStatus: faker.helpers.arrayElement(['pending', 'verified', 'rejected']),
        kycVerifiedAt: faker.helpers.maybe(() => faker.date.past().toISOString(), { probability: 0.7 }),
        walletBalance: parseFloat(faker.commerce.price({ min: 0, max: 50000 })),
        totalApplications: faker.number.int({ min: 0, max: 100 }),
        activeApplications: faker.number.int({ min: 0, max: 20 }),
        country: 'India',
        status: faker.helpers.arrayElement(['active', 'inactive', 'suspended']),
        tags: faker.helpers.arrayElements(['VIP', 'Premium', 'Regular', 'New'], { min: 0, max: 2 }),
        createdAt: faker.date.past().toISOString(),
        updatedAt: faker.date.recent().toISOString()
      };
      this.partners.push(partner);
    }

    // Generate mock visa applications
    const statuses: ApplicationStatus[] = ['draft', 'submitted', 'qc-pending', 'payment-pending', 'ops-processing', 'posted', 'visa-ready', 'completed', 'rejected'];
    const buckets: StatusBucket[] = ['green', 'yellow', 'red'];
    const journeyTypes: JourneyType[] = ['diy', 'assisted'];

    for (let i = 0; i < 50; i++) {
      const status = faker.helpers.arrayElement(statuses);
      const bucket = faker.helpers.arrayElement(buckets);
      const journeyType = faker.helpers.arrayElement(journeyTypes);
      const partner = this.partners[Math.floor(Math.random() * this.partners.length)];
      const expectedTat = 3; // Dubai TAT
      const tatDays = faker.number.int({ min: 0, max: expectedTat + 2 });

      const application: VisaApplication = {
        id: `app_${i + 1}`,
        applicationNumber: `VISA-${faker.string.alphanumeric(8).toUpperCase()}`,
        partnerId: partner.id,
        partnerName: partner.companyName,
        country: 'Dubai',
        journeyType,
        status,
        bucket,
        ocrStatus: faker.helpers.arrayElement(['pending', 'processing', 'completed', 'failed', 'manual-review']),
        ocrCompletionPercent: faker.number.int({ min: 0, max: 100 }),
        tatDays,
        expectedTatDays: expectedTat,
        fee: parseFloat(faker.commerce.price({ min: 100, max: 500 })),
        paymentStatus: status === 'payment-pending' ? 'pending' : faker.helpers.arrayElement(['completed', 'pending', 'failed']),
        assignedTo: `ops_user_${Math.floor(Math.random() * 5) + 1}`, // Round-robin simulation
        submittedAt: status !== 'draft' ? faker.date.past().toISOString() : undefined,
        qcCompletedAt: ['ops-processing', 'posted', 'visa-ready', 'completed'].includes(status) ? faker.date.past().toISOString() : undefined,
        paymentReceivedAt: ['ops-processing', 'posted', 'visa-ready', 'completed'].includes(status) ? faker.date.past().toISOString() : undefined,
        opsProcessedAt: ['posted', 'visa-ready', 'completed'].includes(status) ? faker.date.past().toISOString() : undefined,
        visaPostedAt: ['visa-ready', 'completed'].includes(status) ? faker.date.past().toISOString() : undefined,
        visaReadyAt: status === 'completed' ? faker.date.past().toISOString() : undefined,
        createdAt: faker.date.past().toISOString(),
        updatedAt: faker.date.recent().toISOString()
      };
      this.applications.push(application);
    }

    // Generate wallet transactions
    for (let i = 0; i < 40; i++) {
      const partner = this.partners[Math.floor(Math.random() * this.partners.length)];
      const type = faker.helpers.arrayElement(['top-up', 'payment', 'refund']);
      const transaction: WalletTransaction = {
        id: `txn_${i + 1}`,
        partnerId: partner.id,
        type,
        amount: parseFloat(faker.commerce.price({ min: 100, max: 10000 })),
        status: faker.helpers.arrayElement(['completed', 'pending', 'failed']),
        method: faker.helpers.arrayElement(['gateway', 'bank-transfer', 'offline']),
        reference: `REF-${faker.string.alphanumeric(10).toUpperCase()}`,
        description: type === 'top-up' ? 'Wallet Top-up' : type === 'payment' ? 'Visa Application Payment' : 'Refund',
        createdAt: faker.date.past().toISOString()
      };
      this.walletTransactions.push(transaction);
    }

    // Generate OCR results
    for (let i = 0; i < 30; i++) {
      const application = this.applications[Math.floor(Math.random() * this.applications.length)];
      const ocrResult: OCRResult = {
        id: `ocr_${i + 1}`,
        applicationId: application.id,
        documentType: faker.helpers.arrayElement(['passport', 'photo', 'form', 'other']),
        status: application.ocrStatus,
        extractedData: application.ocrStatus === 'completed' ? {
          name: faker.person.fullName(),
          passportNumber: faker.string.alphanumeric(9).toUpperCase(),
          expiryDate: faker.date.future().toISOString().split('T')[0]
        } : undefined,
        confidence: faker.number.int({ min: 60, max: 100 }),
        processedAt: application.ocrStatus === 'completed' ? faker.date.past().toISOString() : undefined,
        createdAt: faker.date.past().toISOString()
      };
      this.ocrResults.push(ocrResult);
    }
  }

  // Application methods
  async getApplications(filters?: { status?: ApplicationStatus; bucket?: StatusBucket; journeyType?: JourneyType; country?: string }): Promise<VisaApplication[]> {
    await this.delay(300);
    let applications = [...this.applications];
    
    if (filters?.status) {
      applications = applications.filter(a => a.status === filters.status);
    }
    
    if (filters?.bucket) {
      applications = applications.filter(a => a.bucket === filters.bucket);
    }
    
    if (filters?.journeyType) {
      applications = applications.filter(a => a.journeyType === filters.journeyType);
    }
    
    if (filters?.country) {
      applications = applications.filter(a => a.country === filters.country);
    }
    
    return applications;
  }

  async getApplicationById(id: string): Promise<VisaApplication | null> {
    await this.delay(200);
    return this.applications.find(a => a.id === id) || null;
  }

  async getApplicationsByBucket(): Promise<{ green: number; yellow: number; red: number }> {
    await this.delay(200);
    return {
      green: this.applications.filter(a => a.bucket === 'green').length,
      yellow: this.applications.filter(a => a.bucket === 'yellow').length,
      red: this.applications.filter(a => a.bucket === 'red').length
    };
  }

  async getApplicationsByJourneyType(): Promise<{ diy: number; assisted: number }> {
    await this.delay(200);
    return {
      diy: this.applications.filter(a => a.journeyType === 'diy').length,
      assisted: this.applications.filter(a => a.journeyType === 'assisted').length
    };
  }

  async getApplicationsByStatus(): Promise<Record<ApplicationStatus, number>> {
    await this.delay(200);
    const statusCounts: Record<string, number> = {};
    this.applications.forEach(app => {
      statusCounts[app.status] = (statusCounts[app.status] || 0) + 1;
    });
    return statusCounts as Record<ApplicationStatus, number>;
  }

  // Partner methods
  async getPartners(filters?: { status?: string; kycStatus?: string; search?: string }): Promise<Partner[]> {
    await this.delay(300);
    let partners = [...this.partners];
    
    if (filters?.status) {
      partners = partners.filter(p => p.status === filters.status);
    }
    
    if (filters?.kycStatus) {
      partners = partners.filter(p => p.kycStatus === filters.kycStatus);
    }
    
    if (filters?.search) {
      const search = filters.search.toLowerCase();
      partners = partners.filter(p => 
        p.companyName.toLowerCase().includes(search) ||
        p.contactName.toLowerCase().includes(search) ||
        p.email.toLowerCase().includes(search)
      );
    }
    
    return partners;
  }

  async getPartnerById(id: string): Promise<Partner | null> {
    await this.delay(200);
    return this.partners.find(p => p.id === id) || null;
  }

  // Wallet methods
  async getWalletTransactions(partnerId?: string): Promise<WalletTransaction[]> {
    await this.delay(300);
    if (partnerId) {
      return this.walletTransactions.filter(t => t.partnerId === partnerId);
    }
    return [...this.walletTransactions];
  }

  async getWalletStats(): Promise<{ totalTopUps: number; totalPayments: number; totalRefunds: number }> {
    await this.delay(200);
    return {
      totalTopUps: this.walletTransactions.filter(t => t.type === 'top-up' && t.status === 'completed').reduce((sum, t) => sum + t.amount, 0),
      totalPayments: this.walletTransactions.filter(t => t.type === 'payment' && t.status === 'completed').reduce((sum, t) => sum + t.amount, 0),
      totalRefunds: this.walletTransactions.filter(t => t.type === 'refund' && t.status === 'completed').reduce((sum, t) => sum + t.amount, 0)
    };
  }

  // OCR methods
  async getOCRStats(): Promise<{ pending: number; processing: number; completed: number; failed: number; manualReview: number }> {
    await this.delay(200);
    return {
      pending: this.ocrResults.filter(o => o.status === 'pending').length,
      processing: this.ocrResults.filter(o => o.status === 'processing').length,
      completed: this.ocrResults.filter(o => o.status === 'completed').length,
      failed: this.ocrResults.filter(o => o.status === 'failed').length,
      manualReview: this.ocrResults.filter(o => o.status === 'manual-review').length
    };
  }

  async getAverageOCRCompletion(): Promise<number> {
    await this.delay(200);
    const completed = this.applications.filter(a => a.ocrStatus === 'completed');
    if (completed.length === 0) return 0;
    return completed.reduce((sum, a) => sum + a.ocrCompletionPercent, 0) / completed.length;
  }

  // TAT methods
  async getTATPerformance(): Promise<{ onTime: number; delayed: number; averageTat: number }> {
    await this.delay(200);
    const completed = this.applications.filter(a => a.status === 'completed');
    const onTime = completed.filter(a => a.tatDays <= a.expectedTatDays).length;
    const delayed = completed.filter(a => a.tatDays > a.expectedTatDays).length;
    const averageTat = completed.length > 0 
      ? completed.reduce((sum, a) => sum + a.tatDays, 0) / completed.length 
      : 0;
    return { onTime, delayed, averageTat };
  }

  // Country methods
  async getCountryConfigs(): Promise<CountryConfig[]> {
    await this.delay(200);
    return [...this.countryConfigs];
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const mockCRMStore = new MockCRMStore();
