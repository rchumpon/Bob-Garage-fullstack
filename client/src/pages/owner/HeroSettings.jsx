import { useEffect, useState } from "react";
import hero_bg from "../../assets/hero_bg.jpg";
import { useAppContext } from "../../context/AppContext";
import { assets } from "../../data/data";
import toast from "react-hot-toast";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import Title from "../../components/owner/Title";

const HeroSettings = () => {
  const { axios, token } = useAppContext();

  // Store the current images from MySQL
  const [heroBackground, setHeroBackground] = useState(hero_bg);
  const [heroImage, setHeroImage] = useState(assets.hero_photo);

  // Store newly selected files
  const [backgroundFile, setBackgroundFile] = useState(null);
  const [heroFile, setHeroFile] = useState(null);

  // Store temporary preview URLs
  const [backgroundPreview, setBackGroundPreview] = useState("");
  const [heroPreview, setHeroPreview] = useState("");

  // Loading states
  const [isFetching, setIsFetching] = useState(true);
  const [savingBackground, setSavingBackground] = useState(false);
  const [savingHero, setSavingHero] = useState(false);

  // ==================================================
  // Fetch Current Hero Images
  // ==================================================
  useEffect(() => {
    const fetchHeroSettings = async () => {
      try {
        const { data } = await axios.get("/api/settings/hero");

        if (data.success) {
          setHeroBackground(data.heroBackground || hero_bg);
          setHeroImage(data.heroImage || assets.hero_photo);
        }
      } catch (error) {
        console.error("Failed to fetch hero settings:", error);
        toast.error("Failed to load hero settings");
      } finally {
        setIsFetching(false);
      }
    };

    fetchHeroSettings();
  }, [axios]);

  // ==================================================
  // Create and Clean Up Image Previews
  // ==================================================

  useEffect(() => {
    if (!backgroundFile) {
      setBackGroundPreview("");
      return;
    }

    const previewUrl = URL.createObjectURL(backgroundFile);
    setBackGroundPreview(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [backgroundFile]);

  useEffect(() => {
    if (!heroFile) {
      setHeroPreview("");
      return;
    }
    const previewUrl = URL.createObjectURL(heroFile);
    setHeroPreview(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [heroFile]);

  // ==================================================
  // Save an Image
  // ==================================================

  const saveImage = async (type) => {
    const isBackground = type === "background";
    const selectedFile = isBackground ? backgroundFile : heroFile;

    if (!selectedFile) {
      return toast.error("Please select an image");
    }

    // Match the allowed image types
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(selectedFile.type)) {
      return toast.error("Only JPEG, PNG and WebP images are allowed");
    }

    // Maximum file size: 5 MB
    if (selectedFile.size > 5 * 1024 * 1024) {
      return toast.error("Image must be smaller than 5 MB");
    }

    const setSaving = isBackground ? setSavingBackground : setSavingHero;

    const endpoint = isBackground
      ? "/api/settings/hero/background"
      : "/api/settings/hero/image";

    try {
      setSaving(true);

      // Prepare multipart formdata
      const formData = new FormData();
      formData.append("image", selectedFile);

      // Upload the image to the backend
      const { data } = await axios.put(endpoint, formData, {
        headers: { Authorization: token },
      });

      if (data.success) {
        // Update the current image using the saved URL
        if (isBackground) {
          setHeroBackground(data.heroBackground);
          setBackgroundFile(null);
        } else {
          setHeroImage(data.heroImage);
          setHeroFile(null);
        }
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Failed to update hero image:", error);

      toast.error(error.response?.data?.message || "Failed to upload image");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full min-w-0 px-4 py-6 sm:px-6 lg:px-10 pt-10">
      {/* Page Heading */}
      <div className="mb-8">
        <Title
          title="Hero Upload"
          subTitle="Manage the homepage background and hero images."
        />
        {/* <h1 className="text-2xl font-bold text-primary">Hero Settings</h1>
        <p className="text-muted-foreground/90">
          Manage the homepage background and hero images.
        </p> */}
      </div>
      {isFetching ? (
        <p className="text-muted-foreground">Loading hero settings...</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {/* Hero background image */}
          <div className="min-w-0 rounded-xl border border-border bg-card p-5 shadow-sm">
            <h2 className="mb-2 text-lg font-semibold text-foreground">
              Hero Background
            </h2>
            <p className="mb-5 text-sm text-muted-foreground">
              This image appears behind the homepage content.
            </p>

            {/* Background Preview */}
            <div>
              <img
                src={backgroundPreview || heroBackground}
                alt="Hero background preview"
                className="aspect-video w-full object-cover"
              />
            </div>

            {/* Upload Input */}
            <label className="mt-5 flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border p-5 text-sm text-foreground transition-colors hover:border-primary">
              <FaCloudUploadAlt className="h-5 w-5 text-primary" />
              <span>
                {backgroundFile
                  ? backgroundFile.name
                  : "Choose background image"}
              </span>
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.webp"
                className="hidden"
                onChange={(e) => setBackgroundFile(e.target.files?.[0] || null)}
              />
            </label>

            {/* Save Background */}
            <button
              type="button"
              onClick={() => saveImage("background")}
              disabled={!backgroundFile || savingBackground}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FaCheck />

              {savingBackground ? "Saving..." : "Save Background"}
            </button>
          </div>

          {/* Right side Hero image */}
          <div className="min-w-0 rounded-xl border border-border bg-card p-5 shadow-sm">
            <h2 className="mb-2 text-lg font-semibold text-foreground">
              Right-Side Hero Image
            </h2>

            <p className="mb-5 text-sm text-muted-foreground">
              This image appears on the right side of the homepage.
            </p>

            {/* Hero Image preview */}
            <div className="mx-auto max-w-xs overflow-hidden rounded-xl border border-border bg-background">
              <img
                src={heroPreview || heroImage}
                alt="Right side hero preview"
                className="aspect-4/5 w-full object-cover"
              />
            </div>

            {/* Upload input */}
            <label className="mt-5 flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border p-5 text-sm text-foreground transition-colors hover:border-primary">
              <FaCloudUploadAlt className="h-5 w-5 text-primary" />
              <span>{heroFile ? heroFile.name : "Choose hero image"}</span>

              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => setHeroFile(e.target.files?.[0] || null)}
              />
            </label>

            {/* Save Hero image */}
            <button
              type="button"
              onClick={() => saveImage("hero")}
              disabled={!heroFile || savingHero}
              className="mt-5 w-full flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-white font-medium transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FaCheck />
              {savingHero ? "Saving..." : "Save Hero Image"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default HeroSettings;
