import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, Loader2, Save, Plus, X } from 'lucide-react';
import { toast } from 'sonner';

const productSchema = z.object({
  id: z.string().min(1, 'Product ID is required').max(50, 'ID too long'),
  name: z.string().min(2, 'Name is required').max(200, 'Name too long'),
  price: z.number().min(0, 'Price must be positive'),
  original_price: z.number().min(0).nullable(),
  description: z.string().min(10, 'Description must be at least 10 characters').max(500, 'Description too long'),
  long_description: z.string().max(2000, 'Long description too long').nullable(),
  category: z.string().min(1, 'Category is required'),
  images: z.array(z.string()),
  material: z.string().max(200).nullable(),
  size: z.string().max(200).nullable(),
  care_instructions: z.string().max(500).nullable(),
  quantity: z.number().min(0, 'Quantity must be 0 or more'),
  is_bestseller: z.boolean(),
  is_new: z.boolean(),
  is_active: z.boolean(),
});

type ProductFormData = z.infer<typeof productSchema>;

const categories = [
  { value: 'vibrators', label: 'Vibrators' },
  { value: 'dildos', label: 'Dildos' },
  { value: 'plugs', label: 'Plugs' },
  { value: 'bondage-kits', label: 'Bondage Kits' },
  { value: 'roses-tools', label: 'Roses & Tools' },
  { value: 'couple-play', label: 'Couple Play' },
  { value: 'beginner-essentials', label: 'Beginner Essentials' },
  { value: 'luxury', label: 'Luxury' },
];

