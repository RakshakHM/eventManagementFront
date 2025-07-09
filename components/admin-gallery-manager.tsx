import React, { useState, useRef } from "react";
import { getApiUrl, getImageUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface AdminGalleryManagerProps {
  serviceId: number;
  initialImages: string[];
  onGalleryChange: (images: string[]) => void;
}

const MAX_GALLERY_IMAGES = 4;

const AdminGalleryManager: React.FC<AdminGalleryManagerProps> = ({ serviceId, initialImages, onGalleryChange }) => {
  const [galleryImages, setGalleryImages] = useState<string[]>(initialImages);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleFilesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    if (galleryImages.length >= MAX_GALLERY_IMAGES) {
      setError("You can only have up to 4 gallery images.");
      return;
    }
    setLoading(true);
    setError("");
    // Only upload up to the remaining slots
    const filesToUpload = Array.from(e.target.files).slice(0, MAX_GALLERY_IMAGES - galleryImages.length);
    const formData = new FormData();
    filesToUpload.forEach(file => formData.append("images", file));
    try {
      const res = await fetch(getApiUrl(`/api/services/${serviceId}/gallery`), {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to upload images");
      const updated = await res.json();
      const newImages = updated.images ? updated.images.split(",").filter(Boolean) : [];
      setGalleryImages(newImages);
      onGalleryChange(newImages);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (e) {
      setError("Could not upload images");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (img: string) => {
    setLoading(true);
    setError("");
    const imageName = img.split("/").pop();
    try {
      const res = await fetch(getApiUrl(`/api/services/${serviceId}/gallery/${imageName}`), {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to remove image");
      const updated = await res.json();
      const newImages = updated.images ? updated.images.split(",").filter(Boolean) : [];
      setGalleryImages(newImages);
      onGalleryChange(newImages);
    } catch (e) {
      setError("Could not remove image");
    } finally {
      setLoading(false);
    }
  };

  // Drag-and-drop reorder (UI and backend PATCH)
  const handleDragStart = (index: number) => setDraggedIndex(index);
  const handleDragOver = (index: number) => {
    if (draggedIndex === null || draggedIndex === index) return;
    const newImages = [...galleryImages];
    const [removed] = newImages.splice(draggedIndex, 1);
    newImages.splice(index, 0, removed);
    setDraggedIndex(index);
    setGalleryImages(newImages);
    onGalleryChange(newImages);
  };
  const handleDragEnd = async () => {
    setDraggedIndex(null);
    // PATCH to backend for persistent reorder
    try {
      // First image is main, rest are gallery
      const [main, ...gallery] = galleryImages;
      await fetch(getApiUrl(`/api/services/${serviceId}`), {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: main, images: gallery }),
      });
    } catch (e) {
      // Optionally handle error
    }
  };

  return (
    <div>
      <div className="flex gap-2 flex-wrap mb-2">
        {galleryImages.map((img, idx) => (
          <div
            key={img + '-' + idx}
            className="w-20 h-20 rounded-lg overflow-hidden border bg-muted flex items-center justify-center relative cursor-move"
            draggable
            onDragStart={() => handleDragStart(idx)}
            onDragOver={e => { e.preventDefault(); handleDragOver(idx); }}
            onDragEnd={handleDragEnd}
          >
            <img src={getImageUrl(img)} alt="Gallery" className="object-cover w-full h-full" />
            <button
              className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
              onClick={() => handleRemove(img)}
              disabled={loading}
            >×</button>
          </div>
        ))}
        <label className="w-20 h-20 rounded-lg border-dashed border-2 border-primary flex items-center justify-center text-2xl text-primary cursor-pointer">
          +
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFilesChange}
            disabled={loading || galleryImages.length >= MAX_GALLERY_IMAGES}
          />
        </label>
      </div>
      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      {galleryImages.length >= MAX_GALLERY_IMAGES && (
        <div className="text-yellow-600 text-xs mt-1">Maximum of 4 gallery images allowed.</div>
      )}
    </div>
  );
};

export default AdminGalleryManager; 