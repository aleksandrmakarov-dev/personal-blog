import { Routing } from "@/shared/lib";
import FullPageWrapper from "@/shared/ui/fullpage-wrapper/FullPageWrapper";
import { Button } from "@mui/material";

interface ErrorPageProps {
  header: string;
  title: string;
  subtitle: string;
  buttonText?: string;
  buttonRoute?: string;
}

export default function ErrorBase(props: ErrorPageProps) {
  const { header, title, subtitle, buttonText, buttonRoute } = props;

  return (
    <FullPageWrapper>
      <div className="flex flex-col items-center ">
        <h1 className="text-6xl font-semibold text-foreground-primary mb-8">
          {header}
        </h1>
        <p className="text-2xl text-foreground-primary font-semibold">
          {title}
        </p>
        <p className="text-foreground-primary mb-5">{subtitle}</p>
        <Button
          href={buttonRoute || Routing.root}
          variant="contained"
          disableElevation
        >
          {buttonText || "Home"}
        </Button>
      </div>
    </FullPageWrapper>
  );
}
