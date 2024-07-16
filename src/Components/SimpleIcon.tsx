interface SimpleIconProps {
  href: string;
  alt: string;
  src: string;
}

function SimpleIcon({ href, alt, src }: SimpleIconProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="resource-img"
    >
      <img
        alt={alt}
        src={src}
        className="pointer-events-none flex w-6 sm:w-10"
      />
    </a>
  );
}

export default SimpleIcon;
