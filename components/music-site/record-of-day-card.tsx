"use client";

import type { ComponentType } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { useRecordOfDay, useSingleOfDay } from "@/components/music-site/use-record-of-day";
import { cn } from "@/lib/utils";

type RemoteImageProps = {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  preferProxy?: boolean;
};

type RecordOfDayCardProps = {
  RemoteImage: ComponentType<RemoteImageProps>;
  imageFit?: "cover" | "contain";
  placeholderVariant?: "next-image" | "img";
  placeholderClassName?: string;
  placeholderWrapperClassName?: string;
  placeholderSize?: number;
};

export function RecordOfDayCard({
  RemoteImage,
  imageFit = "contain",
  placeholderVariant = "next-image",
  placeholderClassName = "w-1/2 h-1/2 gbv-nav-icon object-contain",
  placeholderWrapperClassName,
  placeholderSize = 32,
}: RecordOfDayCardProps) {
  const { site, record, coverUrl, albumHref, displayTitle } = useRecordOfDay();

  if (!record) return null;

  const renderPlaceholder = () => {
    if (placeholderVariant === "img") {
      return (
        <img
          src={site.placeholderIconSrc}
          alt={`${site.shortName} logo`}
          className={placeholderClassName}
        />
      );
    }

    return (
      <Image
        src={site.placeholderIconSrc}
        alt={`${site.shortName} logo`}
        width={placeholderSize}
        height={placeholderSize}
        className={placeholderClassName}
      />
    );
  };

  return (
    <Card className="w-full h-full min-h-[120px]">
      <CardContent className="p-4 flex flex-col gap-3">
        <h2>Record of the Day</h2>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            {albumHref ? (
              <Link
                href={albumHref}
                className="text-base font-semibold hover:underline"
              >
                {displayTitle}
              </Link>
            ) : (
              <div className="text-base font-semibold">{displayTitle}</div>
            )}
          </div>
          <div className="relative h-[220px] sm:h-[260px] lg:h-[300px]">
            {coverUrl ? (
              albumHref ? (
                <Link href={albumHref} className="absolute inset-0">
                  <RemoteImage
                    src={coverUrl}
                    alt={`${record.title} cover`}
                    className={`rounded-md object-${imageFit} w-full h-full`}
                    loading="eager"
                    preferProxy={false}
                  />
                </Link>
              ) : (
                <RemoteImage
                  src={coverUrl}
                  alt={`${record.title} cover`}
                  className={`rounded-md object-${imageFit} w-full h-full`}
                  loading="eager"
                  preferProxy={false}
                />
              )
            ) : albumHref ? (
              <Link
                href={albumHref}
                className={cn("w-full h-full rounded-md flex items-center justify-center", placeholderWrapperClassName)}
                style={{ opacity: 0.2 }}
              >
                {renderPlaceholder()}
              </Link>
            ) : (
              <div className={cn("w-full h-full rounded-md flex items-center justify-center", placeholderWrapperClassName)} style={{ opacity: 0.2 }}>
                {renderPlaceholder()}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function SingleOfDayCard({
  RemoteImage,
  imageFit = "contain",
  placeholderVariant = "next-image",
  placeholderClassName = "w-1/2 h-1/2 gbv-nav-icon object-contain",
  placeholderWrapperClassName,
  placeholderSize = 32,
}: RecordOfDayCardProps) {
  const { site, record, coverUrl, albumHref, displayTitle } = useSingleOfDay();

  if (!record) return null;

  const renderPlaceholder = () => {
    if (placeholderVariant === "img") {
      return (
        <img
          src={site.placeholderIconSrc}
          alt={`${site.shortName} logo`}
          className={placeholderClassName}
        />
      );
    }

    return (
      <Image
        src={site.placeholderIconSrc}
        alt={`${site.shortName} logo`}
        width={placeholderSize}
        height={placeholderSize}
        className={placeholderClassName}
      />
    );
  };

  return (
    <Card className="w-full h-full min-h-[120px]">
      <CardContent className="p-4 flex flex-col gap-3">
        <h2>Single of the Day</h2>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            {albumHref ? (
              <Link
                href={albumHref}
                className="text-base font-semibold hover:underline"
              >
                {displayTitle}
              </Link>
            ) : (
              <div className="text-base font-semibold">{displayTitle}</div>
            )}
          </div>
          <div className="relative h-[220px] sm:h-[260px] lg:h-[300px]">
            {coverUrl ? (
              albumHref ? (
                <Link href={albumHref} className="absolute inset-0">
                  <RemoteImage
                    src={coverUrl}
                    alt={`${record.title} cover`}
                    className={`rounded-md object-${imageFit} w-full h-full`}
                    loading="eager"
                    preferProxy={false}
                  />
                </Link>
              ) : (
                <RemoteImage
                  src={coverUrl}
                  alt={`${record.title} cover`}
                  className={`rounded-md object-${imageFit} w-full h-full`}
                  loading="eager"
                  preferProxy={false}
                />
              )
            ) : albumHref ? (
              <Link
                href={albumHref}
                className={cn("w-full h-full rounded-md flex items-center justify-center", placeholderWrapperClassName)}
                style={{ opacity: 0.2 }}
              >
                {renderPlaceholder()}
              </Link>
            ) : (
              <div className={cn("w-full h-full rounded-md flex items-center justify-center", placeholderWrapperClassName)} style={{ opacity: 0.2 }}>
                {renderPlaceholder()}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
