import { useEffect, useState } from 'react';
import { getSupabaseClient } from '../lib/supabase';
import type { PortfolioData } from '../types/portfolio';

interface UsePortfolioResult {
  data: PortfolioData | null;
  loading: boolean;
  error: Error | null;
}

export function usePortfolio(portfolioKey: string = 'default'): UsePortfolioResult {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchPortfolio() {
      try {
        setLoading(true);
        setError(null);

        const supabase = getSupabaseClient();

        // 1. Portfolio 조회
        const { data: portfolio, error: portfolioError } = await supabase
          .from('portfolio')
          .select('portfolio_id')
          .eq('portfolio_key', portfolioKey)
          .single();

        if (portfolioError) throw portfolioError;
        if (!portfolio) throw new Error('Portfolio not found');

        const portfolioId = portfolio.portfolio_id;

        // 2. 모든 데이터 병렬 조회
        const [
          profileResult,
          navItemsResult,
          skillGroupsResult,
          projectsResult,
          experiencesResult,
          contactResult,
        ] = await Promise.all([
          // Profile + Bio
          supabase
            .from('profile')
            .select(`
              *,
              profile_bio (content, display_order)
            `)
            .eq('portfolio_id', portfolioId)
            .single(),

          // Nav Items
          supabase
            .from('nav_item')
            .select('anchor_id, label, display_order')
            .eq('portfolio_id', portfolioId)
            .order('display_order'),

          // Skill Groups + Items
          supabase
            .from('skill_group')
            .select(`
              category,
              display_order,
              skill_item (name, display_order)
            `)
            .eq('portfolio_id', portfolioId)
            .order('display_order'),

          // Projects + Stack + Details + Links
          supabase
            .from('project')
            .select(`
              title,
              summary,
              role,
              impact,
              display_order,
              project_stack (name, display_order),
              project_detail (content, display_order),
              project_link (github_url, demo_url)
            `)
            .eq('portfolio_id', portfolioId)
            .order('display_order'),

          // Experiences + Achievements
          supabase
            .from('experience')
            .select(`
              company,
              position,
              period,
              display_order,
              experience_achievement (content, display_order)
            `)
            .eq('portfolio_id', portfolioId)
            .order('display_order'),

          // Contact
          supabase
            .from('contact')
            .select('email, github_url, linkedin_url, blog_url, message')
            .eq('portfolio_id', portfolioId)
            .single(),
        ]);

        // 에러 체크
        if (profileResult.error) throw profileResult.error;
        if (navItemsResult.error) throw navItemsResult.error;
        if (skillGroupsResult.error) throw skillGroupsResult.error;
        if (projectsResult.error) throw projectsResult.error;
        if (experiencesResult.error) throw experiencesResult.error;
        if (contactResult.error) throw contactResult.error;

        const profile = profileResult.data;
        const navItems = navItemsResult.data;
        const skillGroups = skillGroupsResult.data;
        const projects = projectsResult.data;
        const experiences = experiencesResult.data;
        const contact = contactResult.data;

        // 3. PortfolioData 형태로 변환
        const portfolioData: PortfolioData = {
          profile: {
            name: profile.name,
            role: profile.role,
            headline: profile.headline,
            summary: profile.summary,
            location: profile.location ?? '',
            photoSrc: profile.photo_src ?? '',
            photoAlt: profile.photo_alt ?? '',
            bio: (profile.profile_bio as { content: string; display_order: number }[])
              ?.sort((a, b) => a.display_order - b.display_order)
              .map((b) => b.content) ?? [],
          },
          navItems: navItems?.map((item) => ({
            id: item.anchor_id,
            label: item.label,
          })) ?? [],
          skills: skillGroups?.map((group) => ({
            category: group.category,
            items: (group.skill_item as { name: string; display_order: number }[])
              ?.sort((a, b) => a.display_order - b.display_order)
              .map((item) => item.name) ?? [],
          })) ?? [],
          projects: projects?.map((project) => {
            const stacks = (project.project_stack as { name: string; display_order: number }[])
              ?.sort((a, b) => a.display_order - b.display_order)
              .map((s) => s.name) ?? [];
            const details = (project.project_detail as { content: string; display_order: number }[])
              ?.sort((a, b) => a.display_order - b.display_order)
              .map((d) => d.content) ?? [];
            const links = (project.project_link as { github_url: string | null; demo_url: string | null }[] | null)?.[0];

            return {
              title: project.title,
              summary: project.summary,
              stack: stacks,
              role: project.role,
              impact: project.impact,
              details,
              links: {
                github: links?.github_url ?? '',
                demo: links?.demo_url ?? '',
              },
            };
          }) ?? [],
          experience: experiences?.map((exp) => ({
            company: exp.company,
            position: exp.position,
            period: exp.period,
            achievements: (exp.experience_achievement as { content: string; display_order: number }[])
              ?.sort((a, b) => a.display_order - b.display_order)
              .map((a) => a.content) ?? [],
          })) ?? [],
          contact: {
            email: contact.email,
            github: contact.github_url ?? '',
            linkedin: contact.linkedin_url ?? '',
            blog: contact.blog_url ?? '',
            message: contact.message ?? '',
          },
        };

        if (!cancelled) {
          setData(portfolioData);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error('Unknown error'));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchPortfolio();

    return () => {
      cancelled = true;
    };
  }, [portfolioKey]);

  return { data, loading, error };
}
