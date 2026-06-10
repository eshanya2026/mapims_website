export default function AdminSettingsPage() {
  return (
    <div className="p-8">
      <div className="rounded-xl border border-slate-200 bg-white p-8">
        <h1 className="text-2xl font-bold text-slate-900">CMS settings</h1>
        <p className="mt-2 text-sm text-slate-500">
          Super Admin settings for the hospital CMS will be configured here.
        </p>
        <ul className="mt-6 space-y-2 text-sm text-slate-600">
          <li>Site-wide CMS preferences</li>
          <li>Notification contacts for form inquiries</li>
          <li>Integration and security options</li>
        </ul>
      </div>
    </div>
  );
}
