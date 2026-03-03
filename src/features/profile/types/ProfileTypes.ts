export interface UserProfile {
  id: string;
  name: string;
  role: string;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  country?: string | null;
}
