import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';

import { cn } from '@/lib/utils';

function Avatar({
  className,
  size = 'default',
  format = 'square',
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> & {
  size?: 'default' | 'sm' | 'lg' | 'xl';
  format?: 'square' | 'circle';
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      data-format={format}
      className={cn(
        'group/avatar relative flex justify-center items-center size-20 shrink-0 data-[format=square]:rounded-sm  data-[format=circle]:rounded-full select-none data-[size=xl]:size-40 data-[size=lg]:size-30 data-[size=sm]:size-10',
        className
      )}
      {...props}
    />
  );
}

function AvatarImage({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(
        'aspect-square size-full group-data-[format=square]/avatar:rounded-sm  group-data-[format=circle]/avatar:rounded-full',
        className
      )}
      {...props}
    />
  );
}

function AvatarFallback({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        'bg-foreground/10 text-muted-foreground flex size-full items-center justify-center group-data-[format=square]/avatar:rounded-sm  group-data-[format=circle]/avatar:rounded-full text-sm group-data-[size=sm]/avatar:text-xs',
        className
      )}
      {...props}
    />
  );
}

function AvatarBadge({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        'bg-foreground text-background hover:bg-foreground/90 absolute right-[-5px] bottom-[-5px] z-10 inline-flex items-center justify-center select-none',
        'group-data-[size=sm]/avatar:size-3.5 group-data-[size=sm]/avatar:[&>svg]:hidden',
        'group-data-[size=default]/avatar:size-6.5 group-data-[size=default]/avatar:[&>svg]:size-4.5',
        'group-data-[size=lg]/avatar:size-8 group-data-[size=lg]/avatar:[&>svg]:size-5',
        'group-data-[size=xl]/avatar:size-10 group-data-[size=xl]/avatar:[&>svg]:size-6',
        'group-data-[format=square]/avatar:rounded-sm  group-data-[format=circle]/avatar:rounded-full',
        className
      )}
      {...props}
    />
  );
}

function AvatarGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        '*:data-[slot=avatar]:ring-background group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2',
        className
      )}
      {...props}
    />
  );
}

function AvatarGroupCount({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        'bg-foreground text-background ring-background relative flex size-8 shrink-0 items-center justify-center text-sm ring-2 group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=sm]/avatar-group:size-6 [&>svg]:size-4 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3',
        'group-has-data-[format=square]/avatar:rounded-sm group-has-data-[format=circle]/avatar:rounded-full',
        className
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback, AvatarBadge, AvatarGroup, AvatarGroupCount };
