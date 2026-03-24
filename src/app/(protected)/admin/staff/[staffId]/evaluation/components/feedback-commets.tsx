import { Icons } from '@/components/icon/icons';
import { Button } from '@/components/ui/button';

export default function FeedbackCommets() {
  return (
    <>
      <Button className="fixed bottom-10 lg:bottom-15 right-6 lg:right-10 h-14 lg:h-18 w-14 lg:w-18 rounded-full bg-primary hover:bg-primary/90 z-30">
        <Icons.MessageCirclePlus className="size-6 lg:size-7" />
      </Button>
    </>
  );
}
