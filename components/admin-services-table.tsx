"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal, Star } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import { getApiUrl, getImageUrl } from "@/lib/utils"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Separator } from "@/components/ui/separator"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"
import AdminGalleryManager from "./admin-gallery-manager"

interface Service {
  id: number
  name: string
  category: string
  description: string
  price: number
  rating: number
  status: string
  image: string
  images?: string // Added for gallery images
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export function AdminServicesTable() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const { toast } = useToast()
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [editLoading, setEditLoading] = useState(false)
  const [editError, setEditError] = useState("")
  const [editForm, setEditForm] = useState({ name: "", description: "", price: 0, category: "" })
  const [imagePreview, setImagePreview] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [imageLoading, setImageLoading] = useState(false)
  const [imageError, setImageError] = useState("")
  const [serviceToDelete, setServiceToDelete] = useState<Service | null>(null)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [deleteError, setDeleteError] = useState("")
  // 1. Restore state for image modal
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageService, setImageService] = useState<Service | null>(null);
  const [imageModalPreview, setImageModalPreview] = useState<string>("");
  const imageFileInputRef = useRef<HTMLInputElement>(null);
  const [imageModalLoading, setImageModalLoading] = useState(false);
  const [imageModalError, setImageModalError] = useState("");


  useEffect(() => {
    console.log("AdminServicesTable mounted")
    setLoading(true)
    fetch(getApiUrl("/api/services"))
      .then(res => res.json())
      .then(data => {
        setServices(data)
        setLoading(false)
      })
      .catch(() => {
        setError("Failed to fetch services")
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    console.log("editingService:", editingService)
  }, [editingService])


  if (loading) return <div>Loading services...</div>
  if (error) return <div className="text-red-500">{error}</div>

  const openEdit = (service: Service) => {
    console.log("openEdit called", service)
    setEditingService(service)
    setEditForm({
      name: service.name,
      description: service.description || "",
      price: service.price,
      category: service.category || "",
    })
    setImagePreview(service.image || "/placeholder.svg")
    setEditError("")
    setImageError("")
  }

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = ev => {
        setImagePreview(ev.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = ev => {
        setImagePreview(ev.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleEditSave = async () => {
    console.log("handleEditSave called", editForm)
    if (!editingService) return
    setEditLoading(true)
    setEditError("")
    try {
      // Convert price to number and ensure proper data types
      const requestData = {
        ...editForm,
        price: Number(editForm.price),
      }
      
      const url = getApiUrl(`/api/services/${editingService.id}`)
      const requestBody = JSON.stringify(requestData)
      console.log("Making request to:", url)
      console.log("Request body:", requestBody)
      
      const res = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: requestBody,
      })
      
      console.log("Response status:", res.status)
      console.log("Response headers:", Object.fromEntries(res.headers.entries()))
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        console.error("Service update failed:", res.status, errorData)
        throw new Error(errorData.error || "Failed to update service")
      }
      const updated = await res.json()
      console.log("Update successful:", updated)
      setServices(prev => prev.map(s => s.id === updated.id ? { ...s, ...updated } : s))
      setEditingService(null)
      toast({ title: "Service updated", description: updated.name })
    } catch (e) {
      console.error("Service update error:", e)
      setEditError("Could not update service")
    } finally {
      setEditLoading(false)
    }
  }

  const handleImageUpload = async () => {
    console.log("handleImageUpload called", fileInputRef.current?.files?.[0])
    if (!editingService || !fileInputRef.current?.files?.[0]) return
    setImageLoading(true)
    setImageError("")
    const formData = new FormData()
    formData.append("image", fileInputRef.current.files[0])
    try {
      const res = await fetch(getApiUrl(`/api/services/${editingService.id}/image`), {
        method: "POST",
        body: formData,
      })
      if (!res.ok) throw new Error("Failed to upload image")
      const updated = await res.json()
      setServices(prev => prev.map(s => s.id === updated.id ? { ...s, image: updated.image } : s))
      setImagePreview(updated.image || "/placeholder.svg")
      if (fileInputRef.current) fileInputRef.current.value = ""
    } catch (e) {
      setImageError("Could not upload image")
    } finally {
      setImageLoading(false)
    }
  }

  const handleImageRemove = async () => {
    console.log("handleImageRemove called")
    if (!editingService) return
    setImageLoading(true)
    setImageError("")
    try {
      const res = await fetch(getApiUrl(`/api/services/${editingService.id}/image`), { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to remove image")
      const updated = await res.json()
      setServices(prev => prev.map(s => s.id === updated.id ? { ...s, image: updated.image } : s))
      setImagePreview("/placeholder.svg")
    } catch (e) {
      setImageError("Could not remove image")
    } finally {
      setImageLoading(false)
    }
  }

  const openImageModal = (service: Service) => {
    setImageService(service);
    setShowImageModal(true);
    setImageModalPreview(service.image || "");
    setImageModalError("");
  };


  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Service</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.map((service) => (
            <TableRow key={service.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9 rounded-md">
                    <AvatarImage src={getImageUrl(service.image)} alt={service.name} />
                    <AvatarFallback className="rounded-md">{service.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="font-medium">{service.name}</div>
                </div>
              </TableCell>
              <TableCell className="capitalize">{service.category}</TableCell>
              <TableCell>${service.price}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                  {service.rating}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={service.status === "active" ? "default" : "secondary"}>{service.status}</Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => openEdit(service)}>Edit service</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => openImageModal(service)}>Edit images</DropdownMenuItem>
                    <DropdownMenuItem>View bookings</DropdownMenuItem>
                    <DropdownMenuItem>{service.status === "active" ? "Deactivate" : "Activate"}</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive" onClick={() => setServiceToDelete(service)}>
                      Delete service
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={!!editingService} onOpenChange={open => { if (!open) setEditingService(null) }}>
        <DialogContent className="max-h-[90vh] overflow-y-auto flex flex-col">
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
            <DialogDescription>Update service details.</DialogDescription>
          </DialogHeader>
          {/* Remove image editing section here */}
          <div className="flex-1 min-h-0">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block font-semibold mb-1">Name</label>
                <Input
                  name="name"
                  value={editForm.name}
                  onChange={handleEditChange}
                  placeholder="Service Name"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Category</label>
                <Input
                  name="category"
                  value={editForm.category}
                  placeholder="Category"
                  required
                  readOnly
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Price</label>
                <Input
                  name="price"
                  type="number"
                  value={editForm.price}
                  onChange={handleEditChange}
                  placeholder="Price"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Description</label>
                <textarea
                  name="description"
                  value={editForm.description}
                  onChange={handleEditChange}
                  placeholder="Description"
                  className="w-full border rounded px-2 py-1 text-sm"
                  rows={3}
                />
              </div>
              {editError && <div className="text-red-500 text-sm">{editError}</div>}
            </div>
          </div>
          <div className="sticky bottom-0 left-0 bg-background pt-4 pb-2 flex gap-2 justify-end z-10">
            <Button onClick={handleEditSave} disabled={editLoading} className="w-32">
              {editLoading ? <span className="flex items-center gap-2"><span className="loader border-t-2 border-b-2 border-white rounded-full w-4 h-4 animate-spin"></span>Saving...</span> : "Save Changes"}
            </Button>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
      {/* Restore Edit Image Modal */}
      <Dialog open={showImageModal} onOpenChange={open => { if (!open) { setShowImageModal(false); setImageService(null); } }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Service Images</DialogTitle>
            <DialogDescription>Manage the main image and gallery for this service.</DialogDescription>
          </DialogHeader>
          {imageService && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Main Image</h3>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-32 h-32 rounded-lg overflow-hidden border bg-muted flex items-center justify-center">
                    <img src={getImageUrl(imageModalPreview)} alt="Service" className="object-cover w-full h-full" />
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button
                      className="px-3 py-1 rounded bg-blue-600 text-white text-xs"
                      onClick={() => imageFileInputRef.current?.click()}
                      disabled={imageModalLoading}
                    >
                      {imageModalLoading ? "Uploading..." : "Upload/Replace"}
                    </button>
                    <button
                      className="px-3 py-1 rounded bg-red-600 text-white text-xs"
                      onClick={async () => {
                        setImageModalLoading(true);
                        setImageModalError("");
                        try {
                          const res = await fetch(getApiUrl(`/api/services/${imageService.id}/image`), { method: "DELETE" });
                          if (!res.ok) throw new Error("Failed to remove image");
                          setServices(prev => prev.map(s => s.id === imageService.id ? { ...s, image: "" } : s));
                          setImageModalPreview("");
                        } catch (e) {
                          setImageModalError("Could not remove image");
                        } finally {
                          setImageModalLoading(false);
                        }
                      }}
                      disabled={imageModalLoading || (imageService.image === "/placeholder.svg")}
                    >
                      {imageModalLoading ? "Removing..." : "Remove"}
                    </button>
                  </div>
                  <input
                    ref={imageFileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = ev => {
                          setImageModalPreview(ev.target?.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  {imageFileInputRef.current?.files?.[0] && (
                    <button
                      className="mt-2 px-3 py-1 rounded bg-green-600 text-white text-xs"
                      onClick={async () => {
                        if (!imageFileInputRef.current?.files?.[0]) return;
                        setImageModalLoading(true);
                        setImageModalError("");
                        const formData = new FormData();
                        formData.append("image", imageFileInputRef.current.files[0]);
                        try {
                          const res = await fetch(getApiUrl(`/api/services/${imageService.id}/image`), {
                            method: "POST",
                            body: formData,
                          });
                          if (!res.ok) throw new Error("Failed to upload image");
                          const updated = await res.json();
                          setServices(prev => prev.map(s => s.id === updated.id ? { ...s, image: updated.image } : s));
                          setImageModalPreview(updated.image || "/placeholder.svg");
                          if (imageFileInputRef.current) imageFileInputRef.current.value = "";
                        } catch (e) {
                          setImageModalError("Could not upload image");
                        } finally {
                          setImageModalLoading(false);
                        }
                      }}
                      disabled={imageModalLoading}
                    >
                      {imageModalLoading ? "Saving..." : "Save New Image"}
                    </button>
                  )}
                  {imageModalError && <div className="text-red-500 text-sm mt-2">{imageModalError}</div>}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2 mt-4">Gallery Images</h3>
                <AdminGalleryManager
                  serviceId={imageService.id}
                  initialImages={imageService.images ? imageService.images.split(',').filter(Boolean) : []}
                  onGalleryChange={newImages => {
                    setServices(prev => prev.map(s => s.id === imageService.id ? { ...s, images: newImages.join(',') } : s));
                  }}
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog rendered outside the table */}
      <AlertDialog open={!!serviceToDelete} onOpenChange={open => { if (!open) setServiceToDelete(null) }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Service</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <b>{serviceToDelete?.name}</b>? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setServiceToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                if (!serviceToDelete) return
                setDeleteLoading(true)
                setDeleteError("")
                try {
                  const res = await fetch(getApiUrl(`/api/services/${serviceToDelete.id}`), { method: "DELETE" })
                  if (!res.ok) {
                    let errorMsg = "Failed to delete service"
                    try {
                      const data = await res.json()
                      if (data && data.error) errorMsg = data.error
                    } catch {}
                    alert(errorMsg)
                    return
                  }
                  setServices(prev => prev.filter(s => s.id !== serviceToDelete.id))
                  setServiceToDelete(null)
                } catch (e) {
                  alert("Could not delete service")
                } finally {
                  setDeleteLoading(false)
                }
              }}
              disabled={deleteLoading}
            >
              {deleteLoading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
