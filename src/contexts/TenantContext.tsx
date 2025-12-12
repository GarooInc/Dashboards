// TenantContext.tsx
import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type Tenant = {
  tenant_id: string;
  display_name: string;
  plan: string;
  role: string;
};

type TenantContextType = {
  tenants: Tenant[];
  selectedTenant: Tenant | null;
  setTenants: (tenants: Tenant[]) => void;
  setSelectedTenant: (tenant: Tenant) => void;
};

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export const TenantProvider = ({ children }: { children: ReactNode }) => {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);

  return (
    <TenantContext.Provider
      value={{
        tenants,
        selectedTenant,
        setTenants,
        setSelectedTenant      
    }}
    >
      {children}
    </TenantContext.Provider>
  );
};

export const useTenant = () => {
  const context = useContext(TenantContext);
  if (context === undefined) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
};