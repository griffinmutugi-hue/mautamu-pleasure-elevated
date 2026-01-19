import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Loader2, Save } from 'lucide-react';
import { toast } from 'sonner';

const collectionSchema = z.object({
  name: z.string().min(2, 'Name is required').max(100, 'Name too long'),
  slug: z.string().min(2, 'Slug is required').max(50, 'Slug too long').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase letters, numbers, and hyphens only'),
  description: z.string().max(500, 'Description too long').nullable(),
  emoji: z.string().max(10, 'Emoji too long').nullable(),
  display_order: z.number().min(0, 'Order must be 0 or more'),
  is_active: z.boolean(),
});

type CollectionFormData = z.infer<typeof collectionSchema>;

const CollectionForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id && id !== 'new');

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<CollectionFormData>({
    name: '',
    slug: '',
    description: '',
    emoji: '✨',
    display_order: 0,
    is_active: true,
  });

  useEffect(() => {
    if (isEditing && id) {
      fetchCollection(id);
    }
  }, [id, isEditing]);

  const fetchCollection = async (collectionId: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('collections')
        .select('*')
        .eq('id', collectionId)
        .single();

      if (error) throw error;

      if (data) {
        setFormData({
          name: data.name,
          slug: data.slug,
          description: data.description || '',
          emoji: data.emoji || '✨',
          display_order: data.display_order || 0,
          is_active: data.is_active ?? true,
        });
      }
    } catch (error) {
      console.error('Error fetching collection:', error);
      toast.error('Failed to load collection');
      navigate('/admin/collections');
    } finally {
      setIsLoading(false);
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleNameChange = (name: string) => {
    setFormData({
      ...formData,
      name,
      slug: isEditing ? formData.slug : generateSlug(name),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const validation = collectionSchema.safeParse(formData);
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
      const collectionData = {
        name: formData.name,
        slug: formData.slug,
        description: formData.description || null,
        emoji: formData.emoji || '✨',
        display_order: formData.display_order,
        is_active: formData.is_active,
      };

      if (isEditing) {
        const { error } = await supabase
          .from('collections')
          .update(collectionData)
          .eq('id', id);

        if (error) throw error;
        toast.success('Collection updated successfully');
      } else {
        const { error } = await supabase
          .from('collections')
          .insert(collectionData);

        if (error) {
          if (error.code === '23505') {
            setErrors({ slug: 'A collection with this slug already exists' });
            throw new Error('Duplicate slug');
          }
          throw error;
        }
        toast.success('Collection created successfully');
      }

      navigate('/admin/collections');
    } catch (error) {
      console.error('Error saving collection:', error);
      if (!(error instanceof Error && error.message === 'Duplicate slug')) {
        toast.error('Failed to save collection');
      }
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => navigate('/admin/collections')}
          className="text-foreground hover:bg-muted/50"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-serif text-foreground">
            {isEditing ? 'Edit Collection' : 'New Collection'}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <Card className="bg-card/80 border-border/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-foreground">Collection Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g., Vibrators"
                  className="bg-muted/50 border-border/50 text-foreground placeholder:text-muted-foreground"
                />
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug" className="text-foreground">Slug (URL path)</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="e.g., vibrators"
                  className="bg-muted/50 border-border/50 text-foreground placeholder:text-muted-foreground"
                />
                {errors.slug && <p className="text-sm text-destructive">{errors.slug}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="emoji" className="text-foreground">Emoji Icon</Label>
                <Input
                  id="emoji"
                  value={formData.emoji || ''}
                  onChange={(e) => setFormData({ ...formData, emoji: e.target.value })}
                  placeholder="e.g., 💫"
                  className="bg-muted/50 border-border/50 text-foreground placeholder:text-muted-foreground text-2xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="display_order" className="text-foreground">Display Order</Label>
                <Input
                  id="display_order"
                  type="number"
                  min="0"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                  placeholder="0"
                  className="bg-muted/50 border-border/50 text-foreground placeholder:text-muted-foreground"
                />
                {errors.display_order && <p className="text-sm text-destructive">{errors.display_order}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-foreground">Description</Label>
              <Textarea
                id="description"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description for the collection"
                rows={3}
                className="bg-muted/50 border-border/50 text-foreground placeholder:text-muted-foreground resize-none"
              />
              {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
            </div>
          </CardContent>
        </Card>

        {/* Status */}
        <Card className="bg-card/80 border-border/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-foreground">Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-foreground">Active</Label>
                <p className="text-sm text-muted-foreground">Collection is visible on the store</p>
              </div>
              <Switch
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/admin/collections')}
            className="border-border/50"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSaving}
            className="bg-primary hover:bg-primary/90"
          >
            {isSaving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            <Save className="h-4 w-4 mr-2" />
            {isEditing ? 'Update Collection' : 'Create Collection'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CollectionForm;
