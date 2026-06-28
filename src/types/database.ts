// Supabase 데이터베이스 타입 정의

export interface Database {
  public: {
    Tables: {
      portfolio: {
        Row: {
          portfolio_id: number;
          portfolio_key: string;
          source: string | null;
          synced_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['portfolio']['Row'], 'portfolio_id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['portfolio']['Insert']>;
      };
      profile: {
        Row: {
          profile_id: number;
          portfolio_id: number;
          name: string;
          role: string;
          headline: string;
          summary: string;
          location: string | null;
          photo_src: string | null;
          photo_alt: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['profile']['Row'], 'profile_id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['profile']['Insert']>;
      };
      profile_bio: {
        Row: {
          profile_bio_id: number;
          profile_id: number;
          display_order: number;
          content: string;
        };
        Insert: Omit<Database['public']['Tables']['profile_bio']['Row'], 'profile_bio_id'>;
        Update: Partial<Database['public']['Tables']['profile_bio']['Insert']>;
      };
      nav_item: {
        Row: {
          nav_item_id: number;
          portfolio_id: number;
          anchor_id: string;
          label: string;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['nav_item']['Row'], 'nav_item_id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['nav_item']['Insert']>;
      };
      skill_group: {
        Row: {
          skill_group_id: number;
          portfolio_id: number;
          category: string;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['skill_group']['Row'], 'skill_group_id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['skill_group']['Insert']>;
      };
      skill_item: {
        Row: {
          skill_item_id: number;
          skill_group_id: number;
          name: string;
          display_order: number;
        };
        Insert: Omit<Database['public']['Tables']['skill_item']['Row'], 'skill_item_id'>;
        Update: Partial<Database['public']['Tables']['skill_item']['Insert']>;
      };
      project: {
        Row: {
          project_id: number;
          portfolio_id: number;
          title: string;
          summary: string;
          role: string;
          impact: string;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['project']['Row'], 'project_id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['project']['Insert']>;
      };
      project_stack: {
        Row: {
          project_stack_id: number;
          project_id: number;
          name: string;
          display_order: number;
        };
        Insert: Omit<Database['public']['Tables']['project_stack']['Row'], 'project_stack_id'>;
        Update: Partial<Database['public']['Tables']['project_stack']['Insert']>;
      };
      project_detail: {
        Row: {
          project_detail_id: number;
          project_id: number;
          content: string;
          display_order: number;
        };
        Insert: Omit<Database['public']['Tables']['project_detail']['Row'], 'project_detail_id'>;
        Update: Partial<Database['public']['Tables']['project_detail']['Insert']>;
      };
      project_link: {
        Row: {
          project_link_id: number;
          project_id: number;
          github_url: string | null;
          demo_url: string | null;
        };
        Insert: Omit<Database['public']['Tables']['project_link']['Row'], 'project_link_id'>;
        Update: Partial<Database['public']['Tables']['project_link']['Insert']>;
      };
      experience: {
        Row: {
          experience_id: number;
          portfolio_id: number;
          company: string;
          position: string;
          period: string;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['experience']['Row'], 'experience_id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['experience']['Insert']>;
      };
      experience_achievement: {
        Row: {
          experience_achievement_id: number;
          experience_id: number;
          content: string;
          display_order: number;
        };
        Insert: Omit<Database['public']['Tables']['experience_achievement']['Row'], 'experience_achievement_id'>;
        Update: Partial<Database['public']['Tables']['experience_achievement']['Insert']>;
      };
      contact: {
        Row: {
          contact_id: number;
          portfolio_id: number;
          email: string;
          github_url: string | null;
          linkedin_url: string | null;
          blog_url: string | null;
          message: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['contact']['Row'], 'contact_id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['contact']['Insert']>;
      };
    };
  };
}

// Row 타입 별칭
export type Portfolio = Database['public']['Tables']['portfolio']['Row'];
export type Profile = Database['public']['Tables']['profile']['Row'];
export type ProfileBio = Database['public']['Tables']['profile_bio']['Row'];
export type NavItem = Database['public']['Tables']['nav_item']['Row'];
export type SkillGroup = Database['public']['Tables']['skill_group']['Row'];
export type SkillItem = Database['public']['Tables']['skill_item']['Row'];
export type Project = Database['public']['Tables']['project']['Row'];
export type ProjectStack = Database['public']['Tables']['project_stack']['Row'];
export type ProjectDetail = Database['public']['Tables']['project_detail']['Row'];
export type ProjectLink = Database['public']['Tables']['project_link']['Row'];
export type Experience = Database['public']['Tables']['experience']['Row'];
export type ExperienceAchievement = Database['public']['Tables']['experience_achievement']['Row'];
export type Contact = Database['public']['Tables']['contact']['Row'];
