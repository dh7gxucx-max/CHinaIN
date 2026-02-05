import { Phone, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function SipWidget() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="relative group">
            <Button size="lg" className="rounded-full h-14 w-14 shadow-xl bg-accent hover:bg-accent/90 text-accent-foreground p-0">
              <Phone className="h-6 w-6 animate-pulse" />
            </Button>
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-sm border-2 border-white">
              2
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent side="left" className="p-3 bg-primary text-primary-foreground border-none">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-accent" />
            <p className="font-medium">2 operators online</p>
          </div>
          <p className="text-xs text-primary-foreground/70 mt-1">Wait time: ~2 min</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
