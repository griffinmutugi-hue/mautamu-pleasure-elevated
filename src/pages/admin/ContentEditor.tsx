import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Save, Loader2, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { useAllContent, useUpdateContent, useUpsertContent, SiteContent } from '@/hooks/useSiteContent';

const ContentEditor = () => {
  const { data: allContent = [], isLoading } = useAllContent();
  const updateContent = useUpdateContent();
  const upsertContent = useUpsertContent();
  
  const [editedValues, setEditedValues] = useState<Record<string, string>>({});
  const [newContent, setNewContent] = useState({ page: '', section: '', key: '', value: '' });
  const [showNewForm, setShowNewForm] = useState(false);

  // Group content by page and section
  const groupedContent = allContent.reduce((acc, item) => {
    if (!acc[item.page]) {
      acc[item.page] = {};
    }
    if (!acc[item.page][item.section]) {
      acc[item.page][item.section] = [];
    }
    acc[item.page][item.section].push(item);
    return acc;
  }, {} as Record<string, Record<string, SiteContent[]>>);

  const handleValueChange = (id: string, value: string) => {
    setEditedValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = async (item: SiteContent) => {
    const newValue = editedValues[item.id];
    if (newValue === undefined || newValue === item.content_value) {
      toast.info('No changes to save');
      return;
    }

    try {
      await updateContent.mutateAsync({ id: item.id, content_value: newValue });
      setEditedValues((prev) => {
        const updated = { ...prev };
        delete updated[item.id];
        return updated;
      });
      toast.success('Content updated successfully');
    } catch (error) {
      console.error('Error updating content:', error);
      toast.error('Failed to update content');
    }
  };

  const handleAddNew = async () => {
    if (!newContent.page || !newContent.section || !newContent.key || !newContent.value) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await upsertContent.mutateAsync({
        page: newContent.page.toLowerCase(),
        section: newContent.section.toLowerCase(),
        content_key: newContent.key.toLowerCase().replace(/\s+/g, '_'),
        content_value: newContent.value,
      });
      setNewContent({ page: '', section: '', key: '', value: '' });
      setShowNewForm(false);
      toast.success('Content added successfully');
    } catch (error) {
      console.error('Error adding content:', error);
      toast.error('Failed to add content');
    }
  };

  const formatLabel = (key: string) => {
    return key
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64 mt-2" />
          </div>
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif text-foreground">Content Editor</h1>
          <p className="text-muted-foreground mt-1">
            Edit website text content across all pages
          </p>
        </div>
        <Button onClick={() => setShowNewForm(!showNewForm)} className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Content
        </Button>
      </div>

      {/* Add New Content Form */}
      {showNewForm && (
        <Card className="bg-card/80 border-border/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-foreground">Add New Content</CardTitle>
            <CardDescription>Create a new content entry for your website</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-foreground">Page</Label>
                <Input
                  value={newContent.page}
                  onChange={(e) => setNewContent({ ...newContent, page: e.target.value })}
                  placeholder="e.g., home, about"
                  className="bg-muted/50 border-border/50"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Section</Label>
                <Input
                  value={newContent.section}
                  onChange={(e) => setNewContent({ ...newContent, section: e.target.value })}
                  placeholder="e.g., hero, footer"
                  className="bg-muted/50 border-border/50"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Key</Label>
                <Input
                  value={newContent.key}
                  onChange={(e) => setNewContent({ ...newContent, key: e.target.value })}
                  placeholder="e.g., title, description"
                  className="bg-muted/50 border-border/50"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-foreground">Value</Label>
              <Textarea
                value={newContent.value}
                onChange={(e) => setNewContent({ ...newContent, value: e.target.value })}
                placeholder="Content value..."
                rows={3}
                className="bg-muted/50 border-border/50 resize-none"
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleAddNew}
                disabled={upsertContent.isPending}
                className="bg-primary hover:bg-primary/90"
              >
                {upsertContent.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Add Content
              </Button>
              <Button variant="outline" onClick={() => setShowNewForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Content by Page */}
      {Object.keys(groupedContent).length === 0 ? (
        <Card className="bg-card/80 border-border/50 backdrop-blur-sm">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No content entries yet. Add some content to get started.</p>
          </CardContent>
        </Card>
      ) : (
        <Accordion type="multiple" className="space-y-4">
          {Object.entries(groupedContent).map(([page, sections]) => (
            <AccordionItem key={page} value={page} className="border-none">
              <Card className="bg-card/80 border-border/50 backdrop-blur-sm overflow-hidden">
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50">
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-serif text-foreground capitalize">{page}</span>
                    <span className="text-sm text-muted-foreground">
                      ({Object.values(sections).flat().length} items)
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-6">
                    {Object.entries(sections).map(([section, items]) => (
                      <div key={section} className="space-y-4">
                        <h3 className="font-semibold text-foreground capitalize border-b border-border/50 pb-2">
                          {section}
                        </h3>
                        <div className="grid gap-4">
                          {items.map((item) => (
                            <div key={item.id} className="space-y-2">
                              <div className="flex items-center justify-between">
                                <Label className="text-foreground">{formatLabel(item.content_key)}</Label>
                                <Button
                                  size="sm"
                                  onClick={() => handleSave(item)}
                                  disabled={
                                    updateContent.isPending ||
                                    editedValues[item.id] === undefined ||
                                    editedValues[item.id] === item.content_value
                                  }
                                  className="bg-primary hover:bg-primary/90"
                                >
                                  {updateContent.isPending ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <Save className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                              {item.content_value.length > 100 ? (
                                <Textarea
                                  value={editedValues[item.id] ?? item.content_value}
                                  onChange={(e) => handleValueChange(item.id, e.target.value)}
                                  rows={4}
                                  className="bg-muted/50 border-border/50 resize-none"
                                />
                              ) : (
                                <Input
                                  value={editedValues[item.id] ?? item.content_value}
                                  onChange={(e) => handleValueChange(item.id, e.target.value)}
                                  className="bg-muted/50 border-border/50"
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </Card>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
};

export default ContentEditor;
