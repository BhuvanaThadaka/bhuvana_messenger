
import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";

interface FancyCardProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  className?: string;
  cardClassName?: string;
  contentClassName?: string;
  headerClassName?: string;
  children: ReactNode;
  footer?: ReactNode;
  hoverEffect?: boolean;
  glowEffect?: boolean;
  gradientBackground?: boolean;
  gradientDirection?: "top" | "right" | "bottom" | "left" | "tr" | "br" | "bl" | "tl";
  gradientColors?: string[];
}

export function FancyCard({
  title,
  description,
  icon,
  className,
  cardClassName,
  contentClassName,
  headerClassName,
  children,
  footer,
  hoverEffect = false,
  glowEffect = false,
  gradientBackground = false,
  gradientDirection = "tr",
  gradientColors = ["from-purple-100", "to-indigo-100"],
}: FancyCardProps) {
  // Map gradient direction to tailwind classes
  const gradientDirectionMap = {
    top: "bg-gradient-to-t",
    right: "bg-gradient-to-r",
    bottom: "bg-gradient-to-b",
    left: "bg-gradient-to-l",
    tr: "bg-gradient-to-tr",
    br: "bg-gradient-to-br",
    bl: "bg-gradient-to-bl",
    tl: "bg-gradient-to-tl",
  };

  const gradientClasses = gradientBackground 
    ? `${gradientDirectionMap[gradientDirection]} ${gradientColors.join(' ')}`
    : '';

  return (
    <Card 
      className={cn(
        "overflow-hidden",
        hoverEffect && "transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
        glowEffect && "relative before:absolute before:inset-0 before:-z-10 before:transform before:rounded-2xl before:bg-gradient-to-r before:from-indigo-200 before:via-purple-200 before:to-pink-200 before:opacity-25 before:blur-xl before:transition-all before:duration-1000 hover:before:opacity-40 hover:before:blur-xl",
        gradientBackground && gradientClasses,
        glowEffect && "dark:shadow-lg dark:shadow-indigo-900/20",
        cardClassName
      )}
    >
      {(title || description) && (
        <CardHeader className={cn("flex flex-row items-center gap-4", headerClassName)}>
          {icon && (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
              {icon}
            </div>
          )}
          <div>
            {title && <CardTitle>{title}</CardTitle>}
            {description && <CardDescription>{description}</CardDescription>}
          </div>
        </CardHeader>
      )}
      <CardContent className={cn("p-6", contentClassName)}>
        <div className={className}>{children}</div>
      </CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}

export function FancyCardsGroup({
  children,
  className,
  columns = 3,
}: {
  children: ReactNode;
  className?: string;
  columns?: 1 | 2 | 3 | 4;
}) {
  const colsMap = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={cn(`grid gap-4 ${colsMap[columns]}`, className)}>
      {children}
    </div>
  );
}
