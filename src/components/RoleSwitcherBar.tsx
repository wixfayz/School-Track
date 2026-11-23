import { Building2, GraduationCap, Users } from 'lucide-react';
import { UserRole } from '../data/schoolData';

interface RoleSwitcherBarProps {
  role: UserRole;
  onChangeRole: (role: UserRole) => void;
}

const ROLES: {
  id: UserRole;
  label: string;
  person: string;
  icon: typeof Users;
}[] = [
  {
    id: 'parent',
    label: 'Parent View',
    person: 'Bello Family',
    icon: Users,
  },
  {
    id: 'teacher',
    label: 'Teacher View',
    person: 'Mrs. Amina Ibrahim',
    icon: GraduationCap,
  },
  {
    id: 'management',
    label: 'School Management',
    person: 'Head Teacher',
    icon: Building2,
  },
];

export function RoleSwitcherBar({ role, onChangeRole }: RoleSwitcherBarProps) {
  return (
    <section
      aria-label="Switch dashboard view"
      className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pb-1"
    >
      <div className="space-y-0.5">
        <p className="text-xs font-semibold text-slate-500">
          Choose a Dashboard View
        </p>
        <p className="text-xs text-slate-500">
          Updates made by Teachers or School Management appear right away in the Parent View.
        </p>
      </div>

      <div
        role="tablist"
        aria-label="Dashboard role switcher"
        className="inline-flex flex-wrap sm:flex-nowrap items-center gap-1 p-1 bg-slate-200/75 rounded-lg self-start md:self-auto"
      >
        {ROLES.map((item) => {
          const Icon = item.icon;
          const isActive = role === item.id;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onChangeRole(item.id)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-md transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Icon
                className={`w-4 h-4 shrink-0 ${
                  isActive ? 'text-blue-600' : 'text-slate-500'
                }`}
                aria-hidden="true"
              />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
