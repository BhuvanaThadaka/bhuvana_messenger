
import { apiResponse, delay, showSuccessToast, showErrorToast } from './mockApiService';

export interface WebsiteSettings {
  siteName: string;
  tagline: string;
  description: string;
  logo: string | null;
  favicon: string | null;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialLinks: {
    facebookUrl: string;
    twitterUrl: string;
    linkedinUrl: string;
    instagramUrl: string;
  };
  preferences: {
    enableDarkMode: boolean;
    enableNotifications: boolean;
    showPricing: boolean;
    showBlog: boolean;
  };
}

// Mock settings data
let mockSettings: WebsiteSettings = {
  siteName: "LegalCase Pro",
  tagline: "Simplifying legal practice management",
  description: "A modern platform for law firms to manage cases, clients, and documents",
  logo: null,
  favicon: null,
  contactEmail: "info@legalcasepro.com",
  contactPhone: "+1 (555) 123-4567",
  address: "123 Legal Avenue, Suite 500, New York, NY 10001",
  socialLinks: {
    facebookUrl: "https://facebook.com/legalcasepro",
    twitterUrl: "https://twitter.com/legalcasepro",
    linkedinUrl: "https://linkedin.com/company/legalcasepro",
    instagramUrl: "https://instagram.com/legalcasepro",
  },
  preferences: {
    enableDarkMode: true,
    enableNotifications: true,
    showPricing: true,
    showBlog: true,
  },
};

// Get website settings
export const getSettings = async () => {
  await delay(600);
  
  console.log('[MockAPI] GET /api/settings', mockSettings);
  
  return apiResponse(mockSettings);
};

// Update website settings
export const updateSettings = async (data: Partial<WebsiteSettings>) => {
  await delay(800);
  
  try {
    // Handle nested updates for socialLinks and preferences
    if (data.socialLinks) {
      mockSettings.socialLinks = {
        ...mockSettings.socialLinks,
        ...data.socialLinks,
      };
      delete data.socialLinks;
    }
    
    if (data.preferences) {
      mockSettings.preferences = {
        ...mockSettings.preferences,
        ...data.preferences,
      };
      delete data.preferences;
    }
    
    // Update top-level fields
    mockSettings = {
      ...mockSettings,
      ...data,
    };
    
    console.log('[MockAPI] PUT /api/settings/update', mockSettings);
    showSuccessToast("Settings updated successfully");
    
    return apiResponse(mockSettings);
  } catch (error) {
    showErrorToast("Error updating settings. Please try again.");
    return apiResponse(null, false, "Error updating settings");
  }
};

// Upload logo
export const uploadLogo = async (file: File) => {
  await delay(1200);
  
  try {
    // In a real app, this would upload the file to a server
    // For mock purposes, we'll create a fake URL
    const logoUrl = URL.createObjectURL(file);
    
    mockSettings.logo = logoUrl;
    
    console.log('[MockAPI] POST /api/settings/upload-logo', { logoUrl });
    showSuccessToast("Logo uploaded successfully");
    
    return apiResponse({ logoUrl });
  } catch (error) {
    showErrorToast("Error uploading logo. Please try again.");
    return apiResponse(null, false, "Error uploading logo");
  }
};

// Upload favicon
export const uploadFavicon = async (file: File) => {
  await delay(1000);
  
  try {
    // In a real app, this would upload the file to a server
    // For mock purposes, we'll create a fake URL
    const faviconUrl = URL.createObjectURL(file);
    
    mockSettings.favicon = faviconUrl;
    
    console.log('[MockAPI] POST /api/settings/upload-favicon', { faviconUrl });
    showSuccessToast("Favicon uploaded successfully");
    
    return apiResponse({ faviconUrl });
  } catch (error) {
    showErrorToast("Error uploading favicon. Please try again.");
    return apiResponse(null, false, "Error uploading favicon");
  }
};
