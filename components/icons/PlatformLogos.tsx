export function SnowflakeLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Snowflake">
      <path d="M20 8v24M8 20h24M12.3 12.3l15.4 15.4M27.7 12.3L12.3 27.7M20 8l-3 3m3-3l3 3M20 32l-3-3m3 3l3-3M8 20l3-3m-3 3l3 3M32 20l-3-3m3 3l-3 3M12.3 12.3l2.1 1.5m-2.1-1.5l1.5 2.1M27.7 12.3l-2.1 1.5m2.1-1.5l-1.5 2.1M12.3 27.7l2.1-1.5m-2.1 1.5l1.5-2.1M27.7 27.7l-2.1-1.5m2.1 1.5l-1.5-2.1" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round"/>
      <text x="42" y="25" fill="#6b7280" fontFamily="Inter, system-ui, sans-serif" fontSize="13" fontWeight="500">Snowflake</text>
    </svg>
  );
}

export function DatabricksLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Databricks">
      <path d="M20 10l10 6v8l-10 6-10-6v-8l10-6z" stroke="#6b7280" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M10 16l10 6 10-6M20 22v8" stroke="#6b7280" strokeWidth="1.5" strokeLinejoin="round"/>
      <text x="38" y="25" fill="#6b7280" fontFamily="Inter, system-ui, sans-serif" fontSize="13" fontWeight="500">Databricks</text>
    </svg>
  );
}

export function AzureLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 90 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Azure">
      <path d="M10 28L18 12h5l-6 12h10l-17 4zM24 12l8 16h-5l-4.5-9L18 28" stroke="#6b7280" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"/>
      <text x="36" y="25" fill="#6b7280" fontFamily="Inter, system-ui, sans-serif" fontSize="13" fontWeight="500">Azure</text>
    </svg>
  );
}

export function DbtLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 70 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="dbt">
      <circle cx="20" cy="20" r="10" stroke="#6b7280" strokeWidth="1.5"/>
      <path d="M16 20h8M20 16v8" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round"/>
      <text x="36" y="25" fill="#6b7280" fontFamily="Inter, system-ui, sans-serif" fontSize="13" fontWeight="500">dbt</text>
    </svg>
  );
}

export function PowerBILogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 110 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Power BI">
      <rect x="11" y="16" width="6" height="14" rx="1" stroke="#6b7280" strokeWidth="1.5"/>
      <rect x="19" y="12" width="6" height="18" rx="1" stroke="#6b7280" strokeWidth="1.5"/>
      <rect x="27" y="8" width="6" height="22" rx="1" stroke="#6b7280" strokeWidth="1.5"/>
      <text x="40" y="25" fill="#6b7280" fontFamily="Inter, system-ui, sans-serif" fontSize="13" fontWeight="500">Power BI</text>
    </svg>
  );
}

export function FabricLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 150 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Microsoft Fabric">
      <path d="M12 12h16v16H12z" stroke="#6b7280" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M12 20h16M20 12v16" stroke="#6b7280" strokeWidth="1.5"/>
      <text x="36" y="25" fill="#6b7280" fontFamily="Inter, system-ui, sans-serif" fontSize="12" fontWeight="500">Fabric</text>
    </svg>
  );
}

export const PLATFORM_LOGO_COMPONENTS = [
  SnowflakeLogo,
  DatabricksLogo,
  AzureLogo,
  DbtLogo,
  PowerBILogo,
  FabricLogo,
] as const;
