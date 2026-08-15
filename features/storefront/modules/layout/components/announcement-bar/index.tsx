import Link from 'next/link';

interface AnnouncementBarProps {
  config?: {
    enabled?: boolean;
    text?: string;
    linkUrl?: string;
    bgColor?: string;
    textColor?: string;
  };
}

export function AnnouncementBar({ config }: AnnouncementBarProps) {
  if (!config || config.enabled === false || !config.text) {
    return null;
  }

  const bgColor = config.bgColor || '#0f172a';
  const textColor = config.textColor || '#ffffff';

  const content = (
    <div
      className="py-2.5 px-4 text-center text-xs sm:text-sm font-medium transition-colors flex items-center justify-center gap-2"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <span>{config.text}</span>
      {config.linkUrl && (
        <span className="underline underline-offset-4 opacity-90 hover:opacity-100 font-semibold inline-flex items-center gap-1">
          Shop Now &rarr;
        </span>
      )}
    </div>
  );

  if (config.linkUrl) {
    return (
      <Link href={config.linkUrl} className="block transition-opacity hover:opacity-95">
        {content}
      </Link>
    );
  }

  return content;
}
