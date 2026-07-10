import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ExternalLink } from "../shared";

interface SocialProps {
  link: string;
  icon: IconDefinition;
}

export function Social({ link, icon }: SocialProps) {
  return (
    <ExternalLink href={link} className="mx-2 select-none">
      <FontAwesomeIcon icon={icon} className="social-icon" color="white" />
    </ExternalLink>
  );
}
