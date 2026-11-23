export type BusinessStatus = 'approved' | 'pending' | 'draft' | 'rejected' | 'suspended';
export type VerificationStatus = 'verified' | 'pending' | 'unclaimed' | 'rejected';
export type PriceRange = '₹' | '₹₹' | '₹₹₹' | '₹₹₹₹';

export interface BusinessHours {
  day: string;
  open: string;
  close: string;
  isClosed?: boolean;
}

export interface Review {
  id: string;
  businessId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  helpfulCount?: number;
  verifiedCustomer: boolean;
  status?: 'active' | 'reported' | 'removed';
}

export interface Business {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: string;
  subcategory: string;
  description: string;
  locality: string;
  city: string;
  address: string;
  pincode: string;
  phone: string;
  email: string;
  website?: string;
  priceRange: PriceRange;
  rating: number;
  reviewCount: number;
  isOpenNow: boolean;
  listingStatus: BusinessStatus;
  verificationStatus: VerificationStatus;
  distanceKm: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  primaryImage: string;
  galleryImages: string[];
  hours: BusinessHours[];
  services: string[];
  amenities: string[];
  establishedYear: number;
  featured?: boolean;
  claimedBy?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  description: string;
  count: number;
  popularLocalities: string[];
  image: string;
}

export interface ClaimRequest {
  id: string;
  businessId: string;
  businessName: string;
  claimantName: string;
  claimantEmail: string;
  claimantPhone: string;
  designation: string;
  businessRegNumber?: string;
  evidenceType: 'business_card' | 'utility_bill' | 'registration_certificate' | 'authorization_letter';
  evidenceFileName: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected' | 'more_info_needed';
  notes?: string;
}

export interface ModerationReport {
  id: string;
  reviewId: string;
  businessId: string;
  businessName: string;
  reportedBy: string;
  reason: 'spam_fake' | 'offensive_language' | 'conflict_of_interest' | 'harassment' | 'off_topic';
  explanation: string;
  reportedAt: string;
  status: 'pending' | 'dismissed' | 'actioned';
  reviewPreview: {
    reviewerName: string;
    rating: number;
    comment: string;
  };
}

export interface AuditLog {
  id: string;
  timestamp: string;
  adminName: string;
  action: string;
  targetType: 'business' | 'claim' | 'review' | 'user';
  targetId: string;
  targetName: string;
  details: string;
}
