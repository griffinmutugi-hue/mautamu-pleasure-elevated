import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, Plus, TrendingUp, ShoppingBag } from 'lucide-react';

const Dashboard = () => {
  const [productCount, setProductCount] = useState(0);
  const [activeCount, setActiveCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { count: total } = await supabase
          .from('products')
          .select('*', { count: 'exact', head: true });

        const { count: active } = await supabase
          .from('products')
          .select('*', { count: 'exact', head: true })
          .eq('is_active', true);

        setProductCount(total || 0);
        setActiveCount(active || 0);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const stats = [
    {
      title: 'Total Products',
      value: productCount,
      icon: Package,
      description: 'Products in catalog',
      color: 'text-primary',
    },
    {
      title: 'Active Products',
      value: activeCount,
      icon: TrendingUp,
      description: 'Currently visible',
      color: 'text-green-500',
    },
    {
      title: 'Inactive Products',
      value: productCount - activeCount,
      icon: ShoppingBag,
      description: 'Hidden from store',
      color: 'text-muted-foreground',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome to your admin dashboard</p>
        </div>
        <Link to="/admin/products/new">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground glow-button">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-card/80 border-border/50 backdrop-blur-sm hover-lift">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${stat.color}`}>
                {isLoading ? '...' : stat.value}
              </div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="bg-card/80 border-border/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-foreground">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Link to="/admin/products">
            <Button variant="outline" className="border-border/50 text-foreground hover:bg-muted/50">
              <Package className="h-4 w-4 mr-2" />
              Manage Products
            </Button>
          </Link>
          <Link to="/admin/products/new">
            <Button variant="outline" className="border-border/50 text-foreground hover:bg-muted/50">
              <Plus className="h-4 w-4 mr-2" />
              Add New Product
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Info Card */}
      {productCount === 0 && !isLoading && (
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardContent className="py-8 text-center">
            <Package className="h-12 w-12 mx-auto text-primary mb-4" />
            <h3 className="text-xl font-serif text-foreground mb-2">
              No products yet
            </h3>
            <p className="text-muted-foreground mb-4">
              Start by adding your first product to the catalog
            </p>
            <Link to="/admin/products/new">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Product
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
