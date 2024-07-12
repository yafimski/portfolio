import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface SocialProps {
  link: string;
  icon: IconDefinition;
}

function Social({ link, icon }: SocialProps) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="mx-2 select-none">
      <FontAwesomeIcon icon={icon} className="social-icon" color="white" />
    </a>
  );
}

export default Social;
