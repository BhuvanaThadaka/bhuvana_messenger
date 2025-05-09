
import { useState, useEffect } from "react";
import { getSettings, updateSettings, uploadLogo, uploadFavicon, WebsiteSettings as SettingsType } from "@/services/mockSettingsService";
import { useToast } from "@/hooks/use-toast";
import WebsiteSettings from "@/components/settings/WebsiteSettings";
import { Skeleton } from "@/components/ui/skeleton";

const Settings = () => {
  const [settings, setSettings] = useState<SettingsType | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        const response = await getSettings();
        if (response.success) {
          setSettings(response.data);
        } else {
          toast({
            title: "Error",
            description: "Failed to load settings. Please try again.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [toast]);

  const handleUpdateSettings = async (data: Partial<SettingsType>) => {
    setLoading(true);
    try {
      const response = await updateSettings(data);
      if (response.success) {
        setSettings(response.data);
        return true;
      } else {
        toast({
          title: "Error",
          description: "Failed to update settings. Please try again.",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      console.error("Error updating settings:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleUploadLogo = async (file: File) => {
    setLoading(true);
    try {
      const response = await uploadLogo(file);
      if (response.success) {
        setSettings(prev => prev ? { ...prev, logo: response.data.logoUrl } : null);
        return true;
      } else {
        toast({
          title: "Error",
          description: "Failed to upload logo. Please try again.",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      console.error("Error uploading logo:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleUploadFavicon = async (file: File) => {
    setLoading(true);
    try {
      const response = await uploadFavicon(file);
      if (response.success) {
        setSettings(prev => prev ? { ...prev, favicon: response.data.faviconUrl } : null);
        return true;
      } else {
        toast({
          title: "Error", 
          description: "Failed to upload favicon. Please try again.",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      console.error("Error uploading favicon:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 space-y-4 p-6">
      {loading && !settings ? (
        <div className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-[600px] w-full" />
        </div>
      ) : settings ? (
        <WebsiteSettings 
          settings={settings}
          isLoading={loading}
          onUpdateSettings={handleUpdateSettings}
          onUploadLogo={handleUploadLogo}
          onUploadFavicon={handleUploadFavicon}
        />
      ) : (
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Failed to load settings. Please refresh the page.</p>
        </div>
      )}
    </div>
  );
};

export default Settings;
