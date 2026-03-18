import ForgotPasswordForm from './ForgotPasswordForm';

// Force dynamic rendering because root layout uses cookies()
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Forgot Password | Tohfae',
  description: 'Reset your password',
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}

