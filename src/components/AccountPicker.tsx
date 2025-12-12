import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronDown, Building2 } from "lucide-react";
import { useTenant } from "@/contexts/TenantContext";

const AccountPicker = () => {
  const { tenants, selectedTenant, setSelectedTenant } = useTenant();
  const [isOpen, setIsOpen] = useState(false);

  const handleAccountChange = (tenant: typeof selectedTenant) => {
    if (tenant) {
      setSelectedTenant(tenant);
      setIsOpen(false);
      
      window.dispatchEvent(new CustomEvent('tenantChanged', { 
        detail: { tenant } 
      }));
    }
  };

  if (!tenants || tenants.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6 h-full">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            className={cn(
              "w-full justify-between text-left font-normal bg-white text-black hover:bg-gray-100 border border-gray-300 min-w-[220px] h-full"
            )}
          >
            <div className="flex items-center gap-2 truncate">
              <Building2 className="h-4 w-4 " />
              <span className="truncate">
                {selectedTenant?.display_name || "Seleccionar cuenta"}
              </span>
            </div>
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-[280px] p-0 bg-white border shadow-lg" 
          align="start"
        >
          <div className="flex flex-col">
            {tenants.map((tenant) => (
              <Button
                key={tenant.tenant_id}
                variant="ghost"
                className={cn(
                  "justify-start font-normal w-full h-auto py-3 px-4 rounded-none hover:bg-gray-100",
                  selectedTenant?.tenant_id === tenant.tenant_id && "bg-gray-100"
                )}
                onClick={() => handleAccountChange(tenant)}
              >
                <div className="flex flex-col items-start w-full">
                  <span className="font-medium text-black">
                    {tenant.display_name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {tenant.role} • {tenant.plan}
                  </span>
                </div>
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AccountPicker;