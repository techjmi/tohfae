import ResetPasswordForm from './ResetPasswordForm';

// Force dynamic rendering because root layout uses cookies()
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Reset Password | Tohfae',
  description: 'Create a new password',
};

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}

