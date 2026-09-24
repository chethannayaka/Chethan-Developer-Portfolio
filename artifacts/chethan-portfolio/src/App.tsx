import { type ReactNode } from 'react';
import { ErrorBoundary } from '@/components/error-boundary';
import {
  AchievementsPage,
  AboutPage,
  ContactPage,
  EducationPage,
  ExperiencePage,
  HomePage,
  ProjectDetailPage,
  ProjectsPage,
  SkillsPage,
} from '@/components/portfolio/PortfolioPage';
import NotFound from '@/pages/not-found';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/projects/:projectId" component={ProjectDetailPage} />
        <Route path="/projects" component={ProjectsPage} />
        <Route path="/experience" component={ExperiencePage} />
        <Route path="/skills" component={SkillsPage} />
        <Route path="/achievements" component={AchievementsPage} />
        <Route path="/education" component={EducationPage} />
        <Route path="/contact" component={ContactPage} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <Router />
    </WouterRouter>
  );
}

export default App;
