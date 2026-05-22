import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="min-h-screen bg-background flex items-center justify-center px-6">
    <div className="max-w-md text-center">
      <h1 className="font-headline-lg text-on-surface mb-2">Page Not Found</h1>
      <p className="text-on-surface-variant mb-6">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="bg-primary text-on-primary font-label-caps uppercase px-6 py-3 inline-flex"
      >
        Return Home
      </Link>
    </div>
  </div>
);

export default NotFoundPage;
