import LoaderCircleIcon from './loader-circle';

export default function PageLoading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <LoaderCircleIcon className="w-10 h-10 text-muted-foreground" />
    </div>
  );
}
