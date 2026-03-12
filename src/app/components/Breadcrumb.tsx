import { Link } from "react-router";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-xs text-green-600/70 mb-6 font-mono">
      <Link to="/dashboard" className="hover:text-green-400 transition-colors">
        DASHBOARD
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight className="w-3 h-3" />
          {item.path ? (
            <Link to={item.path} className="hover:text-green-400 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-green-500">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
