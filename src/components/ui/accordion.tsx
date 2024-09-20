'use client';

import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';


import GoogleIcons from '../GoogleIcons';
import { cn } from '@/lib/utils';

const Accordion = AccordionPrimitive.Root;

type AccordionTriggerProps = {
  className?: string;
  children: React.ReactNode;
  locked?: boolean; // Adjust the type as needed
  active?: boolean; // Adjust the type as needed
  iconOnOnOff?: boolean; // Adjust the type as needed
  iconClassname?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn('', className)} {...props} />
));
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps
>(
  (
    {
      className,
      children,
      locked,
      active,
      iconOnOnOff,
      iconClassname,
      ...props
    },
    ref
  ) => {
    const onClick = !locked
      ? props.onClick
      : (event: any) => event.preventDefault();

    return (
      <AccordionPrimitive.Header className="flex w-full">
        <AccordionPrimitive.Trigger
          ref={ref}
          className={cn(
            locked && 'cursor-not-allowed text-gray-400',
            'flex flex-1 items-center justify-between py-4 font-medium transition-all [&[data-state=open]>.flex>.material-symbols-outlined]:rotate-180',
            className
          )}
          onClick={onClick}
        >
          <div className="w-full">{children}</div>
          <div className="flex flex-row items-center">
            <div
              className={cn(
                !active ? 'opacity-0 hidden' : 'delay-200 opacity-100',
                'pr-2 text-red-300'
              )}
            >
              {locked ? (
                <GoogleIcons icon="lock" className="text-red-300" />
              ) : null}
            </div>
            <GoogleIcons
              icon="keyboard_arrow_down"
              className={cn(
                'text-foreground shrink-0 transition-all duration-200',
                iconClassname,
                !active ? 'opacity-0 hidden' : 'delay-200 opacity-100',
                !iconOnOnOff && 'hidden',

              )}
            />
          </div>
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
    );
  }
);
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      'overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
      className
    )}
    {...props}
  >
    <div className="">{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
