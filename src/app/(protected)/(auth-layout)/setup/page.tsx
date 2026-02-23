import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import SetupForm from './setup-form';

export default function Signup() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-xl sm:text-3xl">
          アカウント情報の入力
        </CardTitle>
        <CardDescription className="text-xs sm:text-base">
          あとすこしで完了です
        </CardDescription>
      </CardHeader>

      <CardContent>
        <SetupForm />
      </CardContent>
    </Card>
  );
}
