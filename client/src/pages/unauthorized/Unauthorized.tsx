import ErrorBase from "@/shared/ui/error-base/ErrorBase";

export default function AboutMePage() {
  return (
    <ErrorBase
      header="Hold up!"
      title="401 - Unathorized"
      subtitle="You don't have enough permissions"
    />
  );
}
