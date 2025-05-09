
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button"; // Added Button import
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { WebsiteSettings as SettingsType } from "@/services/mockSettingsService";

interface WebsiteSettingsProps {
  settings: SettingsType;
  isLoading: boolean;
  onUpdateSettings: (data: Partial<SettingsType>) => Promise<boolean>;
  onUploadLogo: (file: File) => Promise<boolean>;
  onUploadFavicon: (file: File) => Promise<boolean>;
}

const WebsiteSettings: React.FC<WebsiteSettingsProps> = ({
  settings,
  isLoading,
  onUpdateSettings,
  onUploadLogo,
  onUploadFavicon,
}) => {
  const [activeTab, setActiveTab] = useState("general");
  const [generalForm, setGeneralForm] = useState({
    siteName: settings.siteName,
    tagline: settings.tagline,
    description: settings.description,
    contactEmail: settings.contactEmail,
    contactPhone: settings.contactPhone,
    address: settings.address,
  });
  const [socialForm, setSocialForm] = useState({
    facebookUrl: settings.socialLinks.facebookUrl,
    twitterUrl: settings.socialLinks.twitterUrl,
    linkedinUrl: settings.socialLinks.linkedinUrl,
    instagramUrl: settings.socialLinks.instagramUrl,
  });
  const [preferenceForm, setPreferenceForm] = useState({
    enableDarkMode: settings.preferences.enableDarkMode,
    enableNotifications: settings.preferences.enableNotifications,
    showPricing: settings.preferences.showPricing,
    showBlog: settings.preferences.showBlog,
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setGeneralForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSocialForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePreferenceChange = (name: string, value: boolean) => {
    setPreferenceForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogoFile(e.target.files[0]);
    }
  };

  const handleFaviconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFaviconFile(e.target.files[0]);
    }
  };

  const handleSaveGeneral = async () => {
    setIsSaving(true);
    try {
      await onUpdateSettings(generalForm);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveSocial = async () => {
    setIsSaving(true);
    try {
      await onUpdateSettings({
        socialLinks: socialForm,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSavePreferences = async () => {
    setIsSaving(true);
    try {
      await onUpdateSettings({
        preferences: preferenceForm,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleUploadLogo = async () => {
    if (!logoFile) return;

    setIsUploading(true);
    try {
      await onUploadLogo(logoFile);
      setLogoFile(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleUploadFavicon = async () => {
    if (!faviconFile) return;

    setIsUploading(true);
    try {
      await onUploadFavicon(faviconFile);
      setFaviconFile(null);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Website Settings</h2>
        <p className="text-muted-foreground mt-2">
          Manage your website's configuration and appearance
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Information</CardTitle>
              <CardDescription>
                Basic information about your website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    name="siteName"
                    value={generalForm.siteName}
                    onChange={handleGeneralChange}
                    disabled={isLoading || isSaving}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tagline">Tagline</Label>
                  <Input
                    id="tagline"
                    name="tagline"
                    value={generalForm.tagline}
                    onChange={handleGeneralChange}
                    disabled={isLoading || isSaving}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  name="description"
                  value={generalForm.description}
                  onChange={handleGeneralChange}
                  disabled={isLoading || isSaving}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    value={generalForm.contactEmail}
                    onChange={handleGeneralChange}
                    disabled={isLoading || isSaving}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Contact Phone</Label>
                  <Input
                    id="contactPhone"
                    name="contactPhone"
                    value={generalForm.contactPhone}
                    onChange={handleGeneralChange}
                    disabled={isLoading || isSaving}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={generalForm.address}
                  onChange={handleGeneralChange}
                  disabled={isLoading || isSaving}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveGeneral} disabled={isLoading || isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Logo</CardTitle>
              <CardDescription>Upload your website logo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-8">
                <div className="bg-muted rounded-md flex items-center justify-center w-32 h-32">
                  {settings.logo ? (
                    <img src={settings.logo} alt="Logo" className="max-w-full max-h-full" />
                  ) : (
                    <span className="text-muted-foreground">No logo</span>
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor="logoUpload">Upload New Logo</Label>
                  <Input
                    id="logoUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    disabled={isLoading || isUploading}
                  />
                  <p className="text-xs text-muted-foreground">
                    Recommended size: 250x80 pixels. Max file size: 2MB.
                  </p>
                </div>
              </div>
              <div className="flex justify-end">
                <Button 
                  onClick={handleUploadLogo} 
                  disabled={isLoading || isUploading || !logoFile}
                >
                  {isUploading ? "Uploading..." : "Upload Logo"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Favicon</CardTitle>
              <CardDescription>Upload your website favicon</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-8">
                <div className="bg-muted rounded-md flex items-center justify-center w-16 h-16">
                  {settings.favicon ? (
                    <img src={settings.favicon} alt="Favicon" className="max-w-full max-h-full" />
                  ) : (
                    <span className="text-muted-foreground text-xs">No favicon</span>
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor="faviconUpload">Upload New Favicon</Label>
                  <Input
                    id="faviconUpload"
                    type="file"
                    accept="image/x-icon,image/png"
                    onChange={handleFaviconChange}
                    disabled={isLoading || isUploading}
                  />
                  <p className="text-xs text-muted-foreground">
                    Recommended size: 32x32 pixels. Format: ICO, PNG. Max file size: 1MB.
                  </p>
                </div>
              </div>
              <div className="flex justify-end">
                <Button 
                  onClick={handleUploadFavicon} 
                  disabled={isLoading || isUploading || !faviconFile}
                >
                  {isUploading ? "Uploading..." : "Upload Favicon"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Social Media Links</CardTitle>
              <CardDescription>
                Connect your social media accounts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="facebookUrl">Facebook URL</Label>
                <Input
                  id="facebookUrl"
                  name="facebookUrl"
                  value={socialForm.facebookUrl}
                  onChange={handleSocialChange}
                  placeholder="https://facebook.com/yourpage"
                  disabled={isLoading || isSaving}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitterUrl">Twitter URL</Label>
                <Input
                  id="twitterUrl"
                  name="twitterUrl"
                  value={socialForm.twitterUrl}
                  onChange={handleSocialChange}
                  placeholder="https://twitter.com/yourhandle"
                  disabled={isLoading || isSaving}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                <Input
                  id="linkedinUrl"
                  name="linkedinUrl"
                  value={socialForm.linkedinUrl}
                  onChange={handleSocialChange}
                  placeholder="https://linkedin.com/company/yourcompany"
                  disabled={isLoading || isSaving}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagramUrl">Instagram URL</Label>
                <Input
                  id="instagramUrl"
                  name="instagramUrl"
                  value={socialForm.instagramUrl}
                  onChange={handleSocialChange}
                  placeholder="https://instagram.com/yourhandle"
                  disabled={isLoading || isSaving}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSocial} disabled={isLoading || isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Site Preferences</CardTitle>
              <CardDescription>
                Control your website features and appearance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between space-x-2">
                <div>
                  <Label htmlFor="darkMode">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow users to switch to dark mode
                  </p>
                </div>
                <Switch
                  id="darkMode"
                  checked={preferenceForm.enableDarkMode}
                  onCheckedChange={(checked) =>
                    handlePreferenceChange("enableDarkMode", checked)
                  }
                  disabled={isLoading || isSaving}
                />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <div>
                  <Label htmlFor="notifications">Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Show notifications on the website
                  </p>
                </div>
                <Switch
                  id="notifications"
                  checked={preferenceForm.enableNotifications}
                  onCheckedChange={(checked) =>
                    handlePreferenceChange("enableNotifications", checked)
                  }
                  disabled={isLoading || isSaving}
                />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <div>
                  <Label htmlFor="showPricing">Show Pricing</Label>
                  <p className="text-sm text-muted-foreground">
                    Display pricing information on the website
                  </p>
                </div>
                <Switch
                  id="showPricing"
                  checked={preferenceForm.showPricing}
                  onCheckedChange={(checked) =>
                    handlePreferenceChange("showPricing", checked)
                  }
                  disabled={isLoading || isSaving}
                />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <div>
                  <Label htmlFor="showBlog">Show Blog</Label>
                  <p className="text-sm text-muted-foreground">
                    Display blog section on the website
                  </p>
                </div>
                <Switch
                  id="showBlog"
                  checked={preferenceForm.showBlog}
                  onCheckedChange={(checked) =>
                    handlePreferenceChange("showBlog", checked)
                  }
                  disabled={isLoading || isSaving}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSavePreferences} disabled={isLoading || isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WebsiteSettings;