const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id && id !== 'new');

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<ProductFormData>({
    id: '',
    name: '',
    price: 0,
    original_price: null,
    description: '',
    long_description: '',
    category: '',
    images: [],
    material: '',
    size: '',
    care_instructions: '',
    quantity: 0,
    is_bestseller: false,
    is_new: false,
    is_active: true,
  });

  const [newImage, setNewImage] = useState('');

  useEffect(() => {
    if (isEditing && id) {
      fetchProduct(id);
    }
  }, [id, isEditing]);

  const fetchProduct = async (productId: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single();

      if (error) throw error;

      if (data) {
        setFormData({
          id: data.id,
          name: data.name,
          price: data.price,
          original_price: data.original_price,
          description: data.description,
          long_description: data.long_description || '',
          category: data.category,
          images: data.images || [],
          material: data.material || '',
          size: data.size || '',
          care_instructions: data.care_instructions || '',
          quantity: data.quantity || 0,
          is_bestseller: data.is_bestseller || false,
          is_new: data.is_new || false,
          is_active: data.is_active ?? true,
        });
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Failed to load product');
      navigate('/admin/products');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const validation = productSchema.safeParse(formData);
    if (!validation.success) {
      const newErrors: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        newErrors[err.path[0] as string] = err.message;
      });
      setErrors(newErrors);
      toast.error('Please fix the form errors');
      return;
    }

    setIsSaving(true);
    try {
      const productData = {
        id: formData.id,
        name: formData.name,
        price: formData.price,
        original_price: formData.original_price || null,
        description: formData.description,
        long_description: formData.long_description || null,
        category: formData.category,
        images: formData.images,
        material: formData.material || null,
        size: formData.size || null,
        care_instructions: formData.care_instructions || null,
        quantity: formData.quantity,
        is_bestseller: formData.is_bestseller,
        is_new: formData.is_new,
        is_active: formData.is_active,
      };

      if (isEditing) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', id);

        if (error) throw error;
        toast.success('Product updated successfully');
      } else {
        const { error } = await supabase
          .from('products')
          .insert(productData);

        if (error) {
          if (error.code === '23505') {
            setErrors({ id: 'A product with this ID already exists' });
            throw new Error('Duplicate product ID');
          }
          throw error;
        }
        toast.success('Product created successfully');
      }

      navigate('/admin/products');
    } catch (error) {
      console.error('Error saving product:', error);
      if (!(error instanceof Error && error.message === 'Duplicate product ID')) {
        toast.error('Failed to save product');
      }
    } finally {
      setIsSaving(false);
    }
  };

  const addImage = () => {
    if (newImage.trim()) {
      setFormData({ ...formData, images: [...formData.images, newImage.trim()] });
      setNewImage('');
    }
  };

  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => navigate('/admin/products')}
          className="text-foreground hover:bg-muted/50"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-serif text-foreground">
            {isEditing ? 'Edit Product' : 'New Product'}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <Card className="bg-card/80 border-border/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-foreground">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="id" className="text-foreground">Product ID</Label>
                <Input
                  id="id"
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  placeholder="e.g., vib-001"
                  disabled={isEditing}
                  className="bg-muted/50 border-border/50 text-foreground placeholder:text-muted-foreground"
                />
                {errors.id && <p className="text-sm text-destructive">{errors.id}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-foreground">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger className="bg-muted/50 border-border/50 text-foreground">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border/50">
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && <p className="text-sm text-destructive">{errors.category}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">Product Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter product name"
                className="bg-muted/50 border-border/50 text-foreground placeholder:text-muted-foreground"
              />
              {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price" className="text-foreground">Price (KSh)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                  placeholder="0"
                  className="bg-muted/50 border-border/50 text-foreground placeholder:text-muted-foreground"
                />
                {errors.price && <p className="text-sm text-destructive">{errors.price}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="original_price" className="text-foreground">Original Price (optional)</Label>
                <Input
                  id="original_price"
                  type="number"
                  value={formData.original_price || ''}
                  onChange={(e) => setFormData({ ...formData, original_price: parseFloat(e.target.value) || null })}
                  placeholder="For showing discount"
                  className="bg-muted/50 border-border/50 text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity" className="text-foreground">Quantity in Stock</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="0"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
                  placeholder="0"
                  className="bg-muted/50 border-border/50 text-foreground placeholder:text-muted-foreground"
                />
                {errors.quantity && <p className="text-sm text-destructive">{errors.quantity}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-foreground">Short Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief product description"
                rows={2}
                className="bg-muted/50 border-border/50 text-foreground placeholder:text-muted-foreground resize-none"
              />
              {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="long_description" className="text-foreground">Long Description</Label>
              <Textarea
                id="long_description"
                value={formData.long_description || ''}
                onChange={(e) => setFormData({ ...formData, long_description: e.target.value })}
                placeholder="Detailed product description"
                rows={4}
                className="bg-muted/50 border-border/50 text-foreground placeholder:text-muted-foreground resize-none"
              />
            </div>
          </CardContent>
        </Card>

        {/* Images */}
        <Card className="bg-card/80 border-border/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-foreground">Images</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                placeholder="Enter image URL or emoji"
                className="bg-muted/50 border-border/50 text-foreground placeholder:text-muted-foreground"
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addImage())}
              />
              <Button type="button" onClick={addImage} variant="outline" className="border-border/50">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {formData.images.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.images.map((img, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-lg border border-border/50"
                  >
                    <span className="text-foreground text-sm truncate max-w-[150px]">{img}</span>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Details */}
        <Card className="bg-card/80 border-border/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-foreground">Product Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="material" className="text-foreground">Material</Label>
                <Input
                  id="material"
                  value={formData.material || ''}
                  onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                  placeholder="e.g., Medical-grade silicone"
                  className="bg-muted/50 border-border/50 text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="size" className="text-foreground">Size</Label>
                <Input
                  id="size"
                  value={formData.size || ''}
                  onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                  placeholder="e.g., 18cm x 3.5cm"
                  className="bg-muted/50 border-border/50 text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="care_instructions" className="text-foreground">Care Instructions</Label>
              <Textarea
                id="care_instructions"
                value={formData.care_instructions || ''}
                onChange={(e) => setFormData({ ...formData, care_instructions: e.target.value })}
                placeholder="How to clean and maintain the product"
                rows={2}
                className="bg-muted/50 border-border/50 text-foreground placeholder:text-muted-foreground resize-none"
              />
            </div>
          </CardContent>
        </Card>

        {/* Status */}
        <Card className="bg-card/80 border-border/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-foreground">Status & Flags</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-foreground">Active</Label>
                <p className="text-sm text-muted-foreground">Product is visible in the store</p>
              </div>
              <Switch
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-foreground">Bestseller</Label>
                <p className="text-sm text-muted-foreground">Show in bestsellers section</p>
              </div>
              <Switch
                checked={formData.is_bestseller}
                onCheckedChange={(checked) => setFormData({ ...formData, is_bestseller: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-foreground">New Arrival</Label>
                <p className="text-sm text-muted-foreground">Show in new arrivals section</p>
              </div>
              <Switch
                checked={formData.is_new}
                onCheckedChange={(checked) => setFormData({ ...formData, is_new: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/admin/products')}
            className="border-border/50 text-foreground hover:bg-muted/50"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSaving}
            className="bg-primary hover:bg-primary/90 text-primary-foreground glow-button"
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                {isEditing ? 'Update Product' : 'Create Product'}
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
