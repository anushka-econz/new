import { ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <span className="font-semibold">AuthComments</span>
          </div>

          <div className="text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} AuthComments. </p>
            <p className="mt-1">Assessment Project - Not for production use</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
