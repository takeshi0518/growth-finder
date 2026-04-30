type DemoRestrictedProps = {
  isDemo: boolean;
  children: React.ReactNode;
};

export default function DemoRestricted({
  isDemo,
  children,
}: DemoRestrictedProps) {
  if (isDemo)
    return (
      <p className="text-muted-foreground text-sm">
        デモモードのため編集できません
      </p>
    );
  return children;
}
