import VerifyEmailForm from './VerifyEmailForm';

// Force dynamic rendering because root layout uses cookies()
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Verify Email | Tohfae',
  description: 'Verify your email address',
};

export default function VerifyEmailPage() {
  return <VerifyEmailForm />;
}

