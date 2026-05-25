import { Phone, Mail, Globe } from "lucide-react";

export default function TopHeader() {
  return (
    <div className="bg-slate-900 text-slate-200 py-2 text-sm hidden md:block">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4 text-red-600" />
            <span>Emergency: <span className="font-bold text-white">1066</span></span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4 text-red-600" />
            <span>Ambulance: <span className="font-bold text-white">+91 98765 43210</span></span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="w-4 h-4 text-red-600" />
            <span>info@adhiparasakthihospital.com</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3 border-r border-slate-700 pr-4">
            <a href="#" className="hover:text-red-600 transition-colors text-xs font-medium uppercase tracking-wider">Follow Us</a>
          </div>
          <div className="flex items-center space-x-1 cursor-pointer hover:text-red-600 transition-colors">
            <Globe className="w-4 h-4" />
            <span>English</span>
          </div>
        </div>
      </div>
    </div>
  );
}
