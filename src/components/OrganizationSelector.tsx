import React, { useState } from 'react';
import { ChevronDown, Building } from 'lucide-react';

// Data variables for easy backend integration
const ORGANIZATION_DATA = {
  selectedOrganization: {
    id: "1",
    name: "Acme Corp",
    logo: "/api/placeholder/32/32"
  },
  organizations: [
    {
      id: "1", 
      name: "Acme Corp",
      logo: "/api/placeholder/32/32"
    },
    {
      id: "2",
      name: "Tech Innovations",
      logo: "/api/placeholder/32/32"
    },
    {
      id: "3", 
      name: "Global Solutions",
      logo: "/api/placeholder/32/32"
    }
  ]
};

interface OrganizationSelectorProps {
  onOrganizationChange?: (orgId: string) => void;
}

export function OrganizationSelector({ onOrganizationChange }: OrganizationSelectorProps) {
  const [selectedOrg, setSelectedOrg] = useState(ORGANIZATION_DATA.selectedOrganization);
  const [isOpen, setIsOpen] = useState(false);

  const handleOrganizationSelect = (org: typeof ORGANIZATION_DATA.organizations[0]) => {
    setSelectedOrg(org);
    setIsOpen(false);
    onOrganizationChange?.(org.id);
  };

  return (
    <div className="relative">
      {/* Selected Organization Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-2 bg-black/20 backdrop-blur-xl border border-white/10 rounded-full hover:bg-black/30 transition-all duration-300 group"
      >
        {/* Organization Logo */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
          <Building className="w-4 h-4 text-white" />
        </div>
        
        {/* Organization Name */}
        <span className="text-white/90 text-sm font-medium hidden sm:block">
          {selectedOrg.name}
        </span>
        
        {/* Dropdown Icon */}
        <ChevronDown className={`w-4 h-4 text-white/60 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-50 py-2">
          {ORGANIZATION_DATA.organizations.map((org) => (
            <button
              key={org.id}
              onClick={() => handleOrganizationSelect(org)}
              className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition-colors duration-200 ${
                selectedOrg.id === org.id ? 'bg-white/5' : ''
              }`}
            >
              {/* Organization Logo */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <Building className="w-4 h-4 text-white" />
              </div>
              
              {/* Organization Name */}
              <span className="text-white/90 text-sm font-medium text-left">
                {org.name}
              </span>
              
              {/* Selected Indicator */}
              {selectedOrg.id === org.id && (
                <div className="ml-auto w-2 h-2 bg-blue-400 rounded-full" />
              )}
            </button>
          ))}
          
          {/* Add Organization Option */}
          <div className="border-t border-white/10 mt-2 pt-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition-colors duration-200 text-white/70">
              <div className="w-8 h-8 rounded-full border-2 border-dashed border-white/30 flex items-center justify-center flex-shrink-0">
                <Building className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium text-left">Add Organization</span>
            </button>
          </div>
        </div>
      )}
      
      {/* Backdrop for closing dropdown */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}