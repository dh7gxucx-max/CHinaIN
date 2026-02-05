import { useStores } from "@/hooks/use-stores";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, ShoppingBag, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Stores() {
  const { data: stores, isLoading } = useStores();

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Fallback data if DB is empty for demo
  const displayStores = stores?.length ? stores : [
    { id: 1, name: "Zara Style Fashion", category: "Clothing", url: "#", description: "Trendy fashion wholesale direct from factory.", imageUrl: null },
    { id: 2, name: "Shenzhen Electronics", category: "Electronics", url: "#", description: "Cables, chargers, and mobile accessories.", imageUrl: null },
    { id: 3, name: "Kids World 1688", category: "Kids", url: "#", description: "Affordable children's wear and toys.", imageUrl: null },
    { id: 4, name: "Home Decor Co.", category: "Home", url: "#", description: "Modern home accessories and kitchenware.", imageUrl: null },
  ];

  const categories = Array.from(new Set(displayStores.map(s => s.category)));

  return (
    <div className="container py-12">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-display font-bold text-primary mb-4">Curated Stores</h1>
        <p className="text-muted-foreground">
          Browse our list of trusted suppliers from Taobao and 1688. 
          Verified for quality and reliability.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 justify-center mb-10">
        <Button variant="default" size="sm" className="rounded-full">All</Button>
        {categories.map(cat => (
          <Button key={cat} variant="outline" size="sm" className="rounded-full">{cat}</Button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayStores.map((store, i) => (
          <motion.div
            key={store.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1 group border-border/50">
              <div className="aspect-video bg-secondary relative overflow-hidden rounded-t-xl">
                {store.imageUrl ? (
                  <img src={store.imageUrl} alt={store.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary/5 group-hover:bg-primary/10 transition-colors">
                    <ShoppingBag className="h-12 w-12 text-primary/20" />
                  </div>
                )}
                <Badge className="absolute top-4 right-4 bg-white/90 text-primary hover:bg-white backdrop-blur-sm shadow-sm">
                  {store.category}
                </Badge>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-primary mb-2 line-clamp-1">{store.name}</h3>
                <p className="text-muted-foreground text-sm mb-6 line-clamp-2 h-10">
                  {store.description || "No description available."}
                </p>
                <Button className="w-full gap-2" variant="outline" asChild>
                  <a href={store.url} target="_blank" rel="noopener noreferrer">
                    Visit Store <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
